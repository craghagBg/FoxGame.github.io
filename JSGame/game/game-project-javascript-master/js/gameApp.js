var app = app || {};

(function(app){
    function GameApp(){
        app.points = 0;
        this.fox = app.level.hero;
        this.gameObjects = app.level.objects;
    }

    GameApp.prototype.game = function (){
        var gameController = app.gameController(this.fox, this.gameObjects),
            _this = this;

        gameController.run();

        document.addEventListener('keydown', function (event){
            var keyCode = event.keyCode;
            if (keyCode === _this.fox.direction){
                _this.fox.direction = _this.fox.directions.stop;
            }else{
                $.each(_this.fox.directions, function(index, value) {
                    if (value === keyCode){
                        _this.fox.direction = value;
                    }
                });
            }
        });

        document.addEventListener('collisionHero', function (e){
            var gameObject = e.detail[0],
                lastHero = e.detail[1];

            if (gameObject instanceof app._Food){
                gameObject.clear();
                gameObject.isLive = false;
                app.points++;
                console.log(app.points);
            }else{
                _this.fox.setX(lastHero[0]);
                _this.fox.setY(lastHero[1]);
                _this.fox.direction = _this.fox.directions.stop;
            }
        });
    };

    app.gameApp = function(){
        return new GameApp();
    };
}(app));