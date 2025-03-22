import { Pickaxe } from "../pickaxeDefaultClass.mjs";

const ChexonicSpellbook = new Pickaxe (
    "Chexonic Spellbook", // name
    {  // bonuses
        "Luck": 0.5,
        "Speed": 200,
        "Blocks_Mined": 2
    },
    6, // tier
    { // recipe
        "Vitrilyx": { "quantity": 1 },
        "Iodivultrite": { "quantity": 1 },
        "Fractured-Shard-of-Normality": { "quantity": 2 },
        "Wumbus-Maximus": { "quantity": 3 },
        "Congruence-of-Time": { "quantity": 5 },
        "Areskinite": { "quantity": 10 },
        "Selenium": { "quantity": 13 },
        "Helderite": { "quantity": 15 },
        "Carnotite": { "quantity": 29 },
        "Zircon": { "quantity": 33 },
        "Ice-Fragment": { "quantity": 40 },
        "Chexquartz": { "quantity": 70 },
        "Hematite": { "quantity": 85 },
        "Chroma-Contaris": { "quantity": 100 },
        "Bornite": { "quantity": 166 },
        "Crystalline": { "quantity": 222 },
        "Ilmenite": { "quantity": 290 },
        "Combrolium": { "quantity": 470 },
        "Chexerite": { "quantity": 480 },
        "Kaolinite": { "quantity": 833 },
        "Opal": { "quantity": 870 },
        "Quartz": { "quantity": 7500 },
        "Sphalerite": { "quantity": 13500 },
        "Iron": { "quantity": 23000 },
        "Graphite": { "quantity": 62500 },
        "Copper": { "quantity": 100000 },
        "Stone": { "quantity": 400000 },
    },
    "now hold your horses! this isnt even a pickaxe! <br><br> this spellbook looks mighty useful however, looks like it could cause some Lucky Destruction <br><br> YIKES THAT RECIPE"
);

export { ChexonicSpellbook };