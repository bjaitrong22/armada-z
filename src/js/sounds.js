import thruster1 from './../assets/audioEffects/ScatterNoise1.mp3';
import frontWeaponSound from'./../assets/audioEffects/explosionAudio/explosion1.wav';
import explosionSound2 from './../assets/audioEffects/impactAudio/explosion2.wav';
import explosionSound3 from './../assets/audioEffects/impactAudio/explosion3.wav';
import explosionSound4 from './../assets/audioEffects/impactAudio/explosion4.wav';
import explosionSound5 from './../assets/audioEffects/impactAudio/hjm-big_explosion_3.wav';
import explosionSound6 from './../assets/audioEffects/impactAudio/NenadSimic - Muffled Distant Explosion.wav';
import backgroundMusic1 from './../assets/music/floatingState/throughSpace.ogg';
import backgroundMusic2 from './../assets/music/floatingState/enchantedTiki86.mp3';
import { Howl, Howler } from 'howler';

export class ThrusterSound {
  constructor(){
    this.thrusterSound = new Howl({
      src: [thruster1],
      volume: 1.0
    }); 
  }
  play() {
    this.thrusterSound.play();
  }
  stop() {
    this.thrusterSound.stop();
  }
}

export class FrontWeaponSound {
  constructor(){
    this.frontWeaponSound = new Howl({
      src: [frontWeaponSound],
      volume: 0.30
    }); 
  }
  play() {
    this.frontWeaponSound.play();
  }
  stop() {
    this.frontWeaponSound.stop();
  }
}

export class ExplosionSound {
  constructor() {
    this.explosionSoundsOptions = [explosionSound2, explosionSound3, explosionSound4, explosionSound5,explosionSound6];
    this.chosenExplosionSound = this.explosionSoundsOptions[Math.floor(Math.random() * (this.explosionSoundsOptions.length - 1))];

    this.explosionSound = new Howl({
      src: [this.chosenExplosionSound],
      volume: 1.0
    }); 
  }
  play() {
    this.explosionSound.play();
  }
  stop() {
    this.explosionSound.stop();
  }
}

export class BackgroundMusic {
  constructor() {
    this.backgroundMusicOptions = [backgroundMusic1, backgroundMusic2];
    this.chosenBackgroundMusic =  this.backgroundMusicOptions[Math.floor(Math.random() * (this.backgroundMusicOptions.length -1))];
    
    this.backgroundMusic = new Howl({
      src: [this.chosenBackgroundMusic],
      loop: true,
      volume: 0.45
    }); 
  }
  play() {
    this.backgroundMusic.play();
  }
  stop() {
    this.backgroundMusic.stop();
  }
}