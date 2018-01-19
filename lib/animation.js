'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventemitter = require('./common/eventemitter');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _util = require('./common/util');

var _util2 = _interopRequireDefault(_util);

var _animationframe = require('./common/animationframe');

var _define = require('./common/define');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file 动画类 控制全局动画
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author redmed
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Animation = function (_EventEmitter) {
    _inherits(Animation, _EventEmitter);

    /**
     * 构造函数
     * @param {Object=} options 配置项
     */


    /**
     * 动画进程标记
     * @type {number|null}
     * @private
     */


    /**
     * 执行后停止的Clip，用于reset时重置
     * @type {Array.<Clip>}
     * @private
     */
    function Animation(options) {
        _classCallCheck(this, Animation);

        var _this = _possibleConstructorReturn(this, (Animation.__proto__ || Object.getPrototypeOf(Animation)).call(this));

        _this._options = {};
        _this._savedClips = [];
        _this._clips = [];

        _this._options = options || {};

        return _this;
    }

    /**
     * 主进程动画函数
     * @private
     */


    /**
     * 执行中的子动画片段
     * @type {Array.<Clip>}
     * @private
     */


    /**
     * 配置项
     * @type {Object}
     * @private
     */


    _createClass(Animation, [{
        key: '_startAni',
        value: function _startAni() {
            var _this2 = this;

            var update = function update(timestamp) {
                _this2._timer = (0, _animationframe.requestAnimationFrame)(update);
                _this2._update(timestamp);
            };

            this._timer = (0, _animationframe.requestAnimationFrame)(update);
        }

        /**
         * 停止主进程
         * @private
         */

    }, {
        key: '_stopAni',
        value: function _stopAni() {

            var timer = this._timer;

            if (timer) {
                (0, _animationframe.cancelAnimationFrame)(timer);
                this._timer = null;

                return true;
            }

            return false;
        }

        /**
         * 更新动画
         * @param {number} timestamp
         * @private
         */

    }, {
        key: '_update',
        value: function _update(timestamp) {

            var clips = this._clips;

            this.emit(_define.Ev.UPDATE, { timestamp: timestamp });

            var i = 0;
            while (i < clips.length) {
                var clip = clips[i];
                var running = clip.update(timestamp);

                if (!running) {
                    // clip._animation = null;
                    if (this._hasLiveClip(clip)) {
                        clips.splice(i, 1);
                    }
                } else {
                    i++;
                }
            }

            this._clips = clips;

            this.emit(_define.Ev.AFTER_UPDATE);

            if (clips.length === 0) {
                this._stopAni();
                this.emit(_define.Ev.COMPLETE);
            }
        }

        /**
         * 启动动画进程
         */

    }, {
        key: 'start',
        value: function start() {

            var clips = this._clips,
                len = clips.length;

            if (this._timer || len == 0) {
                return this;
            }

            this.emit(_define.Ev.START);

            var i = -1;
            while (++i < len) {
                var clip = clips[i];
                clip.start();
            }

            this._startAni();

            return this;
        }

        /**
         * 停止动画进程
         */

    }, {
        key: 'stop',
        value: function stop() {

            this._stop(false);

            return this;
        }

        /**
         * 暂停动画进程
         */

    }, {
        key: 'pause',
        value: function pause() {

            this._stop(true);

            return this;
        }

        /**
         * 重置动画
         * 会重置内部 Clip 已经执行的的 repeat 次数
         */

    }, {
        key: 'reset',
        value: function reset() {

            this._stop(false, true, false);

            var i = -1,
                saved = this._savedClips,
                len = saved.length;

            while (++i < len) {
                var c = saved[i];
                c.stop(true);
            }

            this._clips = saved.slice();

            this.emit(_define.Ev.RESET);

            return this;
        }

        /**
         * 停止/暂停/重置 动画
         * @param {boolean=false} pause 是否暂停 默认不暂停
         * @param {boolean=false} reset 是否重置 默认不重置
         * @param {boolean=true} emit 是否派发事件 默认派发
         * @private
         */

    }, {
        key: '_stop',
        value: function _stop(pause, reset) {
            var emit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;


            this._stopAni();

            var clips = this._clips,
                len = clips.length;

            if (len) {
                var i = -1;
                while (++i < len) {
                    var clip = clips[i];
                    pause ? clip.pause() : clip.stop(reset);
                }

                emit && this.emit(pause ? _define.Ev.PAUSE : _define.Ev.STOP);
            }
        }

        /**
         * 添加子动画片段
         * @param {Clip|Array.<Clip>} clips
         * @param {Boolean} startClip
         */

    }, {
        key: 'addClip',
        value: function addClip(clips) {
            var startClip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


            if (!Array.isArray(clips)) {
                clips = [clips];
            }

            var i = -1,
                len = clips.length;

            while (++i < len) {
                var clip = clips[i];
                if (!this._hasSavedClip(clip)) {
                    this._addLiveClip(clip);
                    this._addSavedClip(clip);

                    if (this._timer && startClip) {
                        // 如果主进程进行中，立即启动Clip进程
                        clip.start();
                    }
                }
            }

            return this;
        }
    }, {
        key: '_addLiveClip',
        value: function _addLiveClip(clip) {

            var _c = this._clips;
            // 防止重复添加
            if (_c.indexOf(clip) === -1) {
                _c.push(clip);
                clip._animation = this;
            }
        }
    }, {
        key: '_addSavedClip',
        value: function _addSavedClip(clip) {

            var _s = this._savedClips;
            // 防止重复添加
            if (_s.indexOf(clip) === -1) {
                _s.push(clip);
                clip._animation = this;
            }
        }

        /**
         * 移除子动画片段
         * @param {Clip=} clip
         */

    }, {
        key: 'removeClip',
        value: function removeClip(clip) {

            var saved = this._savedClips;

            if (clip) {
                // let idx = clips.indexOf(clip);
                // if (idx != -1) {
                //     clip._animation = null;
                //     clips.splice(idx, 1);
                // }
                this._removeLiveClip(clip);
                this._removeSavedClip(clip);

                clip._animation = null;
            } else {
                var i = -1,
                    len = saved.length;

                while (++i < len) {
                    var c = saved[i];
                    c._animation = null;
                }

                this._clips = [];
                this._savedClips = [];
            }

            return this;
        }
    }, {
        key: '_removeLiveClip',
        value: function _removeLiveClip(clip) {

            _util2['default'].remove(this._clips, function (c) {
                return c === clip;
            });
        }
    }, {
        key: '_removeSavedClip',
        value: function _removeSavedClip(clip) {

            _util2['default'].remove(this._savedClips, function (c) {
                return c === clip;
            });
        }

        /**
         * 获得 Clips
         * @returns {Array.<Clip>}
         */

    }, {
        key: 'getClips',
        value: function getClips() {

            return this._clips;
        }

        /**
         * 判断指定的Clip是否存在
         * @param {Clip} clip
         * @returns {boolean}
         */

    }, {
        key: '_hasSavedClip',
        value: function _hasSavedClip(clip) {

            // TODO: 使用Key-Value判断是否存在。indexOf性能太差
            return this._savedClips.indexOf(clip) !== -1;
        }
    }, {
        key: '_hasLiveClip',
        value: function _hasLiveClip(clip) {
            return this._clips.indexOf(clip) !== -1;
        }

        /**
         * 析构函数
         */

    }, {
        key: 'destroy',
        value: function destroy() {

            this.off();
            this._stopAni();
            this.removeClip();
        }
    }]);

    return Animation;
}(_eventemitter2['default']);

Animation.Event = _define.Ev;
exports['default'] = Animation;