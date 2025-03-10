// src/lib/PowerUp.ts
import { Player } from './Player';

export class PowerUp {
    x: number;
    y: number;
    width: number = 15;
    height: number = 15;
    type: 'health' | 'speed';
    color: string;

    constructor(x: number, y: number, type: 'health' | 'speed') {
        this.x = x;
        this.y = y;
        this.type = type;
        this.color = type === 'health' ? 'green' : 'yellow';
    }

    applyEffect(player: Player) {
        if (this.type === 'health') {
            player.life = Math.min(100, player.life + 20);
        } else if (this.type === 'speed') {
            player.speed += 2;
            setTimeout(() => player.speed -= 2, 5000);
        }
    }

    checkCollision(player: Player): boolean {
        return (
            player.x < this.x + this.width &&
            player.x + player.width > this.x &&
            player.y < this.y + this.height &&
            player.y + player.height > this.y
        );
    }

    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}
