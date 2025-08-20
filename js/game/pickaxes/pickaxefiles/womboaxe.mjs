import { Pickaxe } from "../pickaxeDefaultClass.mjs";

const Womboaxe = new Pickaxe(
    "Womboaxe", // name
    {                      // bonuses
        "Luck": 0.4,
        "Speed": 140,
        "Blocks_Mined": 1
    },
    4,                     // tier
    null,
    {                      // recipe
        "glombo-wombo-v0_0001": { quantity: 1 },
        "Vergulium": { quantity: 1 },
        "Vanaon": { quantity: 2 },
        "Ice-Fragment": { quantity: 5 },
        "Magnesium": { quantity: 7 },
        "Uranium": { quantity: 15 },
        "Cobalt": { quantity: 17 },
        "Crystalline": { quantity: 27 },
        "Bismuth": { quantity: 50 },
        "Amber": { quantity: 72 },
        "Emerald": { quantity: 100 },
        "Quartz": { quantity: 925 },
        "Iron": { quantity: 4000 },
        "Rhodochrosite": { quantity: 12500 },
        "Copper": { quantity: 17000 },
        "Stone": { quantity: 70000 }
    },
    "goodness GRACIOUS this recipe is nuts! but i'll tell you somethin this thing can mine! <br><br> two blocks mined at once AND a luck boost! this thing is nuts! its not even slow either! <br><br> we dont entirely know what it is, (what is wombo), but it sure can mine"
);

export { Womboaxe };
