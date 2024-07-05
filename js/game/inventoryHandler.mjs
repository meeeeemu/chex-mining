import { addBlocksMined } from "./miscStats.mjs";

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

var inventory = {
    //"amber": {obj: {"Name": "Amber", "decimalRarity": 1 / 1000, "stringRarity": "1/1000", "tier": "uncommon"}, quantity: 10},
}

const inventoryContainer = document.querySelector('.guiInventoryMain');

function appendToInventoryGUI() {
    inventoryContainer.innerHTML = '';

    let tierOrder = {
        common: 11, uncommon: 10, rare: 9, master: 8,
        unreal: 7, exotic: 6, pristine: 5, pure: 4,
        virtuous: 3, angelic: 2, dreamlike: 1
    };

    let sortedOreNames = Object.keys(inventory).sort((a, b) => {
        let tierA = tierOrder[inventory[a].obj.tier];
        let tierB = tierOrder[inventory[b].obj.tier];
        return tierA - tierB;
    });

    sortedOreNames.forEach(oreName => {
        let { obj, quantity } = inventory[oreName];

        let invDiv = document.createElement('div');
        invDiv.textContent = `${obj.Name}: ${quantity}`;
        invDiv.className = `${obj.tier}`;
    
        inventoryContainer.appendChild(invDiv);
    });
}

function addOrefromSaveData(oreObject, quantity) {
    var oreName = oreObject.Name; 

    inventory[oreName] = {"obj": oreObject, "quantity": quantity}

    appendToInventoryGUI()
}

function addOre(oreObject, quantity, isMined) {

    var oreName = oreObject.Name;

    if(isMined) {
        addBlocksMined(1)
    }

    if(inventory[oreName]) {
        inventory[oreName].quantity += quantity
    } else {
        inventory[oreName] = {"obj": oreObject, "quantity": 1}
    }

    var inventoryOreTier = inventory[oreName]['obj'].tier



    appendToInventoryGUI(oreObject, inventoryOreTier)

}

function removeOre(oreName, quantity) {

    if(inventory[oreName]) {
        inventory[oreName].quantity -= Number(quantity);

        if(inventory[oreName].quantity <= 0) {
            delete inventory[oreName];
        }

        appendToInventoryGUI();
    }
}



export {inventory, addOre, addOrefromSaveData, removeOre}