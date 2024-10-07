import { resetGame, saveGame } from "./profileHandler.mjs";
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

var gameSettings = {
    spawnEffVolume: 5,
    musicVolume: 5,
    disableSOC: 0,
    muteGearSounds: 0
}

function setSavedSettingsValues(spawnEffVolume, musicVolume, disableSOC, muteGearSounds) {
    gameSettings.spawnEffVolume = spawnEffVolume;
    gameSettings.musicVolume = musicVolume;
    gameSettings.disableSOC = disableSOC;
    gameSettings.muteGearSounds = muteGearSounds;
}

var slider = document.querySelector('.sliderSpawnVol');
var sliderBg = document.querySelector('.sliderBgVol');
var guiTextMainBgVal = document.querySelector('.guiTextMainBgVal');
var guiTextMainSpVal = document.querySelector('.guiTextMainSpVal');
var audioElement = document.querySelector('.audioElement');
var bgMusicElement = document.querySelector('.bgMusic');
var resetButton = document.querySelector('.resetDataButton');
var disableSOCCheckbox = document.querySelector('.stopOnChillVal');
var muteGearSoundsCheckbox = document.querySelector('.muteGearSoundsVal');
var audioElementCaveSpawn = document.querySelector('.audioElementCaveSpawn');
var exportDataButton = document.querySelector('.exportDataButton');
var importDataButton = document.querySelector('.importDataButton');
var fileInputSave = document.querySelector('.importFileInput');

var importingContainer = document.querySelector('.importingSaveContainer')

exportDataButton.onclick = () => {
    let base64Data = localStorage.getItem('save');

    let binaryData = atob(base64Data);
    let binLength = binaryData.length;
    let bytes = new Uint8Array(binLength);

    for (let i = 0; i < binLength; i++) {
        bytes[i] = binaryData.charCodeAt(i);
    }

    let blob = new Blob([bytes], { type: 'application/octet-stream' });

    let dlLink = document.createElement('a');
    dlLink.href = URL.createObjectURL(blob);
    dlLink.download = `chexData-${new Date().toISOString().slice(0, 10)}.bin`;
    dlLink.click();

    URL.revokeObjectURL(downloadLink.href);
}

importDataButton.onclick = () => {

    fileInputSave.click();

    fileInputSave.addEventListener('change', (event) => {

        resetButton.disabled = true;

        var file = event.target.files[0];
        var filename = file.name;
        var extension = file.type;

        if (extension != "application/octet-stream") {
            console.error("file given was not of type octet-stream");
            return;
        }

        importingContainer.style.visibility = "visible";

        anime({
            targets: importingContainer,
            opacity: [0, 1],
            translateY: [-1000, 0],
            easing: "easeInOutExpo",
            duration: 1000,
        })

        if (file && filename) {
            const reader = new FileReader();

            reader.onload = (e) => {
                if (e) {
                    console.error(e);                  
                }
                const fileContent = e.target.result;

                let contentToBase64 = btoa(fileContent);

                localStorage.setItem('save', contentToBase64);

                console.log("data imported successfully!!!!!!");

                setTimeout(() => {
                    location.reload();
                }, 5000);                
            }

            reader.readAsText(file);
        } 
    })
}

disableSOCCheckbox.onchange = () => {
    gameSettings.disableSOC = disableSOCCheckbox.checked ? 1 : 0;
    saveGame();
}

muteGearSoundsCheckbox.onchange = () => {
    gameSettings.muteGearSounds = muteGearSoundsCheckbox.checked ? 1 : 0;
    saveGame();
}

setTimeout(() => {
    guiTextMainSpVal.textContent = gameSettings.spawnEffVolume;
    audioElement.volume = (gameSettings.spawnEffVolume/100);
    bgMusicElement.volume = (gameSettings.musicVolume/100);
    audioElementCaveSpawn.volume = (gameSettings.spawnEffVolume/100);
    guiTextMainBgVal.textContent = (gameSettings.musicVolume);
    slider.value = (gameSettings.spawnEffVolume);
    sliderBg.value = (gameSettings.musicVolume);
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
    audioElementCaveSpawn.volume = (slider.value/100);
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