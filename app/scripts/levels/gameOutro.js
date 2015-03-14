var _ = require('lodash-node');
var state = require('../config/state');

module.exports =  {

    playOutro : function(options, callback) {
        var template = _.template('Game over chaps. Too bad :)<br>' +
        '<button id="restart"> Restart game </button><b><%= value %></b>');
        var field = document.querySelector('#wrapper');
        var text = template( { value : options.nextLevel });
        var el = document.createElement('div');
        el.id = 'levelIntro';
        el.classList.add('outro', 'gameOutro');
        el.innerHTML = text;
        field.appendChild(el);

        function restartGame() {
            document.querySelector('#restart').removeEventListener('click', restartGame.bind(this));
            field.removeChild(el);
            el = null;
            callback();
        }

        document.querySelector('#restart').addEventListener('click', restartGame.bind(this));


    }

};