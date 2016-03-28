var app = app || {};

(function(app){
    function GameController(view, model, gameObjects){
        this.gameView = view;
        this.model = model;
        this.gameObjects = gameObjects;
        this.isStop = false;
    }

    GameController.prototype.run = function(){
        var _this = this;
        var animationCounter = 0;
        function repeatOften() {
            _this.model.clearHero();
            var lastHeroPosition = [_this.model.getX(), _this.model.getY()];
            _this.model.move();
            _this.gameObjects.forEach(function(gameObject){
                _this.model.collision(gameObject, lastHeroPosition);
            });

            if (_this.isStop){ return; }

            animationCounter++;
            if (animationCounter === 30){ animationCounter = 0; }

            _this.model.drawHero(animationCounter);

            app.raf = requestAnimationFrame(repeatOften);
        }

        app.raf = requestAnimationFrame(repeatOften);
    };

    app.gameController = GameController;
}(app));