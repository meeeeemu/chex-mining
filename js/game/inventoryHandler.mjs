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

function appendToInventoryGUI(updatedOre = null) {
    const tierOrder = {
        common: 11, uncommon: 10, rare: 9, master: 8,
        unreal: 7, exotic: 6, pristine: 5, pure: 4,
        virtuous: 3, angelic: 2, dreamlike: 1
    };

    if (!updatedOre) {
        inventoryContainer.innerHTML = ''; 
        Object.keys(inventory)
            .sort((a, b) => tierOrder[inventory[a].obj.tier] - tierOrder[inventory[b].obj.tier])
            .forEach(oreName => addOreToGUI(oreName, tierOrder));
    } else {
        addOreToGUI(updatedOre, tierOrder);
    }
}

function addOreToGUI(oreName, tierOrder) {
    if (!inventory[oreName]) {
        console.warn(`Warning: ${oreName} not found in inventory.`);
        return;
    }

    let { obj, quantity } = inventory[oreName];
    let displayName = oreName.replace(/-/g, ' ').replace(/_/g, '.');

    let existingOre = document.querySelector(`.guiInventoryMain .ore-${oreName}`);

    if (existingOre) {
        existingOre.textContent = `${displayName}: ${quantity}`;
    } else {
        let invDiv = document.createElement('div');
        invDiv.textContent = `${displayName}: ${quantity}`;
        invDiv.className = `ore-${oreName} ${obj.tier}`;

        let inserted = false;
        for (let child of inventoryContainer.children) {
            let childOreName = child.classList[0]?.replace('ore-', '');
            if (!inventory[childOreName]) continue;

            if (tierOrder[obj.tier] < tierOrder[inventory[childOreName].obj.tier]) {
                inventoryContainer.insertBefore(invDiv, child);
                inserted = true;
                break;
            }
        }

        if (!inserted) {
            inventoryContainer.appendChild(invDiv);
        }
    }
}


function addOrefromSaveData(oreObject, quantity) {
    var oreName = oreObject.Name; 

    inventory[oreName] = {"obj": oreObject, "quantity": quantity}

    appendToInventoryGUI()
}

function addOre(oreObject, isMined) {

    Object.entries(oreObject).forEach(([oreName, oreData]) => {

        if(isMined) {
            addBlocksMined(oreData.quantity)
        }

        if(inventory[oreName]) {
            inventory[oreName].quantity += oreData.quantity;
        } else {
            inventory[oreName] = {"obj": oreData, "quantity": 1}
        }
    
        var inventoryOreTier = inventory[oreName]['obj'].tier
    
        appendToInventoryGUI(oreName);

    });

};

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