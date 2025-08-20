import { Pickaxe } from "../pickaxeDefaultClass.mjs";

const UrleiantorPrime = new Pickaxe(
    "Urleinator Prime", // name
    {                     // bonuses
        "Luck": 0.125,
        "Speed": 135,
        "Blocks_Mined": 3
    },
    6,                    // tier
    null,
    {                     // recipe
        "Urleincarnate": { quantity: 2 },
        "Cometricite": { quantity: 2 },
        "Lopetium": { quantity: 11 },
        "Termalium": { quantity: 13 },
        "Magmatite": { quantity: 15 },
        "Urleination": { quantity: 20 },
        "Magneon": { quantity: 24 },
        "Bohrium": { quantity: 30 },
        "Hafnium": { quantity: 32 },
        "Azurite": { quantity: 42 },
        "Adurite": { quantity: 49 },
        "Coltanite": { quantity: 70 },
        "Chexquartz": { quantity: 78 },
        "Cyprine": { quantity: 85 },
        "Sodium": { quantity: 138 },
        "Crystalline": { quantity: 189 },
        "Viunium": { quantity: 360 },
        "Chexwood": { quantity: 1350 },
        "Sphalerite": { quantity: 3500 },
        "Coal": { quantity: 4500 },
        "Graphite": { quantity: 10200 },
        "Glombus": { quantity: 35000 },
        "Clay": { quantity: 75000 },
        "Deepslate": { quantity: 250000 },
        "Stone": { quantity: 650000 },
    },
    "oh hey its urle!!<br> urle will help you in times of need, thank you urle",
    null
);

export { UrleiantorPrime };
