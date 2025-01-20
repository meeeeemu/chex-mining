import { Pickaxe } from "../pickaxeDefaultClass.mjs";

const Chexstick = new Pickaxe(
    "Chexstick", // name
    {                       // bonuses
        "Luck": 0,
        "Speed": 250,
        "Blocks_Mined": 1
    },
    1,                      // tier
    {                       // recipe
        "Chexwood": { quantity: 4 },
        "Silver": { quantity: 10 },
        "Coal": { quantity: 65 },
        "Chexium": { quantity: 120 },
        "Clay": { quantity: 350 },
        "Stone": { quantity: 800 },
    },
    "this... is a stick! it has some chex mix thrown onto it. kinda icky, i dont even wanna think about picking this thing up <br><br> it mines quite a bit though, a good starter stick i'd say <br>"
);

export { Chexstick };
