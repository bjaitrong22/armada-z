export class Player {
  constructor(game){
    this.game = game;
    this.width = 150;
    this.height = 54;
    this.x = 200;
    this.y = this.game.height - this.height - this.game.bottomMargin;
    this.image = document.getElementById('player_ship');
  }
  update(){

  }
  draw(context){
    context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
  }
}