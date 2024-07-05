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

const guiOreIndexButton = document.querySelector('.oreIndexButton')
const guiOreIndexContainer = document.querySelector('.oreIndexGuiTopbar')
const guiOreIndexMain = document.querySelector('.oreIndexMainContainer')
const searchBar = document.querySelector('.guiSearch')

let isGuiVisible = 0;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function loadOresIndex(oreDef) {
    for(const [oreName, oreData] of Object.entries(oreDef)) {

        let oreDiv = document.createElement('div');
        oreDiv.classList.add(`oreIndexEntry`);
        oreDiv.classList.add(`${oreData.tier}`);
        oreDiv.textContent = (`${oreData.Name}`);
        let displayTier = capitalizeFirstLetter(oreData.tier);
        oreDiv.onmouseenter = (event) => {
            oreDiv.innerHTML = (`Name: ${oreData.Name} <br> Tier: ${displayTier} <br> Rarity: ${oreData.stringRarity}`);
            event.target.style["z-index"] = 15
            let hoverAnim = anime({
                targets: event.target,
                scale: 2.5,
                rotate: anime.random(-10,10),
                autoplay: true,
                complete: () => {hoverAnim.pause();}
            })
            
        };
        oreDiv.onmouseleave = (event) => {
            event.target.style["z-index"] = 0
            anime({
                targets: event.target,
                duration: 1500,
                scale: 1,
                rotate: 0,
                autoplay: true, 
            })
            oreDiv.innerHTML = (`${oreData.Name}`);
        };

        guiOreIndexMain.appendChild(oreDiv);

    }
}

loadOresIndex(oreDef);

guiOreIndexButton.onclick = () => {
    console.log(guiOreIndexButton)
    if(isGuiVisible == 0) {
        guiOreIndexContainer.style.visibility = "visible";
        anime({
            targets: guiOreIndexContainer,
            opacity: [0, 1],
            scale: [0.7, 1],
            easing: "easeInOutExpo"
        })
        isGuiVisible = 1;
    } else {
        anime({
            targets: guiOreIndexContainer,
            opacity: [1, 0],
            scale: [1, 0.7],
            easing: "easeInOutExpo",
            complete: () => {
                guiOreIndexContainer.style.visibility = "hidden";
                isGuiVisible = 0;
            }
        })
    }
}

const oreIndexNodeList = document.querySelectorAll('.oreIndexEntry')

searchBar.onkeyup = (event) => {
    let input = event.target.value.toLowerCase();
    oreIndexNodeList.forEach(oreEntry => {
        let oreName = oreEntry.textContent.toLowerCase();
        if (oreName.includes(input)) {
            oreEntry.style.display = "";
        } else {
            oreEntry.style.display = "none";
        }
    });
};
