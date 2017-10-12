$( document ).ready(function() {

    // Variables
    var leftMonkeyTarget = $('.monkey1');
    var bottomMonkeyTarget = $('.monkey2');
    var rightMonkeyTarget = $('.monkey3');
    var scorePanel = $('.score');
    var victoryPanel = $('.victory');

    // Loop function
    setInterval(leftMonkey, 8000);

    // Init function
    bottomMonkey();
    initBananas();
    var bananasTarget = $('.bananas');
    countBananasRemaining();
    score();

    // Events
    rightMonkeyTarget.mouseenter(function () {
        $(this).stop(true,false).animate({
            "right": "-5%"
        }, 1000, function () {
            // Nothing
        });
    });
    rightMonkeyTarget.mouseleave(function () {
        $(this).stop(true,false).animate({
            "right": "-30%"
        }, 1000, function () {
            // Nothing
        });
    });
    bananasTarget.click(function () {
        $(this).remove();
        countBananasRemaining();
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
                // Nothing
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
        var j = 15;
        for(var i = 1; i<=j;i++){
            var divSize = 50;
            var posX = (Math.random() * 100);
            var posY = (Math.random() * 100);
            $newImg = $('<img class="bananas" src="assets/img/banane.png" alt="Banane">').css({
                'left': posX + '%',
                'top': posY + '%'
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

});
