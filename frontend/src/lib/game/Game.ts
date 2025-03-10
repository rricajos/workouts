import { Player } from './Player/Player';
import { Inputs } from './Inputs';
import { Kombox } from './Kombox';
import { Engine } from './Engine/Engine';
import type { Entity } from './Entity';
import { Render } from './Render/Render';

export type Direction =
	| 'up'
	| 'down'
	| 'left'
	| 'right'
	| 'up-left'
	| 'up-right'
	| 'down-left'
	| 'down-right';

export class Game {
	private run: boolean = false;

	canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D;
	rate: number = 60; // 60 frames per second por defecto
	frame: number = 1; // frame inicial

	private readonly entities: Entity[];
	private readonly player: Player;
	private readonly inputs: Inputs;
	private readonly kombox: Kombox;
	private readonly engine: Engine;
	private readonly render: Render;

	private lastFrameTime: number = 0;
	private speedMultiplier: number = 100; // Factor para escalar la velocidad del juego

	private static readonly MAP_WIDTH = 2048;
	private static readonly MAP_HEIGHT = 1024;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d')!;

		const aspectRatio = 2 / 1;
		const height = Math.min(window.innerHeight, window.innerWidth / aspectRatio);
		canvas.height = height;
		canvas.width = height * aspectRatio;

		this.engine = new Engine(Game.MAP_WIDTH, Game.MAP_HEIGHT);
		this.player = new Player(32, 32, 64, 64, this.engine);
		this.render = new Render(canvas, this.engine);
		this.entities = [this.player];
		this.kombox = new Kombox('my kombox', 9, 9);
		this.inputs = new Inputs();
	}

	stop() {
		this.run = false;
	}

	pause() {
		this.run = !this.run;
	}

	start() {

		// inptus key down/up or touch start/end
		for (const [key, action] of Object.entries(this.inputs.keyBindings)) {
			console.log('keys listener: ' + key);

			this.inputs.registerAction(
				action as Direction,
				() => this.player.move(action as Direction),
				() => this.player.beat(action as Direction)
			);
		}

		this.run = true;
		this.lastFrameTime = performance.now(); 
		this.loop();
	}

	setSpeedMultiplier(multiplier: number) {
		this.speedMultiplier = multiplier;
	}

	setFrameRate(rate: number) {
		this.rate = rate;
	}

	private loop() {
		if (this.run) {
			const fpsInterval = 1000 / this.rate;  // per second

			const currentFrameTime = performance.now();
			const deltaTime = (currentFrameTime - this.lastFrameTime) / 1000;
			this.lastFrameTime = currentFrameTime;

			setTimeout(() => {
				// Actualizar lógica del juego ajustada por deltaTime y el multiplicador de velocidad
				this.engine.update(this.entities, deltaTime * this.speedMultiplier);

				// Renderizar las entidades
				this.render.draw(this.entities, this.player);

				// Continuar con el siguiente cuadro
				this.frame = requestAnimationFrame(() => this.loop());
			}, fpsInterval);
		}
	}
}
