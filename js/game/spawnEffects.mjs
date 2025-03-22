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



const audioElement = document.querySelector('.audioElement')
audioElement.volume = 0.35

const audioElementCaveSpawn = document.querySelector('.audioElementCaveSpawn')
audioElementCaveSpawn.volume = 0.35

const topbarAlert = document.querySelector('.topbarAlert')
const effectLayer = document.querySelector('.effectLayer')

const audioSources = {
    "exotic": './media/exotic.wav',
    "pristine": './media/pristine.wav',
    "pure": './media/pure.wav',
    "virtuous": './media/virtuous.wav',
    "angelic": './media/angelic.wav',
    "dreamlike": './media/dreamlike.wav'
};

const chillSpawnText = {
    "exotic": {"text": 'A chill runs down your spine...', "color": "rgb(229, 255, 0)"},
    "pristine": {"text": 'Your vision sharpens to crystal clarity...', "color": "rgb(5, 163, 0)"},
    "pure": {"text": 'A feeling of purity engulfs your body...', "color": "rgb(0, 211, 226)"},
    "virtuous": {"text": 'A sense of innocence flows throughout the mine...', "color": "rgb(2, 0, 119)"},
    "angelic": {"text": 'The voice of angels fill the air with a divine melody...', "color": "rgb(247, 5, 247)"},
    "dreamlike": {"text": 'A faint dream forms within your mind...', "color": "rgb(255, 255, 255)"},
};

let animPlayed = false;

function resetAnimations() {
    anime.remove(topbarAlert);
    anime.remove(effectLayer);
    anime.remove(document.querySelector('html'));

    topbarAlert.textContent = "";
    effectLayer.style.visibility = 'hidden';
}

function handleSpawnEffects(oreObj) {
    let foundRareOre = false;

    Object.values(oreObj).forEach(oreData => {
        const audioSource = audioSources[oreData.tier];
        const chillText = chillSpawnText[oreData.tier];

        if (audioSource) {
            audioElement.src = audioSource;
            audioElement.load();
            audioElement.play();
        }

        if (chillText) {
            foundRareOre = true;

            // reset before starting a new effect
            resetAnimations();

            topbarAlert.textContent = chillText.text;
            topbarAlert.style.color = chillText.color;
            effectLayer.style['background-color'] = chillText.color;
            effectLayer.style.visibility = 'visible';

            let flashEffect = anime.timeline({
                targets: effectLayer,
                easing: 'easeInOutExpo',
            });

            let topbarAnimChillTimeline = anime.timeline({
                targets: topbarAlert,
                easing: 'easeInOutExpo',
            });

            let effectSpawn = anime.timeline({
                targets: 'html',
                easing: 'easeInOutExpo',
            });

            topbarAnimChillTimeline.add({
                opacity: [0, 1],
                scale: [1, 2],
                duration: 650
            });

            effectSpawn.add({
                filter: ['blur(5px)', 'blur(0px)'],
                duration: 2000,
            });

            flashEffect.add({
                opacity: [0, 0.4],
                scale: [0.8, 1],
                duration: 100
            });

            flashEffect.add({
                opacity: [0.4, 0],
                duration: 3500,
                complete: function() {
                    effectLayer.style.visibility = 'hidden';
                }
            });

            topbarAnimChillTimeline.add({
                opacity: [1, 0],
                scale: [2, 1],
                duration: 5000,
                complete: function() {
                    topbarAlert.textContent = "";
                }
            });
        }
    });

    // reset animPlayed so effects always trigger
    if (foundRareOre) {
        animPlayed = false;
    }
}

function caveSpawn(caveSize, caveName) {
    // reset before playing cave effect
    resetAnimations();

    console.log(caveSize, caveName);
    audioElementCaveSpawn.play();
    topbarAlert.textContent = `A cave has spawned! Cave Size: ${caveSize}, Type: ${caveName}`;

    let topbarAnimTimeline = anime.timeline({
        targets: topbarAlert,
        easing: 'easeInOutExpo',
    });

    topbarAnimTimeline.add({
        opacity: [0, 1],
        scale: [1.25, 1.5],
        duration: 650
    });

    topbarAnimTimeline.add({
        opacity: [1, 0],
        scale: [1.5, 1.25],
        duration: 2500,
        complete: function() {
            topbarAlert.textContent = "";
        }
    });
}

export { handleSpawnEffects, caveSpawn }