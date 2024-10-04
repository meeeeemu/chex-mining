import { addOre } from "../inventoryHandler.mjs";
import { startMining, stopMining, isMining, audioElementSFX } from "../mainGame.mjs";
import { oreDef, selectRandomOre } from "../oreDef.mjs";
import { gameSettings } from "../settingsHandler.mjs";

let lastEffectTimestamp = 0;

class Gear {
    constructor(name, bonuses, penalties, tier, effect, recipe) {
        this.name = name;
        this.bonuses = bonuses;
        this.penalties = penalties;
        this.tier = tier;
        this.effect = effect;
        this.equipped = false;
        this.recipe = recipe;
    }

    applyEffect(miningstate) {
        if (this.effect) {
            this.effect(miningstate)
        }
    }

    toJSON() {
        return {
            name: this.name,
            bonuses: this.bonuses,
            penalties: this.penalties,
            tier: this.tier,
            equipped: this.equipped,
            recipe: this.recipe
        };
    }

    static fromJSON(json) {
        return new Gear(
            json.name,
            json.bonuses,
            json.penalties,
            json.tier,
            Gear.getEffectFunction(json.name.replace(/\s/g, "") + "Effect"),
            json.recipe
        );
    }

    static getEffectFunction(effectName) {
        const effects = {
            ClayCoilEffect: function (button) { // effect
                let currentTime = Date.now();
                if ((currentTime - lastEffectTimestamp >= 2000) && Math.random() < 1 / 75) {
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
                        console.log("man you got unlucky!")
                    }
                }
            },
            BismuthBlastBeverageEffect: function (button) {
                let currentTime = Date.now();
                if ((currentTime - lastEffectTimestamp >= 2000) && Math.random() < 1 / 40) {
                    console.log("bbb go");
                    if(!gameSettings.muteGearSounds) audioElementSFX.play()                 
                    let selectedOreObject = selectRandomOre(oreDef, 0.9, 48);
                    addOre(selectedOreObject, true);
                }
            }
        };
        return effects[effectName] || null;      
    }

}

export { Gear };