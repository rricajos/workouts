// src/lib/Enemy.ts
import { Player } from './Player';

export class Enemy {
    x: number;
    y: number;
    width: number = 4;
    height: number = 4;
    speed: number = 2;
    color: string = 'red';
    alive: boolean = true;
    timeScale: number = 1;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    update(player: Player) {
        if (this.x < player.x) this.x += this.speed * this.timeScale;
        if (this.x > player.x) this.x -= this.speed * this.timeScale;
        if (this.y < player.y) this.y += this.speed * this.timeScale;
        if (this.y > player.y) this.y -= this.speed * this.timeScale;

        // Colisión con el jugador (puedes ajustarlo según las reglas de tu juego)
        if (
            this.x < player.x + player.width &&
            this.x + this.width > player.x &&
            this.y < player.y + player.height &&
            this.y + this.height > player.y
        ) {
            player.life -= 10; // Daño al jugador al tocar
            this.alive = false; // El enemigo es destruido al colisionar
        }
    }

    isAlive(): boolean {
        return this.alive;
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}
