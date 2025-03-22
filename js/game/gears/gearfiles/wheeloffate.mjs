import { Gear } from "../gearDefaultClass.mjs";

const wheelOfFate = new Gear(
    "Wheel of Fate", // name
    { "Speed": 0, "Luck": 0 }, // bonuses
    {}, // penalties
    4, // tier
    Gear.getEffectFunction("WheelofFateEffect"),
    { // recipe
        "Essence-of-The-Casino": { quantity: 1 },
        "Gallinium": { quantity: 6 },
        "Cobgenual": { quantity: 7 },
        "Azurite": { quantity: 10 },
        "Chrysoberyl": { quantity: 20 },
        "Uranium": { quantity: 30 },
        "Sodium": { quantity: 50 },
        "Amber": { quantity: 150 },
        "Gold": { quantity: 999 },
        "Tin": { quantity: 8500 },
        "Clay": { quantity: 30000 },
    },
    "holy moly!! you're telling me this shit pauses mining, spins a wheel with a buncha bonuses, then gives you that bonus! that's bonkers!",
    "> Has a 1/400 chance to pause mining and spin a wheel which contains many effects.", // bonus description
    "> Effects can be good or bad.", // penalty description
);

export { wheelOfFate };
