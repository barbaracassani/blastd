"use strict";

var state = require('../config/state');
var Tile = require('../objects/tiles/Grey2');
var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;


function MainView() {
    this.drawField();
}

inherits(MainView, EventEmitter);

MainView.prototype.init = function() {
    this.addListeners();
};

MainView.prototype.addListeners = function() {
    document.querySelector(state.domMap.field).addEventListener('click', function(e) {
        if (Array.prototype.slice.call(e.target.classList).indexOf('tile') !== -1) {  // why I don't want to use jquery? xD
            this.emit('clicked', e.target.id);
        }
    }.bind(this));
};

MainView.prototype.updateTiles = function(num) {
    document.querySelector(state.domMap.pairs).innerHTML = 'Tiles ' + num;
};

MainView.prototype.updateTime = function(time) {
    document.querySelector(state.domMap.time).innerHTML = 'Time ' + time;
};

MainView.prototype.drawField = function() {

};

module.exports = MainView;