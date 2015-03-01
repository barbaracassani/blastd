var BaseTile = require('../BaseTile');
var state = require('../../config/state');
var uuid = require('node-uuid');
var assign = require('object-assign');

function Grey3(){
    this.state = {};
    this.name = 'Grey3';
    this.id = uuid.v4();
}

Grey3.prototype = new BaseTile(state);
Grey3.prototype.constructor = Grey3;

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
    svgChildnode.setAttributeNS(null, "fill", state.color || 'black');

    svgChildnode.setAttribute('id', this.id);
    svgChildnode.setAttributeNS(null, "class", "tile");
    square.setAttributeNS(null, "class", "tile");

    square.setAttributeNS(null, "width",  state.w || 10);
    square.setAttributeNS(null, "height",  state.w || 10);
    square.setAttributeNS(null, "x", state.x || 40);
    square.setAttributeNS(null, "y", state.y || 40);

    txt = document.createElementNS("http://www.w3.org/2000/svg", "path");
    txt.setAttributeNS(null, "fill",  'white');
    txt.style.transform = 'translate(' +  (state.x+2) + 'px, ' + (state.y+2) + 'px) scale(0.75)';
    txt.setAttribute("d", "M16 0l-10 16 10 16 10-16z");
    txt.setAttribute("class", "diamond tile");

    svgChildnode.appendChild(square);
    svgChildnode.appendChild(txt);


    svgNode.appendChild(svgChildnode);
};


module.exports = Grey3;