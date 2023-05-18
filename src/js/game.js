/** @type { HTMLCanvasElement} */
import { Background } from "./background.js";
import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Asteroid } from "./asteroid.js";
import { Destroyer, DragonCannon} from "./enemies.js";
import { thrusterParticle, projectileParticle } from "./particles.js";
import { Explosion } from "./explosion.js";

export class Game {
  constructor( width, height) {
    this.width = width;
    this.height = height;
    this.bottomMargin = 200;
    this.speed = 0;
    this.maxSpeed = .3;

    this.asteroidPool = [];
    this.maxAsteroid = 60;
    this.asteroidTimer = 0;
    this.asteroidInterval = 1500;

    this.dragonCannonPool = [];
    this.maxDragonCannon = 30;
    this.dragonCannonTimer = 0;
    this.dragonCannonInterval = 6000;

    this.destroyerPool = [];
    this.maxDestroyer = 25;
    this.destroyerTimer = 0;
    this.destroyerInterval = 2500;

    this.thrusterParticlePool = [];
    this.maxThrusterParticles = 50;
    this.projectileParticlePool = [];
    this.maxProjectileParticlePool = 100;

    this.mouse = {
      x: 0,
      y: 0,
      radius: 2
    };
    this.explosionPool = [];
    this.maxExplosions = 25;

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
    this.createThrusterParticlePool();
    this.createExplosionPool();

    window.addEventListener('click', e => {
      this.mouse.x = e.offsetX;
      this.mouse.y = e.offsetY;
      this.asteroidPool.forEach(asteroid => {
        if (!asteroid.free && this.checkCollision(asteroid, this.mouse)){
          const explosion = this.getExplosion();
          if (explosion) explosion.start(asteroid.x, asteroid.y);
          asteroid.reset();
        }
      });
    });
  }
  setGameDimensions(width, height){
    this.width = width;
    this.height = height;
  }
  createAsteroidPool(){
    for (let i = 0; i < this.maxAsteroid; i++){
      this.asteroidPool.push(new Asteroid(this));
    }
    this.asteroidPool.sort(function(a,b){
      return a.width - b.width;
    });
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
      return a.y - b.y;
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
  createThrusterParticlePool(){
    for (let i = 0; i < this.maxThrusterParticles; i++){
      this.thrusterParticlePool.push(new thrusterParticle(this));
    }
  }
  getThrusterParticle(){
    for (let i = 0; i < this.thrusterParticlePool.length ; i++){
      if (this.thrusterParticlePool[i].free){
        return this.thrusterParticlePool[i];
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
    const sumOfRadii = a.radius + b.radius;
    const distanceX = a.x - b.x;
    const distanceY = a.y - b.y;
    const distance = Math.hypot(distanceX, distanceY);
    return distance < sumOfRadii;
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

    //explosions
    this.explosionPool.forEach(explosion => {
      explosion.draw(context);
      explosion.update(deltaTime);
    });

    this.player.update(this.input.keys, deltaTime);
    this.player.draw(context);

    // creates thruster particles
    const thrusterParticle = this.getThrusterParticle();
    if (thrusterParticle) thrusterParticle.start();
    

    //Particles/Thrusters conditions for horizontal movement
    if (this.input.keys.includes('ArrowLeft') && !this.input.keys.includes('ArrowRight')){
      this.thrusterParticlePool.forEach((thrusterParticle) => {
        thrusterParticle.draw(context);
        thrusterParticle.updateReverseThruster();
      });
    } else if (this.input.keys.includes('ArrowRight') || this.input.keys.includes('ArrowUp') || this.input.keys.includes('ArrowDown')){
      this.thrusterParticlePool.forEach((thrusterParticle) => {
        thrusterParticle.draw(context);
        thrusterParticle.updateForwardThruster();
      });
    } else {
      this.thrusterParticlePool.forEach((thrusterParticle) => {
        thrusterParticle.reset() ;
      });
    }
    
    if (this.input.keys.includes('ArrowRight') && this.input.keys.includes('ArrowLeft')){
      this.thrusterParticlePool.forEach((thrusterParticle) => {
        thrusterParticle.reset();
      });
    }

    if (this.input.keys.includes('ArrowUp') && this.input.keys.includes('ArrowDown')){
      this.thrusterParticlePool.forEach((thrusterParticle) => {
        thrusterParticle.reset();
      });
    }

    // Particles/frontal projectiles
    if (this.input.keys.includes('s')){
      this.projectileParticles.forEach((projectileParticle) => {
        projectileParticle.updateFrontalProjectile(deltaTime);
      });
    }

  }
}
