var app = app || {};

(function(app){
    function GameView() {
        this.lastHeroDirection = 0;
    }





    GameView.prototype.clearAllLevel = function clearAllLevel(){
        app.ctx.clearRect(0, 0, app.canvas.width(), app.canvas.height());
    };



    app.gameView = GameView;
}(app));
