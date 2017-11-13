"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (c) {



    var startState = Lyngk.State.VACANT;
    var color;
    var hauteur = 0;

    this.getHauteur = function () {
        return hauteur;
    };
    this.getState = function () {
        return startState;
    };
    this.getColor = function () {
        return color;
    };

    this.setHauteur = function (height) {
        hauteur = height;
    };

    this.setColor = function (col) {
        color = col;
    };

    this.setState = function (state) {
        startState = state;
    };

    this.getCoordinate = function () {
        return c;
    };
};