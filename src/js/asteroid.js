export class Asteroid {
  constructor(game){
    this.game = game;
    this.radius = 75;
    this.x = -this.radius;
    this.y = Math.random() * this.game.height;
    this.image = document.getElementById('asteroid');
    this.width = 150;
    this.height = 155;
    this.speed = Math.random()* 1.5 + 0.2;
    this.free = true;
    this.angle = 0;
    this.angularVelocity = Math.random() * 0.03 - 0.01;
  }
  update(){
    if(!this.free){
      this.angle += this.angularVelocity;
      this.x += this.speed;
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