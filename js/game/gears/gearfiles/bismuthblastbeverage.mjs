import { Gear } from "../gearDefaultClass.mjs";

const bismuthBlastBeverage = new Gear(
    "Bismuth Blast Beverage", // name
    { "Speed": 0, "Luck": 0 }, // bonuses
    {}, // penalties
    2, // tier
    Gear.getEffectFunction("BismuthBlastBeverageEffect"),
    { // recipe
        "Bismuth": { quantity: 2 },
        "Amber": { quantity: 4 },
        "Emerald": { quantity: 6 },
        "Silver": { quantity: 80 },
        "Coal": { quantity: 430 },
        "Tin": { quantity: 570 },
        "Rhodochrosite": { quantity: 700 },
        "Copper": { quantity: 900 },
        "Stone": { quantity: 3500 }
    }
);

export { bismuthBlastBeverage };
