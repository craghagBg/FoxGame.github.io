var app = app || {};

(function(app){
    function Food(x, y, image){
        app._Obstacle.call(this, x, y, image);
    }

    Food.extend(app._Obstacle);

    app._Food = Food;
    app.food = function(x, y, image){ return new Food(x, y, image); }
}(app));