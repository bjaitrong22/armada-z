export class Projectile {
  constructor(game){
    this.game = game;
    this.free = true;
    this.image = document.getElementById('projectile');
    this.spriteWidth = 124;
    this.spriteHeight = 108;
    this.sizeModifier = .35
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;

    this.x = this.game.player.x + this.game.player.width * 0.8;
    this.y = this.game.player.y - (this.game.player.height * .220) ;
    this.dx = 2;
    this.dy = 0;
    this.hitBox = {x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
      };
    this.angle = 0;
    this.angularVelocity = Math.random() * 0.2 - 0.1;

    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 5;
    this.animationTimer = 0;
    this.fps = 7;
    this.animationInterval = 1000/this.fps;

  }
  draw(context){
    if (!this.free){
      if (this.game.debug){
        context.strokeStyle = 'red';
        context.strokeRect(this.x, this.y, this.width , this.height);
      } 
      context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
  }
  update(deltaTime){
    if (!this.free){
      //horizontal movement
      this.x += this.dx * deltaTime + this.game.speed;
      this.angle += this.angularVelocity;
      this.x += Math.sin(this.angle * 1);
      this.hitBox.x = this.x;
      this.hitBox.y = this.y;
      if (this.x > this.game.width || this.x > this.game.player.x + this.game.width * .5){
        this.reset();
      }
      
      //sprite animation
      if (this.animationTimer > this.animationInterval){
        this.frameX++;
        if (this.frameX > this.maxFrame) this.reset();
        this.animationTimer = 0;
      } else {
        this.animationTimer += deltaTime;
      }
    }
  }
  reset(){
    this.free = true;
  }
  start(){
    this.free = false;
    this.x = this.game.player.x + this.game.player.width * 0.8;
    this.y = this.game.player.y - (this.game.player.height * .35);
    this.frameX = 0;
  }
}