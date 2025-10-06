// window.onload = () => {
//     const bgMusicElement = document.querySelector('.bgMusic');
//     const musicFiles = [
//         "./media/at-night.mp3",
//         "./media/stellas-departure.mp3",
//         "./media/quiet-and-falling.mp3",
//         "./media/geothermal.mp3",
//         "./media/heartwarmth.mp3",
//         "./media/observatory.mp3",
//         "./media/addiction.mp3",
//     ];

import { gameSettings } from "./game/settingsHandler.mjs";

//     const setRandomMusic = () => {
//         const rndInt = Math.floor(Math.random() * musicFiles.length);
//         bgMusicElement.src = musicFiles[rndInt];
//         bgMusicElement.volume = 5 / 100;
//         bgMusicElement.load();
//         bgMusicElement.play();
//     };

//     setRandomMusic();

//     bgMusicElement.addEventListener('ended', setRandomMusic);
// };

// window.onload = () => {
//     const bgIntroElement = document.querySelector('.bgIntroMusic');
//     console.log(bgIntroElement)
//     bgIntroElement.src = './media/menu-loop.mp3'
//     bgIntroElement.volume = 15 / 100; // make sure to set this to the player's volume level + 10 (so it's audible)
//     bgIntroElement.load();

//     const loopAudio = () => {
//         bgIntroElement.currentTime = 0;
//         bgIntroElement.play();
//     }

//     bgIntroElement.addEventListener('ended', loopAudio);
//     bgIntroElement.play(); 
// }

const menuMusic = document.querySelector('.bgIntroMusic');
const gameMusic = document.querySelector('.bgMusic');

const mainGameTracks = [
    "./media/at-night.mp3",
    "./media/stellas-departure.mp3",
    "./media/quiet-and-falling.mp3",
    "./media/geothermal.mp3",
    "./media/heartwarmth.mp3",
    "./media/observatory.mp3",
    "./media/addiction.mp3",
]

function pickRand() {
    return mainGameTracks[Math.floor(Math.random() * mainGameTracks.length)];
}

function startMenuLoop() {
    menuMusic.src = './media/menu-loop.mp3';
    menuMusic.volume = gameSettings.audioSettings.musicVolume; // make sure to set this to the user's setting
    menuMusic.loop = true;
    menuMusic.play();
}

function gameMusicLoop() {
    gameMusic.src = pickRand();
    gameMusic.volume = gameSettings.audioSettings.musicVolume; // make sure to set this to the user's setting
    gameMusic.play();
}
gameMusic.addEventListener('ended', gameMusicLoop);

document.addEventListener('startGame', () => {
  const step = 0.03;
  const fade = setInterval(() => {
    menuMusic.volume = Math.max(0, menuMusic.volume - step);
    if (menuMusic.volume === 0) {
      clearInterval(fade);
      menuMusic.pause();
      gameMusicLoop();
    }
  }, 50);
});

window.addEventListener('load', startMenuLoop);