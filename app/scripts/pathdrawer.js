var state = require('./config/state');
var _ = require('lodash-node');

function getPosition(tile, offset, side, distance) {
    return {
        x : ((tile.row + 1) * (side + distance)) + offset,
        y : ((tile.column + 1) * (side + distance)) + offset
    }
}

function findNext(path, tile) {
    return _.find(path, function(p) {
        return p.row === tile.row || p.column === tile.column;
    })
}

function serialise(points) {
    var str = 'M';
    var first = points.shift();
    str += (first.y + ' ' + first.x + ' ');
    points.forEach(function(p) {
        str += 'L ' + p.y + ' ' + p.x + ' ';
    });
    return str;
}

module.exports = function(options) {
    // arm the pathdrawer with the options; offset, tileSide, grid, distance
    return function(selectedTiles, path, callback) {
        console.info(selectedTiles, path);
        var points = [], nextPoint, otherPoint;

        points.push(getPosition(selectedTiles[0], options.offset, options.tileSide, options.distance));
        if (path.length === 1) {
            points.push(getPosition(path[0], options.offset, options.tileSide, options.distance));
        } else {
            nextPoint = findNext(path, selectedTiles[0]);
            points.push(getPosition(nextPoint, options.offset, options.tileSide, options.distance ));
            otherPoint = _.reject(path, function(p) {
                return p.row === nextPoint.row && p.column === nextPoint.column;
            })[0];
            points.push(getPosition(otherPoint, options.offset, options.tileSide, options.distance ));
        }
        points.push(getPosition(selectedTiles[1], options.offset, options.tileSide, options.distance));

        points = serialise(points);

        var pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
        //pathEl.setAttribute('d','M10 10 H 90 V 90 H 10 L 10 10' );
        pathEl.setAttribute('d', points);
        pathEl.style.stroke = 'white';
        pathEl.style.strokeWidth = '2';
        pathEl.style.fill = 'none';

        document.querySelector('svg').appendChild(pathEl);

        callback();
    }
 };