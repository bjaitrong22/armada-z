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
    this.rearWeaponSound.currentTime = 0;

  } 
}

export class RearWeaponSound extends Sound {
  constructor(){
    super();
    this.rearWeaponSound = new Audio(rearWeaponSound);
  }
  play(){
    if(!this.free) this.rearWeaponSound.play();
  }
}