import { Pickaxe } from "../pickaxeDefaultClass.mjs";

const ChexiumMatterManipulator = new Pickaxe(
    "Chexium Matter Manipulator", // name
    {  // bonuses
        "Luck": 0.85,
        "Speed": 550,
        "Blocks_Mined": 4 // 4 blocks per 0.5 seconds
    },
    5, // tier
    null,
    { //recipe
        "Fractured-Shard-of-Normality": { "quantity": 1 },
        "Shard-of-Saturated-Crystal": { "quantity": 2 },
        "Areskinite": { "quantity": 3 },
        "Gallinium": { "quantity": 3 },
        "Gallonite": { "quantity": 8 },
        "Cobgenual": { "quantity": 11 },
        "Magneon": { "quantity": 14 },
        "Azurite": { "quantity": 20 },
        "Fragment-of-Molten-Core": { "quantity": 23 },
        "Cyprine": { "quantity": 55 },
        "Combrolium": { "quantity": 340 },
        "Virotite": { "quantity": 350 },
        "Diamond": { "quantity": 1550 },
        "Iron": { "quantity": 23000 },
        "Chexium": { "quantity": 85000 }
    }
    ,
    "this chex device can manipulate the matter of the ores themselves, allowing you to get the ores you actually want (the luck holy moly) <br><br>",
    null
);

export { ChexiumMatterManipulator };
