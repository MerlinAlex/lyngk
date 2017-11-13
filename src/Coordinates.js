"use strict";

Lyngk.Coordinates = function (c, l) {
    this.c = c;
    this.l = l;

    this.notValid = function () {
        if (c === "A" && l === 1) {
            return false;
        }
    };

    this.validCoordinate = function () {
        var coordinate = {
            "A": [3, 3],
            "B": [2, 5],
            "C": [1, 7],
            "D": [2, 7],
            "E": [2, 8],
            "F": [3, 8],
            "G": [3, 9],
            "H": [4, 7],
            "I": [7, 7]
        };
        return l >= coordinate[c][0] && l <= coordinate[c][1];
    };

    this.toString = function () {
        if (this.validCoordinate() === false) {
            return "invalid";
        } else {
            return c + l;
        }
    };

    this.getColumn = function () {
        return c;
    };
    this.getLine = function () {
        return l;
    };


    this.clone = function () {
        return new Lyngk.Coordinates(c, l);
    };

    this.hash = function () {
        return (((c.charCodeAt(0) - 64) * 9) + l);
    };

};

