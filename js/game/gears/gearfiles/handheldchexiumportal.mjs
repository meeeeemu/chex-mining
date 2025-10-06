import { Gear, EffectConfig } from "../gearDefaultClass.mjs";

const HandheldChexiumPortal = new Gear(
    "Handheld Chexium Portal",
    { "Speed": 0, "Luck": 0 },
    {},
    6,
    new EffectConfig({
        type: 'portal_effect',
        triggerChance: 1/265,
        cooldown: 3000,
        description: "utilise epic sauce",
        customData: {
            accumulationDuration: 20000,
            payoutBlocks: 12,
            maxLuckCap: 5.0,
            tierLuckValues: {
                "common": 0.02,
                "uncommon": 0.037,
                "rare": 0.05,
                "master": 0.08,
                "unreal": 0.12,
                "exotic": 0.24,
                "pristine": 0.28,
                "pure": 0.45,
                "virtuous": 0.7,
                "angelic": 1.1,
                "dreamlike": 1.7
            }
        }
    }),
    {
        "Vitrilyx": { quantity: 1 },
        "Glombolium": { quantity: 3 },
        "Confolium": { quantity: 6 },
        "Gallinium": { quantity: 10 },
        "Carium": { quantity: 15 },
        "Magneon": { quantity: 25 },
        "Bohrium": { quantity: 45 },
        "Azurite": { quantity: 80 },
        "Chexquartz": { quantity: 150 },
        "Uranium": { quantity: 500 },
        "Bismuth": { quantity: 1500 },
        "Silver": { quantity: 4500 },
        "Chexium": { quantity: 20000 },
    },
    "remember how you wanted to mine ores in the mining game, well jokes on you buster, you dont get anything for a whole 20 seconds! wait... oh wait you do! WOAH! 12 BLOCKS AT HIGH LUCK!!!",
    "> Has a 1/265 chance to enter accumulation mode for 20 seconds. Blocks mined don't give any ores, but increase a luck counter based on their tier. \n\n After 20 seconds, mines exactly 12 blocks with accumulated luck (capped at +5x). Higher tier blocks provide more luck to the counter.",
    ""
);

export { HandheldChexiumPortal };
