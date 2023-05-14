/** @type { HTMLCanvasElement} */
import { Background } from "./background.js";
import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Asteroid } from "./asteroid.js";
import { Destroyer } from "./enemies.js";

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
    this.destroyerPool = [];
    this.maxDestroyer = 50;
    this.destroyerTimer = 0;
    this.destroyerInterval = 2500;
    this.particles = [];
    this.priorKey = [];
    this.background = new Background(this);
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.debug = false;
    this.time = 0;
    this.player.currentState =  this.player.states[0];
    this.player.currentState.enter();
    this.createAsteroidPool();
    this.createDestroyerPool();
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
  createDestroyerPool(){
    for (let i = 0; i < this.maxDestroyer; i++){
      this.destroyerPool.push(new Destroyer(this));
    }
  }
  getDestroyer(){
    for (let i = 0; i < this.destroyerPool.length; i++){
      if(this.destroyerPool[i].free) return this.destroyerPool[i];
    }
  }
  update(deltaTime) {
    this.time += deltaTime;
    this.player.update(this.input.keys, deltaTime);
  
    if (this.input.keys.includes('ArrowLeft')){
      this.priorKey = this.priorKey.filter( key => key !== 'ArrowRight' || key!== 'ArrowUp' || key !== 'ArrowDown');
      if (this.priorKey.indexOf('ArrowLeft') === -1){
        this.priorKey.push('ArrowLeft');
      }
      this.particles.forEach((particle) => {
        particle.updateReverseThruster();
      });
    } else if (this.input.keys.includes('ArrowRight') || this.input.keys.includes('ArrowUp') || this.input.keys.includes('ArrowDown')) {
      this.priorKey = this.priorKey.filter( key => key !== 'ArrowLeft');
      if (this.priorKey.indexOf('ArrowRight') === - 1){
        this.priorKey.push('ArrowRight');
      }
      if (this.priorKey.indexOf('ArrowUp') === -1){
        this.priorKey.push('ArrowUp');
      }
      if (this.priorKey.indexOf('ArrowDown') === -1){
        this.priorKey.push('ArrowDown');
      }
      
      this.particles.forEach((particle) => {
        particle.updateForwardThruster();
      });
    } else if (this.priorKey.includes('ArrowLeft') && this.input.keys.length === 0){
      this.particles.forEach((particle) => {
        particle.markedForDeletion = true;
        this.priorKey = [];
      });
      
    } else if ((this.priorKey.includes('ArrowRight') || this.priorKey.includes('ArrowUp') || this.priorKey.includes('ArrowDown')) && this.input.keys.length === 0 || this.priorKey.includes('ArrowLeft')){
      this.particles.forEach((particle) => {
      particle.markedForDeletion = true;
      this.priorKey = [];
      }); 
    }
    
    if (this.input.keys.includes('ArrowRight') && this.input.keys.includes('ArrowLeft')){
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
      asteroid.update();
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
