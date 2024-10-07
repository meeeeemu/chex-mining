import { Pickaxe } from "../pickaxeDefaultClass.mjs";

const Womboaxe = new Pickaxe(
    "Womboaxe", // name
    {                      // bonuses
        "Luck": 0.4,
        "Speed": 140,
        "Blocks_Mined": 1
    },
    4,                     // tier
    {                      // recipe
        "glombo-wombo-v0_0001": { quantity: 1 },
        "Vergulium": { quantity: 1 },
        "Vanaon": { quantity: 2 },
        "Ice-Fragment": { quantity: 5 },
        "Magnesium": { quantity: 7 },
        "Uranium": { quantity: 15 },
        "Cobalt": { quantity: 17 },
        "Crystalline": { quantity: 27 },
        "Bismuth": { quantity: 50 },
        "Amber": { quantity: 72 },
        "Emerald": { quantity: 100 },
        "Quartz": { quantity: 925 },
        "Iron": { quantity: 4000 },
        "Rhodochrosite": { quantity: 12500 },
        "Copper": { quantity: 17000 },
        "Stone": { quantity: 70000 }
    }
);

export { Womboaxe };
