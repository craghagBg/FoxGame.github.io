var app = app || {};
var maxRockSize = 200;

(function(app){
    function Obstacle(x, y, image){
        this.setX(x);
        this.setY(y);
        this.image = new Image();
        this.image.src = image;
        this.isLive = true;
        var _this = this;
        this.image.onload = function(){
            _this.setWidth(_this.image.width);
            _this.setHeight(_this.image.height);
            app.ctx.drawImage(_this.image, _this._x, _this._y);
        };
    }

    Obstacle.prototype.setX = function (x){
        if (x <= 0){ x = 0; }
        if (x >= app.canvas.width()- this._width){
            x = app.canvas.width() - this._width;
        }
        this._x = x;
    };

    Obstacle.prototype.getX = function (){
        return this._x;
    };

    Obstacle.prototype.setY = function (y){
        if (y <= 0){ y = 0; }
        if (y >= app.canvas.height() - this._height){
            y = app.canvas.height() - this._height;
        }
        this._y = y;
    };

    Obstacle.prototype.getY = function (){
        return this._y;
    };

    Obstacle.prototype.setWidth = function (width){
        if (width < 0 || width > maxRockSize){
            throw new Error('Obstacle is outside of ths field!');
        }

        this._width = width;
    };

    Obstacle.prototype.getWidth = function (){
        return this._width;
    };

    Obstacle.prototype.setHeight = function (height){
        if (height < 0 || height > maxRockSize){
            throw new Error('Obstacle is outside of ths field!');
        }

        this._height = height;
    };

    Obstacle.prototype.getHeight = function (){
        return this._height;
    };

    Obstacle.prototype.clear = function clear(){
        app.ctx.fillStyle = '#333';
        app.ctx.fillRect(
            this._x,
            this._y,
            this._width,
            this._height);
    };

    Obstacle.prototype.draw = function draw(){
        app.ctx.drawImage(this.image, this._x, this._y);
    };

    app._Obstacle = Obstacle;

    app.obstacle = function(x, y, image){ return new Obstacle(x, y, image); }
}(app));