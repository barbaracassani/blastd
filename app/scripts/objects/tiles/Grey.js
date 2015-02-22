var BaseTile = require('../BaseTile');
var state = require('../../models/state');

var Grey = function(){};

Grey.prototype = new BaseTile(state);

module.exports = Grey;