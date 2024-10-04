import { Pickaxe } from "../pickaxeDefaultClass.mjs";

const TitaniumChexblaster = new Pickaxe(
    "Titanium Chexblaster", // name
    {                       // bonuses
        "Luck": 0.55,
        "Speed": 6000,
        "Blocks_Mined": 1
    },
    3,                      // tier
    {                       // recipe
        "Chexquartz": { quantity: 10 },
        "Titanite": { quantity: 6 },
        "Combrolium": { quantity: 30 },
        "Chexerite": { quantity: 45 },
        "Amber": { quantity: 90 },
        "Emerald": { quantity: 70 },
        "Quartz": { quantity: 350 },
        "Iron": { quantity: 700 },
        "Rhodochrosite": { quantity: 1200 },
        "Copper": { quantity: 2000 },
        "Clay": { quantity: 4500 },
        "Stone": { quantity: 12500 }
    }
);

export { TitaniumChexblaster };
