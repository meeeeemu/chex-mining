import { Pickaxe } from "../pickaxeDefaultClass.mjs";

const ChexforgeRavager = new Pickaxe (
    "Chexforge Ravager", // name
    {  // bonuses
        "Luck": 0,
        "Speed": 166,
        "Blocks_Mined": 1
    },
    2, // tier
    null,
    {  // recipe
        "Chexerite": { quantity: 1 },
        "Amber": { quantity: 6 },
        "Diamond": { quantity: 15 },
        "Gold": { quantity: 42 },
        "Quartz": { quantity: 60 },
        "Coal": { quantity: 450 },
        "Tin": { quantity: 550 },
        "Iron": { quantity: 210 },
        "Clay": { quantity: 2200 }
    },
    "your second pickaxe in the entire game!! (unless you chose to go with this first) <br><br> it mines at a good speed! oh... where's the luck boost... there is none... :[ <br>",
    null
);

export { ChexforgeRavager };