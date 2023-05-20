/** @type { HTMLCanvasElement} */
import { Background } from "./background.js";
import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Asteroid } from "./asteroid.js";
import { Destroyer, DragonCannon} from "./enemies.js";
import { ForwardThrusterParticle, ReverseThrusterParticle, projectileParticle } from "./particles.js";
import { Explosion } from "./explosion.js";

export class Game {
  constructor( width, height) {
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

    this.projectileParticlePool = [];
    this.maxProjectileParticlePool = 100;

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
  createProjectileParticlePool(){
    for (let i = 0; i < this.maxProjectileParticles; i++){
      this.projectileParticlePool.push(new Asteroid(this));
    }
  }
  getProjectileParticle(){
    for (let i = 0; i < this.ThrusterParticlePool.length ; i++){
      if (this.thrusterParticlePool[i].free){
        return this.thrusterParticlePool[i];
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
    if (a.x > b.x + b.width ||
        a.x + a.width < b.x ||
        a.y > b.y + b.height ||
        a.y + a.height < b.y
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
    this.explosionPool.forEach(explosion => {
      explosion.draw(context);
      explosion.update(deltaTime);
    });

    this.player.update(this.input.keys, deltaTime);
    this.player.draw(context);

    // creates thruster particles
    const forwardThrusterParticle = this.getForwardThrusterParticle();
    if (forwardThrusterParticle) forwardThrusterParticle.start();
    
    
    const reverseThrusterParticle = this.getReverseThrusterParticle();
    if (reverseThrusterParticle) reverseThrusterParticle.start();
    
    
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
    

    // //handle collision - rear weapon vs enemy
    // this.dragonCannonPool.forEach(dragonCannon => {
    //   this.thrusterParticlePool.forEach(thrusterParticle => {
    //     if (!dragonCannon.free && !thrusterParticle.free){ 
    //       if (this.checkCollision(dragonCannon, thrusterParticle)){
    //         const explosion = this.getExplosion();
    //         if (explosion){
    //           explosion.start(dragonCannon.x, dragonCannon.y);
    //           dragonCannon.reset();
    //         } 
    //       }
    //     }
    //   });
    // });

    // Particles/frontal projectiles
    if (this.input.keys.includes('s')){
      this.projectileParticles.forEach((projectileParticle) => {
        projectileParticle.updateFrontalProjectile(deltaTime);
      });
    }

  }
}
