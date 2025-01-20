import { Pickaxe } from "../pickaxeDefaultClass.mjs";

const ChexiumMatterManipulator = new Pickaxe(
    "Chexium Matter Manipulator", // name
    {  // bonuses
        "Luck": 0.85,
        "Speed": 500,
        "Blocks_Mined": 4 // 4 blocks per 0.5 seconds
    },
    5, // tier
    {  // recipe
        "Chexium": { quantity: 85000 },
        "Iron": { quantity: 23000 },
        "Diamond": { quantity: 1550 },
        "Virotite": { quantity: 350 },
        "Combrolium": { quantity: 340 },
        "Cyprine": { quantity: 55 },
        "Fragment-of-Molten-Core": { quantity: 23 },
        "Azurite": { quantity: 20 },
        "Magneon": { quantity: 14 },
        "Cobgenual": { quantity: 11 },
        "Gallonite": { quantity: 8 },
        "Areskinite": { quantity: 3 },
        "Gallinium": { quantity: 3 },
        "Shard-of-Saturated-Crystal": { quantity: 2 },
        "Fractured-Shard-of-Normality": { quantity: 1 }
    },
    "this chex device can manipulate the matter of the ores themselves, allowing you to get the ores you actually want (the luck holy moly) <br><br>",
);

export { ChexiumMatterManipulator };
