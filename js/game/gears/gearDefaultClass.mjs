import { addOre } from "../inventoryHandler.mjs";
import { startMining, stopMining, isMining, audioElementSFX } from "../mainGame.mjs";
import { oreDef, selectRandomOre } from "../oreDef.mjs";
import { gameSettings } from "../settingsHandler.mjs";
import anime from "animejs";

let lastEffectTimestamp = 0;

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
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
                    if (isMining == 1) {
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
                    console.log("bbb go");
                    if (!gameSettings.muteGearSounds) audioElementSFX.play();
                    let minedBlocks = getRandomArbitrary(40, 50);
                    let selectedOreObject = selectRandomOre(oreDef, 0.85, minedBlocks);
                    addOre(selectedOreObject, true);
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
                            console.log("ores duped!", oreobj);
                        } else {
                            return;
                        }
                    });
                    if (isMining == 1) {
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
                    if (isMining == 1) {
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
            WheelofFateEffect: function (button, oreobj) {
                let currentTime = Date.now();
                if ((currentTime - lastEffectTimestamp >= 2000) && Math.random() < 1 / 4) {
                    if (isMining == 1) {
                        button.disabled = true;
                        button.classList.remove('mining');
                        button.classList.add('paused');
                        lastEffectTimestamp = currentTime;
                        console.log("lets go gambling!!!!!!");
            
                        stopMining();

                        const overlay = document.createElement('div');
                        overlay.id = 'overlay';
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
                        wheelContainer.id = 'wheelContainer';
                        wheelContainer.style.position = 'relative';
                        wheelContainer.style.width = '400px';
                        wheelContainer.style.height = '400px';
                        wheelContainer.style.borderRadius = '50%';
                        wheelContainer.style.zIndex = '1000';
                        wheelContainer.style.background = 'white';

                        const outcomes = ['+100 Blocks Mined', '+0.1x luck (10s)', '-50 Mining Delay (10s)', 'Nothing', '+300 Mining Delay (10s)'];
                        const colours = ['#b7ff00', '#e61e60', '#1eb7e6', '#ff0004', '#1ee63f'];

                        const segmentAngle = 360 / outcomes.length;

                        let gradientStops = [];
                        for (let i = 0; i < outcomes.length; i++) {
                            const startAngle = i * segmentAngle;
                            const endAngle = (i + 1) * segmentAngle;
                            gradientStops.push(`${colours[i]} ${startAngle}deg ${endAngle}deg`);
                        }
                        const gradientStr = 'conic-gradient(' + gradientStops.join(', ') + ')';
                        wheelContainer.style.background = gradientStr;

                        const svgNamespace = 'http://www.w3.org/2000/svg';
                        const svg = document.createElementNS(svgNamespace, 'svg');
                        svg.setAttribute('width', '400');
                        svg.setAttribute('height', '400');
                        svg.style.position = 'absolute';
                        svg.style.top = '0';
                        svg.style.left = '0';
                        svg.style.transform = 'rotate(-72deg)';

                        const radius = 170;

                        outcomes.forEach((outcome, i) => {
                            const path = document.createElementNS(svgNamespace, 'path');
                            const startAngle = i * segmentAngle;
                            const endAngle = (i + 1) * segmentAngle;
                            const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
                        
                            const startX = 200 + radius * Math.cos((startAngle - 90) * (Math.PI / 180));
                            const startY = 200 + radius * Math.sin((startAngle - 90) * (Math.PI / 180));
                            const endX = 200 + radius * Math.cos((endAngle - 90) * (Math.PI / 180));
                            const endY = 200 + radius * Math.sin((endAngle - 90) * (Math.PI / 180));
                        
                            const pathData = `
                                M ${startX} ${startY}
                                A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
                            `;
                            path.setAttribute('d', pathData);
                            path.setAttribute('id', `path${i}`);
                            path.setAttribute('fill', 'none');
                            svg.appendChild(path);
                        
                            const text = document.createElementNS(svgNamespace, 'text');
                            const textPath = document.createElementNS(svgNamespace, 'textPath');
                            textPath.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#path${i}`);
                            textPath.setAttribute('startOffset', '50%');
                            textPath.setAttribute('text-anchor', 'middle');
                            textPath.style.fontSize = '18px';
                            textPath.style.fontWeight = 'bold';
                            textPath.style.fill = '#fff';
                            textPath.style.fontFamily = '"Dosis", sans-serif';
                            textPath.textContent = outcome;
                        
                            text.appendChild(textPath);
                            svg.appendChild(text);
                        });

                        wheelContainer.appendChild(svg);
                        overlay.appendChild(wheelContainer);
                        document.body.appendChild(overlay);

                        anime({
                            targets: wheelContainer,
                            scale: [0, 1],
                            easing: 'easeOutQuad',
                            duration: 1000,
                            complete: () => {
                                const spinDuration = 3000;
                                const randomIndex = Math.floor(Math.random() * outcomes.length);
                                const segmentAngle = 360 / outcomes.length;

                                
                                const pointer = document.createElement('div');
                                pointer.style.position = 'fixed';
                                
                                pointer.style.top = 'calc(50% - 220px)';
                                pointer.style.left = '50%';
                                pointer.style.width = '0';
                                pointer.style.height = '0';

                                pointer.style.borderLeft = '15px solid transparent';
                                pointer.style.borderRight = '15px solid transparent';
                                pointer.style.borderTop = '20px solid #fff';
                                pointer.style.zIndex = '1001';
                                pointer.style.transform = 'translateX(-50%)';


                                document.body.appendChild(pointer);

                                
                                const extraRotations = Math.floor(Math.random() * 2 + 5);
                                const randomness = Math.random() * segmentAngle;
                                const targetAngle = (extraRotations * 360) + randomness + (segmentAngle * randomIndex);
                                
                                console.log(`Target Angle: ${targetAngle}`);

                                anime({
                                    targets: wheelContainer,
                                    rotate: targetAngle,
                                    easing: 'easeOutQuad',
                                    duration: spinDuration,
                                    complete: () => {

                                        const finalRotation = (targetAngle % 360 + 360) % 360;
                                        console.log(`Final Rotation: ${finalRotation}`);
                                
[]
                                        const pointerOffset = segmentAngle / 2;
                                        const adjustedRotation = (finalRotation + pointerOffset) % 360;
                                        console.log(`Adjusted Rotation: ${adjustedRotation}`);
                                
                                        const selectedIndex = Math.floor(adjustedRotation / segmentAngle) % outcomes.length;
                                        console.log(`Selected Index: ${selectedIndex}`);
                                

                                        console.log(`Selected outcome: ${outcomes[selectedIndex]}`);

                                        anime({
                                            targets: [overlay, pointer],
                                            opacity: [1, 0],
                                            easing: 'easeInQuad',
                                            duration: 1000,
                                            complete: () => {
                                                overlay.remove();
                                                pointer.remove();
                                                console.log("goodbye magnesium");
                                                button.classList.remove('paused');
                                                button.classList.add('mining');
                                                button.disabled = false;
                                                startMining();
                                            }
                                        });
                                    }
                                });                                
                            }
                        });

            
                        // setTimeout(() => {
                        //     console.log("goodbye magnesium");
                        //     button.classList.remove('paused');
                        //     button.classList.add('mining');
                        //     button.disabled = false;
                        //     startMining();
                        // }, 2000);
                    } else {
                        console.log("man you got unlucky!");
                    }
                }
            }
        };
        return effects[effectName] || null;      
    }

}

export { Gear };