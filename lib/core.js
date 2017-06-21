'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Clip = exports.Animation = undefined;

var _animation = require('./animation');

var _animation2 = _interopRequireDefault(_animation);

var _clip = require('./clip');

var _clip2 = _interopRequireDefault(_clip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports['default'] = { Animation: _animation2['default'], Clip: _clip2['default'] };
exports.Animation = _animation2['default'];
exports.Clip = _clip2['default'];