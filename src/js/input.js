export class InputHandler {
  constructor(game){
    this.game = game;
    this.keys = [];

    window.addEventListener('keydown', e => {
      if (( e.key === 'ArrowDown' ||
            e.key === 'ArrowUp' ||
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowRight' ||
            e.key === 'Enter' ||
            e.key === 's'
      ) && this.keys.indexOf(e.key) === -1){
        this.keys.push(e.key);
      } else if (e.key === 'd') this.game.debug = !this.game.debug;

      if (e.repeat && this.keys.indexOf(e.key + 'Hold') === -1){
          this.keys.push(e.key + 'Hold');
      }
    });
    window.addEventListener('keyup', e => {
      if ( e.key === 'ArrowDown' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'Enter' ||
        e.key === 's'){
        this.keys.splice(this.keys.indexOf(e.key), 1);
        this.keys.splice(this.keys.indexOf(e.key + 'Hold'),1);
      }
    });
  }
}