var BaseTile = require('../BaseTile');
var state = require('../../config/state');
var uuid = require('node-uuid');
var assign = require('object-assign');

function Grey4(){
    this.state = {};
    this.name = 'Grey4';
    this.id = uuid.v4();
}

Grey4.prototype = new BaseTile(state);
Grey4.prototype.constructor = Grey4;

Grey4.prototype.highlight = function() {
    this.shape.classList.add('highlight');
};

Grey4.prototype.dehighlight = function() {
    this.shape.classList.remove('highlight');
};

Grey4.prototype.remove = function() {
    BaseTile.prototype.remove.apply(this, arguments);
};

Grey4.prototype.draw = function(props) {

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
    txt.setAttribute("d", "M28 22v-16c0-1.1-0.9-2-2-2h-20c-1.1 0-2 0.9-2 2v16h-4v6h32v-6h-4zM20 26h-8v-2h8v2zM26 22h-20v-15.996c0.001-0.001 0.002-0.003 0.004-0.004h19.993c0.001 0.001 0.003 0.002 0.004 0.004v15.996z");
    txt.setAttribute("class", "laptop tile");

    svgChildnode.appendChild(square);
    svgChildnode.appendChild(txt);
    
    svgNode.appendChild(svgChildnode);
};


module.exports = Grey4;