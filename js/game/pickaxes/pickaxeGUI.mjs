import anime from "animejs";
import { craftPickaxe } from "./pickaxeCraft.mjs";
import { equipPickaxe, ownedPickaxes } from "./pickaxesMain.mjs";
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

const chexAxeButton = document.querySelector('.pickaxeButton1');
const CRButton = document.querySelector('.pickaxeButton2');
const CEButton = document.querySelector('.pickaxeButton3');
const TCButton = document.querySelector('.pickaxeButton4');
const WAButton = document.querySelector('.pickaxeButton5');
const CDButton = document.querySelector('.pickaxeButton6');

const chexAxeGUI = document.querySelector('.guiContainerPickaxe.Chexaxe');
const CRGUI = document.querySelector('.guiContainerPickaxe.CR');
const CEGUI = document.querySelector('.guiContainerPickaxe.CE');
const TCGUI = document.querySelector('.guiContainerPickaxe.TC');
const WAGUI = document.querySelector('.guiContainerPickaxe.WA');
const CDGUI = document.querySelector('.guiContainerPickaxe.CD');

const chexAxeCraft = document.querySelector('.craftButton.Chexaxe');
const CRCraft = document.querySelector('.craftButton.ChexforgeRavager');
const CECraft = document.querySelector('.craftButton.ChexquartzExcavator');
const TCCraft = document.querySelector('.craftButton.TitaniumChexblaster');
const WACraft = document.querySelector('.craftButton.Womboaxe');
const CDCraft = document.querySelector('.craftButton.ChexglowDagger');

const pickaxeButtons = {
    "Chexaxe": chexAxeCraft,
    "Chexforge Ravager": CRCraft,
    "Chexquartz Excavator": CECraft,
    "Titanium Chexblaster": TCCraft,
    "Womboaxe": WACraft,
    "Chexglow Dagger": CDCraft,
}

function initCraftButton(button, pickaxe)
{
    if(ownedPickaxes[pickaxe.name]) {
        button.textContent = "Equip";
        button.style.color = "lime";
    }
}

setTimeout(() => {
    initCraftButton(chexAxeCraft, Chexaxe);
    initCraftButton(CRCraft, ChexforgeRavager);
    initCraftButton(CECraft, ChexquartzExcavator);
    initCraftButton(TCCraft, TitaniumChexblaster);
    initCraftButton(WACraft, Womboaxe);
    initCraftButton(CDCraft, ChexglowDagger);
}, 500)

function unequipAllPickaxes () {
    for (let pickaxe in ownedPickaxes) {
        console.log(pickaxe)
        if (ownedPickaxes[pickaxe].equipped) {
            ownedPickaxes[pickaxe].equipped = false;
            let button = pickaxeButtons[pickaxe];
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
CDButton.onclick = () => toggleGUI(CDButton, CDGUI);

function handleCraftButtonClick(button, pickaxeObject, craftFunction, equipFunction) {
    const recipe = pickaxeObject.recipe;

    console.log("Pickaxe Name:", pickaxeObject.name);

    if(!ownedPickaxes[pickaxeObject.name]) {
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
    } else if(ownedPickaxes[pickaxeObject.name]) {
        unequipAllPickaxes()
        button.textContent = "Equipped"
        button.style.color = "lime"
        equipFunction(pickaxeObject)
        ownedPickaxes[pickaxeObject.name].equipped = true;
    }
}

chexAxeCraft.onclick = () => handleCraftButtonClick(chexAxeCraft, Chexaxe, craftPickaxe, equipPickaxe);
CRCraft.onclick = () => handleCraftButtonClick(CRCraft, ChexforgeRavager, craftPickaxe, equipPickaxe);
CECraft.onclick = () => handleCraftButtonClick(CECraft, ChexquartzExcavator, craftPickaxe, equipPickaxe);
TCCraft.onclick = () => handleCraftButtonClick(TCCraft, TitaniumChexblaster, craftPickaxe, equipPickaxe);
WACraft.onclick = () => handleCraftButtonClick(WACraft, Womboaxe, craftPickaxe, equipPickaxe);
CDCraft.onclick = () => handleCraftButtonClick(CDCraft, ChexglowDagger, craftPickaxe, equipPickaxe);