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
        svgChildnode = document.createElementNS("http://www.w3.org/2000/svg", "g"),
        state = this.state,
        txt,
        square = document.createElementNS("http://www.w3.org/2000/svg", "rect");

    this.state = assign(this.state, props || {});

    this.shape = svgChildnode;

    svgChildnode.setAttributeNS(null, "x", state.x || 40);
    svgChildnode.setAttributeNS(null, "y", state.y || 40);
    svgChildnode.setAttributeNS(null, "width",  state.w || 10);
    svgChildnode.setAttributeNS(null, "height",  state.w || 10);
    svgChildnode.setAttributeNS(null, "opacity", state.opacity || 1);
    svgChildnode.setAttributeNS(null, "fill", state.color || 'blue');

    svgChildnode.setAttribute('id', this.id);
    svgChildnode.setAttributeNS(null, "class", "tile");
    square.setAttributeNS(null, "class", "tile");

    square.setAttributeNS(null, "width",  state.w || 10);
    square.setAttributeNS(null, "height",  state.w || 10);
    square.setAttributeNS(null, "x", state.x || 40);
    square.setAttributeNS(null, "y", state.y || 40);

    txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
    txt.textContent = 'A';
    txt.setAttributeNS(null, "width",  state.w);
    txt.setAttributeNS(null, "height",  state.w);
    txt.setAttributeNS(null, "fill",  'white');
    txt.setAttributeNS(null, "x", state.x+5);
    txt.setAttributeNS(null, "y", state.y+25);
    txt.setAttributeNS(null, "class", "tile");

    svgChildnode.appendChild(square);
    svgChildnode.appendChild(txt);


    svgNode.appendChild(svgChildnode);
};

module.exports = Grey;