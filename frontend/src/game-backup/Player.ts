// Player.ts
import { PlayerMove, type Direction } from './PlayerMove'; // Importar PlayerMove

export class Player {
	x: number;
	y: number;
	width: number;
	height: number;
	color: string; // Color inicial
	
    isBeatCanceled :boolean;
	playerMove: PlayerMove; // Nueva instancia de PlayerMove

	constructor(x: number, y: number, width: number, height: number) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = 'blue';

		this.playerMove = new PlayerMove();
		this.isBeatCanceled = false;
	}

	move(direction: Direction) {
        this.playerMove.checkBeatCanceled(direction);
		if (!this.playerMove.isBeatCanceled) { 
            this.color = 'yellow';
            this.playerMove.move(direction);
        } else {
            this.color = 'blue'
        }
	
	}

	beat(direction: Direction) {
        this.playerMove.checkBeatCanceled(direction);
		if (!this.playerMove.isBeatCanceled) {
            this.color = 'red'
            this.playerMove.beat(direction);
            setTimeout(() => {
                   this.color = 'blue'
            }, 250);
		} else {
            this.color = 'blue';
        }
	}

	update(canvas: HTMLCanvasElement) {
		this.playerMove.update(); // Actualizar el movimiento

		// Movimiento del jugador
		this.x += this.playerMove.velocityX; // Actualizar posición horizontal
		this.y += this.playerMove.velocityY; // Actualizar posición vertical

    
		// Comprobar límites
		this.handleBounds(canvas);
	}

	handleBounds(canvas: HTMLCanvasElement) {
		if (this.x < 0) this.x = 0;
		if (this.y < 0) this.y = 0;
		if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
		if (this.y + this.height > canvas.height) {
			this.y = canvas.height - this.height;
			this.playerMove.reload();
		}
	}

	draw(context: CanvasRenderingContext2D) {
		context.fillStyle = this.color;
		context.fillRect(this.x, this.y, this.width, this.height);
	}
}
