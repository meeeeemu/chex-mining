import { Gear, EffectConfig } from "../gearDefaultClass.mjs";

const DinnerBomb = new Gear(
    "Dinner Bomb", // name
    { "Speed": 0, "Luck": 0 }, // bonuses
    {},
    4,
    new EffectConfig({
        type: 'bonus_mining',
        triggerChance: 1/65,
        cooldown: 2000,
        minBlocks: 70,
        maxBlocks: 120,
        luckModifier: -0.1,
        soundFile: './media/sfx/cn_sfx1.wav',
        description: "tasty explosion!"
    }), // effect config
    { // recipe
        "Frumbalite": { quantity: 1 },
        "Swagite": { quantity: 2 },
        "Essence-of-The-Casino": { quantity: 3 },
        "Lopetium": { quantity: 4 },
        "Glumbology-Incarnate": { quantity: 6 },
        "Carium": { quantity: 8 },
        "Gallinium": { quantity: 12 },
        "Magneon": { quantity: 18 },
        "Bohrium": { quantity: 35 },
        "Azurite": { quantity: 65 },
        "Chexquartz": { quantity: 125 },
        "Uranium": { quantity: 450 },
        "Bismuth": { quantity: 1200 },
        "Gold": { quantity: 4500 },
        "Stone": { quantity: 75000 },
    },
    "wow! this bomb tastes AWESOME, tastes of straight up dinner! what kinda dinner you may ask? who knows! whatever you like i guess",
    "> Has a 1/65 chance to mine 70 - 120 blocks on each block broken.", // bonus description
    "> 0.9x luck to blocks mined with this gear.", // penalty description
);

export { DinnerBomb };