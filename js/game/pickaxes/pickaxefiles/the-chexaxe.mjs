import { Pickaxe } from "../pickaxeDefaultClass.mjs";

const Chexaxe = new Pickaxe(
    "Chexaxe", // name
    {                     // bonuses
        "Luck": 0.2,
        "Speed": 800,
        "Blocks_Mined": 1
    },
    2,                    // tier
    {                     // recipe
        "Chexerite": { quantity: 1 },
        "Virotite": { quantity: 4 },
        "Emerald": { quantity: 7 },
        "Diamond": { quantity: 9 },
        "Silver": { quantity: 40 },
        "Coal": { quantity: 98 },
        "Tin": { quantity: 155 },
        "Copper": { quantity: 355 },
        "Stone": { quantity: 6500 }
    }
);

export { Chexaxe };
