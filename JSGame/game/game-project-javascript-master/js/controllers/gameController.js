var app = app || {};

(function(app){
    function GameController(view, model, gameObjects){
        this.heroView = view;
        this.model = model;
        this.gameObjects = gameObjects;
        this.isStop = false;
    }

    GameController.prototype.run = function(){
        var _this = this;
        var animationCounter = 0;
        function repeatOften() {
            _this.heroView.clearHero(_this.model, '#333');
            var lastHero = new app.hero(
                _this.model.getX(),
                _this.model.getY(),
                _this.model.getWidth(),
                _this.model.getHeight());

            _this.model.move();
            _this.gameObjects.forEach(function(gameObject){
                _this.model.collision(gameObject, lastHero);
            });

            if (_this.isStop){ return; }

            animationCounter++;
            if (animationCounter === 30){ animationCounter = 0; }

            _this.heroView.drawHero(_this.model, animationCounter);

            app.raf = requestAnimationFrame(repeatOften);
        }

        app.raf = requestAnimationFrame(repeatOften);
    };


    GameController.prototype.stopGame = function(){
        this.heroView.clearAllLevel();
        this.isStop = true;
    };

    app.gameController = GameController;
}(app));