import { saveGame } from "./profileHandler.mjs";

let saveGameInterval;

saveGameInterval = setInterval(() => {
    saveGame()
}, 5000);

const stopAutoSave = () => {
    if (saveGameInterval) {
        clearInterval(saveGameInterval);
        saveGameInterval = null;
    }
}

export { stopAutoSave }