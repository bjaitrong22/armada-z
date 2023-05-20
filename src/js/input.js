export class InputHandler {
  constructor(game){
    this.game = game;
    this.keys = [];

    window.addEventListener('keydown', e => {
      if (( e.key === 'ArrowDown' ||
            e.key === 'ArrowUp' ||
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowRight' ||
            e.key === 'Enter' 
      ) && this.keys.indexOf(e.key) === -1){
        if (e.key === 'ArrowLeft'){
          if (this.keys.indexOf('ArrowRight') !== -1){
            this.keys.splice(this.keys.indexOf('ArrowRight'), 1);
          }
        }
        if (e.key === 'ArrowRight'){
          if (this.keys.indexOf('ArrowLeft') !== -1){
            this.keys.splice(this.keys.indexOf('ArrowLeft'), 1);
          }
        }
        if (e.key === 'ArrowDown'){
          if (this.keys.indexOf('ArrowUp') !== -1){
            this.keys.splice(this.keys.indexOf('ArrowUp'), 1);
          }
        }
        if (e.key === 'ArrowUp'){
          if (this.keys.indexOf('ArrowDown') !== -1){
            this.keys.splice(this.keys.indexOf('ArrowDown'), 1);
          }
        }
        this.keys.push(e.key);
      } else if (e.key === 'd' || e.key === ' '){
        if (e.key === 'd') this.game.debug = !this.game.debug;
        else this.game.player.shoot = !this.game.player.shoot;
      } 

    });
    window.addEventListener('keyup', e => {
      if (e.key === 'ArrowDown' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'Enter'){
        this.keys.splice(this.keys.indexOf(e.key), 1);
      } else if (e.key === ' ') this.game.player.shoot = !this.game.player.shoot;
    });
  }
}