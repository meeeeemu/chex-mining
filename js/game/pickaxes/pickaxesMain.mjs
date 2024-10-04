import { inventory } from "../inventoryHandler.mjs";
import { setCurrentPickGame } from "../mainGame.mjs";
import { pickaxeObjectDefault } from "./pickaxefiles/default-pickaxe.mjs";
import { Chexaxe } from "./pickaxefiles/the-chexaxe.mjs";
import { ChexforgeRavager } from "./pickaxefiles/chexforge-ravager.mjs";
import { ChexquartzExcavator } from "./pickaxefiles/chexquartz-excavator.mjs";
import { TitaniumChexblaster } from "./pickaxefiles/titanium-chexblaster.mjs";
import { Womboaxe } from "./pickaxefiles/womboaxe.mjs";
import { ChexglowDagger } from "./pickaxefiles/chexglow-dagger.mjs";

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

var ownedPickaxes = {[pickaxeObjectDefault.name]: pickaxeObjectDefault}; // this is the default pickaxes the player owns

function equipPickaxe(pickaxeObject) {
    if(ownedPickaxes[pickaxeObject.name]) {
        setCurrentPickGame(ownedPickaxes[pickaxeObject.name]);
    }
}

function updateGUIRecipe(inventory, pickaxe) {
    let recipe = pickaxe.recipe;
    for (let ore in recipe) {
        let displayOre = ore.replace(/-/g, ' ').replace(/_/g, '.');
        let hyphenatedName = pickaxe.name.replace(/\s+/g, '-');
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

function updateAllGUIRecipes(inventory, pickaxes) {
    pickaxes.forEach(pickaxe => {
        updateGUIRecipe(inventory, pickaxe);
    });
}

var gearRecipesToUpdate = [
    Chexaxe,
    ChexforgeRavager,
    ChexquartzExcavator,
    TitaniumChexblaster,
    Womboaxe,
    ChexglowDagger
];

var pickaxeUpdateLoop = setInterval(() => {
    updateAllGUIRecipes(inventory, gearRecipesToUpdate);
}, 500);

export {updateGUIRecipe, ownedPickaxes, equipPickaxe};

