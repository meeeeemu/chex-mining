import anime from "animejs";

function hidePanel(panel) {
  return anime({
    targets: panel,
    opacity: [1, 0],
    scale: [1, 0.9],
    duration: 200,
    easing: "easeInCubic",
    complete: () => {
      panel.classList.add("hidden");
    }
  }).finished;
}

function showPanel(panel) {
  const x = panel.getAttribute('data-x') || 0;
  const y = panel.getAttribute('data-y') || 0;
  panel.classList.remove('hidden');
  panel.setAttribute('data-scale', 0.9);
  panel.style.transform = `translate(${x}px, ${y}px) scale(0.9)`;
  anime({
    targets: panel,
    scale: [0.9, 1],
    opacity: [0, 1],
    duration: 210,
    easing: "easeOutCubic",
    update: anim => {
      const scale = anim.animations[0].currentValue;
      panel.setAttribute('data-scale', scale);
      panel.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    },
    complete: () => {
      panel.setAttribute('data-scale', 1);
      panel.style.transform = `translate(${x}px, ${y}px) scale(1)`;
      panel.style.opacity = '';
    }
  });
}

document.querySelector(".hudButtons").addEventListener("click", (e) => {
    const btn = e.target.closest(".hudBtn[data-view]");
    if (!btn) return;
    const id = btn.dataset.view;
    const panel = document.getElementById(id);
    if (!panel) return;
  
    if (panel.classList.contains("hidden")) {
      showPanel(panel);
    } else {
      hidePanel(panel);
    }
});
