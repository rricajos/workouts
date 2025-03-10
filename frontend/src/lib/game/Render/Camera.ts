import type { Player } from "../Player/Player";

export class Camera {
  private playerPositionHistory: { x: number, y: number, timestamp: number }[] = [];
  private static readonly CAM_DELAY = 500; // ms

  trackPosition(player: Player): void {
    const currentTime = Date.now();
    this.playerPositionHistory.push({ x: player.x, y: player.y, timestamp: currentTime });

    // Mantener solo las posiciones relevantes
    this.playerPositionHistory = this.playerPositionHistory.filter(pos => currentTime - pos.timestamp <= Camera.CAM_DELAY);
  }

  getDelayedPosition(): { x: number, y: number } {
    const currentTime = Date.now();
    const targetTime = currentTime - Camera.CAM_DELAY;

    for (let i = this.playerPositionHistory.length - 1; i >= 0; i--) {
      if (this.playerPositionHistory[i].timestamp <= targetTime) {
        return this.playerPositionHistory[i];
      }
    }

    return this.playerPositionHistory[0] || { x: 0, y: 0 };
  }

  calculateOffset(canvas: HTMLCanvasElement, mapWidth: number, mapHeight: number): { cameraOffsetX: number, cameraOffsetY: number } {
    const delayedPosition = this.getDelayedPosition();
    let cameraOffsetX = delayedPosition.x - canvas.width / 2;
    let cameraOffsetY = delayedPosition.y - canvas.height / 2;

    // Limitar el desplazamiento de la cámara para que no salga del mapa
    cameraOffsetX = Math.max(0, Math.min(cameraOffsetX, mapWidth - canvas.width));
    cameraOffsetY = Math.max(0, Math.min(cameraOffsetY, mapHeight - canvas.height));

    return { cameraOffsetX, cameraOffsetY };
  }
}
