import Creature from "./creature.js";
import Grass from "./grass.js";
import Empty from "./empty.js";

// Startenergie: Jeder Grasfresser beginnt mit einer Energie von 5.
// Nahrungssuche: In jedem Zyklus sucht der Grasfresser in seiner unmittelbaren Umgebung nach Nahrung.
//     Gras gefunden:
//         Der Grasfresser bewegt sich auf das Feld, auf dem sich das Gras befindet.
//         Dadurch wird das Gras "gefressen" und der Grasfresser erhält 1 Energiepunkt dazu.
//     Kein Gras gefunden:
//         Der Grasfresser sucht nach einem leeren Feld in seiner Umgebung.
//         Wenn ein leeres Feld gefunden wird, bewegt sich der Grasfresser dorthin.
//         Da keine Nahrung gefunden wurde, verliert der Grasfresser 1 Energiepunkt.
// Fortpflanzung: Erreicht der Grasfresser eine Energie von 10 oder mehr, pflanzt er sich fort.
//     Er sucht nach einem leeren Feld in seiner Umgebung.
//     Wenn ein leeres Feld gefunden wird, wird dort ein neuer Grasfresser erstellt.
//     Der ursprüngliche Grasfresser verliert 5 Energiepunkte durch die Fortpflanzung.
// Tod: Sinkt die Energie des Grasfressers auf 0 oder weniger, stirbt er und das Feld, auf dem er sich befand, wird leer.
export default class GrassEater extends Creature {
    constructor() {
        super(5, "yellow");
    }

    eat() {
        if (this.findAndMoveToFood(Grass)) {
            this.energy++;
        } else {
            this.findAndMoveToFood(Empty);
            this.energy--;
        }
    }

    step() {
        this.eat();
        if (this.energy >= 10) {
            this.multiply();
            this.energy -= 5;
        }
        this.die();
    }
}