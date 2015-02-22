
var BaseLevel = {

    falling : false,
    rearranging : false,
    offset : 10,
    distance : 10,
    tileSide : 10,
    grid : [10, 10],
    tileVariety : [ ],
    tiles : [],
    time : 60000,
    getRandomInt : function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    tileRandomizer : function() {
        return new (this.tileVariety[this.getRandomInt(0, this.tileVariety.length - 1)]);
    },
    draw : function() {
        var xRow = this.grid[0],
            yRow = this.grid[1], initX = xRow, tmpObj,
            tmpArray = [];
        while (yRow > 0) {
           while (xRow > 0) {
               tmpObj = this.tileRandomizer();
               tmpObj.draw({
                   x : xRow * (this.tileSide + this.distance),
                   y : yRow * (this.tileSide + this.distance)
               });
               tmpArray.push(tmpObj);
               xRow--;
           }
            this.tiles.push(tmpArray.slice(0));
            tmpArray = [];
            yRow--;
            xRow = initX;
        }
    },
    clickHandler : function(e) {
        console.info('do the deed', e)
    },
    start : function(view) {
        view.on('clicked', this.clickHandler.bind(this))
    },
    end : function(view) {
        view.removeListener('clicked', this.clickHandler.bind(this));
    }
};

module.exports = BaseLevel;
