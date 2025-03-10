import type { Entity } from '../Entity';

export class EngineColision {
  private readonly entities: Entity[];

  constructor() {
    this.entities = [];
  }

  detectCollisions(entity: Entity, entities: Entity[]): void {
    for (const other of entities) {
      if (other !== entity && this.isColliding(entity, other)) {
        this.resolveCollision(entity, other);
      }
    }
  }

  // Verifica si dos entidades están colisionando
  private isColliding(a: Entity, b: Entity): boolean {
    return (
      a.x < b.x + b.w &&
      a.x + a.w > b.x &&
      a.y < b.y + b.h &&
      a.y + a.h > b.y
    );
  }

  // Resuelve la colisión entre dos entidades
  private resolveCollision(a: Entity, b: Entity): void {
    const overlapX = Math.min(a.x + a.w - b.x, b.x + b.w - a.x);
    const overlapY = Math.min(a.y + a.h - b.y, b.y + b.h - a.y);

    // Resolver la colisión en la dirección de menor solapamiento
    if (overlapX < overlapY) {
      // Colisión horizontal
      if (a.x < b.x) {
        a.x -= overlapX / 2;
        b.x += overlapX / 2;
      } else {
        a.x += overlapX / 2;
        b.x -= overlapX / 2;
      }
    } else {
      // Colisión vertical
      if (a.y < b.y) {
        a.y -= overlapY / 2;
        b.y += overlapY / 2;
      } else {
        a.y += overlapY / 2;
        b.y -= overlapY / 2;
      }
    }
  }
}
