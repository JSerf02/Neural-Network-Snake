var up = 1;
var left = 2;
var down = 3;
var right = 4;
var direction = down;

var upKey = 38
var leftKey = 37;
var downKey = 40;
var rightKey = 39;

var score = 0;
var highScore = 0;
var bobScore = 0;

var extend = 0;
var speed = 20;
var a;

var noFruit = false;
var turnCount = 0;
var prevDirection = direction;

var aiVar = 0;

var aiPlay = false;
var gameSpeed = 71;

var start = false;
var button1 = document.getElementById("button1");
var button2 = document.getElementById("button2");
var title = document.getElementById("title");
var slider = document.getElementById("slider");
var speedLabel = document.getElementById("speedLabel");
var instructionLabel = document.getElementById("instructionLabel");
var elements = [button1, button2, title, slider, speedLabel,  instructionLabel];
