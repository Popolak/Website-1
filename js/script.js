$( document ).ready(function() {

    // Variables
    var leftMonkeyTarget = $('.monkey1');
    var bottomMonkeyTarget = $('.monkey2');
    var rightMonkeyTarget = $('.monkey3');
    var scorePanel = $('.score');
    var victoryPanel = $('.victory');
    var startgame = $('.start-game');
    var seconds = 5;
    var compteurBanane = 0;
    // Loop function
    // setInterval(leftMonkey, 8000);

    // Init function
    // bottomMonkey();
    initBananas();
    var bananasTarget = $('.bananas');
    countBananasRemaining();
    score();
    $('.bananas').hide();
    $('.score').hide();
    $('.end-game').hide();
    // Events

    startgame.click(function(){
        $('.start').fadeOut(1000);
        $('.bananas').fadeIn(1000);
        $('.score').fadeIn(1000);
        setInterval(leftMonkey, 8000);
        bottomMonkey(); 
        countdown();

    })
    
         

    rightMonkeyTarget.mouseenter(function () {
        $(this).stop(true,false).animate({
            "right": "-50px"
        }, 1000, function () {
            // Nothing
        });
    });
    rightMonkeyTarget.mouseleave(function () {
        $(this).stop(true,false).animate({
            "right": "-400px"
        }, 1000, function () {
            // Nothing
        });
    });

    bananasTarget.click(function () {
        $(this).remove();
        countBananasRemaining();
        score();
        compteurBanane = compteurBanane + 1;
        if (victory()) {
            scorePanel.css('display', 'none');
            victoryPanel.css('display', 'block');
            seconds = 0;
        }
    });

    // Functions
    function leftMonkey() {
        leftMonkeyTarget.animate({
            "left": "-160px"
        }, 3000, function () {
            leftMonkeyTarget.animate({
                "left": "-330px"
            }, 1000, function () {
                // Nothing
            });
        });

    }
    function bottomMonkey(e) {
        var newPos = makeNewPosition();
        bottomMonkeyTarget.animate({ top: newPos[0], left: newPos[1] }, 1000, function(){
            bottomMonkey();
        });

    }
    function initBananas() {
        var j = 15;
        for(var i = 1; i<=j;i++){
            var divSize = 50;
            var posX = (Math.random() * ($('body').width() - divSize)).toFixed();
            var posY = (Math.random() * ($('body').height() - divSize)).toFixed();
            $newImg = $('<img class="bananas" src="assets/img/banane.png" alt="Banane">').css({
                'left': posX + 'px',
                'top': posY + 'px'
            });
            $newImg.appendTo($('body'));
        }

    }
    function score () {
        $('.count_remaining').html(countBananasRemaining())
    }

    function victory() {
        if (countBananasRemaining () === 0)
            return true;
        return false;
    }

    function countScoreFinal(compteurBanane){
        scoreFinal = compteurBanane + '/15';
        return scoreFinal;

    }
    function endScore() {
        $('.score-final').html(countScoreFinal(compteurBanane));
    }
    function countBananasRemaining () {
        return $('.bananas').length;
    }
    function makeNewPosition(){

        var h = $(window).height() - 50;
        var w = $(window).width() - 50;

        var nh = Math.floor(Math.random() * h);
        var nw = Math.floor(Math.random() * w);

        return [nh,nw];
    }

    //timer
    
    function countdown() {
        
        function tick() {
            var counter = document.getElementById("counter");
            seconds--;
            counter.innerHTML = (seconds < 10 ? "0" : "")  + String(seconds) + "S";
            if( seconds > 0 ) {
                setTimeout(tick, 1000);
            } else {
                $('.end-game').fadeIn(1000);
                $('.bananas').hide();
                $('.score').hide();
                        
                bottomMonkeyTarget.hide();
                leftMonkeyTarget.hide();
                rightMonkeyTarget.hide();
                endScore();
                //alert("Game over");
                
            }
        }
        tick();
    }


});