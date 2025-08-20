import { inventory } from "../inventoryHandler.mjs"
import { setCurrentGearGame } from "../mainGame.mjs"
import { bismuthBlastBeverage } from "./gearfiles/bismuthblastbeverage.mjs";
import { ChexestineNuke } from "./gearfiles/chexestinenuke.mjs";
import { ChexiumChronograph } from "./gearfiles/chexiumchronograph.mjs";
import { clayCoil } from "./gearfiles/claycoil.mjs";
import { DinnerBomb } from "./gearfiles/dinnerbomb.mjs";
import { magnesiumReactorCore } from "./gearfiles/magnesiumreactorcore.mjs";
import { whackyWomboChips } from "./gearfiles/whackywombochips.mjs";
import { wheelOfFate } from "./gearfiles/wheeloffate.mjs";

var ownedGears = {};

function equipGear(gearObject) {
    if (ownedGears[gearObject.name]) {
        setCurrentGearGame(ownedGears[gearObject.name]);
    }
}

function updateGUIGearRecipe(inventory, gear) {
    let recipe = gear.recipe;
    for (let ore in recipe) {
        let displayOre = ore.replace(/-/g, ' ').replace(/_/g, '.');
        let hyphenatedName = gear.name.replace(/\s+/g, '-');
        let recipeElement = document.querySelector(`.${ore}.${hyphenatedName}`);
        if (recipeElement) {
            let inventoryQuantity = inventory[ore] ? inventory[ore].quantity : 0;
            let requiredQuantity = recipe[ore].quantity;
            recipeElement.textContent = `${inventoryQuantity}/${requiredQuantity} ${displayOre}`;

            if (inventoryQuantity >= requiredQuantity) {
                recipeElement.classList.add("complete");
                recipeElement.style.color = "lime";
            } else {
                recipeElement.classList.remove("complete");
                recipeElement.style.color = "red";
            }
        }
    }
}

function updateAllGUIGearRecipes(inventory, gears) {
    gears.forEach(gear => {
        updateGUIGearRecipe(inventory, gear);
    });
}

var gearRecipesToUpdate = [
    clayCoil,
    bismuthBlastBeverage,
    whackyWomboChips,
    magnesiumReactorCore,
    wheelOfFate,
    ChexiumChronograph,
    DinnerBomb,
    ChexestineNuke
];

var gearUpdateLoop = setInterval(() => {
    updateAllGUIGearRecipes(inventory, gearRecipesToUpdate);
}, 500);

export { updateGUIGearRecipe, ownedGears, equipGear };