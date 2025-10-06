import { clayCoil } from "./gearfiles/claycoil.mjs";
import { bismuthBlastBeverage } from "./gearfiles/bismuthblastbeverage.mjs";
import { whackyWomboChips } from "./gearfiles/whackywombochips.mjs";
import { magnesiumReactorCore } from "./gearfiles/magnesiumreactorcore.mjs";
import { ChexiumChronograph } from "./gearfiles/chexiumchronograph.mjs";
import { wheelOfFate } from "./gearfiles/wheeloffate.mjs";
import { ChexestineNuke } from "./gearfiles/chexestinenuke.mjs";
import { HandheldChexiumPortal } from "./gearfiles/handheldchexiumportal.mjs";

const GEAR_REGISTRY = {
    "Clay Coil": clayCoil,
    "Bismuth Blast Beverage": bismuthBlastBeverage,
    "Whacky Wombo Chips": whackyWomboChips,
    "Magnesium Reactor Core": magnesiumReactorCore,
    "Chexium Chronograph": ChexiumChronograph,
    "Wheel of Fate": wheelOfFate,
    "Chexestine Nuke": ChexestineNuke,
    "Handheld Chexium Portal": HandheldChexiumPortal
};

export function getCurrentGearDefinition(gearName) {
    return GEAR_REGISTRY[gearName] || null;
}

export { GEAR_REGISTRY };