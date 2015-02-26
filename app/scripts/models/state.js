module.exports = new function() {
    this.domMap = {
        field : '#game',
        pairs : '#pairs',
        level : '#level',
        time : '#time'
    };
    this.state = {
        currentLevel : 0,
        tilesRemaining : 0
    };
    this.events = {

        ON_TILE : 'on_tile',
        ON_TIME : 'on_time',
        ON_LEVEL : 'on_level'

    };
    this.levels = [];
};