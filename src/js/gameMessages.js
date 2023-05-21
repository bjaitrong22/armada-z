export class GameMessage {
  constructor(value, x, y, destinationX, destinationY){
    this.value = value;
    this.x = x;
    this.y = y;
    this.destinationX = destinationX;
    this.destinationY = destinationY;
    this.markedForDeletion = false;
    this.timer = 0;
  }
  update(){
    this.x += (this.destinationX - this.x) * 0.005;
    this.y += (this.destinationY - this.y) * 0.005;
    this.timer++;
    if (this.timer > 400) this.markedForDeletion = true;
  }
  draw(context){
    context.font = '20' + 'px ' + 'Bangers';
    context.fillStyle = 'red';
    context.fillText(this.value, this.x, this.y);
    context.fillStyle = 'white';
    context.fillText(this.value, this.x - 1, this.y - 1);

  }
}