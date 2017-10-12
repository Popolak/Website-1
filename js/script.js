$( document ).ready(function() {

    // Variables
    var leftMonkeyTarget = $('.monkey1');
    var bottomMonkeyTarget = $('.monkey2');
    var rightMonkeyTarget = $('.monkey3');
    var scorePanel = $('.score');
    var victoryPanel = $('.victory');
    var points = 15;
    var vid = $('#dk');
    vid.get(0).volume = 0.3;
    $(document).click(function(event) {
        if (!$(event.target).closest('.bananas').length){
            $('#scream').get(0).currentTime = 2;
            $('#scream').get(0).play();
        } else {
              $('#nice').get(0).play();
        }
        // body...
    });

    // Loop function
    setInterval(leftMonkey, 8000);

    // Init function
    bottomMonkey();
    initBananas();
    score();

    // Events
    rightMonkeyTarget.mouseenter(function () {
        $(this).stop(true,false).animate({
            "right": "-6%"
        }, 1000, function () {
            // Nothing
        });
    });

    rightMonkeyTarget.mouseleave(function () {
        $(this).stop(true,false).animate({
            "right": "-45%"
        }, 1000, function () {
            // Nothing
        });
    });

    /**
     * Pas de tableau
     * Que une banane
     * A chaque clic la banane change de position 
     * 
     */

    $('.bananas').click(function () {
        points--;
        moveBananas();
        score();
        if (victory()) {
            scorePanel.css('display', 'none');
            victoryPanel.css('display', 'block');
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
                // Nothing3
            });
        });
    }

    function bottomMonkey() {
        var newPos = makeNewPosition();
        bottomMonkeyTarget.animate({ top: newPos[0], left: newPos[1] }, 1000, function(){
            bottomMonkey();
        });
    }

    function initBananas() {
        var divSize = 50;
        var posX = (Math.random() * 100);
        var posY = (Math.random() * 100);
        $newImg = $('<img class="bananas" src="' + $("#objet").val() + '" alt="Banane">').css({
            'left': posX + '%',
            'top': posY + '%'
        });
        $newImg.appendTo($('body'));
    }

    function moveBananas () {
        var newPos = makeNewPosition();
        $('.bananas').hide().css({
            'left': newPos[1] + 'px',
            'top': newPos[0] + 'px'
        }).fadeIn(500);
    }

    function score () {
        $('.count_remaining').html(points)
    }

    function victory() {
        if (points === 0)
            return true;
        return false;
    }

    function makeNewPosition(){

        var h = $(window).height() - 50;
        var w = $(window).width() - 50;

        var nh = Math.floor(Math.random() * h);
        var nw = Math.floor(Math.random() * w);

        return [nh,nw];
    }

});
