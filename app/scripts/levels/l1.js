var Base = require('./BaseLevel');

var Level1 = Object.create(Base);

Level1.grid = [4, 4];
Level1.time = 1500;
Level1.tileVariety = [ require('../objects/tiles/Grey'), require('../objects/tiles/Grey2'), require('../objects/tiles/Grey3'), require('../objects/tiles/Grey4')];

module.exports = Level1;