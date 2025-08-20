import anime from 'animejs';
import { saveGame } from './profileHandler.mjs';
import { stopAutoSave } from './saveInterval.mjs';

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
    audioSettings: {
        musicVolume: 0.1,
        spawnSFXVolume: 0.1,
        gearSFXVolume: 0.1
    },

    gameplaySettings: {
        enableAFK: false,
        disableSpawnEffects: false,
        skipMainMenu: false,
        disableStopOnChill: false
    },

    miscSettings: {
        superChexMode: false,
        cloudSaveEnabled: false,
        swagLevel: 0
    }
}

const settingsPanel = document.getElementById('gameSettingsPane');
const tabButtons = settingsPanel.querySelectorAll('.tabBar .tab');
const settingsPanes = settingsPanel.querySelectorAll('.settingsPane');
var exportDataButtons = document.querySelectorAll('.exportDataBtn');
var importDataButtons = document.querySelectorAll('.importDataBtn');
var resetGameButtons = document.querySelectorAll('.resetGameBtn')
var fileInputSave = document.querySelector('.importFileInput');
var importingContainer = document.querySelector('.importingSaveContainer')

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        tabButtons.forEach(b => b.classList.toggle('active', b === btn));
        settingsPanes.forEach(pane => {
            pane.classList.toggle('active', pane.dataset.pane === tab);
        })
    })
})

const audioRef = {
    musicVolume: [
        document.querySelector('.bgMusic'),
        document.querySelector('.bgIntroMusic'),
        document.querySelector('.uiHover')
    ],
    spawnSFXVolume: [
        document.querySelector('.spawnSound')
    ],
    gearSFXVolume: [
        document.querySelector('.gearSFX')
    ]
}

function updateSliders(key, value) {
    document.querySelectorAll(`input[type="range"][data-setting="${key}"]`).forEach(slider => {
        slider.value = Math.round(value * 100);
        const valueSpan = slider.parentElement.querySelector('.value');
        if (valueSpan) valueSpan.textContent = slider.value + '%';
    })
    saveGame();
}

document.querySelectorAll('input[type="range"][data-setting]').forEach(slider => {
    const key = slider.dataset.setting;
    slider.value = Math.round(gameSettings.audioSettings[key] * 100);
    const valueSpan = slider.parentElement.querySelector('.value');
    if (valueSpan) valueSpan.textContent = slider.value + '%';

    slider.addEventListener('input', () => {
        const newValue = slider.value / 100;
        gameSettings.audioSettings[key] = newValue;
        updateSliders(key, newValue);

        if (audioRef[key]) {
            (Array.isArray(audioRef[key]) ? audioRef[key] : [audioRef[key]]).forEach(audioEl => {
                if(audioEl) audioEl.volume = newValue;
            })
        }
    });
});

function updateCheckboxes() {
    document.querySelectorAll('input[type="checkbox"][data-setting]').forEach(box => {
        const key = box.dataset.setting;

        let sectionName = Object.keys(gameSettings).find(section =>
            Object.prototype.hasOwnProperty.call(gameSettings[section], key)
        );
        let section = gameSettings[sectionName];
        if (!section) return;

        box.checked = !!section[key];
    });
    saveGame();
}

document.querySelectorAll('input[type="checkbox"][data-setting]').forEach(box => {
    box.addEventListener('change', () => {
        const key = box.dataset.setting;

        let sectionName = Object.keys(gameSettings).find(section => 
            Object.prototype.hasOwnProperty.call(gameSettings[section], key)
        );

        if(!sectionName) return;
        gameSettings[sectionName][key] = box.checked;
        updateCheckboxes();
    })

})

// data exporting and importing and reset shenanigans

exportDataButtons.forEach(exportDataButton => {
    exportDataButton.onclick = () => {
        let base64Data = localStorage.getItem('save');
        if (!base64Data) {
            console.error("ERR: no save data found, returning");
            return;
        }

        let binData = atob(base64Data);
        let binLength = binData.length;
        let bytes = new Uint8Array(binLength);
        for (let i = 0; i < binLength; i++) {
            bytes[i] = binData.charCodeAt(i);
        }

        let blob = new Blob([bytes], { type: 'application/octet-stream' });
        let dlLink = document.createElement('a');
        dlLink.href = URL.createObjectURL(blob);
        dlLink.download = `chexData-${new Date().toISOString().slice(0, 10)}.bin`;
        dlLink.click();

        console.log("LOG: data successfully exported");

        setTimeout(() => {
            URL.revokeObjectURL(dlLink.href);
        }, 1000);
    }
})

importDataButtons.forEach(importDataButton => {
    importDataButton.onclick = () => {
        fileInputSave.value = '';
        fileInputSave.click();
    };
})

fileInputSave.addEventListener('change', (event) => {
    let file = event.target.files[0];
    if (!file) return;

    if (file.type && file.type !== "application/octet-stream") { console.error("ERR: file was not an octet stream, disregarding"); return; }

    stopAutoSave();

    importingContainer.classList.add("active");

    anime({
        targets: importingContainer,
        opacity: [0, 1],
        translateY: [-1000, 0],
        easing: "easeInOutExpo",
        duration: 1000,
    })

    var reader = new FileReader();
    reader.onload = (e) => {
        let arrayBuffer = e.target.result;
        let bytes = new Uint8Array(arrayBuffer);
        let bin = '';
        for (let i = 0; i < bytes.byteLength; i++) {
            bin += String.fromCharCode(bytes[i]);
        }
        let base64Data = btoa(bin);
        localStorage.setItem('save', base64Data);
    }
    reader.readAsArrayBuffer(file);

    setTimeout(() => {
        location.reload();
    }, 5000);     
});

resetGameButtons.forEach(resetGameButton => {
    let holdTime = null;

    function startHold() {
        resetGameButton.textContent = "hold to reset...";
        holdTime = setTimeout(() => {
            localStorage.removeItem('save');
            location.reload();
        }, 1500);
    }

    function endHold() {
        clearTimeout(holdTime);
        resetGameButton.textContent = "Reset Game";
    }

    resetGameButton.onmousedown = startHold;
    resetGameButton.onmouseup = endHold;
    resetGameButton.onmouseleave = endHold;
    resetGameButton.ontouchstart = (e) => { e.preventDefault(); startHold(); }
    resetGameButton.ontouchend = (e) => { e.preventDefault(); endHold(); }

})

function setSavedSettingsValues({
    musicVolume = 0.1,
    spawnSFXVolume = 0.1,
    gearSFXVolume = 0.1,
    enableAFK = false,
    disableSpawnEffects = false,
    superChexMode = false,
    cloudSaveEnabled = false,
    swagLevel = 0
} = {}) {
    gameSettings.audioSettings.musicVolume = musicVolume;
    gameSettings.audioSettings.spawnSFXVolume = spawnSFXVolume;
    gameSettings.audioSettings.gearSFXVolume = gearSFXVolume;
    gameSettings.gameplaySettings.enableAFK = enableAFK;
    gameSettings.gameplaySettings.disableSpawnEffects = disableSpawnEffects;
    gameSettings.miscSettings.superChexMode = superChexMode;
    gameSettings.miscSettings.cloudSaveEnabled = cloudSaveEnabled;
    gameSettings.miscSettings.swagLevel = swagLevel;
    updateSliders();
    updateCheckboxes();
}

export { gameSettings, setSavedSettingsValues, updateSliders, updateCheckboxes }