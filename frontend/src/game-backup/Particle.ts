// src/lib/Particle.ts

export class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  life: number;

  constructor(x: number, y: number, color: string) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 5;
      this.speedX = (Math.random() - 0.5) * 2;
      this.speedY = (Math.random() - 0.5) * 2;
      this.color = color;
      this.life = 100;
  }

  update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life -= 1;
  }

  draw(context: CanvasRenderingContext2D) {
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.size, this.size);
  }
}
