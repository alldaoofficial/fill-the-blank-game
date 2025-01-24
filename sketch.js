let score = 0;
let startTime;
let items = [];
let leaderboard = [];
let showHighScore = false;
const MAX_LEADERBOARD_SIZE = 5; // Zeigt die Top 5 Scores an

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255); // Weißer Hintergrund
    startTime = millis();
    textSize(32);
    textAlign(CENTER, CENTER);
    
    // Ein Item alle 2 Sekunden hinzufügen
    frameRate(30);
    setInterval(addItem, 2000);
    
    // Leaderboard aus Local Storage laden
    if (localStorage.getItem('leaderboard')) {
        leaderboard = JSON.parse(localStorage.getItem('leaderboard'));
    }
}

function draw() {
    // Dünne schwarze Umrandung
    noFill();
    stroke(0);
    strokeWeight(2);
    rect(0, 0, width - 1, height - 1);
    
    background(255);
    
    // Score zurücksetzen, wenn Maus bewegt wird
    if (mouseX !== pmouseX || mouseY !== pmouseY) {
        saveScore();
        score = 0;
        startTime = millis();
        showHighScore = true;
    } else {
        score = (millis() - startTime) / 1000; // Punkte basieren auf vergangener Zeit
        showHighScore = false;
    }
    
    text('Score: ' + Math.floor(score), width/2, height/2 - 50);
    
    if (showHighScore) {
        displayLeaderboard();
    }
    
    // Items bewegen und zeichnen
    for (let i = items.length - 1; i >= 0; i--) {
        let item = items[i];
        item.y += item.speed;
        ellipse(item.x, item.y, item.size);
        
        // Item entfernen, wenn es den unteren Rand erreicht hat
        if (item.y > height) {
            items.splice(i, 1);
        }
    }
}

function mousePressed() {
    // Reset für den Fall, dass man das Spiel neu starten möchte
    score = 0;
    startTime = millis();
}

// Funktion, um ein neues Item hinzuzufügen
function addItem() {
    let size = random(10, 50);
    items.push({
        x: random(width),
        y: -size,
        size: size,
        speed: random(1, 5)
    });
}

// Funktion zum Speichern des Scores
function saveScore() {
    let newScore = Math.floor(score);
    leaderboard.push({ score: newScore, date: new Date().toLocaleString() });
    
    // Sortieren und nur die Top 5 behalten
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, MAX_LEADERBOARD_SIZE);
    
    // Leaderboard in Local Storage speichern
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

// Funktion zum Anzeigen des Leaderboards
function displayLeaderboard() {
    fill(0);
    textSize(20);
    text('Leaderboard:', width/2, height/2);
    
    for (let i = 0; i < leaderboard.length; i++) {
        text(`${i + 1}. Score: ${leaderboard[i].score} - ${leaderboard[i].date}`, width/2, height/2 + (i + 1) * 30);
    }
}