// EngineGrid.ts
import type { Entity } from '../Entity';

export class EngineGrid {
	private readonly gridSize: number;
	private readonly inspectedTileSize: number; // Tamaño de los tiles inspeccionados
	private readonly grid: Map<string, Entity[]>;

	constructor(gridSize: number = 64, inspectedTileSize: number = 256) {
		// Tamaño por defecto de 64
		this.gridSize = gridSize;
		this.inspectedTileSize = inspectedTileSize; // Tamaño de tiles inspeccionados
		this.grid = new Map();
	}

	// Agrega una entidad a la grilla
	addEntity(entity: Entity): void {
		const key = this.getGridKey(entity.x - entity.w, entity.y - entity.h); // Usa el centro de la entidad
		if (!this.grid.has(key)) {
			this.grid.set(key, []);
		}
		this.grid.get(key)!.push(entity);
	}

	// Limpia la grilla (esto debería hacerse cada frame antes de actualizar)
	clearGrid(): void {
		this.grid.clear();
	}

	// Obtiene entidades cercanas para una entidad
	getNearbyEntities(entity: Entity): Entity[] {
		const nearbyEntities: Entity[] = [];
		const key = this.getGridKey(entity.x + entity.w / 2, entity.y + entity.h / 2);

		if (this.grid.has(key)) {
			nearbyEntities.push(...this.grid.get(key)!);
		}

		// Para que se busquen también los tiles vecinos
		const keysToCheck = this.getNeighborKeys(key);
		for (const neighborKey of keysToCheck) {
			if (this.grid.has(neighborKey)) {
				nearbyEntities.push(...this.grid.get(neighborKey)!);
			}
		}

		return nearbyEntities;
	}

	// Convierte las coordenadas del espacio en una clave de grilla
	private getGridKey(x: number, y: number): string {
		const gridX = Math.floor(x / this.gridSize);
		const gridY = Math.floor(y / this.gridSize);
		return `${gridX},${gridY}`;
	}

	// Obtiene las claves de las celdas vecinas
	private getNeighborKeys(key: string): string[] {
		const [gridX, gridY] = key.split(',').map(Number);
		return [
			`${gridX - 1},${gridY - 1}`,
			`${gridX},${gridY - 1}`,
			`${gridX + 1},${gridY - 1}`,
			`${gridX - 1},${gridY}`,
			`${gridX},${gridY}`,
			`${gridX + 1},${gridY}`,
			`${gridX - 1},${gridY + 1}`,
			`${gridX},${gridY + 1}`,
			`${gridX + 1},${gridY + 1}`
		];
	}
	// Método para dibujar la cuadrícula y los tiles inspeccionados
	drawGrid(
		context: CanvasRenderingContext2D,
		cameraOffsetX: number,
		cameraOffsetY: number,
		mapWidth: number,
		mapHeight: number
	): void {
		context.strokeStyle = 'rgba(0, 0, 0, 0.2)'; // Color de la cuadrícula
		context.lineWidth = 1;

		// Dibuja la cuadrícula
		for (let x = 0; x < mapWidth; x += this.gridSize) {
			context.beginPath();
			context.moveTo(x - cameraOffsetX, 0);
			context.lineTo(x - cameraOffsetX, mapHeight);
			context.stroke();
		}

		for (let y = 0; y < mapHeight; y += this.gridSize) {
			context.beginPath();
			context.moveTo(0, y - cameraOffsetY);
			context.lineTo(mapWidth, y - cameraOffsetY);
			context.stroke();
		}

		// Dibuja los tiles inspeccionados (rojo)
		context.fillStyle = 'rgba(255, 0, 0, 0.5)'; // Color para los tiles inspeccionados
		this.grid.forEach((entities, key) => {
			if (entities.length > 0) {
				// Solo dibuja si hay entidades en la celda
				const [gridX, gridY] = key.split(',').map(Number);
				context.fillRect(
					gridX * this.gridSize - cameraOffsetX,
					gridY * this.gridSize - cameraOffsetY,
					this.inspectedTileSize, // Usar tamaño de tile inspeccionado
					this.inspectedTileSize // Usar tamaño de tile inspeccionado
				);
			}
		});
	}
}
