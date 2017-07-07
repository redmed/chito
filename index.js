var Chito = require('./lib/core');
var Animation = Chito.Animation,
    Clip = Chito.Clip;

require('./lib/plugins/color');
require('./lib/plugins/coordinate2d');

module.exports[ 'default' ] = { Animation: Animation, Clip: Clip };
module.exports.Animation = Animation;
module.exports.Clip = Clip;
