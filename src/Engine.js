"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var listPiece = [];
    var tableau = [];
    var color = [8, 8, 8, 8, 8, 3];

    this.placer = function (pieceColor, inter) {
        var piece = new Lyngk.Piece();
        listPiece.push(piece.setColor(pieceColor));
        inter.setColor(pieceColor);
        inter.setHauteur(1);
        switch (inter.getState()) {
            case Lyngk.State.VACANT :
                inter.setState(Lyngk.State.ONE_PIECE);
                break;
            case Lyngk.State.ONE_PIECE :
                inter.setState(Lyngk.State.STACK);
                break;
        }
        if (listPiece.length === 5) {
            inter.setState(Lyngk.State.FULL_STACK);
        }
    };

    this.initPlateau = function (intersection) {
        var Flag = true;
        if (intersection.getState() === Lyngk.State.ONE_PIECE) {
            intersection.setHauteur(1);
            tableau.push(intersection)
        } else {
            Flag = false;
        }
        return Flag;
    };

    this.plateau = function () {
        var coordinate;
        var intersection;
        var randomColor = 0;
        var Flag;
        for (var i = "A"; i < "J";i++) {
            for (var j = 1; j < 10; j += 1) {
                coordinate = new Lyngk.Coordinates(i, j);
                if (coordinate.validCoordinate() === true) {
                    intersection = new Lyngk.Intersection(coordinate);
                    do{
                        randomColor = this.rand();
                    }while(color[randomColor] <= 0);
                    color[randomColor]--;
                    this.placer(randomColor, intersection);
                    Flag = this.initPlateau(intersection);
                }
            }
        }

        return Flag;
    };



    this.rand = function () {
        return Math.floor(Math.random() * 6);
    };

    this.remove = function (j) {
        var tab = this.plateauInter();
        for (var i = 0; i < tab.length; i += 1) {
            if (tab[i] === j) {
                delete tab[i];
                j.setState(Lyngk.State.VACANT);
            }
        }

    };

    this.plateauInter = function () {
        return tableau;
    };

    this.move = function (firstCoordinate, secondCoordinate) {
        var coordinate1 = firstCoordinate.getCoordinate();
        var coordinate2 = secondCoordinate.getCoordinate();
        if (secondCoordinate.getState() !== Lyngk.State.VACANT && firstCoordinate.getHauteur() < 5 && coordinate1.validCoordinate() && coordinate2.validCoordinate()) {
            this.placer(firstCoordinate.getColor(), secondCoordinate);
            var hauteur = firstCoordinate.getHauteur();
            var hauteur2 = secondCoordinate.getHauteur();
            secondCoordinate.setHauteur(hauteur + hauteur2);
            firstCoordinate.setState(Lyngk.State.VACANT);
        }

    };
};
