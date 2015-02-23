var BaseTile = require('../BaseTile');
var state = require('../../models/state');
var assign = require('object-assign');
var uuid = require('node-uuid');

var Grey = function(){};

Grey.prototype = new BaseTile(state);

Grey.prototype.draw = function(props) {

    this.id = uuid.v4();

    var svgNode = document.querySelector(this.field),
        state = this.state,
        square = document.createElementNS("http://www.w3.org/2000/svg", "rect");

    this.state = assign(this.state, props || {});

    square.setAttributeNS(null, "x", state.x || 40);
    square.setAttributeNS(null, "y", state.y ||40);
    square.setAttributeNS(null, "width",  state.w || 10);
    square.setAttributeNS(null, "height",  state.w || 10);
    square.setAttributeNS(null, "opacity", state.opacity || 1);
    square.setAttributeNS(null, "fill", state.color || 'blue');
    square.setAttribute('id', this.id);
    square.setAttributeNS(null, "class", "tile");


    svgNode.appendChild(square);
};

module.exports = Grey;