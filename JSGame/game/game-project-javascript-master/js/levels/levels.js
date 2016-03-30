var app = app || {};

(function(app){
    function Level(){
        this.hero = app.hero(100, 100, 'imgs/foxes2.png');
        this.objects = [
                app.obstacle(0, 10, 'imgs/bush.png'),
                app.obstacle(0, 106, 'imgs/bush.png'),
                app.obstacle(0, 202, 'imgs/bush.png'),
                app.obstacle(0, 296, 'imgs/bush.png'),
                app.obstacle(300, 10, 'imgs/bush.png'),
                app.obstacle(300, 106, 'imgs/bush.png'),
                app.obstacle(300, 296, 'imgs/bush.png'),
                app.obstacle(540, 296, 'imgs/bush.png'),
                app.obstacle(540, 10, 'imgs/bush.png'),
                app.obstacle(540, 106, 'imgs/bush.png'),
                app.obstacle(540, 202, 'imgs/bush.png'),
                app.obstacle(540, 296, 'imgs/bush.png'),
                app.obstacle(0, 296, 'imgs/bush.png'),
                app.food(200, 296, 'imgs/grape.png'),
                app.food(100, 296, 'imgs/grape.png'),
                app.food(400, 96, 'imgs/grape.png'),
                app.food(360, 350, 'imgs/grape.png')];
    }


    app.level = function () {
        return new Level();
    }
}(app));