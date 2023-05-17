import { thrusterParticle, Projectiles } from "./particles.js"; 

const states = {
  FLOATING: 0,
  HORIZONTAL_TRAVEL: 1,
  VERTICAL_TRAVEL: 2,
  FRONTAL_ATTACK: 3 
};

class State {
  constructor(state, game){
    this.state = state;
    this.game = game;
  }
}

export class Floating extends State {
  constructor(game){
    super('FLOATING', game);
  }
  enter(){
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 0;
    this.game.player.frameY = 0;
  }
  handleInput(input){
    if (input.includes('ArrowLeft') || input.includes('ArrowRight')){
      this.game.player.setState(states.HORIZONTAL_TRAVEL, 1);
    } else if (input.includes('ArrowUp') || input.includes('ArrowDown')){
      this.game.player.setState(states.VERTICAL_TRAVEL, 1);
    } else if (input.includes('s')){
      this.game.player.setState(states.FRONTAL_ATTACK, 1);
    } 
  }
}

export class HorizontalTravel extends State {
  constructor(game){
    super('HORIZONTAL_TRAVEL', game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 0;
    this.game.player.frameY = 0;
  }
  handleInput(input){
  
    if(input.includes('ArrowRight') && !input.includes('ArrowLeft')){
      this.game.thrusterParticlePool.unshift(new thrusterParticle(this.game, this.game.player.x + this.game.player.width * .16, this.game.player.y + this.game.player.height * 0.5));
    }
    if(input.includes('ArrowLeft') && !input.includes('ArrowRight')){
      this.game.thrusterParticlePool.unshift(new thrusterParticle(this.game,this.game.player.x + this.game.player.width * .8, this.game.player.y + this.game.player.height * 0.8));
    }
    if (input.includes('ArrowUp') || input.includes('ArrowDown')){
      this.game.player.setState(states.VERTICAL_TRAVEL, 1);
    } 
    if (input.includes('s')){
      this.game.player.setState(states.FRONTAL_ATTACK, 1);
    } 
  }
}

export class VerticalTravel extends State {
  constructor(game){
    super('VERTICAL_TRAVEL', game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 0;
    this.game.player.frameY = 0;
  }
  handleInput(input){
    if(input.includes('ArrowUp') &&  !input.includes('ArrowDown')){      
      this.verticalHorizontalTravel(input) ;   
    } else if(input.includes('ArrowDown') && !input.includes('ArrowUp')){
      this.verticalHorizontalTravel(input); 
    }

    if (input.includes('ArrowLeft') || input.includes('ArrowRight')){
      this.game.player.setState(states.HORIZONTAL_TRAVEL, 1);
    } else if (input.includes('Enter')){
      this.game.player.setState(states.FLOATING, 0);
    }

    if (input.includes('s')) this.game.player.setState(states.FRONTAL_ATTACK, 1);
  }

  verticalHorizontalTravel(input){
    if(input.includes('ArrowLeft') && (!input.includes('ArrowRight') && !input.includes('ArrowLeft'))){
      this.game.thrusterParticlePool.unshift(new thrusterParticle(this.game,this.game.player.x + this.game.player.width * .8, this.game.player.y + this.game.player.height * 0.8));
    } else if(!input.includes('ArrowRight') && !input.includes('ArrowLeft')){
      this.game.thrusterParticlePool.unshift(new thrusterParticle(this.game, this.game.player.x + this.game.player.width * .16, this.game.player.y + this.game.player.height * 0.5));
    }  
  }
}
export class FrontalAttack extends State {
  constructor(game){
    super('FRONTAL_ATTACK', game);
  }
  enter() {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 0;
    this.game.player.frameY = 0;
  }
  handleInput(input){
    if(input.includes('s')){      
      this.game.projectileParticlePool.unshift(new Projectiles(this.game,this.game.player.x + this.game.player.width * .8, this.game.player.y + this.game.player.height * 0.8));
    }     

    if (input.includes('ArrowLeft') || input.includes('ArrowRight')){
      this.game.player.setState(states.HORIZONTAL_TRAVEL, 1);
    } else if (input.includes('Enter')){
      this.game.player.setState(states.FLOATING, 0);
    }
    if (input.includes('ArrowUp') || input.includes('ArrowDown')){
      this.game.player.setState(states.VERTICAL_TRAVEL, 1);
    }
  }
}