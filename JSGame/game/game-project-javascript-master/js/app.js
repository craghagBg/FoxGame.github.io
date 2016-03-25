var app = app || {};

(function(app){
    var gameView = new app.gameView();

    gameView.generateField();

    var gameObjects = [],
        hero = new app.hero(50, 50, 10, 10),
        rock = new app.rock(150, 150, 80, 30),
        rock2 = new app.rock(250, 250, 50, 130);

    gameObjects.push(rock);
    gameObjects.push(rock2);

    var gameController = new app.gameController(gameView, hero, gameObjects);
    gameObjects.forEach(function(rock){
        gameView.drawRock('#000', rock);
    });

    document.addEventListener('start', function (){
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
    });

    document.addEventListener('stop', function (){
        gameController.stopGame();
    });

    document.addEventListener('collisionHero', function (e){
        var lastHero = e.detail;
        hero.setX(lastHero.getX());
        hero.setY(lastHero.getY());
        hero.setWidth(lastHero.getWidth());
        hero.setHeight(lastHero.getHeight());
        hero.direction = hero.directions.stop;
    });
}(app));