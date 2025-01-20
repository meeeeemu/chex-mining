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
    },
    "this drink tastes like raw metal. but i'll be damned if it doesn't look rainbow and cool<br><br> why do people drink this shit, it tastes unlucky!<br><br i bet it's incredibly destructive on your immune system",
    "> Has a 1/100 chance to mine 40 - 50 blocks on each block broken.",
    "> 0.85x luck to blocks mined with this gear."
);

export { bismuthBlastBeverage };
