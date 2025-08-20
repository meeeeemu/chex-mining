import interact from "interactjs";

interact('.gamePanel').draggable({
  allowFrom: '.panelHeader',
  inertia: true,
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: 'parent',
      endOnly: true
    })
  ],
  listeners: {
    move(event) {
      const target = event.target;
      const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
      const scale = target.getAttribute('data-scale') || 1;
      target.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }
  }
});


interact('.gamePanel').resizable({
  edges: { bottom: true, right: true },

  listeners: {

    start(event) {
      const el = event.target;
      el.style.width = el.offsetWidth + 'px';
      el.style.width = el.offsetWidth + 'px';
    },

    move(event) {

      const panel = event.target;
      let { x, y } = panel.dataset;
      x = parseFloat(x) || 0;
      y = parseFloat(y) || 0;

      let maxWidthAttr = panel.getAttribute('data-maxwidth') || '80vw';
      let maxHeightAttr = panel.getAttribute('data-maxheight') || '45vh';

      let maxWidth = maxWidthAttr.endsWith('vw')
        ? window.innerWidth * (parseFloat(maxWidthAttr) / 100)
        : parseFloat(maxWidthAttr);
      let maxHeight = maxHeightAttr.endsWith('vh')
        ? window.innerHeight * (parseFloat(maxHeightAttr) / 100)
        : parseFloat(maxHeightAttr);

      const minHeight = 140;
      const minWidth = 220;

      let newHeight = Math.max(Math.min(event.rect.height, maxHeight), minHeight);
      let newWidth = Math.max(Math.min(event.rect.width, maxWidth), minWidth);

      panel.style.width = newWidth + 'px';
      panel.style.height = newHeight + 'px';
    }
  }
});
