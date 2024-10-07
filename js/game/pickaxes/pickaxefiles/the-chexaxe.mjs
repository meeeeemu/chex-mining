import { Pickaxe } from "../pickaxeDefaultClass.mjs";

const Chexaxe = new Pickaxe(
    "Chexaxe", // name
    {                     // bonuses
        "Luck": 0.15,
        "Speed": 330,
        "Blocks_Mined": 1
    },
    2,                    // tier
    {                     // recipe
        "Chexerite": { quantity: 1 },
        "Virotite": { quantity: 5 },
        "Emerald": { quantity: 8 },
        "Diamond": { quantity: 17 },
        "Silver": { quantity: 80 },
        "Coal": { quantity: 430 },
        "Tin": { quantity: 600 },
        "Copper": { quantity: 1100 },
        "Stone": { quantity: 4000 }
    }
);

export { Chexaxe };
