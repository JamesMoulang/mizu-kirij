import Joseki from './joseki';
import States from './States';

class Game extends Joseki.Game {
	constructor() {
		super('root', States);
	}
}

var game = new Game();
game.start();