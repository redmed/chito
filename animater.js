(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Animater", [], factory);
	else if(typeof exports === 'object')
		exports["Animater"] = factory();
	else
		root["Animater"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventemitter = __webpack_require__(1);

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _easing = __webpack_require__(8);

var _easing2 = _interopRequireDefault(_easing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @file 子动画片段, 由 Animation 统一调度, 只控制时间的变化量
 * @author redmed
 *
 */

// Include a performance.now polyfill
(function () {

    if ('performance' in window === false) {
        window.performance = {};
    }

    // IE 8
    Date.now = Date.now || function () {
        return new Date().getTime();
    };

    if ('now' in window.performance === false) {
        var offset = window.performance.timing && window.performance.timing.navigationStart ? window.performance.timing.navigationStart : Date.now();

        window.performance.now = function () {
            return Date.now() - offset;
        };
    }
})();

var Event = {
    UPDATE: 'update',
    START: 'start',
    COMPLETE: 'complete',
    STOP: 'stop'
};

var Attr = {
    DURATION: 'duration',
    REPEAT: 'repeat',
    DELAY: 'delay',
    EASING: 'easing',
    INTERVAL: 'interval',
    YOYO: 'yoyo',
    START: 'startAt'
};

var Easing = {
    LINEAR: 'Linear',

    QUADRATIC_IN: 'QuadraticIn',
    QUADRATIC_OUT: 'QuadraticOut',
    QUADRATIC_IN_OUT: 'QuadraticInOut',

    CUBIC_IN: 'CubicIn',
    CUBIC_OUT: 'CubicOut',
    CUBIC_IN_OUT: 'CubicInOut',

    QUARTIC_IN: 'QuarticIn',
    QUARTIC_OUT: 'QuarticOut',
    QUARTIC_IN_OUT: 'QuarticInOut',

    QUINTIC_IN: 'QuinticIn',
    QUINTIC_OUT: 'QuinticOut',
    QUINTIC_IN_OUT: 'QuinticInOut',

    SINUSOIDAL_IN: 'SinusoidalIn',
    SINUSOIDAL_OUT: 'SinusoidalOut',
    SINUSOIDAL_IN_OUT: 'SinusoidalInOut',

    EXPONENTIAL_IN: 'ExponentialIn',
    EXPONENTIAL_OUT: 'ExponentialOut',
    EXPONENTIAL_IN_OUT: 'ExponentialInOut',

    CIRCULAR_IN: 'CircularIn',
    CIRCULAR_OUT: 'CircularOut',
    CIRCULAR_IN_OUT: 'CircularInOut',

    ELASTIC_IN: 'ElasticIn',
    ELASTIC_OUT: 'ElasticOut',
    ELASTIC_IN_OUT: 'ElasticInOut',

    BACK_IN: 'BackIn',
    BACK_OUT: 'BackOut',
    BACK_IN_OUT: 'BackInOut',

    BOUNCE_IN: 'BounceIn',
    BOUNCE_OUT: 'BounceOut',
    BOUNCE_IN_OUT: 'BounceInOut'
};

var Clip = function (_EventEmitter) {
    _inherits(Clip, _EventEmitter);

    /**
     * 构造函数
     * @param {Object=} options 配置项
     */


    /**
     * 起始时间
     */


    /**
     * progress起始位置加成, 可以控制progress不从0开始启动
     * @type {number}
     */


    /**
     * Ease 动画名
     * @type {Function}
     */


    /**
     * 每次动画间隔
     * @type {number} ms
     */


    /**
     * 运行时长
     * @type {number}
     */
    function Clip() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Clip);

        var _this = _possibleConstructorReturn(this, (Clip.__proto__ || Object.getPrototypeOf(Clip)).call(this));

        _this._options = {};
        _this._startAt = 0;
        _this._isPlaying = false;
        _this._reversed = false;
        _this.Event = Event;

        _this.initialize(options);

        return _this;
    }

    /**
     * 初始化函数
     * @param {Object=} from 起始帧
     * @param {Object=} to 结束帧
     * @param {Object=} options 配置项
     */


    /**
     * yoyo翻转状态
     * @type {boolean}
     */


    /**
     * 播放状态
     * @type {boolean}
     */


    /**
     * 是否按原轨迹返回(类似溜溜球)
     * @type {boolean}
     */


    /**
     * 重复数量
     * @type {number}
     */


    /**
     * 延迟运行
     * @type {number} ms
     */


    /**
     * 配置项
     * @type {Object}
     */


    _createClass(Clip, [{
        key: 'initialize',
        value: function initialize() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var attr = arguments[1];


            this._options = this._initOption(options);
        }

        /**
         * 初始配置项
         * @param {Object=} options
         * @options {number=} options.duration, 单位ms, 默认 1000ms
         * @options {number=} options.delay
         * @options {string=|Function=} options.ease
         * @options {number=} options.repeat
         * @private
         */

    }, {
        key: '_initOption',
        value: function _initOption(options) {

            var easing = options[Attr.EASING] || Easing.LINEAR;
            this._easing = _easing2['default'][easing] ? _easing2['default'][easing] : easing;
            this._delay = options[Attr.DELAY] || 0;
            this._duration = options[Attr.DURATION] || 1000;
            this._repeat = options[Attr.REPEAT] || 0;
            this._interval = options[Attr.INTERVAL] || 0;
            this._yoyo = options[Attr.YOYO] || false;
            this._startAt = options[Attr.START] || 0;

            return options;
        }

        /**
         * 启动动画
         * @param {Boolean=} forceStart 强制重新计时
         */

    }, {
        key: 'start',
        value: function start(forceStart) {

            if (!forceStart && this._isPlaying) {
                return;
            }

            this._isPlaying = true;
            this._startTime = window.performance.now() + this._delay;

            this.emit(Event.START);

            return this;
        }

        /**
         * 停止动画
         */

    }, {
        key: 'stop',
        value: function stop() {

            if (!this._isPlaying) {
                return;
            }

            this._isPlaying = false;

            this.emit(Event.STOP);

            return this;
        }

        /**
         * 更新动画, 触发 UPDATE 事件
         * @param {number} time
         * @returns {Boolean} true: 还没结束. false: 运行结束
         */

    }, {
        key: 'update',
        value: function update(time) {

            if (this._isPlaying && time && time < this._startTime) {
                return true;
            }

            var elapsed = (time - this._startTime) / this._duration;
            elapsed += this._startAt;
            elapsed = Math.min(elapsed, 1);

            var percent = this._easing(this._reversed ? 1 - elapsed : elapsed);
            this.emit(Event.UPDATE, percent);

            // 一个周期结束
            if (elapsed == 1) {
                if (this._repeat > 1) {
                    if (isFinite(this._repeat)) {
                        this._repeat--;
                    }

                    this._startTime = time + this._interval;
                    this._startAt = 0;

                    if (this._yoyo) {
                        this._reversed = !this._reversed;
                    }

                    return true;
                } else {
                    this.emit(Event.COMPLETE);

                    return false;
                }
            }

            return true;
        }

        /**
         * 析构函数
         */

    }, {
        key: 'destroy',
        value: function destroy() {

            this._isPlaying = false;
            this.off();
        }
    }]);

    return Clip;
}(_eventemitter2['default']);

Clip.Event = Event;
Clip.Attr = Attr;
Clip.Easing = Easing;
exports['default'] = Clip;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @file 事件封装类
 * @author redmed
 * 
 */

var EventEmitter = function () {

    /**
     * 构造函数
     */

    /**
     * 事件池
     * @type {Object}
     * @private
     */
    function EventEmitter() {
        _classCallCheck(this, EventEmitter);

        this.__events__ = {};
        this.__id__ = Math.random() * Date.now();
    }

    /**
     * 事件绑定, 不支持过滤重复添加
     * @param {string} type
     * @param {Function} listener
     * @returns {EventEmitter}
     */


    /**
     *
     * @type {number}
     * @private
     */


    _createClass(EventEmitter, [{
        key: "on",
        value: function on(type, listener) {
            var events = this.__events__;
            events[type] = events[type] || [];
            events[type].push(listener);

            return this;
        }

        /**
         * 事件绑定, 只绑定一次, 用后即焚
         * @param {string} type
         * @param {Function} listener
         * @returns {EventEmitter}
         */

    }, {
        key: "once",
        value: function once(type, listener) {
            var _this = this;

            var onceCallback = function onceCallback() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                _this.off(type, onceCallback);
                listener.apply(_this, args);
            };

            onceCallback.listener = listener;

            return this.on(type, onceCallback);
        }

        /**
         * 事件解绑
         * @param {string=} type
         * @param {Function=} listener
         * @returns {EventEmitter}
         */

    }, {
        key: "off",
        value: function off() {
            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var listener = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            var events = this.__events__;

            if (type == null) {
                this.__events__ = {};

                return this;
            }

            if (listener == null) {
                delete events[type];

                return this;
            }

            events[type].some(function (cb, index, listeners) {
                if (cb === listener || cb === cb.listener) {
                    listeners.splice(index, 1);

                    return true;
                }
            });

            return this;
        }

        /**
         * 事件触发
         * @param {string} type
         * @param {*=} args
         * @returns {EventEmitter}
         */

    }, {
        key: "emit",
        value: function emit(type) {
            var _this2 = this;

            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
            }

            var listeners = this.__events__[type];

            if (listeners) {
                listeners.forEach(function (cb) {
                    cb.apply(_this2, args);
                });
            }

            return this;
        }

        /**
         * 获取绑定事件
         * @returns {Object}
         */

    }, {
        key: "events",
        get: function get() {
            return this.__events__;
        }
    }]);

    return EventEmitter;
}();

exports["default"] = EventEmitter;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventemitter = __webpack_require__(1);

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _util = __webpack_require__(9);

var _util2 = _interopRequireDefault(_util);

var _animationframe = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file 动画类 控制全局动画
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author redmed
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Event = {
    UPDATE: 'frameUpdate',
    UPDATE_AFTER: 'frameUpdateAfter',
    COMPLETE: 'complete'
};

var Animation = function (_EventEmitter) {
    _inherits(Animation, _EventEmitter);

    /**
     * 构造函数
     * @param {Object} options 配置项
     */


    /**
     * 动画进程标记
     * @type {*}
     * @private
     */


    /**
     * 未结束的子动画片段
     * @type {Array.<Clip>}
     * @private
     */


    /**
     * 配置项
     * @type {Object}
     * @private
     */
    function Animation() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Animation);

        var _this = _possibleConstructorReturn(this, (Animation.__proto__ || Object.getPrototypeOf(Animation)).call(this));

        _this._options = {};
        _this._clips = [];
        _this._aliveClips = [];
        _this._status = -1;
        _this.Event = Event;


        _this._options = options;
        _this.initialize();

        _this._status = 0;

        return _this;
    }

    /**
     * 初始化函数
     */


    /**
     * 动画状态
     * -1: unInit
     * 0: init
     * 1: start
     * 2: stop
     * @type {number}
     */


    /**
     * 主进程动画函数
     * @type {Function}
     * @private
     */


    /**
     * 子动画片段
     * @type {Array.<Clip>}
     * @private
     */


    _createClass(Animation, [{
        key: 'initialize',
        value: function initialize() {
            var _this2 = this;

            this._animation = function (timestamp) {

                _this2._animationTimer = (0, _animationframe.requestAnimationFrame)(_this2._animation);
                _this2.emit(Event.UPDATE, timestamp);

                var aliveClips = _this2._aliveClips,
                    alive = [];

                var i = 0,
                    len = aliveClips.length;

                while (i < len) {
                    var clip = aliveClips[i++];

                    var finish = clip.update(timestamp);
                    clip._finish = finish;

                    // 未结束的动画保存下来, 以便下次继续执行
                    if (finish) {
                        alive.push(clip);
                    }
                }

                _this2._aliveClips = alive;

                _this2.emit(Event.UPDATE_AFTER, timestamp);

                if (_this2._aliveClips.length === 0) {
                    _this2.stop();
                    _this2.emit(Event.COMPLETE);
                }
            };
        }

        /**
         * 启动动画进程
         */

    }, {
        key: 'start',
        value: function start() {

            if (this._animationTimer || this._aliveClips.length === 0) {
                return;
            }

            // FIXME: 这里启动clip可能存在问题, 后面在衡量一下是否在使用Clip时调用，还是这里统一调用
            // this._aliveClips.forEach(clip => {
            //     clip.start();
            // });

            (0, _animationframe.requestAnimationFrame)(this._animation);
            this._status = 1;
        }

        /**
         * 停止动画进程
         */

    }, {
        key: 'stop',
        value: function stop() {

            if (this._animationTimer) {
                (0, _animationframe.cancelAnimationFrame)(this._animationTimer);
                this._animationTimer = null;

                // FIXME: 这里停止clip可能存在问题, 考虑是否在使用Clip时调用
                // this._aliveClips.forEach(clip => {
                //     clip.stop();
                // });

                this._status = 2;
            }
        }

        /**
         * 重启动画进程, 重置所有 Clip._finish 状态
         */

    }, {
        key: 'restart',
        value: function restart() {

            this._clips.forEach(function (clip, i) {
                clip._finish = false;
            });
            this._aliveClips = this._clips;

            this.stop();
            this.start();
        }

        /**
         * 添加子动画片段
         * @param {Clip|Array.<Clip>} clip
         */

    }, {
        key: 'addClip',
        value: function addClip(clip) {

            if (!Array.isArray(clip)) {
                clip = [clip];
            }

            this._aliveClips = this._clips = this._clips.concat(clip);

            return this;
        }

        /**
         * 移除子动画片段
         * @param {Clip=} clip
         */

    }, {
        key: 'removeClip',
        value: function removeClip(clip) {

            // TODO: All in one loop
            if (clip) {
                _util2['default'].remove(this._clips, function (c) {
                    return c === clip;
                });

                _util2['default'].remove(this._aliveClips, function (c) {
                    return c === clip;
                });
            } else {
                this._clips = [];
                this._aliveClips = [];
            }

            return this;
        }
    }, {
        key: 'getClips',
        value: function getClips() {
            return this._aliveClips;
        }

        /**
         * 析构函数
         */

    }, {
        key: 'destroy',
        value: function destroy() {

            this.stop();
            this._clips.forEach(function (clip) {
                clip.destroy();
            });
            this._clips = [];
            this._aliveClips = [];
            this._status = -1;

            this.off();
        }
    }]);

    return Animation;
}(_eventemitter2['default']);

Animation.Event = Event;
exports['default'] = Animation;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _clip = __webpack_require__(0);

var _clip2 = _interopRequireDefault(_clip);

var _Interpolation = __webpack_require__(4);

var _Interpolation2 = _interopRequireDefault(_Interpolation);

var _colorhelper = __webpack_require__(6);

var _colorhelper2 = _interopRequireDefault(_colorhelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author redmed
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date 2017/3/13
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var SUPPORT_COLORS = {
    color: 1,
    backgroundColor: 1,
    borderColor: 1,
    lineColor: 1,
    shadowColor: 1
};

function isColorName(name) {
    // TODO: 修改, 根据特性判断。自己构造内部使用的数据类型
    return name in SUPPORT_COLORS;
}

/**
 * 计算属性在某个时间上的具体数值
 * @param {Object} keyframe 属性
 * @param {number} progress 进度
 * @param {Function} interpolation 插值算法
 * @returns {Object}
 */
function loopKeyframe(keyframe, progress) {
    var interpolation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Interpolation2['default'].Linear;


    var _keyframe = {};

    for (var key in keyframe) {
        if (keyframe.hasOwnProperty(key)) {

            var val = keyframe[key];

            if (typeof val != 'undefined') {
                // if (_.isPlainObject(val)) {
                //     val = loopKeyframe(val, progress, interpolation);
                // }
                // else {
                if (Array.isArray(val)) {
                    if (isColorName(key) && Array.isArray(val[0])) {
                        // 颜色渐变
                        val = _colorhelper2['default'].linearGradient(val, progress);
                        val = _colorhelper2['default'].toRGBA(val);
                    } else {
                        val = interpolation(val, progress);
                    }
                }
                // }

                _keyframe[key] = val;
            }
        }
    }

    return _keyframe;
}

/**
 * 转换数据格式
 * @param {Object} attr
 * @returns {Object}
 */
function transform(attr) {

    var _attr = {};

    for (var key in attr) {
        if (attr.hasOwnProperty(key)) {

            var val = attr[key];

            if (_colorhelper2['default'].isColor(val)) {
                val = _colorhelper2['default'].toNormalArray(val);
            }

            _attr[key] = val;
        }
    }

    return _attr;
}

/**
 * 渲染器
 */

var ShaderClip = function (_Clip) {
    _inherits(ShaderClip, _Clip);

    /**
     * 存储属性
     * @type {Object}
     * @private
     */
    function ShaderClip() {
        _classCallCheck(this, ShaderClip);

        var _this = _possibleConstructorReturn(this, (ShaderClip.__proto__ || Object.getPrototypeOf(ShaderClip)).call(this));

        _this._tracks = {};
        _this._interpolation = _Interpolation2['default'].Linear;

        _this.initialize.apply(_this, arguments);

        return _this;
    }

    /**
     * 插值算法
     * @type {Function}
     * @private
     */


    _createClass(ShaderClip, [{
        key: 'initialize',
        value: function initialize(options, attr) {

            _get(ShaderClip.prototype.__proto__ || Object.getPrototypeOf(ShaderClip.prototype), 'initialize', this).call(this, options);
            this._tracks = transform(attr);
        }

        /**
         * 设置属性状态及时间控制点
         * @param {Object} attr
         * @param {number} time 单位ms
         * @returns {Shader}
         */

    }, {
        key: 'when',
        value: function when(attr /*, time*/) {
            // TODO: 如果需要支持指定time上的变化，需要实现关于时间的插值计算，比较复杂，后面再考虑实现
            var tracks = this._tracks;
            for (var key in attr) {
                if (attr.hasOwnProperty(key)) {
                    var value = attr[key];

                    if (!tracks[key]) {
                        tracks[key] = [];

                        // if (time != 0) {
                        //     tracks[ key ].push({
                        //         value,
                        //         time: 0
                        //     });
                        // }
                    }

                    // tracks[ key ].push({
                    //     value,
                    //     time
                    // });
                    tracks[key].push(value);
                }
            }

            return this;
        }
    }, {
        key: 'update',
        value: function update(time) {
            if (this._isPlaying && time && time < this._startTime) {
                return true;
            }

            var elapsed = (time - this._startTime) / this._duration;
            elapsed += this._startAt;
            elapsed = Math.min(elapsed, 1);

            var percent = this._easing(this._reversed ? 1 - elapsed : elapsed);

            var tracks = this._tracks;
            var keyframe = {};

            for (var key in tracks) {
                if (tracks.hasOwnProperty(key)) {

                    var val = tracks[key];

                    if (Array.isArray(val)) {
                        if (isColorName(key) && Array.isArray(val[0])) {
                            // 颜色渐变
                            val = _colorhelper2['default'].linearGradient(val, percent);
                            val = _colorhelper2['default'].toRGBA(val);
                        } else {
                            val = this._interpolation(val, percent);
                        }
                    }

                    keyframe[key] = val;
                }
            }

            this.emit(this.Event.UPDATE, percent, keyframe);

            // 一个周期结束
            if (elapsed == 1) {
                if (this._repeat > 1) {
                    if (isFinite(this._repeat)) {
                        this._repeat--;
                    }

                    this._startTime = time + this._interval;
                    this._startAt = 0;

                    if (this._yoyo) {
                        this._reversed = !this._reversed;
                    }

                    return true;
                } else {
                    this.emit(this.Event.COMPLETE);

                    return false;
                }
            }

            return true;
        }
    }]);

    return ShaderClip;
}(_clip2['default']);

exports['default'] = ShaderClip;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @file 插值算法
 * @author redmed
 * @date 2017/3/13
 */

var Interpolation = {

    Linear: function Linear(v, k) {

        var m = v.length - 1;
        var f = m * k;
        var i = Math.floor(f);
        var fn = Interpolation.Utils.Linear;

        if (k < 0) {
            return fn(v[0], v[1], f);
        }

        if (k > 1) {
            return fn(v[m], v[m - 1], m - f);
        }

        return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
    },

    Bezier: function Bezier(v, k) {

        var b = 0;
        var n = v.length - 1;
        var pw = Math.pow;
        var bn = Interpolation.Utils.Bernstein;

        for (var i = 0; i <= n; i++) {
            b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
        }

        return b;
    },

    CatmullRom: function CatmullRom(v, k) {

        var m = v.length - 1;
        var f = m * k;
        var i = Math.floor(f);
        var fn = Interpolation.Utils.CatmullRom;

        if (v[0] === v[m]) {

            if (k < 0) {
                i = Math.floor(f = m * (1 + k));
            }

            return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
        } else {

            if (k < 0) {
                return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
            }

            if (k > 1) {
                return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
            }

            return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
        }
    },

    Utils: {

        Linear: function Linear(p0, p1, t) {

            return (p1 - p0) * t + p0;
        },

        Bernstein: function Bernstein(n, i) {

            var fc = Interpolation.Utils.Factorial;

            return fc(n) / fc(i) / fc(n - i);
        },

        Factorial: function () {

            var a = [1];

            return function (n) {

                var s = 1;

                if (a[n]) {
                    return a[n];
                }

                for (var i = n; i > 1; i--) {
                    s *= i;
                }

                a[n] = s;
                return s;
            };
        }(),

        CatmullRom: function CatmullRom(p0, p1, p2, p3, t) {

            var v0 = (p2 - p0) * 0.5;
            var v1 = (p3 - p1) * 0.5;
            var t2 = t * t;
            var t3 = t * t2;

            return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
        }

    }

};

exports["default"] = Interpolation;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var requestAnimationFrame = function () {
    return typeof window !== 'undefined' && (window.requestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function (callback) {
        setTimeout(callback, 16);
    };
}();

var cancelAnimationFrame = function () {
    return typeof window !== 'undefined' && (window.cancelAnimationFrame || window.msCancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame) || function (timer) {
        clearTimeout(timer);
    };
}();

exports.requestAnimationFrame = requestAnimationFrame;
exports.cancelAnimationFrame = cancelAnimationFrame;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @file 颜色处理帮助类
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @author redmed
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @date 16/8/17
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

var _csscolorparser = __webpack_require__(7);

var _csscolorparser2 = _interopRequireDefault(_csscolorparser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _clamp_css_byte(i) {
    // Clamp to integer 0 .. 255.
    i = Math.round(i); // Seems to be what Chrome does (vs truncation).
    return i < 0 ? 0 : i > 255 ? 255 : i;
}

function _clamp_css_float(f) {
    // Clamp to float 0.0 .. 1.0.
    return f < 0 ? 0 : f > 1 ? 1 : f;
}

var ColorHelper = {

    /**
     * 判断是否为颜色类型
     * @param {string|Array.<string>} color
     * @returns {boolean}
     */
    isColor: function isColor(color) {
        if (typeof color === 'string') {
            return !!(0, _csscolorparser2['default'])(color);
        } else if (Array.isArray(color)) {
            var i = 0,
                len = color.length;

            while (i < len) {
                var c = color[i++];

                if (typeof c === 'string') {
                    if (!(0, _csscolorparser2['default'])(c)) {
                        return false;
                    }
                } else {
                    return false;
                }
            }

            return true;
        }

        return false;
    },
    isColorIncrease: function isColorIncrease(inc) {
        if (Array.isArray(color)) {
            return color.length > 0;
        }

        return false;
    },
    toColorIncrease: function toColorIncrease(inc) {
        return [inc[0] || 0, inc[1] || 0, inc[2] || 0, inc[3] || 0];
    },


    /**
     * 转换为 CSS 标准颜色格式
     * @param {string|Array.<string>} color
     * @returns {Array|*}
     */
    toNormal: function toNormal(color) {
        if (Array.isArray(color)) {
            var colorArr = [];
            var i = 0,
                len = color.length;

            while (i < len) {
                var c = color[i++];

                if (typeof c === 'string') {
                    var cssColor = (0, _csscolorparser2['default'])(c);

                    if (!cssColor) {
                        return null;
                    } else {
                        colorArr.push(cssColor);
                    }
                } else {
                    return null;
                }
            }

            return colorArr;
        } else if (typeof color === 'string') {
            return (0, _csscolorparser2['default'])(color);
        } else {
            return null;
        }
    },
    toNormalArray: function toNormalArray(color) {
        if (Array.isArray(color)) {
            var colorArr = [];
            var i = 0,
                len = color.length;

            while (i < len) {
                var c = color[i++];

                if (typeof c === 'string') {
                    var cssColor = (0, _csscolorparser2['default'])(c);

                    if (!cssColor) {
                        return null;
                    } else {
                        colorArr.push(cssColor);
                    }
                } else {
                    return null;
                }
            }

            return colorArr;
        } else if (typeof color === 'string') {
            return [(0, _csscolorparser2['default'])(color)];
        } else {
            return null;
        }
    },


    /**
     * 颜色渐变
     * @param {Array} steps 渐变步进, 使用标准 CSS 颜色
     * @param {number=0} progress 进度 [0 - 1]
     * @returns {Array} 标准 CSS 颜色
     * @example:
     * var c0 = [0, 0, 0, 0], c1 = [100, 100, 100, 1];
     * linearGradient([c0, c1], 0.5) => [50, 50, 50, 0.5]
     */
    linearGradient: function linearGradient(steps) {
        var progress = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var interpolation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ColorHelper.Utils.Linear;

        var m = steps.length - 1;
        var f = m * progress;
        var i = f >> 0;
        var fn = interpolation;

        var fns = function fns(p0, p1, t) {
            var _p = _slicedToArray(p0, 4),
                r0 = _p[0],
                g0 = _p[1],
                b0 = _p[2],
                a0 = _p[3];

            var _p2 = _slicedToArray(p1, 4),
                r1 = _p2[0],
                g1 = _p2[1],
                b1 = _p2[2],
                a1 = _p2[3];

            var rgba = [fn(r0, r1, t) >> 0, fn(g0, g1, t) >> 0, fn(b0, b1, t) >> 0, fn(a0, a1, t)];

            return rgba;
        };

        var s0 = steps[i];
        var s1 = steps[i + 1 > m ? m : i + 1];
        var t = f - i;

        return fns(s0, s1, t);
    },


    /**
     * 混合颜色
     * @param {Array} color
     * @param {Array} increase
     * @returns {*}
     */
    mixColors: function mixColors(color, increase) {
        var c = this.toNormal(color);
        if (Array.isArray(increase) && c) {
            var _ref = [_clamp_css_byte(c[0] + increase[0] || 0), _clamp_css_byte(c[1] + increase[1] || 0), _clamp_css_byte(c[2] + increase[2] || 0), _clamp_css_float(c[3] + increase[3] || 0)],
                r = _ref[0],
                g = _ref[1],
                b = _ref[2],
                a = _ref[3];


            var rgba = [r, g, b, a].join(',');

            return 'rgba(' + rgba + ')';
        } else {
            return color;
        }
    },


    /**
     * 数组格式 => rgba格式
     * @param {Array} color
     * @returns {string}
     */
    toRGBA: function toRGBA(color) {
        if (color && color.length >= 3) {
            var alpha = typeof color[3] === 'undefined' ? 1 : color[3];
            var r = _clamp_css_byte(color[0]),
                g = _clamp_css_byte(color[1]),
                b = _clamp_css_byte(color[2]),
                a = _clamp_css_float(alpha);

            // Maybe slower..
            // let rgba = [ r, g, b, a ].join(',');

            return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        } else {
            return 'transparent';
        }
    },


    Utils: {
        Linear: function Linear(p0, p1, t) {

            return (p1 - p0) * t + p0;
        }
    }
};

exports['default'] = ColorHelper;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// (c) Dean McNamee <dean@gmail.com>, 2012.
//
// https://github.com/deanm/css-color-parser-js
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.

// http://www.w3.org/TR/css3-color/
var kCSSColorTable = {
    "transparent": [0, 0, 0, 0], "aliceblue": [240, 248, 255, 1],
    "antiquewhite": [250, 235, 215, 1], "aqua": [0, 255, 255, 1],
    "aquamarine": [127, 255, 212, 1], "azure": [240, 255, 255, 1],
    "beige": [245, 245, 220, 1], "bisque": [255, 228, 196, 1],
    "black": [0, 0, 0, 1], "blanchedalmond": [255, 235, 205, 1],
    "blue": [0, 0, 255, 1], "blueviolet": [138, 43, 226, 1],
    "brown": [165, 42, 42, 1], "burlywood": [222, 184, 135, 1],
    "cadetblue": [95, 158, 160, 1], "chartreuse": [127, 255, 0, 1],
    "chocolate": [210, 105, 30, 1], "coral": [255, 127, 80, 1],
    "cornflowerblue": [100, 149, 237, 1], "cornsilk": [255, 248, 220, 1],
    "crimson": [220, 20, 60, 1], "cyan": [0, 255, 255, 1],
    "darkblue": [0, 0, 139, 1], "darkcyan": [0, 139, 139, 1],
    "darkgoldenrod": [184, 134, 11, 1], "darkgray": [169, 169, 169, 1],
    "darkgreen": [0, 100, 0, 1], "darkgrey": [169, 169, 169, 1],
    "darkkhaki": [189, 183, 107, 1], "darkmagenta": [139, 0, 139, 1],
    "darkolivegreen": [85, 107, 47, 1], "darkorange": [255, 140, 0, 1],
    "darkorchid": [153, 50, 204, 1], "darkred": [139, 0, 0, 1],
    "darksalmon": [233, 150, 122, 1], "darkseagreen": [143, 188, 143, 1],
    "darkslateblue": [72, 61, 139, 1], "darkslategray": [47, 79, 79, 1],
    "darkslategrey": [47, 79, 79, 1], "darkturquoise": [0, 206, 209, 1],
    "darkviolet": [148, 0, 211, 1], "deeppink": [255, 20, 147, 1],
    "deepskyblue": [0, 191, 255, 1], "dimgray": [105, 105, 105, 1],
    "dimgrey": [105, 105, 105, 1], "dodgerblue": [30, 144, 255, 1],
    "firebrick": [178, 34, 34, 1], "floralwhite": [255, 250, 240, 1],
    "forestgreen": [34, 139, 34, 1], "fuchsia": [255, 0, 255, 1],
    "gainsboro": [220, 220, 220, 1], "ghostwhite": [248, 248, 255, 1],
    "gold": [255, 215, 0, 1], "goldenrod": [218, 165, 32, 1],
    "gray": [128, 128, 128, 1], "green": [0, 128, 0, 1],
    "greenyellow": [173, 255, 47, 1], "grey": [128, 128, 128, 1],
    "honeydew": [240, 255, 240, 1], "hotpink": [255, 105, 180, 1],
    "indianred": [205, 92, 92, 1], "indigo": [75, 0, 130, 1],
    "ivory": [255, 255, 240, 1], "khaki": [240, 230, 140, 1],
    "lavender": [230, 230, 250, 1], "lavenderblush": [255, 240, 245, 1],
    "lawngreen": [124, 252, 0, 1], "lemonchiffon": [255, 250, 205, 1],
    "lightblue": [173, 216, 230, 1], "lightcoral": [240, 128, 128, 1],
    "lightcyan": [224, 255, 255, 1], "lightgoldenrodyellow": [250, 250, 210, 1],
    "lightgray": [211, 211, 211, 1], "lightgreen": [144, 238, 144, 1],
    "lightgrey": [211, 211, 211, 1], "lightpink": [255, 182, 193, 1],
    "lightsalmon": [255, 160, 122, 1], "lightseagreen": [32, 178, 170, 1],
    "lightskyblue": [135, 206, 250, 1], "lightslategray": [119, 136, 153, 1],
    "lightslategrey": [119, 136, 153, 1], "lightsteelblue": [176, 196, 222, 1],
    "lightyellow": [255, 255, 224, 1], "lime": [0, 255, 0, 1],
    "limegreen": [50, 205, 50, 1], "linen": [250, 240, 230, 1],
    "magenta": [255, 0, 255, 1], "maroon": [128, 0, 0, 1],
    "mediumaquamarine": [102, 205, 170, 1], "mediumblue": [0, 0, 205, 1],
    "mediumorchid": [186, 85, 211, 1], "mediumpurple": [147, 112, 219, 1],
    "mediumseagreen": [60, 179, 113, 1], "mediumslateblue": [123, 104, 238, 1],
    "mediumspringgreen": [0, 250, 154, 1], "mediumturquoise": [72, 209, 204, 1],
    "mediumvioletred": [199, 21, 133, 1], "midnightblue": [25, 25, 112, 1],
    "mintcream": [245, 255, 250, 1], "mistyrose": [255, 228, 225, 1],
    "moccasin": [255, 228, 181, 1], "navajowhite": [255, 222, 173, 1],
    "navy": [0, 0, 128, 1], "oldlace": [253, 245, 230, 1],
    "olive": [128, 128, 0, 1], "olivedrab": [107, 142, 35, 1],
    "orange": [255, 165, 0, 1], "orangered": [255, 69, 0, 1],
    "orchid": [218, 112, 214, 1], "palegoldenrod": [238, 232, 170, 1],
    "palegreen": [152, 251, 152, 1], "paleturquoise": [175, 238, 238, 1],
    "palevioletred": [219, 112, 147, 1], "papayawhip": [255, 239, 213, 1],
    "peachpuff": [255, 218, 185, 1], "peru": [205, 133, 63, 1],
    "pink": [255, 192, 203, 1], "plum": [221, 160, 221, 1],
    "powderblue": [176, 224, 230, 1], "purple": [128, 0, 128, 1],
    "red": [255, 0, 0, 1], "rosybrown": [188, 143, 143, 1],
    "royalblue": [65, 105, 225, 1], "saddlebrown": [139, 69, 19, 1],
    "salmon": [250, 128, 114, 1], "sandybrown": [244, 164, 96, 1],
    "seagreen": [46, 139, 87, 1], "seashell": [255, 245, 238, 1],
    "sienna": [160, 82, 45, 1], "silver": [192, 192, 192, 1],
    "skyblue": [135, 206, 235, 1], "slateblue": [106, 90, 205, 1],
    "slategray": [112, 128, 144, 1], "slategrey": [112, 128, 144, 1],
    "snow": [255, 250, 250, 1], "springgreen": [0, 255, 127, 1],
    "steelblue": [70, 130, 180, 1], "tan": [210, 180, 140, 1],
    "teal": [0, 128, 128, 1], "thistle": [216, 191, 216, 1],
    "tomato": [255, 99, 71, 1], "turquoise": [64, 224, 208, 1],
    "violet": [238, 130, 238, 1], "wheat": [245, 222, 179, 1],
    "white": [255, 255, 255, 1], "whitesmoke": [245, 245, 245, 1],
    "yellow": [255, 255, 0, 1], "yellowgreen": [154, 205, 50, 1]
};

function clamp_css_byte(i) {
    // Clamp to integer 0 .. 255.
    i = Math.round(i); // Seems to be what Chrome does (vs truncation).
    return i < 0 ? 0 : i > 255 ? 255 : i;
}

function clamp_css_float(f) {
    // Clamp to float 0.0 .. 1.0.
    return f < 0 ? 0 : f > 1 ? 1 : f;
}

function parse_css_int(str) {
    // int or percentage.
    if (str[str.length - 1] === '%') {
        return clamp_css_byte(parseFloat(str) / 100 * 255);
    }
    return clamp_css_byte(parseInt(str));
}

function parse_css_float(str) {
    // float or percentage.
    if (str[str.length - 1] === '%') {
        return clamp_css_float(parseFloat(str) / 100);
    }
    return clamp_css_float(parseFloat(str));
}

function css_hue_to_rgb(m1, m2, h) {
    if (h < 0) {
        h += 1;
    } else if (h > 1) h -= 1;

    if (h * 6 < 1) return m1 + (m2 - m1) * h * 6;
    if (h * 2 < 1) return m2;
    if (h * 3 < 2) return m1 + (m2 - m1) * (2 / 3 - h) * 6;
    return m1;
}

function parseCSSColor(css_str) {
    // Remove all whitespace, not compliant, but should just be more accepting.
    var str = css_str.replace(/ /g, '').toLowerCase();

    // Color keywords (and transparent) lookup.
    if (str in kCSSColorTable) return kCSSColorTable[str].slice(); // dup.

    // #abc and #abc123 syntax.
    if (str[0] === '#') {
        if (str.length === 4) {
            var iv = parseInt(str.substr(1), 16); // TODO(deanm): Stricter parsing.
            if (!(iv >= 0 && iv <= 0xfff)) return null; // Covers NaN.
            return [(iv & 0xf00) >> 4 | (iv & 0xf00) >> 8, iv & 0xf0 | (iv & 0xf0) >> 4, iv & 0xf | (iv & 0xf) << 4, 1];
        } else if (str.length === 7) {
            var iv = parseInt(str.substr(1), 16); // TODO(deanm): Stricter parsing.
            if (!(iv >= 0 && iv <= 0xffffff)) return null; // Covers NaN.
            return [(iv & 0xff0000) >> 16, (iv & 0xff00) >> 8, iv & 0xff, 1];
        }

        return null;
    }

    var op = str.indexOf('('),
        ep = str.indexOf(')');
    if (op !== -1 && ep + 1 === str.length) {
        var fname = str.substr(0, op);
        var params = str.substr(op + 1, ep - (op + 1)).split(',');
        var alpha = 1; // To allow case fallthrough.
        switch (fname) {
            case 'rgba':
                if (params.length !== 4) return null;
                alpha = parse_css_float(params.pop());
            // Fall through.
            case 'rgb':
                if (params.length !== 3) return null;
                return [parse_css_int(params[0]), parse_css_int(params[1]), parse_css_int(params[2]), alpha];
            case 'hsla':
                if (params.length !== 4) return null;
                alpha = parse_css_float(params.pop());
            // Fall through.
            case 'hsl':
                if (params.length !== 3) return null;
                var h = (parseFloat(params[0]) % 360 + 360) % 360 / 360; // 0 .. 1
                // NOTE(deanm): According to the CSS spec s/l should only be
                // percentages, but we don't bother and let float or percentage.
                var s = parse_css_float(params[1]);
                var l = parse_css_float(params[2]);
                var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
                var m1 = l * 2 - m2;
                return [clamp_css_byte(css_hue_to_rgb(m1, m2, h + 1 / 3) * 255), clamp_css_byte(css_hue_to_rgb(m1, m2, h) * 255), clamp_css_byte(css_hue_to_rgb(m1, m2, h - 1 / 3) * 255), alpha];
            default:
                return null;
        }
    }

    return null;
}

// try { exports.parseCSSColor = parseCSSColor } catch (e) { }

exports["default"] = parseCSSColor;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @file Easing 函数
 * @author redmed
 * @date 2017/3/9
 */

var Easing = {

    Linear: function Linear(k) {

        return k;
    },

    QuadraticIn: function QuadraticIn(k) {

        return k * k;
    },

    QuadraticOut: function QuadraticOut(k) {

        return k * (2 - k);
    },

    QuadraticInOut: function QuadraticInOut(k) {

        if ((k *= 2) < 1) {
            return 0.5 * k * k;
        }

        return -0.5 * (--k * (k - 2) - 1);
    },

    CubicIn: function CubicIn(k) {

        return k * k * k;
    },

    CubicOut: function CubicOut(k) {

        return --k * k * k + 1;
    },

    CubicInOut: function CubicInOut(k) {

        if ((k *= 2) < 1) {
            return 0.5 * k * k * k;
        }

        return 0.5 * ((k -= 2) * k * k + 2);
    },

    QuarticIn: function QuarticIn(k) {

        return k * k * k * k;
    },

    QuarticOut: function QuarticOut(k) {

        return 1 - --k * k * k * k;
    },

    QuarticInOut: function QuarticInOut(k) {

        if ((k *= 2) < 1) {
            return 0.5 * k * k * k * k;
        }

        return -0.5 * ((k -= 2) * k * k * k - 2);
    },

    QuinticIn: function QuinticIn(k) {

        return k * k * k * k * k;
    },

    QuinticOut: function QuinticOut(k) {

        return --k * k * k * k * k + 1;
    },

    QuinticInOut: function QuinticInOut(k) {

        if ((k *= 2) < 1) {
            return 0.5 * k * k * k * k * k;
        }

        return 0.5 * ((k -= 2) * k * k * k * k + 2);
    },

    SinusoidalIn: function SinusoidalIn(k) {

        return 1 - Math.cos(k * Math.PI / 2);
    },

    SinusoidalOut: function SinusoidalOut(k) {

        return Math.sin(k * Math.PI / 2);
    },

    SinusoidalInOut: function SinusoidalInOut(k) {

        return 0.5 * (1 - Math.cos(Math.PI * k));
    },

    ExponentialIn: function ExponentialIn(k) {

        return k === 0 ? 0 : Math.pow(1024, k - 1);
    },

    ExponentialOut: function ExponentialOut(k) {

        return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
    },

    ExponentialInOut: function ExponentialInOut(k) {

        if (k === 0) {
            return 0;
        }

        if (k === 1) {
            return 1;
        }

        if ((k *= 2) < 1) {
            return 0.5 * Math.pow(1024, k - 1);
        }

        return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
    },

    CircularIn: function CircularIn(k) {

        return 1 - Math.sqrt(1 - k * k);
    },

    CircularOut: function CircularOut(k) {

        return Math.sqrt(1 - --k * k);
    },

    CircularInOut: function CircularInOut(k) {

        if ((k *= 2) < 1) {
            return -0.5 * (Math.sqrt(1 - k * k) - 1);
        }

        return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    },

    ElasticIn: function ElasticIn(k) {

        var s;
        var a = 0.1;
        var p = 0.4;

        if (k === 0) {
            return 0;
        }

        if (k === 1) {
            return 1;
        }

        if (!a || a < 1) {
            a = 1;
            s = p / 4;
        } else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }

        return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
    },

    ElasticOut: function ElasticOut(k) {

        var s;
        var a = 0.1;
        var p = 0.4;

        if (k === 0) {
            return 0;
        }

        if (k === 1) {
            return 1;
        }

        if (!a || a < 1) {
            a = 1;
            s = p / 4;
        } else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }

        return a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
    },

    ElasticInOut: function ElasticInOut(k) {

        var s;
        var a = 0.1;
        var p = 0.4;

        if (k === 0) {
            return 0;
        }

        if (k === 1) {
            return 1;
        }

        if (!a || a < 1) {
            a = 1;
            s = p / 4;
        } else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }

        if ((k *= 2) < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
        }

        return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
    },

    BackIn: function BackIn(k) {

        var s = 1.70158;

        return k * k * ((s + 1) * k - s);
    },

    BackOut: function BackOut(k) {

        var s = 1.70158;

        return --k * k * ((s + 1) * k + s) + 1;
    },

    BackInOut: function BackInOut(k) {

        var s = 1.70158 * 1.525;

        if ((k *= 2) < 1) {
            return 0.5 * (k * k * ((s + 1) * k - s));
        }

        return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    },

    BounceIn: function BounceIn(k) {

        return 1 - Easing.BounceOut(1 - k);
    },

    BounceOut: function BounceOut(k) {

        if (k < 1 / 2.75) {
            return 7.5625 * k * k;
        } else if (k < 2 / 2.75) {
            return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
        } else if (k < 2.5 / 2.75) {
            return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
        } else {
            return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
        }
    },

    BounceInOut: function BounceInOut(k) {

        if (k < 0.5) {
            return Easing.BounceIn(k * 2) * 0.5;
        }

        return Easing.BounceOut(k * 2 - 1) * 0.5 + 0.5;
    }

};

exports["default"] = Easing;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @file Utils
 * @author redmed
 * @date 2017/4/26
 */

function pullAt(array, indexes) {
    var length = array ? indexes.length : 0;

    if (length > 0) {
        while (length--) {
            var index = indexes[length];
            Array.prototype.splice.call(array, index, 1);
        }
    }

    return array;
}

function remove(array, predicate) {
    var result = [];

    if (!(array && array.length)) {
        return result;
    }

    if (typeof predicate == 'function') {
        var index = -1,
            indexes = [],
            length = array.length;

        while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
                result.push(value);
                indexes.push(index);
            }
        }

        pullAt(array, indexes);
    }

    return result;
}

function clone(obj) {
    return obj;
}

exports['default'] = {
    remove: remove,
    clone: clone
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ShaderClip = exports.Clip = exports.Animation = undefined;

var _animation = __webpack_require__(2);

var _animation2 = _interopRequireDefault(_animation);

var _clip = __webpack_require__(0);

var _clip2 = _interopRequireDefault(_clip);

var _shader = __webpack_require__(3);

var _shader2 = _interopRequireDefault(_shader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Animation = _animation2['default'];
exports.Clip = _clip2['default'];
exports.ShaderClip = _shader2['default'];

/***/ })
/******/ ]);
});