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

    GameView.prototype.drawHero = function drawHero(color, subject){
        app.ctx.fillStyle = color;
        app.ctx.fillRect(
            subject.getX(),
            subject.getY(),
            subject.getWidth(),
            subject.getHeight());
    };

    GameView.prototype.drawRock = function drawRock(color, object){
        app.ctx.fillStyle = color;
        app.ctx.fillRect(
            object.getX(),
            object.getY(),
            object.getWidth(),
            object.getHeight());
    };

    GameView.prototype.clearAllLevel = function clearAllLevel(){
        app.ctx.clearRect(0, 0, app.canvas.width(), app.canvas.height());
    };

    GameView.prototype.clearHero = function clearHero(color, subject){
        this.drawHero(color, subject);
    };

    app.gameView = GameView;
}(app));
