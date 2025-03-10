// Render.ts
import type { Entity } from '../Entity';
import type { Player } from '../Player/Player';
import type { Engine } from '../Engine/Engine';

export class Render {
  private readonly context: CanvasRenderingContext2D;
  private readonly canvas: HTMLCanvasElement;
  private readonly engine: Engine;

  constructor(canvas: HTMLCanvasElement, engine: Engine) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d')!;
    this.engine = engine;
  }

  clean(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw(entities: Entity[], player: Player): void {
    // Calcular el offset de la cámara
    const cameraOffsetX = player.x + player.w / 2 - this.canvas.width / 2;
    const cameraOffsetY = player.y + player.h / 2 - this.canvas.height / 2;

    // Limitar el desplazamiento de la cámara para que no salga del mapa
    const clampedCameraOffsetX = Math.max(0, Math.min(cameraOffsetX, this.engine.mapWidth - this.canvas.width));
    const clampedCameraOffsetY = Math.max(0, Math.min(cameraOffsetY, this.engine.mapHeight - this.canvas.height));

    this.clean();

    // Dibuja la cuadrícula
    this.engine.drawGrid(this.context, clampedCameraOffsetX, clampedCameraOffsetY);

    // Dibuja las entidades (incluyendo al jugador)
    for (const entity of entities) {
      this.context.fillStyle = entity.color; // Color negro para el jugador
      this.context.fillRect(entity.x - clampedCameraOffsetX, entity.y - clampedCameraOffsetY, entity.w, entity.h);
    }
  }
}
