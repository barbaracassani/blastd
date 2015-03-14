var _ = require('lodash-node');
var state = require('../config/state');

module.exports =  {

    playIntro : function(options, callback) {
        var template = _.template('Welcome to my game blah blah');
        var field = document.querySelector('#wrapper');
        var text = document.createTextNode(template( { level : options.nextLevel }));
        var el = document.createElement('div');
        el.classList.add('intro', 'gameIntro');
        el.id = 'levelIntro';
        el.appendChild(text);
        field.appendChild(el);

        window.setTimeout(function() {
            field.removeChild(el);
            el = null;
            callback();
        }, state.state.introLength);
    }

};