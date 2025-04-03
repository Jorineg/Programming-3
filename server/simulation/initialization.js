import { random } from "./utils.js";
import Grass from "./creatures/grass.js";
import GrassEater from "./creatures/grasseater.js";
import MeatEater from "./creatures/meateater.js";
import Empty from "./creatures/empty.js";


// Liste von Listen. Enthält alle Kreaturen.
export const matrix = [];
// Größe der Matrix, Anzahl der Zellen in Breite und Höhe
export const matrixSize = 50;


// Wahrscheinlichkeit, mit der jede Kreatur erstellt wird
let creatureProbabilities = [
    [Grass, 0.25],       // Gras: 25% Wahrscheinlichkeit
    [GrassEater, 0.05],  // Grasfresser: 5% Wahrscheinlichkeit
    [MeatEater, 0.02],   // Fleischfresser: 2% Wahrscheinlichkeit
];

// Wählt basierend auf den Wahrscheinlichkeiten zufällig eine Kreatur aus
function getRandomCreature() {
    let rand = random(); // Zufallszahl zwischen 0 und 1
    let sum = 0;
    for (let i = 0; i < creatureProbabilities.length; i++) {
        let creatureClass = creatureProbabilities[i][0];
        let probability = creatureProbabilities[i][1];
        sum += probability; // Summiert die Wahrscheinlichkeiten
        if (rand < sum) {   // Wenn die Zufallszahl kleiner ist, wähle diese Kreatur
            return new creatureClass();
        }
    }
    return new Empty(); // Wenn keine andere Bedingung zutrifft, wird ein leeres Feld zurückgegeben
}

// Füllt die Matrix zufällig mit Kreaturen basierend auf den Wahrscheinlichkeiten
export function fillRandomMatrix() {
    //new!!!!
    matrix.splice(0, matrix.length); // Löscht die Matrix

    for (let row = 0; row < matrixSize; row++) {
        matrix.push([]);
        for (let col = 0; col < matrixSize; col++) {
            matrix[row][col] = getRandomCreature();
        }
    }
}
