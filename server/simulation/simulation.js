import { matrix, fillRandomMatrix, matrixSize } from './initialization.js';
import Empty from './creatures/empty.js';
import { frameCount, incrementFrameCount } from './utils.js';

const colorMap = {
    black: "\x1b[30m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    red: "\x1b[31m",
    pink: "\x1b[35m",
    reset: "\x1b[0m",
};

let currentColor = colorMap.black;

let enableConsoleOutput = false;

// Initialisiert die Zeichenfläche und füllt die Matrix mit Kreaturen
// Wird einmal beim Start aufgerufen
export function setup() {
    //createCanvas(matrixSize * blockSize, matrixSize * blockSize); // Zeichenfläche erstellen
    fillRandomMatrix(); // Matrix zufällig füllen
    //noStroke(); // Keine Umrandungen für Rechtecke
    //frameRate(30); // Bildrate auf 30 Frame pro Sekunde setzen
}

// Spielschleife. Wird in jedem Frame aufgerufen
// Zeichnet die Matrix und aktualisiert die Kreaturen
export function draw() {
    //background(200); // Hintergrundfarbe festlegen
    for (let row = 0; row < matrixSize; row++) {
        for (let col = 0; col < matrixSize; col++) {
            let obj = matrix[row][col]; // Objekt an der aktuellen Position

            // Leere Zellen überspringen
            if (obj instanceof Empty) {
                print(' ');
                continue;
            }

            // Zeile und Spalte der Kreatur setzen
            obj.row = row;
            obj.col = col;

            // Verhindert, dass neu erstellte Kreaturen im gleichen Schritt aktualisiert werden
            // und dass Kreaturen, die sich bewegen, mehrfach in einem Frame aktualisiert werden
            if (obj.stepCount === frameCount) {

                obj.step(); // Kreatur führen ihren Schritt aus
                obj.stepCount++;
            }

            // Kreatur zeichnen
            fill(obj.color); // Farbe der Kreatur setzen
            rect(); // Rechteck zeichnen
        }
        // new line
        print('\n');
    }

    // move cursor up height of matrix lines
    print('\x1b[' + matrixSize + 'A');
    incrementFrameCount(); // Frame-Zähler erhöhen
}


function print(text) {
    if (enableConsoleOutput) {
        process.stdout.write(text);
    }
}



function fill(color) {
    if (color === undefined) color = colorMap.black;
    print(colorMap.reset);
    currentColor = colorMap[color];
    print(currentColor);
}

function rect() {
    print('X');
}