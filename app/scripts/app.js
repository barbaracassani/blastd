"use strict";

var state = require('./models/state');
var View = require('./views/mainView');
var intermission = require('./levels/intermission');
var levels = [require('./levels/l1'), require('./levels/l2')];

var Game = function() {

    console.info("am alive");
    this.view = new View();
    this.currentLevel = null;

    this.init();

};

Game.prototype.startLevel = function(index) {
intermission.playIntro({
    nextLevel : index+1,
    container : state.domMap.field
}, function() {
    this.currentLevel = levels[index];
    this.currentLevel.on(state.events.ON_TILE, function(tiles) {
        if (tiles === undefined) {
            state.tilesRemaining -= 2;
            tiles = state.tilesRemaining;
        } else {
            state.tilesRemaining = tiles;
        }
        this.view.updateTiles(tiles)
    }.bind(this));
    this.currentLevel.draw();

    this.currentLevel.start(this.view);
}.bind(this));

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