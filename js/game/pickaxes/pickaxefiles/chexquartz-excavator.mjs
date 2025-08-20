import { Pickaxe } from "../pickaxeDefaultClass.mjs";

const ChexquartzExcavator = new Pickaxe(
    "Chexquartz Excavator", // name
    {                      // bonuses
        "Luck": 0.1,
        "Speed": 150,
        "Blocks_Mined": 1
    },
    3,                     // tier
    null,
    {                      // recipe
        "Chexquartz": { quantity: 4 },
        "Cobalt": { quantity: 6 },
        "Chexerite": { quantity: 8 },
        "Virotite": { quantity: 22 },
        "Quartz": { quantity: 250 },
        "Rhodochrosite": { quantity: 3000 },
        "Iron": { quantity: 850 },
        "Tin": { quantity: 2200 },
        "Copper": { quantity: 4000 },
        "Clay": { quantity: 7500 }
    },
    "forged from the elusive chexquartz, which wasnt an ore in this game until i decided to make it now! <br><br> not only does this mine at a good speed, but it has a luck boost! now we're advancing in the game! <br></br>",
    null
);

export { ChexquartzExcavator };
