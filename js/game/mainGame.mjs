import { selectRandomOre, oreDef } from "./oreDef.mjs";
import { addOre } from "./inventoryHandler.mjs";
import { handleSpawnEffects } from "./spawnEffects.mjs";
import { loadGame, saveGame } from "./profileHandler.mjs";
import { pickaxeObjectDefault } from "./pickaxes/default-pickaxe.mjs";

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

const VERSION = "v0.0.1-alpha"

document.querySelector('.version').textContent = `Version: ${VERSION}`;

document.addEventListener('DOMContentLoaded', () => {
    loadGame()
})

// addOre({"Name": "Fire Crystal normal", "decimalRarity": 1 / 1250000000, "stringRarity": "1/??????????", "tier": "dreamlike"}, 1 , true)

const mineButton = document.querySelector('.pickaxeButton')

var CURRENT_PICKAXE = pickaxeObjectDefault;

const BASE_LUCK = 1;
var PICKAXE_LUCK_ADD = CURRENT_PICKAXE.Bonuses["Luck"];
var MINING_SPEED = CURRENT_PICKAXE.Bonuses["Speed"];

let disableSOCChill = "off";

const lastOreMinedVal = document.querySelector('.lastOreMinedVal');
const pickaxeLabelVal = document.querySelector('.pickaxeLabelVal');
const lastOreRarityVal = document.querySelector('.lastOreRarityVal')
const disableStopOnChillVal = document.querySelector('.stopOnChillVal')

disableStopOnChillVal.oninput = () => {
    if(disableStopOnChillVal.checked) {
        disableSOCChill = "on";
    } else {
        disableSOCChill = "off";
    }
}

const audioElement = document.querySelector('.audioElement')
audioElement.volume = 0.35

var isMining = 0;

var miningInterval

function setCurrentPickGame(pickObj) {
    CURRENT_PICKAXE = pickObj
    pickaxeLabelVal.textContent = `${pickObj.Name} (Tier: ${pickObj.Tier})`;
    PICKAXE_LUCK_ADD = CURRENT_PICKAXE.Bonuses["Luck"];
    MINING_SPEED = CURRENT_PICKAXE.Bonuses["Speed"]; 
    if(miningInterval) {
        mineButton.classList.add('notMining');
        mineButton.classList.remove('mining');
        isMining = 0;
        clearInterval(miningInterval)
    }
}

const chillTiers = new Set(["exotic", "pristine", "pure", "virtuous", "angelic", "dreamlike"]);

function stopMiningifChill(tier, interval) {
    if(disableSOCChill == "off") {
        if(chillTiers.has(tier)) {
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

mineButton.onclick = () => {
    if(isMining == 0) {
        isMining = 1;
        mineButton.classList.remove('notMining')
        mineButton.classList.add('mining')
        miningInterval = setInterval(() => {
            let selectedOreObject = selectRandomOre(oreDef, BASE_LUCK + PICKAXE_LUCK_ADD)
            addOre(selectedOreObject, 1, true)
            lastOreMinedVal.textContent = `${selectedOreObject.Name}`;
            lastOreRarityVal.textContent = `${selectedOreObject.stringRarity}`
            handleSpawnEffects(selectedOreObject, audioElement)
            stopMiningifChill(selectedOreObject.tier, miningInterval)
            saveGame();        
        },MINING_SPEED)
    } else {
        mineButton.classList.add('notMining')
        mineButton.classList.remove('mining')
        clearInterval(miningInterval)
        isMining = 0;
    }
}



export {setCurrentPickGame}
