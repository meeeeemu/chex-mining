import { inventory, addOrefromSaveData } from "./inventoryHandler.mjs";
import { stats, updateBlocksMined } from "./miscStats.mjs";
import { ownedPickaxes } from "./pickaxes/pickaxesMain.mjs";
import { gameSettings, setSavedSettingsValues } from "./settingsHandler.mjs";
import { updateTimeWasted } from "./miscStats.mjs";
import { ownedGears } from "./gears/gearsMain.mjs";
import { Gear } from "./gears/gearDefaultClass.mjs";  
import { Pickaxe } from "./pickaxes/pickaxeDefaultClass.mjs";
import { SAVE_VERSION } from "./mainGame.mjs";
import { manualGearUpdate } from "./gears/gearsGUI.mjs";
import { manualPickaxeUpdate } from "./pickaxes/pickaxeGUI.mjs";

function resetGame() {
    localStorage.removeItem("save");
    location.reload();
}

const toB64 = str => {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  bytes.forEach(b => bin += String.fromCharCode(b));
  return btoa(bin);
};

const fromB64 = b64 => {
  const bin  = atob(b64);
  const len  = bin.length;
  const buf  = new Uint8Array(len);
  for (let i = 0; i < len; i++) buf[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(buf);
};

function serializeCollection(collection) {
    if (!collection || typeof collection !== 'object') {
        return {};
    }
    
    const serialized = {};
    
    Object.entries(collection).forEach(([key, item]) => {
        if (item && typeof item.toJSON === 'function') {
            try {
                const jsonData = item.toJSON();
                serialized[key] = jsonData;
            } catch (error) {
                console.error(`failed to serialize item ${key}:`, error);
            }
        } else {
            console.warn(`item ${key} missing toJSON method:`, item);
        }
    });
    
    return serialized;
}

function safeParse(json, fallback = {}) {
    try {
        return JSON.parse(json);
    } catch {
        return fallback;
    }
}

const toObject = (maybeString, fb = {}) => 
    typeof maybeString === 'string'
    ? safeParse(maybeString, fb)
    : (maybeString && typeof maybeString === 'object' ? maybeString : fb);


async function loadCollection(serializedData, targetClass) {
    if(!serializedData) {
        return {};
    }

    const loadedItems = {};

    let dataToProcess;

    if (typeof serializedData === 'string') {
        console.log('loading collection from legacy string format');
        try {
            dataToProcess = JSON.parse(serializedData);
        } catch (err) {
            console.error('failed to parse legacy string:', err);
            return {};
        }
    } else if (Array.isArray(serializedData)) {
        console.log('loading collection from array');

        dataToProcess = {};
        serializedData.forEach(item => {
            if(item && item.name) {
                dataToProcess[item.name] = item;
            }
        });
    } else if (typeof serializedData === 'object') {
        dataToProcess = serializedData;
    } else {
        console.warn('invalid data format:', typeof serializedData);
        return {};
    }

    for(const [key, serializedItem] of Object.entries(dataToProcess)) {
        try {
            if(serializedItem && typeof targetClass.fromJSON === 'function') {
                const item = await targetClass.fromJSON(serializedItem);
                if(item && item.name) {
                    loadedItems[item.name] = item;
                } else {
                    console.warn('loaded item missing property', item);
                }
            }
        } catch (err) {
            console.error(`yeah we straight up failed to load this one: ${key}`, err)
        }
    }

    return loadedItems;
}

function mergeObject(target, source) {
    if (typeof source !== 'object' || source === null) return target;
    for(const [key, value] of Object.entries(source)) {
        if(Array.isArray(value)) {
            target[key] = value.slice();
        } else if (value && typeof value === 'object') {
            target[key] = mergeObject({ ...(target[key] || {}) }, value);
        } else {
            target[key] = value;
        }
    }
    return target;
}

function downloadBackup(b64Save, reason = 'unknown error') {
    const blob = new Blob(
        [b64Save],
        { type: 'text/plain;charset=utf-8'}
    );
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `chexData-${new Date().toISOString().slice(0, 10)}.bin`;
    a.click();
    URL.revokeObjectURL(a.href);
}

function saveGame() {
    try {

        var dataToSave = {
            version: SAVE_VERSION,
            playerinventory: JSON.stringify(inventory),
            blocksmined: stats.blocksMined,
            timewasted: stats.timeWasted,
            ownedpickaxes: serializeCollection(ownedPickaxes),
            ownedgears: serializeCollection(ownedGears),
            gamesettings: structuredClone(gameSettings),
            firsttime: 1
        };

        const encoded = toB64(JSON.stringify(dataToSave));
        localStorage.setItem("save", encoded);

        const verification = localStorage.getItem("save");
        if (verification !== encoded) {
            throw new Error("save verification failed - data mismatch");
        }

    } catch (err) {
        console.error('save failed:', err);
        const raw = localStorage.getItem('save') ?? '';
        alert('an error was detected when trying to save your data, you will be prompted to download your save data and reload the page upon closing this alert');
        downloadBackup(raw, err.name || 'generic save failure');
        location.reload();
    }
}

function galaxySave() {
    try {

        var dataToSave = {
            version: SAVE_VERSION,
            playerinventory: JSON.stringify(inventory),
            blocksmined: stats.blocksMined,
            timewasted: stats.timeWasted,
            ownedpickaxes: serializeCollection(ownedPickaxes),
            ownedgears: serializeCollection(ownedGears),
            gamesettings: structuredClone(gameSettings),
            firsttime: 1
        };

        window.top.postMessage({
            action: "save",
            slot: 0,
            label: "Save",
            summary: "save",
            data: toB64(JSON.stringify(dataToSave)),
        }, "https://galaxy.click");
    } catch (err) {
        console.error('galaxy save failed failed:', err);
    }

}

const DEFAULT_SAVE = {
    version: 0.32,
    playerinventory: {},
    blocksmined: 0,
    timewasted: 0,
    ownedpickaxes: {},
    ownedgears: {},
    gamesettings: {

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
}

async function loadGame() {
    console.log('beginning game load...');

    const b64 = localStorage.getItem('save');
    if(!b64) {
        console.log('no save found');
        return;
    }

    let parsed;

    try {
        parsed = safeParse(fromB64(b64));
    } catch (error) {
        console.error('failed to decode save data:', error);
        console.warn('something has gone very wrong, creating backup');
        downloadBackup(b64, 'corrupted save decode');
        return;
    }

    if(!parsed) {
        console.warn('something has gone very wrong, creating backup');
        downloadBackup(b64, 'corrupted save decode');
        return;
    }

    const saveVers = parsed.version || 0;
    if (saveVers < SAVE_VERSION) {
        console.log(`migrating save from version ${saveVers} to ${SAVE_VERSION}`);
        parsed = migrateSave(parsed, saveVers);
    } else if (saveVers > SAVE_VERSION) {
        console.warn(`save version ${saveVers} is from a newer version of the game (${SAVE_VERSION})`);
        alert('somehow, you have managed to find an old version of this game, and are now trying to load your save from the new version to the old one. this is risky!');
    }

    const save = mergeObject(structuredClone(DEFAULT_SAVE), parsed);

    stats.blocksMined = Number(save.blocksmined) || 0;
    updateBlocksMined();

    stats.timeWasted = Number(save.timewasted) || 0;
    updateTimeWasted();

    let inv;
    if (typeof save.playerinventory === 'string') {
        inv = toObject(save.playerinventory);
    } else {
        inv = save.playerinventory || {};
    }

    Object.values(inv).forEach(({obj, quantity}) => {
        if(obj && quantity) {
            addOrefromSaveData(obj, quantity);
        }
    });

    try {
        const loadedPickaxes = await loadCollection(save.ownedpickaxes, Pickaxe);
        const loadedGears = await loadCollection(save.ownedgears, Gear);

        Object.keys(ownedPickaxes).forEach(key => delete ownedPickaxes[key]);
        Object.assign(ownedPickaxes, loadedPickaxes);

        Object.keys(ownedGears).forEach(key => delete ownedGears[key]);
        Object.assign(ownedGears, loadedGears);
    } catch (err) {
        console.error('failed to load equipment collections', err);
    }

    try {
        mergeObject(gameSettings, save.gamesettings || {});
    } catch (err) {
        console.error('failed to load game settings:', err);
    }

    console.log(validateSaveData(save));

    manualGearUpdate();
    manualPickaxeUpdate();

    console.log('game loaded successfully');
}

function migrateSave(saveData, fromVersion) {
    console.log(`migrating save from version ${fromVersion}`);
    if (fromVersion === 0 || !saveData.version) {

        if(typeof saveData.ownedpickaxes === 'string') {
            try {
                saveData.ownedpickaxes = JSON.parse(saveData.ownedpickaxes);
            } catch (err) {
                console.error('failed to parse legacy ownedpickaxes:', err);
                saveData.ownedPickaxes = {};
            }
        }
    

        if (typeof saveData.ownedgears === 'string') {
            try {
                saveData.ownedgears = JSON.parse(saveData.ownedgears);
            } catch (err) {
                console.error('failed to parse legacy ownedgears:', err);
                saveData.ownedgears = {};
            }
        }

        if (typeof saveData.gamesettings === 'string') {
            try {
                const oldSettings = JSON.parse(saveData.gamesettings);
                saveData.gamesettings = {
                    audioSettings: {
                        musicVolume: (oldSettings.musicVolume || 0) / 10,
                        spawnSFXVolume: (oldSettings.spawnEffVolume || 5) / 50,
                        gearSFXVolume: oldSettings.muteGearSounds ? 0 : 0.1
                    },
                    gameplaySettings: {
                        enableAFK: false,
                        disableSpawnEffects: false,
                        skipMainMenu: false,
                        disableStopOnChill: oldSettings.disableSOC === 1
                    },
                    miscSettings: {
                        superChexMode: false,
                        cloudSaveEnabled: false,
                        swagLevel: 0
                    }
                };
            } catch (err) {
                console.error('failed to parse legacy settings:', err);
                saveData.gamesettings = structuredClone(DEFAULT_SAVE.gamesettings);
            }
        }
        
        if (saveData.ownedpickaxes && typeof saveData.ownedpickaxes === 'object') {
            Object.values(saveData.ownedpickaxes).forEach(pickaxe => {
                if (pickaxe && !pickaxe.hasOwnProperty('equipped')) {
                    pickaxe.equipped = false;
                }
            });
        }

        fromVersion = 0.32;
    }

    console.log(validateSaveData(saveData));

    return saveData;
}

function validateSaveData(saveData) {
    const issues = [];
    
    if (!saveData.version) issues.push('missing version (legacy save?)');
    if (!saveData.playerinventory) issues.push('missing player inventory');
    if (typeof saveData.blocksmined !== 'number') issues.push('invalid blocks mined');
    if (typeof saveData.timewasted !== 'number') issues.push('invalid time wasted');
    
    if (!saveData.ownedpickaxes) {
        issues.push('missing owned pickaxes');
    } else if (typeof saveData.ownedpickaxes === 'string') {
        try {
            JSON.parse(saveData.ownedpickaxes);
        } catch {
            issues.push('invalid owned pickaxes JSON string');
        }
    } else if (typeof saveData.ownedpickaxes !== 'object') {
        issues.push('invalid owned pickaxes format');
    }
    
    if (!saveData.ownedgears) {
        issues.push('missing owned gears');
    } else if (typeof saveData.ownedgears === 'string') {
        try {
            JSON.parse(saveData.ownedgears);
        } catch {
            issues.push('invalid owned gears JSON string');
        }
    } else if (typeof saveData.ownedgears !== 'object') {
        issues.push('invalid owned gears format');
    }
    
    if (!saveData.gamesettings) {
        issues.push('missing game settings');
    } else if (typeof saveData.gamesettings === 'string') {
        try {
            JSON.parse(saveData.gamesettings);
        } catch {
            issues.push('invalid game settings JSON string');
        }
    } else if (typeof saveData.gamesettings !== 'object') {
        issues.push('invalid game settings format');
    }
    
    return issues;
}

export { saveGame, loadGame, resetGame, galaxySave };
