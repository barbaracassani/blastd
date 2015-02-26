var BaseTile = require('../BaseTile');
var state = require('../../config/state');
var uuid = require('node-uuid');
var assign = require('object-assign');

var Grey3 = function(){};

Grey3.prototype = new BaseTile(state);

Grey3.prototype.highlight = function() {
    this.shape.classList.add('highlight');
};

Grey3.prototype.dehighlight = function() {
    this.shape.classList.remove('highlight');
};

Grey3.prototype.remove = function() {
    BaseTile.prototype.remove.apply(this, arguments);
};

Grey3.prototype.draw = function(props) {

    this.id = uuid.v4();
    this.name = 'Grey3';

    var svgNode = document.querySelector(this.field),
        state = this.state,
        square = document.createElementNS("http://www.w3.org/2000/svg", "rect");

    this.state = assign(this.state, props || {});

    square.setAttributeNS(null, "x", state.x || 40);
    square.setAttributeNS(null, "y", state.y ||40);
    square.setAttributeNS(null, "width",  state.w || 10);
    square.setAttributeNS(null, "height",  state.w || 10);
    square.setAttributeNS(null, "opacity", state.opacity || 1);
    square.setAttributeNS(null, "fill", state.color || 'yellow');
    square.setAttributeNS(null, "class", "tile");

    square.setAttribute('id', this.id);

    this.shape = square;

    svgNode.appendChild(square);
};


module.exports = Grey3;