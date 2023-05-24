/** @type { HTMLCanvasElement} */

import './css/styles.css';
import { Game } from "./js/game.js";

window.addEventListener('load', function(){

  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d', {willReadFrequently: true});
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const startGameButton = document.getElementById('startButton');

  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;

  startGameButton.addEventListener('click', function () {
    const gameName = document.getElementById('gameName');
    gameName.style.display = 'none';
    startGameButton.style.display = 'none';
    canvas.removeAttribute('class');
    start();
  });

  function start() {
    window.addEventListener("resize", function(){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      game.setGameDimensions(canvas.width, canvas.height);
    });
    
    animate(0);
  }
  
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(ctx, deltaTime);
    requestAnimationFrame(animate);
  }
  
});