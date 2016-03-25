var app = app || {},
    maxHeroSize = 50;

(function(app){
    function Hero(x, y, width, height){
        this.setX(x);
        this.setY(y);
        this.setWidth(width);
        this.setHeight(height);
        this.directions = {'up': 38, 'right': 39, 'down': 40, 'left': 37, stop: 0};
        this.direction = this.directions.right;
    }

    Hero.prototype.setX = function (x){
        if (x <= 0){
            x = 0;
        }

        if (x >= app.canvas.width()- this._width){
            x = app.canvas.width() - this._width;
        }

        this._x = x;
    };

    Hero.prototype.getX = function (){
        return this._x;
    };

    Hero.prototype.setY = function (y){
        if (y <= 0){
            y = 0;
        }
        if (y >= app.canvas.height() - this._height){
            y = app.canvas.height() - this._height;
        }

        this._y = y;
    };

    Hero.prototype.getY = function (){
        return this._y;
    };


    Hero.prototype.setWidth = function (width){
        if (width < 0 || width > maxHeroSize){
            throw new Error('Hero is outside of ths field!');
        }

        this._width = width || 35;
    };

    Hero.prototype.getWidth = function (){
        return this._width;
    };

    Hero.prototype.setHeight = function (height){
        if (height < 0 || height > maxHeroSize){
            throw new Error('Hero is outside of ths field!');
        }

        this._height = height || 45;
    };

    Hero.prototype.getHeight = function (){
        return this._height;
    };

    Hero.prototype.move = function() {
        switch (this.direction){
            case this.directions.up: this.setY(this._y - 1); break;
            case this.directions.right: this.setX(this._x + 1); break;
            case this.directions.down: this.setY(this._y + 1); break;
            case this.directions.left: this.setX(this._x - 1); break;
            case this.directions.stop: break;
        }
    };

    Hero.prototype.collision = function collision(obj, lastHero) {
        if (this._x + this._width >= obj.getX() - 1 &&
            this._x <= obj.getX() + obj.getWidth() + 1){
            if (this._y + this._height >= obj.getY() - 1 &&
                this._y <= obj.getY() + obj.getHeight() + 1){
                var collisionHero = document.createEvent('CustomEvent');
                collisionHero.initCustomEvent('collisionHero', true, true, lastHero);
                document.dispatchEvent(collisionHero);
            }
        }
    };

    app.hero = Hero;
}(app));