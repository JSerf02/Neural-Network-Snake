const ai = new brain.NeuralNetwork({ hiddenLayers: [15] });
/*AI Design:
 * Have the snake move forward whenever the fruit is still in front of its head.
 * If the fruit is no longer in front of him, turn to the side of the snake the fruit is located.
 * While doing this, prioritise staying alive by turning whenever something is in front of the snake and not turning in an unsafe direction.
 * 
 * Format:
 * 1 is yes and 0 is no
 * l = is it safe to turn left
 * u = is it safe to move forward
 * r = is it safe to turn right
 * ff = is the no longer in front of the snake
 * fl = is the fruit to the left
 * fr = is the fruit to the right
 * input[l, u, r, ff, fl fr]
 * 
 * if dir == 0 turn left
 * if dir == 0.5 move forward
 * if dir == 1 turn right
 * output[dir]
 * */
const trainingData = [
    { input: [0, 0, 0, 0, 0, 0], output: [0.5] },
    { input: [0, 0, 0, 0, 1, 0], output: [0.5] },
    { input: [0, 0, 0, 0, 0, 1], output: [0.5] },
    { input: [0, 0, 0, 0, 1, 1], output: [0.5] },

    { input: [0, 0, 0, 1, 0, 0], output: [0] }, //This one could be either left or right so its best to let the computer decide
    { input: [0, 0, 0, 1, 0, 1], output: [1] },
    { input: [0, 0, 0, 1, 1, 0], output: [0] },
    { input: [0, 0, 0, 1, 1, 1], output: [1] },

    { input: [0, 0, 1, 0, 0, 0], output: [0.5] },
    { input: [0, 0, 1, 0, 1, 0], output: [0.5] },
    { input: [0, 0, 1, 0, 0, 1], output: [0.5] },
    { input: [0, 0, 1, 0, 1, 1], output: [0.5] },

    { input: [0, 0, 1, 1, 0, 0], output: [0] },
    { input: [0, 0, 1, 1, 1, 0], output: [0] },
    { input: [0, 0, 1, 1, 0, 1], output: [0] },
    { input: [0, 0, 1, 1, 1, 1], output: [0] },

    { input: [0, 1, 0, 0, 0, 0], output: [1] },
    { input: [0, 1, 0, 0, 1, 0], output: [0] },
    { input: [0, 1, 0, 0, 0, 1], output: [1] },
    { input: [0, 1, 0, 0, 1, 1], output: [1] },

    { input: [0, 1, 0, 1, 0, 0], output: [0] },
    { input: [0, 1, 0, 1, 1, 0], output: [0] },
    { input: [0, 1, 0, 1, 0, 1], output: [1] },
    { input: [0, 1, 0, 1, 1, 1], output: [1] },

    { input: [1, 0, 0, 0, 0, 0], output: [0.5] },
    { input: [1, 0, 0, 0, 1, 0], output: [0.5] },
    { input: [1, 0, 0, 0, 0, 1], output: [0.5] },
    { input: [1, 0, 0, 0, 1, 1], output: [0.5] },

    { input: [1, 0, 0, 1, 0, 0], output: [1] },
    { input: [1, 0, 0, 1, 1, 0], output: [1] },
    { input: [1, 0, 0, 1, 0, 1], output: [1] },
    { input: [1, 0, 0, 1, 1, 1], output: [1] },

    { input: [0, 1, 1, 0, 0, 0], output: [0] },
    { input: [0, 1, 1, 0, 1, 0], output: [0] },
    { input: [0, 1, 1, 0, 0, 1], output: [0] },
    { input: [0, 1, 1, 0, 1, 1], output: [0] },

    { input: [0, 1, 1, 1, 0, 0], output: [0] },
    { input: [0, 1, 1, 1, 1, 0], output: [0] },
    { input: [0, 1, 1, 1, 0, 1], output: [0] },
    { input: [0, 1, 1, 1, 1, 1], output: [0] },

    { input: [1, 1, 0, 0, 0, 0], output: [1] },
    { input: [1, 1, 0, 0, 1, 0], output: [1] },
    { input: [1, 1, 0, 0, 0, 1], output: [1] },
    { input: [1, 1, 0, 0, 1, 1], output: [1] },

    { input: [1, 1, 0, 1, 0, 0], output: [1] },
    { input: [1, 1, 0, 1, 1, 0], output: [1] },
    { input: [1, 1, 0, 1, 0, 1], output: [1] },
    { input: [1, 1, 0, 1, 1, 1], output: [1] },

    { input: [1, 0, 1, 0, 0, 0], output: [0.5] },
    { input: [1, 0, 1, 0, 1, 0], output: [0.5] },
    { input: [1, 0, 1, 0, 0, 1], output: [0.5] },
    { input: [1, 0, 1, 0, 1, 1], output: [0.5] },

    { input: [1, 0, 1, 1, 0, 0], output: [0.5] },
    { input: [1, 0, 1, 1, 1, 0], output: [0.5] },
    { input: [1, 0, 1, 1, 0, 1], output: [0.5] },
    { input: [1, 0, 1, 1, 1, 1], output: [0.5] },
];

ai.train(trainingData, {
    log: (error) => console.log(error),
});

function callAI(l, u, r, ff, fl, fr) {
    let returnVar = ai.run([l, u, r, ff, fl, fr]);
    return returnVar;
}

function callAISnake() {
    let l = leftTurn();
    l = checkFutureCollision(l);
    let r = rightTurn();
    r = checkFutureCollision(r);
    let u = forward();
    u = checkFutureCollision(u);
    let arr = checkFruit(direction);
    let ff = arr[0];
    let fl = arr[1];
    let fr = arr[2];

    let returnVar = callAI(l, u, r, ff, fl, fr);
    return returnVar;
}

function activateAISnake() {
    aiVar = callAISnake();
    aiVar *= 2;
    if (aiVar < 0.5) {
        direction = leftTurn();
    }
    else if (aiVar > 1.5) {
        direction = rightTurn();
    }
    else {
        direction = forward();
    }
}


function forward() {
    return direction;
}

function rightTurn() {
    let returnVar = direction - 1;
    if (returnVar == 0) {
        returnVar = 4;
    }
    return returnVar;
}

function leftTurn() {
    let returnVar = direction + 1;
    if (returnVar == 5) {
        returnVar = 1;
    }
    return returnVar;
}

function checkFutureCollision(dir) {
    let a = new Wall(snake.x, snake.y, snake.width, snake.height);
    if (dir == up) {
        a.y -= 20;
    }
    else if (dir == left) {
        a.x -= 20;
    }
    else if (dir == down) {
        a.y += 20;
    }
    else if (dir == right) {
        a.x += 20;
    }
    let returnVar = 0;
    for (const wall in walls) {
        let c = collision(a, walls[wall]);
        if (c == true) {
            returnVar = 1;
            break;
        }
    }

    for (let i = 1; i < snake.body.length; i++) {
        let c = new Wall(snake.body[i][0], snake.body[i][1], 20, 20);
        //a = new Wall(snake.body[0][0], snake.body[0][1], 20, 20);
        let d = collision(a, c);
        if (d == true) {
            returnVar = 1;
            break;
        }
    }
    return returnVar;
}

function checkFruit(dir) {
    returnArr = [];
    if (dir == up) {
        if (fruits[0].y < snake.y) {
            returnArr.push(0);
        }
        else {
            returnArr.push(1);
        }
        if (fruits[0].x < snake.x) {
            returnArr.push(1);
            returnArr.push(0);
        }
        else if (fruits[0].x > snake.x) {
            returnArr.push(0);
            returnArr.push(1);
        }
        else {
            returnArr.push(0);
            returnArr.push(0);
        }
    }
    else if (dir == left) {
        if (fruits[0].x < snake.x) {
            returnArr.push(0);
        }
        else {
            returnArr.push(1);
        }
        if (fruits[0].y > snake.y) {
            returnArr.push(1);
            returnArr.push(0);
        }
        else if (fruits[0].y < snake.y) {
            returnArr.push(0);
            returnArr.push(1);
        }
        else {
            returnArr.push(0);
            returnArr.push(0);
        }
    }
    else if (dir == down) {
        if (fruits[0].y > snake.y) {
            returnArr.push(0);
        }
        else {
            returnArr.push(1);
        }
        if (fruits[0].x > snake.x) {
            returnArr.push(1);
            returnArr.push(0);
        }
        else if (fruits[0].x < snake.x) {
            returnArr.push(0);
            returnArr.push(1);
        }
        else {
            returnArr.push(0);
            returnArr.push(0);
        }
    }
    else if (dir == right) {
        if (fruits[0].x > snake.x) {
            returnArr.push(0);
        }
        else {
            returnArr.push(1);
        }
        if (fruits[0].y < snake.y) {
            returnArr.push(1);
            returnArr.push(0);
        }
        else if (fruits[0].y > snake.y) {
            returnArr.push(0);
            returnArr.push(1);
        }
        else {
            returnArr.push(0);
            returnArr.push(0);
        }
    }
    return returnArr;
}

