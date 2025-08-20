import { BASE_LUCK, MINE_BLOCK_AMOUNT, MINING_SPEED, PICKAXE_LUCK_ADD } from "../game/mainGame.mjs";

function updateStatPanel() {
    const miningSpeed = MINING_SPEED || 400
    const totalLuck = (BASE_LUCK || 1) + (PICKAXE_LUCK_ADD || 0);
    const blocksPerCycle = MINE_BLOCK_AMOUNT || 1;

    document.getElementById('statBlocksPerCycle').textContent = blocksPerCycle.toString();
    document.getElementById('statMiningSpeed').textContent = `${miningSpeed}ms`;
    document.getElementById('statLuckBonus').textContent = `${totalLuck.toFixed(2)}x`;

}

updateStatPanel();

document.addEventListener('startGame', () => {
    updateStatPanel();
    setInterval(() => {
        updateStatPanel();
    }, 500);
    console.log("check");
})

export { updateStatPanel };