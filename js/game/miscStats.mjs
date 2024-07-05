var stats = {
    blocksMined: 0,
    timeWasted: 0
}

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

var blocksMinedText = document.querySelector('.blocksMined')

function addBlocksMined(amount) {
    stats.blocksMined += amount;
    blocksMinedText.textContent = `Blocks Mined: ${stats.blocksMined}`;
}

function updateBlocksMined() {
    blocksMinedText.textContent = `Blocks Mined: ${stats.blocksMined}`;
}

export {stats, addBlocksMined, updateBlocksMined};