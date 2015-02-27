var BaseTile = require('../BaseTile');
var state = require('../../config/state');
var uuid = require('node-uuid');
var assign = require('object-assign');

var Grey2 = function(){
    this.state = {};
};

Grey2.prototype = new BaseTile(state);
Grey2.prototype.constructor = Grey2;

Grey2.prototype.highlight = function() {
    this.shape.classList.add('highlight');
};

Grey2.prototype.dehighlight = function() {
    this.shape.classList.remove('highlight');
};

Grey2.prototype.remove = function() {
  BaseTile.prototype.remove.apply(this, arguments);
};

Grey2.prototype.draw = function(props) {

    this.id = uuid.v4();
    this.name = 'grey2';

    var svgNode = document.querySelector(this.field),
        state = this.state,
        square = document.createElementNS("http://www.w3.org/2000/svg", "rect");

    this.state = assign(this.state, props || {});

    console.info('my state is ', this.state.x, this.state.y)

    square.setAttributeNS(null, "x", state.x || 40);
    square.setAttributeNS(null, "y", state.y ||40);
    square.setAttributeNS(null, "width",  state.w || 10);
    square.setAttributeNS(null, "height",  state.w || 10);
    square.setAttributeNS(null, "opacity", state.opacity || 1);
    square.setAttributeNS(null, "fill", state.color || 'black');
    square.setAttributeNS(null, "class", "tile");

    square.setAttribute('id', this.id);

    this.shape = square;

    svgNode.appendChild(square);
};


module.exports = Grey2;