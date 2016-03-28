var app = app || {},
    maxHeroSize = 50;

(function(app){
    function Hero(x, y,image, width, height){
        this.setX(x);
        this.setY(y);
        this.setWidth(width);
        this.setHeight(height);
        this.image = new Image();
        this.image.src = image;
        this.directions = {'up': 38, 'right': 39, 'down': 40, 'left': 37, stop: 0};
        this.direction = this.directions.right;
        this.lastHeroDirection = 0;
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

        this._width = width || 48;
    };

    Hero.prototype.getWidth = function (){
        return this._width;
    };

    Hero.prototype.setHeight = function (height){
        if (height < 0 || height > maxHeroSize){
            throw new Error('Hero is outside of ths field!');
        }

        this._height = height || 48;
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

    Hero.prototype.drawHero = function drawHero(counter){
        var imageDirection;
        switch (this.direction){
            case 37 : imageDirection = 1; break;
            case 38 : imageDirection = 3; break;
            case 39 : imageDirection = 2; break;
            case 40 : imageDirection = 0; break;
            case 0 : imageDirection = this.lastHeroDirection; break;
        }

        this.lastHeroDirection = imageDirection;
        this.image.onload = app.ctx.drawImage(
            this.image,
            Math.floor(counter / 10) * 48,
            imageDirection * 48,
            48,
            48,
            this._x,
            this._y,
            48,
            48
        );
    };

    Hero.prototype.clearHero = function clearHero(){
        app.ctx.fillStyle = '#333';
        app.ctx.fillRect(
            this._x,
            this._y,
            this._width,
            this._height);
    };

    app.hero = Hero;
}(app));