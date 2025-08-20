import { startMining, stopMining, isMining, audioElementSFX, calcTotalBonuses, temporaryGearBonuses, handleOreText, BASE_LUCK, temporaryPickaxeBonuses } from "../mainGame.mjs";
import { oreDef, selectRandomOre } from "../oreDef.mjs";
import { gameSettings } from "../settingsHandler.mjs";
import { addOre } from "../inventoryHandler.mjs";

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

class mineBonusEffect extends BaseEffect {
    execute(button, oreobj) {
        if (!this.canTrigger()) return;

        this.playSound();
        this.mineExtraBlocks();
    }

    mineExtraBlocks() {
        const blocks = getRandomArbitrary(this.config.minBlocks, this.config.maxBlocks);
        const selectedOres = selectRandomOre(oreDef, BASE_LUCK + this.config.luckModifier, blocks);
        addOre(selectedOres, true);
        handleOreText(selectedOres, true);
    }
}

class ChexiteStaffEffect extends BaseEffect {
    constructor(config) {
        super(config);
        this.chexFusionActive = false;
        this.randomBoostActive = false;
    }

    execute(button, oreobj) {
        if(!this.canTrigger()) return;

        if (Math.random() < 1/100 && !this.randomBoostActive && !this.chexFusionActive) {
            this.activateRandomStatBoost();
        }

        if(Math.random() < 1/1200 && !this.randomBoostActive && !this.chexFusionActive) {
            this.activateChexFusionMode();
        }
    }

    activateRandomStatBoost() {
        console.log("random boost activated")
        const stats = ['luck', 'speed', 'blocks'];
        const randomStat = stats[Math.floor(Math.random() * stats.length)];
        this.randomBoostActive = true;

        const duration = getRandomArbitrary(1000,5000);

        let luckBoost = 0, speedBoost = 0, blocksBoost = 0;

        switch(randomStat) {
            case 'luck':
                luckBoost = 0.1 + (Math.random() * 0.5);
                break;
            case 'speed':
                speedBoost = -(20 + Math.floor(Math.random() * 40));
                break;
            case 'blocks':
                blocksBoost = 1 + Math.floor(Math.random() * 2);
                break;
        }

        this.applyTemporaryBonus(luckBoost, speedBoost, duration, blocksBoost, true);
        setTimeout(() => {
            this.randomBoostActive = false;
            console.log("random boost gonezo")
        }, duration);
    }

    activateChexFusionMode() {
        console.log("CHEX ULTRA SUPER MODE ACTIVATED!!!!!!!!!!");
        this.chexFusionActive = true;
        
        const fusionLuckBonus = 0.4; // +0.4x
        const fusionSpeedBonus = -15; // -35ms
        const fusionDuration = 12000; // 12s
        const fusionBlockBoost = 2; // 3 blocks per cycle

        this.applyTemporaryBonus(fusionLuckBonus, fusionSpeedBonus, fusionDuration, fusionBlockBoost, true);

        // this.triggerFusionVisuals() mayyyyyyyyyybe (i might do this for the tier 10)

        setTimeout(() => {
            this.chexFusionActive = false;
            console.log("no more fusion");
        }, fusionDuration);
    }
}


class EffectConfig {
    constructor({
        type,
        triggerChance = 1/1,
        cooldown = 2000,
        duration = 0,
        minBlocks = 1,
        maxBlocks = 1,
        luckModifier = 0,
        speedModifier = 0,
        pauseDuration = 0,
        soundFile = null,
        description = "",
        customData = {}
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
        this.customData = customData;
    }
}

class Pickaxe {
    constructor(name, bonuses, tier, effectConfig, recipe, description, bonusDescription) {
        this.name = name;
        this.bonuses = bonuses;
        this.tier = tier;
        this.effect = this.createEffect(effectConfig);
        this.effectConfig = effectConfig
        this.equipped = false;
        this.recipe = recipe;
        this.description = description;
        this.bonusDescription = bonusDescription;
    }

    toJSON() {
        return {
            name: this.name,
            bonuses: this.bonuses,
            tier: this.tier,
            effectConfig: this.effectConfig,
            equipped: this.equipped,
            recipe: this.recipe,
            description: this.description,
            bonusDescription: this.bonusDescription
        };
    }

    createEffect(effectConfig) {
        if (!effectConfig) return null;
        const effects = {
            'chexite_staff': () => new ChexiteStaffEffect(effectConfig),
        }

        const effectCreator = effects[effectConfig.type];
        return effectCreator ? effectCreator() : null;
    }

    applyEffect(button, oreobj) {
        if (this.effect) {
            this.effect.execute(button, oreobj);
        }
    }

    static async fromJSON(json) {
        console.log('loading pick from JSON:', json.name);

        let latestDef = null;
        try {
            const { getCurrentPickaxeDefinition } = await import("./pickaxeRegistry.mjs");
            latestDef = getCurrentPickaxeDefinition(json.name);
        } catch (err) {
            console.log('pickaxe registry not available, using save');
        }

        if (latestDef) {
            console.log('using latest pickaxe definition from file for:', json.name);
            const pickaxe = new Pickaxe(
                latestDef.name,
                latestDef.bonuses,
                latestDef.tier,
                latestDef.effectConfig,
                latestDef.recipe,
                latestDef.description,
                latestDef.bonusDescription
            );
            pickaxe.equipped = false;
            return pickaxe;
        } else {
            console.log('pickaxe not found in registry, using saved data:', json.name);
            const pickaxe = new Pickaxe(
                json.name,
                json.bonuses,
                json.tier,
                json.effectConfig,
                json.recipe,
                json.description,
                json.bonusDescription
            );
            pickaxe.equipped = false;
            return pickaxe;
        }

    }
}

export { Pickaxe, EffectConfig };
