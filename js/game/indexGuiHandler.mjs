import { oreDef } from "./oreDef.mjs";
import anime from 'animejs';

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

const guiOreIndexMain = document.querySelector('#oreindex .panelContent .oreIndexContainer')

const searchBar = document.querySelector('#oreindex .panelHeader .oreSearch')

const tierPalette = {
    common: 'rgb(110,110,110)',
    uncommon: 'rgb(173,129,129)',
    rare: 'rgb(200,174,109)',
    master: 'rgb(160,181,120)',
    unreal: 'rgb(98,162,110)',
    exotic: 'rgb(96,171,160)',
    pristine: 'rgb(97,133,174)',
    pure: 'rgb(75,88,171)',
    virtuous: 'rgb(143,78,184)',
    dreamlike: 'rgb(255,255,255)',
};

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

function openTile(tile, details) {
    tile.isOpen = true;

    details.style.display = 'block';
    const targHeight = details.scrollHeight;

    anime({
        targets: details,
        height: [0, targHeight],
        opacity: [0, 1],
        duration: 400,
        easing: 'easeInOutQuad',
        complete: () => {
            details.style.height = 'auto';
        }
    })
}

function closeTile(tile, details) {
    tile.isOpen = false;
    const targHeight = details.scrollHeight;

    anime({
        targets: details,
        height: [targHeight, 0],
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInOutQuad',
        complete: () => {
            details.style.display = 'none';
        }
    })
}

function tileToggle(tile) {
    const details = tile.querySelector('.oreDetails');

    tile.isOpen = false;

    tile.addEventListener('click', () => {
        tile.isOpen ? closeTile(tile, details) : openTile(tile, details);
    })
}

function normalizeName(name) {
  return name.replace(/[-\s]+/g, ' ').replace(/_/g, '.');
}

function oreTile(ore) {
    const tile = document.createElement('div');
    tile.classList.add('oreTile', ore.tier);

    const header = document.createElement('div');
    header.className = 'oreHeader';
    header.textContent = normalizeName(ore.Name);

    const details = document.createElement('div');
    details.className = 'oreDetails';
    details.innerHTML = `
        <b>Rarity: </b> ${ore.stringRarity}<br>
        <b>Tier: </b> ${toTitleCase(ore.tier)}<br>
    `;

    tile.append(header, details);
    return tile;
}

function reloadIndexEntries(oreDef, workspace, activeTier = "all", searchTerm = '') {
    workspace.textContent = "";
    Object.values(oreDef).forEach(e => {
        if(activeTier !== "all" && e.tier !== activeTier) return;
        if (searchTerm && !e.Name.toLowerCase().includes(searchTerm)) return;

        const tile = oreTile(e)
        workspace.appendChild(tile);
        tileToggle(tile);
    })
}

function buildOreIndex(oreDef, container = guiOreIndexMain) {
    container.textContent = '';

    const layout = document.createElement('div');
    const tierColumn = document.createElement('aside');
    const workspace = document.createElement('section');

    layout.className = "oreIndexLayout";
    tierColumn.className = 'tierColumn';
    workspace.className = 'oreWorkspace';

    layout.append(tierColumn, workspace);
    container.append(layout);

    const allButton = document.createElement('button');
    allButton.className = 'tierButton is-active';
    allButton.dataset.tier = 'all';
    allButton.textContent = 'All';
    tierColumn.appendChild(allButton);

    for(const tier of Object.keys(tierPalette)){
        const button = document.createElement('button');
        button.className = 'tierButton';
        button.dataset.tier = tier;
        button.textContent = tier[0].toUpperCase() + tier.slice(1);
        button.style.setProperty('--stripe-color', tierPalette[tier]);
        button.style.color = tierPalette[tier];
        tierColumn.appendChild(button);
    }

    let activeTier = 'all';

    let searchTerm = ''

    searchBar.addEventListener('input', e => {
        searchTerm = e.target.value.trim().toLowerCase();
        reloadIndexEntries(oreDef, workspace, activeTier, searchTerm);
    })

    reloadIndexEntries(oreDef, workspace, activeTier, searchTerm);

    tierColumn.addEventListener('click', e => {
        const button = e.target.closest('.tierButton');
        if(!button) return;

        tierColumn.querySelectorAll('.tierButton').forEach(b=>b.classList.toggle('is-active', b===button));
        activeTier = button.dataset.tier;
        reloadIndexEntries(oreDef, workspace, activeTier, searchTerm);
    })


}

buildOreIndex(oreDef)