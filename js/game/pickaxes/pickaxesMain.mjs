import { inventory } from "../inventoryHandler.mjs";
import { setCurrentPickGame } from "../mainGame.mjs";
import { saveGame } from "../profileHandler.mjs";
import { pickaxeObjectDefault } from "./default-pickaxe.mjs";
import { chexaxeRecipe } from "./the-chexaxe.mjs";
import { chexforgeravagerRecipe } from "./chexforge-ravager.mjs";
import { chexquartzexcavatorRecipe } from "./chexquartz-excavator.mjs";
import { titaniumchexblasterRecipe } from "./titanium-chexblaster.mjs";

//         _                 _ _ _ 
//        | |               | | | |
//    __ _| |__   ___  _   _| | | |
//   / _` | '_ \ / _ \| | | | | | |
//  | (_| | | | | (_) | |_| |_|_|_|
//   \__,_|_| |_|\___/ \__, (_|_|_)
//                      __/ |      
//                     |___/       

// have fun looking through my probably absolutely GARBAGE code :)
// take what you like if you find it useful, no need for credits

var ownedPickaxes = {[pickaxeObjectDefault.Name]: pickaxeObjectDefault}; // this is the default pickaxes the player owns

function equipPickaxe(pickaxeObject) {
    if(ownedPickaxes[pickaxeObject.Name]) {
        setCurrentPickGame(ownedPickaxes[pickaxeObject.Name]);
    }
}

function updateGUIRecipe(inventory, recipe, itemToCraft) {
    for (let ore in recipe) {
        let recipeElement = document.querySelector(`.${ore}.${itemToCraft}`);
        if (recipeElement) {
            let inventoryQuantity = inventory[ore] ? inventory[ore].quantity : 0;
            let requiredQuantity = recipe[ore].quantity;
            recipeElement.textContent = `${inventoryQuantity}/${requiredQuantity} ${ore}`;
            
            if (inventoryQuantity >= requiredQuantity) {
                recipeElement.classList.add("complete");
            } else {
                recipeElement.classList.remove("complete");
            }
        }
    }
}

function updateAllGUIRecipes(inventory, recipes) {
    for (let { recipe, itemToCraft } of recipes) {
        updateGUIRecipe(inventory, recipe, itemToCraft);
    }
}

var recipesToUpdate = [
    { recipe: chexaxeRecipe, itemToCraft: "Chexaxe"},
    { recipe: chexforgeravagerRecipe, itemToCraft: "Chexforge-Ravager"},
    { recipe: chexquartzexcavatorRecipe, itemToCraft: "Chexquartz-Excavator"},  
    { recipe: titaniumchexblasterRecipe, itemToCraft: "Titanium-Chexblaster"},  
];

var pickaxeUpdateLoop = setInterval(() => {
    updateAllGUIRecipes(inventory, recipesToUpdate);
}, 500)

export {updateGUIRecipe, ownedPickaxes, equipPickaxe};

