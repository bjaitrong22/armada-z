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
    if (!this.free){
      this.x -= this.dx * deltaTime + this.game.speed;
      this.y += this.dy;
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
    this.sizeModifier = Math.random() * 0.95 + .04;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = this.game.width + Math.random() * this.game.width * 0.5;
    this.y = Math.random() * this.game.height * 0.5;
    this.dx = Math.random() * 0.05 + .01;
    this.dy = 0;
    this.MaxFrame = 0;
    this.image = document.getElementById('destroyer');
  }
  draw(context){
    if(!this.free){
      if (this.game.debug){
        context.strokeStyle = 'red';
        context.strokeRect(this.x + this.width * .1, this.y + this.height * .4, this.width * .75, this.height * .20 );
      } 
      super.draw(context);
    }
  }
}
export class DragonCannon extends Enemy {
  constructor(game){
    super();
    this.game = game;
    this.spriteWidth = 228;
    this.spriteHeight = 139;
    this.sizeModifier = Math.random() * .55 + .05;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = this.game.width + Math.random() * this.game.width * 0.5;
    this.y = Math.random() * this.game.height * 0.5;
    this.dx = Math.random() * .08 + .02;
    this.dy = 0;
    this.MaxFrame = 0;
    this.image = document.getElementById('dragonCannon');
    this.angle = Math.random() * 100;
    this.angleSpeed = Math.random() * 2 + .05;
  }
  draw(context){
    if(!this.free){
      if (this.game.debug){
        context.strokeStyle = 'red';
        context.strokeRect(this.x, this.y + this.height * .45, this.width * .85, this.height * .4 );
      } 
      super.draw(context);
    }
  }
  update(deltaTime) {
    if(!this.free){
      this.x -= this.dx * deltaTime + this.game.speed;
      this.y = this.game.height * .5 * Math.sin(this.angle * Math.PI * .00009) + (this.game.height * .5 - this.height);
      this.angle += this.angleSpeed;

      //check if off screen, then reset.
      if (this.x < -this.width) this.reset();
    }
  }
}