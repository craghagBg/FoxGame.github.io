var app = app || {};

(function(app){
    function GameApp(){
        this.gameView = new app.gameView();
    }

    GameApp.prototype.game = function (){
        var hero = new app.hero(50, 50, 'imgs/foxes.png'),
            gameObjects = [
                new app.rock(0, 250, 'imgs/smallRock.png'),
                new app.rock(150, 150, 'imgs/smallRock.png'),
                new app.rock(350, 250, 'imgs/smallRock.png')];

        var gameController = new app.gameController(this.gameView, hero, gameObjects);

        gameObjects.forEach(function(rock){
            rock.drawRock(rock);
        });

        gameController.run();

        document.addEventListener('keydown', function (event){
            var keyCode = event.keyCode;
            if (keyCode === hero.direction){
                hero.direction = hero.directions.stop;
            }else{
                $.each(hero.directions, function(index, value) {
                    if (value === keyCode){
                        hero.direction = value;
                    }
                });
            }
        });

        document.addEventListener('collisionHero', function (e){
            var lastHero = e.detail;
            hero.setX(lastHero[0]);
            hero.setY(lastHero[1]);
            hero.direction = hero.directions.stop;
        });
    };

    app.gameApp = GameApp;
}(app));