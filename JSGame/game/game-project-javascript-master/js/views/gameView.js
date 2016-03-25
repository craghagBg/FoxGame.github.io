var app = app || {};

(function(app){
    function GameView(){}

    GameView.prototype.generateField = function () {
        app.canvas = $('#canvas');
        app.ctx = canvas.getContext("2d");

        $('#start').on('click', function(){
            var start = document.createEvent('Event');
            start.initEvent('start', true, true);
            document.dispatchEvent(start);
        });

        $('#stop').on('click', function(){
            var stop = document.createEvent('Event');
            stop.initEvent('stop', true, true);
            document.dispatchEvent(stop);
        });
    };

    GameView.prototype.drawHero = function drawHero(subject, color){
        if (color){
            app.ctx.fillStyle = color;
            app.ctx.fillRect(
                subject.getX(),
                subject.getY(),
                subject.getWidth(),
                subject.getHeight());
        }else{
            image(subject.getX(), subject.getY(), 'imgs/singleFox.png');
        }
    };

    GameView.prototype.drawRock = function drawRock(object){
        image(object.getX(), object.getY(), 'imgs/smallRock.png');
    };

    GameView.prototype.clearAllLevel = function clearAllLevel(){
        app.ctx.clearRect(0, 0, app.canvas.width(), app.canvas.height());
    };

    GameView.prototype.clearHero = function clearHero(subject, color){
        this.drawHero(subject, color);
    };

    var image = function(x, y, path){
        var img = new Image();
        img.src = path;
        img.onload = function(){
            app.ctx.drawImage(img, x, y);
        };
    };

    app.gameView = GameView;
}(app));
