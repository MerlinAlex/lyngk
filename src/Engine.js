"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var listePiece= [];
    var tableau= [];
    this.placer=function(pionColor,inter) {
        var piece=new Lyngk.Piece;
        listePiece.push(piece.setColor(pionColor));
        inter.setColor(pionColor);
        inter.setHauteur(1);
        switch (inter.getState()){
            case Lyngk.State.VACANT :
                inter.setState(Lyngk.State.ONE_PIECE);
            break;
            case Lyngk.State.ONE_PIECE :
                inter.setState(Lyngk.State.STACK);
            break;
        }
        if(listePiece.length===5){
            inter.setState(Lyngk.State.FULL_STACK);
        }
    }



    this.plateau=function() {
        var colonesLettres = "ABCDEFGHI";
        var coordonnee;
        var intersection;
        var couleurAlea = 0;
        var couleur = [8, 8, 8, 8, 8, 3];
        for (var i in colonesLettres) {
            for (var j = 1; j < 10; j++) {
                coordonnee = new Lyngk.Coordinates(colonesLettres[i], j);
                if (coordonnee.coordValable() === true) {
                    intersection = new Lyngk.Intersection(coordonnee);
                    while (couleur[couleurAlea] <= 0) {
                        couleurAlea = rand();
                    }
                    couleur[couleurAlea]--;
                    this.placer(couleurAlea, intersection);
                    if (intersection.getState() === Lyngk.State.ONE_PIECE) {
                        intersection.setHauteur(1);
                        tableau.push(intersection);
                        return true;
                    } else {
                        return false;
                    }

                }
            }
        }
        if (couleur == 0) {
            return true;
        }
    }

    this.rand = function(){
        return Math.floor(Math.random()*6);
    }

    this.remove=function(j){
        var tab=this.plateauInter();
        for(var i=0;i<tab.length;i++) {
            if (tab[i] == j) {
                delete tab[i];
                j.setState(Lyngk.State.VACANT);
            }
        }

    }

    this.plateauInter=function(){
        return tableau;
    }

    this.deplacer=function(depart,arrivee){
        var coord1=depart.getCoord();
        var coord2=arrivee.getCoord();
        if ((arrivee.getState()!==Lyngk.State.VACANT && depart.getHauteur()<5 && coord1.coordValable() && coord2.coordValable())){
            this.placer(depart.getColor(),arrivee);
            var hauteur=depart.getHauteur();
            var hauteur2=arrivee.getHauteur();
            arrivee.setHauteur(hauteur+hauteur2);
            depart.setState(Lyngk.State.VACANT);
        }

    }
};
