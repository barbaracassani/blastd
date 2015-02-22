"use strict";

var state = require('./models/state');
var View = require('./views/mainView');
var levels = [require('./levels/l1'), require('./levels/l2')];

var Game = function() {

    console.info("am alive");
    this.view = new View();
    this.currentLevel = null;

    this.init();

};

Game.prototype.startLevel = function(index) {

    this.currentLevel = levels[index];
    this.currentLevel.draw();
    this.currentLevel.start(this.view);
// also, subscribe to the end level event
};

Game.prototype.init = function() {
    console.info("am very alive");

    this.startLevel(0);
    // draw field
    // init levels
    // start game
    this.view.init();
};

module.export = new Game();