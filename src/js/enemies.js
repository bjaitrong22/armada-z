/** @type { HTMLCanvasElement } */

class Enemy {
  constructor(){
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterval = 1000/this.fps;
    this.frameTimer = 0;
    this.free = true;
  }
  update(deltaTime){
    //movement
    if(!this.free){
      this.x -= this.dX + this.game.speed;
      this.y += this.dY;
      if (this.frameTimer > this.frameInterval){
        this.frameTimer = 0;
        if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = 0;
      } else {
        this.frameTimer += deltaTime;
      }
      //check if off screen, then reset.
      if (this.x < -this.width) this.reset();
    }
  }
  draw(context) {
    if (!this.free){
      if (this.game.debug) context.strokeRect(this.x + (this.width * .10), this.y + (this.height * .40), this.width * .73, this.height * .18);
      context.drawImage(this.image, this.frameX * this.width, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
  }
  reset(){
    this.free = true;
  }
  start(){
    this.free = false;
    this.x = this.game.width + Math.random() * this.game.width * 0.5;
    this.y = Math.random() * this.game.height * 0.5;
  } 
}

export class Destroyer extends Enemy {
  constructor(game){
    super();
    this.game = game;
    this.spriteWidth = 256;
    this.spriteHeight = 256;
    this.sizeModifier = Math.random() * 0.6 + .04;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = this.game.width + Math.random() * this.game.width * 0.5;
    this.y = Math.random() * this.game.height * 0.5;
    this.dX = Math.random() + 0.5;
    this.dY = 0;
    this.MaxFrame = 0;
    this.image = document.getElementById('destroyer');
  }
}
export class DragonCannon extends Enemy {
  constructor(game){
    super();
    this.game = game;
    this.spriteWidth = 228;
    this.spriteHeight = 139;
    this.sizeModifier = Math.random() * 0.6 + .04;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = this.game.width + Math.random() * this.game.width * 0.5;
    this.y = Math.random() * this.game.height * 0.5;
    this.dX = Math.random() + 0.5;
    this.dY = 0;
    this.MaxFrame = 0;
    this.image = document.getElementById('dragonCannon');
  }
}