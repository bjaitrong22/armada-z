import { ExplosionSound } from './sounds';

export class Explosion {
  constructor(game){
    this.game = game;
    this.free = true;
    this.x = 0;
    this.y = 0;
    this.dx = 0;

    this.image = document.getElementById('explosions');
    this.spriteWidth = 300;
    this.spriteHeight = 300;
    this.frameX = 0;
    this.frameY = Math.floor(Math.random() * 3);
    this.maxFrame = 22;

    this.animationTimer = 0;
    this.fpsInverse = .10;
    this.animationInterval = 1000 * this.fpsInverse;

    this.explosionSoundPool = [];
    this.maxExplosionSound = 15;
    this.playExplosionSound = false;

    this.createExplosionSoundPool();
  }
  draw(context){
    if (!this.free){
      context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x - this.spriteWidth * .5, this.y - this.spriteHeight * .5, this.spriteWidth, this.spriteHeight);

    }

  }
  createExplosionSoundPool(){
    for (let i = 0; i < this.maxExplosionSound; i++){
      this.explosionSoundPool.push(new ExplosionSound());
      this.explosionSoundPool[i].volume = 1;
    }
  }
  getExplosionSound(){
    for (let i = 0; i < this.explosionSoundPool.length; i++){
      if (this.explosionSoundPool[i].free){
        return this.explosionSoundPool[i];      
      }
    }
  }
  update(deltaTime){
    if (!this.free){
      if (this.playExplosionSound){
        const explosionSound = this.getExplosionSound();
        if (explosionSound){
          explosionSound.start();
          explosionSound.play();
        }
        explosionSound.reset();
      }

      this.x += this.dx * (deltaTime + this.game.speed);
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
    this.playExplosionSound = false;
  }
  start(x, y, dx){
    this.free = false;
    this.x = x;
    this.y = y;
    this.frameX = 0;
    this.dx = dx;
  }
}