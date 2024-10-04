import { inventory, removeOre } from "../inventoryHandler.mjs";
import { saveGame } from "../profileHandler.mjs";
import { ownedGears } from "./gearsMain.mjs";
import { Gear } from "./gearDefaultClass.mjs";

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

function craftGear(gearObject, recipe) {
    if(canCraftGear(inventory, recipe)) {
        if (!ownedGears[gearObject.name]) {
            if (!gearObject.effect) {
                gearObject.effect = Gear.getEffectFunction(gearObject.name.replace(/\s/g, "") + "Effect");
            }
            ownedGears[gearObject.name] = gearObject;
            console.log(ownedGears[gearObject.name]);
            saveGame();
            return true
        } else {
            console.log("already crafted that one boss")
        }
    } else {
        return false
    }
}

function canCraftGear(inventory, recipe) {
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

export {craftGear}
