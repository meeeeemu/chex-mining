import { addOre } from "../inventoryHandler.mjs";
import anime from 'animejs';
import { startMining, stopMining, isMining, audioElementSFX, calcTotalBonuses, temporaryGearBonuses, handleOreText, BASE_LUCK, temporaryPickaxeBonuses } from "../mainGame.mjs";
import { oreDef, selectRandomOre } from "../oreDef.mjs";
import { gameSettings } from "../settingsHandler.mjs";
import { Wheel } from 'spinwheel.js';
import { easeOutCubic } from '../../lib/easing.js';

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class EffectConfig {
    constructor({
        type,
        triggerChance = 1/100,
        cooldown = 2000,
        duration = 0,
        minBlocks = 1,
        maxBlocks = 1,
        luckModifier = 0,
        speedModifier = 0,
        pauseDuration = 0,
        soundFile = null,
        description = ""
    }) {
        this.type = type;
        this.triggerChance = triggerChance;
        this.cooldown = cooldown;
        this.duration = duration;
        this.minBlocks = minBlocks;
        this.maxBlocks = maxBlocks;
        this.luckModifier = luckModifier;
        this.speedModifier = speedModifier;
        this.pauseDuration = pauseDuration;
        this.soundFile = soundFile;
        this.description = description;
    }
}

class BaseEffect {
    constructor(config) {
        this.config = config;
        this.lastTrigger = 0;
    }

    canTrigger() {
        const currentTime = Date.now();
        const cooldownPassed = (currentTime - this.lastTrigger) >= this.config.cooldown;
        const chanceSuccess = Math.random() < this.config.triggerChance;

        if(cooldownPassed && chanceSuccess) {
            this.lastTrigger = currentTime;
            return true;
        }
        return false;
    }

    playSound() {
        if (this.config.soundFile && !gameSettings.audioSettings?.muteGearSounds) {
            audioElementSFX.src = this.config.soundFile;
            audioElementSFX.load();
            audioElementSFX.play();
        }
    }

    pauseMining(button, duration) {
        if(isMining) {
            button.disabled = true;
            button.classList.remove('mining');
            button.classList.add('paused');
            stopMining();

            setTimeout(() => {
                button.classList.remove('paused');
                button.classList.add('mining');
                button.disabled = false;
                startMining();
            }, duration);
        }
    }

    applyTemporaryBonus(luckBoost, speedBoost, duration, blocksBoost = 0, isPickaxeEffect = true) {
        const target = isPickaxeEffect ? temporaryPickaxeBonuses : temporaryGearBonuses;

        target.luck += luckBoost;
        target.miningSpeed += speedBoost;
        target.blocksMined += blocksBoost;
        calcTotalBonuses();

        if(duration > 0) {
            setTimeout(() => {
                target.luck -= luckBoost;
                target.miningSpeed -= speedBoost;
                target.blocksMined -= blocksBoost;
                calcTotalBonuses();
            }, duration);
        }
    }

    mineExtraBlocks() {
        const blocks = getRandomArbitrary(this.config.minBlocks, this.config.maxBlocks);
        const selectedOres = selectRandomOre(oreDef, BASE_LUCK + this.config.luckModifier, blocks);
        addOre(selectedOres, true);
        handleOreText(selectedOres, true);
    }
}

class PenaltyEffect extends BaseEffect {
    execute(button, oreobj) {
        if (!this.canTrigger()) return;

        this.pauseMining(button, this.config.pauseDuration);
    }
}

class BonusMiningEffect extends BaseEffect {
    execute(button, oreobj) {
        if (!this.canTrigger()) return;

        this.playSound();
        this.mineExtraBlocks();
    }
}

class OreDuplicationEffect extends BaseEffect {
    constructor(config, allowedTiers = ["common", "uncommon", "rare", "master"]) {
        super(config);
        this.allowedTiers = new Set(allowedTiers);
    }

    execute(button, oreobj) {
        if(!this.canTrigger()) return;

        this.playSound();

        Object.values(oreobj).forEach(details => {
            if (this.allowedTiers.has(details.tier)) {
                addOre(oreobj, true);
                handleOreText(oreobj, true);
            }
        });

        if (this.config.pauseDuration > 0) {
            this.pauseMining(button, this.config.pauseDuration);
        }
    }
}

class TemporaryBoostEffect extends BaseEffect {
    execute(button, oreobj) {
        if(!this.canTrigger()) return;

        this.applyTemporaryBonus(
            this.config.luckModifier,
            this.config.speedModifier,
            this.config.duration,
            this.config.blocksModifier,
            false
        );
    }
}

class WheelEffect extends BaseEffect {
    execute(button, oreobj) {
        if (!this.canTrigger()) return;

        console.log("let's gamble!");
        button.disabled = true;
        button.classList.remove('mining');
        button.classList.add('paused');
        
        stopMining();

        // create overlay
        const overlay = document.createElement('div');
        overlay.id = 'overlay';
        overlay.style.opacity = '0';
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
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 500,
            easing: "easeOutQuad"
        });

        const props = {
            items: [
                { label: "+100 Blocks Mined" },
                { label: "+0.75x luck (4s)" },
                { label: "-50 Mining Delay (6s)" },
                { label: "Nothing" },
                { label: "+300 Mining Delay (15s)" }
            ],
            onRest: function (event) {
                let outcome = event.currentIndex;
                
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
                        overlay.remove();
                    }
                });
                
                button.classList.remove('paused');
                button.classList.add('mining');
                button.disabled = false;
                startMining();
            },
            borderColor: "#000",
            borderWidth: 1,
            debug: false,
            image: null,
            isInteractive: true,
            itemBackgroundColors: [
                "#0345fc",
                "#03fc20",
                "#f0fc03",
                "#fc0303",
                "#fc0303"
            ],
            itemLabelAlign: "right",
            itemLabelBaselineOffset: 0,
            itemLabelColors: ["#000"],
            itemLabelFont: "sans-serif",
            itemLabelFontSizeMax: 47,
            itemLabelRadius: 0.78,
            itemLabelRadiusMax: 0.2,
            itemLabelRotation: 0,
            itemLabelStrokeColor: "#fff",
            itemLabelStrokeWidth: 0,
            lineColor: "#000",
            lineWidth: 4.6,
            overlayImage: null,
            pixelRatio: 1,
            pointerAngle: 0,
            radius: 0.75,
            rotationResistance: -200,
            rotationSpeedMax: 728
        };

        const winningIndex = Math.floor(Math.random() * props.items.length);
        const duration = 4000;
        const easing = easeOutCubic;

        const wheel = new Wheel(wheelContainer, props);
        wheel.isInteractive = false;

        wheel.spinToItem(winningIndex, duration, true, 2, 1, easing);
    }
}

class ChronographEffect extends BaseEffect {
    execute(button, oreobj) {
        if (!this.canTrigger()) return;

        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        const luckBoost = this.calculateTimeBasedLuck(currentHour, currentMinute);

        this.applyTemporaryBonus(luckBoost, 0, 10000, 0, false); // we only want the luck boost
    }

    calculateTimeBasedLuck(hour, minute) {
        const totalMinutes = hour * 60 + minute;

        const peakTime = 12 * 60;

        let distanceFromPeak = Math.abs(totalMinutes - peakTime);

        const wrapAroundDist = Math.abs((totalMinutes + 1440) - peakTime);
        const reverseWrapDistance = Math.abs(totalMinutes - (peakTime + 1440));

        distanceFromPeak = Math.min(distanceFromPeak, wrapAroundDist, reverseWrapDistance);

        const maxDist = 12 * 60;

        const normalDist = distanceFromPeak / maxDist;
        const luckRange = 0.2 - 0.01;
        const luckBoost = 0.2 - (normalDist * luckRange);

        return Math.max(0.01, Math.min(0.2, luckBoost));
    }
}

class Gear {
    constructor(name, bonuses, penalties, tier, effectConfig, recipe, gearDescription, bonusDescription, penaltyDescription) {
        this.name = name;
        this.bonuses = bonuses;
        this.penalties = penalties;
        this.tier = tier;
        this.effect = this.createEffect(effectConfig);
        this.equipped = false;
        this.recipe = recipe;
        this.gearDescription = gearDescription;
        this.bonusDescription = bonusDescription;
        this.penaltyDescription = penaltyDescription;
        this.effectConfig = effectConfig;
    }

    createEffect(effectConfig) {
        if(!effectConfig) return null;

        const effects = {
            'penalty': () => new PenaltyEffect(effectConfig),
            'bonus_mining': () => new BonusMiningEffect(effectConfig),
            'ore_duplication': () => new OreDuplicationEffect(effectConfig),
            'temporary_boost': () => new TemporaryBoostEffect(effectConfig),
            'wheel': () => new WheelEffect(effectConfig),
            'time_based_boost': () => new ChronographEffect(effectConfig)
        };

        const effectCreator = effects[effectConfig.type];
        const result = effectCreator ? effectCreator() : null;
        return result;
    }

    applyEffect(button, oreobj) {
        if(this.effect) {
            this.effect.execute(button, oreobj);
        }
    }

    static async fromJSON(json) {

        console.log("loading gear from JSON:", json.name);

        let latestDef = null;

        try {
            const { getCurrentGearDefinition } = await import('./gearRegistry.mjs');
            latestDef = getCurrentGearDefinition(json.name);
        } catch (err) {
            console.log('registry not available');
        }

        if (latestDef) {
            console.log('updating gear:', json.name);
            const gear = new Gear(
                latestDef.name,
                latestDef.bonuses,
                latestDef.penalties,
                latestDef.tier,
                latestDef.effectConfig,
                latestDef.recipe,
                latestDef.gearDescription,
                latestDef.bonusDescription,
                latestDef.penaltyDescription
            );
            gear.equipped = false;
            return gear;
        } else if(json.effectConfig && json.effectConfig.type) {
            console.log('loading gear with effect config');

            const gear = new Gear(
                json.name,
                json.bonuses,
                json.penalties,
                json.tier,
                json.effectConfig,
                json.recipe,
                json.gearDescription,
                json.bonusDescription,
                json.penaltyDescription
            );
            gear.equipped = json.equipped || false;
            return gear
        } else {
            console.log('converting legacy gear to new format:', json.name);

            const newEffectConf = Gear.migrateLegacyGear(json.name);

            const gear = new Gear(
                json.name,
                json.bonuses,
                json.penalties,
                json.tier,
                newEffectConf,
                json.recipe,
                json.gearDescription,
                json.bonusDescription,
                json.penaltyDescription
            );
            gear.equipped = json.equipped || false;
            return gear;
        }
    }

    static migrateLegacyGear(gearName) {
        const legacyMigrations = {
            "Clay Coil": new EffectConfig({
                type: 'penalty',
                triggerChance: 1/100,
                cooldown: 2000,
                pauseDuration: 2000,
                description: "time to slow it on down there bud"
            }),
            
            "Bismuth Blast Beverage": new EffectConfig({
                type: 'bonus_mining',
                triggerChance: 1/40,
                cooldown: 2000,
                minBlocks: 40,
                maxBlocks: 50,
                luckModifier: -0.15,
                soundFile: './media/sfx/bbb_sfx1.wav',
                description: "KABOOM"
            }),
            
            "Whacky Wombo Chips": new EffectConfig({
                type: 'ore_duplication',
                triggerChance: 1/100,
                cooldown: 2000,
                pauseDuration: 1000,
                soundFile: './media/sfx/wwc_sfx1.wav',
                description: "dupe lick ation",
                customData: {
                    allowedTiers: ["common", "uncommon", "rare", "master"]
                }
            }),
            
            "Magnesium Reactor Core": new EffectConfig({
                type: 'penalty',
                triggerChance: 1/150,
                cooldown: 2000,
                pauseDuration: 2000,
                description: "WOOOOOOOOOO"
            }),
            
            "Chexium Chronograph": new EffectConfig({
                type: 'time_based_boost',
                triggerChance: 1/250,
                cooldown: 10000,
                duration: 10000,
                description: "time.....",
                customData: {
                    minLuckBoost: 0.01,
                    maxLuckBoost: 0.2,
                    peakTime: 12,
                    lowTime: 0
                }
            }),
            
            "Wheel of Fate": new EffectConfig({
                type: 'wheel',
                triggerChance: 1/300,
                cooldown: 2000,
                description: "gambling!",
                customData: {
                    wheelItems: [
                        { label: "+100 Blocks Mined", outcome: 0 },
                        { label: "+0.75x luck (4s)", outcome: 1 },
                        { label: "-50 Mining Delay (6s)", outcome: 2 },
                        { label: "Nothing", outcome: 3 },
                        { label: "+300 Mining Delay (15s)", outcome: 4 }
                    ]
                }
            }),
            
            "Chexestine Nuke": new EffectConfig({
                type: 'bonus_mining',
                triggerChance: 1/250,
                cooldown: 2000,
                minBlocks: 250,
                maxBlocks: 650,
                luckModifier: -0.1,
                soundFile: './media/sfx/cn_sfx1.wav',
                description: "huge"
            })
        };
        
        return legacyMigrations[gearName] || null;
    }

    toJSON() {
        return {
            name: this.name,
            bonuses: this.bonuses,
            penalties: this.penalties,
            tier: this.tier,
            recipe: this.recipe,
            gearDescription: this.gearDescription,
            bonusDescription: this.bonusDescription,
            penaltyDescription: this.penaltyDescription,
            effectConfig: this.effectConfig
        };
    }
}

export { Gear, EffectConfig }