const stats = {
    timeWasted: 0,
    blocksMined: 0
}

const timeWasted = document.getElementById('timeWasted');
const blocksMined = document.getElementById('blocksMined')

function secondsToDHMS(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    return [
        d > 0 ? `${d}d` : null,
        h > 0 || d > 0 ? `${h}h` : null,
        m > 0 || h > 0 || d > 0 ? `${m}m` : null,
        `${s}s`
    ].filter(Boolean).join(' ');
}

function updateTimeWasted() {
    timeWasted.innerHTML = `Time Wasted: <b>${secondsToDHMS(stats.timeWasted)}</b>`;
}

function updateBlocksMined() {
    blocksMined.innerHTML = `<b>${stats.blocksMined}</b> Blocks Mined`;
}

function addBlocksMined(amount) {
    stats.blocksMined += amount;
    updateBlocksMined();
}

setInterval(() => {
    stats.timeWasted++;
    updateTimeWasted();
}, 1000);

export {updateTimeWasted, blocksMined, stats, updateBlocksMined, addBlocksMined}