import { inventory } from "../inventoryHandler.mjs";
import { setCurrentPickGame } from "../mainGame.mjs";
import { pickaxeObjectDefault } from "./pickaxefiles/default-pickaxe.mjs";
import { Chexaxe } from "./pickaxefiles/the-chexaxe.mjs";
import { ChexforgeRavager } from "./pickaxefiles/chexforge-ravager.mjs";
import { ChexquartzExcavator } from "./pickaxefiles/chexquartz-excavator.mjs";
import { TitaniumChexblaster } from "./pickaxefiles/titanium-chexblaster.mjs";
import { Womboaxe } from "./pickaxefiles/womboaxe.mjs";
import { ChexglowDagger } from "./pickaxefiles/chexglow-dagger.mjs";
import { Chexstick } from "./pickaxefiles/chexstick.mjs";
import { CasinoCrusher } from "./pickaxefiles/casino-crusher.mjs";
import { ChexiumMatterManipulator } from "./pickaxefiles/chexium-matter-manipulator.mjs";
import { ChexonicSpellbook } from "./pickaxefiles/chexonic-spellbook.mjs";
import { UrleiantorPrime } from "./pickaxefiles/urleinator-prime.mjs";
import { ChexiteStaff } from "./pickaxefiles/chexite-staff.mjs";

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
    const recipe = pickaxe.recipe;
    const hyphenatedName = pickaxe.name.replace(/\s+/g, '-');

    for (let ore in recipe) {
        const displayOre = ore.replace(/-/g, ' ').replace(/_/g, '.');
        const recipeElement = document.querySelector(`.${ore}.${hyphenatedName}`);
        
        if (recipeElement) {
            const inventoryQuantity = inventory[ore] ? inventory[ore].quantity : 0;
            const requiredQuantity = recipe[ore].quantity;

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

function updateAllGUIRecipes(inventory, pickaxes) {
    pickaxes.forEach(pickaxe => {
        updateGUIRecipe(inventory, pickaxe);
    });
}

var pickaxeRecipesToUpdate = [
    Chexstick,
    Chexaxe,
    ChexforgeRavager,
    ChexquartzExcavator,
    TitaniumChexblaster,
    Womboaxe,
    ChexglowDagger,
    CasinoCrusher,
    ChexiumMatterManipulator,
    ChexonicSpellbook,
    UrleiantorPrime,
    ChexiteStaff
];

var pickaxeUpdateLoop = setInterval(() => {
    updateAllGUIRecipes(inventory, pickaxeRecipesToUpdate);
}, 500);

export {updateGUIRecipe, ownedPickaxes, equipPickaxe};

