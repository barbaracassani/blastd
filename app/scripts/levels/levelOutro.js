var _ = require('lodash-node');
var state = require('../config/state');

module.exports =  {

    playOutro : function(options, callback) {
        var template = _.template('You got some points! Well done!');
        var field = document.querySelector('#wrapper');
        var text = document.createTextNode(template( { level : options.nextLevel }));
        var el = document.createElement('div');
        el.id = 'levelIntro';
        el.classList.add('outro', 'levelOutro');
        el.appendChild(text);
        field.appendChild(el);

        window.setTimeout(function() {
            field.removeChild(el);
            el = null;
            callback();
        }, state.state.outroLength);
    }

};