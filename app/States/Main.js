import Joseki from '../joseki';
import Camera from '../Entities/Camera';
import Ripple from '../Entities/Ripple';

class Main extends Joseki.State {
	constructor() {
		super('main');
	}

	enter(game) {
		super.enter(game);
		var camera = new Camera(game, 'game', new Joseki.Vector(0, 0, 0));
		game.entities.push(camera);
		game.camera = camera;

		var z = 1;
		setInterval(function() {
			var ripple = new Ripple(game, 'game', new Joseki.Vector(0, 0, z));
			game.entities.push(ripple);
			z += 1;
		}.bind(this), 500);
	}
}

export default Main;