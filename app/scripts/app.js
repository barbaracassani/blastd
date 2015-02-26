"use strict";

var state = require('./config/state');
var View = require('./views/mainView');
var intermission = require('./levels/intermission');
var levels = [require('./levels/l1'), require('./levels/l2')];

var Game = function() {

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
    this.currentLevel.on(state.events.ON_TIME, function(time) {
        this.view.updateTime(time);
        if (time <= 0) {
            this.endGame();
        }
    }.bind(this));
    this.currentLevel.draw();

    this.currentLevel.start(this.view);
}.bind(this));

// also, subscribe to the end level event
};

Game.prototype.endGame = function() {
    // remove listeners
    // destroy level
    // play intro
    // next level
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