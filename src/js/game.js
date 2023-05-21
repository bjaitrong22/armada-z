/** @type { HTMLCanvasElement } */
import { Background } from "./background.js";
import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Asteroid } from "./asteroid.js";
import { Destroyer, DragonCannon} from "./enemies.js";
import { ForwardThrusterParticle, ReverseThrusterParticle} from "./particles.js";
import { Projectile } from "./projectile.js";
import { Explosion } from "./explosion.js";

export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.bottomMargin = 200;
    this.speed = .2;
    this.maxSpeed = .3;

    this.asteroidPool = [];
    this.maxAsteroid = 18;
    this.asteroidTimer = 0;
    this.asteroidInterval = 1500;

    this.dragonCannonPool = [];
    this.maxDragonCannon = 7;
    this.dragonCannonTimer = 0;
    this.dragonCannonInterval = 2500;

    this.destroyerPool = [];
    this.maxDestroyer = 25;
    this.destroyerTimer = 0;
    this.destroyerInterval = 3100;

    this.forwardThrusterParticlePool = [];
    this.maxForwardThrusterParticles = 25;

    this.reverseThrusterParticlePool = [];
    this.maxReverseThrusterParticles = 25;

    this.projectilePool = [];
    this.maxProjectiles = 15;

    this.explosionPool = [];
    this.maxExplosions = 25;
    
    this.collisions = [];

    this.background = new Background(this);
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.debug = false;
    this.time = 0;
    this.player.currentState =  this.player.states[0];
    this.player.currentState.enter();

    this.createAsteroidPool();
    this.createDestroyerPool();
    this.createDragonCannonPool();
    this.createForwardThrusterParticlePool();
    this.createReverseThrusterParticlePool();
    this.createExplosionPool();
    this.createProjectilePool();
  }
  setGameDimensions(width, height){
    this.width = width;
    this.height = height;
  }
  createAsteroidPool(){
    for (let i = 0; i < this.maxAsteroid; i++){
      this.asteroidPool.push(new Asteroid(this));
    }
  }
  getAsteroid(){
    for (let i = 0; i < this.asteroidPool.length ; i++){
      if (this.asteroidPool[i].free){
        return this.asteroidPool[i];
      }
    }
  }
  createDragonCannonPool(){
    for (let i = 0; i < this.maxDragonCannon; i++){
      this.dragonCannonPool.push(new DragonCannon(this));
    }
    this.dragonCannonPool.sort(function(a,b){
      return a.width - b.width;
    });
  }
  getDragonCannon(){
    for (let i = 0; i < this.dragonCannonPool.length; i++){
      if (this.dragonCannonPool[i].free) return this.dragonCannonPool[i];
    }
  }
  createDestroyerPool(){
    for (let i = 0; i < this.maxDestroyer; i++){
      this.destroyerPool.push(new Destroyer(this));
    }

    this.destroyerPool.sort(function(a,b){
      return a.width - b.width;
    }); 
  }
  getDestroyer(){
    for (let i = 0; i < this.destroyerPool.length; i++){
      if (this.destroyerPool[i].free) return this.destroyerPool[i];
    }
  }
  createForwardThrusterParticlePool(){
    for (let i = 0; i < this.maxForwardThrusterParticles; i++){
      this.forwardThrusterParticlePool.push(new ForwardThrusterParticle(this));
    }
  }
  getForwardThrusterParticle(){
    for (let i = 0; i < this.forwardThrusterParticlePool.length ; i++){
      if (this.forwardThrusterParticlePool[i].free){
        return this.forwardThrusterParticlePool[i];
      }
    }
  }
  createReverseThrusterParticlePool(){
    for (let i = 0; i < this.maxReverseThrusterParticles; i++){
      this.reverseThrusterParticlePool.push(new ReverseThrusterParticle(this));
    }
  }
  getReverseThrusterParticle(){
    for (let i = 0; i < this.reverseThrusterParticlePool.length ; i++){
      if (this.reverseThrusterParticlePool[i].free){
        return this.reverseThrusterParticlePool[i];
      }
    }
  }
  createProjectilePool(){
    for (let i = 0; i < this.maxProjectiles; i++){
      this.projectilePool.push(new Projectile(this));
    }
  }
  getProjectile(){
    for (let i = 0; i < this.projectilePool.length ; i++){
      if (this.projectilePool[i].free){
        return this.projectilePool[i];
      }
    }
  }
  createExplosionPool(){
    for (let i = 0; i < this.maxExplosions ; i++){
      this.explosionPool.push(new Explosion(this));
    }
  }
  getExplosion(){
    for (let i = 0; i < this.explosionPool.length ; i++){
      if (this.explosionPool[i].free){
        return this.explosionPool[i];
      }
    }
  }
  checkCollision(a,b){
    if (a.hitBox.x > b.hitBox.x + b.hitBox.width ||
        a.hitBox.x + a.hitBox.width < b.hitBox.x ||
        a.hitBox.y > b.hitBox.y + b.hitBox.height ||
        a.hitBox.y + a.hitBox.height < b.hitBox.y
    ){
      return false;
    } else {
      return true;
    } 
  }
  
  render(context, deltaTime){
    this.time += deltaTime;
    this.background.draw(context);
    this.background.update();
    
    // Periodically creates asteroids
    if (this.asteroidTimer > this.asteroidInterval){
      const asteroid = this.getAsteroid();
      if (asteroid) asteroid.start();
      this.asteroidTimer = 0;
    } else {
      this.asteroidTimer += deltaTime;
    }
    this.asteroidPool.forEach(asteroid => {
      asteroid.draw(context);
      asteroid.update(deltaTime);
    });

    // Periodically creates destroyers
    if (this.destroyerTimer > this.destroyerInterval){
      const destroyer = this.getDestroyer();
      if (destroyer) destroyer.start();
      this.destroyerTimer = 0;
    } else {
      this.destroyerTimer += deltaTime;
    }
    
    this.destroyerPool.forEach(destroyer => {
      destroyer.draw(context);
      destroyer.update(deltaTime);
    });
    
    // Periodically creates dragonCannon ships
    if (this.dragonCannonTimer > this.dragonCannonInterval){
      const dragonCannon = this.getDragonCannon();
      if (dragonCannon) dragonCannon.start();
      this.dragonCannonTimer = 0;
    }else {
      this.dragonCannonTimer += deltaTime;
    }

    this.dragonCannonPool.forEach(dragonCannon => {
      dragonCannon.draw(context);
      dragonCannon.update(deltaTime);
    });

    //explosions
    const explosion = this.getExplosion();
    if (explosion) explosion.start(this.x, this.y, 0);

    this.explosionPool.forEach(explosion => {
      explosion.draw(context);
      explosion.update(deltaTime);
    });

    // front projectile
    if (this.player.shoot){
      const projectile = this.getProjectile();
      if (projectile) projectile.start();
    }

    this.projectilePool.forEach((projectile) => {
      projectile.draw(context);
      projectile.update(deltaTime);
    });

    this.player.update(this.input.keys, deltaTime);
    this.player.draw(context);

    // creates thruster particles
    const forwardThrusterParticle = this.getForwardThrusterParticle();
    if (forwardThrusterParticle) forwardThrusterParticle.start();
    
    const reverseThrusterParticle = this.getReverseThrusterParticle();
    if (reverseThrusterParticle) reverseThrusterParticle.start();
    
    //Logic for when to render the front and rear thrusters particle effects and for resetting
    if (this.input.keys.includes('ArrowRight')){
      this.forwardThrusterParticlePool.forEach((forwardThrusterParticle) => {
        forwardThrusterParticle.draw(context);
        forwardThrusterParticle.updateForwardThruster(this.input.keys);
      });
    } else if (this.input.keys.includes('ArrowLeft')){
      this.reverseThrusterParticlePool.forEach((reverseThrusterParticle) => {
        reverseThrusterParticle.draw(context);
        reverseThrusterParticle.updateReverseThruster();
      });

    } else if (this.input.keys.includes('ArrowUp') || this.input.keys.includes('ArrowDown') && this.input.keys.length <= 1){
      this.forwardThrusterParticlePool.forEach((forwardThrusterParticle) => {
        forwardThrusterParticle.draw(context);
        forwardThrusterParticle.updateForwardThruster(this.input.keys);
      });
    } else {
      this.forwardThrusterParticlePool.forEach((forwardThrusterParticle) => {
        forwardThrusterParticle.reset() ;
      });
      this.reverseThrusterParticlePool.forEach((reverseThrusterParticle) => {
        reverseThrusterParticle.reset() ;
      });
    }
    
    //handle collision - weapon vs enemy
    this.dragonCannonPool.forEach(dragonCannon => {
      this.projectilePool.forEach(projectile => {
        if (!dragonCannon.free && !projectile.free){ 
          if (this.checkCollision(dragonCannon, projectile)){
            const explosion = this.getExplosion();
            if (explosion){
              explosion.start(dragonCannon.x, dragonCannon.y, dragonCannon.dx * -.90);
              explosion.playExplosionSound = true;
              dragonCannon.reset();
              projectile.reset();
            } 
          }
        }
      });
    });
  }
}
