/** @type { HTMLCanvasElement} */

import './../css/styles.css';
import { Game } from "./game.js";

window.addEventListener('load', function(){

  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d', {willReadFrequently: true});
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const startGameButton = document.getElementById('startButton');
  const playAgainButton = document.getElementById('playAgainButton');
  
  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;

  window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    game.setGameDimensions(canvas.width, canvas.height);
  });

  startGameButton.addEventListener('click', function () {
    const gameName = document.getElementById('gameName');
    gameName.style.display = 'none';
    startGameButton.style.display = 'none';
    canvas.removeAttribute('class');
    start();
  });

  playAgainButton.addEventListener('click', function () {
    document.getElementById("finalScore").innerText = null;
    location.reload();
  });

  function start() {
    game.music.play();
    animate(0);
  }

  function gameOver() {
    const gameOver = document.getElementById('gameOver');
    const finalScore = game.score;

    document.getElementById("finalScore").innerText = 'Score: ' + finalScore;
    gameOver.removeAttribute('class');
    canvas.setAttribute('class', 'hidden');
  }
  
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(ctx, deltaTime);

    if (!game.gameOver){
      requestAnimationFrame(animate);
    } else {
      gameOver();
    }
  }
});