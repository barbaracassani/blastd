var BaseTile = require('../BaseTile');
var state = require('../../config/state');
var uuid = require('node-uuid');
var assign = require('object-assign');

function Grey2(){
    this.state = {};
    this.name = 'Grey2';
    this.id = uuid.v4();
}

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

    txt = document.createElementNS("http://www.w3.org/2000/svg", "path");
    txt.setAttributeNS(null, "fill",  'white');
    txt.style.transform = 'translate(' +  (state.x+2) + 'px, ' + (state.y+2) + 'px) scale(0.75)';
    txt.setAttribute("d", "M29.181 19.070c-1.679-2.908-0.669-6.634 2.255-8.328l-3.145-5.447c-0.898 0.527-1.943 0.829-3.058 0.829-3.361 0-6.085-2.742-6.085-6.125h-6.289c0.008 1.044-0.252 2.103-0.811 3.070-1.679 2.908-5.411 3.897-8.339 2.211l-3.144 5.447c0.905 0.515 1.689 1.268 2.246 2.234 1.676 2.903 0.672 6.623-2.241 8.319l3.145 5.447c0.895-0.522 1.935-0.82 3.044-0.82 3.35 0 6.067 2.725 6.084 6.092h6.289c-0.003-1.034 0.259-2.080 0.811-3.038 1.676-2.903 5.399-3.894 8.325-2.219l3.145-5.447c-0.899-0.515-1.678-1.266-2.232-2.226zM16 22.479c-3.578 0-6.479-2.901-6.479-6.479s2.901-6.479 6.479-6.479c3.578 0 6.479 2.901 6.479 6.479s-2.901 6.479-6.479 6.479z");
    txt.setAttribute("class", "cog tile");

    svgChildnode.appendChild(square);
    svgChildnode.appendChild(txt);


    svgNode.appendChild(svgChildnode);
};


module.exports = Grey2;