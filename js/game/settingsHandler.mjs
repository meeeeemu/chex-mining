import { resetGame, saveGame } from "./profileHandler.mjs";

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

var gameSettings = {
    spawnEffVolume: 5,
    musicVolume: 5,
    disableSOC: 0
}

function setSavedSettingsValues(spawnEffVolume, musicVolume, disableSOC) {
    gameSettings.spawnEffVolume = spawnEffVolume;
    gameSettings.musicVolume = musicVolume;
    gameSettings.disableSOC = disableSOC;
}

var slider = document.querySelector('.sliderSpawnVol');
var sliderBg = document.querySelector('.sliderBgVol');
var guiTextMainBgVal = document.querySelector('.guiTextMainBgVal');
var guiTextMainSpVal = document.querySelector('.guiTextMainSpVal');
var audioElement = document.querySelector('.audioElement');
var bgMusicElement = document.querySelector('.bgMusic');
var resetButton = document.querySelector('.resetDataButton');
var disableSOCCheckbox = document.querySelector('.stopOnChillVal')

setTimeout(() => {
    guiTextMainSpVal.textContent = gameSettings.spawnEffVolume;
    audioElement.volume = (gameSettings.spawnEffVolume/100);
    bgMusicElement.volume = (gameSettings.musicVolume/100);
    guiTextMainBgVal.textContent = (gameSettings.musicVolume);
    slider.value = (gameSettings.spawnEffVolume);
    sliderBg.value = (gameSettings.musicVolume);
    if(gameSettings.disableSOC == 1) {
        disableSOCCheckbox.checked = "on"
    } else {
        disableSOCCheckbox.checked = "off"
    }
}, 100)

var clickCount = 0;

resetButton.onclick = () => {
    resetButton.textContent = "all of your data will be gone if you click this again";
    clickCount += 1;
    if(clickCount == 2) {
        resetButton.textContent = "goodbye data!";
        resetGame();
    } else {
        return;
    }
}

slider.oninput = () => {
    audioElement.volume = (slider.value/100);
    guiTextMainSpVal.textContent = (slider.value);
    gameSettings.spawnEffVolume = Number(slider.value);
    saveGame()
}

sliderBg.oninput = () => {
    bgMusicElement.volume = (sliderBg.value/100);
    guiTextMainBgVal.textContent = (sliderBg.value);
    gameSettings.musicVolume = Number(sliderBg.value);
    saveGame()
}

export {gameSettings, setSavedSettingsValues}