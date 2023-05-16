export class Asteroid {
  constructor(game){
    this.game = game;
    this.spriteWidth = 150;
    this.spriteHeight = 155;
    this.sizeModifier = Math.random() * 0.8 + .04;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.radius = this.width * .5;
    this.x = -this.radius;
    this.y = Math.random() * this.game.height;
    this.image = document.getElementById('asteroid');
    this.dX = Math.random()* .05;
    this.free = true;
    this.angle = 0;
    this.angularVelocity = Math.random() * 0.05 - 0.02;
  }
  update(deltaTime){
    if(!this.free){
      this.angle += this.angularVelocity;
      this.x += this.dX * deltaTime;
      if(this.x > this.game.width + this.radius){
        this.reset();
      }
    }
  }
  draw(context){
    if (!this.free){
      context.save();
      context.translate(this.x, this.y);
      context.rotate(this.angle);
      context.drawImage(this.image, -this.width * .5, -this.height * 0.5, this.width, this.height);
      context.restore(); 
    }
  }
  reset(){
    this.free = true;
  }
  start(){
    this.free = false;
    this.x = -this.radius;
    this.y = Math.random() * this.game.height;
  } 
}