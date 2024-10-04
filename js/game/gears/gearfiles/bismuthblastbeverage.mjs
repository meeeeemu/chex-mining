import { Gear } from "../gearDefaultClass.mjs";

const bismuthBlastBeverage = new Gear(
    "Bismuth Blast Beverage", // name
    { "Speed": 0, "Luck": 0 }, // bonuses
    {}, // penalties
    2, // tier
    Gear.getEffectFunction("BBBEffect"),
    { // recipe
        "Bismuth": { quantity: 1 },
        "Amber": { quantity: 2 },
        "Emerald": { quantity: 1 },
        "Silver": { quantity: 20 },
        "Coal": { quantity: 33},
        "Tin": { quantity: 65 },
        "Rhodochrosite": { quantity: 212 },
        "Copper": { quantity: 300 },
        "Stone": { quantity: 3500 }
    }
);

export { bismuthBlastBeverage };
