var app = app || {};

(function(app){
    function GameController(view, model, gameObjects){
        this.heroView = view;
        this.model = model;
        this.gameObjects = gameObjects;
        this.interval = {};
    }

    GameController.prototype.run = function(){
        var _this = this;
        this.interval = setInterval(function(){
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
            _this.heroView.drawHero(_this.model);
        }, 10);
    };

    GameController.prototype.stopGame = function(){
        this.heroView.clearAllLevel();
        clearInterval(this.interval);
    };

    app.gameController = GameController;
}(app));