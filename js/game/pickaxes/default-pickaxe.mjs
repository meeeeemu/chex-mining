// if you are looking at this right now Guess What!!

var pickaxeObjectDefault = {
    "Name": "Default Pickaxe",
    "Bonuses": {
        "Luck": 0,
        "Speed": 350,
    },
    "Tier": 1
}

// ^^ that's how pickaxes work
// you could make your own custom pickaxes on a modded version of this game if you'd really like!! i dont mind
// here's a little explanation for you:

// var pickaxeObjectDefault -- you should change this to be something like: "pickaxeObjectMyCoolPickaxe" = {
//     "Name": "Default Pickaxe", //name used by the "Using Pickaxe:" label at the top-ish left of the screen
//     "Bonuses": {
//         "Luck": 0, // luck bonus (its an additive percent, so 0.5 = 50% and 1 = 100%, added to the base luck of 1)
//         "Speed": 10, // speed used for the setinterval mining thingy, i wouldnt go below like 10 on this
//     },
//     "Tier": 1 // tier of the pickaxe! the default pickaxe is tier 1
//     "Equipped": false // this should be false on all pickaxes, this is set to true when you click "equip" on the pickaxe's gui
// }

// all pickaxes are objects with these items inside them, when making a pickaxe, you should probably follow that 
// (unless you decide to go nuts and add more abilities to them)

export {pickaxeObjectDefault}