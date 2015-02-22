var Base = require('./BaseLevel');

var Level1 = Object.create(Base);

Level1.grid = [20, 20];
Level1.tileVariety = [ require('../objects/tiles/Grey'), require('../objects/tiles/Grey2')];

module.exports = Level1;