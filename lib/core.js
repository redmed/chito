"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Animation", {
  enumerable: true,
  get: function get() {
    return _animation["default"];
  }
});
Object.defineProperty(exports, "Clip", {
  enumerable: true,
  get: function get() {
    return _clip["default"];
  }
});
exports["default"] = void 0;

var _animation = _interopRequireDefault(require("./animation"));

var _clip = _interopRequireDefault(require("./clip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  Animation: _animation["default"],
  Clip: _clip["default"]
};
exports["default"] = _default;