import { stats } from "./miscStats.mjs";

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

var timeWastedElem = document.querySelector('.timeWasted')

function formatTime(seconds) {

    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = seconds % 60;


    let formattedHours = hours.toString().padStart(2, '0');
    let formattedMinutes = minutes.toString().padStart(2, '0');
    let formattedSeconds = remainingSeconds.toString().padStart(2, '0');


    let formattedTime = `Seconds: ${formattedSeconds} Minutes: ${formattedMinutes} Hours: ${formattedHours}`;

    return formattedTime;
}

function incrementTime() {
    stats.timeWasted += 1;
    timeWastedElem.textContent = `Time Wasted: ${formatTime(stats.timeWasted)}`
}

function updateTimeWasted() {
    timeWastedElem.textContent = `Time Wasted: ${formatTime(stats.timeWasted)}`
}

setInterval(incrementTime, 1000);

export {updateTimeWasted}