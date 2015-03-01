"use strict";

var extend = require('util')._extend;
var _ = require('lodash-node');
var pathfinder = require('../pathfinder');
var state = require('../config/state');
var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;
var pathdrawer = require('../pathdrawer');

var BaseLevel = {
    falling : true,
    swapping : 3000,
    rearranging : false,
    offset : 10,
    distance : 10,
    tileSide : 30,
    grid : [5, 5],
    tileVariety : [ ],
    tilePool : [],
    tiles : [],
    selectedTiles : [],
    time : 60000,
    pathdrawer : null,
    getRandomInt : function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    tileIniter : function() {
        // ensure the tiles are in pairs
        var tilenum = this.grid[0] * this.grid[1], klass;
        while (tilenum > 0) {
            klass = this.tileVariety[this.getRandomInt(0, this.tileVariety.length - 1)];
            this.tilePool.push(new klass());
            this.tilePool.push(new klass());
            tilenum -= 2;
        }
        return  _.shuffle(this.tilePool);
    },
    tileRandomizer : function() {
        return new (this.tileVariety[this.getRandomInt(0, this.tileVariety.length - 1)]);
    },
    draw : function() {

        var pool = this.tileIniter();

        var xRow = this.grid[0],
            yRow = this.grid[1], initX = xRow, tmpObj,
            xI = 0, yI = 0,
            tmpArray = [];
        while (xI < xRow) {
            while (yI < yRow) {
                tmpObj = pool.shift();
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

        this.pathdrawer = pathdrawer({
            offset : this.offset,
            tileSide : this.tileSide,
            grid : this.grid,
            distance : this.distance
        })
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
        if (row === undefined) {
            debugger;
        }
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

        if (this.falling) {
            this.faller();
        }

        this.selectedTiles = [];
        this.emit(state.events.ON_TILE);
    },
    faller : function() {

        function rearrangeColumn(tiles) {
            console.info('in', tiles);
            return _.flatten(_.partition(tiles, function(a) {
                return a.shape === null;
            }));
        }

        window.clearTimeout(this.swapTime);

        this.selectedTiles.forEach(function(tilz) {
            var interestedColumn = tilz.column;
            this.tiles[interestedColumn] = rearrangeColumn.call(this, this.tiles[interestedColumn]);
            this.tiles[interestedColumn].forEach(function(tt, index) {
                tt.move.call(tt, 'y', (index+1) * (this.tileSide + this.distance), true);
            }.bind(this))
        }.bind(this));

        this.startSwapper();

    },
    startSwapper : function() {
        this.swapTime = window.setTimeout(function() {
            this.swapper();
        }.bind(this), this.swapping);
    },
    swapper : function() {

        var tile1, tile2, xy1, xy2, s1, s2;

        window.clearTimeout(this.swapTime);

        if (!this.selectedTiles.length) {

            var fullTiles = _.filter(_.flatten(this.tiles), function(tile) {
                return tile.shape;
            });

            if (fullTiles.length > 2) {

                tile1 = fullTiles[this.getRandomInt(0, fullTiles.length - 1)];
                tile2 = fullTiles[this.getRandomInt(0, fullTiles.length - 1)];

                var pos1 = this.findTile(tile1.id);
                var pos2 = this.findTile(tile2.id);

                if (pos1.column !== pos2.column) {



                    var state1 = _.clone(tile1.state, true);
                    var removedTile1 = this.tiles[pos1.column].splice(pos1.row, 1, {})[0];



                    var state2 = _.clone(tile2.state, true);
                    var removedTile2 = this.tiles[pos2.column].splice(pos2.row, 1, {})[0];

                    this.tiles[pos1.column].splice(pos1.row, 1, removedTile2);
                    this.tiles[pos2.column].splice(pos2.row, 1, removedTile1);

                    removedTile1.remove();
                    removedTile2.remove();

                    removedTile1.draw({x : state2.x, y : state2.y});
                    removedTile2.draw({x : state1.x, y : state1.y});
                }

            }
        }

        this.startSwapper();

    },
    clickHandler : function(id) {
        var path;
        var tile = this.findTile(id);
        if (this.selectedTiles.length === 1) {

            if (tile.instance.id === this.selectedTiles[0].instance.id) {
                this.selectedTiles[0].instance.dehighlight();
                this.selectedTiles = [];
                return false;
            }

            tile.instance.highlight();
            this.selectedTiles.push(tile);
            path = this.checkPath();
            if (path) {
                this.pathdrawer(this.selectedTiles, _.isArray(path) ? path : [], this.score.bind(this));
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
        }
    },
    timer : function() {
        var time = this.time;
        var timeout = window.setInterval(function() {
            time -= 1000;
            this.emit(state.events.ON_TIME, time / 1000);
            if (time <= 0) {
                window.clearInterval(timeout);
            }
        }.bind(this), 1000)
    },
    start : function(view) {
        view.on('clicked', this.clickHandler.bind(this));
        this.emit(state.events.ON_TILE, this.grid[0] * this.grid[1]);
        this.timer();
        if (this.swapping) {
            this.startSwapper();
        }
    },
    end : function(view) {
        view.removeListener('clicked', this.clickHandler.bind(this));
    }
};

extend(BaseLevel, EventEmitter.prototype);

module.exports = BaseLevel;
