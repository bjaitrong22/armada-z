import { Floating, Moving } from "./playerStates";

export class Player {
  constructor(game){
    this.game = game;
    this.width = 150;
    this.height = 54;
    this.x = 0;
    this.y = this.game.height - this.height - this.game.bottomMargin;
    this.image = document.getElementById('player_ship');
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame;
    this.fps = 20;
    this.frameInterval = 1000/this.fps;
    this.frameTime = 0;
    this.dx = 0;
    this.dy = 0;
    this.maxDx = 5;
    this.maxDy = 0;
    this.states = [new Floating(this.game), new Moving(this.game)];
    this.currentState = null;
    
  }
  update(input, deltaTime){
    this.currentState.handleInput(input);
    //horizontal movement
    this.x += this.dx;
    if (input.includes('ArrowRight')) this.dx = this.maxDx;
    else if (input.includes('ArrowLeft')) this.dx = -this.maxDx;
    else this.speed = 0;

    //sprite animation
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }
  draw(context) {
    if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height );

  }
  setState(state, dx){
    this.currentState = this.states[state];
    this.game.speed = this.game.maxSpeed * dx;
    this.currentState.enter();
  }
}