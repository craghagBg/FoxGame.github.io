var app = app || {};

(function(app){
    function GameView() {
        this.lastHeroDirection = 0;
        this.heroImage = (function (){
            var img = new Image();
            img.src = 'imgs/foxes.png';
            return img;
        })();
    }

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

    GameView.prototype.drawHero = function drawHero(subject, counter){
        var imageDirection;
        switch (subject.direction){
            case 37 : imageDirection = 1; break;
            case 38 : imageDirection = 3; break;
            case 39 : imageDirection = 2; break;
            case 40 : imageDirection = 0; break;
            case 0 : imageDirection = this.lastHeroDirection; break;
        }

        this.lastHeroDirection = imageDirection;
        this.heroImage.onload = app.ctx.drawImage(
            this.heroImage,
            Math.floor(counter / 10) * 48,
            imageDirection * 48,
            48,
            48,
            subject.getX(),
            subject.getY(),
            48,
            48
        );
    };

    GameView.prototype.drawRock = function drawRock(object){
        var img = new Image();
        img.src = 'imgs/smallRock.png';
        img.onload = function(){app.ctx.drawImage(img, object.getX(), object.getY());};
    };

    GameView.prototype.clearAllLevel = function clearAllLevel(){
        app.ctx.clearRect(0, 0, app.canvas.width(), app.canvas.height());
    };

    GameView.prototype.clearHero = function clearHero(subject){
        app.ctx.fillStyle = '#333';
        app.ctx.fillRect(
            subject.getX(),
            subject.getY(),
            subject.getWidth(),
            subject.getHeight());

    };

    app.gameView = GameView;
}(app));
