import frontWeaponSound from'./../assets/audioEffects/explosionAudio/explosion1.wav';
import explosionSound2 from './../assets/audioEffects/impactAudio/explosion2.wav';
import explosionSound3 from './../assets/audioEffects/impactAudio/explosion3.wav';
import explosionSound4 from './../assets/audioEffects/impactAudio/explosion4.wav';
import explosionSound5 from './../assets/audioEffects/impactAudio/hjm-big_explosion_3.wav';
import explosionSound6 from './../assets/audioEffects/impactAudio/NenadSimic - Muffled Distant Explosion.wav';

class Sound {
  constructor(game){
    this.game = game;
    this.free = true; 
  }
  reset(){
    this.free = true;    
  }
  start(){
    this.free = false;
  }  
}

export class FrontWeaponSound extends Sound {
  constructor(){
    super();
    this.frontWeaponSound = new Audio(frontWeaponSound);
    this.frontWeaponSound.volume = .10;
  }
  play(){
    
    if (!this.free){
      this.frontWeaponSound.currentTime = 0; 
      this.frontWeaponSound.play();
    }
  }
}

export class ExplosionSound extends Sound {
  constructor() {
    super();
    this.explosionSoundsOptions = [explosionSound2, explosionSound3, explosionSound4, explosionSound5,explosionSound6];
    this.explosionSound = this.explosionSoundsOptions[Math.floor(Math.random() * this.explosionSoundsOptions.length)];
    this.exploSound = new Audio(this.explosionSound);
    this.exploSound.volume = 1;
  }

  play(){
    if (!this.free){
      this.exploSound.play();    
    }
  }
  start(){
    this.free = false;
    this.explosionSound = this.explosionSoundsOptions[Math.floor(Math.random() * this.explosionSoundsOptions.length)];
  }  

}