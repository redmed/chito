/**
 * @file 事件封装类
 * @author redmed
 */

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
        this.__id__ = Math.random() * Date.now();

    }

    /**
     * 事件绑定, 不支持过滤重复添加
     * @param {string} type
     * @param {Function} listener
     * @returns {EventEmitter}
     */
    on(type, listener) {
        let events = this.__events__;
        events[ type ] = events[ type ] || [];
        events[ type ].push(listener);

        return this;
    }

    /**
     * 事件绑定, 只绑定一次, 用后即焚
     * @param {string} type
     * @param {Function} listener
     * @returns {EventEmitter}
     */
    once(type, listener) {
        let onceCallback = (...args) => {
            this.off(type, onceCallback);
            listener.apply(this, args);
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
    off(type = null, listener = null) {
        let events = this.__events__;

        if (!type) {
            this.__events__ = {};

            return this;
        }

        if (!listener) {
            delete events[ type ];

            return this;
        }

        let listeners = events[ type ];
        if (listeners) {

            let i = listeners.length - 1;
            while (i >= 0) {
                let cb = listeners[ i ];
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
    emit(type, ...args) {
        let listeners = this.__events__[ type ];

        if (listeners) {
            let i = 0,
                len = listeners.length;

            while (i < len) {
                let cb = listeners[ i++ ];
                cb.apply(this, args);
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
}

export default EventEmitter;
