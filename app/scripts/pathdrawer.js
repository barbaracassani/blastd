var state = require('./config/state');
var _ = require('lodash-node');
var rounder = require('./rounder');

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

function cutStroke(points, tileSide) {
    ['y', 'x'].forEach(function(p) {
        if (points[0][p] > points[1][p]) {
            // goes up
            points[0][p] -= tileSide/2;
        } else if (points[0][p] < points[1][p]) {
            points[0][p] += tileSide/2;
        }
        if (points[points.length-1][p] > points[points.length-2][p]) {
            // goes up
            points[points.length-1][p] -= tileSide/2;
        } else if (points[points.length-1][p] < points[points.length-2][p]) {
            points[points.length-1][p] += tileSide/2;
        }
    });

    return points;
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

function animate(pathZ) {
    // copied from Jake Archibald (http://jakearchibald.com/2013/animated-line-drawing-svg/)
    var path = document.querySelector('#' + pathZ);
    var length = path.getTotalLength();
// Clear any previous transition
    path.style.transition = path.style.WebkitTransition =
        'none';
// Set up the starting positions
    path.style.strokeDasharray = length + ' ' + length;
    path.style.strokeDashoffset = length;
// Trigger a layout so styles are calculated & the browser
// picks up the starting position before animating
    path.getBoundingClientRect();
// Define our transition
    path.style.transition = path.style.WebkitTransition =
        'stroke-dashoffset 0.1s ease-in-out';
// Go!
    path.style.strokeDashoffset = '0';
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

        points = rounder(serialise(cutStroke(points, options.tileSide)), 4);

        var pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
        //pathEl.setAttribute('d','M10 10 H 90 V 90 H 10 L 10 10' );
        pathEl.setAttribute('d', points);
        pathEl.style.stroke = 'white';
        pathEl.style.strokeLineJoin = 'round';
        pathEl.style.strokeWidth = '3';
        pathEl.style.fill = 'none';

        var uuidZ = 'pathZ';
        pathEl.id = uuidZ;

        document.querySelector('svg').appendChild(pathEl);
        animate(uuidZ);
        window.setTimeout(function() {
            document.querySelector('svg').removeChild(pathEl);
            callback();
        },100);

    }
 };