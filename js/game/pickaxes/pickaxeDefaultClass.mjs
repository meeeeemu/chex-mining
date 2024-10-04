class Pickaxe {
    constructor(name, bonuses, tier, recipe) {
        this.name = name;
        this.bonuses = bonuses;
        this.tier = tier;
        this.equipped = false;  // default value for equipped
        this.recipe = recipe;
    }

    toJSON() {
        return {
            name: this.name,
            bonuses: this.bonuses,
            tier: this.tier,
            equipped: this.equipped,
            recipe: this.recipe
        };
    }

    static fromJSON(json) {
        return new Pickaxe(json.name, json.bonuses, json.tier, json.recipe);
    }
}

export { Pickaxe };
