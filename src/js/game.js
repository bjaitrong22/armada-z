/** @type { HTMLCanvasElement} */
import { Background } from "./background.js";
import { Player } from "./player.js";
import { InputHandler } from "./input.js";

export class Game {
  constructor( width, height) {
    this.width = width;
    this.height = height;
    this.bottomMargin = 200;
    this.speed = 0;
    this.maxSpeed = .3;
    this.background = new Background(this);
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.debug = false;
    this.time = 0;
    this.player.currentState =  this.player.states[0];
    this.player.currentState.enter();
  }
  update(deltaTime) {
    this.time += deltaTime;
    this.background.update();
    this.player.update(this.input.keys, deltaTime);
  }
  draw(context) {
    this.background.draw(context);
    this.player.draw(context);
  }
}
