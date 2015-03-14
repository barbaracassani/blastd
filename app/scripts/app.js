"use strict";

var state = require('./config/state');
var View = require('./views/mainView');
var gameIntro = require('./levels/gameIntro');
var levelIntro = require('./levels/levelIntro');
var levelOutro = require('./levels/levelOutro');
var gameOutro = require('./levels/gameOutro');
var levels = [require('./levels/l1'), require('./levels/l2')];

var index = 0;

var Game = function() {

    this.view = new View();
    this.currentLevel = null;

    this.init();

};

function onTile(tiles) {
    if (tiles === undefined) {
        state.tilesRemaining -= 2;
        tiles = state.tilesRemaining;
    } else {
        state.tilesRemaining = tiles;
    }
    this.view.updateTiles(tiles);
    if (state.tilesRemaining === 0) {
        this.endLevel(true)
    }
}

function onTime(time) {
    this.view.updateTime(time);
    if (time <= 0) {
        this.endGame();
    }
}

Game.prototype.startLevel = function(index) {
levelIntro.playIntro({
    nextLevel : index+1,
    container : state.domMap.field
}, function() {
    this.currentLevel = levels[index];
    this.currentLevel.on(state.events.ON_TILE, onTile.bind(this));
    this.currentLevel.on(state.events.ON_TIME, onTime.bind(this));
    this.currentLevel.draw();
    this.currentLevel.start(this.view);
}.bind(this));

// also, subscribe to the end level event
};

Game.prototype.removeLevelListeners = function() {
    this.currentLevel.removeListener(state.events.ON_TILE, onTile.bind(this));
    this.currentLevel.removeListener(state.events.ON_TIME, onTime.bind(this));
};

Game.prototype.startGame = function() {
    gameIntro.playIntro({
        container : state.domMap.field
    }, function() {
        this.startLevel(index)
    }.bind(this));
};

/**
 * Runs if a level has been concluded UNsuccessfully
 */
Game.prototype.endGame = function() {
    this.removeLevelListeners();
    gameOutro.playOutro({
        container : state.domMap.field
    }, function() {
        console.info('huh');
    }.bind(this));
};

/**
 * Runs if a level has been concluded successfully
 * @param win
 */
Game.prototype.endLevel = function() {
    this.removeLevelListeners();
    levelOutro.playOutro({
        container : state.domMap.field
    }, function() {
        index++;
        this.startLevel(index);
    }.bind(this))
};

Game.prototype.init = function() {
    this.startGame();
    this.view.init();
};

module.export = new Game();