"use strict";

var uuid = require('node-uuid');
var assign = require('object-assign');

function Tile(state) {
    this.field = state.domMap.field;
    this.id = null;
    this.state = {};
    this.init();
}

Tile.prototype.init = function() {
    var proto = this.__proto__; // sorry for __proto__ but it comes handy
    Object.getOwnPropertyNames(proto).forEach(function(thing) {
        if (typeof proto[thing] === 'function') {
            proto[thing] = proto[thing].bind(this);
        }
    }.bind(this));
};

Tile.prototype.draw = function(props) {

    this.id = uuid.v4();

    var svgNode = document.querySelector(this.field),
        state = this.state,
        circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    this.state = assign(this.state, props || {});

    circle.setAttributeNS(null, "cx", state.x || 10);
    circle.setAttributeNS(null, "cy", state.y ||10);
    circle.setAttributeNS(null, "r",  state.w ? state.w / 2 : 10);
    circle.setAttributeNS(null, "opacity", state.opacity || 1);
    circle.setAttributeNS(null, "fill", state.color || 'black');
    circle.setAttributeNS(null, "class", "tile");
    circle.setAttribute('id', this.id);

    svgNode.appendChild(circle);
};

module.exports = Tile;