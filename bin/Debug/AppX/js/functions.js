//Rectangular collision (checks if two rectangles are overlapping)
//Collision function code from www.w3schools.com
function collision(rect1, rect2) {
    if (rect1.x + rect1.width > rect2.x &&
        rect1.x < rect2.x + rect2.width &&
        rect2.y + rect2.height > rect1.y &&
        rect2.y < rect1.y + rect1.height) {
        return true;
    } else {
        return false;
    }
}

//Draws all of the walls, the fruits, and the snake on the canvas
function drawAll() {
    if (start) {
        updateScore();
        if (aiPlay) {
            activateAISnake();
        }
        if (direction != 0) {
            snake.update();
        }
    }
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let i = 0; i < walls.length; i++) {
        walls[i].draw();
    }
    if (start) {
        fruits[0].draw();
        snake.draw();
    }
}

//Changes the score text at the top of the screen
function updateScore() {
    document.getElementById("score").innerHTML = "Score: " + score + "      Highscore: " + highScore + "      Bob's Highscore: " + bobScore;

}
//Generates a random number between min and max
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//Keyboard Input
document.addEventListener("keydown", function (event) { keyPress(event); });
function keyPress(event) {
    if (event.keyCode == upKey) {
        if (direction == 0 || direction % 2 == 0) {
            direction = up;
        }
    }
    else if (event.keyCode == downKey) {
        if (direction == 0 || direction % 2 == 0) {
            direction = down;
        }
    }
    if (event.keyCode == leftKey) {
        if (direction == 0 || direction % 2 == 1) {
            direction = left;
        }
    }
    else if (event.keyCode == rightKey) {
        if (direction == 0 || direction % 2 == 1) {
            direction = right;
        }
    }
}

//Resets the game and resizes everything when the canvas is resized
function resize() {
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);
    walls = [new Wall(0, 0, 25, canvas.height), new Wall(0, 0, window.innerWidth, 25), new Wall(0, window.innerHeight - 25, window.innerWidth, 25), new Wall(window.innerWidth - 25, 0, 25, window.innerHeight)];
    if (start) {
        snake.die();
    }

}
window.onresize = resize;

function startGame(aiPlaying) {
    start = true;
    if (aiPlaying) {
        aiPlay = true;
    }
    else {
        aiPlay = false;
    }
    gameSpeed = slider.value;
    for (element of elements) {
        element.style.display = "none";
    }
    clearInterval(interval);
    intervalBegin();
}


button1.addEventListener("click", function() {
    startGame(false);
});
button2.addEventListener("click", function () {
    startGame(true);
});


