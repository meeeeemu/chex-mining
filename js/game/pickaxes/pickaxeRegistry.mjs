import { pickaxeObjectDefault } from "./pickaxefiles/default-pickaxe.mjs";
import { Chexstick } from "./pickaxefiles/chexstick.mjs";
import { Chexaxe } from "./pickaxefiles/the-chexaxe.mjs";
import { ChexforgeRavager } from "./pickaxefiles/chexforge-ravager.mjs";
import { ChexquartzExcavator } from "./pickaxefiles/chexquartz-excavator.mjs";
import { TitaniumChexblaster } from "./pickaxefiles/titanium-chexblaster.mjs";
import { Womboaxe } from "./pickaxefiles/womboaxe.mjs";
import { ChexglowDagger } from "./pickaxefiles/chexglow-dagger.mjs";
import { CasinoCrusher } from "./pickaxefiles/casino-crusher.mjs";
import { ChexiumMatterManipulator } from "./pickaxefiles/chexium-matter-manipulator.mjs";
import { ChexonicSpellbook } from "./pickaxefiles/chexonic-spellbook.mjs";
import { UrleiantorPrime } from "./pickaxefiles/urleinator-prime.mjs";
import { ChexiteStaff } from "./pickaxefiles/chexite-staff.mjs";

const PICKAXE_REGISTRY = {
    "Default Pickaxe": pickaxeObjectDefault,
    "Chexstick": Chexstick,
    "The Chexaxe": Chexaxe,
    "Chexforge Ravager": ChexforgeRavager,
    "Chexquartz Excavator": ChexquartzExcavator,
    "Titanium Chexblaster": TitaniumChexblaster,
    "Womboaxe": Womboaxe,
    "Chexglow Dagger": ChexglowDagger,
    "Casino Crusher": CasinoCrusher,
    "Chexium Matter Manipulator": ChexiumMatterManipulator,
    "Chexonic Spellbook": ChexonicSpellbook,
    "Urleinator Prime": UrleiantorPrime,
    "Chexite Staff": ChexiteStaff
};

export function getCurrentPickaxeDefinition(pickaxeName) {
    return PICKAXE_REGISTRY[pickaxeName] || null;
}

export { PICKAXE_REGISTRY };