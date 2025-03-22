import anime from 'animejs';
import { selectRandomOre, oreDef } from "./oreDef.mjs";
import { addOre } from "./inventoryHandler.mjs";
import { handleSpawnEffects } from "./spawnEffects.mjs";
import { loadGame, saveGame } from "./profileHandler.mjs";
import { pickaxeObjectDefault } from "./pickaxes/pickaxefiles/default-pickaxe.mjs";
import { gameSettings } from "./settingsHandler.mjs";

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

const VERSION = "v0.3.1-alpha"

document.querySelector('.version').textContent = `Version: ${VERSION}`;

document.addEventListener('DOMContentLoaded', () => {
    loadGame()
})

// addOre({"Name": "Fire Crystal normal", "decimalRarity": 1 / 1250000000, "stringRarity": "1/??????????", "tier": "dreamlike"}, 1 , true)

const mineButton = document.querySelector('.pickaxeButton')

// player's items
var CURRENT_PICKAXE = pickaxeObjectDefault;
var CURRENT_GEAR = null;

const temporaryGearBonuses = {
    luck: 0,
    miningSpeed: 0
};


// base stats
const BASE_LUCK = 1;
var PICKAXE_LUCK_ADD = 0;
var MINING_SPEED = CURRENT_PICKAXE.bonuses["Speed"];
var MINE_BLOCK_AMOUNT = CURRENT_PICKAXE.bonuses["Blocks_Mined"];

const lastOreMinedVal = document.querySelector('.lastOreMinedVal');
const pickaxeLabelVal = document.querySelector('.pickaxeLabelVal');
const gearLabelVal = document.querySelector('.gearLabelVal');
const lastOreRarityVal = document.querySelector('.lastOreRarityVal')

const audioElement = document.querySelector('.audioElement')
audioElement.volume = 0.35

const audioElementSFX = document.querySelector('.audioElementSFX')
audioElementSFX.volume = 0.1

var isMining = 0;
var miningInterval;

function stopMining() {
    isMining = false;
    mineButton.classList.remove('mining');
    mineButton.classList.add('notMining');
}

function resetBonuses() {
    PICKAXE_LUCK_ADD = CURRENT_PICKAXE.bonuses["Luck"];
    MINING_SPEED = CURRENT_PICKAXE.bonuses["Speed"];
    MINE_BLOCK_AMOUNT = CURRENT_PICKAXE.bonuses["Blocks_Mined"];
}

function calcTotalBonuses() {
    resetBonuses();
    if (CURRENT_GEAR && CURRENT_GEAR.bonuses) {
        PICKAXE_LUCK_ADD += CURRENT_GEAR.bonuses["Luck"] || 0;
        MINING_SPEED += CURRENT_GEAR.bonuses["Speed"] || 0;
        MINE_BLOCK_AMOUNT += CURRENT_GEAR.bonuses["Blocks_Mined"] || 0;
    }
    PICKAXE_LUCK_ADD += temporaryGearBonuses.luck;
    MINING_SPEED += temporaryGearBonuses.miningSpeed;
    if (PICKAXE_LUCK_ADD < 0) PICKAXE_LUCK_ADD = 0;
    if (MINING_SPEED < 0) MINING_SPEED = 0;
    console.log("Total Luck: ", PICKAXE_LUCK_ADD);
    console.log("Mining Speed: ", MINING_SPEED);
}

function setCurrentPickGame(pickObj) { //set the currently equipped pick
    CURRENT_PICKAXE = pickObj
    pickaxeLabelVal.textContent = `${pickObj.name} (Tier: ${pickObj.tier})`;
    calcTotalBonuses();
    stopMining();
}

function setCurrentGearGame(gearObj) { // set the currently equipped gear
    CURRENT_GEAR = gearObj;
    stopMining();
    calcTotalBonuses();
    gearLabelVal.textContent = `${gearObj.name} (Tier: ${gearObj.tier})`;
}

const chillTiers = new Set(["exotic", "pristine", "pure", "virtuous", "angelic", "dreamlike"]);

function stopMiningifChill(oreObjects, interval) {
    if(gameSettings.disableSOC == 0) {
        const shouldStopMining = Object.values(oreObjects).some(oreData => chillTiers.has(oreData.tier));
        if(shouldStopMining) {
            console.log("hey there! see what you got!");
            stopMining();
        }
    }
}

function handleOreText(oreObj) {
    let oreLogContainer = document.querySelector(".guiOreLogMain");

    Object.entries(oreObj).forEach(([oreName, oreData]) => {
        let displayOre = oreName.replace(/-/g, ' ').replace(/_/g, '.');

        let existingEntry = Array.from(oreLogContainer.children).find(entry =>
            entry.dataset.oreName === oreName
        );

        if (existingEntry) {
            let count = parseInt(existingEntry.dataset.count) + 1;
            existingEntry.dataset.count = count;
            existingEntry.dataset.lastUpdate = Date.now();
            existingEntry.textContent = `+${count} ${displayOre} (${oreData.stringRarity})`;

            anime({
                targets: existingEntry,
                opacity: [0.6, 1],
                translateX: [-5, 0],
                duration: 300,
                easing: "easeOutQuad"
            });

        } else {
            let oreEntry = document.createElement("div");
            oreEntry.classList.add("oreEntry", oreData.tier);
            oreEntry.dataset.oreName = oreName;
            oreEntry.dataset.count = 1;
            oreEntry.dataset.lastUpdate = Date.now();
            oreEntry.textContent = `+1 ${displayOre} (${oreData.stringRarity})`;

            oreLogContainer.prepend(oreEntry);

            anime({
                targets: oreEntry,
                opacity: [0, 1],
                translateY: [2, 0],
                duration: 400,
                easing: "easeOutQuad"
            });
        }

        while (oreLogContainer.children.length > 11) {
            oreLogContainer.lastChild.remove();
        }
    });
}

setInterval(() => {
    let oreLogContainer = document.querySelector(".guiOreLogMain");
    let now = Date.now();

    Array.from(oreLogContainer.children).forEach(entry => {
        let lastUpdate = parseInt(entry.dataset.lastUpdate || 0);

        if (now - lastUpdate >= 5000) { // 5 seconds of inactivity
            anime({
                targets: entry,
                opacity: [1, 0],
                scaleY: [1, 0],
                duration: 500,
                easing: "easeInQuad",
                complete: () => entry.remove()
            });
        }
    });
}, 1000);



mineButton.onclick = () => {
    if(isMining == 0) {
        isMining = 1;
        mineButton.classList.remove('notMining')
        mineButton.classList.add('mining')
        startMining();
    } else {
        stopMining();
    }
}

function startMining() {
    isMining = true;

    function mineCycle() {
        if (!isMining) return;

        let selectedOreObject = selectRandomOre(oreDef, BASE_LUCK + PICKAXE_LUCK_ADD, MINE_BLOCK_AMOUNT);
        if (CURRENT_GEAR && CURRENT_GEAR.applyEffect) {
            CURRENT_GEAR.applyEffect(mineButton, selectedOreObject);
        }
        handleOreText(selectedOreObject);
        handleSpawnEffects(selectedOreObject);
        stopMiningifChill(selectedOreObject, miningInterval);
        addOre(selectedOreObject, true);
        saveGame();

        setTimeout(mineCycle, MINING_SPEED);
    }

    mineCycle();
}

calcTotalBonuses()

export {setCurrentPickGame, setCurrentGearGame, startMining, stopMining, isMining, audioElementSFX, calcTotalBonuses, temporaryGearBonuses, miningInterval, handleOreText}
