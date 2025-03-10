import type { Engine } from '../Engine/Engine';
import type { Entity } from '../Entity';
import type { Direction } from '../Game';


export class Player implements Entity {
	x: number;
	y: number;
	w: number;
	h: number;

	vx: number;
	vy: number;
	vw: number;
	vh: number;


	onMove : boolean;
	onBeat : boolean;
	onGround: boolean;
	alive: boolean;
	solid: boolean;
	color: string;

	engine: Engine;

	constructor(x: number, y: number, w: number, h: number, engine: Engine) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;

		this.vx = 0;
		this.vy = 0;
		this.vw = 0;
		this.vh = 0;

		this.onMove = false;
		this.onBeat = false;
		this.onGround = false;
		this.alive = true;
		this.solid = true;
		this.color = 'black';

		this.engine = engine;

	}
	jump(): void {
			if (this.onGround) {
				this.vy = -10;  // Velocidad de salto
				

			}
		
	}

	move(direction: Direction) {
		this.color = 'blue'
		this.onMove = true;


		// Permitir el salto solo si el jugador está en el suelo
		if (direction === 'up') {
			this.engine.physics.applyForce(this, 0, -6);
		}
		if (direction === 'left') {
			this.vx -= 8;
		}

		if (direction === 'right') {
			this.vx += 8;
		}

		console.log('Posición jugador:', this.x, this.y);
		console.log('Velocidad jugador:', this.vx, this.vy);
	}

	beat(direction: Direction) {
		this.onBeat = true;
		this.color = 'red';
		
		if (direction === 'left') {
			this.vx = 0;
		}

		if (direction === 'right') {
			this.vx = 0;
		}
	}
}
