import Joseki from '../joseki';

class Camera extends Joseki.Entity {
	constructor(game, canvas, position) {
		super(game, canvas, position);
		this.position = new Joseki.Vector(0, 1, 0);
		this.forward = new Joseki.Vector(0, 0, 1);
		this.up = new Joseki.Vector(0, -1, 0);
		this.right = new Joseki.Vector(1, 0, 0);

		this.updateMatrix();
	}

	updateMatrix() {
		this.matrix = this.getMatrix();
	}

	multiplyMatrices(m1, m2) {
		var point = [[]];

		var resultWidth = m1[0].length;
		var resultHeight = m1.length;

		for (var i = 0; i < resultHeight; i++) {
			point[i] = [];
			for (var j = 0; j < resultWidth; j++) {
				var total = 0;

				for (var x = 0; x < m1[i].length; x++) {
					total += m1[i][x] * m2[x][j];
				}

				point[i][j] = total;
			}
		}

		return point;
	}

	getMatrix() {
		var VRP = this.position;
		var U = this.up;
		var V = this.right;
		var N = this.forward;
		var D = 256;

		var TM = [
			[1, 0, 0, -VRP.x],
			[0, 1, 0, -VRP.y],
			[0, 0, 1, -VRP.z],
			[0, 0, 0, 1]
		];

		var Vmag = V.distance(new Joseki.Vector(0, 0, 0));
		var Umag = U.distance(new Joseki.Vector(0, 0, 0));
		var Nmag = N.distance(new Joseki.Vector(0, 0, 0));
		var R = [
			[V.x / Vmag, V.y / Vmag, V.z / Vmag, 0],
			[U.x / Umag, U.y / Umag, U.z / Umag, 0],
			[N.x / Nmag, N.y / Nmag, N.z / Nmag, 0],
			[0, 0, 0, 1]
		];

		var SM = [
			[-1, 0, 0, 0],
			[0, 1, 0, 0],
			[0, 0, 1, 0],
			[0, 0, 0, 1]
		];

		var P = [
			[1, 0, 0, 0],
			[0, 1, 0, 0],
			[0, 0, 1, 0],
			[0, 0, 1 / D, 0]
		];

		var matrix = this.multiplyMatrices(P, SM);
		matrix = this.multiplyMatrices(matrix, R);
		matrix = this.multiplyMatrices(matrix, TM);

		return matrix;
	}
}

export default Camera;