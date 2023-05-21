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
    this.image = document.getElementById('destroyer');
    this.spriteWidth = 256;
    this.spriteHeight = 256;
    this.sizeModifier = Math.random() * 2.25 + .02;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;

    this.x = this.game.width + Math.random() * this.game.width * 0.5;
    this.y = Math.random() * this.game.height * 0.5;
    this.dx = Math.random() * 0.05 + .01;
    this.dy = 0;
    this.hitBox = {x: this.x + this.width * .10,
      y: this.y + this.height * .38,
      width: this.width * .75,
      height: this.height * .20
    };

    this.MaxFrame = 0;
    this.angle = Math.random() * 100;
    this.angleSpeed = Math.random() * 2 + .05;
  }
  draw(context){
    if (!this.free){
      if (this.game.debug){
        context.strokeStyle = 'red';
        context.strokeRect(this.x + this.width * .10, this.y + this.height * .38, this.width * .75, this.height * .20);
      } 
      super.draw(context);
    }
  }
  update(deltaTime){
    if (!this.free){
      this.x -= this.dx * deltaTime + this.game.speed;
      this.y = this.game.height * .5 * Math.cos(this.angle * Math.PI * .00009) + (this.game.height * .5 - this.height);
      this.angle += this.angleSpeed;
      this.hitBox.x = this.x;
      this.hitBox.y = this.y;
      this.hitBox.width = this.width * .80;
      this.hitBox.height = this.height * .45;

      //check if off screen, then reset.
      if (this.x < -this.width) this.reset();
    }
  }
}
export class DragonCannon extends Enemy {
  constructor(game){
    super();
    this.game = game;
    this.image = document.getElementById('dragonCannon');
    this.spriteWidth = 228;
    this.spriteHeight = 139;
    this.sizeModifier = Math.random() * .50 + .05;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;

    this.x = this.game.width + Math.random() * this.game.width * 0.5;
    this.y = Math.random() * this.game.height * 0.5;
    this.dx = Math.random() * .08 + .02;
    this.dy = 0;
    this.hitBox = {x: this.x,
      y: this.y + this.height * .45,
      width: this.width * .85,
      height: this.height * .40
    };
    this.angle = Math.random() * 100;
    this.angleSpeed = Math.random() * 2 + .05;

    this.MaxFrame = 0;
  }
  draw(context){
    if (!this.free){
      if (this.game.debug){
        context.strokeStyle = 'red';
        context.strokeRect(this.x, this.y + this.height * .25, this.width * .95, this.height * .6 );
      } 
      super.draw(context);
    }
  }
  update(deltaTime) {
    if (!this.free){
      this.x -= this.dx * deltaTime + this.game.speed;
      this.y = this.game.height * .5 * Math.sin(this.angle * Math.PI * .00009) + (this.game.height * .5 - this.height);
      this.hitBox.x = this.x;
      this.hitBox.y = this.y + this.height * .25;
      this.hitBox.width = this.width * .95;
      this.hitBox.height = this.height * .6 ;
      this.angle += this.angleSpeed;

      //check if off screen, then reset.
      if (this.x < -this.width) this.reset();
    }
  }
}