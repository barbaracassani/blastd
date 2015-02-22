"use strict";

var state = require('../models/state');
var Tile = require('../objects/tiles/Grey2');


function MainView() {
    this.drawField();
}

MainView.prototype.init = function() {

};

MainView.prototype.drawField = function() {
    var tile = new Tile(document.querySelector('#game'));
    tile.draw();
};

module.exports = MainView;