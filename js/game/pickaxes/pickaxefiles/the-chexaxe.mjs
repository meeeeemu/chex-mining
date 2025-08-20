import { Pickaxe, EffectConfig } from "../pickaxeDefaultClass.mjs";

const Chexaxe = new Pickaxe(
    "Chexaxe", // name
    {                     // bonuses
        "Luck": 0.15,
        "Speed": 330,
        "Blocks_Mined": 1
    },
    2, // tier
    null,                    
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
    },
    "your first Real pickaxe in the entire game!!! <br><br> it mines a block a second, and even comes with a luck boost <br>",
    null
);

export { Chexaxe };
