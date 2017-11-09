"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (c) {


    var cpt = 0;
    var etat = Lyngk.State.VACANT;
    var color;
    var hauteur = 0;

    this.getHauteur = function () {
        return hauteur;
    }
    this.getState = function () {
        return etat;
    }
    this.getColor = function () {
        return color;
    }

    this.setHauteur = function (haut) {
        hauteur = haut;
    }

    this.setColor = function (col) {
        color = col;
    }

    this.setState = function (state) {
        etat = state;
    }

    this.getCoord = function () {
        return c;
    }
};