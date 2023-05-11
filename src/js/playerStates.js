import { Fire } from "./particles.js"; 

const states = {
  FLOATING: 0,
  HORIZONTAL_TRAVEL: 1,
  VERTICAL_TRAVEL: 2 
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
    if(input.includes('ArrowRight')){
      this.game.particles.unshift(new Fire(this.game, this.game.player.x, this.game.player.y + this.game.player.height * 0.5));
    }
    if (input.includes('ArrowUp') || input.includes('ArrowDown')){
      this.game.player.setState(states.VERTICAL_TRAVEL, 1);
    } else if (input.includes('Enter')){
      this.game.player.setState(states.FLOATING, 0);
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
    if (input.includes('ArrowLeft') || input.includes('ArrowRight')){
      this.game.player.setState(states.HORIZONTAL_TRAVEL, 1);
    } else if (input.includes('Enter')){
      this.game.player.setState(states.FLOATING, 0);
    }
  }
}