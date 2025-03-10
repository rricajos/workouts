// import { PlayerSkills } from './PlayerSkills';
import { PlayerBeat } from './PlayerBeat';

import { PlayerMove } from './PlayerMove';
import { PlayerSkills } from './PlayerSkills';

export type Direction =
	| 'up'
	| 'down'
	| 'left'
	| 'right'
	| 'up-left'
	| 'up-right'
	| 'down-left'
	| 'down-right';

export class PlayerControler {

	skills: PlayerSkills;

	x: number;
	y: number;

	onGround: boolean;
	onMove: boolean;
	onBeat: boolean;

	playerBeat: PlayerBeat;
	playerMove: PlayerMove;

	constructor(x: number, y:number) {
		this.x = x;
		this.y = y;

		this.onGround = false;
		this.onMove = false;
		this.onBeat = false;

		this.playerBeat = new PlayerBeat(x, y);
		this.playerMove = new PlayerMove();


		this.skills = new PlayerSkills();


	}

	update(): void {
		
			this.playerMove.update();

			this.x += this.playerMove.x;
			this.y += this.playerMove.y;

			
	}

	move(direction: Direction) {
		this.playerMove.move(direction)
	}
	beat(direction: Direction) {
		this.playerBeat.beat(direction)
	}
}
