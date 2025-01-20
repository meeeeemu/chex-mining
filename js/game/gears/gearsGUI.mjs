import anime from "animejs";
import { craftGear } from "./gearsCraft.mjs";
import { equipGear, ownedGears } from "./gearsMain.mjs";

const gearFiles = [
    "./gearfiles/claycoil.mjs",
    "./gearfiles/bismuthblastbeverage.mjs",
    "./gearfiles/whackywombochips.mjs",
    "./gearfiles/magnesiumreactorcore.mjs",
    "./gearfiles/wheeloffate.mjs",
];

const buttonContainer = document.querySelector('.guiContainerGears .guiGearsMain');
const mainGuiContainer = document.querySelector('.mainGuiContainer');

function normalizeName(name) {
    return name.replace(/\s+/g, '-');
}

async function initializeGears() {
    const gearModules = [];
    for (const filePath of gearFiles) {
        try {
            const module = await import(filePath);
            const gearObject = Object.values(module)[0];
            gearModules.push({ name: gearObject.name, module: gearObject });
        } catch (error) {
            console.error(`failed to load gear from ${filePath}:`, error);
        }
    }

    gearModules.forEach(({ name, module }) => {
        const normalizedGearName = normalizeName(name);

        const button = document.createElement('button');
        button.classList.add('gearSelectButton');
        button.textContent = `${name} (Tier ${module.tier})`;
        buttonContainer.appendChild(button);

        buttonContainer.classList.add('buttonGroup');

        const gui = document.createElement('div');
        gui.classList.add('guiContainerGear', normalizedGearName, 'draggable');
        gui.style.visibility = 'hidden';

        gui.innerHTML = `
            <div class="guiSubContainer"></div>
            <div class="guiText ${normalizedGearName}"> > ${name} </div>
            <div class="guiGearsMain buttonGroup">
                <div class="guiGearInfo">
                    <div>${module.gearDescription || 'No description available.'}</div>
                    <br>
                    -----------------------------------
                    <br><br>
                    Abilities:<br><br>
                    ${module.bonuses.Luck ? `<div class="luckText">Luck: +${module.bonuses.Luck}x</div>` : ''}
                    <div class="bonusText">${module.bonusDescription || ''}</div><br>
                    Penalties:<br><br>
                    <div class="penaltyText">${module.penaltyDescription || ''}</div>
                </div>
                <div class="guiGearRecipe">
                    Recipe:<br>
                    ${Object.entries(module.recipe).map(([material, qty]) => `<div class="${material} ${normalizedGearName}">${qty.quantity || 0}/${qty.quantity} ${material}</div>`).join('')}
                </div>
                <div class="guiGearCraftButtonContainer">
                    <button class="craftButton ${normalizedGearName}">Craft</button>
                </div>
            </div>
        `;
        mainGuiContainer.appendChild(gui);

        button.onclick = () => toggleGUI(gui);

        const craftButton = gui.querySelector(`.craftButton.${normalizedGearName}`);
        craftButton.onclick = () => handleCraftButtonClick(craftButton, module, craftGear, equipGear);

        initCraftButton(craftButton, name);
    });
}

function initCraftButton(button, gearName) {
    if (ownedGears[gearName]) {
        button.textContent = "Equip";
        button.style.color = "lime";
    }
}

function unequipAllGears() {
    for (let gearName in ownedGears) {
        if (ownedGears[gearName].equipped) {
            ownedGears[gearName].equipped = false;
            const normalizedGearName = normalizeName(gearName);
            const button = document.querySelector(`.craftButton.${normalizedGearName}`);
            if (button) {
                button.textContent = "Equip";
                button.style.color = "lime";
            }
        }
    }
}

function toggleGUI(gui) {
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

document.addEventListener('DOMContentLoaded', initializeGears);
