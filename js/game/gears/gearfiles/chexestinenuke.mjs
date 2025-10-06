import { Gear, EffectConfig } from "../gearDefaultClass.mjs";

const ChexestineNuke = new Gear(
    "Chexestine Nuke", // name
    { "Speed": 0, "Luck": 0 }, // bonuses
    {}, // penalties
    5, // tier
    new EffectConfig({
        type: 'bonus_mining',
        triggerChance: 1/280,
        cooldown: 2000,
        minBlocks: 250,
        maxBlocks: 650,
        luckModifier: -0.1,
        soundFile: './media/sfx/cn_sfx1.wav',
        description: "huge"
    }), // effect config
    { // recipe
        "Crystalanium": { quantity: 1 },
        "Glombolium": { quantity: 3 },
        "Essence-of-The-Casino": { quantity: 5 },
        "Chronolium": { quantity: 8 },
        "Areskinite": { quantity: 12 },
        "Gallinium": { quantity: 15 },
        "Bohrium": { quantity: 25 },
        "Magneon": { quantity: 40 },
        "Chexquartz": { quantity: 75 },
        "Uranium": { quantity: 150 },
        "Bismuth": { quantity: 500 },
        "Silver": { quantity: 2500 },
        "Chexium": { quantity: 11000 }
    },
    "this is a nuclear bomb! how the hell did chex get their hands on a nuclear bomb <br><br> what i will say is that this bomb sure can mine!",
    "> Has a 1/280 chance to mine 250 - 650 blocks on each block broken.",
    "> 0.9x luck to blocks mined with this gear."
);

export { ChexestineNuke };