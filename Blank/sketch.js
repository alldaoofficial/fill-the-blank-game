let score = 0;
let highScore = 0;
let startTime;
let items = [];
let resetAnimation = false;
let showHighScore = false;
let isMouseInCanvas = true; // Neue Variable zur Überprüfung, ob die Maus im Canvas ist

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255); // Weißer Hintergrund
    startTime = millis();
    textSize(32);
    textAlign(CENTER, CENTER);
    
    // Ein Item alle 2 Sekunden hinzufügen
    frameRate(30);
    setInterval(addItem, 2000);
}

function draw() {
    // Dünne schwarze Umrandung
    noFill();
    stroke(0);
    strokeWeight(2);
    rect(0, 0, width - 1, height - 1);
    
    background(255);
    
    // Slogan hinzufügen
    textSize(24);
    fill(0);
    text("Simple is the new Complex, we call it Simplex", width/2, 50);
    
    // Überprüfen, ob die Maus im Canvas ist
    isMouseInCanvas = (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height);
    
    // Score zurücksetzen, wenn Maus bewegt wird oder den Canvas verlässt
    if (!isMouseInCanvas || (mouseX !== pmouseX || mouseY !== pmouseY)) {
        if (score > highScore) {
            highScore = score;
        }
        score = 0;
        startTime = millis();
        showHighScore = true;
        resetAnimation = true;
    } else {
        if (isMouseInCanvas) {
            score = (millis() - startTime) / 1000; // Punkte basieren auf vergangener Zeit, nur wenn Maus im Canvas ist
        }
        showHighScore = false;
    }
    
    textSize(32); // Zurücksetzen der Textgröße für den Score
    text('Score: ' + Math.floor(score), width/2, height/2 - 50);
    
    if (showHighScore) {
        fill(0); // Schwarz für Text
        textSize(20);
        text('High Score: ' + Math.floor(highScore), width/2, height/2 + 40);
    }
    
    if (resetAnimation) {
        fill(255, 0, 0); // Roter Text für Reset-Hinweis
        textSize(40);
        text("RESET!", width/2, height/2 - 100);
        resetAnimation = false;
    }
    
    // Spielregeln
    fill(0); // Schwarzer Text
    textSize(16);
    textStyle(NORMAL);
    text("Rules:\n- Do nothing, collect points.\n- Move the mouse, lose points.\n- Ignore all.", width/2, height - 100);

    // Items bewegen und zeichnen
    for (let i = items.length - 1; i >= 0; i--) {
        let item = items[i];
        item.y += item.speed;
        // Einfache Animation durch Änderung der Größe
        let size = item.size + sin(frameCount * 0.1) * 2;
        
        // Schatten für die Items
        drawingContext.shadowColor = 'rgba(0,0,0,0.2)';
        drawingContext.shadowBlur = 10;
        drawingContext.shadowOffsetY = 5;
        
        fill(item.color); // Setze die Farbe des Items
        ellipse(item.x, item.y, size);
        
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
        speed: random(1, 5),
        color: color(random(255), random(255), random(255))
    });
}