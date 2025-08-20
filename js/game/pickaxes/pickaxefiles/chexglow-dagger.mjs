import { Pickaxe } from "../pickaxeDefaultClass.mjs";

const ChexglowDagger = new Pickaxe(
    "Chexglow Dagger", // name
    {                      // bonuses
        "Luck": 0,
        "Speed": 200,
        "Blocks_Mined": 3
    },
    4,                     // tier
    null,
    {                      // recipe
        "Glumbology-Incarnate": { quantity: 1 },
        "Bromulite": { quantity: 3 },
        "Adurite": { quantity: 7 },
        "Chexquartz": { quantity: 11 },
        "Radiosolite": { quantity: 15 },
        "Granite-Glass": { quantity: 38 },
        "Chiron": { quantity: 20 },
        "Palladium": { quantity: 58 },
        "Virotite": { quantity: 100 },
        "Diamond": { quantity: 350 },
        "Silver": { quantity: 1700 },
        "Coal": { quantity: 6500 },
        "Chexium": { quantity: 15000 },
        "Tin": { quantity: 8500 },
        "Clay": { quantity: 40000 }
    },
    "a tiny lil dagger! and since it's small, good lord it can MINE <br><br> it's kinda shiny too, i guess they dont call it chexglow for nothing",
    null
);

export { ChexglowDagger };
