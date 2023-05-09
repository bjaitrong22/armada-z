/** @type { HTMLCanvasElement} */
import { Background } from "./background.js";
import { Player } from "./player.js";

export class Game {
  constructor( width, height) {
    this.width = width;
    this.height = height;
    this.bottomMargin = 200;
    this.speed = 0;
    this.maxSpeed = 2;
    this.background = new Background(this);
    this.player = new Player(this);
  }
  update(deltaTime) {
    this.time += deltaTime;
    this.background.update();
  }
  draw(context) {
    this.background.draw(context);
    this.player.draw(context);
  }
}
