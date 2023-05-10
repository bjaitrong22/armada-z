const states = {
  FLOATING: 0,
  HORIZONTAL_TRAVEL:1
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
    if(input.includes('Enter')){
      this.game.player.setState(states.FLOATING, 0);
    }
  }
}