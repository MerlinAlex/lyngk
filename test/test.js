'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");

LyngkTestCase.prototype.test1 = function () {
    var coordonnee = new Lyngk.Coordinates("A", 1);
    assertTrue(coordonnee.notValable() == false);
}

LyngkTestCase.prototype.test2 = function () {
    var colones = "ABCDEFGHI";
    var cpt = 0;
    var coord;
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            coord = new Lyngk.Coordinates(colones[i], j + 1);
            if (coord.coordValable() == true) {
                cpt++;
            }
        }
    }
    assertTrue(cpt == 43);
}

LyngkTestCase.prototype.test3 = function () {
    var c = "A";
    var l = 3;
    var ch = c + l;
    var coord = new Lyngk.Coordinates(c, l);
    assertTrue(coord.toString() == ch);
}

LyngkTestCase.prototype.test4 = function () {
    var coord = new Lyngk.Coordinates("A", 1);
    assertTrue(coord.toString() == "invalid");
}

LyngkTestCase.prototype.test5 = function () {
    var coord = new Lyngk.Coordinates("A", 1);
    var coord2 = coord.clone();

    assertTrue(coord.getColones() == coord2.getColones() && coord.getlignes() == coord2.getlignes());
}

LyngkTestCase.prototype.test6 = function () {
    var coord = new Lyngk.Coordinates("A", 3);
    var coord2 = new Lyngk.Coordinates("B", 4);

    if (coord.coordValable() && coord2.coordValable()) {
        var h1 = coord.hash();
        var h2 = coord2.hash();
        assertTrue(h1 != h2 && h1 == 12);

    }
}


LyngkTestCase.prototype.test7 = function () {
    var inter = new Lyngk.Intersection();
    assertEquals(inter.getState(), Lyngk.State.VACANT);
}

LyngkTestCase.prototype.test8 = function () {
    var engine = new Lyngk.Engine();
    var coord = new Lyngk.Coordinates("A", 3);
    var inter = new Lyngk.Intersection(coord);
    engine.placer(Lyngk.Color.BLUE, inter);
    assertTrue(inter.getState() === Lyngk.State.ONE_PIECE && inter.getColor() === Lyngk.Color.BLUE);
}

LyngkTestCase.prototype.test9 = function () {
    var engine = new Lyngk.Engine();
    var coord = new Lyngk.Coordinates("A", 3);
    var inter = new Lyngk.Intersection(coord);
    engine.placer(Lyngk.Color.BLUE, inter);
    engine.placer(Lyngk.Color.RED, inter);

    assertTrue(inter.getState() === Lyngk.State.STACK && inter.getColor() === Lyngk.Color.RED);
}

LyngkTestCase.prototype.test10 = function () {
    var engine = new Lyngk.Engine();
    var coord = new Lyngk.Coordinates("A", 3);
    var inter = new Lyngk.Intersection(coord);
    for (var i = 0; i < 5; i++) {
        engine.placer(Lyngk.Color.BLUE, inter);
    }

    assertTrue(inter.getState() === Lyngk.State.FULL_STACK);
}

LyngkTestCase.prototype.test11 = function () {
    var engine = new Lyngk.Engine();
    assertTrue(engine.plateau());
}



LyngkTestCase.prototype.test13 = function () {
    var engine = new Lyngk.Engine();
    engine.plateau();
    var tab = engine.plateauInter();
    for (var i = 0; i < tab.length; i++) {
        assertTrue(tab[i].getHauteur() === 1)
    }
}

LyngkTestCase.prototype.test14 = function () {
    var engine = new Lyngk.Engine();
    var coord = new Lyngk.Coordinates("A", 2);
    var inter = new Lyngk.Intersection(coord);
    engine.placer(Lyngk.Color.BLACK, inter);
    engine.placer(Lyngk.Color.GREEN, inter);
    assertTrue(inter.getColor() === Lyngk.Color.GREEN);
}

LyngkTestCase.prototype.test15 = function () {
    var engine = new Lyngk.Engine();
    var coord1 = new Lyngk.Coordinates("A", 3);
    var coord2 = new Lyngk.Coordinates("B", 3);
    var inter1 = new Lyngk.Intersection(coord1);
    var inter2 = new Lyngk.Intersection(coord2);
    engine.placer(Lyngk.Color.BLUE, inter1);
    engine.placer(Lyngk.Color.RED, inter2);
    engine.deplacer(inter1, inter2);

    assertTrue(inter1.getColor() === inter2.getColor() && inter1.getState() === Lyngk.State.VACANT);

}

LyngkTestCase.prototype.test16 = function () {
    var engine = new Lyngk.Engine();
    var coord1 = new Lyngk.Coordinates("A", 3);
    var coord2 = new Lyngk.Coordinates("B", 3);
    var coord3 = new Lyngk.Coordinates("B", 2);
    var inter1 = new Lyngk.Intersection(coord1);
    var inter2 = new Lyngk.Intersection(coord2);
    var inter3 = new Lyngk.Intersection(coord3);
    engine.placer(Lyngk.Color.BLUE, inter1);
    engine.placer(Lyngk.Color.RED, inter2);
    engine.placer(Lyngk.Color.GREEN, inter3);
    engine.deplacer(inter1, inter2);
    engine.deplacer(inter2, inter3);


    assertTrue(inter2.getColor() === inter3.getColor() && inter2.getState() === Lyngk.State.VACANT && inter3.getHauteur() === 3);
}

LyngkTestCase.prototype.test17 = function () {
    var engine = new Lyngk.Engine();
    var coord1 = new Lyngk.Coordinates("B", 2);
    var coord2 = new Lyngk.Coordinates("B", 3);
    var inter1 = new Lyngk.Intersection(coord1);
    var inter2 = new Lyngk.Intersection(coord2);
    engine.placer(Lyngk.Color.BLUE, inter1);
    engine.placer(Lyngk.Color.RED, inter2);
    engine.deplacer(inter1, inter2);
    engine.deplacer(inter2, inter1);
    assertTrue(inter1.getState() === Lyngk.State.VACANT);
}

LyngkTestCase.prototype.test20 = function () {
    var engine = new Lyngk.Engine();
    var coord1 = new Lyngk.Coordinates("A", 3);
    var coord2 = new Lyngk.Coordinates("B", 3);
    var coord3 = new Lyngk.Coordinates("B", 2);
    var coord4 = new Lyngk.Coordinates("C", 2);
    var coord5 = new Lyngk.Coordinates("D", 2);
    var coord6 = new Lyngk.Coordinates("E", 2);
    var inter1 = new Lyngk.Intersection(coord1);
    var inter2 = new Lyngk.Intersection(coord2);
    var inter3 = new Lyngk.Intersection(coord3);
    var inter4 = new Lyngk.Intersection(coord4);
    var inter5 = new Lyngk.Intersection(coord5);
    var inter6 = new Lyngk.Intersection(coord6);
    engine.placer(Lyngk.Color.BLUE, inter1);
    engine.placer(Lyngk.Color.RED, inter2);
    engine.placer(Lyngk.Color.RED, inter3);
    engine.placer(Lyngk.Color.RED, inter4);
    engine.placer(Lyngk.Color.RED, inter5);
    engine.placer(Lyngk.Color.RED, inter6);
    engine.deplacer(inter1, inter2);
    engine.deplacer(inter2, inter3);
    engine.deplacer(inter3, inter4);
    engine.deplacer(inter4, inter5);
    engine.deplacer(inter5, inter6);
    assertTrue(inter6.getHauteur() === 1);
}

LyngkTestCase.prototype.test21 = function () {
    var engine = new Lyngk.Engine();
    var coord1 = new Lyngk.Coordinates("A", 3);
    var coord2 = new Lyngk.Coordinates("B", 3);
    var coord3 = new Lyngk.Coordinates("C", 3);
    var inter1 = new Lyngk.Intersection(coord1);
    var inter2 = new Lyngk.Intersection(coord2);
    var inter3 = new Lyngk.Intersection(coord3);
    engine.placer(Lyngk.Color.BLUE, inter1);
    engine.placer(Lyngk.Color.RED, inter2);
    engine.placer(Lyngk.Color.GREEN, inter3);
    engine.deplacer(inter1, inter2);
    engine.deplacer(inter3, inter2);


    assertTrue(inter2.getHauteur() === 2);
}

LyngkTestCase.prototype.test22 = function () {
    var engine = new Lyngk.Engine();
    var coord1 = new Lyngk.Coordinates("I", 7);
    var coord2 = new Lyngk.Coordinates("H", 6);
    var coord3 = new Lyngk.Coordinates("G", 4);
    var coord4 = new Lyngk.Coordinates("G", 5);
    var coord5 = new Lyngk.Coordinates("G", 6);

    var inter1 = new Lyngk.Intersection(coord1);
    var inter2 = new Lyngk.Intersection(coord2);
    var inter3 = new Lyngk.Intersection(coord3);
    var inter4 = new Lyngk.Intersection(coord4);
    var inter5 = new Lyngk.Intersection(coord5);

    engine.placer(Lyngk.Color.BLUE, inter1);
    engine.placer(Lyngk.Color.RED, inter2);
    engine.placer(Lyngk.Color.RED, inter3);
    engine.placer(Lyngk.Color.RED, inter4);
    engine.placer(Lyngk.Color.RED, inter5);

    engine.deplacer(inter1, inter2);
    engine.deplacer(inter3, inter4);
    engine.deplacer(inter4, inter5);
    engine.deplacer(inter2, inter5);

    assertTrue(inter2.getHauteur() === 2);
}
