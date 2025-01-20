import { Pickaxe } from "../pickaxeDefaultClass.mjs";

const CasinoCrusher = new Pickaxe (
    "Casino Crusher", // name
    {  // bonuses
        "Luck": 0.1,
        "Speed": 110,
        "Blocks_Mined": 2
    },
    5, // tier
    { // recipe
        "Essence-of-The-Casino": { "quantity": 1 },
        "glombo-wombo-v0_001": { "quantity": 1 },
        "Ferexium": { "quantity": 2 },
        "Vergulium": { "quantity": 4 },
        "Carium": { "quantity": 5 },
        "Magmatite": { "quantity": 7 },
        "Silidium": { "quantity": 10 },
        "Bohrium": { "quantity": 15 },
        "Ice-Fragment": { "quantity": 19 },
        "Magnesium": { "quantity": 30 },
        "Radiosolite": { "quantity": 50 },
        "Chiron": { "quantity": 65 },
        "Crystalline": { "quantity": 150 },
        "Bismuth": { "quantity": 320 },
        "Amber": { "quantity": 450 },
        "Gold": { "quantity": 5200 },
        "Quartz": { "quantity": 7000 },
        "Silver": { "quantity": 8500 },
        "Tin": { "quantity": 55000 },
        "Copper": { "quantity": 115000 },
        "Clay": { "quantity": 190000 },
        "Stone": { "quantity": 400000 }
    },
    "god damn this hammer is huge, it has the letters 777 engraved on the side. must be pretty lucky  <br><br> i wonder who made this???? "
);

export { CasinoCrusher };