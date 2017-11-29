/**
 * @file 事件封装类
 * @author redmed
 */

let _uid = -1;

class EventEmitter {

    /**
     * 构造函数
     */
    constructor() {

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
    on(type, listener, context) {

        let events = this.__events__;
        let listeners = events[type] = events[type] || [];
        if (context === this) {
            context = undefined;
        }
        let i = -1, len = listeners;
        while (++i < len) {
            let { fn, ctx } = listeners[i];
            if (fn === listener && ctx === context) {
                return this;
            }
        }

        let newListener = { fn: listener, ctx: context };
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
    once(type, listener, context) {
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
    off(type, listener, context) {
        let events = this.__events__;

        if (!type) {
            this.__events__ = {};

            return this;
        }

        if (!listener) {
            delete events[type];

            return this;
        }

        let listeners = events[type];
        if (listeners) {

            let i = listeners.length;
            while (--i >= 0) {
                let { fn, ctx } = listeners[i];
                if (ctx !== context) continue;
                if (fn === listener || fn === fn.listener) {
                    listeners.splice(i, 1);
                    fn = () => {};
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
    emit(type, ...args) {
        let listeners = this.__events__[type];

        if (listeners) {

            let event = {
                target: this,
                type,
            };

            args.push(event);

            let i = -1,
                len = listeners.length;
            while (++i < len) {
                let { fn, ctx } = listeners[i];
                fn.apply(ctx || this, args);
            }
        }

        return this;
    }

    /**
     * 获取绑定事件
     * @returns {Object}
     */
    get events() {
        return this.__events__;
    }

    get id() {
        return this.__id__;
    }
}

export default EventEmitter;
