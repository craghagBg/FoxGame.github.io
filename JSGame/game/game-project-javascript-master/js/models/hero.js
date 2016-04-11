var app = app || {},
    maxHeroSize = 200;

(function(app){
    function Hero(x, y,image, width, height){
        this.setX(x);
        this.setY(y);
        this.defaultWidth = 48;
        this.defaultHeight = 40;
        this.setWidth(width);
        this.setHeight(height);
        this.image = image;
        this.direction = app.directions.right;
        this.lastHeroDirection = 0;
        this.animationCounter = 0;
        this.isMove = true;
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

        this._width = width || this.defaultWidth;
    };

    Hero.prototype.getWidth = function (){
        return this._width;
    };

    Hero.prototype.setHeight = function (height){
        if (height < 0 || height > maxHeroSize){
            throw new Error('Hero is outside of ths field!');
        }

        this._height = height || this.defaultHeight;
    };

    Hero.prototype.getHeight = function (){
        return this._height;
    };

    Hero.prototype.move = function() {
        switch (this.direction){
            case app.directions.up: this.setY(this._y - 1); break;
            case app.directions.right: this.setX(this._x + 1); break;
            case app.directions.down: this.setY(this._y + 1); break;
            case app.directions.left: this.setX(this._x - 1); break;
            case app.directions.stop: break;
        }
    };

    Hero.prototype.collisionWithObject = function collision(obj) {
        if (this._x + this._width * 2 / 3 >= obj.getX() &&
            this._x <= obj.getX() + obj.getWidth() / 2){
            if (this._y + this._height * 2 / 3 >= obj.getY() &&
                this._y <= obj.getY() + obj.getHeight() / 2){
                var data = [obj, this];
                var collisionHero = document.createEvent('CustomEvent');
                collisionHero.initCustomEvent('collisionSubject-Object', true, true, data);
                document.dispatchEvent(collisionHero);
            }
        }
    };

    Hero.prototype.draw = function draw(){
        var imagePositionY;
        switch (this.direction){
            case app.directions.left : imagePositionY = 1; break;
            case app.directions.up : imagePositionY = 3; break;
            case app.directions.right : imagePositionY = 2; break;
            case app.directions.down : imagePositionY = 0; break;
            case app.directions.stop : imagePositionY = this.lastHeroDirection; break;
        }

        this.animationCounter++;
        if (this.animationCounter === 30){ this.animationCounter = 0; }

        this.lastHeroDirection = imagePositionY;
        app.ctx.drawImage(
            this.image,
            Math.floor(this.animationCounter / 10) * this._width,
            imagePositionY * this._height,
            this._width,
            this._height,
            this._x,
            this._y,
            this._width,
            this._height
        );
    };

    Hero.prototype.clear = function clear(){
        app.ctx.fillStyle = '#333';
        app.ctx.fillRect(
            this._x,
            this._y,
            this._width,
            this._height);
    };

    app._Hero = Hero;

    app.hero = function(x, y,image, width, height){
        return new Hero(x, y,image, width, height);
    };
}(app));