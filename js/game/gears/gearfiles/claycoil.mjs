import { Gear } from "../gearDefaultClass.mjs";

const clayCoil = new Gear(
    "Clay Coil", // name
    { "Speed": -40, "Luck": 0 }, // bonuses
    {}, // penalties
    1, // tier
    Gear.getEffectFunction("ClayCoilEffect"),
    { // recipe
        "Quartz": { quantity: 8 },
        "Coal": { quantity: 55 },
        "Copper": { quantity: 150 },
        "Tin": { quantity: 70 },
        "Clay": { quantity: 275 },
        "Stone": { quantity: 500 },
    }
);

export { clayCoil };
