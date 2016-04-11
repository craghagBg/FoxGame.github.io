var app = app || {};

(function(app){
    function GameController(fox, enemies, objects){
        this.fox = fox;
        this.enemies = enemies;
        this.objects = objects;
        this.isStop = false;
        this.points = 0;
    }

    GameController.prototype.run = function(){
        var _this = this;

        function repeatOften() {
            _this.enemies.forEach(function(enemy){
                enemy.clear();
                enemy.lastPosition = [enemy.getX(), enemy.getY()];
            });
            _this.fox.clear();
            _this.fox.lastPosition = [_this.fox.getX(), _this.fox.getY()];

            _this.enemies.forEach(function(enemy){
                var huntProbability = getRandomInt(1, 20);
                if (huntProbability >= 19){
                    enemy.hunt(_this.fox);
                }

                enemy.move();
            });

            if (_this.fox.isMove){
                _this.fox.move();
            }

            _this.objects.forEach(function(object){
                _this.enemies.forEach(function(enemy){
                    enemy.collisionWithObject(object);
                });
                _this.fox.collisionWithObject(object);
             });

            _this.enemies.forEach(function(enemy){
                enemy.collisionWithHero(_this.fox);
            });

            _this.objects = _this.objects.filter(function(object){
                return object.isLive;
            });

            if (app.points !== _this.points){
                switch (app.points){
                    case 0 : {
                        _this.fox.setWidth(_this.fox.defaultWidth);
                        _this.fox.setHeight(_this.fox.defaultHeight);
                        _this.fox.image = app.foxImages[0];
                        _this.points = app.points;
                    } break;
                    case 1 : {
                        _this.fox.setWidth(_this.fox.defaultWidth * 1.25);
                        _this.fox.setHeight(_this.fox.defaultHeight * 1.25);
                        _this.fox.image = app.foxImages[1];
                        _this.points = app.points;
                    } break;
                    case 2 : {
                        _this.fox.setWidth(_this.fox.defaultWidth * 1.5);
                        _this.fox.setHeight(_this.fox.defaultHeight * 1.5);
                        _this.fox.image = app.foxImages[2];
                        _this.points = app.points;
                    } break;
                    case 3 : {
                        _this.fox.setWidth(_this.fox.defaultWidth * 1.75);
                        _this.fox.setHeight(_this.fox.defaultHeight * 1.75);
                        _this.fox.image = app.foxImages[3];
                        _this.points = app.points;
                    } break;
                    case 4 :
                    default : {
                        _this.fox.setWidth(_this.fox.defaultWidth * 2);
                        _this.fox.setHeight(_this.fox.defaultHeight * 2);
                        _this.fox.image = app.foxImages[4];
                        _this.points = app.points;
                    } break;
                }
            }

            _this.objects.forEach(function(object){
                object.draw();
            });

            if (_this.isStop){
                app.ctx.drawImage(
                    app.gameOverImages[0],
                    (app.canvas.width() - app.gameOverImages[0].width) / 2,
                    (app.canvas.height() - app.gameOverImages[0].height) / 2);

                return;
            }

            _this.enemies.forEach(function(enemy){
                enemy.draw();
            });
            _this.fox.draw();

            app.raf = requestAnimationFrame(repeatOften);
        }

        app.raf = requestAnimationFrame(repeatOften);
    };

    app.gameController = function(fox, enemies, obstacles){
        return new GameController(fox, enemies, obstacles);
    };
}(app));