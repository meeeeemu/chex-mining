import anime from "animejs";
import { craftGear } from "./gearsCraft.mjs";
import { equipGear, ownedGears } from "./gearsMain.mjs";
import { clayCoil } from "./gearfiles/claycoil.mjs";
import { bismuthBlastBeverage } from "./gearfiles/bismuthblastbeverage.mjs";

const clayCoilButton = document.querySelector('.gearButton1');
const bismuthBlastBeverageButton = document.querySelector('.gearButton2');

const clayCoilGUI = document.querySelector('.guiContainerGear.Clay-Coil');
const bismuthBlastBeverageGUI = document.querySelector('.guiContainerGear.Bismuth-Blast-Beverage');

const clayCoilCraft = document.querySelector('.craftButton.Clay-Coil');
const bismuthBlastBeverageCraft = document.querySelector('.craftButton.Bismuth-Blast-Beverage');

const gearButtons = {
    "Clay Coil": clayCoilCraft,
    "Bismuth Blast Beverage": bismuthBlastBeverageCraft
};

function initCraftButton(button, gearName) {
    if (ownedGears[gearName]) {
        button.textContent = "Equip";
        button.style.color = "lime";
    }
}

setTimeout(() => {
    initCraftButton(clayCoilCraft, "Clay Coil");
    initCraftButton(bismuthBlastBeverageCraft, "Bismuth Blast Beverage");
}, 500);

function unequipAllGears() {
    for (let gearName in ownedGears) {
        if (ownedGears[gearName].equipped) {
            ownedGears[gearName].equipped = false;
            let button = gearButtons[gearName];
            if (button) {
                button.textContent = "Equip";
                button.style.color = "lime";
            }
        }
    }
}

function toggleGUI(button, gui) {
    if (gui.style.visibility === "hidden") {
        gui.style.visibility = "visible";
        anime({
            targets: gui,
            opacity: [0, 1],
            duration: 500,
            scale: [0, 1],
            easing: "easeInOutExpo"
        });
    } else {
        anime({
            targets: gui,
            opacity: [1, 0],
            scale: [1, 0],
            duration: 500,
            easing: "easeInOutExpo",
            complete: function () {
                gui.style.visibility = "hidden";
            }
        });
    }
}

clayCoilButton.onclick = () => toggleGUI(clayCoilButton, clayCoilGUI);
bismuthBlastBeverageButton.onclick = () => toggleGUI(bismuthBlastBeverageButton, bismuthBlastBeverageGUI);

function handleCraftButtonClick(button, gearObject, craftFunction, equipFunction) {
    const recipe = gearObject.recipe;

    if (!ownedGears[gearObject.name]) {
        if (craftFunction(gearObject, recipe)) {
            button.textContent = "Equip";
            button.style.color = "lime";
        } else {
            button.textContent = "nope";
            button.style.color = "red";
            setTimeout(() => {
                button.textContent = "Craft";
                button.style.color = "white";
            }, 650);
        }
    } else if (ownedGears[gearObject.name]) {
        unequipAllGears();
        button.textContent = "Equipped";
        button.style.color = "lime";
        equipFunction(gearObject);
        ownedGears[gearObject.name].equipped = true;
    }
}

clayCoilCraft.onclick = () => handleCraftButtonClick(clayCoilCraft, clayCoil, craftGear, equipGear);
bismuthBlastBeverageCraft.onclick = () => handleCraftButtonClick(bismuthBlastBeverageCraft, bismuthBlastBeverage, craftGear, equipGear);
