"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _eventemitter = _interopRequireDefault(require("./common/eventemitter"));

var _util = require("./common/util");

var _animationframe = require("./common/animationframe");

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

// const { remove, forInMap } = utils;
var Animation =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(Animation, _EventEmitter);

  var _super = _createSuper(Animation);

  /**
   * 配置项
   * @type {Object}
   * @private
   */

  /**
   * 执行后停止的Clip，用于reset时重置
   * @type {Object} id-Clip 值对保存
   * @private
   */

  /**
   * 执行中的子动画片段
   * @type {Array.<Clip>}
   * @private
   */

  /**
   * 动画进程标记
   * @type {number|null}
   * @private
   */

  /**
   * 构造函数
   * @param {Object=} options 配置项
   */
  function Animation(options) {
    var _this;

    _classCallCheck(this, Animation);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_options", {});

    _defineProperty(_assertThisInitialized(_this), "_savedClipMap", {});

    _defineProperty(_assertThisInitialized(_this), "_clips", []);

    _defineProperty(_assertThisInitialized(_this), "_clipMap", {});

    _defineProperty(_assertThisInitialized(_this), "_timer", void 0);

    _this._options = options || {};
    return _this;
  }
  /**
   * 主进程动画函数
   * @private
   */


  _createClass(Animation, [{
    key: "_startAni",
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
    key: "_stopAni",
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
    key: "_update",
    value: function _update(timestamp) {
      var clips = this._clips;
      this.emit(_define.Ev.UPDATE, {
        timestamp: timestamp
      });
      var i = 0;

      while (i < clips.length) {
        var clip = clips[i];
        var running = clip.update(timestamp);

        if (!running) {
          this._rmClip(clip);
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
    key: "start",
    value: function start() {
      var clips = this._clips,
          len = clips.length;

      if (this._timer || len === 0) {
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
    key: "stop",
    value: function stop() {
      this._stop(false);

      return this;
    }
    /**
     * 暂停动画进程
     */

  }, {
    key: "pause",
    value: function pause() {
      this._stop(true);

      return this;
    }
    /**
     * 重置动画
     * 会重置内部 Clip 已经执行的的 repeat 次数
     */

  }, {
    key: "reset",
    value: function reset() {
      this._stop(false, true, false);

      var savedMap = this._savedClipMap;
      var list = [];
      (0, _util.forInMap)(savedMap, function (value) {
        value.stop(true);
        list.push(value);
      });
      this._clips = list;
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
    key: "_stop",
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
    key: "addClip",
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
          this._addClip(clip);

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
    key: "_addClip",
    value: function _addClip(clip) {
      var _c = this._clips; // 防止重复添加

      if (_c.indexOf(clip) === -1) {
        _c.push(clip);

        clip._animation = this;
      }
    }
  }, {
    key: "_addSavedClip",
    value: function _addSavedClip(clip) {
      var clipMap = this._savedClipMap;
      var id = clip.id; // 防止重复添加

      if (clipMap[id] !== clip) {
        clipMap[id] = clip;
        clip._animation = this;
      }
    }
    /**
     * 移除子动画片段
     * @param {Clip=} clip
     */

  }, {
    key: "removeClip",
    value: function removeClip(clip) {
      var savedMap = this._savedClipMap;

      if (clip) {
        this._rmClip(clip);

        this._rmSavedClip(clip);

        clip._animation = null;
      } else {
        // Rm all
        (0, _util.forInMap)(savedMap, function (value) {
          value._animation = null;
        });
        this._clips = [];
        this._savedClipMap = {};
      }

      return this;
    }
  }, {
    key: "_rmClip",
    value: function _rmClip(clip) {
      (0, _util.remove)(this._clips, function (c) {
        return c === clip;
      });
    }
  }, {
    key: "_rmSavedClip",
    value: function _rmSavedClip(clip) {
      if (this._hasSavedClip(clip)) {
        delete this._savedClipMap[clip.id];
      }
    }
    /**
     * 获得 Clips
     * @returns {Array.<Clip>}
     */

  }, {
    key: "getClips",
    value: function getClips() {
      return this._clips;
    }
    /**
     * 判断指定的Clip是否存在
     * @param {Clip} clip
     * @returns {boolean}
     */

  }, {
    key: "_hasSavedClip",
    value: function _hasSavedClip(clip) {
      var id = clip.id;
      var savedMap = this._savedClipMap;
      var savedClip = savedMap[id];
      return savedClip && savedClip === clip;
    }
  }, {
    key: "_hasClip",
    value: function _hasClip(clip) {
      return this._clips.indexOf(clip) !== -1;
    }
    /**
     * 析构函数
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.off();

      this._stopAni();

      this.removeClip();
    }
  }]);

  return Animation;
}(_eventemitter["default"]);

_defineProperty(Animation, "Event", _define.Ev);

var _default = Animation;
exports["default"] = _default;