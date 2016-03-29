var app = app || {};
app.isStarted = false;

(function(app){
    $.get('templates/story.html', function(template){
        $('#container').html(template);
    });

    document.addEventListener('start', function (){
        if (!app.isStarted){
            $.get('templates/game.html', function(template){
                $('#container').html(template);
                app.canvas = $('#canvas');
                app.ctx = canvas.getContext("2d");
                var gameApp = app.gameApp();
                gameApp.game();
            });
        }else{
            location.reload();
        }
        app.isStarted = true;
    });

    document.addEventListener('stop', function (){
        $.get('templates/gameOver.html', function(template){
            $('#container').html(template);
        });
    });

    document.addEventListener('story', function (){
        $.get('templates/story.html', function(template){
            $('#container').html(template);
        });
    });

    $('#start').on('click', function(){
        var start = document.createEvent('Event');
        start.initEvent('start', true, true);
        document.dispatchEvent(start);
    });

    $('#stop').on('click', function(){
        var stop = document.createEvent('Event');
        stop.initEvent('stop', true, true);
        document.dispatchEvent(stop);
    });

    $('#story').on('click', function(){
        var story = document.createEvent('Event');
        story.initEvent('story', true, true);
        document.dispatchEvent(story);
    });
}(app));