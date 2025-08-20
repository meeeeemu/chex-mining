import { Gear, EffectConfig } from "../gearDefaultClass.mjs";

const clayCoil = new Gear(
    "Clay Coil", // name
    { "Speed": -20, "Luck": 0 }, // bonuses
    {}, // penalties
    1, // tier
    new EffectConfig({
        type: 'penalty',
        triggerChance: 1/100,
        cooldown: 2000,
        pauseDuration: 2000,
        description: "time to slow it on down there bud"
    }),
    { // recipe
        "Quartz": { quantity: 8 },
        "Coal": { quantity: 55 },
        "Copper": { quantity: 150 },
        "Tin": { quantity: 70 },
        "Clay": { quantity: 275 },
        "Stone": { quantity: 500 },
    },
    "wow!! gears!! who would've thought<br><br> dude this coil is made of CLAY, who the fuck thought to make a Clay Coil, it BARELY helps but it does<br>",
    "> Boosts mining speed by 20ms.", // bonus description
    "> Has a 1/100 chance to pause your mining for two seconds when mining a block.", // penalty description
);

export { clayCoil };
