import type { Entity } from "../Entity";

export class RenderEntity {
  private readonly context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  drawEntities(entities: Entity[], cameraOffsetX: number, cameraOffsetY: number): void {
    for (const entity of entities) {
      this.context.fillStyle = entity.color; // Color negro para las entidades (incluyendo el jugador)
      this.context.fillRect(entity.x - cameraOffsetX, entity.y - cameraOffsetY, entity.w, entity.h);
    }
  }
}
