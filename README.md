# SummerCamp p5.js & ml5.js Projekte

Dieses Projekt enthält mehrere kleine Beispiele, mit denen man p5.js und ml5.js auf spielerische Weise kennenlernen kann. Im Mittelpunkt stehen Webcam-Erkennung mit Machine Learning, einfache Interaktion mit Canvas und ein kleines Snake-Spiel.

## Was ist enthalten?

### 1. Webcam-Bildklassifizierung
Ein p5.js-Sketch nutzt die Webcam und ein Teachable-Machine-Modell, um Bilder in Echtzeit zu klassifizieren.

Dabei wird gezeigt:
- wie man die Webcam mit p5.js einbindet
- wie man ein ml5.js-Modell verwendet
- wie man Vorhersagen im Canvas anzeigt

### 2. Snake Game
Ein zweites Beispiel ist ein kleines Snake-Spiel, das mit p5.js umgesetzt wurde.

Dabei wird gezeigt:
- wie man ein Spiel mit einem Raster aufbaut
- wie man Tastatureingaben verarbeitet
- wie man Kollisionen, Punkte und Spiellogik umsetzt

### 3. Bildanzeige basierend auf ML-Vorhersagen
Ein drittes Canvas zeigt ein Bild, das von der erkannten ML-Klasse abhängt.

Dabei wird gezeigt:
- wie man ML-Vorhersagen weiterverwendet
- wie man Bilder abhängig von einem Label lädt
- wie man lokale Assets im Projekt nutzt

## Was lernt man dabei?

Mit diesem Projekt lernt man unter anderem:

- p5.js im Instance Mode zu verwenden
- mehrere Sketches auf einer Seite zu starten
- die Webcam im Browser einzubinden
- ml5.js und Teachable Machine zu nutzen
- Vorhersagen aus Machine Learning in ein UI zu übertragen
- einfache Spielmechaniken mit Rasterlogik zu bauen
- Canvas, HTML und CSS zusammen zu kombinieren
- wiederverwendbare Hilfsfunktionen zu schreiben
- Benutzeroberfläche und Logik voneinander zu trennen

## Projektstruktur

- `p5-image-classification-basic/` - Webcam-Klassifizierung mit ml5.js
- `p5-snake-game/` - Snake-Spiel mit p5.js
- `assets/` - lokale Bilder für das dritte Canvas

## Lokaler Start

Öffne die jeweilige `index.html` im Browser oder starte das Projekt über VS Code Live Server.

Wenn du die Bilder für das dritte Canvas verwendest, müssen die Dateien im Ordner `assets` liegen und korrekt benannt sein.

## Ressourcen

- [p5.js](https://p5js.org/)
- [ml5.js](https://ml5js.org/)
- [Teachable Machine](https://teachablemachine.withgoogle.com/)
- [Snake Game Tutorial](https://p5js.org/examples/Games-Snake/)
- [p5js examples](https://p5js.org/examples/)
- [JS Cheat Sheet](https://www.git-tower.com/learn/cheat-sheets/javascript)


## Ziel des Projekts

Das Projekt eignet sich gut für einen Einstieg in:
- kreative Programmierung
- visuelle Interaktion
- Machine Learning im Browser
- einfache Spielentwicklung mit p5.js

## Weitere Ideen


### Reaction Game (Reflex-Spiel)

* Symbol erscheint (z. B. Pfeil links/rechts)
* Spieler zeigt passende Geste
* Punkte bei richtigen Matches, Zeitdruck optional

### Emoji Face Mapper

* Gesten werden direkt auf Emojis/Bilder gemappt
* Overlay ersetzt oder ergänzt dein Gesicht
* Optional: weiche Übergänge zwischen Zuständen


### Mood Background Generator

* Geste ändert Hintergrund + visuelle Effekte
  * ruhig → sanfte Farben
  * aktiv → Partikel, Bewegung

### Dodge Game

* Spieler bewegt sich per Geste (links/rechts)
* Hindernissen ausweichen
* Geschwindigkeit nimmt zu

### Endless Runner

* Springen per Geste
* Hindernisse überspringen
* Score steigt kontinuierlich

### Gesture Menü

* Navigation komplett per Gesten
* links/rechts → Auswahl
* Geste → bestätigen
