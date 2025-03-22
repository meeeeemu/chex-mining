import { Gear } from "../gearDefaultClass.mjs";

const ChexiumChronograph = new Gear(
    "Chexium Chronograph", // name
    { "Speed": 0, "Luck": 0 }, // bonuses
    {}, // penalties
    4, // tier
    Gear.getEffectFunction("ChexiumChronographEffect"),
    { // recipe
        "Chronolium": { quantity: 1 },
        "Congruence-of-Time": { quantity: 1 },
        "Silidium": { quantity: 2 },
        "Bromulite": { quantity: 3 },
        "Carnotite": { quantity: 4 },
        "Ice-Fragment": { quantity: 5 },
        "Radiosolite": { quantity: 25 },
        "Granite-Glass": { quantity: 48 },
        "Crystalline": { quantity: 60 },
        "Opal": { quantity: 108 },
        "Graphite": { quantity: 10550 },
        "Stone": { quantity: 65000 },
    },
    "rise and shine chexers, this gear is best during the morning! that's right! you have to play during a specific time for this gear to be most effective!",
    "> Has a 1/250 chance to give +0.01x to +0.2x luck for 10 seconds depending on the time of day. (+0.2x happens at 12:00PM, +0.01x happens at 12:00AM, times are local to your timezone)", // bonus description
    "> The luck of this gear is entirely dependant on the time of the actual physical day. (fix your sleep schedule) ", // penalty description
);

export { ChexiumChronograph };
