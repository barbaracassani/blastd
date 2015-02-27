var _ = require('lodash-node');
var state = require('../config/state');

module.exports =  {

playIntro : function(options, callback) {
    var template = _.template('About to play level ${ level } Get ready!');
    var field = document.querySelector('#wrapper');
    var text = document.createTextNode(template( { level : options.nextLevel }));
    var el = document.createElement('div');
    el.id = 'intermission';
    el.appendChild(text);
    field.appendChild(el);

    window.setTimeout(function() {
        field.removeChild(el);
        el = null;
        callback();
    }, state.state.introLength);
}


};