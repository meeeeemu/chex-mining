import interact from 'interactjs';

// i stole this from interactjs examples

interact('.draggable')
  .draggable({
    inertia: true,


	modifiers: [
		interact.modifiers.restrict({
			restriction: {
				x: 0,
				y: 0,
				width: window.outerWidth - 10,
				height: window.outerHeight - 10
			},
			endOnly: true
		})
	],



    listeners: {
      move: dragMoveListener,
    }
  })

function dragMoveListener (event) {
  var target = event.target;
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

window.dragMoveListener = dragMoveListener