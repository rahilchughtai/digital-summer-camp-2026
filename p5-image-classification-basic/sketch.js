let classifier;
let video;
let flippedVideo;
let label = '';

/**
 * DSC 2026 Hier müsst ihr die URL zu eurem eigenen Teachable Machine-Modell anpassen.
 */
const imageModelURL =
    'https://teachablemachine.withgoogle.com/models/oyQ0iCZUG/';

const videoSketch = (p) => {
    p.preload = () => {
        classifier = ml5.imageClassifier(imageModelURL + 'model.json');
    };

    p.setup = () => {
        ml5.p5Utils.setP5Instance(p);
        const videoCanvas = p.createCanvas(320, 260);
        videoCanvas.parent('canvas-container');
        video = p.createCapture(p.VIDEO);
        video.size(320, 240);
        video.hide();

        flippedVideo = ml5.flipImage(video);
        classifyVideo();
    };

    p.draw = () => {
        p.background(0);
        p.image(flippedVideo, 0, 0);

        p.fill(255);
        p.textSize(16);
        p.textAlign(p.CENTER);
        p.text(label, p.width / 2, p.height - 4);
    };
};

function classifyVideo() {
    /**
     * DSC 2026 Ihr könnt hier entscheiden, ob ihr das Video spiegeln wollt oder nicht. Wenn ihr das Video nicht spiegeln wollt, könnt ihr die Zeile mit flippedVideo entfernen und stattdessen video direkt an classifier.classify übergeben.
     */
    flippedVideo = ml5.flipImage(video);
    classifier.classify(flippedVideo, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
        return;
    }
    label = results[0].label;
    classifyVideo();
}

let videoSketchInstance = new p5(videoSketch);

/**
 * DSC 2026 Hir könnt ihr euch Inspiration für eure eigenen Ideen holen.
 * Eines der Beispiele ist ein Snake-Spiel, das auf den ML-Labels basiert.
 * Das zweite Beispiel zeigt, wie ihr ein Bild basierend auf den ML-Labels anzeigen könnt.
 * Ihr könnt diese Beispiele als Ausgangspunkt verwenden und sie anpassen, um eure eigenen kreativen Ideen umzusetzen, oder das bestehende Projekt erweitern.
 */

const snakeSketch = (p) => {
    const GRID_WIDTH = 30;
    const GRID_HEIGHT = 30;
    const CELL_SIZE = 16;
    let gameStarted = false;
    const STARTING_SEGMENTS = 2;
    const X_START = 0;
    const Y_START = 15;
    const START_DIRECTION = 'right';
    let direction = START_DIRECTION;
    let segments = [];
    let score = 0;
    let highScore;
    let fruit;

    const oppositeDirection = {
        up: 'down',
        down: 'up',
        left: 'right',
        right: 'left',
    };

    function applyDirectionChange(nextDirection) {
        if (!nextDirection || nextDirection === direction) {
            return;
        }
        if (oppositeDirection[nextDirection] === direction) {
            return;
        }
        direction = nextDirection;
    }

    function labelToDirection(label) {
        /**
         * DSC 2026 Hier müsst ihr die Labels anpassen, die ihr in eurem Teachable Machine-Modell verwendet habt.
         * Ihr müsst eure Labels auf der linken Seite in der Mapping-Variable eintragen, damit sie in die Richtung des Snake-Spiels übersetzt werden können.
         */
        const normalized =
            typeof label === 'string' ? label.trim().toLowerCase() : '';
        const mapping = {
            up: 'up',
            down: 'down',
            left: 'left',
            right: 'right',
        };
        return mapping[normalized] || null;
    }

    p.setup = () => {
        p.fill(255);
        const snakeCanvas = p.createCanvas(
            GRID_WIDTH * CELL_SIZE,
            GRID_HEIGHT * CELL_SIZE,
        );
        snakeCanvas.parent('canvas-container');

        // DSC 2026 Hier könnt ihr die Framerate des Snake-Spiels anpassen. Je höher die Zahl, desto schneller wird das Spiel.
        p.frameRate(6);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(2);

        // Check for saved high score in local browser storage
        // If no score has been stored, this will be undefined
        highScore = p.getItem('high score');
    };
    p.draw = () => {
        p.background(0);
        p.scale(CELL_SIZE);

        if (!gameStarted) {
            showStartScreen();
            return;
        }

        updateDirectionWithMachineLearning();
        showGrid();
        showFruit();
        showSegments();
        updateSegments();
        checkForCollision();
        checkForFruit();
    };

    function updateDirectionWithMachineLearning() {
        applyDirectionChange(labelToDirection(label));
    }

    // Helper functions
    function showStartScreen() {
        p.noStroke();
        p.fill(32);
        p.rect(2, GRID_HEIGHT / 2 - 5, GRID_WIDTH - 4, 10, 2);
        p.fill(255);
        p.text('Kicke zum Starten.', GRID_WIDTH / 2, GRID_HEIGHT / 2);
        p.noLoop();
    }

    p.mousePressed = () => {
        if (gameStarted === false) {
            startGame();
        }
    };

    function startGame() {
        // Put the fruit in a random place
        updateFruitCoordinates();

        // Start with an empty array for segments
        segments = [];

        // Start with x at the starting position and repeat until specified
        // number of segments have been created, increasing x by 1 each time
        for (let x = X_START; x < X_START + STARTING_SEGMENTS; x += 1) {
            // Create a new vector at the current position
            let segmentPosition = p.createVector(x, Y_START);

            // Add it to the beginning of the array
            segments.unshift(segmentPosition);
        }

        direction = START_DIRECTION;
        score = 0;
        gameStarted = true;
        p.loop();
    }

    function showGrid() {
        p.stroke(255, 255, 255, 35);
        p.strokeWeight(1 / CELL_SIZE);
        for (let x = 0; x <= GRID_WIDTH; x += 1) {
            p.line(x, 0, x, GRID_HEIGHT);
        }
        for (let y = 0; y <= GRID_HEIGHT; y += 1) {
            p.line(0, y, GRID_WIDTH, y);
        }
    }

    function showFruit() {
        p.noStroke();
        p.fill(255, 64, 32);
        p.square(fruit.x, fruit.y, 1);
    }

    function showSegments() {
        p.noStroke();
        p.fill(96, 255, 64);
        for (let segment of segments) {
            p.square(segment.x, segment.y, 1);
        }
    }

    function updateSegments() {
        // Remove last segment
        segments.pop();

        // Copy current head of snake
        let head = segments[0].copy();

        // Insert the new snake head at the beginning of the array
        segments.unshift(head);

        // Adjust the head's position based on the current direction
        switch (direction) {
            case 'right':
                head.x = head.x + 1;
                break;
            case 'up':
                head.y = head.y - 1;
                break;
            case 'left':
                head.x = head.x - 1;
                break;
            case 'down':
                head.y = head.y + 1;
                break;
        }
    }

    function checkForCollision() {
        // Store first segment in array as head
        let head = segments[0];

        // If snake's head...
        if (
            // hit right edge or
            head.x >= GRID_WIDTH ||
            // hit left edge or
            head.x < 0 ||
            // hit bottom edge or
            head.y >= GRID_HEIGHT ||
            // hit top edge or
            head.y < 0 ||
            // collided with itself
            selfColliding() === true
        ) {
            // show game over screen
            gameOver();
        }
    }

    function gameOver() {
        p.noStroke();
        p.fill(32);
        p.rect(2, GRID_HEIGHT / 2 - 5, GRID_WIDTH - 4, 12, 2);
        p.fill(255);

        // Set high score to whichever is larger: current score or previous
        // high score
        highScore = p.max(score, highScore || 0);

        // Put high score in local storage. This will be be stored in browser
        // data, even after the user reloads the page.
        p.storeItem('high score', highScore);
        p.text(
            `Game over! \nYour score: ${score} \nHigh score: ${highScore} \nClick to play again.`,
            GRID_WIDTH / 2,
            GRID_HEIGHT / 2,
        );
        gameStarted = false;
        p.noLoop();
    }

    function selfColliding() {
        // Store the last segment as head
        let head = segments[0];

        // Store every segment except the first
        let segmentsAfterHead = segments.slice(1);

        // Check each of the other segments
        for (let segment of segmentsAfterHead) {
            // If segment is in the same place as head
            if (segment.equals(head) === true) {
                return true;
            }
        }
        return false;
    }

    function checkForFruit() {
        // Store first segment as head
        let head = segments[0];

        // If the head segment is in the same place as the fruit
        if (head.equals(fruit) === true) {
            // Give player a point
            score = score + 1;

            // Duplicate the tail segment
            let tail = segments[segments.length - 1];
            let newSegment = tail.copy();

            // Put the duplicate in the beginning of the array
            segments.push(newSegment);

            // Reset fruit to a new location
            updateFruitCoordinates();
        }
    }

    function updateFruitCoordinates() {
        let x = p.floor(p.random(GRID_WIDTH));
        let y = p.floor(p.random(GRID_HEIGHT));
        fruit = p.createVector(x, y);
    }

    p.keyPressed = () => {
        let nextDirection = null;
        switch (p.keyCode) {
            case p.LEFT_ARROW:
                nextDirection = 'left';
                break;
            case p.RIGHT_ARROW:
                nextDirection = 'right';
                break;
            case p.UP_ARROW:
                nextDirection = 'up';
                break;
            case p.DOWN_ARROW:
                nextDirection = 'down';
                break;
        }

        applyDirectionChange(nextDirection);
    };
};
// DSC 2026 ihr könnt die folgende Zeile unkommentieren, um das Snake-Spiel zu aktivieren und es basierend auf den ML-Labels zu steuern.
// let snakeSketchInstance = new p5(snakeSketch);

/* DSC 2026 Beispiel 2: Image Canvas basierend auf ML-Label */
const predictionImageSketch = (p) => {
    const CANVAS_WIDTH = 320;
    const CANVAS_HEIGHT = 240;

    /**
     * DSC 2026 Hier müsst ihr die Pfade zu euren eigenen Bildern anpassen.
     * Ihr könnt entweder die Bilder in den assets-Ordner legen oder Pfade aus dem Internet verwenden.
     */
    const imageMap = {
        up: '../assets/pic1.jpg',
        left: '../assets/pic2.jpg',
        right: '../assets/pic3.jpg',
        down: '../assets/pic4.jpg',
    };

    const imageCache = {};
    let currentLabelKey = '';
    let currentImage = null;
    let loading = false;

    p.setup = () => {
        const predictionCanvas = p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
        predictionCanvas.parent('canvas-container');
        currentImage = null;
    };

    p.draw = () => {
        p.background(20);
        const normalizedLabel =
            typeof label === 'string' ? label.trim().toLowerCase() : '';
        const labelKey = imageMap[normalizedLabel]
            ? normalizedLabel
            : 'default';

        if (labelKey !== currentLabelKey) {
            currentLabelKey = labelKey;
            loadImageForLabel(labelKey);
        }

        if (currentImage) {
            p.image(currentImage, 0, 0, p.width, p.height);
        } else {
            p.noStroke();
            p.fill(40);
            p.rect(0, 0, p.width, p.height);
            p.fill(220);
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(14);
            p.text(
                loading ? 'Loading image...' : 'No image',
                p.width / 2,
                p.height / 2,
            );
        }
    };

    function loadImageForLabel(labelKey) {
        if (imageCache[labelKey]) {
            currentImage = imageCache[labelKey];
            loading = false;
            return;
        }

        loading = true;
        const imageUrl = imageMap[labelKey] || imageMap.default;
        p.loadImage(
            imageUrl,
            (img) => {
                imageCache[labelKey] = img;
                currentImage = img;
                loading = false;
            },
            () => {
                // If a mapped image fails, try to load and show fallback.
                const fallbackUrl = imageMap.default;
                if (labelKey === 'default') {
                    loading = false;
                    return;
                }

                p.loadImage(
                    fallbackUrl,
                    (fallbackImg) => {
                        imageCache.default = fallbackImg;
                        currentImage = fallbackImg;
                        loading = false;
                    },
                    () => {
                        loading = false;
                    },
                );
            },
        );
    }
};
// DSC 2026 ihr könnt die folgende Zeile unkommentieren, um das Beispiel 2 zu aktivieren und die Bilder basierend auf den ML-Labels anzuzeigen.
// let imagePredictionInstance = new p5(predictionImageSketch);
