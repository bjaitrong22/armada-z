/** @type { HTMLCanvasElement} */
import { Background } from "./background.js";

export class Game {
  constructor( width, height) {
    this.width = width;
    this.height = height;
    this.groundMargin = 40;
    this.speed = 0;
    this.maxSpeed = 2;
    this.background = new Background(this);
  }
  update(deltaTime) {
    this.time += deltaTime;
    this.background.update();
  }
  draw(context) {
    this.background.draw(context);
  }
}
