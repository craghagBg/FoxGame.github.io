var app = app || {};
var maxRockSize = 200;

(function(app){
    function Rock(x, y, width, height){
        this.setX(x);
        this.setY(y);
        this.setWidth(width);
        this.setHeight(height);
    }

    Rock.prototype.setX = function (x){
        if (x <= 0){
            x = 0;
        }

        if (x >= app.canvas.width()- this._width){
            x = app.canvas.width() - this._width;
        }

        this._x = x;
    };

    Rock.prototype.getX = function (){
        return this._x;
    };

    Rock.prototype.setY = function (y){
        if (y <= 0){
            y = 0;
        }
        if (y >= app.canvas.height() - this._height){
            y = app.canvas.height() - this._height;
        }

        this._y = y;
    };

    Rock.prototype.getY = function (){
        return this._y;
    };


    Rock.prototype.setWidth = function (width){
        if (width < 0 || width > maxRockSize){
            throw new Error('Rock is outside of ths field!');
        }

        this._width = width || 81;
    };

    Rock.prototype.getWidth = function (){
        return this._width;
    };

    Rock.prototype.setHeight = function (height){
        if (height < 0 || height > maxRockSize){
            throw new Error('Rock is outside of ths field!');
        }

        this._height = height || 60;
    };

    Rock.prototype.getHeight = function (){
        return this._height;
    };

    Rock.prototype.image = function(x, y){
        var img = new Image();
        img.src = 'imgs/smallRock.png';
        img.onload = function(){
            app.ctx.drawImage(img, x, y);
        };
    };

    app.rock = Rock;

}(app));