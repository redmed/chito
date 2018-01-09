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

var _uid = -1;

var EventEmitter = function () {

    /**
     * 构造函数
     */
    function EventEmitter() {
        _classCallCheck(this, EventEmitter);

        /**
         * 事件池
         * @type {Object}
         * @private
         */
        this.__events__ = {};

        /**
         *
         * @type {number}
         * @private
         */
        this.__id__ = ++_uid;
    }

    /**
     * 事件绑定, 不支持过滤重复添加
     * @param {string} type
     * @param {Function} listener
     * @param {*=} context
     * @returns {EventEmitter}
     */


    _createClass(EventEmitter, [{
        key: "on",
        value: function on(type, listener, context) {

            var events = this.__events__;
            var listeners = events[type] = events[type] || [];
            if (context === this) {
                context = undefined;
            }
            var i = -1,
                len = listeners;
            while (++i < len) {
                var _listeners$i = listeners[i],
                    fn = _listeners$i.fn,
                    ctx = _listeners$i.ctx;

                if (fn === listener && ctx === context) {
                    return this;
                }
            }

            var newListener = { fn: listener, ctx: context };
            listeners.push(newListener);

            return this;
        }

        /**
         * 事件绑定, 只绑定一次, 用后即焚
         * @param {string} type
         * @param {Function} listener
         * @param {*=} context
         * @returns {EventEmitter}
         */

    }, {
        key: "once",
        value: function once(type, listener, context) {
            function onceCallback(ev) {
                this.off(type, onceCallback);
                listener.call(this, ev);
            }

            onceCallback.listener = listener;

            return this.on(type, onceCallback, context);
        }

        /**
         * 事件解绑
         * @param {string|null=} type
         * @param {Function=} listener
         * @param {*=} context
         * @returns {EventEmitter}
         */

    }, {
        key: "off",
        value: function off(type, listener, context) {
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

                var i = listeners.length;
                while (--i >= 0) {
                    var _listeners$i2 = listeners[i],
                        fn = _listeners$i2.fn,
                        ctx = _listeners$i2.ctx;

                    if (ctx !== context) continue;
                    if (fn === listener || fn === fn.listener) {
                        listeners.splice(i, 1);
                        fn = function fn() {};
                    }
                }
            }

            return this;
        }

        /**
         * 事件触发
         * @param {string} type
         * @param {Object=} data
         * @returns {EventEmitter}
         */

    }, {
        key: "emit",
        value: function emit(type) {
            var listeners = this.__events__[type];

            if (listeners) {

                var event = {
                    target: this,
                    type: type
                };

                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }

                args.push(event);

                var i = -1,
                    len = listeners.length;
                while (++i < len) {
                    var _listeners$i3 = listeners[i],
                        fn = _listeners$i3.fn,
                        ctx = _listeners$i3.ctx;

                    fn.apply(ctx || this, args);
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
    }, {
        key: "id",
        get: function get() {
            return this.__id__;
        }
    }]);

    return EventEmitter;
}();

exports["default"] = EventEmitter;