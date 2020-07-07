"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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
var _default = Easing;
exports["default"] = _default;