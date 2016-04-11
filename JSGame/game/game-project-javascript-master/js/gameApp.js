var app = app || {};

(function(app){
    function GameApp(){
        app.points = 0;
        this.level = app.level();
        this.fox = this.level.hero;
        this.enemies = this.level.enemies;
        this.objects = this.level.objects;
    }

    GameApp.prototype.game = function (){
        var gameController = app.gameController(this.fox, this.enemies, this.objects),
            _this = this;

        gameController.run();

        document.addEventListener('keydown', function (event){
            var keyCode = event.keyCode;
            $.each(app.directions, function(index, value) {
                if (value === keyCode){
                    _this.fox.direction = value;
                }
            });
        });

        document.addEventListener('collisionSubject-Subject', function (){
            gameController.isStop = true;
        });

        document.addEventListener('collisionSubject-Object', function (e){
            var object = e.detail[0],
                subject = e.detail[1];

            if (!(subject instanceof app._Enemy)){
                if (object instanceof app._Food){
                    object.clear();
                    object.isLive = false;
                    app.points++;
                }else{
                    subject.setX(subject.lastPosition[0]);
                    subject.setY(subject.lastPosition[1]);
                    subject.direction = app.directions.stop;
                }
            }else{
                if (!(object instanceof app._Food)){
                    subject.setX(subject.lastPosition[0]);
                    subject.setY(subject.lastPosition[1]);
                    subject.direction = 37 + getRandomInt(0, 4);
                }
            }
        });
    };

    app.gameApp = function(){
        return new GameApp();
    };
}(app));