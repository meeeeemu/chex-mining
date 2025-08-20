import { Pickaxe } from "../pickaxeDefaultClass.mjs";

const TitaniumChexblaster = new Pickaxe(
    "Titanium Chexblaster", // name
    {                       // bonuses
        "Luck": 0.50,
        "Speed": 1000,
        "Blocks_Mined": 3
    },
    3,                      // tier
    null,
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
    },
    "well i'll be darned, its a gun. a blaster might i add! you might think blaster = big radius of blocks mined, but it's pretty much a sniper <br><br> holy moly the luck boost on this is nuts! <br><br> due to the low power of chexquartz, this thing takes a WHILE to charge again after firing a shot <br><br> maybe there's a better version of chexquartz that you can find later??? hmm?????????? maybe??????? <br>",
    null
);

export { TitaniumChexblaster };
