import * as THREE from 'three';
import anime from 'animejs';
import { gameSettings, updateCheckboxes, updateSliders } from './game/settingsHandler.mjs';

const canvas = document.getElementById('menuBG');
const overlay = document.getElementById('mainMenu');
const hover = document.querySelector('.uiHover');
const fadeCover = document.querySelector('.fadeCover');
const buttons = document.querySelectorAll('.menuColumn button');

const card = document.getElementById('settings');
const tabs = card.querySelectorAll('.tab');
let currentPane = card.querySelector('.settingsPane.active');
let currentTab = card.querySelector('.tab.active');

let currentCard = document.querySelector('.card.active');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true});
renderer.setPixelRatio(devicePixelRatio);

const scene = new THREE.Scene()
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);


anime({
  targets: fadeCover,
  opacity: [1, 0],
  duration: 2000,
  easing: 'easeOutQuad',
  complete: () => {
    fadeCover.remove();
  }
});

const uniforms = {
    time: { value: 0 },
    resolution: { value: new THREE.Vector3() }
};

function resize() {
    const { clientWidth:w, clientHeight:h } = canvas;
    renderer.setSize(w,h,false);
    uniforms.resolution.value.set(w,h);
}
resize(); addEventListener('resize', resize);

scene.add(new THREE.Mesh(
    new THREE.PlaneGeometry(2,2),
    new THREE.ShaderMaterial({
        glslVersion: THREE.GLSL1,
        uniforms,
        vertexShader:`void main(){gl_Position=vec4(position,1.0);} `, // shader by Xor: https://www.shadertoy.com/view/Wf3SWn
        fragmentShader:`

            #ifdef GL_ES
            precision mediump float;
            #endif

            // === UNIFORMS ===
            uniform float time;
            uniform vec2 resolution;

            //Output image brightness
            #define BRIGHTNESS 1.0

            //Base brightness (higher = brighter, less saturated)
            #define COLOR_BASE 1.5
            //Color cycle speed (radians per second)
            #define COLOR_SPEED 0.5
            //RGB color phase shift (in radians)
            #define RGB vec3(0.0, 1.0, 2.0)
            //Color translucency strength
            #define COLOR_WAVE 14.0
            //Color direction and (magnitude = frequency)
            #define COLOR_DOT vec3(1.0,-1.0,0.0)

            //Wave iterations (higher = slower)
            #define WAVE_STEPS 8.0
            //Starting frequency
            #define WAVE_FREQ 5.0
            //Wave amplitude
            #define WAVE_AMP 0.6
            //Scaling exponent factor
            #define WAVE_EXP 1.8
            //Movement direction
            #define WAVE_VELOCITY vec3(0.2, 0.2, 0.2)

            //Cloud thickness (lower = denser)
            #define PASSTHROUGH 0.2

            //Cloud softness
            #define SOFTNESS 0.005
            //Raymarch step
            #define STEPS 100.0
            //Sky brightness factor (finicky)
            #define SKY 10.0
            //Camera fov ratio (tan(fov_y/2))
            #define FOV 1.0

            void main() {
                // Get coordinates (y-flip if you want)
                vec2 fragCoord = gl_FragCoord.xy;
                float z = 0.0;
                float d = 0.0;
                float s = 0.0;
                // Ray direction
                vec3 dir = normalize(vec3(
                    2.0 * fragCoord.x - resolution.x,
                    2.0 * fragCoord.y - resolution.y,
                    -FOV * resolution.y
                ));

                vec3 col = vec3(0.0);

                for(float i = 0.0; i < STEPS; i++) {
                    vec3 p = z * dir;
                    float f = WAVE_FREQ;
                    for(float j = 0.0; j < WAVE_STEPS; j++) {
                        p += WAVE_AMP * sin(p * f - WAVE_VELOCITY * time).yzx / f;
                        f *= WAVE_EXP;
                    }

                    s = 0.3 - abs(p.y);
                    d = SOFTNESS + max(s, -s * PASSTHROUGH) / 4.0;
                    z += d;

                    float phase = COLOR_WAVE * s + dot(p, COLOR_DOT) + COLOR_SPEED * time;
                    col += (cos(phase - RGB) + COLOR_BASE) * exp(s * SKY) / d;
                }

                col *= SOFTNESS / STEPS * BRIGHTNESS;
                gl_FragColor = vec4(tanh(col * col), 1.0);
            }      
        `
    })
));

let raf;
function loop(time){
    uniforms.time.value = time/1000;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(loop);
}
raf = requestAnimationFrame(loop);

window.stopMenuShader = () => cancelAnimationFrame(raf);

setTimeout(() => {
  if(gameSettings.gameplaySettings.skipMainMenu == true) {
      console.log("hi")
      if(!isGameStarted) {
        updateCheckboxes();
        document.dispatchEvent(new Event('startGame'))

        anime({
        targets:'#mainMenu',
        opacity:[1,0],
        duration:800,
        easing:'easeInOutQuad',
        complete:()=>{
            window.stopMenuShader();
            document.getElementById('mainMenu').remove();
        }
      });
      isGameStarted = true;
    }
  }
})


const showCard = (next) => {
  if (next === currentCard) return;

  if (currentCard) {
    const old = currentCard;
    anime({
      targets: old,
      opacity: [1, 0],
      duration: 5,
      easing: 'easeInQuad',
      complete: () => old.classList.remove('active')
    });
  }

  next.classList.add('active');
  anime({
    targets: next,
    opacity: [0, 1],
    duration: 500,
    easing: 'easeOutQuad'
  });

  currentCard = next;
};

let isGameStarted = false;

overlay.addEventListener('click', e=>{
    const btn = e.target.closest('button');
    if(!btn) return;

    if(btn.dataset.action === 'play') {
        if(!isGameStarted) {
          updateCheckboxes();
          isGameStarted = true;
          document.dispatchEvent(new Event('startGame'))

          anime({
          targets:'#mainMenu',
          opacity:[1,0],
          duration:800,
          easing:'easeInOutQuad',
          complete:()=>{
              window.stopMenuShader();
              document.getElementById('mainMenu').remove();
          }
          });
        }
    }

    if(btn.dataset.action === 'settings') {
        showCard(document.getElementById('settings'));
        updateSliders('musicVolume', gameSettings.audioSettings.musicVolume);
        updateSliders('spawnSFXVolume', gameSettings.audioSettings.spawnSFXVolume);
        updateSliders('gearSFXVolume', gameSettings.audioSettings.gearSFXVolume);
        updateCheckboxes();
    }

    if(btn.dataset.action === 'credits') {
        showCard(document.getElementById('credits'));
    }


})

hover.volume = gameSettings.audioSettings.musicVolume;

buttons.forEach(btn=>{
  btn.addEventListener('mouseenter', () => {
    hover.currentTime = 0;
    hover.play();
    anime({
        targets: btn,
        scale: 1.08,
        duration: 100,
        easing: 'easeOutQuad'
    });

    btn.addEventListener('mouseleave', () => {
        anime({
        targets: btn,
        scale: 1,
        duration: 200,
        easing: 'easeOutQuad'
        });
    });
  });
});

function activate(targetTab) {
  if (targetTab === currentTab) return;

  const paneId  = targetTab.textContent.trim().toLowerCase();
  const nextPane = card.querySelector(`[data-pane="${paneId}"]`);
  if (!nextPane) return;

  if (currentPane){
    currentPane.classList.remove('active');
    currentTab.classList.remove('active');
  }

  nextPane.classList.add('active');
  targetTab.classList.add('active');

  currentPane = nextPane;
  currentTab  = targetTab;
}

tabs.forEach(tab => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keyup', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            activate(tab);
        }
    });
});
