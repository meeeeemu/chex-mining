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

const VERSION = "v0.2.0-alpha"

document.querySelector('.version').textContent = `Version: ${VERSION}`;

document.addEventListener('DOMContentLoaded', () => {
    loadGame()
})

// addOre({"Name": "Fire Crystal normal", "decimalRarity": 1 / 1250000000, "stringRarity": "1/??????????", "tier": "dreamlike"}, 1 , true)

const mineButton = document.querySelector('.pickaxeButton')

// player's items
var CURRENT_PICKAXE = pickaxeObjectDefault;
var CURRENT_GEAR = null;

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
    mineButton.classList.add('notMining');
    mineButton.classList.remove('mining');
    clearInterval(miningInterval);
    isMining = 0;
}

function resetBonuses() {
    PICKAXE_LUCK_ADD = CURRENT_PICKAXE.bonuses["Luck"] || 0;
    MINING_SPEED = CURRENT_PICKAXE.bonuses["Speed"] || 0;
    MINE_BLOCK_AMOUNT = CURRENT_PICKAXE.bonuses["Blocks_Mined"] || 1;
}

function calcTotalBonuses() {
    resetBonuses();
    if (CURRENT_GEAR && CURRENT_GEAR.bonuses) {
        PICKAXE_LUCK_ADD += CURRENT_GEAR.bonuses["Luck"] || 0;
        MINING_SPEED += CURRENT_GEAR.bonuses["Speed"] || 0;
        MINE_BLOCK_AMOUNT += CURRENT_GEAR.bonuses["Blocks_Mined"] || 0;
    }
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
    stopMining();
    calcTotalBonuses();
    gearLabelVal.textContent = `${gearObj.name} (Tier: ${gearObj.tier})`;

    CURRENT_GEAR = gearObj;
    console.log(CURRENT_GEAR);
    if (CURRENT_GEAR.bonuses) {
        if (CURRENT_GEAR.bonuses["Blocks_Mined"]) {
            MINE_BLOCK_AMOUNT += CURRENT_GEAR.bonuses["Blocks_Mined"];
        }
        if (CURRENT_GEAR.bonuses["Luck"]) {
            PICKAXE_LUCK_ADD += CURRENT_GEAR.bonuses["Luck"];
        }
        if (CURRENT_GEAR.bonuses["Speed"]) {
            MINING_SPEED += CURRENT_GEAR.bonuses["Speed"];
        }
    }
}

const chillTiers = new Set(["exotic", "pristine", "pure", "virtuous", "angelic", "dreamlike"]);

function stopMiningifChill(oreObjects, interval) {
    if(gameSettings.disableSOC == 0) {
        const shouldStopMining = Object.values(oreObjects).some(oreData => chillTiers.has(oreData.tier));
        if(shouldStopMining) {
            console.log("hey there! see what you got!");
            mineButton.classList.add('notMining')
            mineButton.classList.remove('mining')
            clearInterval(interval)
            isMining = 0;
        }
    } else {
        console.log("alright i guess we keep going!")
    }
}

function handleOreText(oreObj) {
    Object.entries(oreObj).forEach(([oreName, oreData]) => {
        let displayOre = oreName.replace(/-/g, ' ').replace(/_/g, '.');
        lastOreMinedVal.textContent = `${displayOre}`;
        lastOreRarityVal.textContent = `${oreData.stringRarity}`
    });
}

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
    isMining = 1;
    miningInterval = setInterval(() => {
        let selectedOreObject = selectRandomOre(oreDef, BASE_LUCK + PICKAXE_LUCK_ADD, MINE_BLOCK_AMOUNT);
        addOre(selectedOreObject, true);
        handleOreText(selectedOreObject);
        handleSpawnEffects(selectedOreObject);
        stopMiningifChill(selectedOreObject, miningInterval);
        if (CURRENT_GEAR && CURRENT_GEAR.applyEffect) {
            CURRENT_GEAR.applyEffect(mineButton);
        }
        saveGame();
    }, MINING_SPEED);
}

export {setCurrentPickGame, setCurrentGearGame, startMining, stopMining, isMining, audioElementSFX}
