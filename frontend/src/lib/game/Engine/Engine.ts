// Engine.ts
import type { Entity } from '../Entity';
import { EnginePhysics } from './EnginePhysics';
import { EngineColision } from './EngineColision';
import { EngineGrid } from './EngineGrid';

export class Engine {
  public readonly physics: EnginePhysics;
  private readonly colider: EngineColision;
  private readonly grid: EngineGrid;
  public readonly mapWidth: number;
  public readonly mapHeight: number;

  constructor(mapWidth: number, mapHeight: number) {
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.physics = new EnginePhysics(mapWidth, mapHeight);
    this.colider = new EngineColision();
    this.grid = new EngineGrid();
  }

  update(entities: Entity[], deltaTime: number = 1): void {
    // Limpiar la grilla antes de actualizar las entidades
    this.grid.clearGrid();

    for (const entity of entities) {
      // Actualizamos la física de la entidad
      this.physics.applyPhysics(entity, deltaTime);

      // Añadimos la entidad a la grilla para detectar colisiones en el siguiente paso
      this.grid.addEntity(entity);
    }

    // Detectar y resolver colisiones
    for (const entity of entities) {
      const nearbyEntities = this.grid.getNearbyEntities(entity);
      this.colider.detectCollisions(entity, nearbyEntities);
    }
  }

  // Método para dibujar la cuadrícula
  drawGrid(context: CanvasRenderingContext2D, cameraOffsetX: number, cameraOffsetY: number): void {
    this.grid.drawGrid(context, cameraOffsetX, cameraOffsetY, this.mapWidth, this.mapHeight);
  }
}
