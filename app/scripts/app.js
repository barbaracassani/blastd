"use strict";

var state = require('./models/state');
var View = require('./views/mainView');

var Game = function() {

    console.info("am alive");
    this.view = new View();
    this.init();

};

Game.prototype.init = function() {
    console.info("am very alive");
    // draw field
    // init levels
    // start game
    this.view.init();
};

module.export = new Game();