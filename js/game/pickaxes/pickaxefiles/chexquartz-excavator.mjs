import { Pickaxe } from "../pickaxeDefaultClass.mjs";

const ChexquartzExcavator = new Pickaxe(
    "Chexquartz Excavator", // name
    {                      // bonuses
        "Luck": 0.25,
        "Speed": 225,
        "Blocks_Mined": 1
    },
    3,                     // tier
    {                      // recipe
        "Chexquartz": { quantity: 5 },
        "Cobalt": { quantity: 12 },
        "Chexerite": { quantity: 25 },
        "Virotite": { quantity: 40 },
        "Quartz": { quantity: 144 },
        "Rhodochrosite": { quantity: 175 },
        "Iron": { quantity: 300 },
        "Tin": { quantity: 450 },
        "Copper": { quantity: 790 },
        "Clay": { quantity: 15000 }
    }
);

export { ChexquartzExcavator };
