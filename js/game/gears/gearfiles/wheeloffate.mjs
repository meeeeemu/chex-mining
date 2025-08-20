import { Gear, EffectConfig } from "../gearDefaultClass.mjs";

const wheelOfFate = new Gear(
    "Wheel of Fate", // name
    { "Speed": 0, "Luck": 0 }, // bonuses
    {}, // penalties
    5, // tier
    new EffectConfig({
        type: 'wheel',
        triggerChance: 1/300,
        cooldown: 2000,
        description: "gambling!",
        customData: {
            wheelItems: [
                { label: "+100 Blocks Mined", outcome: 0 },
                { label: "+0.75x luck (4s)", outcome: 1 },
                { label: "-50 Mining Delay (6s)", outcome: 2 },
                { label: "Nothing", outcome: 3 },
                { label: "+300 Mining Delay (15s)", outcome: 4 }
            ],
            wheelConfig: {
                borderColor: "#000",
                borderWidth: 1,
                itemBackgroundColors: ["#0345fc", "#03fc20", "#f0fc03", "#fc0303", "#fc0303"],
                itemLabelColors: ["#000"],
                itemLabelFont: "sans-serif",
                itemLabelFontSizeMax: 47,
                radius: 0.75,
                rotationResistance: -200,
                rotationSpeedMax: 728
            }
        }
    }), // effect config
    { // recipe
        "Casino-Glumbus": { quantity: 1 },
        "Wumbus-Maximus": { quantity: 6 },
        "Confolium": { quantity: 7 },
        "Gallonite": { quantity: 10 },
        "Zircon": { quantity: 20 },
        "Chrysoberyl": { quantity: 30 },
        "Chexquartz": { quantity: 50 },
        "Radiosolite": { quantity: 200 },
        "Gold": { quantity: 999 },
        "Tin": { quantity: 8500 },
        "Clay": { quantity: 30000 },
    },
    "holy moly!! you're telling me this shit pauses mining, spins a wheel with a buncha bonuses, then gives you that bonus! that's bonkers!",
    "> Has a 1/300 chance to pause mining and spin a wheel which contains many effects.", // bonus description
    "> Effects can be good or bad.", // penalty description
);

export { wheelOfFate };