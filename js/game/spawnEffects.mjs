
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

function handleSpawnEffects(oreObj, audioElement) {

    let oreTier = oreObj.tier;

    if(oreTier == "exotic") {
        audioElement.src = './media/exotic.wav'
        audioElement.load()
        audioElement.play()
    } else if(oreTier == "pristine") {
        audioElement.src = './media/pristine.wav'
        audioElement.load()
        audioElement.play()
    } else if(oreTier == "pure") {
        audioElement.src = './media/pure.wav'
        audioElement.load()
        audioElement.play()
    } else if(oreTier == "virtuous") {
        audioElement.src = './media/virtuous.wav'
        audioElement.load()
        audioElement.play()
    } else if(oreTier == "angelic") {
        audioElement.src = './media/angelic.wav'
        audioElement.load()
        audioElement.play()
    } else if(oreTier == "dreamlike") {
        audioElement.src = './media/dreamlike.wav'
        audioElement.load()
        audioElement.play()
    } 

}

export { handleSpawnEffects }