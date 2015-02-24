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
};

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

function createStack(bj) {

    var isFull = false, tmpStack = [], stack = [], adjacent;

    Object.keys(methods).forEach(function(key) {
        do {
            adjacent = methods[key](bj);
            if (adjacent.instance.id) {
                isFull = true;
            } else {
                bj = adjacent;
                tmpStack.push(adjacent)
            }
        } while(!isFull);

        stack.push(tmpStack.slice(0));
        tmpStack = [], isFull = false;
    });

    return stack;
}

function stacksIntersect(flattened1, flattened2) {
    return flattened1.some(function(s1) {
        return flattened2.some(function(s2) {
            return s2.column === s1.column && s2.row === s1.row;
        })
    });
}

module.exports = function(tileA, tileB, tileMatrix) {

    tiles = tileMatrix;

    var stack1 = [], stack2 = [], stack3 = [];

    if (tileA.instance.name !== tileB.instance.name) {
        // the tiles do not match
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

    stack1 = createStack(tileA);
    stack2 = createStack(tileB);

    var flattened1 = _.flatten(stack1);
    var flattened2 = _.flatten(stack2);

    if (!flattened1.length || !flattened2.length) {
        // one of the tiles is completely walled in
        return false;
    }

    // if the two stacks intersect, then we have a 0 or 1 corner match

    console.info('stacks', stack1, stack2);

    if (stacksIntersect(flattened1, flattened2)) {
        return true;
    }

    // but now we need to check for 2 corners

    // iterate through all the points of stack1, create a new stack for each and check if it intersects with stack 2

    return flattened1.some(function(point) {
        stack3 = _.flatten(createStack(point));
        return stacksIntersect(_.flatten(stack3), stack2);
    });

};