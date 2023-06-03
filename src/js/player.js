import { Floating, ForwardTravel, ReverseTravel, UpwardTravel, DownwardTravel, UpwardForwardTravel, UpwardBackTravel, DownwardForwardTravel, DownwardBackTravel } from "./playerStates";
import engine1 from './../assets/audioEffects/ScatterNoise1.mp3';
import { FrontWeaponSound } from "./sounds";

export class Player {
  constructor(game){
    this.game = game;
    this.spriteWidth = 477;
    this.spriteHeight = 181;
    this.sizeModifier = .12;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = 0;
    this.y = this.game.height - this.height - this.game.bottomMargin;
    this.image = document.getElementById('player_ship');
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame;
    this.fps = 20;
    this.frameInterval = 1000/this.fps;
    this.frameTime = 0;
    this.dx = 0;
    this.dy = 0;
    this.maxDx = 4.5;
    this.maxDy = 4.5;
    this.states = [new Floating(this.game), new ForwardTravel(this.game), new ReverseTravel(this.game), new UpwardTravel(this.game), new DownwardTravel(this.game), new UpwardForwardTravel(this.game), new UpwardBackTravel(this.game), new DownwardForwardTravel(this.game), new DownwardBackTravel(this.game)];
    this.currentState = null;
    
    this.engineSound = new Audio(engine1);
    this.frontWeaponSoundPool = [];
    this.maxFrontWeaponSound = 50;
    this.shoot = false;
    this.createFrontWeaponSoundPool();
  }
  createFrontWeaponSoundPool(){
    for (let i = 0; i < this.maxFrontWeaponSound; i++){
      this.frontWeaponSoundPool.push(new FrontWeaponSound());
      this.frontWeaponSoundPool[i].volume = .99;
    }
  }
  getFrontWeaponSound(){
    for (let i = 0; i < this.frontWeaponSoundPool.length; i++){
      if (this.frontWeaponSoundPool[i].free){
        return this.frontWeaponSoundPool[i];
      }
    }
  }
  update(input, deltaTime){
    this.currentState.handleInput(input);
  
    //engine thruster sound
    if (this.dy !== 0 || this.dx !== 0){
      this.engineSound.play();
    } else this.engineSound.pause();

    //front weapon sound
    if (this.shoot){
      const frontWeaponSound = this.getFrontWeaponSound();
      if (frontWeaponSound){
        frontWeaponSound.start();
        frontWeaponSound.play();
      }
      frontWeaponSound.reset();
    }
    
    //horizontal movement
    this.x += this.dx;
    if (input.includes('ArrowLeft')){
      this.dx = -this.maxDx;
    } else 
    if (input.includes('ArrowRight')){  
      this.dx = this.maxDx;
    } else{
      this.dx = 0;
    } 

    // horizontal boundaries
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

    // vertical movement
    this.y += this.dy;
    if (input.includes('ArrowUp')){
      this.dy = -this.maxDy;
    } else if (input.includes('ArrowDown')){ 
      this.dy = this.maxDy;
    } else this.dy = 0;
    
    // vertical boundaries
    if (this.y < 0) this.y = 0;
    if (this.y > this.game.height - this.height) this.y = this.game.height - this.height;

    //sprite animation
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else {
        this.frameX = 0;
      } 
    } else{
      this.frameTimer += deltaTime;
    }
  }
  draw(context) {
    if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height );

  }
  setState(state, dx){
    this.currentState = this.states[state];
    this.game.speed = this.game.maxSpeed * dx;
    this.currentState.enter();
  }
}