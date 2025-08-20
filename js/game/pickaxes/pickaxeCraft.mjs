import { inventory, removeOre } from "../inventoryHandler.mjs";
import { saveGame } from "../profileHandler.mjs";
import { Pickaxe } from "./pickaxeDefaultClass.mjs";
import { ownedPickaxes } from "./pickaxesMain.mjs";

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

function craftPickaxe(pickaxeObject, recipe) {
    console.log(pickaxeObject)
    if(canCraftPickaxe(inventory, recipe)) {
        if(!ownedPickaxes[pickaxeObject.name]) {

            const craftedPick = new Pickaxe (
                pickaxeObject.name,
                pickaxeObject.bonuses,
                pickaxeObject.tier,
                pickaxeObject.effectConfig,
                pickaxeObject.recipe,
                pickaxeObject.description,
                pickaxeObject.bonusDescription
            )

            ownedPickaxes[pickaxeObject.name] = craftedPick;
            console.log(ownedPickaxes);
            saveGame();
            return true
        } else {
            console.log("already crafted that one boss")
        }
    } else {
        return false
    }
}

function canCraftPickaxe(inventory, recipe) {
    console.log(recipe)
    for (let ore in recipe) {
        let requiredQuantity = recipe[ore].quantity;
        let inventoryQuantity = inventory[ore] ? inventory[ore].quantity : 0;
        
        if (inventoryQuantity < requiredQuantity) {
            return false;
        } 
    }

    for (let ore in recipe) {
        console.log(recipe[ore].quantity);
        removeOre(ore, recipe[ore].quantity);    
    }

    return true;

}

export {craftPickaxe}
