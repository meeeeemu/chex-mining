import { Gear } from "../gearDefaultClass.mjs";

const whackyWomboChips = new Gear(
    "Whacky Wombo Chips", // name
    { "Speed": 0, "Luck": 0 }, // bonuses
    {}, // penalties
    2, // tier
    Gear.getEffectFunction("WhackyWomboChipsEffect"),
    { // recipe
        "Palladium": { quantity: 2 },
        "Virotite": { quantity: 5},
        "Amber": { quantity: 6 },
        "Gold": { quantity: 60 },
        "Silver": { quantity: 100 },
    },
    "these chips taste like... grape? that's really fuckin whacky if you ask me, why do they do what they do? they're chips! <br><br> atleast they're better than the drink i want a refund on that shit<br><br>",
    "> Has a 1/100 chance to duplicate any mined Master-tier ore (or below).",
    "> Upon duplication, mining is paused for one second."
);

export { whackyWomboChips };
