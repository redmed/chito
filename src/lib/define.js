const Ev = {
    UPDATE: 'update',
    START: 'start',
    REPEAT_COMPLETE: 'repeatComplete',
    AFTER_UPDATE: 'afterUpdate',
    COMPLETE: 'complete',
    PAUSE: 'pause',
    STOP: 'stop'
};

const Attr = {
    DURATION: 'duration',
    REPEAT: 'repeat',
    DELAY: 'delay',
    EASING: 'easing',
    INTERVAL: 'interval',
    YOYO: 'yoyo',
    START: 'startAt',
    COLOR_SUPPORT: 'colorSupport'
};

const Easing = {
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

export {
    Ev,
    Attr,
    Easing
};
