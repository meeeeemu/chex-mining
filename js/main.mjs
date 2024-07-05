import anime from 'animejs';
import { gameSettings } from './game/settingsHandler.mjs';

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

window.onload = () => {
    const rndInt = Math.floor(Math.random() * 5) + 1
    const bgMusicElement = document.querySelector('.bgMusic')
    if(rndInt == 1) {
        bgMusicElement.volume = (gameSettings.musicVolume/100);
        bgMusicElement.play()
    } else if(rndInt == 2) {
        bgMusicElement.src = "./media/at-night.mp3"
        bgMusicElement.volume = (gameSettings.musicVolume/100);
        bgMusicElement.load()
        bgMusicElement.play()
    } else if(rndInt == 3) {
        bgMusicElement.src = "./media/stellas-departure.mp3"
        bgMusicElement.volume = (gameSettings.musicVolume/100);
        bgMusicElement.load()
        bgMusicElement.play()
    } else if(rndInt == 4) {
        bgMusicElement.src = "./media/quiet-and-falling.mp3"
        bgMusicElement.volume = (gameSettings.musicVolume/100);
        bgMusicElement.load()
        bgMusicElement.play()
    } else if(rndInt == 5) {
        bgMusicElement.src = "./media/geothermal.mp3"
        bgMusicElement.volume = (gameSettings.musicVolume/100);
        bgMusicElement.load()
        bgMusicElement.play()
    }
};


const topBar = document.querySelector('.topBar');

const settingsButton = document.querySelector('.settingsButton');

const settingsGuiContainer = document.querySelector('.settingsGuiContainer')

var settingsShown = 0;

var settingsButtonAnim = anime({
    loop: false,
    autoplay: false,
    targets: settingsButton,
    rotate: 360,
    duration: 1000,
    easing: "easeOutExpo"
})

var guiSettingsShowAnim = anime({
    loop: false,
    autoplay: false,
    targets: settingsGuiContainer,
    translateX: ['-800px', '800px'],
    duration: 1000,
    easing: "easeInOutExpo"
})

var guiSettingsHideAnim = anime({
    loop: false,
    autoplay: false,
    targets: settingsGuiContainer,
    translateX: '-800px',
    duration: 1000,
    easing: "easeInOutExpo"
})

settingsButton.onclick = () => {
    settingsButtonAnim.play();
    if(settingsShown == 1) {
        guiSettingsHideAnim.play();
        settingsShown = 0;
    } else {
        guiSettingsShowAnim.play();
        settingsShown = 1;
    }
}

const titleText = document.querySelector('.titleText');
titleText.innerHTML = titleText.textContent.replace(/\S/g, "<span class='letter' style='display: inline-block'>$& &nbsp;</span>");

let titleAnim = anime.timeline({
    loop: false,
    autoplay: true
})

let backgroundAnim = anime.timeline({
    loop: false,
    autoplay: true
})

let textAnim = anime.timeline({
    loop: false,
    autoplay: true
})

backgroundAnim.add({
    targets: document.body,
    "background-color": ['rgba(0,0,0,0)', 'rgba(0,0,0,1);'],
    duration: 1500
})

titleAnim.add({
    targets: topBar,
    duration: 1000,
    opacity: [0, 1],
    easing: "easeInOutExpo",
    translateY: '100px',
})

titleAnim.add({
    targets: ".letter",
    duration: 1500,
    delay: (el, i) => 200 + (50 * (i + 1)),
    opacity: [-1, 1],
    easing: "easeInOutExpo",
})

titleAnim.add({
    targets: ".letter",
    duration: 1500,
    delay: (el, i) => 200 + (50 * (i + 1)),
    rotate: anime.random(-45,45),
    translateY: '-1200px',
    easing: "easeInOutExpo",
})

textAnim.add({
    delay: (el, i) => 200 + (150 * (i + 1)),
    targets: ".mainGuiText",
    duration: 2000,
    translateX: '400px',
    easing: "easeInOutExpo",
})