import type { HitBox } from '../HitBox';
import { PlayerSkills } from './PlayerSkills';
import type { Direction } from './PlayerController';

export class PlayerMove implements HitBox {
	x: number;
	y: number;
	w: number;
	h: number;
	skills: PlayerSkills;
	friction: number = 0.08;
	gravity: number = 0.3;
	MAX_FALL_VELOCITY = 5;

	constructor() {
		this.x = 0;
		this.y = 0;
		this.w = 48;
		this.h = 64;
		this.skills = new PlayerSkills();
	}

	update() {
		this.x *= 1 - this.friction;
		this.y += this.gravity;

		this.y = Math.min(this.y, this.MAX_FALL_VELOCITY);
	}

	// check limits of canvas
	bounds(canvas: HTMLCanvasElement): void {
		if (this.x < 0) this.x = 0;
		if (this.y < 0) this.y = 0;

		if (this.x + this.w > canvas.width) this.x = canvas.width - this.w;

		if (this.y + this.h > canvas.height) this.y = canvas.height - this.h;
	}

	move(direction: Direction) {
		switch (direction) {
			case 'up':
				this.y = -this.skills.yPower;
				break;
			case 'down':
				this.y = this.skills.yPower;
				break;
			case 'left':
				this.x = -this.skills.xPower;
				break;
			case 'right':
				this.x = this.skills.xPower;
				break;
			case 'up-left':
				this.y = -this.skills.yPower;
				this.x = -this.skills.xPower;
				break;
			case 'up-right':
				this.y = -this.skills.yPower;
				this.x = this.skills.xPower;
				break;
			case 'down-left':
				this.y = this.skills.yPower;
				this.x = -this.skills.xPower;
				break;
			case 'down-right':
				this.y = this.skills.yPower;
				this.x = this.skills.xPower;
				break;
		}
	}
}
