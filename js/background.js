import anime from 'animejs';

//         _                 _ _ _ 
//        | |               | | | |
//    __ _| |__   ___  _   _| | | |
//   / _` | '_ \ / _ \| | | | | | |
//  | (_| | | | | (_) | |_| |_|_|_|
//   \__,_|_| |_|\___/ \__, (_|_|_)
//                      __/ |      
//                     |___/       

// have fun looking through my probably absolutely GARBAGE code :)
// take what you like if you find it useful, no need for credits

var bgSquares = document.querySelectorAll('.bgSquare')

function animBackground() {
    anime({
        targets: bgSquares,
        easing: "easeInOutExpo",
        translateX: function(el, i, l) {
            return anime.random(0,window.innerWidth);
        },
        translateY: function(el, i, l) {
            return anime.random(0,window.innerHeight);
        },
        opacity: 0.02,
        rotate: function(el, i, l) {
            return anime.random(0,360);
        },
        duration: 6000
    });
}

setInterval(animBackground, 6000)