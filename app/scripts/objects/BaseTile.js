"use strict";

var uuid = require('node-uuid');
var assign = require('object-assign');

function Tile(state) {
    this.field = state.domMap.field;
    this.id = uuid.v4();
    this.state = {};
    this.init();
}

Tile.prototype.init = function() {
/*    var proto = this.__proto__; // sorry for __proto__ but it comes handy
    Object.getOwnPropertyNames(proto).forEach(function(thing) {
        if (typeof proto[thing] === 'function') {
            proto[thing] = proto[thing].bind(this);
        }
    }.bind(this));*/
};

Tile.prototype.highlight = function() {
    this.shape.addClass('highlight');
};

Tile.prototype.dehighlight = function() {
    this.shape.removeClass('highlight');
};

Tile.prototype.remove = function() {
    if (!this.shape) {
        debugger;
    }
    document.querySelector(this.field).removeChild(this.shape);
    this.shape = null;
};

Tile.prototype.move = function(prop, value, drop) {
    if (drop) {
        this.animate(value);
    } else {
        if (this.shape) {
            this.shape.setAttributeNS(null, prop, value);
        }
    }
    this.state[prop] = value;
};

Tile.prototype.animate = function(value) {
    var shape;
    if (this.shape) {
        shape = this.shape;
        shape.style.transform = shape.style.WebkitTransform = 'none';
        shape.getBoundingClientRect();
        shape.style.transform = shape.style.WebkitTransform = 'translateY(' + (value - shape.getAttribute('y')*1) + 'px)';
        shape.style.transitionDuration = shape.style.WebkitTransitionDuration = "0.2";
    }

};

Tile.prototype.draw = function(props) {

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

    this.shape = circle;

    svgNode.appendChild(circle);
};

module.exports = Tile;