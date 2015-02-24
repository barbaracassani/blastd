var _ = require('lodash-node');

var tiles;
var extend = require('util')._extend;
var borderTile = {
    instance : {
        id : undefined
    }
};
var emptyTile = {
    instance : {
        id : null
    }
}


var left = function(obj) {
    var bj = extend({}, obj);

    bj.column--;
    if (tiles[bj.column] && tiles[bj.column][bj.row]) {
        return {
            column : bj.column,
            row : bj.row,
            instance : tiles[bj.column][bj.row]
        }
    }
    return borderTile;
};
var right = function(obj) {
    var bj = extend({}, obj);
    bj.column++;
    if (tiles[bj.column] && tiles[bj.column][bj.row]) {
        return {
            column : bj.column,
            row : bj.row,
            instance : tiles[bj.column][bj.row]
        }
    }
    return borderTile;
};
var up = function(obj) {
    var bj = extend({}, obj);
    bj.row--;
    if (tiles[bj.column] && tiles[bj.column][bj.row]) {
        return {
            column : bj.column,
            row : bj.row,
            instance : tiles[bj.column][bj.row]
        }
    }
    return borderTile;
};
var down = function(obj) {
    var bj = extend({}, obj);
    bj.row++;
    if (tiles[bj.column] && tiles[bj.column][bj.row]) {
        return {
            column : bj.column,
            row : bj.row,
            instance : tiles[bj.column][bj.row]
        }
    }
    return borderTile;

};
var methods = {
    left : left,
    up : up,
    right : right,
    down : down
};
module.exports = function(tileA, tileB, tileMatrix) {

    tiles = tileMatrix;

    var stack1 = [], stack2 = [];

    if (tileA.instance.name !== tileB.instance.name) {
        return false;
    }
    // adjacent
    if (left(tileA).instance.id === tileB.instance.id ||
        left(tileB).instance.id === tileA.instance.id ||
        up(tileA).instance.id === tileB.instance.id ||
        up(tileB).instance.id === tileA.instance.id) {
        // adjacent
        return true;
    }

    Object.keys(methods).forEach(function(key) {

        var bj = tileA, bz = tileB, tmpStack = [];
        var isFull = false, adjacent;

        do {
            adjacent = methods[key](bj);
            if (adjacent.instance.id) {
                isFull = true;
            } else {
                bj = adjacent;
                tmpStack.push(adjacent)
            }
        } while(!isFull);

        stack1.push(tmpStack.slice(0));
        tmpStack = []; isFull = false; adjacent = null;

        do {
            adjacent = methods[key](bz);
            if (adjacent.instance.id) {
                isFull = true;
            } else {
                bz = adjacent;
                tmpStack.push(adjacent)
            }
        } while(!isFull);

        stack2.push(tmpStack.slice(0));
        tmpStack = [];

    });

    // if the two stacks intersect, then we have a 0 or 1 corner match

    var intersect = _.flatten(stack1).filter(function(n) {
        return _.flatten(stack2).indexOf(n) != -1;
    });

    if (intersect) {
        return true;
    }

    console.info('stacks', stack1, stack2);
    return false;
};