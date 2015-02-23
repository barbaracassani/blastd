
var BaseLevel = {

    falling : false,
    rearranging : false,
    offset : 10,
    distance : 10,
    tileSide : 30,
    grid : [10, 10],
    tileVariety : [ ],
    tiles : [],
    selectedTiles : [],
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
                   y : yRow * (this.tileSide + this.distance),
                   w : this.tileSide
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
    findTile : function(id) {
        var tiles = this.tiles, tile, row, column;
        tiles.some(function(rows, i1) {
            tile = rows.some(function(t, i2) {
                if (t.id === id) {
                    row = i2;
                    return true;
                }
            });
            if (tile) {
                column = i1;
                return true;
            }
        });
        return {
            column : column,
            row : row
        }
    },
    clickHandler : function(id) {
        var tile;
        if (this.selectedTiles.length) {
            // check path
        } else {
            // find and highlight tile
            tile = this.findTile(id);
            console.info('tile is ', tile);
        }
    },
    start : function(view) {
        view.on('clicked', this.clickHandler.bind(this))
    },
    end : function(view) {
        view.removeListener('clicked', this.clickHandler.bind(this));
    }
};

module.exports = BaseLevel;
