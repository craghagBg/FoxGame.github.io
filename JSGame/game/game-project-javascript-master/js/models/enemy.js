(function(){
    function Enemy(x, y,image, width, height){
        app._Hero.call(this, x, y,image, width, height);
        this.defaultWidth = 64;
        this.defaultHeight = 32;
        this.setWidth(width);
        this.setHeight(height);
        this.direction = app.directions.left;
        this.range = 100;
    }

    Enemy.extend(app._Hero);

    Enemy.prototype.draw = function draw(){
        var imagePositionY;
        switch (this.direction){
            case app.directions.left : imagePositionY = 2; break;
            case app.directions.up : imagePositionY = 2; break;
            case app.directions.right : imagePositionY = 3; break;
            case app.directions.down : imagePositionY = 0; break;
            case app.directions.stop : imagePositionY = this.lastHeroDirection; break;
        }

        this.lastHeroDirection = imagePositionY;
        this.animationCounter++;
        if (this.animationCounter === 30){ this.animationCounter = 0; }

        var randomChangeDirection = getRandomInt(0, 100);
        var randomDirection = getRandomInt(0, 4);
        if (randomChangeDirection === 99){
            this.direction = 37 + randomDirection;
        }

        if (this.direction === app.directions.up ||
            this.direction === app.directions.down){
            this.setWidth(32);
            this.setHeight(64);
        }
        if (this.direction === app.directions.left ||
            this.direction === app.directions.right){
            this.setWidth(64);
            this.setHeight(32);
        }

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

    Enemy.prototype.hunt = function hunt(fox){
        var x = this._x - fox.getX();
        var y = this._y - fox.getY();
        if (Math.sqrt(x*x + y*y) < this.range){
            if (Math.abs(x) >= Math.abs(y)){
                if (this._x > fox.getX()){
                    this.direction = app.directions.left;
                }else{
                    this.direction = app.directions.right;
                }
            }else{
                if (this._y < fox.getY()){
                    this.direction = app.directions.down;
                }else{
                    this.direction = app.directions.up;
                }
            }
        }
    };

    Enemy.prototype.collisionWithHero = function collisionWithHero(fox){
        if (this._x + this._width * 2 / 3 >= fox.getX() &&
            this._x <= fox.getX() + fox.getWidth() / 2){
            if (this._y + this._height * 2 / 3 >= fox.getY() &&
                this._y <= fox.getY() + fox.getHeight() / 2){
                var collision = document.createEvent('CustomEvent');
                collision.initEvent('collisionSubject-Subject', true, true);
                document.dispatchEvent(collision);
            }
        }
    };

    app._Enemy = Enemy;
    app.enemy = function(x, y,image, width, height){
        return new Enemy(x, y,image, width, height);
    }
}());