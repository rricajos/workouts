// Clase para almacenar la información estática de cada kombo
class KomboDataStore {
  // Datos estáticos precargados por kombo ID
  private static komboData: Record<number, any[]> = {
    0: ["Static data for kombo 0"],
    1: ["Static data for kombo 1"],
    2: ["Static data for kombo 2"],
    // Agrega más datos estáticos según los kombos disponibles
  };

  // Método para acceder a los datos de un kombo a través de su ID
  static getKomboDataById(komboId: number): any[] | null {
    return this.komboData[komboId] || null;
  }
}

// Clase Kombox que maneja la lógica del puntero y el acceso dinámico
export class Kombox {
  kombo: boolean[]; // Array unidimensional para almacenar el estado de cada celda
  pointer: { i: number, j: number }; // Puntero con coordenadas dinámicas
  komboxId: string; // Identificador único para cada Kombox
  rows: number;
  cols: number;

  constructor(komboxId: string, rows: number, cols: number) {
    this.komboxId = komboxId;
    this.rows = rows;
    this.cols = cols;
    this.kombo = Array(rows * cols).fill(false); // Inicializa el array unidimensional de estado booleano
    this.pointer = { i: 0, j: 0 }; // Puntero inicializado en (0, 0)
  }

  // Método para establecer un valor booleano en el array `kombo`
  setKombo(i: number, j: number, value: boolean): void {
    const index = this.getIndex(i, j);
    if (index >= 0 && index < this.kombo.length) {
      this.kombo[index] = value;
    } else {
      throw new Error('Índice fuera de los límites.');
    }
  }

  // Mover el puntero en las 4 direcciones adyacentes
  movePointer(direction: 'up' | 'down' | 'left' | 'right'): void {
    const { i, j } = this.pointer;

    if (direction === 'up' && i > 0) {
      this.pointer.i -= 1;
    } else if (direction === 'down' && i < this.rows - 1) {
      this.pointer.i += 1;
    } else if (direction === 'left' && j > 0) {
      this.pointer.j -= 1;
    } else if (direction === 'right' && j < this.cols - 1) {
      this.pointer.j += 1;
    } else {
      console.log("Movimiento fuera de los límites.");
    }
  }

  // Obtener el ID del `kombo` basado en la posición actual del puntero
  getCurrentKomboId(): number {
    return this.getIndex(this.pointer.i, this.pointer.j);
  }

  // Obtener los datos del `kombo` desde KomboDataStore usando el ID dinámico
  getCurrentKomboData(): any[] | null {
    const komboId = this.getCurrentKomboId();
    return KomboDataStore.getKomboDataById(komboId);
  }

  // Calcular el índice basado en las coordenadas (i, j) en el array unidimensional
  private getIndex(i: number, j: number): number {
    return i * this.cols + j; // Índice único basado en posición
  }
}
