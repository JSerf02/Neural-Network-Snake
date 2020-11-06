var walls = [new Wall(0, 0, 25, window.innerHeight), new Wall(0, 0, window.innerWidth, 25), new Wall(0, window.innerHeight - 25, window.innerWidth, 25), new Wall(window.innerWidth - 25, 0, 25, window.innerHeight)];
var fruits = [new Fruit(randomNumber(2, (window.innerWidth - 40) / 20) * 20, randomNumber(2, (window.innerHeight - 40) / 20) * 20)];
var snake = new Snake(40, 40);

//Storing the setInterval function inside a variable so the interval can be cleared and restarted later in the code allowing the game can run at different speeds
var interval;
function intervalBegin() {
    interval = setInterval(drawAll, 71 - gameSpeed);
}
start = true;
intervalBegin();
start = false;

