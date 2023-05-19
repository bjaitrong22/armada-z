class Particle {
  constructor(game){
    this.game = game;
    this.free = true;
  }
  reset(){
    this.free = true;
  }
}

export class ForwardThrusterParticle extends Particle {
  constructor(game, x, y){
    super(game);
    this.image = document.getElementById('fire');
    this.size = Math.random() * 70 + 3;
    this.x = x;
    this.y = y - 8;
    this.dx = 8;
    this.dy = 0;
    this.angle = 0;
    this.angularVelocity = Math.random() * 0.2 - 0.1;
  }
  updateForwardThruster(input){
    if(!this.free && !input.includes('ArrowLeft')){

      this.x -= this.dx + this.game.speed;
      this.y -= this.dy;
      this.angle += this.angularVelocity;
      this.x += Math.sin(this.angle * 10);
      
      if (this.x < (this.game.player.x - 15)) super.reset(); 
    }
  }
  draw(context){
    if(!this.free){
      context.save();
      context.translate(this.x, this.y);
      context.rotate(this.angle);
      context.drawImage(this.image, -this.size * 0.5, -this.size * 0.5, this.size, this.size);
      context.restore();
    }
  }
  start(){
    this.free = false;
    this.x = this.game.player.x + this.game.player.width * .16 ;
    this.y = this.game.player.y + this.game.player.height * 0.5; 
  } 
}
export class ReverseThrusterParticle extends Particle {
  constructor(game, x, y){
    super(game);
    this.image = document.getElementById('fire');
    this.size = Math.random() * 70 + 3;
    this.x = x;
    this.y = y - 8;
    this.dx = 8;
    this.dy = 0;
    this.angle = 0;
    this.angularVelocity = Math.random() * 0.2 - 0.1;
  }
  updateReverseThruster(){
    if(!this.free){
      this.x += this.dx + this.game.speed;
      this.y += this.dy;
      this.angle += this.angularVelocity;
      this.x += Math.sin(this.angle * 10);
      if (this.x > this.game.player.x + this.game.player.width * 1.2) super.reset();
    }
  }
  draw(context){
    if(!this.free){
      context.save();
      context.translate(this.x, this.y);
      context.rotate(this.angle);
      context.drawImage(this.image, -this.size * 0.5, -this.size * 0.5, this.size, this.size);
      context.restore();
    }
  }
  start(){
    this.free = false;
    this.x = this.game.player.x + this.game.player.width * 0.8 ;
    this.y = this.game.player.y + this.game.player.height * 0.8; 
  } 
}
export class Projectiles extends Particle {
  constructor(game, x, y){
    super(game);
    this.image = document.getElementById('projectileFrame5');
    this.size = Math.random() * 80 + 3;
    this.x = x;
    this.y = y - 8;
    this.dx = 10;
    this.dy = 0;
    this.angle = 0;
    this.angularVelocity = Math.random() * 0.2 - 0.1;
  }
  update(deltaTime){
    if(!this.free){
      this.x += this.dx * deltaTime + this.game.speed;
      this.y += this.dy;
      this.angle += this.angularVelocity;
      this.x += Math.sin(this.angle * 10);
      if (this.x > this.game.width) this.reset();
    }
  }
  draw(context){
    if(!this.free){
      context.save();
      context.translate(this.x, this.y);
      context.rotate(this.angle);
      context.drawImage(this.image, -this.size * 0.5, -this.size * 0.5, this.size, this.size);
      context.restore();
    }
  }
  start(){
    this.free = false;
    this.x = this.game.player.x + this.game.player.width * .16 ;
    this.y = this.game.player.y + this.game.player.height * 0.5; 
  } 
}