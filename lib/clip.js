"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _eventemitter = _interopRequireDefault(require("./common/eventemitter"));

var _easing = _interopRequireDefault(require("./common/easing"));

var _Interpolation = _interopRequireDefault(require("./common/Interpolation"));

var _define = require("./common/define");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Clip =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(Clip, _EventEmitter);

  var _super = _createSuper(Clip);

  _createClass(Clip, null, [{
    key: "registerPlugin",

    /**
     * 配置项
     * @type {Object}
     * @protected
     */

    /**
     * 变换属性
     * @type {Object}
     * @protected
     */

    /**
     * 运行时长
     * @type {number}
     * @protected
     */

    /**
     * 延迟运行
     * @type {number} ms
     * @protected
     */

    /**
     * 每次动画间隔
     * @type {number} ms
     * @protected
     */

    /**
     * 动画重复次数，用于reset重置使用
     * @type {number}
     * @protected
     */

    /**
     * 动画重复次数
     * @type {number}
     * @protected
     */

    /**
     * Ease 动画名
     * @type {Function}
     * @protected
     */

    /**
     * 是否按原轨迹返回(类似溜溜球)
     * @type {boolean}
     * @protected
     */

    /**
     * progress起始位置加成, 可以控制progress不从0开始启动
     * @type {number}
     * @protected
     */

    /**
     * 停止状态
     * @type {boolean}
     * @protected
     */

    /**
     * 暂停状态
     * @type {boolean}
     * @protected
     */

    /**
     * 动画起始时间
     * @type {number}
     * @protected
     */

    /**
     * 每次暂停动画起始时间
     * @type {number}
     * @protected
     */

    /**
     * 暂停时长
     * @type {number}
     * @protected
     */

    /**
     * yoyo 翻转状态
     * @type {boolean}
     * @protected
     */

    /**
     * 被当前 Clip 链式调用的 Clip
     * @type {Array}
     * @protected
     */

    /**
     * 存储属性
     * @param {Array}
     * @protected
     */

    /**
     * 插值算法
     * @type {Function}
     * @private
     */

    /**
     * @type {Animation}
     * @protected
     */

    /**
     * 插件
     * @type {Object|null}
     * @protected
     */

    /**
     * 注册插件
     * @param {Object} plugin
     */
    value: function registerPlugin(plugin) {
      var type = plugin.type;
      var plugins = this._plugins;
      var p = plugins && plugins[type];

      if (!p) {
        this._plugins = plugins || {};
        this._plugins[type] = plugin;
      }
    }
    /**
     * 构造函数
     * @param {Object=} options 配置项
     * @param {Object=} attr 变换属性
     */

  }]);

  function Clip(options, attr) {
    var _this;

    _classCallCheck(this, Clip);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_options", {});

    _defineProperty(_assertThisInitialized(_this), "_attr", {});

    _defineProperty(_assertThisInitialized(_this), "_duration", void 0);

    _defineProperty(_assertThisInitialized(_this), "_delay", void 0);

    _defineProperty(_assertThisInitialized(_this), "_interval", void 0);

    _defineProperty(_assertThisInitialized(_this), "_repeat_0", void 0);

    _defineProperty(_assertThisInitialized(_this), "_repeat", void 0);

    _defineProperty(_assertThisInitialized(_this), "_easing", void 0);

    _defineProperty(_assertThisInitialized(_this), "_yoyo", void 0);

    _defineProperty(_assertThisInitialized(_this), "_startAt", 0);

    _defineProperty(_assertThisInitialized(_this), "_stopped", true);

    _defineProperty(_assertThisInitialized(_this), "_paused", false);

    _defineProperty(_assertThisInitialized(_this), "_startTime", 0);

    _defineProperty(_assertThisInitialized(_this), "_pauseStart", 0);

    _defineProperty(_assertThisInitialized(_this), "_pauseTime", 0);

    _defineProperty(_assertThisInitialized(_this), "_reversed", false);

    _defineProperty(_assertThisInitialized(_this), "_chainClips", []);

    _defineProperty(_assertThisInitialized(_this), "_tracks", []);

    _defineProperty(_assertThisInitialized(_this), "_interpolation", _Interpolation["default"].Linear);

    _defineProperty(_assertThisInitialized(_this), "_animation", void 0);

    _this._options = options || {};
    _this._attr = attr;

    _this._initOption(options);

    _this._tracks = _this._transform(attr);
    return _this;
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


  _createClass(Clip, [{
    key: "_initOption",
    value: function _initOption(options) {
      var easing = options[_define.Attr.EASING] || _define.Easing.LINEAR;
      this._easing = _easing["default"][easing] ? _easing["default"][easing] : easing;
      this._delay = options[_define.Attr.DELAY] || 0;
      var dur = options[_define.Attr.DURATION];
      this._duration = typeof dur == 'undefined' ? 1000 : dur;
      this._repeat_0 = this._repeat = options[_define.Attr.REPEAT] || 1;
      this._interval = options[_define.Attr.INTERVAL] || 0;
      this._yoyo = options[_define.Attr.YOYO] || false;
      this._startAt = options[_define.Attr.START] || 0;
    }
  }, {
    key: "_transform",
    value: function _transform(attr) {
      var _plugins = this.constructor._plugins; // 转换成数组，可以提高 loop 速度

      var _attrList = [];

      for (var key in attr) {
        if (attr.hasOwnProperty(key)) {
          var value = attr[key];

          for (var type in _plugins) {
            // 插件先尝试解析
            var plugin = _plugins[type];

            if (plugin.test(value, key)) {
              value = plugin.parse(value, key);
              value.__type__ = plugin.type;
              break;
            }
          }

          _attrList.push({
            key: key,
            value: value
          });
        }
      }

      return _attrList;
    }
    /**
     * 启动动画
     * @param {boolean=false} force 强制重新计时
     * @returns {Clip}
     */

  }, {
    key: "start",
    value: function start(force) {
      var now = window.performance.now();
      var onceRepeat = false;

      if (this._paused) {
        this._pauseTime += now - this._pauseStart;
        this._paused = false;
      } else {
        if (!force && !this._stopped) {
          return this;
        }

        onceRepeat = true;
        this._stopped = false;
        this._startTime = now + this._delay;
      }

      this.emit(_define.Ev.START);
      var repeat = this._repeat;

      if (repeat > 1 && repeat === this._repeat_0 && onceRepeat) {
        this.emit(_define.Ev.REPEAT, {
          remain: 0
        });
      }

      return this;
    }
    /**
     * 停止动画
     * @param {boolean=false} reset 是否重置 repeat 次数
     * @returns {Clip}
     */

  }, {
    key: "stop",
    value: function stop(reset) {
      if (!this._stopped) {
        this._stopped = true;
        this._paused = false;
        this._pauseTime = 0;
        this._pauseStart = 0;
        this.emit(_define.Ev.STOP);
        this.stopChain();
      }

      if (reset) {
        this._repeat = this._repeat_0;
      }

      return this;
    }
    /**
     * 暂停动画
     * @returns {Clip}
     */

  }, {
    key: "pause",
    value: function pause() {
      if (this._stopped || this._paused) {
        return this;
      }

      this._paused = true;
      this._pauseStart = window.performance.now();
      this.emit(_define.Ev.PAUSE);
      return this;
    }
    /**
     * 更新动画, 触发 UPDATE 事件
     * @param {number} time
     * @returns {boolean} true: 还没结束. false: 运行结束
     */

  }, {
    key: "update",
    value: function update(time) {
      if (this._stopped) {
        return true;
      }

      if (this._paused || time && time < this._startTime) {
        return true;
      }

      var t = time - this._pauseTime;

      var _this$_getProgress = this._getProgress(t),
          progress = _this$_getProgress.progress,
          elapsed = _this$_getProgress.elapsed;

      var keyframe = this._updateAttr(progress, elapsed);

      this.emit(_define.Ev.UPDATE, {
        progress: progress,
        keyframe: keyframe,
        elapsed: elapsed
      }); // 一个周期结束

      return this._afterUpdate(t, elapsed);
    }
  }, {
    key: "_getProgress",
    value: function _getProgress(time) {
      var elapsed = (time - this._startTime) / this._duration;
      elapsed += this._startAt;
      elapsed = Math.min(elapsed, 1);

      var progress = this._easing(this._reversed ? 1 - elapsed : elapsed);

      return {
        progress: progress,
        elapsed: elapsed
      };
    }
  }, {
    key: "_updateAttr",
    value: function _updateAttr(progress, elapsed) {
      var tracks = this._tracks;
      var keyframe = {};
      var i = 0,
          len = tracks.length;

      while (i < len) {
        var item = tracks[i++];
        var key = item.key,
            value = item.value;
        var type = value.__type__;

        if (type) {
          var plugin = this.constructor._plugins[type];
          value = plugin.valueOf(value, progress, elapsed, key);
        } else {
          value = this._interpolation(value, progress);
        }

        keyframe[key] = value;
      }

      return keyframe;
    }
  }, {
    key: "_afterUpdate",
    value: function _afterUpdate(time, elapsed) {
      // 一个周期结束
      if (elapsed === 1) {
        var repeat = this._repeat;
        var repeat_0 = this._repeat_0;

        if (repeat > 1) {
          if (isFinite(repeat)) {
            repeat--;
          }

          this._startTime = time + this._interval;
          this._startAt = 0;

          if (this._yoyo) {
            this._reversed = !this._reversed;
          }

          this._repeat = repeat;
          this.emit(_define.Ev.REPEAT_COMPLETE, {
            repeat: repeat
          });
          this.emit(_define.Ev.REPEAT, {
            remain: repeat_0 - repeat
          });
          return true;
        } else {
          this._stopped = true;
          this._pauseTime = 0;
          this._pauseStart = 0;
          this._repeat = repeat_0;

          if (repeat_0 > 1) {
            this.emit(_define.Ev.REPEAT_COMPLETE, {
              repeat: 0
            });
          }

          this.emit(_define.Ev.COMPLETE);
          var i = -1,
              chains = this._chainClips,
              len = chains.length;
          var ani = this._animation;

          while (++i < len) {
            var clip = chains[i];
            ani && ani._addClip(clip);
            clip.start();
          }

          return false;
        }
      }

      return true;
    }
    /**
     * 链接新 Clip
     * @param {*} args
     * @returns {Clip}
     */

  }, {
    key: "chain",
    value: function chain() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this._chainClips = args;
      return this;
    }
    /**
     * 停止链式内的 Clip 调用
     * @returns {Clip}
     */

  }, {
    key: "stopChain",
    value: function stopChain() {
      var i = -1,
          clips = this._chainClips,
          len = clips.length;

      while (++i < len) {
        var clip = clips[i];
        clip.stop();
      }

      return this;
    }
    /**
     * 析构函数
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.off();
      this._stopped = true;
      this._paused = false;
      this._startTime = 0;
      this._pauseTime = 0;
      this._pauseStart = 0;
      this._chainClips = [];
      var ani = this._animation;
      ani && ani.removeClip(this);
      this._animation = null;
    }
  }]);

  return Clip;
}(_eventemitter["default"]);

_defineProperty(Clip, "_plugins", void 0);

_defineProperty(Clip, "Event", _define.Ev);

_defineProperty(Clip, "Attr", _define.Attr);

_defineProperty(Clip, "Easing", _define.Easing);

var _default = Clip;
exports["default"] = _default;