import { Gear } from "../gearDefaultClass.mjs";

const clayCoil = new Gear(
    "Clay Coil", // name
    { "Speed": -40, "Luck": 0.05 }, // bonuses
    {}, // penalties
    1, // tier
    Gear.getEffectFunction("ClayCoilEffect"),
    { // recipe
        "Quartz": { quantity: 1 },
        "Coal": { quantity: 15 },
        "Copper": { quantity: 42 },
        "Tin": { quantity: 65 },
        "Clay": { quantity: 250 },
        "Stone": { quantity: 500 },
    }
);

export { clayCoil };
