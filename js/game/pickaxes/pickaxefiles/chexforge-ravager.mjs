import { Pickaxe } from "../pickaxeDefaultClass.mjs";

const ChexforgeRavager = new Pickaxe (
    "Chexforge Ravager", // name
    {  // bonuses
        "Luck": 0,
        "Speed": 200,
        "Blocks_Mined": 2
    },
    2, // tier
    {  // recipe
        "Chexerite": { quantity: 1 },
        "Amber": { quantity: 3 },
        "Diamond": { quantity: 6 },
        "Gold": { quantity: 30 },
        "Quartz": { quantity: 65 },
        "Coal": { quantity: 60 },
        "Tin": { quantity: 110 },
        "Iron": { quantity: 200 },
        "Stone": { quantity: 6500 }
    }
);

export { ChexforgeRavager };