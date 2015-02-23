var Base = require('./BaseLevel');

var Level1 = Object.create(Base);

Level1.grid = [10, 10];
Level1.tileVariety = [ require('../objects/tiles/Grey'), require('../objects/tiles/Grey2')];

module.exports = Level1;