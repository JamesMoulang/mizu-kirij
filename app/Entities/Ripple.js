import Joseki from '../joseki';

class Ripple extends Joseki.Entities.Shapes.Ellipse {
	constructor(game, canvas, position) {
		super(
			game, 
			canvas, 
			position, 
			0,
			0,
			undefined,
			'#ffffff',
			undefined,
			1
		);

		this.worldPosition = position.add(new Joseki.Vector());
		this.worldRadius = 0;
		this.setGamePosition();
	}

	update() {
		this.setGamePosition();
		this.worldRadius++;
		this.strokeAlpha -= 0.01;
		if (this.strokeAlpha < 0) {
			this.strokeAlpha = 0;
			this.destroy();
		}
	}

	setGamePosition() {
		this.position = this.worldPosition.applyTransformationMatrix(this.game.camera.matrix);
		this.position.x += this.game.width * 0.5;
		this.position.y += this.game.height * 0.5;
		var distance = this.game.camera.position.distance(this.worldPosition);
		if (distance == 0) {
			distance = 0.1;
		}
		this.radiusX = this.worldRadius / distance;
		this.radiusY = this.radiusX / distance;
	}
}

export default Ripple;