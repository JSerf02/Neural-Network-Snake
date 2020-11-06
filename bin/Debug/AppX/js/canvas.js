//Sets up canvas where the whole program will be drawn
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.setAttribute('width', window.innerWidth);
canvas.setAttribute('height', window.innerHeight);
ctx.imageSmoothingEnabled = false;