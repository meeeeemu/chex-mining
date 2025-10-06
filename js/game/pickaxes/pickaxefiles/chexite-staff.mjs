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
    {     // recipe
        "Aerospark": { quantity: 1 },
        "Azuringalium": { quantity: 1 },
        "Conflux": { quantity: 1 },
        "Shard-of-Normality": { quantity: 1 },
        "Glacium": { quantity: 2 },
        "Wombolium": { quantity: 3 },
        "Decelerite": { quantity: 5 },
        "Euclideum": { quantity: 8 },
        "Atomium": { quantity: 10 },
        "Guldovium": { quantity: 15 },
        "Swagite": { quantity: 20 },
        "Consuvium": { quantity: 25 },
        "Frumbalite": { quantity: 30 },
        "Gamergodium": { quantity: 40 },
        "Termalium": { quantity: 50 },
        "Confolium": { quantity: 60 },
        "Gallinium": { quantity: 100 },
        "Areskinite": { quantity: 120 },
        "Magneon": { quantity: 150 },
        "Chexquartz": { quantity: 800 },
        "Chexwood": { quantity: 5000 },
        "Chexium": { quantity: 25000 },
        "Glombus": { quantity: 30000 },
        "Deepslate": { quantity: 40000 },
        "Clay": { quantity: 50000 },

    },
    "the power of the chexite staff compels you! <br> this staff resonates with pure chex energy, and enhances your chexing abilities!",
    "> Has a 1/100 chance on every block mined to temporarily boost a stat for a random duration of time, this boost stacks with other temporary buffs. <br> > Has a 1/1200 chance to activate chex-fusion-burst mode for 12 seconds, causing all stats to be heavily infused with chex. (+0.4x luck, -15ms mining speed, +2 blocks mined) "
);

export { ChexiteStaff };
