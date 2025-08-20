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
    {                     // recipe
        "Aerospark": { quantity: 1 },
        "Azuringalium": { quantity: 1 },
        "Wombolium": { quantity: 2 },
        "Decelerite": { quantity: 4 },
        "Guldovium": { quantity: 8 },
        "Gamergodium": { quantity: 20 },
        "Termalium": { quantity: 24 },
        "Confolium": { quantity: 36 },
        "Gallinium": { quantity: 55 },
        "Krypinum": { quantity: 74 },
        "Helderite": { quantity: 85 },
        "Bohrium": { quantity: 104 },
        "Hafnium": { quantity: 140 },
        "Ice-Fragment": { quantity: 166 },
        "Lithium": { quantity: 201 },
        "Adurite": { quantity: 210 },
        "Chexquartz": { quantity: 444 },
        "Radiosolite": { quantity: 470 },
        "Xenofate": { quantity: 663 },
        "Chiron": { quantity: 702 },
        "Granite-Glass": { quantity: 900 },
        "Palladium": { quantity: 1200 },
        "Chexerite": { quantity: 2000 },
        "Chex-Crystal": { quantity: 3220 },
        "Opal": { quantity: 4500 },
        "Chexwood": { quantity: 17400 },
        "Chexium": { quantity: 400000 },
        "Glombus": { quantity: 425000 },
        "Deepslate": { quantity: 655000 },
        "Clay": { quantity: 825000 },

    },
    "the power of the chexite staff compels you! <br> this staff resonates with pure chex energy, and enhances your chexing abilities!",
    "> Has a 1/100 chance on every block mined to temporarily boost a stat for a random duration of time, this boost stacks with other temporary buffs. <br> > Has a 1/1200 chance to activate chex-fusion-burst mode for 12 seconds, causing all stats to be heavily infused with chex. (+0.4x luck, -15ms mining speed, +2 blocks mined) "
);

export { ChexiteStaff };
