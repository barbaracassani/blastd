var BaseTile = require('../BaseTile');
var state = require('../../config/state');
var assign = require('object-assign');
var uuid = require('node-uuid');

function Grey(){
    this.state = {};
    this.name = "Grey";
    this.id = uuid.v4();
}

Grey.prototype = new BaseTile(state);
Grey.prototype.constructor = Grey;

Grey.prototype.highlight = function() {
    this.shape.classList.add('highlight');
};

Grey.prototype.dehighlight = function() {
    this.shape.classList.remove('highlight');
};

Grey.prototype.remove = function() {
    BaseTile.prototype.remove.apply(this, arguments);
};

Grey.prototype.draw = function(props) {

    var svgNode = document.querySelector(this.field),
        state = this.state,
        square = document.createElementNS("http://www.w3.org/2000/svg", "rect");

    console.warn('my state was ', this.state.x, this.state.y)

    this.state = assign(this.state, props || {});

    console.info('my state is ', this.state.x, this.state.y)

    square.setAttributeNS(null, "x", state.x || 40);
    square.setAttributeNS(null, "y", state.y || 40);
    square.setAttributeNS(null, "width",  state.w || 10);
    square.setAttributeNS(null, "height",  state.w || 10);
    square.setAttributeNS(null, "opacity", state.opacity || 1);
    square.setAttributeNS(null, "fill", state.color || 'blue');
    square.setAttribute('id', this.id);
    square.setAttributeNS(null, "class", "tile");

    this.shape = square;

    svgNode.appendChild(square);
};

module.exports = Grey;