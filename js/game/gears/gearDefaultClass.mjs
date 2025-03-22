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

import { addOre } from "../inventoryHandler.mjs";
import anime from 'animejs';
import { startMining, stopMining, isMining, audioElementSFX, calcTotalBonuses, temporaryGearBonuses, handleOreText } from "../mainGame.mjs";
import { oreDef, selectRandomOre } from "../oreDef.mjs";
import { gameSettings } from "../settingsHandler.mjs";
import { Wheel } from 'spinwheel.js';
import { easeOutCubic } from '../../lib/easing.js'
let lastEffectTimestamp = 0;

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Gear {
    constructor(name, bonuses, penalties, tier, effect, recipe, gearDescription, bonusDescription, penaltyDescription) {
        this.name = name;
        this.bonuses = bonuses;
        this.penalties = penalties;
        this.tier = tier;
        this.effect = effect;
        this.equipped = false;
        this.recipe = recipe;
        this.gearDescription = gearDescription;
        this.bonusDescription = bonusDescription;
        this.penaltyDescription = penaltyDescription;
    }

    applyEffect(miningstate, oreobj) {
        if (this.effect) {
            this.effect(miningstate, oreobj)
        }
    }

    toJSON() {
        return {
            name: this.name,
            bonuses: this.bonuses,
            penalties: this.penalties,
            tier: this.tier,
            equipped: this.equipped,
            recipe: this.recipe,
            gearDescription: this.gearDescription,
            bonusDescription: this.bonusDescription,
            penaltyDescription: this.penaltyDescription
        };
    }

    static fromJSON(json) {
        return new Gear(
            json.name,
            json.bonuses,
            json.penalties,
            json.tier,
            Gear.getEffectFunction(json.name.replace(/\s/g, "") + "Effect"),
            json.recipe,
            json.description,
            json.gearDescription,
            json.bonusDescription,
            json.penaltyDescription
        );
    }

    static getEffectFunction(effectName) {
        const effects = {
            ClayCoilEffect: function (button, oreobj) { // effect
                let currentTime = Date.now();
                if ((currentTime - lastEffectTimestamp >= 2000) && Math.random() < 1 / 100) {
                    if (isMining == true) {
                        button.disabled = true;
                        button.classList.remove('mining');
                        button.classList.add('paused');
                        lastEffectTimestamp = currentTime;
                        console.log("get clayed on");
            
                        stopMining();
            
                        setTimeout(() => {
                            console.log("alright clay is gone");
                            button.classList.remove('paused');
                            button.classList.add('mining');
                            button.disabled = false;
                            startMining();
                        }, 2000);
                    } else {
                        console.log("man you got unlucky!");
                    }
                }
            },
            BismuthBlastBeverageEffect: function (button, oreobj) {
                let currentTime = Date.now();
                if ((currentTime - lastEffectTimestamp >= 2000) && Math.random() < 1 / 40) {
                    if (!gameSettings.muteGearSounds) audioElementSFX.play();
                    let minedBlocks = getRandomArbitrary(40, 50);
                    console.log(minedBlocks)
                    let selectedOreObject = selectRandomOre(oreDef, 0.85, minedBlocks); // 0.85x luck
                    console.log(selectedOreObject);
                    addOre(selectedOreObject, true);
                    handleOreText(selectedOreObject, true);
                }
            },
            WhackyWomboChipsEffect: function (button, oreobj) {
                let currentTime = Date.now();
                if ((currentTime - lastEffectTimestamp >= 2000) && Math.random() < 1 / 100) {
                    console.log("mmm yummy chips!");
                    const oreDupeTiers = new Set(["common", "uncommon", "rare", "master"]);
                    Object.values(oreobj).forEach(details => {
                        let oreTier = details.tier;
                        if (oreDupeTiers.has(oreTier)) {
                            addOre(oreobj, true);
                            handleOreText(oreobj, true);
                            console.log("ores duped!", oreobj);
                        } else {
                            return;
                        }
                    });
                    if (isMining == true) {
                        console.log("NOW STOP. YOU HAVE ATED TOO MANY CHIP.");
                        stopMining();
                        button.disabled = true;
                        button.classList.remove('mining');
                        button.classList.add('paused');
                        lastEffectTimestamp = currentTime;
            
                        setTimeout(() => {
                            console.log("alright you can eat more chip");
                            button.classList.remove('paused');
                            button.classList.add('mining');
                            button.disabled = false;
                            startMining();
                        }, 1000);
                    } else {
                        console.log("man you got unlucky!")
                    }
                }
            },
            MagnesiumReactorCoreEffect: function (button, oreobj) {
                let currentTime = Date.now();
                if ((currentTime - lastEffectTimestamp >= 2000) && Math.random() < 1 / 150) {
                    if (isMining == true) {
                        button.disabled = true;
                        button.classList.remove('mining');
                        button.classList.add('paused');
                        lastEffectTimestamp = currentTime;
                        console.log("get magnesiumed on");
            
                        stopMining();
            
                        setTimeout(() => {
                            console.log("goodbye magnesium");
                            button.classList.remove('paused');
                            button.classList.add('mining');
                            button.disabled = false;
                            startMining();
                        }, 2000);
                    } else {
                        console.log("man you got unlucky!");
                    }
                }
            },
            WheelofFateEffect: function(button, oreobj) {
                let currentTime = Date.now();
                if ((currentTime - lastEffectTimestamp >= 2000) && Math.random() < 1 / 400) {
                    if (isMining === true) {
                        button.disabled = true;
                        button.classList.remove('mining');
                        button.classList.add('paused');
                        lastEffectTimestamp = currentTime;
                        console.log("lets go gambling!!!!!!");
            
                        stopMining();
            
                        // create overlay
                        const overlay = document.createElement('div');
                        overlay.id = 'overlay';
                        overlay.style.opacity = '0'; // ensure it's 0 initially
                        overlay.style.position = 'fixed';
                        overlay.style.top = '0';
                        overlay.style.left = '0';
                        overlay.style.width = '100vw';
                        overlay.style.height = '100vh';
                        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                        overlay.style.zIndex = '999';
                        overlay.style.display = 'flex';
                        overlay.style.justifyContent = 'center';
                        overlay.style.alignItems = 'center';

                        const wheelContainer = document.createElement('div');
                        wheelContainer.className = 'wheel-container';
                        wheelContainer.style.width = '100vw';
                        wheelContainer.style.height = '100vh';
                        overlay.appendChild(wheelContainer);
                        document.body.appendChild(overlay);

                        const pointer = document.createElement('div');
                        pointer.className = 'wheel-pointer';
                        overlay.appendChild(pointer);

                        anime({
                            targets: overlay,
                            opacity: [0, 1], // fade in
                            scale: [0.8, 1], // scale up slightly
                            duration: 500,
                            easing: "easeOutQuad"
                        });
                        
            
                        const props = {
                            items: [
                                { label: "+100 Blocks Mined" },
                                { label: "+0.75x luck (4s)" },
                                { label: "-50 Mining Delay (6s)" },
                                { label: "Nothing" },
                                { label: "+300 Mining Delay (15s)"}
                            ],
                            onRest: function (event) {
                                let outcome = event.currentIndex
                                switch (outcome) {
                                    case 0:
                                        console.log('one hundo blocks go to you!');
                                        let selectedOreObject = selectRandomOre(oreDef, 1, 100);
                                        console.log(selectedOreObject);
                                        addOre(selectedOreObject, true);
                                        handleOreText(selectedOreObject, true);
                                        break;
                                    case 1:
                                        console.log("it's ORE TIME!");
                                        temporaryGearBonuses.luck += 0.75;
                                        calcTotalBonuses();
                                
                                        setTimeout(() => {
                                            temporaryGearBonuses.luck -= 0.75;
                                            calcTotalBonuses();
                                            console.log("the luck... its gone...");
                                        }, 4000);
                                        break;
                                    case 2:
                                        console.log("the speed...");
                                        temporaryGearBonuses.miningSpeed -= 50;
                                        calcTotalBonuses();
                                
                                        setTimeout(() => {
                                            temporaryGearBonuses.miningSpeed += 50;
                                            calcTotalBonuses();
                                            console.log("bye speed");
                                        }, 6000);
                                        break;
                                    case 3:
                                        console.log("absolutely nothing");
                                        break;
                                    case 4:
                                        temporaryGearBonuses.miningSpeed += 300;
                                        calcTotalBonuses();
                                
                                        setTimeout(() => {
                                            temporaryGearBonuses.miningSpeed -= 300;
                                            calcTotalBonuses();
                                            console.log("and we're back!");
                                        }, 15000);
                                        break;
                                    default:
                                        console.log("say what");
                                }
                                anime({
                                    targets: overlay,
                                    opacity: [1, 0],
                                    duration: 300,
                                    easing: "easeInQuad",
                                    complete: () => {
                                        wheel.remove();
                                        overlay.remove()
                                    }
                                });                                
                                button.classList.remove('paused');
                                button.classList.add('mining');
                                button.disabled = false;
                                startMining();
                            },
                            "borderColor": "#000",
                            "borderWidth": 1,
                            "debug": false,
                            "image": null,
                            "isInteractive": true,
                            "itemBackgroundColors": [
                              "#0345fc",
                              "#03fc20",
                              "#f0fc03",
                              "#fc0303",
                              "#fc0303"
                            ],
                            "itemLabelAlign": "right",
                            "itemLabelBaselineOffset": 0,
                            "itemLabelColors": [
                              "#000"
                            ],
                            "itemLabelFont": "sans-serif",
                            "itemLabelFontSizeMax": 47,
                            "itemLabelRadius": 0.78,
                            "itemLabelRadiusMax": 0.2,
                            "itemLabelRotation": 0,
                            "itemLabelStrokeColor": "#fff",
                            "itemLabelStrokeWidth": 0,
                            "lineColor": "#000",
                            "lineWidth": 4.6000000000000005,
                            "overlayImage": null,
                            "pixelRatio": 1,
                            "pointerAngle": 0,
                            "radius": 0.75,
                            "rotationResistance": -200,
                            "rotationSpeedMax": 728
                        }

                        const winningIndex = Math.floor(Math.random() * props.items.length);
                        const duration = 4000;
                        const easing = easeOutCubic;

                        const wheel = new Wheel(wheelContainer, props);
                        wheel.isInteractive = false;

                        wheel.spinToItem(winningIndex, duration, true, 2, 1, easing);

                    } else {
                        console.log("man you got unlucky!");
                    }
                }
            },
            ChexiumChronographEffect: function (button, oreobj) {
                let currentTime = Date.now();
                if ((currentTime - lastEffectTimestamp >= 10000) && Math.random() < 1 / 250) {
                    // calculate time-based bonus
                    let now = new Date();
                    let totalSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
                    let timeScale = totalSeconds / 86400;
                    let luckBoost = 0.01 + (0.2 - 0.01) * timeScale;

                    console.log(luckBoost)

                    // apply boost
                    let storedBoost = luckBoost;
                    temporaryGearBonuses.luck += luckBoost;
                    calcTotalBonuses();

                    console.log(`the power of the sun (or moon) is quite compelling`);

                    // remove boost after 20 seconds
                    setTimeout(() => {
                        temporaryGearBonuses.luck -= storedBoost;
                        calcTotalBonuses();
                        console.log(`no more`);
                    }, 10000);
                }
            },
        };
        return effects[effectName] || null;      
    }

}

export { Gear };