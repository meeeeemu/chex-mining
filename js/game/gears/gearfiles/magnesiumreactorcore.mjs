import { Gear, EffectConfig } from "../gearDefaultClass.mjs";

const magnesiumReactorCore = new Gear(
    "Magnesium Reactor Core", // name
    { "Speed": -30, "Luck": 0.1 }, // bonuses
    {}, // penalties
    3, // tier
    new EffectConfig({
        type: 'penalty',
        triggerChance: 1/150,
        cooldown: 2000,
        pauseDuration: 2000,
        description: "WOOOOOOOOOO"
    }), // effect config
    { // recipe
        "Magnesium": { quantity: 1 },
        "Chroma-Contaris": { quantity: 6 },
        "Palladium": { quantity: 10 },
        "Bismuth": { quantity: 15 },
        "Diamond": { quantity: 65 },
        "Silver": { quantity: 350 },
        "Coal": { quantity: 1800 },
        "Chexium": { quantity: 3400 },
    },
    "remember the clay coil? turns out they did some chemistry on the clay, turned it into magnesium! <br><br> turns out this magnesium has some pretty awesome effects!<br><br></br>",
    "> Boosts mining speed by 30ms.",
    "> When mining a block, 1/150 chance to pause mining for two seconds."
);

export { magnesiumReactorCore };