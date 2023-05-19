import { ForwardThrusterParticle, ReverseThrusterParticle, Projectiles } from "./particles.js"; 

const states = {
  FLOATING: 0,
  FORWARD_TRAVEL: 1,
  REVERSE_TRAVEL: 2,
  UPWARD_TRAVEL: 3,
  DOWNWARD_TRAVEL: 4,
  UPWARD_FORWARD: 5,
  UPWARD_BACK: 6,
  DOWNWARD_FORWARD: 7,
  DOWNWARD_BACK: 8,
  SHOOT_FORWARD: 9 
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
    if (input.includes('ArrowRight') && input.includes('ArrowUp')){
      this.game.player.setState(states.UPWARD_FORWARD, 1);

    } else if(input.includes('ArrowRight') && input.includes('ArrowDown')){
      this.game.player.setState(states.DOWNWARD_FORWARD, 1);

    } else if (input.includes('ArrowLeft') && input.includes('ArrowUp')){
      this.game.player.setState(states.UPWARD_BACK, 1);

    } else if (input.includes('ArrowLeft') && input.includes('ArrowDown')){
      this.game.player.setState(states.DOWNWARD_BACK, 1);

    } else if (input.includes('ArrowRight') && input.length === 1){
      this.game.player.setState(states.FORWARD_TRAVEL, 1);

    } else if (input.includes('ArrowLeft') && input.length === 1){
      this.game.player.setState(states.REVERSE_TRAVEL, 1);

    } else if (input.includes('ArrowUp') && input.length === 1){
      this.game.player.setState(states.UPWARD_TRAVEL, 1);

    } else if (input.includes('ArrowDown') && input.length === 1){
      this.game.player.setState(states.DOWNWARD_TRAVEL, 1);

    } else if (input.includes('s') && input.length === 1){
      this.game.player.setState(states.SHOOT_FORWARD, 1);
    } 
  }
}

export class ForwardTravel extends State {
  constructor(game){
    super('FORWARD_TRAVEL', game);
  }
  enter(){
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 0;
    this.game.player.frameY = 0;
  }
  handleInput(input){
    this.game.forwardThrusterParticlePool.unshift(new ForwardThrusterParticle(this.game, this.game.player.x + this.game.player.width * .16, this.game.player.y + this.game.player.height * 0.5));

    if (input.includes('ArrowRight') && input.includes('ArrowUp')){
      this.game.player.setState(states.UPWARD_FORWARD, 1);

    } else if(input.includes('ArrowRight') && input.includes('ArrowDown')){
      this.game.player.setState(states.DOWNWARD_FORWARD, 1);

    } else if (input.includes('ArrowLeft') && input.includes('ArrowUp')){
      this.game.player.setState(states.UPWARD_BACK, 1);

    } else if (input.includes('ArrowLeft') && input.includes('ArrowDown')){
      this.game.player.setState(states.DOWNWARD_BACK, 1);
      
    } else if (input.includes('ArrowLeft') && input.length === 1){
      this.game.player.setState(states.REVERSE_TRAVEL, 1);

    } else if (input.includes('ArrowUp') && input.length == 1){
      this.game.player.setState(states.UPWARD_TRAVEL, 1);

    } else if (input.includes('ArrowDown') && input.length == 1){
      this.game.player.setState(states.DOWNWARD_TRAVEL, 1);

    } else if (input.includes('s')){
      this.game.player.setState(states.SHOOT_FORWARD, 1);
    } 
  }
}
export class UpwardForwardTravel extends State {
  constructor(game){
    super('UPWARD_FORWARD', game);
  }
  enter(){
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 0;
    this.game.player.frameY = 0;
  }
  handleInput(input){
    this.game.forwardThrusterParticlePool.unshift(new ForwardThrusterParticle(this.game, this.game.player.x + this.game.player.width * .16, this.game.player.y + this.game.player.height * 0.5));

    if(input.includes('ArrowRight') && input.includes('ArrowDown')){
      this.game.player.setState(states.DOWNWARD_FORWARD, 1);

    } else if (input.includes('ArrowLeft') && input.includes('ArrowUp')){
      this.game.player.setState(states.UPWARD_BACK, 1);

    } else if (input.includes('ArrowLeft') && input.includes('ArrowDown')){
      this.game.player.setState(states.DOWNWARD_BACK, 1);
      
    } else if (input.includes('ArrowLeft') && input.length === 1){
      this.game.player.setState(states.REVERSE_TRAVEL, 1);

    } else if (input.includes('ArrowUp') && input.length == 1){
      this.game.player.setState(states.UPWARD_TRAVEL, 1);

    } else if (input.includes('ArrowDown') && input.length == 1){
      this.game.player.setState(states.DOWNWARD_TRAVEL, 1);

    } else if (input.includes('s')){
      this.game.player.setState(states.SHOOT_FORWARD, 1);
    } 
  }
}
export class DownwardForwardTravel extends State {
  constructor(game){
    super('DOWNWARD_FORWARD', game);
  }
  enter(){
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 0;
    this.game.player.frameY = 0;
  }
  handleInput(input){
    this.game.forwardThrusterParticlePool.unshift(new ForwardThrusterParticle(this.game, this.game.player.x + this.game.player.width * .16, this.game.player.y + this.game.player.height * 0.5));

    if (input.includes('ArrowRight') && input.includes('ArrowUp')){
      this.game.player.setState(states.UPWARD_FORWARD, 1);

    } else if (input.includes('ArrowLeft') && input.includes('ArrowUp')){
      this.game.player.setState(states.UPWARD_BACK, 1);

    } else if (input.includes('ArrowLeft') && input.includes('ArrowDown')){
      this.game.player.setState(states.DOWNWARD_BACK, 1);
      
    } else if (input.includes('ArrowLeft') && input.length === 1){
      this.game.player.setState(states.REVERSE_TRAVEL, 1);

    } else if (input.includes('ArrowUp') && input.length == 1){
      this.game.player.setState(states.UPWARD_TRAVEL, 1);

    } else if (input.includes('ArrowDown') && input.length == 1){
      this.game.player.setState(states.DOWNWARD_TRAVEL, 1);

    } else if (input.includes('s')){
      this.game.player.setState(states.SHOOT_FORWARD, 1);
    } 
  }
}
export class ReverseTravel extends State {
  constructor(game){
    super('REVERSE_TRAVEL', game);
  }
  enter(){
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 0;
    this.game.player.frameY = 0;
  }
  handleInput(input){
    this.game.reverseThrusterParticlePool.unshift(new ReverseThrusterParticle(this.game,this.game.player.x + this.game.player.width * 0.8, this.game.player.y + this.game.player.height * 0.8));
  
    if (input.includes('ArrowRight') && input.includes('ArrowUp')){
      this.game.player.setState(states.UPWARD_FORWARD, 1);

    } else if(input.includes('ArrowRight') && input.includes('ArrowDown')){
      this.game.player.setState(states.DOWNWARD_FORWARD, 1);

    } else if (input.includes('ArrowLeft') && input.includes('ArrowUp')){
      this.game.player.setState(states.UPWARD_BACK, 1);

    } else if (input.includes('ArrowLeft') && input.includes('ArrowDown')){
      this.game.player.setState(states.DOWNWARD_BACK, 1);
      
    } else if (input.includes('ArrowRight') && input.length == 1){
      this.game.player.setState(states.FORWARD_TRAVEL, 1);

    } else if (input.includes('ArrowUp') && input.length == 1){
      this.game.player.setState(states.UPWARD_TRAVEL, 1);

    } else if (input.includes('ArrowDown') && input.length == 1){
      this.game.player.setState(states.DOWNWARD_TRAVEL, 1);

    }else if (input.includes('s')){
      this.game.player.setState(states.SHOOT_FORWARD, 1);
    }  
  }
}
export class UpwardBackTravel extends State {
  constructor(game){
    super('UPWARD_BACK', game);
  }
  enter(){
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 0;
    this.game.player.frameY = 0;
  }
  handleInput(input){
    this.game.reverseThrusterParticlePool.unshift(new ReverseThrusterParticle(this.game,this.game.player.x + this.game.player.width * 0.8, this.game.player.y + this.game.player.height * 0.8));
  
    if (input.includes('ArrowRight') && input.includes('ArrowUp')){
      this.game.player.setState(states.UPWARD_FORWARD, 1);

    } else if(input.includes('ArrowRight') && input.includes('ArrowDown')){
      this.game.player.setState(states.DOWNWARD_FORWARD, 1);

    } else if (input.includes('ArrowLeft') && input.includes('ArrowDown')){
      this.game.player.setState(states.DOWNWARD_BACK, 1);
      
    } else if (input.includes('ArrowRight') && input.length == 1){
      this.game.player.setState(states.FORWARD_TRAVEL, 1);

    } else if (input.includes('ArrowUp') && input.length == 1){
      this.game.player.setState(states.UPWARD_TRAVEL, 1);

    } else if (input.includes('ArrowDown') && input.length == 1){
      this.game.player.setState(states.DOWNWARD_TRAVEL, 1);

    }else if (input.includes('s')){
      this.game.player.setState(states.SHOOT_FORWARD, 1);
    }  
  }
}
export class DownwardBackTravel extends State {
  constructor(game){
    super('DOWNWARD_BACK', game);
  }
  enter(){
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 0;
    this.game.player.frameY = 0;
  }
  handleInput(input){
    this.game.reverseThrusterParticlePool.unshift(new ReverseThrusterParticle(this.game,this.game.player.x + this.game.player.width * 0.8, this.game.player.y + this.game.player.height * 0.8));
  
    if (input.includes('ArrowRight') && input.includes('ArrowUp')){
      this.game.player.setState(states.UPWARD_FORWARD, 1);

    } else if(input.includes('ArrowRight') && input.includes('ArrowDown')){
      this.game.player.setState(states.DOWNWARD_FORWARD, 1);

    } else if (input.includes('ArrowLeft') && input.includes('ArrowUp')){
      this.game.player.setState(states.UPWARD_BACK, 1);

    } else if (input.includes('ArrowRight') && input.length == 1){
      this.game.player.setState(states.FORWARD_TRAVEL, 1);

    } else if (input.includes('ArrowUp') && input.length == 1){
      this.game.player.setState(states.UPWARD_TRAVEL, 1);

    } else if (input.includes('ArrowDown') && input.length == 1){
      this.game.player.setState(states.DOWNWARD_TRAVEL, 1);

    }else if (input.includes('s')){
      this.game.player.setState(states.SHOOT_FORWARD, 1);
    }  
  }
}
export class UpwardTravel extends State {
  constructor(game){
    super('UPWARD_TRAVEL', game);
  }
  enter(){
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 0;
    this.game.player.frameY = 0;
  }
  handleInput(input){
    this.game.forwardThrusterParticlePool.unshift(new ForwardThrusterParticle(this.game, this.game.player.x + this.game.player.width * .16, this.game.player.y + this.game.player.height * 0.5));
    
    if (input.includes('ArrowRight') && input.includes('ArrowUp')){
      this.game.player.setState(states.UPWARD_FORWARD, 1);

    } else if(input.includes('ArrowRight') && input.includes('ArrowDown')){
      this.game.player.setState(states.DOWNWARD_FORWARD, 1);

    } else if (input.includes('ArrowLeft') && input.includes('ArrowUp')){
      this.game.player.setState(states.UPWARD_BACK, 1);

    } else if (input.includes('ArrowLeft') && input.includes('ArrowDown')){
      this.game.player.setState(states.DOWNWARD_BACK, 1);
      
    } else if (input.includes('ArrowRight') && input.length == 1){
      this.game.player.setState(states.FORWARD_TRAVEL, 1);

    } else if (input.includes('ArrowLeft') && input.length == 1){
      this.game.player.setState(states.REVERSE_TRAVEL, 1);

    } else if (input.includes('ArrowDown') && input.length == 1){
      this.game.player.setState(states.DOWNWARD_TRAVEL, 1);

    } else if (input.includes('s')){
      this.game.player.setState(states.SHOOT_FORWARD, 1);
    }  
  }
}
export class DownwardTravel extends State {
  constructor(game){
    super('DOWNWARD_TRAVEL', game);
  }
  enter(){
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 0;
    this.game.player.frameY = 0;
  }
  handleInput(input){
    this.game.forwardThrusterParticlePool.unshift(new ForwardThrusterParticle(this.game, this.game.player.x + this.game.player.width * .16, this.game.player.y + this.game.player.height * 0.5));
      
    if (input.includes('ArrowRight') && input.includes('ArrowUp')){
      this.game.player.setState(states.UPWARD_FORWARD, 1);

    } else if(input.includes('ArrowRight') && input.includes('ArrowDown')){
      this.game.player.setState(states.DOWNWARD_FORWARD, 1);

    } else if (input.includes('ArrowLeft') && input.includes('ArrowUp')){
      this.game.player.setState(states.UPWARD_BACK, 1);

    } else if (input.includes('ArrowLeft') && input.includes('ArrowDown')){
      this.game.player.setState(states.DOWNWARD_BACK, 1);
      
    } else if (input.includes('ArrowRight') && input.length == 1){
      this.game.player.setState(states.FORWARD_TRAVEL, 1);

    } else if (input.includes('ArrowLeft') && input.length == 1){
      this.game.player.setState(states.REVERSE_TRAVEL, 1);

    } else if (input.includes('ArrowUp') && input.length == 1){
      this.game.player.setState(states.UPWARD_TRAVEL, 1);

    } else if (input.includes('s')){
      this.game.player.setState(states.SHOOT_FORWARD, 1);
    } 
  }
}
export class ShootForward extends State {
  constructor(game){
    super('SHOOT_FORWARD', game);
  }
  // enter(){
  //   this.game.player.frameX = 0;
  //   this.game.player.maxFrame = 0;
  //   this.game.player.frameY = 0;
  // }
  // handleInput(input){
  //   if (input.includes('s')){      
  //     this.game.projectileParticlePool.unshift(new Projectiles(this.game,this.game.player.x + this.game.player.width * .8, this.game.player.y + this.game.player.height * 0.8));
  //   }     

  //   if (input.includes('ArrowLeft') || input.includes('ArrowRight')){
  //     this.game.player.setState(states.HORIZONTAL_TRAVEL, 1);
  //   } else if (input.includes('Enter')){
  //     this.game.player.setState(states.FLOATING, 0);
  //   }
  //   if (input.includes('ArrowUp') || input.includes('ArrowDown')){
  //     this.game.player.setState(states.VERTICAL_TRAVEL, 1);
  //   }
  // }
}