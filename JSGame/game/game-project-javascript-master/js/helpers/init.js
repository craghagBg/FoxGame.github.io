var app = app || {};

app.directions = {'up': 38, 'right': 39, 'down': 40, 'left': 37, stop: 0};

Function.prototype.extend = function(parent) {
    this.prototype = Object.create(parent.prototype);
    this.constructor = this;
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var loadcount = 0;
var loadtotal = 0;
var preloaded = false;

function loadImages(imagefiles) {

    loadcount = 0;
    loadtotal = imagefiles.length;
    preloaded = false;

    var loadedimages = [];
    for (var i=0; i<imagefiles.length; i++) {
        var image = new Image();

        image.onload = function () {
            loadcount++;
            if (loadcount == loadtotal) {
                preloaded = true;
            }
        };

        image.src = imagefiles[i];
        loadedimages[i] = image;
    }

    return loadedimages;
}

app.gameOverImages = loadImages(['imgs/gameOver.png']);
app.gameObstacles = loadImages(['imgs/bush.png']);
app.gameFood = loadImages(['imgs/grape.png']);
app.wolfImages = loadImages(['imgs/wolf.png']);
app.foxImages = loadImages([
    'imgs/fox.png',
    'imgs/fox125.png',
    'imgs/fox150.png',
    'imgs/fox175.png',
    'imgs/fox200.png']);