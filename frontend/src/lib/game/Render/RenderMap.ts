export class RenderMap {
  private readonly context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  drawBorders(cameraOffsetX: number, cameraOffsetY: number, mapWidth: number, mapHeight: number): void {
    this.context.strokeStyle = 'red'; // Color de los bordes
    this.context.lineWidth = 16; // Grosor de los bordes

    // Dibujar borde superior
    this.context.beginPath();
    this.context.moveTo(-cameraOffsetX, -cameraOffsetY);
    this.context.lineTo(mapWidth - cameraOffsetX, -cameraOffsetY); 
    this.context.stroke();

    // Dibujar borde inferior
    this.context.beginPath();
    this.context.moveTo(-cameraOffsetX, mapHeight - cameraOffsetY);
    this.context.lineTo(mapWidth - cameraOffsetX, mapHeight - cameraOffsetY);
    this.context.stroke();

    // Dibujar borde izquierdo
    this.context.beginPath();
    this.context.moveTo(-cameraOffsetX, -cameraOffsetY);
    this.context.lineTo(-cameraOffsetX, mapHeight - cameraOffsetY);
    this.context.stroke();

    // Dibujar borde derecho
    this.context.beginPath();
    this.context.moveTo(mapWidth - cameraOffsetX, -cameraOffsetY);
    this.context.lineTo(mapWidth - cameraOffsetX, mapHeight - cameraOffsetY);
    this.context.stroke();
  }
}
