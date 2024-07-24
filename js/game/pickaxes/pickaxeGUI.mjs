import anime from "animejs";
import { craftPickaxe } from "./pickaxeCraft.mjs";
import { equipPickaxe, ownedPickaxes } from "./pickaxesMain.mjs";
import { chexaxeRecipe, pickaxeObjectChexaxe } from "./the-chexaxe.mjs";
import { chexforgeravagerRecipe, pickaxeObjectChexforgeRavager } from "./chexforge-ravager.mjs";
import { chexquartzexcavatorRecipe, pickaxeObjectChexquartzExcavator } from "./chexquartz-excavator.mjs";
import { pickaxeObjectTitaniumChexblaster, titaniumchexblasterRecipe } from "./titanium-chexblaster.mjs";
import { pickaxeObjectWomboaxe, womboaxeRecipe } from "./womboaxe.mjs";

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

const chexAxeButton = document.querySelector('.pickaxeButton1');
const CRButton = document.querySelector('.pickaxeButton2');
const CEButton = document.querySelector('.pickaxeButton3');
const TCButton = document.querySelector('.pickaxeButton4');
const WAButton = document.querySelector('.pickaxeButton5');

const chexAxeGUI = document.querySelector('.guiContainerPickaxe.Chexaxe');
const CRGUI = document.querySelector('.guiContainerPickaxe.CR');
const CEGUI = document.querySelector('.guiContainerPickaxe.CE');
const TCGUI = document.querySelector('.guiContainerPickaxe.TC');
const WAGUI = document.querySelector('.guiContainerPickaxe.WA');

const chexAxeCraft = document.querySelector('.craftButton.Chexaxe');
const CRCraft = document.querySelector('.craftButton.ChexforgeRavager');
const CECraft = document.querySelector('.craftButton.ChexquartzExcavator');
const TCCraft = document.querySelector('.craftButton.TitaniumChexblaster');
const WACraft = document.querySelector('.craftButton.Womboaxe');

const pickaxeButtons = {
    "Chexaxe": chexAxeCraft,
    "Chexforge Ravager": CRCraft,
    "Chexquartz Excavator": CECraft,
    "Titanium Chexblaster": TCCraft,
    "Womboaxe": WACraft
}

function initCraftButton(button, pickaxeName)
{
    if(ownedPickaxes[pickaxeName]) {
        button.textContent = "Equip";
        button.style.color = "lime";
    }
}

setTimeout(() => {
    initCraftButton(chexAxeCraft, "Chexaxe");
    initCraftButton(CRCraft, "Chexforge Ravager");
    initCraftButton(CECraft, "Chexquartz Excavator");
    initCraftButton(TCCraft, "Titanium Chexblaster");
    initCraftButton(WACraft, "Womboaxe");
}, 500)

function unequipAllPickaxes () {
    for (let pickaxeName in ownedPickaxes) {
        if (ownedPickaxes[pickaxeName].Equipped) {
            ownedPickaxes[pickaxeName].Equipped = false;
            let button = pickaxeButtons[pickaxeName];
            if(button) {
                button.textContent = "Equip";
                button.style.color = "lime";
            }
        }
    }
}

function toggleGUI(button, gui) {
    if (gui.style.visibility == "hidden") {
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

chexAxeButton.onclick = () => toggleGUI(chexAxeButton, chexAxeGUI);
CRButton.onclick = () => toggleGUI(CRButton, CRGUI);
CEButton.onclick = () => toggleGUI(CEButton, CEGUI);
TCButton.onclick = () => toggleGUI(TCButton, TCGUI);
WAButton.onclick = () => toggleGUI(WAButton, WAGUI);

function handleCraftButtonClick(button, pickaxeObject, recipe, craftFunction, equipFunction) {
    if(!ownedPickaxes[pickaxeObject.Name]) {
        if(craftFunction(pickaxeObject, recipe)) {
            button.textContent = "Equip"
            button.style.color = "lime"
        } else {
            button.textContent = "nope"
            button.style.color = "red"
            setTimeout(() => {
                button.textContent = "Craft"
                button.style.color = "white" 
            }, 650)
        }
    } else if(ownedPickaxes[pickaxeObject.Name]) {
        unequipAllPickaxes()
        button.textContent = "Equipped"
        button.style.color = "lime"
        equipFunction(pickaxeObject)
        ownedPickaxes[pickaxeObject.Name].Equipped = true;
    }
}

chexAxeCraft.onclick = () => handleCraftButtonClick(chexAxeCraft, pickaxeObjectChexaxe, chexaxeRecipe, craftPickaxe, equipPickaxe);
CRCraft.onclick = () => handleCraftButtonClick(CRCraft, pickaxeObjectChexforgeRavager, chexforgeravagerRecipe, craftPickaxe, equipPickaxe);
CECraft.onclick = () => handleCraftButtonClick(CECraft, pickaxeObjectChexquartzExcavator, chexquartzexcavatorRecipe, craftPickaxe, equipPickaxe);
TCCraft.onclick = () => handleCraftButtonClick(TCCraft, pickaxeObjectTitaniumChexblaster, titaniumchexblasterRecipe, craftPickaxe, equipPickaxe);
WACraft.onclick = () => handleCraftButtonClick(WACraft, pickaxeObjectWomboaxe, womboaxeRecipe, craftPickaxe, equipPickaxe);