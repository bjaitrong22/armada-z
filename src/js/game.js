/** @type { HTMLCanvasElement} */
import { Background } from "./background.js";
import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Asteroid } from "./asteroid.js";
import { Destroyer, DragonCannon} from "./enemies.js";

export class Game {
  constructor( width, height) {
    this.width = width;
    this.height = height;
    this.bottomMargin = 200;
    this.speed = 0;
    this.maxSpeed = .3;
    this.asteroidPool = [];
    this.maxAsteroid = 30;
    this.asteroidTimer = 0;
    this.asteroidInterval = 3000;
    this.dragonCannonPool = [];
    this.maxDragonCannon = 50;
    this.dragonCannonTimer = 0;
    this.dragonCannonInterval = 6000;
    this.destroyerPool = [];
    this.maxDestroyer = 40;
    this.destroyerTimer = 0;
    this.destroyerInterval = 2500;
    this.particles = [];
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
      return a.y - b.y;
    }); 
  }
  getDestroyer(){
    for (let i = 0; i < this.destroyerPool.length; i++){
      if (this.destroyerPool[i].free) return this.destroyerPool[i];
    }
  }
  update(deltaTime) {
    this.time += deltaTime;
    this.player.update(this.input.keys, deltaTime);
    
    // Particles/Thrusters conditions for horizontal movement
    if (this.input.keys.includes('ArrowLeft') && !this.input.keys.includes('ArrowRight')){
      this.particles.forEach((particle) => {
        particle.updateReverseThruster();
      });
    } else if (this.input.keys.includes('ArrowRight') || this.input.keys.includes('ArrowUp') || this.input.keys.includes('ArrowDown')){
      this.particles.forEach((particle) => {
        particle.updateForwardThruster();
      });
    } else {
      this.particles.forEach((particle) => {
        particle.markedForDeletion = true;
      });
    }
    
    if (this.input.keys.includes('ArrowRight') && this.input.keys.includes('ArrowLeft')){
      this.particles.forEach((particle) => {
        particle.markedForDeletion = true;
      });
    }

    if (this.input.keys.includes('ArrowUp') && this.input.keys.includes('ArrowDown')){
      this.particles.forEach((particle) => {
        particle.markedForDeletion = true;
      });
    }

    this.particles = this.particles.filter( particle => !particle.markedForDeletion);
  }
  render(context, deltaTime){
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

    this.player.draw(context);
    this.particles.forEach(particle => {
      particle.draw(context);
    });
    this.update(deltaTime);
  }
}
