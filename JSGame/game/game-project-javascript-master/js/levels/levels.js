var app = app || {};

(function(app){
    function Level(){
        this.matrix = app.matrix;
        this.objects = [];
        this.enemies = [];
        var cellWidth = 33,
            cellHeight = 33;


        for (var col = 0; col < this.matrix.length; col++) {
            for (var row = 0; row < this.matrix[col].length; row++) {
                if (this.matrix[col][row] === 1){
                    this.objects.push(
                        app.obstacle(row * cellWidth,
                        col * cellHeight,
                        app.gameObstacles[0]));
                }
                if (this.matrix[col][row] === 'x'){
                    this.objects.push(
                        app.food(row * cellWidth,
                            col * cellHeight,
                            app.gameFood[0]));
                }
                if (this.matrix[col][row] === 'f'){
                    this.hero =
                        app.hero(row * cellWidth,
                            col * cellHeight,
                            app.foxImages[0]);
                }
                if (this.matrix[col][row] === 'w'){
                    this.enemies.push(
                        app.enemy(row * cellWidth,
                            col * cellHeight,
                            app.wolfImages[0]));
                }
            }
        }
    }

    app.level = function (matrix) {
        return new Level(matrix);
    }
}(app));