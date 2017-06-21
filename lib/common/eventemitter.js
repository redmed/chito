"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @file 事件封装类
 * @author redmed
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
         * @param {string|null=} type
         * @param {Function=} listener
         * @returns {EventEmitter}
         */

    }, {
        key: "off",
        value: function off() {
            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
            var listener = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            var events = this.__events__;

            if (!type) {
                this.__events__ = {};

                return this;
            }

            if (!listener) {
                delete events[type];

                return this;
            }

            var listeners = events[type];
            if (listeners) {

                var i = listeners.length - 1;
                while (i >= 0) {
                    var cb = listeners[i];
                    if (cb === listener || cb == cb.listener) {
                        listeners.splice(i, 1);
                    }

                    i--;
                }
            }

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
            var listeners = this.__events__[type];

            if (listeners) {
                var i = 0,
                    len = listeners.length;

                for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                    args[_key2 - 1] = arguments[_key2];
                }

                while (i < len) {
                    var cb = listeners[i++];
                    cb.apply(this, args);
                }
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