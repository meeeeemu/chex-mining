import { Pickaxe } from "../pickaxeDefaultClass.mjs";

const ChexglowDagger = new Pickaxe(
    "Chexglow Dagger", // name
    {                      // bonuses
        "Luck": 0,
        "Speed": 400,
        "Blocks_Mined": 10
    },
    4,                     // tier
    {                      // recipe
        "Glumbology-Incarnate": { quantity: 1 },
        "Bromulite": { quantity: 2 },
        "Adurite": { quantity: 3 },
        "Chexquartz": { quantity: 7 },
        "Radiosolite": { quantity: 4 },
        "Granite-Glass": { quantity: 10 },
        "Chiron": { quantity: 10 },
        "Palladium": { quantity: 40 },
        "Virotite": { quantity: 67 },
        "Amber": { quantity: 67 },
        "Diamond": { quantity: 130 },
        "Silver": { quantity: 400 },
        "Coal": { quantity: 430 },
        "Chexium": { quantity: 900 },
        "Tin": { quantity: 765 },
        "Clay": { quantity: 20000 }
    }
);

export { ChexglowDagger };
