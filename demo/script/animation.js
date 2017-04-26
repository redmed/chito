(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Animator", [], factory);
	else if(typeof exports === 'object')
		exports["Animator"] = factory();
	else
		root["Animator"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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

var _EventEmitter2 = __webpack_require__(1);

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

var _Easing = __webpack_require__(6);

var _Easing2 = _interopRequireDefault(_Easing);

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
            this._easing = _Easing2['default'][easing] ? _Easing2['default'][easing] : easing;
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
}(_EventEmitter3['default']);

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
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventEmitter2 = __webpack_require__(1);

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

var _lodashCustom = __webpack_require__(11);

var _lodashCustom2 = _interopRequireDefault(_lodashCustom);

var _animationFrame = __webpack_require__(8);

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
    function Animation() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Animation);

        var _this = _possibleConstructorReturn(this, (Animation.__proto__ || Object.getPrototypeOf(Animation)).call(this));

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
                _this2._animationTimer = (0, _animationFrame.requestAnimationFrame)(_this2._animation);
                _this2.emit(Event.UPDATE, timestamp);

                // 替换掉原生filter
                var aliveClips = _this2._aliveClips;
                var alive = [];

                var i = 0,
                    len = aliveClips.length;

                while (i < len) {
                    var clip = aliveClips[i];

                    var finish = clip.update(timestamp);
                    clip._finish = finish;

                    // 未结束的动画保存下来, 以便下次继续执行
                    if (finish) {
                        alive.push(clip);
                    }

                    i++;
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

            (0, _animationFrame.requestAnimationFrame)(this._animation);
            this._status = 1;
        }

        /**
         * 停止动画进程
         */

    }, {
        key: 'stop',
        value: function stop() {
            if (this._animationTimer) {
                (0, _animationFrame.cancelAnimationFrame)(this._animationTimer);
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
                _lodashCustom2['default'].remove(this._clips, function (c) {
                    return c === clip;
                });

                _lodashCustom2['default'].remove(this._aliveClips, function (c) {
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
}(_EventEmitter3['default']);

Animation.Event = Event;
exports['default'] = Animation;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Clip2 = __webpack_require__(0);

var _Clip3 = _interopRequireDefault(_Clip2);

var _Interpolation = __webpack_require__(7);

var _Interpolation2 = _interopRequireDefault(_Interpolation);

var _ColorHelper = __webpack_require__(9);

var _ColorHelper2 = _interopRequireDefault(_ColorHelper);

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
                        val = _ColorHelper2['default'].linearGradient(val, progress);
                        val = _ColorHelper2['default'].toRGBA(val);
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

            if (_ColorHelper2['default'].isColor(val)) {
                val = _ColorHelper2['default'].toNormalArray(val);
            } else {
                val = _.clone(val);
            }

            _attr[key] = val;
        }
    }

    return _attr;
}

/**
 * 渲染器
 */

var Shader = function (_Clip) {
    _inherits(Shader, _Clip);

    /**
     * 存储属性
     * @type {Object}
     * @private
     */
    function Shader() {
        _classCallCheck(this, Shader);

        var _this = _possibleConstructorReturn(this, (Shader.__proto__ || Object.getPrototypeOf(Shader)).call(this));

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


    _createClass(Shader, [{
        key: 'initialize',
        value: function initialize(options, attr) {

            _get(Shader.prototype.__proto__ || Object.getPrototypeOf(Shader.prototype), 'initialize', this).call(this, options);
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
                            val = _ColorHelper2['default'].linearGradient(val, percent);
                            val = _ColorHelper2['default'].toRGBA(val);
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

    return Shader;
}(_Clip3['default']);

exports['default'] = Shader;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shader = exports.Clip = exports.Animation = undefined;

var _Animation = __webpack_require__(3);

var _Animation2 = _interopRequireDefault(_Animation);

var _Clip = __webpack_require__(0);

var _Clip2 = _interopRequireDefault(_Clip);

var _Shader = __webpack_require__(4);

var _Shader2 = _interopRequireDefault(_Shader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Animation = _Animation2['default'];
exports.Clip = _Clip2['default'];
exports.Shader = _Shader2['default']; /**
                                       * @file
                                       * @author redmed
                                       * @date 2017/4/26
                                       */

/***/ }),
/* 6 */
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
/* 7 */
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
/* 8 */
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
/* 9 */
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

var _csscolorparser = __webpack_require__(10);

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
/* 10 */
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @license
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash include="isObject,isArray,isFunction,isString,forEach,flatten,defaults,assignIn,extend,merge,defaultsDeep,clone,cloneWith,cloneDeep,cloneDeepWith,Math,random,uniq,remove,map" -o ./src/common/lodash.custom.js`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
;(function () {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /** Used as the semantic version number. */
  var VERSION = '4.15.0';

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /** Used as the `TypeError` message for "Functions" methods. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /** Used to compose bitmasks for comparison styles. */
  var UNORDERED_COMPARE_FLAG = 1,
      PARTIAL_COMPARE_FLAG = 2;

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0,
      MAX_SAFE_INTEGER = 9007199254740991,
      MAX_INTEGER = 1.7976931348623157e+308,
      NAN = 0 / 0;

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      promiseTag = '[object Promise]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      symbolTag = '[object Symbol]',
      weakMapTag = '[object WeakMap]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/,
      reLeadingDot = /^\./,
      rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /** Used to match leading and trailing whitespace. */
  var reTrim = /^\s+|\s+$/g;

  /** Used to match backslashes in property paths. */
  var reEscapeChar = /\\(\\)?/g;

  /** Used to match `RegExp` flags from their coerced string values. */
  var reFlags = /\w*$/;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

  /** Used to identify `toStringTag` values supported by `_.clone`. */
  var cloneableTags = {};
  cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;

  /** Built-in method references without a dependency on `root`. */
  var freeParseFloat = parseFloat,
      freeParseInt = parseInt;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

  /** Detect free variable `self`. */
  var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || Function('return this')();

  /** Detect free variable `exports`. */
  var freeExports = ( false ? 'undefined' : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && ( false ? 'undefined' : _typeof(module)) == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = function () {
    try {
      return freeProcess && freeProcess.binding('util');
    } catch (e) {}
  }();

  /* Node.js helper references. */
  var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

  /*--------------------------------------------------------------------------*/

  /**
   * Adds the key-value `pair` to `map`.
   *
   * @private
   * @param {Object} map The map to modify.
   * @param {Array} pair The key-value pair to add.
   * @returns {Object} Returns `map`.
   */
  function addMapEntry(map, pair) {
    // Don't return `map.set` because it's not chainable in IE 11.
    map.set(pair[0], pair[1]);
    return map;
  }

  /**
   * Adds `value` to `set`.
   *
   * @private
   * @param {Object} set The set to modify.
   * @param {*} value The value to add.
   * @returns {Object} Returns `set`.
   */
  function addSetEntry(set, value) {
    // Don't return `set.add` because it's not chainable in IE 11.
    set.add(value);
    return set;
  }

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0:
        return func.call(thisArg);
      case 1:
        return func.call(thisArg, args[0]);
      case 2:
        return func.call(thisArg, args[0], args[1]);
      case 3:
        return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }

  /**
   * A specialized version of `_.forEach` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEach(array, iteratee) {
    var index = -1,
        length = array ? array.length : 0;

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }

  /**
   * A specialized version of `_.includes` for arrays without support for
   * specifying an index to search from.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */
  function arrayIncludes(array, value) {
    var length = array ? array.length : 0;
    return !!length && baseIndexOf(array, value, 0) > -1;
  }

  /**
   * This function is like `arrayIncludes` except that it accepts a comparator.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @param {Function} comparator The comparator invoked per element.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */
  function arrayIncludesWith(array, value, comparator) {
    var index = -1,
        length = array ? array.length : 0;

    while (++index < length) {
      if (comparator(value, array[index])) {
        return true;
      }
    }
    return false;
  }

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array ? array.length : 0,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */
  function arrayPush(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }

  /**
   * A specialized version of `_.reduce` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {*} [accumulator] The initial value.
   * @param {boolean} [initAccum] Specify using the first element of `array` as
   *  the initial value.
   * @returns {*} Returns the accumulated value.
   */
  function arrayReduce(array, iteratee, accumulator, initAccum) {
    var index = -1,
        length = array ? array.length : 0;

    if (initAccum && length) {
      accumulator = array[++index];
    }
    while (++index < length) {
      accumulator = iteratee(accumulator, array[index], index, array);
    }
    return accumulator;
  }

  /**
   * A specialized version of `_.some` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {boolean} Returns `true` if any element passes the predicate check,
   *  else `false`.
   */
  function arraySome(array, predicate) {
    var index = -1,
        length = array ? array.length : 0;

    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }

  /**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} predicate The function invoked per iteration.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 1 : -1);

    while (fromRight ? index-- : ++index < length) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOf(array, value, fromIndex) {
    if (value !== value) {
      return baseFindIndex(array, baseIsNaN, fromIndex);
    }
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.isNaN` without support for number objects.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
   */
  function baseIsNaN(value) {
    return value !== value;
  }

  /**
   * The base implementation of `_.mean` and `_.meanBy` without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {number} Returns the mean.
   */
  function baseMean(array, iteratee) {
    var length = array ? array.length : 0;
    return length ? baseSum(array, iteratee) / length : NAN;
  }

  /**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function baseProperty(key) {
    return function (object) {
      return object == null ? undefined : object[key];
    };
  }

  /**
   * The base implementation of `_.sum` and `_.sumBy` without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {number} Returns the sum.
   */
  function baseSum(array, iteratee) {
    var result,
        index = -1,
        length = array.length;

    while (++index < length) {
      var current = iteratee(array[index]);
      if (current !== undefined) {
        result = result === undefined ? current : result + current;
      }
    }
    return result;
  }

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function (value) {
      return func(value);
    };
  }

  /**
   * Checks if a cache value for `key` exists.
   *
   * @private
   * @param {Object} cache The cache to query.
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function cacheHas(cache, key) {
    return cache.has(key);
  }

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  /**
   * Checks if `value` is a host object in IE < 9.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
   */
  function isHostObject(value) {
    // Many host objects are `Object` objects that can coerce to strings
    // despite having improperly defined `toString` methods.
    var result = false;
    if (value != null && typeof value.toString != 'function') {
      try {
        result = !!(value + '');
      } catch (e) {}
    }
    return result;
  }

  /**
   * Converts `map` to its key-value pairs.
   *
   * @private
   * @param {Object} map The map to convert.
   * @returns {Array} Returns the key-value pairs.
   */
  function mapToArray(map) {
    var index = -1,
        result = Array(map.size);

    map.forEach(function (value, key) {
      result[++index] = [key, value];
    });
    return result;
  }

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function (arg) {
      return func(transform(arg));
    };
  }

  /**
   * Converts `set` to an array of its values.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the values.
   */
  function setToArray(set) {
    var index = -1,
        result = Array(set.size);

    set.forEach(function (value) {
      result[++index] = value;
    });
    return result;
  }

  /*--------------------------------------------------------------------------*/

  /** Used for built-in method references. */
  var arrayProto = Array.prototype,
      funcProto = Function.prototype,
      objectProto = Object.prototype;

  /** Used to detect overreaching core-js shims. */
  var coreJsData = root['__core-js_shared__'];

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = function () {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
    return uid ? 'Symbol(src)_1.' + uid : '';
  }();

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /** Used to infer the `Object` constructor. */
  var objectCtorString = funcToString.call(Object);

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var objectToString = objectProto.toString;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

  /** Built-in value references. */
  var Buffer = moduleExports ? root.Buffer : undefined,
      _Symbol = root.Symbol,
      Uint8Array = root.Uint8Array,
      getPrototype = overArg(Object.getPrototypeOf, Object),
      objectCreate = Object.create,
      propertyIsEnumerable = objectProto.propertyIsEnumerable,
      splice = arrayProto.splice,
      spreadableSymbol = _Symbol ? _Symbol.isConcatSpreadable : undefined;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeFloor = Math.floor,
      nativeGetSymbols = Object.getOwnPropertySymbols,
      nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
      nativeKeys = overArg(Object.keys, Object),
      nativeMax = Math.max,
      nativeMin = Math.min,
      nativeRandom = Math.random;

  /* Built-in method references that are verified to be native. */
  var DataView = getNative(root, 'DataView'),
      Map = getNative(root, 'Map'),
      Promise = getNative(root, 'Promise'),
      Set = getNative(root, 'Set'),
      WeakMap = getNative(root, 'WeakMap'),
      nativeCreate = getNative(Object, 'create');

  /** Used to lookup unminified function names. */
  var realNames = {};

  /** Used to detect maps, sets, and weakmaps. */
  var dataViewCtorString = toSource(DataView),
      mapCtorString = toSource(Map),
      promiseCtorString = toSource(Promise),
      setCtorString = toSource(Set),
      weakMapCtorString = toSource(WeakMap);

  /** Used to convert symbols to primitives and strings. */
  var symbolProto = _Symbol ? _Symbol.prototype : undefined,
      symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
      symbolToString = symbolProto ? symbolProto.toString : undefined;

  /*------------------------------------------------------------------------*/

  /**
   * Creates a `lodash` object which wraps `value` to enable implicit method
   * chain sequences. Methods that operate on and return arrays, collections,
   * and functions can be chained together. Methods that retrieve a single value
   * or may return a primitive value will automatically end the chain sequence
   * and return the unwrapped value. Otherwise, the value must be unwrapped
   * with `_#value`.
   *
   * Explicit chain sequences, which must be unwrapped with `_#value`, may be
   * enabled using `_.chain`.
   *
   * The execution of chained methods is lazy, that is, it's deferred until
   * `_#value` is implicitly or explicitly called.
   *
   * Lazy evaluation allows several methods to support shortcut fusion.
   * Shortcut fusion is an optimization to merge iteratee calls; this avoids
   * the creation of intermediate arrays and can greatly reduce the number of
   * iteratee executions. Sections of a chain sequence qualify for shortcut
   * fusion if the section is applied to an array of at least `200` elements
   * and any iteratees accept only one argument. The heuristic for whether a
   * section qualifies for shortcut fusion is subject to change.
   *
   * Chaining is supported in custom builds as long as the `_#value` method is
   * directly or indirectly included in the build.
   *
   * In addition to lodash methods, wrappers have `Array` and `String` methods.
   *
   * The wrapper `Array` methods are:
   * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
   *
   * The wrapper `String` methods are:
   * `replace` and `split`
   *
   * The wrapper methods that support shortcut fusion are:
   * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
   * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
   * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
   *
   * The chainable wrapper methods are:
   * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
   * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
   * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
   * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
   * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
   * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
   * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
   * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
   * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
   * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
   * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
   * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
   * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
   * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
   * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
   * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
   * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
   * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
   * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
   * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
   * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
   * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
   * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
   * `zipObject`, `zipObjectDeep`, and `zipWith`
   *
   * The wrapper methods that are **not** chainable by default are:
   * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
   * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
   * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
   * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
   * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
   * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
   * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
   * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
   * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
   * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
   * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
   * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
   * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
   * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
   * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
   * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
   * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
   * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
   * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
   * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
   * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
   * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
   * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
   * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
   * `upperFirst`, `value`, and `words`
   *
   * @name _
   * @constructor
   * @category Seq
   * @param {*} value The value to wrap in a `lodash` instance.
   * @returns {Object} Returns the new `lodash` wrapper instance.
   * @example
   *
   * function square(n) {
   *   return n * n;
   * }
   *
   * var wrapped = _([1, 2, 3]);
   *
   * // Returns an unwrapped value.
   * wrapped.reduce(_.add);
   * // => 6
   *
   * // Returns a wrapped value.
   * var squares = wrapped.map(square);
   *
   * _.isArray(squares);
   * // => false
   *
   * _.isArray(squares.value());
   * // => true
   */
  function lodash() {}
  // No operation performed.


  /*------------------------------------------------------------------------*/

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Hash(entries) {
    var index = -1,
        length = entries ? entries.length : 0;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
  }

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function hashDelete(key) {
    return this.has(key) && delete this.__data__[key];
  }

  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? undefined : result;
    }
    return hasOwnProperty.call(data, key) ? data[key] : undefined;
  }

  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
  }

  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */
  function hashSet(key, value) {
    var data = this.__data__;
    data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
    return this;
  }

  // Add methods to `Hash`.
  Hash.prototype.clear = hashClear;
  Hash.prototype['delete'] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;

  /*------------------------------------------------------------------------*/

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function ListCache(entries) {
    var index = -1,
        length = entries ? entries.length : 0;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = [];
  }

  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function listCacheDelete(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    return true;
  }

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function listCacheGet(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    return index < 0 ? undefined : data[index][1];
  }

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  function listCacheSet(key, value) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }

  // Add methods to `ListCache`.
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype['delete'] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;

  /*------------------------------------------------------------------------*/

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function MapCache(entries) {
    var index = -1,
        length = entries ? entries.length : 0;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */
  function mapCacheClear() {
    this.__data__ = {
      'hash': new Hash(),
      'map': new (Map || ListCache)(),
      'string': new Hash()
    };
  }

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function mapCacheDelete(key) {
    return getMapData(this, key)['delete'](key);
  }

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */
  function mapCacheSet(key, value) {
    getMapData(this, key).set(key, value);
    return this;
  }

  // Add methods to `MapCache`.
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype['delete'] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;

  /*------------------------------------------------------------------------*/

  /**
   *
   * Creates an array cache object to store unique values.
   *
   * @private
   * @constructor
   * @param {Array} [values] The values to cache.
   */
  function SetCache(values) {
    var index = -1,
        length = values ? values.length : 0;

    this.__data__ = new MapCache();
    while (++index < length) {
      this.add(values[index]);
    }
  }

  /**
   * Adds `value` to the array cache.
   *
   * @private
   * @name add
   * @memberOf SetCache
   * @alias push
   * @param {*} value The value to cache.
   * @returns {Object} Returns the cache instance.
   */
  function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED);
    return this;
  }

  /**
   * Checks if `value` is in the array cache.
   *
   * @private
   * @name has
   * @memberOf SetCache
   * @param {*} value The value to search for.
   * @returns {number} Returns `true` if `value` is found, else `false`.
   */
  function setCacheHas(value) {
    return this.__data__.has(value);
  }

  // Add methods to `SetCache`.
  SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
  SetCache.prototype.has = setCacheHas;

  /*------------------------------------------------------------------------*/

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Stack(entries) {
    this.__data__ = new ListCache(entries);
  }

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */
  function stackClear() {
    this.__data__ = new ListCache();
  }

  /**
   * Removes `key` and its value from the stack.
   *
   * @private
   * @name delete
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function stackDelete(key) {
    return this.__data__['delete'](key);
  }

  /**
   * Gets the stack value for `key`.
   *
   * @private
   * @name get
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function stackGet(key) {
    return this.__data__.get(key);
  }

  /**
   * Checks if a stack value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function stackHas(key) {
    return this.__data__.has(key);
  }

  /**
   * Sets the stack `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Stack
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the stack cache instance.
   */
  function stackSet(key, value) {
    var cache = this.__data__;
    if (cache instanceof ListCache) {
      var pairs = cache.__data__;
      if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        return this;
      }
      cache = this.__data__ = new MapCache(pairs);
    }
    cache.set(key, value);
    return this;
  }

  // Add methods to `Stack`.
  Stack.prototype.clear = stackClear;
  Stack.prototype['delete'] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;

  /*------------------------------------------------------------------------*/

  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */
  function arrayLikeKeys(value, inherited) {
    // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
    // Safari 9 makes `arguments.length` enumerable in strict mode.
    var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];

    var length = result.length,
        skipIndexes = !!length;

    for (var key in value) {
      if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }

  /**
   * Used by `_.defaults` to customize its `_.assignIn` use.
   *
   * @private
   * @param {*} objValue The destination value.
   * @param {*} srcValue The source value.
   * @param {string} key The key of the property to assign.
   * @param {Object} object The parent object of `objValue`.
   * @returns {*} Returns the value to assign.
   */
  function assignInDefaults(objValue, srcValue, key, object) {
    if (objValue === undefined || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
      return srcValue;
    }
    return objValue;
  }

  /**
   * This function is like `assignValue` except that it doesn't assign
   * `undefined` values.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignMergeValue(object, key, value) {
    if (value !== undefined && !eq(object[key], value) || typeof key == 'number' && value === undefined && !(key in object)) {
      object[key] = value;
    }
  }

  /**
   * Assigns `value` to `key` of `object` if the existing value is not equivalent
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
      object[key] = value;
    }
  }

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.assign` without support for multiple sources
   * or `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @returns {Object} Returns `object`.
   */
  function baseAssign(object, source) {
    return object && copyObject(source, keys(source), object);
  }

  /**
   * The base implementation of `_.clone` and `_.cloneDeep` which tracks
   * traversed objects.
   *
   * @private
   * @param {*} value The value to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @param {boolean} [isFull] Specify a clone including symbols.
   * @param {Function} [customizer] The function to customize cloning.
   * @param {string} [key] The key of `value`.
   * @param {Object} [object] The parent object of `value`.
   * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
   * @returns {*} Returns the cloned value.
   */
  function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
    var result;
    if (customizer) {
      result = object ? customizer(value, key, object, stack) : customizer(value);
    }
    if (result !== undefined) {
      return result;
    }
    if (!isObject(value)) {
      return value;
    }
    var isArr = isArray(value);
    if (isArr) {
      result = initCloneArray(value);
      if (!isDeep) {
        return copyArray(value, result);
      }
    } else {
      var tag = getTag(value),
          isFunc = tag == funcTag || tag == genTag;

      if (isBuffer(value)) {
        return cloneBuffer(value, isDeep);
      }
      if (tag == objectTag || tag == argsTag || isFunc && !object) {
        if (isHostObject(value)) {
          return object ? value : {};
        }
        result = initCloneObject(isFunc ? {} : value);
        if (!isDeep) {
          return copySymbols(value, baseAssign(result, value));
        }
      } else {
        if (!cloneableTags[tag]) {
          return object ? value : {};
        }
        result = initCloneByTag(value, tag, baseClone, isDeep);
      }
    }
    // Check for circular references and return its corresponding clone.
    stack || (stack = new Stack());
    var stacked = stack.get(value);
    if (stacked) {
      return stacked;
    }
    stack.set(value, result);

    if (!isArr) {
      var props = isFull ? getAllKeys(value) : keys(value);
    }
    arrayEach(props || value, function (subValue, key) {
      if (props) {
        key = subValue;
        subValue = value[key];
      }
      // Recursively populate clone (susceptible to call stack limits).
      assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
    });
    return result;
  }

  /**
   * The base implementation of `_.create` without support for assigning
   * properties to the created object.
   *
   * @private
   * @param {Object} prototype The object to inherit from.
   * @returns {Object} Returns the new object.
   */
  function baseCreate(proto) {
    return isObject(proto) ? objectCreate(proto) : {};
  }

  /**
   * The base implementation of `_.forEach` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   */
  var baseEach = createBaseEach(baseForOwn);

  /**
   * The base implementation of methods like `_.max` and `_.min` which accepts a
   * `comparator` to determine the extremum value.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} iteratee The iteratee invoked per iteration.
   * @param {Function} comparator The comparator used to compare values.
   * @returns {*} Returns the extremum value.
   */
  function baseExtremum(array, iteratee, comparator) {
    var index = -1,
        length = array.length;

    while (++index < length) {
      var value = array[index],
          current = iteratee(value);

      if (current != null && (computed === undefined ? current === current && !isSymbol(current) : comparator(current, computed))) {
        var computed = current,
            result = value;
      }
    }
    return result;
  }

  /**
   * The base implementation of `_.flatten` with support for restricting flattening.
   *
   * @private
   * @param {Array} array The array to flatten.
   * @param {number} depth The maximum recursion depth.
   * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
   * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
   * @param {Array} [result=[]] The initial result value.
   * @returns {Array} Returns the new flattened array.
   */
  function baseFlatten(array, depth, predicate, isStrict, result) {
    var index = -1,
        length = array.length;

    predicate || (predicate = isFlattenable);
    result || (result = []);

    while (++index < length) {
      var value = array[index];
      if (depth > 0 && predicate(value)) {
        if (depth > 1) {
          // Recursively flatten arrays (susceptible to call stack limits).
          baseFlatten(value, depth - 1, predicate, isStrict, result);
        } else {
          arrayPush(result, value);
        }
      } else if (!isStrict) {
        result[result.length] = value;
      }
    }
    return result;
  }

  /**
   * The base implementation of `baseForOwn` which iterates over `object`
   * properties returned by `keysFunc` and invokes `iteratee` for each property.
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  var baseFor = createBaseFor();

  /**
   * The base implementation of `_.forOwn` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Object} Returns `object`.
   */
  function baseForOwn(object, iteratee) {
    return object && baseFor(object, iteratee, keys);
  }

  /**
   * The base implementation of `_.get` without support for default values.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @returns {*} Returns the resolved value.
   */
  function baseGet(object, path) {
    path = isKey(path, object) ? [path] : castPath(path);

    var index = 0,
        length = path.length;

    while (object != null && index < length) {
      object = object[toKey(path[index++])];
    }
    return index && index == length ? object : undefined;
  }

  /**
   * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
   * `keysFunc` and `symbolsFunc` to get the enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @param {Function} symbolsFunc The function to get the symbols of `object`.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
  }

  /**
   * The base implementation of `getTag`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    return objectToString.call(value);
  }

  /**
   * The base implementation of `_.gt` which doesn't coerce arguments.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if `value` is greater than `other`,
   *  else `false`.
   */
  function baseGt(value, other) {
    return value > other;
  }

  /**
   * The base implementation of `_.hasIn` without support for deep paths.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {Array|string} key The key to check.
   * @returns {boolean} Returns `true` if `key` exists, else `false`.
   */
  function baseHasIn(object, key) {
    return object != null && key in Object(object);
  }

  /**
   * The base implementation of `_.isEqual` which supports partial comparisons
   * and tracks traversed objects.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @param {Function} [customizer] The function to customize comparisons.
   * @param {boolean} [bitmask] The bitmask of comparison flags.
   *  The bitmask may be composed of the following flags:
   *     1 - Unordered comparison
   *     2 - Partial comparison
   * @param {Object} [stack] Tracks traversed `value` and `other` objects.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   */
  function baseIsEqual(value, other, customizer, bitmask, stack) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || !isObject(value) && !isObjectLike(other)) {
      return value !== value && other !== other;
    }
    return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
  }

  /**
   * A specialized version of `baseIsEqual` for arrays and objects which performs
   * deep comparisons and tracks traversed objects enabling objects with circular
   * references to be compared.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Function} [customizer] The function to customize comparisons.
   * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
   *  for more details.
   * @param {Object} [stack] Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
    var objIsArr = isArray(object),
        othIsArr = isArray(other),
        objTag = arrayTag,
        othTag = arrayTag;

    if (!objIsArr) {
      objTag = getTag(object);
      objTag = objTag == argsTag ? objectTag : objTag;
    }
    if (!othIsArr) {
      othTag = getTag(other);
      othTag = othTag == argsTag ? objectTag : othTag;
    }
    var objIsObj = objTag == objectTag && !isHostObject(object),
        othIsObj = othTag == objectTag && !isHostObject(other),
        isSameTag = objTag == othTag;

    if (isSameTag && !objIsObj) {
      stack || (stack = new Stack());
      return objIsArr || isTypedArray(object) ? equalArrays(object, other, equalFunc, customizer, bitmask, stack) : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
    }
    if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
      var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
          othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object,
            othUnwrapped = othIsWrapped ? other.value() : other;

        stack || (stack = new Stack());
        return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
      }
    }
    if (!isSameTag) {
      return false;
    }
    stack || (stack = new Stack());
    return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
  }

  /**
   * The base implementation of `_.isMatch` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to inspect.
   * @param {Object} source The object of property values to match.
   * @param {Array} matchData The property names, values, and compare flags to match.
   * @param {Function} [customizer] The function to customize comparisons.
   * @returns {boolean} Returns `true` if `object` is a match, else `false`.
   */
  function baseIsMatch(object, source, matchData, customizer) {
    var index = matchData.length,
        length = index,
        noCustomizer = !customizer;

    if (object == null) {
      return !length;
    }
    object = Object(object);
    while (index--) {
      var data = matchData[index];
      if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
        return false;
      }
    }
    while (++index < length) {
      data = matchData[index];
      var key = data[0],
          objValue = object[key],
          srcValue = data[1];

      if (noCustomizer && data[2]) {
        if (objValue === undefined && !(key in object)) {
          return false;
        }
      } else {
        var stack = new Stack();
        if (customizer) {
          var result = customizer(objValue, srcValue, key, object, source, stack);
        }
        if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack) : result)) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }

  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */
  function baseIsTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
  }

  /**
   * The base implementation of `_.iteratee`.
   *
   * @private
   * @param {*} [value=_.identity] The value to convert to an iteratee.
   * @returns {Function} Returns the iteratee.
   */
  function baseIteratee(value) {
    // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
    // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
    if (typeof value == 'function') {
      return value;
    }
    if (value == null) {
      return identity;
    }
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') {
      return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
    }
    return property(value);
  }

  /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeys(object) {
    if (!isPrototype(object)) {
      return nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }
    return result;
  }

  /**
   * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeysIn(object) {
    if (!isObject(object)) {
      return nativeKeysIn(object);
    }
    var isProto = isPrototype(object),
        result = [];

    for (var key in object) {
      if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }

  /**
   * The base implementation of `_.lt` which doesn't coerce arguments.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if `value` is less than `other`,
   *  else `false`.
   */
  function baseLt(value, other) {
    return value < other;
  }

  /**
   * The base implementation of `_.map` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function baseMap(collection, iteratee) {
    var index = -1,
        result = isArrayLike(collection) ? Array(collection.length) : [];

    baseEach(collection, function (value, key, collection) {
      result[++index] = iteratee(value, key, collection);
    });
    return result;
  }

  /**
   * The base implementation of `_.matches` which doesn't clone `source`.
   *
   * @private
   * @param {Object} source The object of property values to match.
   * @returns {Function} Returns the new spec function.
   */
  function baseMatches(source) {
    var matchData = getMatchData(source);
    if (matchData.length == 1 && matchData[0][2]) {
      return matchesStrictComparable(matchData[0][0], matchData[0][1]);
    }
    return function (object) {
      return object === source || baseIsMatch(object, source, matchData);
    };
  }

  /**
   * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
   *
   * @private
   * @param {string} path The path of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   */
  function baseMatchesProperty(path, srcValue) {
    if (isKey(path) && isStrictComparable(srcValue)) {
      return matchesStrictComparable(toKey(path), srcValue);
    }
    return function (object) {
      var objValue = get(object, path);
      return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
    };
  }

  /**
   * The base implementation of `_.merge` without support for multiple sources.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} [customizer] The function to customize merged values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */
  function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) {
      return;
    }
    if (!(isArray(source) || isTypedArray(source))) {
      var props = baseKeysIn(source);
    }
    arrayEach(props || source, function (srcValue, key) {
      if (props) {
        key = srcValue;
        srcValue = source[key];
      }
      if (isObject(srcValue)) {
        stack || (stack = new Stack());
        baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
      } else {
        var newValue = customizer ? customizer(object[key], srcValue, key + '', object, source, stack) : undefined;

        if (newValue === undefined) {
          newValue = srcValue;
        }
        assignMergeValue(object, key, newValue);
      }
    });
  }

  /**
   * A specialized version of `baseMerge` for arrays and objects which performs
   * deep merges and tracks traversed objects enabling objects with circular
   * references to be merged.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {string} key The key of the value to merge.
   * @param {number} srcIndex The index of `source`.
   * @param {Function} mergeFunc The function to merge values.
   * @param {Function} [customizer] The function to customize assigned values.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   */
  function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = object[key],
        srcValue = source[key],
        stacked = stack.get(srcValue);

    if (stacked) {
      assignMergeValue(object, key, stacked);
      return;
    }
    var newValue = customizer ? customizer(objValue, srcValue, key + '', object, source, stack) : undefined;

    var isCommon = newValue === undefined;

    if (isCommon) {
      newValue = srcValue;
      if (isArray(srcValue) || isTypedArray(srcValue)) {
        if (isArray(objValue)) {
          newValue = objValue;
        } else if (isArrayLikeObject(objValue)) {
          newValue = copyArray(objValue);
        } else {
          isCommon = false;
          newValue = baseClone(srcValue, true);
        }
      } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
        if (isArguments(objValue)) {
          newValue = toPlainObject(objValue);
        } else if (!isObject(objValue) || srcIndex && isFunction(objValue)) {
          isCommon = false;
          newValue = baseClone(srcValue, true);
        } else {
          newValue = objValue;
        }
      } else {
        isCommon = false;
      }
    }
    if (isCommon) {
      // Recursively merge objects and arrays (susceptible to call stack limits).
      stack.set(srcValue, newValue);
      mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
      stack['delete'](srcValue);
    }
    assignMergeValue(object, key, newValue);
  }

  /**
   * A specialized version of `baseProperty` which supports deep paths.
   *
   * @private
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function basePropertyDeep(path) {
    return function (object) {
      return baseGet(object, path);
    };
  }

  /**
   * The base implementation of `_.pullAt` without support for individual
   * indexes or capturing the removed elements.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {number[]} indexes The indexes of elements to remove.
   * @returns {Array} Returns `array`.
   */
  function basePullAt(array, indexes) {
    var length = array ? indexes.length : 0,
        lastIndex = length - 1;

    while (length--) {
      var index = indexes[length];
      if (length == lastIndex || index !== previous) {
        var previous = index;
        if (isIndex(index)) {
          splice.call(array, index, 1);
        } else if (!isKey(index, array)) {
          var path = castPath(index),
              object = parent(array, path);

          if (object != null) {
            delete object[toKey(last(path))];
          }
        } else {
          delete array[toKey(index)];
        }
      }
    }
    return array;
  }

  /**
   * The base implementation of `_.random` without support for returning
   * floating-point numbers.
   *
   * @private
   * @param {number} lower The lower bound.
   * @param {number} upper The upper bound.
   * @returns {number} Returns the random number.
   */
  function baseRandom(lower, upper) {
    return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
  }

  /**
   * The base implementation of `_.rest` which doesn't validate or coerce arguments.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   */
  function baseRest(func, start) {
    start = nativeMax(start === undefined ? func.length - 1 : start, 0);
    return function () {
      var args = arguments,
          index = -1,
          length = nativeMax(args.length - start, 0),
          array = Array(length);

      while (++index < length) {
        array[index] = args[start + index];
      }
      index = -1;
      var otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = array;
      return apply(func, this, otherArgs);
    };
  }

  /**
   * The base implementation of `_.slice` without an iteratee call guard.
   *
   * @private
   * @param {Array} array The array to slice.
   * @param {number} [start=0] The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns the slice of `array`.
   */
  function baseSlice(array, start, end) {
    var index = -1,
        length = array.length;

    if (start < 0) {
      start = -start > length ? 0 : length + start;
    }
    end = end > length ? length : end;
    if (end < 0) {
      end += length;
    }
    length = start > end ? 0 : end - start >>> 0;
    start >>>= 0;

    var result = Array(length);
    while (++index < length) {
      result[index] = array[index + start];
    }
    return result;
  }

  /**
   * The base implementation of `_.toNumber` which doesn't ensure correct
   * conversions of binary, hexadecimal, or octal string values.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   */
  function baseToNumber(value) {
    if (typeof value == 'number') {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    return +value;
  }

  /**
   * The base implementation of `_.toString` which doesn't convert nullish
   * values to empty strings.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
  function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value;
    }
    if (isSymbol(value)) {
      return symbolToString ? symbolToString.call(value) : '';
    }
    var result = value + '';
    return result == '0' && 1 / value == -INFINITY ? '-0' : result;
  }

  /**
   * The base implementation of `_.uniqBy` without support for iteratee shorthands.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} [iteratee] The iteratee invoked per element.
   * @param {Function} [comparator] The comparator invoked per element.
   * @returns {Array} Returns the new duplicate free array.
   */
  function baseUniq(array, iteratee, comparator) {
    var index = -1,
        includes = arrayIncludes,
        length = array.length,
        isCommon = true,
        result = [],
        seen = result;

    if (comparator) {
      isCommon = false;
      includes = arrayIncludesWith;
    } else if (length >= LARGE_ARRAY_SIZE) {
      var set = iteratee ? null : createSet(array);
      if (set) {
        return setToArray(set);
      }
      isCommon = false;
      includes = cacheHas;
      seen = new SetCache();
    } else {
      seen = iteratee ? [] : result;
    }
    outer: while (++index < length) {
      var value = array[index],
          computed = iteratee ? iteratee(value) : value;

      value = comparator || value !== 0 ? value : 0;
      if (isCommon && computed === computed) {
        var seenIndex = seen.length;
        while (seenIndex--) {
          if (seen[seenIndex] === computed) {
            continue outer;
          }
        }
        if (iteratee) {
          seen.push(computed);
        }
        result.push(value);
      } else if (!includes(seen, computed, comparator)) {
        if (seen !== result) {
          seen.push(computed);
        }
        result.push(value);
      }
    }
    return result;
  }

  /**
   * Casts `value` to a path array if it's not one.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {Array} Returns the cast property path array.
   */
  function castPath(value) {
    return isArray(value) ? value : stringToPath(value);
  }

  /**
   * Creates a clone of  `buffer`.
   *
   * @private
   * @param {Buffer} buffer The buffer to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Buffer} Returns the cloned buffer.
   */
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var result = new buffer.constructor(buffer.length);
    buffer.copy(result);
    return result;
  }

  /**
   * Creates a clone of `arrayBuffer`.
   *
   * @private
   * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
   * @returns {ArrayBuffer} Returns the cloned array buffer.
   */
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array(result).set(new Uint8Array(arrayBuffer));
    return result;
  }

  /**
   * Creates a clone of `dataView`.
   *
   * @private
   * @param {Object} dataView The data view to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned data view.
   */
  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }

  /**
   * Creates a clone of `map`.
   *
   * @private
   * @param {Object} map The map to clone.
   * @param {Function} cloneFunc The function to clone values.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned map.
   */
  function cloneMap(map, isDeep, cloneFunc) {
    var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
    return arrayReduce(array, addMapEntry, new map.constructor());
  }

  /**
   * Creates a clone of `regexp`.
   *
   * @private
   * @param {Object} regexp The regexp to clone.
   * @returns {Object} Returns the cloned regexp.
   */
  function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
  }

  /**
   * Creates a clone of `set`.
   *
   * @private
   * @param {Object} set The set to clone.
   * @param {Function} cloneFunc The function to clone values.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned set.
   */
  function cloneSet(set, isDeep, cloneFunc) {
    var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
    return arrayReduce(array, addSetEntry, new set.constructor());
  }

  /**
   * Creates a clone of the `symbol` object.
   *
   * @private
   * @param {Object} symbol The symbol object to clone.
   * @returns {Object} Returns the cloned symbol object.
   */
  function cloneSymbol(symbol) {
    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
  }

  /**
   * Creates a clone of `typedArray`.
   *
   * @private
   * @param {Object} typedArray The typed array to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned typed array.
   */
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */
  function copyArray(source, array) {
    var index = -1,
        length = source.length;

    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }

  /**
   * Copies properties of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy properties from.
   * @param {Array} props The property identifiers to copy.
   * @param {Object} [object={}] The object to copy properties to.
   * @param {Function} [customizer] The function to customize copied values.
   * @returns {Object} Returns `object`.
   */
  function copyObject(source, props, object, customizer) {
    object || (object = {});

    var index = -1,
        length = props.length;

    while (++index < length) {
      var key = props[index];

      var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;

      assignValue(object, key, newValue === undefined ? source[key] : newValue);
    }
    return object;
  }

  /**
   * Copies own symbol properties of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy symbols from.
   * @param {Object} [object={}] The object to copy symbols to.
   * @returns {Object} Returns `object`.
   */
  function copySymbols(source, object) {
    return copyObject(source, getSymbols(source), object);
  }

  /**
   * Creates a function like `_.assign`.
   *
   * @private
   * @param {Function} assigner The function to assign values.
   * @returns {Function} Returns the new assigner function.
   */
  function createAssigner(assigner) {
    return baseRest(function (object, sources) {
      var index = -1,
          length = sources.length,
          customizer = length > 1 ? sources[length - 1] : undefined,
          guard = length > 2 ? sources[2] : undefined;

      customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined;

      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? undefined : customizer;
        length = 1;
      }
      object = Object(object);
      while (++index < length) {
        var source = sources[index];
        if (source) {
          assigner(object, source, index, customizer);
        }
      }
      return object;
    });
  }

  /**
   * Creates a `baseEach` or `baseEachRight` function.
   *
   * @private
   * @param {Function} eachFunc The function to iterate over a collection.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseEach(eachFunc, fromRight) {
    return function (collection, iteratee) {
      if (collection == null) {
        return collection;
      }
      if (!isArrayLike(collection)) {
        return eachFunc(collection, iteratee);
      }
      var length = collection.length,
          index = fromRight ? length : -1,
          iterable = Object(collection);

      while (fromRight ? index-- : ++index < length) {
        if (iteratee(iterable[index], index, iterable) === false) {
          break;
        }
      }
      return collection;
    };
  }

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseFor(fromRight) {
    return function (object, iteratee, keysFunc) {
      var index = -1,
          iterable = Object(object),
          props = keysFunc(object),
          length = props.length;

      while (length--) {
        var key = props[fromRight ? length : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }

  /**
   * Creates a function that performs a mathematical operation on two values.
   *
   * @private
   * @param {Function} operator The function to perform the operation.
   * @param {number} [defaultValue] The value used for `undefined` arguments.
   * @returns {Function} Returns the new mathematical operation function.
   */
  function createMathOperation(operator, defaultValue) {
    return function (value, other) {
      var result;
      if (value === undefined && other === undefined) {
        return defaultValue;
      }
      if (value !== undefined) {
        result = value;
      }
      if (other !== undefined) {
        if (result === undefined) {
          return other;
        }
        if (typeof value == 'string' || typeof other == 'string') {
          value = baseToString(value);
          other = baseToString(other);
        } else {
          value = baseToNumber(value);
          other = baseToNumber(other);
        }
        result = operator(value, other);
      }
      return result;
    };
  }

  /**
   * Creates a function like `_.round`.
   *
   * @private
   * @param {string} methodName The name of the `Math` method to use when rounding.
   * @returns {Function} Returns the new round function.
   */
  function createRound(methodName) {
    var func = Math[methodName];
    return function (number, precision) {
      number = toNumber(number);
      precision = nativeMin(toInteger(precision), 292);
      if (precision) {
        // Shift with exponential notation to avoid floating-point issues.
        // See [MDN](https://mdn.io/round#Examples) for more details.
        var pair = (toString(number) + 'e').split('e'),
            value = func(pair[0] + 'e' + (+pair[1] + precision));

        pair = (toString(value) + 'e').split('e');
        return +(pair[0] + 'e' + (+pair[1] - precision));
      }
      return func(number);
    };
  }

  /**
   * Creates a set object of `values`.
   *
   * @private
   * @param {Array} values The values to add to the set.
   * @returns {Object} Returns the new set.
   */
  var createSet = !(Set && 1 / setToArray(new Set([, -0]))[1] == INFINITY) ? noop : function (values) {
    return new Set(values);
  };

  /**
   * A specialized version of `baseIsEqualDeep` for arrays with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Array} array The array to compare.
   * @param {Array} other The other array to compare.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Function} customizer The function to customize comparisons.
   * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
   *  for more details.
   * @param {Object} stack Tracks traversed `array` and `other` objects.
   * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
   */
  function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
    var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
        arrLength = array.length,
        othLength = other.length;

    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    }
    // Assume cyclic values are equal.
    var stacked = stack.get(array);
    if (stacked && stack.get(other)) {
      return stacked == other;
    }
    var index = -1,
        result = true,
        seen = bitmask & UNORDERED_COMPARE_FLAG ? new SetCache() : undefined;

    stack.set(array, other);
    stack.set(other, array);

    // Ignore non-index properties.
    while (++index < arrLength) {
      var arrValue = array[index],
          othValue = other[index];

      if (customizer) {
        var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
      }
      if (compared !== undefined) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
      // Recursively compare arrays (susceptible to call stack limits).
      if (seen) {
        if (!arraySome(other, function (othValue, othIndex) {
          if (!seen.has(othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
            return seen.add(othIndex);
          }
        })) {
          result = false;
          break;
        }
      } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
        result = false;
        break;
      }
    }
    stack['delete'](array);
    stack['delete'](other);
    return result;
  }

  /**
   * A specialized version of `baseIsEqualDeep` for comparing objects of
   * the same `toStringTag`.
   *
   * **Note:** This function only supports comparing values with tags of
   * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {string} tag The `toStringTag` of the objects to compare.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Function} customizer The function to customize comparisons.
   * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
   *  for more details.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
    switch (tag) {
      case dataViewTag:
        if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
          return false;
        }
        object = object.buffer;
        other = other.buffer;

      case arrayBufferTag:
        if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
          return false;
        }
        return true;

      case boolTag:
      case dateTag:
      case numberTag:
        // Coerce booleans to `1` or `0` and dates to milliseconds.
        // Invalid dates are coerced to `NaN`.
        return eq(+object, +other);

      case errorTag:
        return object.name == other.name && object.message == other.message;

      case regexpTag:
      case stringTag:
        // Coerce regexes to strings and treat strings, primitives and objects,
        // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
        // for more details.
        return object == other + '';

      case mapTag:
        var convert = mapToArray;

      case setTag:
        var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
        convert || (convert = setToArray);

        if (object.size != other.size && !isPartial) {
          return false;
        }
        // Assume cyclic values are equal.
        var stacked = stack.get(object);
        if (stacked) {
          return stacked == other;
        }
        bitmask |= UNORDERED_COMPARE_FLAG;

        // Recursively compare objects (susceptible to call stack limits).
        stack.set(object, other);
        var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
        stack['delete'](object);
        return result;

      case symbolTag:
        if (symbolValueOf) {
          return symbolValueOf.call(object) == symbolValueOf.call(other);
        }
    }
    return false;
  }

  /**
   * A specialized version of `baseIsEqualDeep` for objects with support for
   * partial deep comparisons.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {Function} equalFunc The function to determine equivalents of values.
   * @param {Function} customizer The function to customize comparisons.
   * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
   *  for more details.
   * @param {Object} stack Tracks traversed `object` and `other` objects.
   * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
   */
  function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
    var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
        objProps = keys(object),
        objLength = objProps.length,
        othProps = keys(other),
        othLength = othProps.length;

    if (objLength != othLength && !isPartial) {
      return false;
    }
    var index = objLength;
    while (index--) {
      var key = objProps[index];
      if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
        return false;
      }
    }
    // Assume cyclic values are equal.
    var stacked = stack.get(object);
    if (stacked && stack.get(other)) {
      return stacked == other;
    }
    var result = true;
    stack.set(object, other);
    stack.set(other, object);

    var skipCtor = isPartial;
    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key],
          othValue = other[key];

      if (customizer) {
        var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
      }
      // Recursively compare objects (susceptible to call stack limits).
      if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack) : compared)) {
        result = false;
        break;
      }
      skipCtor || (skipCtor = key == 'constructor');
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor,
          othCtor = other.constructor;

      // Non `Object` object instances with different constructors are not equal.
      if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
        result = false;
      }
    }
    stack['delete'](object);
    stack['delete'](other);
    return result;
  }

  /**
   * Creates an array of own enumerable property names and symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeys(object) {
    return baseGetAllKeys(object, keys, getSymbols);
  }

  /**
   * Gets the appropriate "iteratee" function. If `_.iteratee` is customized,
   * this function returns the custom method, otherwise it returns `baseIteratee`.
   * If arguments are provided, the chosen function is invoked with them and
   * its result is returned.
   *
   * @private
   * @param {*} [value] The value to convert to an iteratee.
   * @param {number} [arity] The arity of the created iteratee.
   * @returns {Function} Returns the chosen function or its result.
   */
  function getIteratee() {
    var result = lodash.iteratee || iteratee;
    result = result === iteratee ? baseIteratee : result;
    return arguments.length ? result(arguments[0], arguments[1]) : result;
  }

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
  }

  /**
   * Gets the property names, values, and compare flags of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the match data of `object`.
   */
  function getMatchData(object) {
    var result = keys(object),
        length = result.length;

    while (length--) {
      var key = result[length],
          value = object[key];

      result[length] = [key, value, isStrictComparable(value)];
    }
    return result;
  }

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
  }

  /**
   * Creates an array of the own enumerable symbol properties of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

  /**
   * Gets the `toStringTag` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  var getTag = baseGetTag;

  // Fallback for data views, maps, sets, and weak maps in IE 11,
  // for data views in Edge < 14, and promises in Node.js.
  if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
    getTag = function getTag(value) {
      var result = objectToString.call(value),
          Ctor = result == objectTag ? value.constructor : undefined,
          ctorString = Ctor ? toSource(Ctor) : undefined;

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag;
          case mapCtorString:
            return mapTag;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag;
          case weakMapCtorString:
            return weakMapTag;
        }
      }
      return result;
    };
  }

  /**
   * Checks if `path` exists on `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @param {Function} hasFunc The function to check properties.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   */
  function hasPath(object, path, hasFunc) {
    path = isKey(path, object) ? [path] : castPath(path);

    var result,
        index = -1,
        length = path.length;

    while (++index < length) {
      var key = toKey(path[index]);
      if (!(result = object != null && hasFunc(object, key))) {
        break;
      }
      object = object[key];
    }
    if (result) {
      return result;
    }
    var length = object ? object.length : 0;
    return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
  }

  /**
   * Initializes an array clone.
   *
   * @private
   * @param {Array} array The array to clone.
   * @returns {Array} Returns the initialized clone.
   */
  function initCloneArray(array) {
    var length = array.length,
        result = array.constructor(length);

    // Add properties assigned by `RegExp#exec`.
    if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
      result.index = array.index;
      result.input = array.input;
    }
    return result;
  }

  /**
   * Initializes an object clone.
   *
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneObject(object) {
    return typeof object.constructor == 'function' && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
  }

  /**
   * Initializes an object clone based on its `toStringTag`.
   *
   * **Note:** This function only supports cloning values with tags of
   * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
   *
   * @private
   * @param {Object} object The object to clone.
   * @param {string} tag The `toStringTag` of the object to clone.
   * @param {Function} cloneFunc The function to clone values.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneByTag(object, tag, cloneFunc, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
      case arrayBufferTag:
        return cloneArrayBuffer(object);

      case boolTag:
      case dateTag:
        return new Ctor(+object);

      case dataViewTag:
        return cloneDataView(object, isDeep);

      case float32Tag:case float64Tag:
      case int8Tag:case int16Tag:case int32Tag:
      case uint8Tag:case uint8ClampedTag:case uint16Tag:case uint32Tag:
        return cloneTypedArray(object, isDeep);

      case mapTag:
        return cloneMap(object, isDeep, cloneFunc);

      case numberTag:
      case stringTag:
        return new Ctor(object);

      case regexpTag:
        return cloneRegExp(object);

      case setTag:
        return cloneSet(object, isDeep, cloneFunc);

      case symbolTag:
        return cloneSymbol(object);
    }
  }

  /**
   * Checks if `value` is a flattenable `arguments` object or array.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
   */
  function isFlattenable(value) {
    return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
  }

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (typeof value == 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
  }

  /**
   * Checks if the given arguments are from an iteratee call.
   *
   * @private
   * @param {*} value The potential iteratee value argument.
   * @param {*} index The potential iteratee index or key argument.
   * @param {*} object The potential iteratee object argument.
   * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
   *  else `false`.
   */
  function isIterateeCall(value, index, object) {
    if (!isObject(object)) {
      return false;
    }
    var type = typeof index === 'undefined' ? 'undefined' : _typeof(index);
    if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
      return eq(object[index], value);
    }
    return false;
  }

  /**
   * Checks if `value` is a property name and not a property path.
   *
   * @private
   * @param {*} value The value to check.
   * @param {Object} [object] The object to query keys on.
   * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
   */
  function isKey(value, object) {
    if (isArray(value)) {
      return false;
    }
    var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
    if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
      return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
  }

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
    return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
  }

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;

    return value === proto;
  }

  /**
   * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` if suitable for strict
   *  equality comparisons, else `false`.
   */
  function isStrictComparable(value) {
    return value === value && !isObject(value);
  }

  /**
   * A specialized version of `matchesProperty` for source values suitable
   * for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   */
  function matchesStrictComparable(key, srcValue) {
    return function (object) {
      if (object == null) {
        return false;
      }
      return object[key] === srcValue && (srcValue !== undefined || key in Object(object));
    };
  }

  /**
   * Used by `_.defaultsDeep` to customize its `_.merge` use.
   *
   * @private
   * @param {*} objValue The destination value.
   * @param {*} srcValue The source value.
   * @param {string} key The key of the property to merge.
   * @param {Object} object The parent object of `objValue`.
   * @param {Object} source The parent object of `srcValue`.
   * @param {Object} [stack] Tracks traversed source values and their merged
   *  counterparts.
   * @returns {*} Returns the value to assign.
   */
  function mergeDefaults(objValue, srcValue, key, object, source, stack) {
    if (isObject(objValue) && isObject(srcValue)) {
      // Recursively merge objects and arrays (susceptible to call stack limits).
      stack.set(srcValue, objValue);
      baseMerge(objValue, srcValue, undefined, mergeDefaults, stack);
      stack['delete'](srcValue);
    }
    return objValue;
  }

  /**
   * This function is like
   * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * except that it includes inherited enumerable properties.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }

  /**
   * Gets the parent value at `path` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array} path The path to get the parent value of.
   * @returns {*} Returns the parent value.
   */
  function parent(object, path) {
    return path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
  }

  /**
   * Converts `string` to a property path array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the property path array.
   */
  var stringToPath = memoize(function (string) {
    string = toString(string);

    var result = [];
    if (reLeadingDot.test(string)) {
      result.push('');
    }
    string.replace(rePropName, function (match, number, quote, string) {
      result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
    });
    return result;
  });

  /**
   * Converts `value` to a string key if it's not a string or symbol.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {string|symbol} Returns the key.
   */
  function toKey(value) {
    if (typeof value == 'string' || isSymbol(value)) {
      return value;
    }
    var result = value + '';
    return result == '0' && 1 / value == -INFINITY ? '-0' : result;
  }

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to process.
   * @returns {string} Returns the source code.
   */
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}
      try {
        return func + '';
      } catch (e) {}
    }
    return '';
  }

  /*------------------------------------------------------------------------*/

  /**
   * Flattens `array` a single level deep.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to flatten.
   * @returns {Array} Returns the new flattened array.
   * @example
   *
   * _.flatten([1, [2, [3, [4]], 5]]);
   * // => [1, 2, [3, [4]], 5]
   */
  function flatten(array) {
    var length = array ? array.length : 0;
    return length ? baseFlatten(array, 1) : [];
  }

  /**
   * Gets the last element of `array`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to query.
   * @returns {*} Returns the last element of `array`.
   * @example
   *
   * _.last([1, 2, 3]);
   * // => 3
   */
  function last(array) {
    var length = array ? array.length : 0;
    return length ? array[length - 1] : undefined;
  }

  /**
   * Removes all elements from `array` that `predicate` returns truthy for
   * and returns an array of the removed elements. The predicate is invoked
   * with three arguments: (value, index, array).
   *
   * **Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
   * to pull elements from an array by value.
   *
   * @static
   * @memberOf _
   * @since 2.0.0
   * @category Array
   * @param {Array} array The array to modify.
   * @param {Function} [predicate=_.identity]
   *  The function invoked per iteration.
   * @returns {Array} Returns the new array of removed elements.
   * @example
   *
   * var array = [1, 2, 3, 4];
   * var evens = _.remove(array, function(n) {
   *   return n % 2 == 0;
   * });
   *
   * console.log(array);
   * // => [1, 3]
   *
   * console.log(evens);
   * // => [2, 4]
   */
  function remove(array, predicate) {
    var result = [];
    if (!(array && array.length)) {
      return result;
    }
    var index = -1,
        indexes = [],
        length = array.length;

    predicate = getIteratee(predicate, 3);
    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result.push(value);
        indexes.push(index);
      }
    }
    basePullAt(array, indexes);
    return result;
  }

  /**
   * Creates a duplicate-free version of an array, using
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons, in which only the first occurrence of each
   * element is kept.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {Array} array The array to inspect.
   * @returns {Array} Returns the new duplicate free array.
   * @example
   *
   * _.uniq([2, 1, 2]);
   * // => [2, 1]
   */
  function uniq(array) {
    return array && array.length ? baseUniq(array) : [];
  }

  /*------------------------------------------------------------------------*/

  /**
   * Iterates over elements of `collection` and invokes `iteratee` for each element.
   * The iteratee is invoked with three arguments: (value, index|key, collection).
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * **Note:** As with other "Collections" methods, objects with a "length"
   * property are iterated like arrays. To avoid this behavior use `_.forIn`
   * or `_.forOwn` for object iteration.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @alias each
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   * @see _.forEachRight
   * @example
   *
   * _([1, 2]).forEach(function(value) {
   *   console.log(value);
   * });
   * // => Logs `1` then `2`.
   *
   * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
   *   console.log(key);
   * });
   * // => Logs 'a' then 'b' (iteration order is not guaranteed).
   */
  function forEach(collection, iteratee) {
    var func = isArray(collection) ? arrayEach : baseEach;
    return func(collection, getIteratee(iteratee, 3));
  }

  /**
   * Creates an array of values by running each element in `collection` thru
   * `iteratee`. The iteratee is invoked with three arguments:
   * (value, index|key, collection).
   *
   * Many lodash methods are guarded to work as iteratees for methods like
   * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
   *
   * The guarded methods are:
   * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
   * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
   * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
   * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Collection
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   * @example
   *
   * function square(n) {
   *   return n * n;
   * }
   *
   * _.map([4, 8], square);
   * // => [16, 64]
   *
   * _.map({ 'a': 4, 'b': 8 }, square);
   * // => [16, 64] (iteration order is not guaranteed)
   *
   * var users = [
   *   { 'user': 'barney' },
   *   { 'user': 'fred' }
   * ];
   *
   * // The `_.property` iteratee shorthand.
   * _.map(users, 'user');
   * // => ['barney', 'fred']
   */
  function map(collection, iteratee) {
    var func = isArray(collection) ? arrayMap : baseMap;
    return func(collection, getIteratee(iteratee, 3));
  }

  /*------------------------------------------------------------------------*/

  /**
   * Creates a function that memoizes the result of `func`. If `resolver` is
   * provided, it determines the cache key for storing the result based on the
   * arguments provided to the memoized function. By default, the first argument
   * provided to the memoized function is used as the map cache key. The `func`
   * is invoked with the `this` binding of the memoized function.
   *
   * **Note:** The cache is exposed as the `cache` property on the memoized
   * function. Its creation may be customized by replacing the `_.memoize.Cache`
   * constructor with one whose instances implement the
   * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
   * method interface of `delete`, `get`, `has`, and `set`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] The function to resolve the cache key.
   * @returns {Function} Returns the new memoized function.
   * @example
   *
   * var object = { 'a': 1, 'b': 2 };
   * var other = { 'c': 3, 'd': 4 };
   *
   * var values = _.memoize(_.values);
   * values(object);
   * // => [1, 2]
   *
   * values(other);
   * // => [3, 4]
   *
   * object.a = 2;
   * values(object);
   * // => [1, 2]
   *
   * // Modify the result cache.
   * values.cache.set(object, ['a', 'b']);
   * values(object);
   * // => ['a', 'b']
   *
   * // Replace `_.memoize.Cache`.
   * _.memoize.Cache = WeakMap;
   */
  function memoize(func, resolver) {
    if (typeof func != 'function' || resolver && typeof resolver != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function memoized() {
      var args = arguments,
          key = resolver ? resolver.apply(this, args) : args[0],
          cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result);
      return result;
    };
    memoized.cache = new (memoize.Cache || MapCache)();
    return memoized;
  }

  // Assign cache to `_.memoize`.
  memoize.Cache = MapCache;

  /*------------------------------------------------------------------------*/

  /**
   * Creates a shallow clone of `value`.
   *
   * **Note:** This method is loosely based on the
   * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
   * and supports cloning arrays, array buffers, booleans, date objects, maps,
   * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
   * arrays. The own enumerable properties of `arguments` objects are cloned
   * as plain objects. An empty object is returned for uncloneable values such
   * as error objects, functions, DOM nodes, and WeakMaps.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to clone.
   * @returns {*} Returns the cloned value.
   * @see _.cloneDeep
   * @example
   *
   * var objects = [{ 'a': 1 }, { 'b': 2 }];
   *
   * var shallow = _.clone(objects);
   * console.log(shallow[0] === objects[0]);
   * // => true
   */
  function clone(value) {
    return baseClone(value, false, true);
  }

  /**
   * This method is like `_.clone` except that it accepts `customizer` which
   * is invoked to produce the cloned value. If `customizer` returns `undefined`,
   * cloning is handled by the method instead. The `customizer` is invoked with
   * up to four arguments; (value [, index|key, object, stack]).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to clone.
   * @param {Function} [customizer] The function to customize cloning.
   * @returns {*} Returns the cloned value.
   * @see _.cloneDeepWith
   * @example
   *
   * function customizer(value) {
   *   if (_.isElement(value)) {
   *     return value.cloneNode(false);
   *   }
   * }
   *
   * var el = _.cloneWith(document.body, customizer);
   *
   * console.log(el === document.body);
   * // => false
   * console.log(el.nodeName);
   * // => 'BODY'
   * console.log(el.childNodes.length);
   * // => 0
   */
  function cloneWith(value, customizer) {
    return baseClone(value, false, true, customizer);
  }

  /**
   * This method is like `_.clone` except that it recursively clones `value`.
   *
   * @static
   * @memberOf _
   * @since 1.0.0
   * @category Lang
   * @param {*} value The value to recursively clone.
   * @returns {*} Returns the deep cloned value.
   * @see _.clone
   * @example
   *
   * var objects = [{ 'a': 1 }, { 'b': 2 }];
   *
   * var deep = _.cloneDeep(objects);
   * console.log(deep[0] === objects[0]);
   * // => false
   */
  function cloneDeep(value) {
    return baseClone(value, true, true);
  }

  /**
   * This method is like `_.cloneWith` except that it recursively clones `value`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to recursively clone.
   * @param {Function} [customizer] The function to customize cloning.
   * @returns {*} Returns the deep cloned value.
   * @see _.cloneWith
   * @example
   *
   * function customizer(value) {
   *   if (_.isElement(value)) {
   *     return value.cloneNode(true);
   *   }
   * }
   *
   * var el = _.cloneDeepWith(document.body, customizer);
   *
   * console.log(el === document.body);
   * // => false
   * console.log(el.nodeName);
   * // => 'BODY'
   * console.log(el.childNodes.length);
   * // => 20
   */
  function cloneDeepWith(value, customizer) {
    return baseClone(value, true, true, customizer);
  }

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  function isArguments(value) {
    // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
    return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
  }

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray;

  /**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }

  /**
   * This method is like `_.isArrayLike` except that it also checks if `value`
   * is an object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array-like object,
   *  else `false`.
   * @example
   *
   * _.isArrayLikeObject([1, 2, 3]);
   * // => true
   *
   * _.isArrayLikeObject(document.body.children);
   * // => true
   *
   * _.isArrayLikeObject('abc');
   * // => false
   *
   * _.isArrayLikeObject(_.noop);
   * // => false
   */
  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }

  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */
  var isBuffer = nativeIsBuffer || stubFalse;

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 8-9 which returns 'object' for typed array and other constructors.
    var tag = isObject(value) ? objectToString.call(value) : '';
    return tag == funcTag || tag == genTag;
  }

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
    return !!value && (type == 'object' || type == 'function');
  }

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
  }

  /**
   * Checks if `value` is a plain object, that is, an object created by the
   * `Object` constructor or one with a `[[Prototype]]` of `null`.
   *
   * @static
   * @memberOf _
   * @since 0.8.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * _.isPlainObject(new Foo);
   * // => false
   *
   * _.isPlainObject([1, 2, 3]);
   * // => false
   *
   * _.isPlainObject({ 'x': 0, 'y': 0 });
   * // => true
   *
   * _.isPlainObject(Object.create(null));
   * // => true
   */
  function isPlainObject(value) {
    if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) {
      return false;
    }
    var proto = getPrototype(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
  }

  /**
   * Checks if `value` is classified as a `String` primitive or object.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a string, else `false`.
   * @example
   *
   * _.isString('abc');
   * // => true
   *
   * _.isString(1);
   * // => false
   */
  function isString(value) {
    return typeof value == 'string' || !isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag;
  }

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol(value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
  }

  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */
  var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

  /**
   * Converts `value` to a finite number.
   *
   * @static
   * @memberOf _
   * @since 4.12.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted number.
   * @example
   *
   * _.toFinite(3.2);
   * // => 3.2
   *
   * _.toFinite(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toFinite(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toFinite('3.2');
   * // => 3.2
   */
  function toFinite(value) {
    if (!value) {
      return value === 0 ? value : 0;
    }
    value = toNumber(value);
    if (value === INFINITY || value === -INFINITY) {
      var sign = value < 0 ? -1 : 1;
      return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
  }

  /**
   * Converts `value` to an integer.
   *
   * **Note:** This method is loosely based on
   * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted integer.
   * @example
   *
   * _.toInteger(3.2);
   * // => 3
   *
   * _.toInteger(Number.MIN_VALUE);
   * // => 0
   *
   * _.toInteger(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toInteger('3.2');
   * // => 3
   */
  function toInteger(value) {
    var result = toFinite(value),
        remainder = result % 1;

    return result === result ? remainder ? result - remainder : result : 0;
  }

  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */
  function toNumber(value) {
    if (typeof value == 'number') {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    if (isObject(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject(other) ? other + '' : other;
    }
    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
  }

  /**
   * Converts `value` to a plain object flattening inherited enumerable string
   * keyed properties of `value` to own properties of the plain object.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {Object} Returns the converted plain object.
   * @example
   *
   * function Foo() {
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.assign({ 'a': 1 }, new Foo);
   * // => { 'a': 1, 'b': 2 }
   *
   * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
   * // => { 'a': 1, 'b': 2, 'c': 3 }
   */
  function toPlainObject(value) {
    return copyObject(value, keysIn(value));
  }

  /**
   * Converts `value` to a string. An empty string is returned for `null`
   * and `undefined` values. The sign of `-0` is preserved.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   * @example
   *
   * _.toString(null);
   * // => ''
   *
   * _.toString(-0);
   * // => '-0'
   *
   * _.toString([1, 2, 3]);
   * // => '1,2,3'
   */
  function toString(value) {
    return value == null ? '' : baseToString(value);
  }

  /*------------------------------------------------------------------------*/

  /**
   * This method is like `_.assign` except that it iterates over own and
   * inherited source properties.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @alias extend
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @see _.assign
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * function Bar() {
   *   this.c = 3;
   * }
   *
   * Foo.prototype.b = 2;
   * Bar.prototype.d = 4;
   *
   * _.assignIn({ 'a': 0 }, new Foo, new Bar);
   * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
   */
  var assignIn = createAssigner(function (object, source) {
    copyObject(source, keysIn(source), object);
  });

  /**
   * This method is like `_.assignIn` except that it accepts `customizer`
   * which is invoked to produce the assigned values. If `customizer` returns
   * `undefined`, assignment is handled by the method instead. The `customizer`
   * is invoked with five arguments: (objValue, srcValue, key, object, source).
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @alias extendWith
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} sources The source objects.
   * @param {Function} [customizer] The function to customize assigned values.
   * @returns {Object} Returns `object`.
   * @see _.assignWith
   * @example
   *
   * function customizer(objValue, srcValue) {
   *   return _.isUndefined(objValue) ? srcValue : objValue;
   * }
   *
   * var defaults = _.partialRight(_.assignInWith, customizer);
   *
   * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
   * // => { 'a': 1, 'b': 2 }
   */
  var assignInWith = createAssigner(function (object, source, srcIndex, customizer) {
    copyObject(source, keysIn(source), object, customizer);
  });

  /**
   * Assigns own and inherited enumerable string keyed properties of source
   * objects to the destination object for all destination properties that
   * resolve to `undefined`. Source objects are applied from left to right.
   * Once a property is set, additional values of the same property are ignored.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @see _.defaultsDeep
   * @example
   *
   * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
   * // => { 'a': 1, 'b': 2 }
   */
  var defaults = baseRest(function (args) {
    args.push(undefined, assignInDefaults);
    return apply(assignInWith, undefined, args);
  });

  /**
   * This method is like `_.defaults` except that it recursively assigns
   * default properties.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 3.10.0
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @see _.defaults
   * @example
   *
   * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
   * // => { 'a': { 'b': 2, 'c': 3 } }
   */
  var defaultsDeep = baseRest(function (args) {
    args.push(undefined, mergeDefaults);
    return apply(mergeWith, undefined, args);
  });

  /**
   * Gets the value at `path` of `object`. If the resolved value is
   * `undefined`, the `defaultValue` is returned in its place.
   *
   * @static
   * @memberOf _
   * @since 3.7.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @param {*} [defaultValue] The value returned for `undefined` resolved values.
   * @returns {*} Returns the resolved value.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * _.get(object, 'a[0].b.c');
   * // => 3
   *
   * _.get(object, ['a', '0', 'b', 'c']);
   * // => 3
   *
   * _.get(object, 'a.b.c', 'default');
   * // => 'default'
   */
  function get(object, path, defaultValue) {
    var result = object == null ? undefined : baseGet(object, path);
    return result === undefined ? defaultValue : result;
  }

  /**
   * Checks if `path` is a direct or inherited property of `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   * @example
   *
   * var object = _.create({ 'a': _.create({ 'b': 2 }) });
   *
   * _.hasIn(object, 'a');
   * // => true
   *
   * _.hasIn(object, 'a.b');
   * // => true
   *
   * _.hasIn(object, ['a', 'b']);
   * // => true
   *
   * _.hasIn(object, 'b');
   * // => false
   */
  function hasIn(object, path) {
    return object != null && hasPath(object, path, baseHasIn);
  }

  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * for more details.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */
  function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  }

  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */
  function keysIn(object) {
    return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
  }

  /**
   * This method is like `_.assign` except that it recursively merges own and
   * inherited enumerable string keyed properties of source objects into the
   * destination object. Source properties that resolve to `undefined` are
   * skipped if a destination value exists. Array and plain object properties
   * are merged recursively. Other objects and value types are overridden by
   * assignment. Source objects are applied from left to right. Subsequent
   * sources overwrite property assignments of previous sources.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 0.5.0
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var object = {
   *   'a': [{ 'b': 2 }, { 'd': 4 }]
   * };
   *
   * var other = {
   *   'a': [{ 'c': 3 }, { 'e': 5 }]
   * };
   *
   * _.merge(object, other);
   * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
   */
  var merge = createAssigner(function (object, source, srcIndex) {
    baseMerge(object, source, srcIndex);
  });

  /**
   * This method is like `_.merge` except that it accepts `customizer` which
   * is invoked to produce the merged values of the destination and source
   * properties. If `customizer` returns `undefined`, merging is handled by the
   * method instead. The `customizer` is invoked with seven arguments:
   * (objValue, srcValue, key, object, source, stack).
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} sources The source objects.
   * @param {Function} customizer The function to customize assigned values.
   * @returns {Object} Returns `object`.
   * @example
   *
   * function customizer(objValue, srcValue) {
   *   if (_.isArray(objValue)) {
   *     return objValue.concat(srcValue);
   *   }
   * }
   *
   * var object = { 'a': [1], 'b': [2] };
   * var other = { 'a': [3], 'b': [4] };
   *
   * _.mergeWith(object, other, customizer);
   * // => { 'a': [1, 3], 'b': [2, 4] }
   */
  var mergeWith = createAssigner(function (object, source, srcIndex, customizer) {
    baseMerge(object, source, srcIndex, customizer);
  });

  /*------------------------------------------------------------------------*/

  /**
   * Produces a random number between the inclusive `lower` and `upper` bounds.
   * If only one argument is provided a number between `0` and the given number
   * is returned. If `floating` is `true`, or either `lower` or `upper` are
   * floats, a floating-point number is returned instead of an integer.
   *
   * **Note:** JavaScript follows the IEEE-754 standard for resolving
   * floating-point values which can produce unexpected results.
   *
   * @static
   * @memberOf _
   * @since 0.7.0
   * @category Number
   * @param {number} [lower=0] The lower bound.
   * @param {number} [upper=1] The upper bound.
   * @param {boolean} [floating] Specify returning a floating-point number.
   * @returns {number} Returns the random number.
   * @example
   *
   * _.random(0, 5);
   * // => an integer between 0 and 5
   *
   * _.random(5);
   * // => also an integer between 0 and 5
   *
   * _.random(5, true);
   * // => a floating-point number between 0 and 5
   *
   * _.random(1.2, 5.2);
   * // => a floating-point number between 1.2 and 5.2
   */
  function random(lower, upper, floating) {
    if (floating && typeof floating != 'boolean' && isIterateeCall(lower, upper, floating)) {
      upper = floating = undefined;
    }
    if (floating === undefined) {
      if (typeof upper == 'boolean') {
        floating = upper;
        upper = undefined;
      } else if (typeof lower == 'boolean') {
        floating = lower;
        lower = undefined;
      }
    }
    if (lower === undefined && upper === undefined) {
      lower = 0;
      upper = 1;
    } else {
      lower = toFinite(lower);
      if (upper === undefined) {
        upper = lower;
        lower = 0;
      } else {
        upper = toFinite(upper);
      }
    }
    if (lower > upper) {
      var temp = lower;
      lower = upper;
      upper = temp;
    }
    if (floating || lower % 1 || upper % 1) {
      var rand = nativeRandom();
      return nativeMin(lower + rand * (upper - lower + freeParseFloat('1e-' + ((rand + '').length - 1))), upper);
    }
    return baseRandom(lower, upper);
  }

  /*------------------------------------------------------------------------*/

  /**
   * This method returns the first argument it receives.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'a': 1 };
   *
   * console.log(_.identity(object) === object);
   * // => true
   */
  function identity(value) {
    return value;
  }

  /**
   * Creates a function that invokes `func` with the arguments of the created
   * function. If `func` is a property name, the created function returns the
   * property value for a given element. If `func` is an array or object, the
   * created function returns `true` for elements that contain the equivalent
   * source properties, otherwise it returns `false`.
   *
   * @static
   * @since 4.0.0
   * @memberOf _
   * @category Util
   * @param {*} [func=_.identity] The value to convert to a callback.
   * @returns {Function} Returns the callback.
   * @example
   *
   * var users = [
   *   { 'user': 'barney', 'age': 36, 'active': true },
   *   { 'user': 'fred',   'age': 40, 'active': false }
   * ];
   *
   * // The `_.matches` iteratee shorthand.
   * _.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
   * // => [{ 'user': 'barney', 'age': 36, 'active': true }]
   *
   * // The `_.matchesProperty` iteratee shorthand.
   * _.filter(users, _.iteratee(['user', 'fred']));
   * // => [{ 'user': 'fred', 'age': 40 }]
   *
   * // The `_.property` iteratee shorthand.
   * _.map(users, _.iteratee('user'));
   * // => ['barney', 'fred']
   *
   * // Create custom iteratee shorthands.
   * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
   *   return !_.isRegExp(func) ? iteratee(func) : function(string) {
   *     return func.test(string);
   *   };
   * });
   *
   * _.filter(['abc', 'def'], /ef/);
   * // => ['def']
   */
  function iteratee(func) {
    return baseIteratee(typeof func == 'function' ? func : baseClone(func, true));
  }

  /**
   * This method returns `undefined`.
   *
   * @static
   * @memberOf _
   * @since 2.3.0
   * @category Util
   * @example
   *
   * _.times(2, _.noop);
   * // => [undefined, undefined]
   */
  function noop() {}
  // No operation performed.


  /**
   * Creates a function that returns the value at `path` of a given object.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new accessor function.
   * @example
   *
   * var objects = [
   *   { 'a': { 'b': 2 } },
   *   { 'a': { 'b': 1 } }
   * ];
   *
   * _.map(objects, _.property('a.b'));
   * // => [2, 1]
   *
   * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
   * // => [1, 2]
   */
  function property(path) {
    return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
  }

  /**
   * This method returns a new empty array.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {Array} Returns the new empty array.
   * @example
   *
   * var arrays = _.times(2, _.stubArray);
   *
   * console.log(arrays);
   * // => [[], []]
   *
   * console.log(arrays[0] === arrays[1]);
   * // => false
   */
  function stubArray() {
    return [];
  }

  /**
   * This method returns `false`.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {boolean} Returns `false`.
   * @example
   *
   * _.times(2, _.stubFalse);
   * // => [false, false]
   */
  function stubFalse() {
    return false;
  }

  /*------------------------------------------------------------------------*/

  /**
   * Adds two numbers.
   *
   * @static
   * @memberOf _
   * @since 3.4.0
   * @category Math
   * @param {number} augend The first number in an addition.
   * @param {number} addend The second number in an addition.
   * @returns {number} Returns the total.
   * @example
   *
   * _.add(6, 4);
   * // => 10
   */
  var add = createMathOperation(function (augend, addend) {
    return augend + addend;
  }, 0);

  /**
   * Computes `number` rounded up to `precision`.
   *
   * @static
   * @memberOf _
   * @since 3.10.0
   * @category Math
   * @param {number} number The number to round up.
   * @param {number} [precision=0] The precision to round up to.
   * @returns {number} Returns the rounded up number.
   * @example
   *
   * _.ceil(4.006);
   * // => 5
   *
   * _.ceil(6.004, 2);
   * // => 6.01
   *
   * _.ceil(6040, -2);
   * // => 6100
   */
  var ceil = createRound('ceil');

  /**
   * Divide two numbers.
   *
   * @static
   * @memberOf _
   * @since 4.7.0
   * @category Math
   * @param {number} dividend The first number in a division.
   * @param {number} divisor The second number in a division.
   * @returns {number} Returns the quotient.
   * @example
   *
   * _.divide(6, 4);
   * // => 1.5
   */
  var divide = createMathOperation(function (dividend, divisor) {
    return dividend / divisor;
  }, 1);

  /**
   * Computes `number` rounded down to `precision`.
   *
   * @static
   * @memberOf _
   * @since 3.10.0
   * @category Math
   * @param {number} number The number to round down.
   * @param {number} [precision=0] The precision to round down to.
   * @returns {number} Returns the rounded down number.
   * @example
   *
   * _.floor(4.006);
   * // => 4
   *
   * _.floor(0.046, 2);
   * // => 0.04
   *
   * _.floor(4060, -2);
   * // => 4000
   */
  var floor = createRound('floor');

  /**
   * Computes the maximum value of `array`. If `array` is empty or falsey,
   * `undefined` is returned.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Math
   * @param {Array} array The array to iterate over.
   * @returns {*} Returns the maximum value.
   * @example
   *
   * _.max([4, 2, 8, 6]);
   * // => 8
   *
   * _.max([]);
   * // => undefined
   */
  function max(array) {
    return array && array.length ? baseExtremum(array, identity, baseGt) : undefined;
  }

  /**
   * This method is like `_.max` except that it accepts `iteratee` which is
   * invoked for each element in `array` to generate the criterion by which
   * the value is ranked. The iteratee is invoked with one argument: (value).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Math
   * @param {Array} array The array to iterate over.
   * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
   * @returns {*} Returns the maximum value.
   * @example
   *
   * var objects = [{ 'n': 1 }, { 'n': 2 }];
   *
   * _.maxBy(objects, function(o) { return o.n; });
   * // => { 'n': 2 }
   *
   * // The `_.property` iteratee shorthand.
   * _.maxBy(objects, 'n');
   * // => { 'n': 2 }
   */
  function maxBy(array, iteratee) {
    return array && array.length ? baseExtremum(array, getIteratee(iteratee, 2), baseGt) : undefined;
  }

  /**
   * Computes the mean of the values in `array`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Math
   * @param {Array} array The array to iterate over.
   * @returns {number} Returns the mean.
   * @example
   *
   * _.mean([4, 2, 8, 6]);
   * // => 5
   */
  function mean(array) {
    return baseMean(array, identity);
  }

  /**
   * This method is like `_.mean` except that it accepts `iteratee` which is
   * invoked for each element in `array` to generate the value to be averaged.
   * The iteratee is invoked with one argument: (value).
   *
   * @static
   * @memberOf _
   * @since 4.7.0
   * @category Math
   * @param {Array} array The array to iterate over.
   * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
   * @returns {number} Returns the mean.
   * @example
   *
   * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
   *
   * _.meanBy(objects, function(o) { return o.n; });
   * // => 5
   *
   * // The `_.property` iteratee shorthand.
   * _.meanBy(objects, 'n');
   * // => 5
   */
  function meanBy(array, iteratee) {
    return baseMean(array, getIteratee(iteratee, 2));
  }

  /**
   * Computes the minimum value of `array`. If `array` is empty or falsey,
   * `undefined` is returned.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Math
   * @param {Array} array The array to iterate over.
   * @returns {*} Returns the minimum value.
   * @example
   *
   * _.min([4, 2, 8, 6]);
   * // => 2
   *
   * _.min([]);
   * // => undefined
   */
  function min(array) {
    return array && array.length ? baseExtremum(array, identity, baseLt) : undefined;
  }

  /**
   * This method is like `_.min` except that it accepts `iteratee` which is
   * invoked for each element in `array` to generate the criterion by which
   * the value is ranked. The iteratee is invoked with one argument: (value).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Math
   * @param {Array} array The array to iterate over.
   * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
   * @returns {*} Returns the minimum value.
   * @example
   *
   * var objects = [{ 'n': 1 }, { 'n': 2 }];
   *
   * _.minBy(objects, function(o) { return o.n; });
   * // => { 'n': 1 }
   *
   * // The `_.property` iteratee shorthand.
   * _.minBy(objects, 'n');
   * // => { 'n': 1 }
   */
  function minBy(array, iteratee) {
    return array && array.length ? baseExtremum(array, getIteratee(iteratee, 2), baseLt) : undefined;
  }

  /**
   * Multiply two numbers.
   *
   * @static
   * @memberOf _
   * @since 4.7.0
   * @category Math
   * @param {number} multiplier The first number in a multiplication.
   * @param {number} multiplicand The second number in a multiplication.
   * @returns {number} Returns the product.
   * @example
   *
   * _.multiply(6, 4);
   * // => 24
   */
  var multiply = createMathOperation(function (multiplier, multiplicand) {
    return multiplier * multiplicand;
  }, 1);

  /**
   * Computes `number` rounded to `precision`.
   *
   * @static
   * @memberOf _
   * @since 3.10.0
   * @category Math
   * @param {number} number The number to round.
   * @param {number} [precision=0] The precision to round to.
   * @returns {number} Returns the rounded number.
   * @example
   *
   * _.round(4.006);
   * // => 4
   *
   * _.round(4.006, 2);
   * // => 4.01
   *
   * _.round(4060, -2);
   * // => 4100
   */
  var round = createRound('round');

  /**
   * Subtract two numbers.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Math
   * @param {number} minuend The first number in a subtraction.
   * @param {number} subtrahend The second number in a subtraction.
   * @returns {number} Returns the difference.
   * @example
   *
   * _.subtract(6, 4);
   * // => 2
   */
  var subtract = createMathOperation(function (minuend, subtrahend) {
    return minuend - subtrahend;
  }, 0);

  /**
   * Computes the sum of the values in `array`.
   *
   * @static
   * @memberOf _
   * @since 3.4.0
   * @category Math
   * @param {Array} array The array to iterate over.
   * @returns {number} Returns the sum.
   * @example
   *
   * _.sum([4, 2, 8, 6]);
   * // => 20
   */
  function sum(array) {
    return array && array.length ? baseSum(array, identity) : 0;
  }

  /**
   * This method is like `_.sum` except that it accepts `iteratee` which is
   * invoked for each element in `array` to generate the value to be summed.
   * The iteratee is invoked with one argument: (value).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Math
   * @param {Array} array The array to iterate over.
   * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
   * @returns {number} Returns the sum.
   * @example
   *
   * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
   *
   * _.sumBy(objects, function(o) { return o.n; });
   * // => 20
   *
   * // The `_.property` iteratee shorthand.
   * _.sumBy(objects, 'n');
   * // => 20
   */
  function sumBy(array, iteratee) {
    return array && array.length ? baseSum(array, getIteratee(iteratee, 2)) : 0;
  }

  /*------------------------------------------------------------------------*/

  // Add methods that return wrapped values in chain sequences.
  lodash.assignIn = assignIn;
  lodash.assignInWith = assignInWith;
  lodash.defaults = defaults;
  lodash.defaultsDeep = defaultsDeep;
  lodash.flatten = flatten;
  lodash.iteratee = iteratee;
  lodash.keys = keys;
  lodash.keysIn = keysIn;
  lodash.map = map;
  lodash.memoize = memoize;
  lodash.merge = merge;
  lodash.mergeWith = mergeWith;
  lodash.property = property;
  lodash.remove = remove;
  lodash.toPlainObject = toPlainObject;
  lodash.uniq = uniq;

  // Add aliases.
  lodash.extend = assignIn;
  lodash.extendWith = assignInWith;

  /*------------------------------------------------------------------------*/

  // Add methods that return unwrapped values in chain sequences.
  lodash.add = add;
  lodash.ceil = ceil;
  lodash.clone = clone;
  lodash.cloneDeep = cloneDeep;
  lodash.cloneDeepWith = cloneDeepWith;
  lodash.cloneWith = cloneWith;
  lodash.divide = divide;
  lodash.eq = eq;
  lodash.floor = floor;
  lodash.forEach = forEach;
  lodash.get = get;
  lodash.hasIn = hasIn;
  lodash.identity = identity;
  lodash.isArguments = isArguments;
  lodash.isArray = isArray;
  lodash.isArrayLike = isArrayLike;
  lodash.isArrayLikeObject = isArrayLikeObject;
  lodash.isBuffer = isBuffer;
  lodash.isFunction = isFunction;
  lodash.isLength = isLength;
  lodash.isObject = isObject;
  lodash.isObjectLike = isObjectLike;
  lodash.isPlainObject = isPlainObject;
  lodash.isString = isString;
  lodash.isSymbol = isSymbol;
  lodash.isTypedArray = isTypedArray;
  lodash.last = last;
  lodash.max = max;
  lodash.maxBy = maxBy;
  lodash.mean = mean;
  lodash.meanBy = meanBy;
  lodash.min = min;
  lodash.minBy = minBy;
  lodash.stubArray = stubArray;
  lodash.stubFalse = stubFalse;
  lodash.multiply = multiply;
  lodash.noop = noop;
  lodash.random = random;
  lodash.round = round;
  lodash.subtract = subtract;
  lodash.sum = sum;
  lodash.sumBy = sumBy;
  lodash.toFinite = toFinite;
  lodash.toInteger = toInteger;
  lodash.toNumber = toNumber;
  lodash.toString = toString;

  // Add aliases.
  lodash.each = forEach;

  /*------------------------------------------------------------------------*/

  /**
   * The semantic version number.
   *
   * @static
   * @memberOf _
   * @type {string}
   */
  lodash.VERSION = VERSION;

  /*--------------------------------------------------------------------------*/

  // Some AMD build optimizers, like r.js, check for condition patterns like:
  if ("function" == 'function' && _typeof(__webpack_require__(2)) == 'object' && __webpack_require__(2)) {
    // Expose Lodash on the global object to prevent errors when Lodash is
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    // Use `_.noConflict` to remove Lodash from the global object.
    root._ = lodash;

    // Define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module.
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return lodash;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
  // Check for `exports` after `define` in case a build optimizer adds it.
  else if (freeModule) {
      // Export for Node.js.
      (freeModule.exports = lodash)._ = lodash;
      // Export for CommonJS support.
      freeExports._ = lodash;
    } else {
      // Export to the global object.
      root._ = lodash;
    }
}).call(undefined);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12), __webpack_require__(13)(module)))

/***/ }),
/* 12 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ]);
});