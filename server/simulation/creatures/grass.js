import Creature from "./creature.js";
import { random } from '../utils.js';

// Startenergie: Jedes Gras beginnt mit einer zufälligen Energiemenge zwischen 0 und 2.
// Energiegewinn: In jedem Zyklus (Frame) erhöht sich die Energie des Grases um 1.
// Fortpflanzung: Erreicht das Gras eine Energie von 7 oder mehr, pflanzt es sich fort.
//     Es sucht in seiner unmittelbaren Umgebung (Nachbarfelder) nach leeren Feldern.
//     Wenn leere Felder vorhanden sind, wird zufällig eines ausgewählt.
//     Auf diesem leeren Feld wird ein neues Grasobjekt erstellt.
//     Die Energie des ursprünglichen Grases wird nach der Fortpflanzung auf 0 zurückgesetzt.
export default class Grass extends Creature {

    // Jede Klasse braucht einen Konstruktor
    // Hier werden die Anfangswerte der Kreatur gesetzt
    constructor() {
        super(Math.floor(random(3)), "green"); // Ruft den Konstruktor der Elternklasse auf
    }

    // Die step() Methode wird in jedem Frame aufgerufen
    // Jede Kreatur braucht eine solche step() Methode!
    step() {
        // Der Code hier wird in jedem Frame ausgeführt
        // Jeden Schritt erhält das Gras 1 Energie
        this.energy++;

        // Wenn das Gras 7 Energie hat, multipliziere und setze die Energie zurück
        if (this.energy >= 7) {
            this.multiply();
            this.energy = 0;
        }
    }
}