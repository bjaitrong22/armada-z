class Particle {
  constructor(game){
    this.game = game;
    this.markedForDeletion = false;
  }
  update(){
    this.x -= this.dx + this.game.speed;
    this.y -= this.dy;
    if (this.size < 15) this.markedForDeletion = true;
  }
}

export class Dust extends Particle {
  constructor(game, x, y){
    super(game);
    this.game = game;
    this.size = Math.random() * 20 + 10;
    this.x = x;
    this.y = y;
    this.dx = Math.random();
    this.dy = Math.random();
    this.color = 'black';
  }
  draw(context){
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI *2);
    context.fillStyle = this.color;
    context.fill();
  }
}

export class Splash extends Particle {
  constructor(game, x, y){
    super(game);
    this.size = Math.random() * 100 + 100;
    this.x = x - this.size * 0.4;
    this.y = y - this.size * 0.5;
    this.dx = Math.random() * 6 - 3;
    this.dy = Math.random() * 2 + 2;
    this.kineticForce = 0;
    this.image = document.getElementById('fire');
  }
  update(){
    super.update();
    this.kineticForce += 0.1;
    this.y += this.kineticForce;
  }
  draw(context){
    context.drawImage(this.image, this.x, this.y, this.size, this.size);
  }
}

export class Fire extends Particle {
  constructor(game, x, y){
    super(game);
    this.image = document.getElementById('fire');
    this.size = Math.random() * 50;
    this.x = x + 25;
    this.y = y - 5;
    this.dx = 10;
    this.dy = 0;
    this.angle = 0;
    this.angularVelocity = Math.random() * 0.2 - 0.1;
  }
  update(){
    super.update();
    this.angle += this.angularVelocity;
    this.x += Math.sin(this.angle * 10);
  }
  draw(context){
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.drawImage(this.image, -this.size * 0.5, -this.size * 0.5, this.size, this.size);
    context.restore();
  }
}