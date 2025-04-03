import Creature from "./creature.js";
import GrassEater from "./grasseater.js";


// Startenergie: Jeder Fleischfresser beginnt mit einer Energie von 100.
// Nahrungssuche: In jedem Zyklus sucht der Fleischfresser in seiner unmittelbaren Umgebung nach Nahrung.
//     Grasfresser gefunden:
//         Der Fleischfresser bewegt sich auf das Feld, auf dem sich der Grasfresser befindet.
//         Dadurch wird der Grasfresser "gefressen" und der Fleischfresser erhält 10 Energiepunkte dazu.
//     Kein Grasfresser gefunden:
//         Der Fleischfresser kann kein leeres Feld suchen, sondern verliert 1 Energiepunkt.
// Fortpflanzung: Erreicht der Fleischfresser eine Energie von 120 oder mehr, pflanzt er sich fort.
//     Er sucht nach einem leeren Feld in seiner Umgebung.
//     Wenn ein leeres Feld gefunden wird, wird dort ein neuer Fleischfresser erstellt.
//     Der ursprüngliche Fleischfresser verliert 100 Energiepunkte durch die Fortpflanzung.
// Tod: Sinkt die Energie des Fleischfressers auf 0 oder weniger, stirbt er und das Feld, auf dem er sich befand, wird leer.
export default class MeatEater extends Creature {
    constructor() {
        super(100, "red");
    }

    eat() {
        if (this.findAndMoveToFood(GrassEater)) {
            this.energy += 10;
        } else {
            this.energy--;
        }
    }

    step() {
        this.eat()
        if (this.energy >= 120) {
            this.multiply();
            this.energy -= 100;
        }
        this.die();
    }
}