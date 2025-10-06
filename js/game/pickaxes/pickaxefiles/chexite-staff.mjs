import { Pickaxe, EffectConfig } from "../pickaxeDefaultClass.mjs";

const ChexiteStaff = new Pickaxe(
    "Chexite Staff", // name
    {                     // bonuses
        "Luck": 0,
        "Speed": 175,
        "Blocks_Mined": 1
    },
    7,                    // tier
    new EffectConfig({
        type: 'chexite_staff',
        triggerChance: 1,
        cooldown: 0,
        description: "this is quite a confusing effect!"
    }),
    { //recipe
        "Cleoistium": { quantity: 1 },
        "Vulkivium": { quantity: 2 },
        "Wombolium": { quantity: 4 },
        "Vitrilyx": { quantity: 6 },
        "Atomium": { quantity: 10 },
        "Decelerite": { quantity: 15 },
        "Glombolium": { quantity: 20 },
        "Swagite": { quantity: 30 },
        "Frumbalite": { quantity: 45 },
        "Guldovium": { quantity: 60 },
        "Confolium": { quantity: 90 },
        "Gamergodium": { quantity: 120 },
        "Termalium": { quantity: 150 },
        "Gallinium": { quantity: 250 },
        "Magneon": { quantity: 400 },
        "Azurite": { quantity: 800 },
        "Chexquartz": { quantity: 1500 },
        "Uranium": { quantity: 4000 },
        "Chexwood": { quantity: 5000 },
        "Emerald": { quantity: 8000 },
        "Bismuth": { quantity: 10000 },
        "Diamond": { quantity: 15000 },
        "Gold": { quantity: 25000 },
        "Silver": { quantity: 60000 },
        "Chexium": { quantity: 80000 },
        "Iron": { quantity: 120000 },
        "Copper": { quantity: 150000 },
        "Stone": { quantity: 200000 },
    },
    "the power of the chexite staff compels you! <br> this staff resonates with pure chex energy, and enhances your chexing abilities!",
    "> Has a 1/100 chance on every block mined to temporarily boost a stat for a random duration of time, this boost stacks with other temporary buffs. <br> > Has a 1/1200 chance to activate chex-fusion-burst mode for 12 seconds, causing all stats to be heavily infused with chex. (+0.4x luck, -15ms mining speed, +2 blocks mined) "
);

export { ChexiteStaff };
