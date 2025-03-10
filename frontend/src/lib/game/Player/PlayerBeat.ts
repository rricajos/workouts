import type { HitBox } from '../HitBox';
import { PlayerSkills } from './PlayerSkills';
import type { Direction } from './PlayerController';

export class PlayerBeat implements HitBox {
	skills: PlayerSkills;
	startAtX: number;
	startAtY: number;
	x: number;
	y: number;
	w: number;
	h: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.w = 32;
		this.h = 32;
		this.startAtX = 16;
		this.startAtY = 16;
		this.skills = new PlayerSkills();

	}

	update(x: number, y: number, w: number, h: number) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	draw(context: CanvasRenderingContext2D): void {
		context.fillStyle = 'red';
		context.fillRect(this.x + this.startAtX, this.y + this.startAtY, this.w, this.h);
	}

	beat(direction: Direction) {
		switch (direction) {
			case 'up':
				this.startAtY = -16;
				this.startAtX = this.x;
				this.w = 48;
				this.h = 16;

				setTimeout(() => {
					this.startAtY = this.y;
					this.startAtX = this.x;
					this.w = 32;
					this.h = 32;
				}, 250);
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
