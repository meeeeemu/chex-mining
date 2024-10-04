import { inventory, addOrefromSaveData } from "./inventoryHandler.mjs";
import { stats, updateBlocksMined } from "./miscStats.mjs";
import { ownedPickaxes } from "./pickaxes/pickaxesMain.mjs";
import { gameSettings, setSavedSettingsValues } from "./settingsHandler.mjs";
import { updateTimeWasted } from "./timer.js";
import { ownedGears } from "./gears/gearsMain.mjs";
import { Gear } from "./gears/gearDefaultClass.mjs";  
import { Pickaxe } from "./pickaxes/pickaxeDefaultClass.mjs";

function resetGame() {
    localStorage.removeItem("save");
    location.reload();
}

function saveGame() {
    try {
        const serializedGears = {};
        for (let gearName in ownedGears) {
            serializedGears[gearName] = ownedGears[gearName].toJSON();
        }
    
        const serializedPickaxes = {};
        for (let pickaxeName in ownedPickaxes) {
            serializedPickaxes[pickaxeName] = ownedPickaxes[pickaxeName].toJSON();
        }
    
        var dataToSave = {
            playerinventory: JSON.stringify(inventory),
            blocksmined: stats.blocksMined,
            timewasted: stats.timeWasted,
            ownedpickaxes: JSON.stringify(serializedPickaxes),
            ownedgears: JSON.stringify(serializedGears),
            gamesettings: JSON.stringify(gameSettings),
            firsttime: 1
        };
    
        localStorage.setItem("save", btoa(JSON.stringify(dataToSave)));
    } catch (err) {
        if (confirm("error detected with saved data, your data could be outdated, would you like to reset?")) {
            resetGame();
        } else {
            return;
        }
    }
}

function loadGame() {
    console.log("load game start");
    const loadedSave = localStorage.getItem("save");
    if (loadedSave) {
        const parsedSave = JSON.parse(atob(loadedSave));
        if (parsedSave) {
            const savePlayerInv = JSON.parse(parsedSave.playerinventory);
            const saveBlocksMined = parsedSave.blocksmined;
            const saveTimeWasted = parsedSave.timewasted;
            const saveOwnedPickaxes = JSON.parse(parsedSave.ownedpickaxes);
            const saveOwnedGears = JSON.parse(parsedSave.ownedgears);
            const saveGameSettings = JSON.parse(parsedSave.gamesettings);
            console.log(saveGameSettings);

            if (savePlayerInv) {
                const invObj = savePlayerInv;
                for (const [oreName, oreData] of Object.entries(invObj)) {
                    addOrefromSaveData(oreData.obj, oreData.quantity);
                }
            }

            if (saveBlocksMined) {
                console.log("loading blocks mined ", saveBlocksMined);
                stats.blocksMined = Number(saveBlocksMined);
                updateBlocksMined();
            }

            if (saveTimeWasted) {
                console.log("loading time wasted", saveTimeWasted);
                stats.timeWasted = Number(saveTimeWasted);
                updateTimeWasted();
            }

            if (saveOwnedPickaxes) {
                console.log("loading owned pickaxes");
                Object.values(saveOwnedPickaxes).forEach(pickaxeData => {
                    ownedPickaxes[pickaxeData.name] = Pickaxe.fromJSON(pickaxeData);
                });
            }

            if (saveOwnedGears) {
                console.log("loading owned gears");
                Object.values(saveOwnedGears).forEach(gearData => {
                    console.log(gearData);
                    ownedGears[gearData.name] = Gear.fromJSON(gearData);
                });
            }

            if (saveGameSettings) {
                console.log("loading saved settings");
                setSavedSettingsValues(Math.round(saveGameSettings.spawnEffVolume), Math.round(saveGameSettings.musicVolume), saveGameSettings.disableSOC, saveGameSettings.muteGearSounds);
            }
        } else {
            console.log("no save found!! assuming new save");
            return;
        }
    }
}

export { saveGame, loadGame, resetGame };
