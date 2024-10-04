import { inventory } from "../inventoryHandler.mjs"
import { setCurrentGearGame } from "../mainGame.mjs"
import { bismuthBlastBeverage } from "./gearfiles/bismuthblastbeverage.mjs";
import { clayCoil } from "./gearfiles/claycoil.mjs";

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
            } else {
                recipeElement.classList.remove("complete");
            }
        }
    }
}

function updateAllGUIGearRecipes(inventory, gears) {
    gears.forEach(gear => {
        updateGUIGearRecipe(inventory, gear);
    });
}

var gearRecipesToUpdate = [clayCoil, bismuthBlastBeverage];

var gearUpdateLoop = setInterval(() => {
    updateAllGUIGearRecipes(inventory, gearRecipesToUpdate);
}, 500);

export { updateGUIGearRecipe, ownedGears, equipGear };