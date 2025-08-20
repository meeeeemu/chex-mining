import anime from "animejs";

const canvas = document.getElementById('swagBG');
const canvasContext = canvas.getContext('2d');
const devicePixelRatio = window.devicePixelRatio || 1;

function dotCount() {
  const w = canvas.clientWidth;

  if (w < 480)   return 20;
  if (w < 768)   return 45;
  if (w < 1024)  return 55;
  return 70;
}

const DOTS = dotCount();
const SPEED_MIN = 0.003;
const SPEED_MAX = 0.005;
const RADIUS    = 2.3;
const LINK_DIST = 120;
const DOT_COLOR = 'rgba(255,255,255,.4)';
const LINE_COLOR= 'rgba(255, 255, 255, 0.45)';

function fitCanvas() {
    canvas.width = Math.floor(canvas.clientWidth * devicePixelRatio);
    canvas.height = Math.floor(canvas.clientHeight * devicePixelRatio);
    canvasContext.scale(devicePixelRatio, devicePixelRatio);
}
fitCanvas();
window.addEventListener('resize', fitCanvas);

function newDot(){
    const x = Math.random()*canvas.clientWidth;
    const y = Math.random()*canvas.clientHeight;
    const angle = Math.random()*Math.PI*2;
    const speed = anime.random(SPEED_MIN*1000, SPEED_MAX*1000) / 1000;
    return { x, y, vx:Math.cos(angle)*speed, vy:Math.sin(angle)*speed };
}

const dotArray = Array.from({length:DOTS}, newDot);

let lastTime = performance.now();

anime({
  targets: dotArray,
  duration: Infinity,
  easing: 'linear',
  update(anim){
    const now   = anim.currentTime;
    const dt    = now - lastTime;
    lastTime    = now;

    dotArray.forEach(d=>{
      d.x += d.vx * dt;
      d.y += d.vy * dt;
      if(d.x < 0) d.x += canvas.clientWidth;
      if(d.x > canvas.clientWidth) d.x -= canvas.clientWidth;
      if(d.y < 0) d.y += canvas.clientHeight;
      if(d.y > canvas.clientHeight) d.y -= canvas.clientHeight;
    });

    canvasContext.fillStyle = 'rgba(20,20,20,0.35)';
    canvasContext.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);

    canvasContext.fillStyle = DOT_COLOR;
    dotArray.forEach(d=>{
      canvasContext.beginPath();
      canvasContext.arc(d.x,d.y,RADIUS,0,Math.PI*2);
      canvasContext.fill();
    });

    canvasContext.strokeStyle = LINE_COLOR;
    for(let i=0;i<dotArray.length;i++){
      for(let j=i+1;j<dotArray.length;j++){
        const dx = dotArray[i].x-dotArray[j].x;
        const dy = dotArray[i].y-dotArray[j].y;
        const dist = Math.hypot(dx,dy);
        if(dist < LINK_DIST){
          canvasContext.globalAlpha = 1 - dist/LINK_DIST;
          canvasContext.beginPath();
          canvasContext.moveTo(dotArray[i].x,dotArray[i].y);
          canvasContext.lineTo(dotArray[j].x,dotArray[j].y);
          canvasContext.stroke();
        }
      }
    }
    canvasContext.globalAlpha = 1;
  },
  duration: Infinity,
  easing: 'linear'
});