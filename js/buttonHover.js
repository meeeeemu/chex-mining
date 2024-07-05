import anime from 'animejs';

var buttons = [
    document.querySelector('.pickaxeButton1'), 
    document.querySelector('.pickaxeButton2'),
    document.querySelector('.pickaxeButton3'),
    document.querySelector('.pickaxeButton4'),
    document.querySelector('.pickaxeButton5'), 
    document.querySelector('.pickaxeButton6'),
    document.querySelector('.pickaxeButton7'),
    document.querySelector('.pickaxeButton8'),
]

function buttonAnim(color1, color2, buttonElem) {
    anime.remove(buttons);
    anime({
        targets: buttonElem,
        duration: 0,
        "background-color": [color1, color2]
    })
}

function enterButton(buttonElem) { buttonAnim('rgba(0,0,0,1)', 'rgba(0,255,0,0.2)', buttonElem) }
function leaveButton(buttonElem) { buttonAnim('rgba(0,255,0,0.2)', 'rgba(0,0,0,1)', buttonElem) }

for(let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('mouseenter', () => { enterButton(buttons[i])})
    buttons[i].addEventListener('mouseleave', () => { leaveButton(buttons[i])})
}

