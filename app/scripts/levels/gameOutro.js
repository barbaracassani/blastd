var _ = require('lodash-node');
var state = require('../config/state');

module.exports =  {

    playOutro : function(options, callback) {
        var template = _.template('Game over chaps. Too bad :)');
        var field = document.querySelector('#wrapper');
        var text = document.createTextNode(template( { level : options.nextLevel }));
        var el = document.createElement('div');
        el.id = 'levelIntro';
        el.classList.add('outro', 'gameOutro');
        el.appendChild(text);
        field.appendChild(el);

        window.setTimeout(function() {
            field.removeChild(el);
            el = null;
            callback();
        }, state.state.outroLength);
    }

};