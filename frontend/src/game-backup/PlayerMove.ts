import { PlayerStats } from './PlayerStats';

export type Direction =
	| 'up'
	| 'down'
	| 'left'
	| 'right'
	| 'up-left'
	| 'up-right'
	| 'down-left'
	| 'down-right';

export class PlayerMove {
	private static readonly MAX_FALL_VELOCITY = 10; // Velocidad máxima hacia abajo

	velocityX: number = 0;
	velocityY: number = 0;
	friction: number = 0.08;
	gravityIncrement: number = 0.1;
	onGround: boolean;
	doubleJump: boolean;
	jumpForce: number;
	speed: number;
    isBeatCanceled :boolean;

	constructor() {
		this.onGround = false;
		this.jumpForce = PlayerStats.JUMP_FORCE;
		this.speed = PlayerStats.SPEED;
		this.doubleJump = PlayerStats.SKILL_DOUBLE_JUMP;
        this.isBeatCanceled = false;
	}

	move(direction: Direction) {
		switch (direction) {
			case 'up':
				this.performJump();
				break;
			case 'down':
				this.velocityY = -this.jumpForce; // Hacia abajo
				break;
			case 'left':
				this.velocityX = -this.speed; // Hacia la izquierda
				break;
			case 'right':
				this.velocityX = this.speed; // Hacia la derecha
				break;
			case 'up-left':
				this.performJump();
				this.velocityX = -this.speed; // Hacia arriba y izquierda
				break;
			case 'up-right':
				this.performJump();
				this.velocityX = this.speed; // Hacia arriba y derecha
				break;
			case 'down-left':
				this.velocityY = -this.jumpForce; // Hacia abajo y izquierda
				this.velocityX = -this.speed; // Hacia abajo y izquierda
				break;
			case 'down-right':
				this.velocityY = -this.jumpForce; // Hacia abajo y derecha
				this.velocityX = this.speed; // Hacia abajo y derecha
				break;
		}
	}

    checkBeatCanceled(direction: Direction) {
        switch (direction) {
            case 'up':
                if (this.velocityY > 0) this.isBeatCanceled = true; 
                else this.isBeatCanceled = false; 
                
				break;
			case 'down':
				this.velocityY = -this.jumpForce; // Hacia abajo
				break;
			case 'left':
				this.velocityX = -this.speed; // Hacia la izquierda
				break;
			case 'right':
				this.velocityX = this.speed; // Hacia la derecha
				break;
			case 'up-left':
				this.performJump();
				this.velocityX = -this.speed; // Hacia arriba y izquierda
				break;
			case 'up-right':
				this.performJump();
				this.velocityX = this.speed; // Hacia arriba y derecha
				break;
			case 'down-left':
				this.velocityY = -this.jumpForce; // Hacia abajo y izquierda
				this.velocityX = -this.speed; // Hacia abajo y izquierda
				break;
			case 'down-right':
				this.velocityY = -this.jumpForce; // Hacia abajo y derecha
				this.velocityX = this.speed; // Hacia abajo y derecha
				break;
		}
    }

	private performJump() {
		if (this.onGround) {
			this.velocityY = this.jumpForce;
			this.onGround = false;
			this.doubleJump = true; // Resetear el doble salto al saltar desde el suelo
		} else if (this.doubleJump) {
			this.velocityY = this.jumpForce;
			this.doubleJump = false; // Usar el doble salto
		}
	}


	beat(direction: Direction) {
		switch (direction) {
			case 'up':
                
				break;
			case 'down':
				this.velocityY = -this.jumpForce; // Hacia abajo
				break;
			case 'left':
				this.velocityX = -this.speed; // Hacia la izquierda
				break;
			case 'right':
				this.velocityX = this.speed; // Hacia la derecha
				break;
			case 'up-left':
				this.performJump();
				this.velocityX = -this.speed; // Hacia arriba y izquierda
				break;
			case 'up-right':
				this.performJump();
				this.velocityX = this.speed; // Hacia arriba y derecha
				break;
			case 'down-left':
				this.velocityY = -this.jumpForce; // Hacia abajo y izquierda
				this.velocityX = -this.speed; // Hacia abajo y izquierda
				break;
			case 'down-right':
				this.velocityY = -this.jumpForce; // Hacia abajo y derecha
				this.velocityX = this.speed; // Hacia abajo y derecha
				break;
		}
	}

	update() {
		// Aplicar fricción
		this.velocityX *= 1 - this.friction;

		// Aplicar gravedad
		this.velocityY += this.gravityIncrement;

		// Limitar la velocidad vertical (caída)
		this.velocityY = Math.min(this.velocityY, PlayerMove.MAX_FALL_VELOCITY);
	}

	reload() {
        this.isBeatCanceled = false;
		this.onGround = true;
		this.doubleJump = true;
	}
}
