import { Floating, HorizontalTravel,VerticalTravel } from "./playerStates";

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
    this.maxDy = 5;
    this.states = [new Floating(this.game), new HorizontalTravel(this.game), new VerticalTravel(this.game)];
    this.currentState = null;
    
  }
  update(input, deltaTime){
    this.currentState.handleInput(input);
    //horizontal movement
    this.x += this.dx;
    if (input.includes('ArrowRight')) this.dx = this.maxDx;
    else if (input.includes('ArrowLeft')) this.dx = -this.maxDx;
    else this.dx = 0;

    // horizontal boundaries
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

    // vertical movement
    this.y += this.dy;
    if (input.includes('ArrowUp')) this.dy -= this.maxDy;
    else if (input.includes('ArrowDown')) this.dy = this.maxDy;
    else this.dy = 0;

    // vertical boundaries
    if (this.y < 0) this.y = 0;
    if (this.y > this.game.height - this.height) this.y = this.game.height - this.height;

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