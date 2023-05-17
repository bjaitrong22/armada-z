import rearWeaponSound from'./../assets/audioEffects/explosionAudio/explosion1.wav';

class Sound {
  constructor(){
    this.free = true;
  }
  reset(){
    this.free = true;
  }
  start(){
    this.free = false;  
  } 
}

export class RearWeaponSound extends Sound {
  constructor(){
    super();
    this.rearWeaponSound = new Audio(rearWeaponSound);
  }
  play(){
    this.rearWeaponSound.play();
  }
}