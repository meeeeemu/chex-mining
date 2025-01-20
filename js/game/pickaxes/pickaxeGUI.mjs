import anime from "animejs";
import { craftPickaxe } from "./pickaxeCraft.mjs";
import { equipPickaxe, ownedPickaxes } from "./pickaxesMain.mjs";

// Array of pickaxe file paths
const pickaxeFiles = [
    "./pickaxefiles/the-chexaxe.mjs",
    "./pickaxefiles/chexforge-ravager.mjs",
    "./pickaxefiles/chexquartz-excavator.mjs",
    "./pickaxefiles/titanium-chexblaster.mjs",
    "./pickaxefiles/womboaxe.mjs",
    "./pickaxefiles/chexglow-dagger.mjs",
    "./pickaxefiles/chexstick.mjs",
    "./pickaxefiles/casino-crusher.mjs",
    "./pickaxefiles/chexium-matter-manipulator.mjs"
];

// Container elements for buttons and GUIs
const buttonContainer = document.querySelector('.buttonGroup');
const mainGuiContainer = document.querySelector('.mainGuiContainer');

// Initialize pickaxe data and generate GUI
async function initializePickaxes() {
    const pickaxes = [];

    // Load each pickaxe and store in an array
    for (const filePath of pickaxeFiles) {
        try {
            const pickaxeModule = await import(filePath);
            const pickaxe = Object.values(pickaxeModule)[0]; // Access the first export (assuming it's the pickaxe instance)
            pickaxes.push(pickaxe); // Add pickaxe to array for sorting later
        } catch (error) {
            console.error(`Failed to load pickaxe from ${filePath}:`, error);
        }
    }

    // Sort pickaxes by their tier
    pickaxes.sort((a, b) => a.tier - b.tier);

    // Create GUI elements for each sorted pickaxe
    for (const pickaxe of pickaxes) {
        // Normalize the pickaxe name to use in CSS class names (replace spaces with hyphens)
        const normalizedPickaxeName = pickaxe.name.replace(/\s+/g, '-');

        // Create button for pickaxe in the list
        const button = document.createElement('button');
        button.classList.add('pickaxeSelectButton');
        button.style.width = '100%';  // Ensure full width of container
        button.style.padding = '10px'; // Add padding
        button.style.marginBottom = '5px'; // Space between buttons
        button.textContent = `${pickaxe.name} (Tier ${pickaxe.tier})`;
        buttonContainer.appendChild(button);

        // Create a detailed GUI panel for each pickaxe
        const gui = document.createElement('div');
        gui.classList.add('guiContainerPickaxe', normalizedPickaxeName, 'draggable');
        gui.style.visibility = 'hidden'; // Initial state is hidden

        // Populate GUI panel with pickaxe details
        gui.innerHTML = `
            <div class="guiSubContainer"></div>
            <div class="guiText ${normalizedPickaxeName}"> > ${pickaxe.name} </div>
            <div class="guiPickaxesMain">
                <div class="guiPickaxeInfo">
                    <div>${pickaxe.description || 'No description available.'}</div>
                    <br>
                    -----------------------------------
                    <br><br>
                    Stats:<br><br>
                    ${pickaxe.bonuses.Luck > 0 ? `<div class="luckText">Luck: +${pickaxe.bonuses.Luck}x</div>` : ''}
                    <div class="miningSpeedText">Speed: ${pickaxe.bonuses.Blocks_Mined || 'Undefined'} block(s) every ${pickaxe.bonuses.Speed / 1000 || 'Undefined'}s</div>
                </div>
                <div class="guiPickaxeRecipe">
                    Recipe:<br>
                    ${Object.entries(pickaxe.recipe).map(([material, qty]) => `<div class="${material} ${normalizedPickaxeName}">${qty.quantity || 0}/${qty.quantity} ${material}</div>`).join('')}
                </div>
                <div class="guiPickaxeCraftButtonContainer">
                    <button class="craftButton ${normalizedPickaxeName}">Craft</button>
                </div>
            </div>
        `;
        mainGuiContainer.appendChild(gui);

        // Attach toggle functionality to each button to show/hide GUI
        button.onclick = () => toggleGUI(button, gui);

        // Attach functionality to craft button inside the GUI
        const craftButton = gui.querySelector(`.craftButton.${normalizedPickaxeName}`);
        craftButton.onclick = () => handleCraftButtonClick(craftButton, pickaxe, craftPickaxe, equipPickaxe);

        // Initialize button text for crafted pickaxes
        initCraftButton(craftButton, pickaxe);
    }
}

// Function to initialize craft button text and style
function initCraftButton(button, pickaxe) {
    if (ownedPickaxes[pickaxe.name]) {
        button.textContent = "Equip";
        button.style.color = "lime";
    }
}

// Unequip all pickaxes function
function unequipAllPickaxes() {
    for (let pickaxe in ownedPickaxes) {
        if (ownedPickaxes[pickaxe].equipped) {
            ownedPickaxes[pickaxe].equipped = false;
            const normalizedPickaxeName = pickaxe.replace(/\s+/g, '-');
            const button = document.querySelector(`.craftButton.${normalizedPickaxeName}`);
            if (button) {
                button.textContent = "Equip";
                button.style.color = "lime";
            }
        }
    }
}

// Toggle GUI visibility with animation
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

// Handle craft button click event
function handleCraftButtonClick(button, pickaxeObject, craftFunction, equipFunction) {
    const recipe = pickaxeObject.recipe;

    if (!ownedPickaxes[pickaxeObject.name]) {
        if (craftFunction(pickaxeObject, recipe)) {
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
    } else if (ownedPickaxes[pickaxeObject.name]) {
        unequipAllPickaxes();
        button.textContent = "Equipped";
        button.style.color = "lime";
        equipFunction(pickaxeObject);
        ownedPickaxes[pickaxeObject.name].equipped = true;
    }
}

// Initialize pickaxes on page load
document.addEventListener('DOMContentLoaded', initializePickaxes);
