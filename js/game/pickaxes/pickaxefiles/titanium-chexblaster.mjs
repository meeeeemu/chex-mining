import { Pickaxe } from "../pickaxeDefaultClass.mjs";

const TitaniumChexblaster = new Pickaxe(
    "Titanium Chexblaster", // name
    {                       // bonuses
        "Luck": 0.50,
        "Speed": 1000,
        "Blocks_Mined": 3
    },
    3,                      // tier
    {                       // recipe
        "Chrysoberyl": { quantity: 1 },
        "Chexquartz": { quantity: 3 },
        "Titanite": { quantity: 5 },
        "Combrolium": { quantity: 17 },
        "Chexerite": { quantity: 9 },
        "Amber": { quantity: 23 },
        "Emerald": { quantity: 32 },
        "Quartz": { quantity: 260 },
        "Iron": { quantity: 1000 },
        "Rhodochrosite": { quantity: 2900 },
        "Copper": { quantity: 3900 },
        "Clay": { quantity: 7000 },
        "Stone": { quantity: 14000 }
    }
);

export { TitaniumChexblaster };
