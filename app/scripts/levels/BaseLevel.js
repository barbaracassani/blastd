var extend = require('util')._extend;
var pathfinder = require('../pathfinder');

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
            xI = 0, yI = 0,
            tmpArray = [];
        while (xI < xRow) {
           while (yI < yRow) {
               tmpObj = this.tileRandomizer();
               tmpObj.draw({
                   x : (xI+1) * (this.tileSide + this.distance),
                   y : (yI+1) * (this.tileSide + this.distance),
                   w : this.tileSide
               });
               tmpArray.push(tmpObj);
               yI++;
           }
            this.tiles.push(tmpArray.slice(0));
            tmpArray = [];
            xI++;
            yI = 0;
        }
    },
    findTile : function(id) {
        var tiles = this.tiles, tile, row, column;
        tiles.some(function(rows, i1) {
            tile = rows.some(function(t, i2) {
                if (t && t.id === id) {
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
            row : row,
            instance : tiles[column][row]
        }
    },
    checkPath : function() {
        var t1 = this.selectedTiles[0];
        var t2 = this.selectedTiles[1];
        return pathfinder(t1, t2, this.tiles);
    },
    score : function() {
        this.selectedTiles.forEach(function(tile) {
            tile.instance.remove();
        });
        this.selectedTiles.forEach(function(tile) {
            this.tiles[tile.column][tile.row].id = null;
            this.tiles[tile.column][tile.row].shape = null;
        }.bind(this));
        this.selectedTiles = [];
    },
    clickHandler : function(id) {
        var tile = this.findTile(id);
        if (this.selectedTiles.length === 1) {

            if (tile.instance.id === this.selectedTiles[0].instance.id) {
                this.selectedTiles[0].instance.dehighlight();
                this.selectedTiles = [];
                return false;
            }

            tile.instance.highlight();
            this.selectedTiles.push(tile);
            if (this.checkPath()) {
                this.score();
            } else {
                this.selectedTiles.forEach(function(tile) {
                    tile.instance.dehighlight();
                });
                this.selectedTiles = [];
            }
        } else {
            // find and highlight tile
            this.selectedTiles.push(tile);
            tile.instance.highlight();
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
