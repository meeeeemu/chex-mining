
//         _                 _ _ _ 
//        | |               | | | |
//    __ _| |__   ___  _   _| | | |
//   / _` | '_ \ / _ \| | | | | | |
//  | (_| | | | | (_) | |_| |_|_|_|
//   \__,_|_| |_|\___/ \__, (_|_|_)
//                      __/ |      
//                     |___/       

import { caveSpawn } from "./spawnEffects.mjs";

// have fun looking through my probably absolutely GARBAGE code :)
// take what you like if you find it useful, no need for credits

//(yes all the ores are just in one big object)

const oreDef = {
    "stone": {"Name": "Stone", "decimalRarity": 1 / 1, "stringRarity": "1/1", "tier": "common"},
    "clay": {"Name": "Clay", "decimalRarity": 1 / 2, "stringRarity": "1/2", "tier": "common"},
    "copper": {"Name": "Copper", "decimalRarity": 1 / 4, "stringRarity": "1/4", "tier": "common"},
    "rhodochrosite": {"Name": "Rhodochrosite", "decimalRarity": 1 / 6, "stringRarity": "1/6", "tier": "common"},
    "tin": {"Name": "Tin", "decimalRarity": 1 / 8, "stringRarity": "1/8", "tier": "common"},
    "coal": {"Name": "Coal", "decimalRarity": 1 / 10, "stringRarity": "1/10", "tier": "common"},
    "iron": {"Name": "Iron", "decimalRarity": 1 / 20, "stringRarity": "1/20", "tier": "common"},
    "silver": {"Name": "Silver", "decimalRarity": 1 / 55, "stringRarity": "1/55", "tier": "common"},
    "quartz": {"Name": "Quartz", "decimalRarity": 1 / 70, "stringRarity": "1/70", "tier": "common"},
    "gold": {"Name": "Gold", "decimalRarity": 1 / 100, "stringRarity": "1/100", "tier": "common"},
    "diamond": {"Name": "Diamond", "decimalRarity": 1 / 300, "stringRarity": "1/300", "tier": "common"},
    "emerald": {"Name": "Emerald", "decimalRarity": 1 / 750, "stringRarity": "1/750", "tier": "common"},

    "amber": {"Name": "Amber", "decimalRarity": 1 / 1000, "stringRarity": "1/1000", "tier": "uncommon"},
    "virotite": {"Name": "Virotite", "decimalRarity": 1 / 1150, "stringRarity": "1/1250", "tier": "uncommon"},
    "chexerite": {"Name": "Chexerite", "decimalRarity": 1 / 1250, "stringRarity": "1/3650", "tier": "uncommon"},
    "combrolium": {"Name": "Combrolium", "decimalRarity": 1 / 1277, "stringRarity": "1/1277", "tier": "uncommon"},
    "bismuth": {"Name": "Bismuth", "decimalRarity": 1 / 1500, "stringRarity": "1/1500", "tier": "uncommon"},
    "palladium": {"Name": "Palladium", "decimalRarity": 1 / 2500, "stringRarity": "1/2500", "tier": "uncommon"},
    "crystalline": {"Name": "Crystalline", "decimalRarity": 1 / 3000, "stringRarity": "1/3000", "tier": "uncommon"},
    "sodium": {"Name": "Sodium", "decimalRarity": 1 / 3050, "stringRarity": "1/3050", "tier": "uncommon"},
    "granite-glass": {"Name": "Granite-Glass", "decimalRarity": 1 / 3450, "stringRarity": "1/3450", "tier": "uncommon"},
    "cobalt": {"Name": "Cobalt", "decimalRarity": 1 / 5000, "stringRarity": "1/5000", "tier": "uncommon"},
    "chroma-contaris": {"Name": "Chroma-Contaris", "decimalRarity": 1 / 5150, "stringRarity": "1/5150", "tier": "uncommon"},
    "chiron": {"Name": "Chiron", "decimalRarity": 1 / 7500, "stringRarity": "1/7500", "tier": "uncommon"},
    "xenofate": {"Name": "Xenofate", "decimalRarity": 1 / 8200, "stringRarity": "1/8200", "tier": "uncommon"},
    "cyprine": {"Name": "Cyprine", "decimalRarity": 1 / 8450, "stringRarity": "1/8450", "tier": "uncommon"},
    "radiosolite": {"Name": "Radiosolite", "decimalRarity": 1 / 8900, "stringRarity": "1/8900", "tier": "uncommon"},
    "uranium": {"Name": "Uranium", "decimalRarity": 1 / 9000, "stringRarity": "1/5000", "tier": "uncommon"},
    "titanite": {"Name": "Titanite", "decimalRarity": 1 / 9999, "stringRarity": "1/9999", "tier": "uncommon"},

    "chexquartz": {"Name": "Chexquartz", "decimalRarity": 1 / 10000, "stringRarity": "1/10000", "tier": "rare"},
    "chrysoberyl": {"Name": "Chrysoberyl", "decimalRarity": 1 / 10500, "stringRarity": "1/10500", "tier": "rare"},
    "magnesium": {"Name": "Magnesium", "decimalRarity": 1 / 16200, "stringRarity": "1/16200", "tier": "rare"},
    "fragment-of-molten-core": {"Name": "Fragment-of-Molten-Core", "decimalRarity": 1 / 20000, "stringRarity": "1/20000", "tier": "rare"},
    "adurite": {"Name": "Adurite", "decimalRarity": 1 / 19000, "stringRarity": "1/19000", "tier": "rare"},
    "vixuvium": {"Name": "Vixuvium", "decimalRarity": 1 / 21200, "stringRarity": "1/21200", "tier": "rare"},
    "corrodine": {"Name": "Corrodine", "decimalRarity": 1 / 22222, "stringRarity": "1/22222", "tier": "rare"},
    "ice-fragment": {"Name": "Ice-Fragment", "decimalRarity": 1 / 23232, "stringRarity": "1/23232", "tier": "rare"},
    "azurite": {"Name": "Azurite", "decimalRarity": 1 / 25000, "stringRarity": "1/25000", "tier": "rare"},
    "hafnium": {"Name": "Hafnium", "decimalRarity": 1 / 29252, "stringRarity": "1/29252", "tier": "rare"},
    "bohrium": {"Name": "Bohrium", "decimalRarity": 1 / 31520, "stringRarity": "1/31520", "tier": "rare"},
    "magneon": {"Name": "Magneon", "decimalRarity": 1 / 35000, "stringRarity": "1/35000", "tier": "rare"},

    "helderite": {"Name": "Helderite", "decimalRarity": 1 / 36500, "stringRarity": "1/36500", "tier": "master"},
    "bromulite": {"Name": "Bromulite", "decimalRarity": 1 / 42500, "stringRarity": "1/42500", "tier": "master"},
    "cobgenual": {"Name": "Cobgenual", "decimalRarity": 1 / 43525, "stringRarity": "1/43525", "tier": "master"},
    "silidium": {"Name": "Silidium", "decimalRarity": 1 / 50000, "stringRarity": "1/50000", "tier": "master"},
    "lytholium": {"Name": "Lytholium", "decimalRarity": 1 / 52502, "stringRarity": "1/52502", "tier": "master"},
    "selenium": {"Name": "Selenium", "decimalRarity": 1 / 55555, "stringRarity": "1/55555", "tier": "master"},
    "krypinum": {"Name": "Krypinum", "decimalRarity": 1 / 56665, "stringRarity": "1/56665", "tier": "master"},
    "vanaon": {"Name": "Vanaon", "decimalRarity": 1 / 58552, "stringRarity": "1/58552", "tier": "master"},
    "gallonite": {"Name": "Gallonite", "decimalRarity": 1 / 60000, "stringRarity": "1/60000", "tier": "master"},
    "magmatite": {"Name": "Magmatite", "decimalRarity": 1 / 62002, "stringRarity": "1/62002", "tier": "master"},
    "carium": {"Name": "Carium", "decimalRarity": 1 / 80008, "stringRarity": "1/80008", "tier": "master"},
    "areskinite": {"Name": "Areskinite", "decimalRarity": 1 / 99998, "stringRarity": "1/99998", "tier": "master"},
    "gallinium": {"Name": "Gallinium", "decimalRarity": 1 / 99999, "stringRarity": "1/99999", "tier": "master"},

    "confolium": {"Name": "Confolium", "decimalRarity": 1 / 125000, "stringRarity": "1/125000", "tier": "unreal"},
    "kongregite": {"Name": "Kongregite", "decimalRarity": 1 / 101106, "stringRarity": "1/101106", "tier": "unreal"},
    "glombo-wombo-v0_0001": {"Name": "glombo-wombo-v0_0001", "decimalRarity": 1 / 150000, "stringRarity": "1/150000", "tier": "unreal"},
    "vergulium": {"Name": "Vergulium", "decimalRarity": 1 / 175555, "stringRarity": "1/175555", "tier": "unreal"},
    "termalium": {"Name": "Termalium", "decimalRarity": 1 / 200000, "stringRarity": "1/200000", "tier": "unreal"},
    "congruence-of-time": {"Name": "Congruence-of-Time", "decimalRarity": 1 / 222222, "stringRarity": "1/222222", "tier": "unreal"},
    "shard-of-saturated-crystal": {"Name": "Shard-of-Saturated-Crystal", "decimalRarity": 1 / 250000, "stringRarity": "1/250000", "tier": "unreal"},
    "convululiolite": {"Name": "Convululiolite", "decimalRarity": 1 / 350000, "stringRarity": "1/350000", "tier": "unreal"},
    "cologiolite": {"Name": "Cologiolite", "decimalRarity": 1 / 376566, "stringRarity": "1/376566", "tier": "unreal"},
    "ferexium": {"Name": "Ferexium", "decimalRarity": 1 / 419200, "stringRarity": "1/425200", "tier": "unreal"},
    "gamergodium": {"Name": "Gamergodium", "decimalRarity": 1 / 420666, "stringRarity": "1/420666", "tier": "unreal"},
    "glumbology-incarnate": {"Name": "Glumbology-Incarnate", "decimalRarity": 1 / 500500, "stringRarity": "1/500500", "tier": "unreal"},
    "lopetium": {"Name": "Lopetium", "decimalRarity": 1 / 620000, "stringRarity": "1/620000", "tier": "unreal"},
    "essence-of-the-casino": {"Name": "Essence-of-The-Casino", "decimalRarity": 1 / 777777, "stringRarity": "1/777777", "tier": "unreal"},

    "glombo-wombo-v0_001": {"Name": "glombo-wombo-v0_001", "decimalRarity": 1 / 1000000, "stringRarity": "1/1000000", "tier": "exotic"},
    "crystalanium": {"Name": "Crystalanium", "decimalRarity": 1 / 1252020, "stringRarity": "1/1252020", "tier": "exotic"},
    "fractured-shard-of-normality": {"Name": "Fractured-Shard-of-Normality", "decimalRarity": 1 / 1750250, "stringRarity": "1/1750250", "tier": "exotic"},
    "guldovium": {"Name": "Guldovium", "decimalRarity": 1 / 1825002, "stringRarity": "1/1825002", "tier": "exotic"},
    "frumbalite": {"Name": "Frumbalite", "decimalRarity": 1 / 2000000, "stringRarity": "1/2000000", "tier": "exotic"},
    "consuvium": {"Name": "Consuvium", "decimalRarity": 1 / 2000001, "stringRarity": "1/2000001", "tier": "exotic"},
    "swagite": {"Name": "Swagite", "decimalRarity": 1 / 2556500, "stringRarity": "1/2556500", "tier": "exotic"},
    "enhanced-chexquartz": {"Name": "Enhanced-Chexquartz", "decimalRarity": 1 / 3090009, "stringRarity": "1/2556500", "tier": "exotic"},
    "convexium": {"Name": "Convexium", "decimalRarity": 1 / 2925200, "stringRarity": "1/2925200", "tier": "exotic"},
    "iodivultrite": {"Name": "Iodivultrite", "decimalRarity": 1 / 3252002, "stringRarity": "1/3252002", "tier": "exotic"},
    "pulviodirium": {"Name": "Pulviodirium", "decimalRarity": 1 / 4052323, "stringRarity": "1/3452323", "tier": "exotic"},
    "linux": {"Name": "Linux", "decimalRarity": 1 / 4444444, "stringRarity": "1/Linux", "tier": "exotic"},
    "cometricite": {"Name": "Cometricite", "decimalRarity": 1 / 4565224, "stringRarity": "1/4565224", "tier": "exotic"},
    "glombolium": {"Name": "Glombolium", "decimalRarity": 1 / 4999999, "stringRarity": "1/4999999", "tier": "exotic"},

    "glombo-wombo-v0_01": {"Name": "glombo-wombo-v0_01", "decimalRarity": 1 / 5000000, "stringRarity": "1/5000000", "tier": "pristine"},
    "vitrilyx": {"Name": "Vitrilyx", "decimalRarity": 1 / 7555552, "stringRarity": "1/7555552", "tier": "pristine"},
    "kaleidium": {"Name": "Kaleidium", "decimalRarity": 1 / 7878000, "stringRarity": "1/10252953", "tier": "pristine"},
    "atomium": {"Name": "Atomium", "decimalRarity": 1 / 8000000, "stringRarity": "1/8000000", "tier": "pristine"},
    "decelerite": {"Name": "Decelerite", "decimalRarity": 1 / 9252953, "stringRarity": "1/9252953", "tier": "pristine"},
    "euclideum": {"Name": "Euclideum", "decimalRarity": 1 / 10252953, "stringRarity": "1/10252953", "tier": "pristine"},
    "laivertine": {"Name": "Laivertine", "decimalRarity": 1 / 12000000, "stringRarity": "1/14000000", "tier": "pristine"},
    "electrivite": {"Name": "Electrivite", "decimalRarity": 1 / 13200050, "stringRarity": "1/14200050", "tier": "pristine"},
    "Adolium": {"Name": "Adolium", "decimalRarity": 1 / 14200050, "stringRarity": "1/14200050", "tier": "pristine"},
    "fracture of normality": {"Name": "Fracture of Normality", "decimalRarity": 1 / 14777777, "stringRarity": "1/14777777", "tier": "pristine"},
    "windows": {"Name": "Windows", "decimalRarity": 1 / 20111985, "stringRarity": "1/20111985", "tier": "pristine"},
    "wombolium": {"Name": "Wombolium", "decimalRarity": 1 / 24999999, "stringRarity": "1/24999999", "tier": "pristine"},

    "glombo-wombo-v0_1": {"Name": "glombo-wombo-v0_1", "decimalRarity": 1 / 25000000, "stringRarity": "1/25000000", "tier": "pure"},
    "fire-crystal-abnormal": {"Name": "fire-crystal-abnormal", "decimalRarity": 1 / 26022022, "stringRarity": "1/26022022", "tier": "pure"},
    "cleoistium": {"Name": "Cleoistium", "decimalRarity": 1 / 29440044, "stringRarity": "1/29440044", "tier": "pure"},
    "azuringalium": {"Name": "Azuringalium", "decimalRarity": 1 / 32112112, "stringRarity": "1/32112112", "tier": "pure"},
    "xynarite": {"Name": "Xynarite", "decimalRarity": 1 / 39122515, "stringRarity": "1/39122515", "tier": "pure"},
    "vulkivium": {"Name": "Vulkivium", "decimalRarity": 1 / 42165342, "stringRarity": "1/42165342", "tier": "pure"},
    "fractured aetheal": {"Name": "Fractured Aetheal", "decimalRarity": 1 / 47555555, "stringRarity": "1/47555555", "tier": "pure"},
    "shard-of-normality": {"Name": "Shard-of-Normality", "decimalRarity": 1 / 49025025, "stringRarity": "1/49025025", "tier": "pure"},
    "glacium": {"Name": "Glacium", "decimalRarity": 1 / 49425025, "stringRarity": "1/49425025", "tier": "pure"},
    "erodivite": {"Name": "Erodivite", "decimalRarity": 1 / 49922735, "stringRarity": "1/49922735", "tier": "pure"},
    "glombwomb-supreme": {"Name": "glombwomb-supreme", "decimalRarity": 1 / 49999999, "stringRarity": "1/49999999", "tier": "pure"},

    "glombo-wombo-v0_5": {"Name": "glombo-wombo-v0_5", "decimalRarity": 1 / 50000000, "stringRarity": "1/50000000", "tier": "virtuous"},
    "magnetium": {"Name": "Magnetium", "decimalRarity": 1 / 54030040, "stringRarity": "1/54030040", "tier": "virtuous"},
    "astral-deity": {"Name": "Astral-Deity", "decimalRarity": 1 / 59233233, "stringRarity": "1/59233233", "tier": "virtuous"},
    "cosmosium": {"Name": "Cosmosium", "decimalRarity": 1 / 60737542, "stringRarity": "1/60737542", "tier": "virtuous"},
    "fire-crystal-off": {"Name": "fire-crystal-off", "decimalRarity": 1 / 65000000, "stringRarity": "1/65000000", "tier": "virtuous"},
    "aetheal": {"Name": "Aetheal", "decimalRarity": 1 / 72550552, "stringRarity": "1/72550552", "tier": "virtuous"},
    "flare-of-iridescent-specularity": {"Name": "Flare-of-Iridescent-Specularity", "decimalRarity": 1 / 77676544, "stringRarity": "1/77676544", "tier": "virtuous"},
    "the-entire-casino": {"Name": "the-entire-casino", "decimalRarity": 1 / 77777777, "stringRarity": "1/77777777", "tier": "virtuous"},
    "potentia-florum": {"Name": "Potentia-Florum", "decimalRarity": 1 / 78755545, "stringRarity": "1/78755545", "tier": "virtuous"},
    "puer-glaciei": {"Name": "Puer-Glaciei", "decimalRarity": 1 / 89999999, "stringRarity": "1/89999999", "tier": "virtuous"},
    "praeter-futurum": {"Name": "Praeter-Futurum", "decimalRarity": 1 / 99999999, "stringRarity": "1/99999999", "tier": "virtuous"},

    "glombo-wombo-v0_99": {"Name": "glombo-wombo-v0_99", "decimalRarity": 1 / 100000000, "stringRarity": "1/100000000", "tier": "angelic"},
    "glombwomb-omega": {"Name": "glombwomb-omega", "decimalRarity": 1 / 125000000, "stringRarity": "1/125000000", "tier": "angelic"},
    "crystal-of-normality": {"Name": "Crystal-of-Normality", "decimalRarity": 1 / 250000000, "stringRarity": "1/250000000", "tier": "angelic"},
    "true-aetheal": {"Name": "True-Aetheal", "decimalRarity": 1 / 340000000, "stringRarity": "1/340000000", "tier": "angelic"},
    "hyperflorium": {"Name": "Hyperflorium", "decimalRarity": 1 / 360000000, "stringRarity": "1/360000000", "tier": "angelic"},
    "futurum-flos-floret": {"Name": "Futurum-Flos-Floret", "decimalRarity": 1 / 444444444, "stringRarity": "1/444444444", "tier": "angelic"},
    "aqua-fluit-gratis": {"Name": "Aqua-Fluit-Gratis", "decimalRarity": 1 / 525000422, "stringRarity": "1/525000422", "tier": "angelic"},
    "scendolia": {"Name": "Scendolia", "decimalRarity": 1 / 725000422, "stringRarity": "1/725000422", "tier": "angelic"},
      
    "fire-Crystal-normal": {"Name": "Fire-Crystal-normal", "decimalRarity": 1 / 1250000000, "stringRarity": "1/1250000000", "tier": "dreamlike"},
    "wanderioum": {"Name": "Wanderioum", "decimalRarity": 1 / 1750000000, "stringRarity": "1/1750000000", "tier": "dreamlike"},
    "ASTHMA": {"Name": "ASTHMA", "decimalRarity": 1 / 2250001616, "stringRarity": "1/2250001616", "tier": "dreamlike"},
    "Ishmshl": {"Name": "Ishmshl", "decimalRarity": 1 / 2525121225, "stringRarity": "1/2525121225", "tier": "dreamlike"},
    "the-ring-ore": {"Name": "the-ring-ore", "decimalRarity": 1 / 9876543212, "stringRarity": "1/9876543212", "tier": "dreamlike"},
    "hsjsedesHhvddfrcsd-glombo-wombo-casino": {"Name": "hsjsedesHhvddfrcsd-glombo-wombo-casino", "decimalRarity": 1 / 7777777777, "stringRarity": "1/7777777777", "tier": "dreamlike"}

};

var caveChances = {
    "standardCave": {"decimalRarity": 1 / 2000, "Name": "Standard Cave"},
    "illuminousCave": {"decimalRarity": 1 / 3500, "Name": "Illuminous Cave"},
    "astralCave": {"decimalRarity": 1 / 5750, "Name": "Astral Cave"},
}

function selectRandomOre(ores, luck, quantity) {
    let totalWeight = 0;
    let scaledWeights = {};
    let minedOres = {};

    Object.values(ores).forEach(ore => {
        let scaledWeight = Math.pow(ore["decimalRarity"], 1 / luck);
        scaledWeights[ore["Name"]] = scaledWeight;
        totalWeight += scaledWeight;
    });

    function selOre() {
        let rng = Math.random() * totalWeight;

        for (const [oreKey, ore] of Object.entries(ores)) {
            if (rng < scaledWeights[ore["Name"]]) {
                return ore;
            }
            rng -= scaledWeights[ore["Name"]];
        }

        return null;

    }

    function findCave(caveChances) {
        for (const [caveName, cave] of Object.entries(caveChances)) {
            if (Math.random() < cave["decimalRarity"]) {
                return cave["Name"];
            }
        }
        return null;
    }

    let totalQuantity = quantity;
    let spawnEffect = false;

    for (let i = 0; i < quantity; i++) {
        const foundCave = findCave(caveChances);
        if (foundCave) {
            const additionalQuantity = Math.floor(Math.random() * (800 - 4 + 1)) + 4;
            totalQuantity += additionalQuantity;
            if (!spawnEffect) {
                caveSpawn(additionalQuantity, foundCave);
                spawnEffect = true;
            }
        } else {
            continue;
        }
    }

    for (let i = 0; i < totalQuantity; i++) {
        let selectedOre = selOre();
        if (selectedOre) {
            if (!minedOres[selectedOre["Name"]]) {
                minedOres[selectedOre["Name"]] = {...selectedOre, "quantity": 0};
            }
            minedOres[selectedOre["Name"]]["quantity"] += 1;
        }
    }
    
    return minedOres;
}


export {oreDef, selectRandomOre}