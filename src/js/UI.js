export class UI {
  constructor(game){
    this.game = game;
    this.fontSize = 20;
    this.fontFamily = 'sarif';
    this.shipsLeftImage = document.getElementById('shipsLeft');
    this.game = game;
    this.spriteWidth = 150;
    this.spriteHeight = 54;
    this.sizeModifier = .15;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
  }
  draw(context){
    context.save();
    context.font = this.fontSize + 'px ' + this.fontFamily;
    context.fillStyle = 'red';
    context.textAlign = 'center';
    context.fillText('Score: ' + this.game.score, .5 * (this.game.width), 30);
    
    //timer
    context.font = this.fontSize + 'px ' + this.fontFamily;
    context.fillText('Time: ' + (this.game.time * .001).toFixed(1), .5 * (this.game.width), 60);
    //lives
    for (let i = 0; i < this.game.lives ; i++){
      context.drawImage(this.shipsLeftImage, .54 * (this.game.width - this.width * 2*i ), 80, this.width, this.height);
    }  
    
    context.restore();
  }
}