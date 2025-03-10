// src/lib/Projectile.ts
import { Player } from './Player';

export class Projectile {
    x: number;
    y: number;
    width: number = 5;
    height: number = 5;
    speed: number = 3;
    dx: number;
    dy: number;

    constructor(x: number, y: number, dx: number, dy: number) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }

    update(player: Player) {
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;

        // Detect collision with player
        if (
            this.x < player.x + player.width &&
            this.x + this.width > player.x &&
            this.y < player.y + player.height &&
            this.y + this.height > player.y
        ) {
            player.life -= 5;
        }
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = 'purple';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}
