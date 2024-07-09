import { inventory, addOrefromSaveData } from "./inventoryHandler.mjs";
import { stats, updateBlocksMined } from "./miscStats.mjs";
import { ownedPickaxes } from "./pickaxes/pickaxesMain.mjs";
import { gameSettings, setSavedSettingsValues } from "./settingsHandler.mjs";
import { updateTimeWasted } from "./timer.js";

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
// oh and if you want to edit your save, go right ahead!! have fun with the game in your own way

function resetGame() {
    localStorage.removeItem("save");
    location.reload();
}

function saveGame() {
    var dataToSave = {
        playerinventory: JSON.stringify(inventory),
        blocksmined: stats.blocksMined,
        timewasted: stats.timeWasted,
        ownedpickaxes: JSON.stringify(ownedPickaxes),
        gamesettings: JSON.stringify(gameSettings),
        firsttime: 1
    }
    localStorage.setItem("save", btoa(JSON.stringify(dataToSave)));
}

function loadGame() {
    console.log("load game start");
    const loadedSave = localStorage.getItem("save")
    if(loadedSave) {
        const parsedSave = JSON.parse(atob(loadedSave))
        if(parsedSave) {
            const savePlayerInv = JSON.parse(parsedSave.playerinventory);
            const saveBlocksMined = parsedSave.blocksmined;
            const saveTimeWasted = parsedSave.timewasted;
            const saveOwnedPickaxes = JSON.parse(parsedSave.ownedpickaxes);
            const saveGameSettings = JSON.parse(parsedSave.gamesettings);
            console.log(saveGameSettings);
            if(savePlayerInv) {
                const invObj = savePlayerInv;
                for(const [oreName, oreData] of Object.entries(invObj)) {
                    addOrefromSaveData(oreData.obj, oreData.quantity)
                }
            }
            if(saveBlocksMined) {
                console.log("loading blocks mined ", saveBlocksMined);
                stats.blocksMined = Number(saveBlocksMined);
                updateBlocksMined()
            }
            if(saveTimeWasted) {
                console.log("loading time wasted", saveTimeWasted);
                stats.timeWasted = Number(saveTimeWasted);
                updateTimeWasted()
            }
            if(saveOwnedPickaxes) {
                console.log("loading owned pickaxes");
                Object.values(saveOwnedPickaxes).forEach(pickaxe => {
                    ownedPickaxes[pickaxe.Name] = saveOwnedPickaxes[pickaxe.Name];
                });
            }
            if(saveGameSettings) {
                console.log("loading saved settings");
                setSavedSettingsValues(Math.round(saveGameSettings.spawnEffVolume), Math.round(saveGameSettings.musicVolume), saveGameSettings.disableSOC)
            } 
        } else {
            console.log("no save found!! assuming new save");
            return 
        }
    }

}

export {saveGame, loadGame, resetGame}