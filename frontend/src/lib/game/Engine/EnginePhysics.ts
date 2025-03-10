import type { Entity } from '../Entity';

export class EnginePhysics {
	private static readonly GRAVITY: number = 0.2; // Aceleración por gravedad
	private static readonly MAX_GRAVITY: number = 8; // Velocidad máxima de caída
	private static readonly FRICTION: number = 0.8; // Coeficiente de fricción horizontal
	private static readonly MAX_VELOCITY_X: number = 16; // Velocidad máxima horizontal
	private static readonly MAX_VELOCITY_Y: number = 16; // Velocidad máxima vertical

	private auxVX: number = 0;
	private auxVY: number = 0;
	private readonly mapWidth: number; // Ancho del mapa
	private readonly mapHeight: number; // Alto del mapa

	constructor(mapWidth: number, mapHeight: number) {
		this.mapWidth = mapWidth;
		this.mapHeight = mapHeight;
	}

	/**
	 * Aplica las fuerzas físicas a una entidad, incluyendo gravedad y fricción.
	 * También verifica si la entidad sale de los límites del mapa.
	 * @param entity La entidad a la que se le aplicará la física.
	 */
	applyPhysics(entity: Entity, deltaTime: number = 1): void {
		this.applyGravity(entity); // Aplica gravedad
		this.applyFriction(entity); // Aplica fricción

		// Limitar las velocidades a los máximos permitidos
		entity.vx = Math.min(
			Math.max(entity.vx, -EnginePhysics.MAX_VELOCITY_X),
			EnginePhysics.MAX_VELOCITY_X
		);
		entity.vy = Math.min(
			Math.max(entity.vy, -EnginePhysics.MAX_VELOCITY_Y),
			EnginePhysics.MAX_VELOCITY_Y
		);

		// Actualizar la posición de la entidad
		entity.x += entity.vx * deltaTime;
		entity.y += entity.vy * deltaTime;

		// Verificar colisión con los bordes del mapa
		this.checkMapBounds(entity);
	}

	/**
	 * Aplica la gravedad a la entidad si no está en el suelo.
	 * @param entity La entidad sobre la que se aplicará la gravedad.
	 */
	private applyGravity(entity: Entity): void {

    
		this.auxVY = entity.vy;
		this.auxVX = entity.vx;

		if (entity.onBeat) {
			entity.vy = 0;
			entity.vx = 0;
      entity.onBeat = false;
			
		}

		if (entity.onGround === false) {
			entity.vy += EnginePhysics.GRAVITY;

			if (entity.vy > EnginePhysics.MAX_GRAVITY) {
				entity.vy = EnginePhysics.MAX_GRAVITY;
			}
		}
	}

	/**
	 * Aplica fricción horizontal para desacelerar el movimiento lateral.
	 * @param entity La entidad a la que se le aplicará la fricción.
	 */
	private applyFriction(entity: Entity): void {
		if (entity.onGround) {
			entity.vx *= EnginePhysics.FRICTION; // Reduce la velocidad horizontal con fricción
		}
	}

	/**
	 * Aplica una fuerza a la entidad, ya sea lateral o vertical.
	 * @param entity La entidad sobre la que se aplicará la fuerza.
	 * @param forceX La fuerza en el eje X.
	 * @param forceY La fuerza en el eje Y.
	 */
	applyForce(entity: Entity, forceX: number, forceY: number): void {
		entity.vx += forceX;
		entity.vy += forceY;
	}

	/**
	 * Verifica si la entidad está saliendo de los límites del mapa y ajusta su posición y velocidad.
	 * @param entity La entidad a verificar.
	 */
	private checkMapBounds(entity: Entity): void {
		// Limitar en el eje X
		if (entity.x < 0) {
			entity.x = 0; // Evitar que salga por la izquierda
			entity.vx = 0; // Detener el movimiento horizontal
		} else if (entity.x + entity.w > this.mapWidth) {
			entity.x = this.mapWidth - entity.w; // Evitar que salga por la derecha
			entity.vx = 0; // Detener el movimiento horizontal
		}

		// Limitar en el eje Y
		if (entity.y < 0) {
			entity.y = 0; // Evitar que salga por arriba
			entity.vy = 0; // Detener el movimiento vertical
		} else if (entity.y + entity.h > this.mapHeight) {
			entity.y = this.mapHeight - entity.h; // Evitar que salga por abajo
			entity.vy = 0; // Detener el movimiento vertical
			entity.onGround = true; // Marcar que está en el suelo
		} else {
			entity.onGround = false; // No está en el suelo
		}
	}
}
