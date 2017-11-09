"use strict";

Lyngk.Coordinates = function (c, l) {
    this.c = c;
    this.l = l;

    this.notValable = function () {
        if (c === "A" && l === 1) {
            return false;
        }
    }

    this.coordValable = function () {
        var coordVal = {
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
        if (l >= coordVal[c][0] && l <= coordVal[c][1]) {
            return true;
        } else {
            return false;
        }
    }

    this.toString = function () {
        if (this.coordValable() == false) {
            return "invalid";
        } else {
            return c + l;
        }
    }

    this.getColones = function () {
        return c;
    }
    this.getlignes = function () {
        return l;
    }


    this.clone = function () {
        return new Lyngk.Coordinates(c, l);
    }

    this.hash = function () {
        return (((c.charCodeAt(0) - 64) * 9) + l);
    }

}

