import frontWeaponSound from'./../assets/audioEffects/explosionAudio/explosion1.wav';

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

export class FrontWeaponSound extends Sound {
  constructor(){
    super();
    this.frontWeaponSound = new Audio(frontWeaponSound);
  }
  play(){
    if (!this.free){
      this.frontWeaponSound = new Audio(frontWeaponSound);
      this.frontWeaponSound.play();    
    }
  }
}