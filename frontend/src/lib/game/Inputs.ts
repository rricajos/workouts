export class Inputs {
	private keysPressed: { [key: string]: boolean } = {};
	private actions: { [action: string]: { press: () => void; release: () => void } } = {};
	private readonly pressedKeysOrder: string[] = []; // Lista para el orden de teclas presionadas
	private lastKeyReleased: string | null = null; // Para seguir la última tecla soltada

	public readonly keyBindings: { [key: string]: string } = {
		z: 'down-left',
		'1': 'down-left',

		x: 'down',
		'2': 'down',

		c: 'down-right',
		'3': 'down-right',

		a: 'left',
		'4': 'left',

		s: 'kombo',
		'5': 'kombo',

		d: 'right',
		'6': 'right',

		q: 'up-left',
		'7': 'up-left',

		w: 'up',
		'8': 'up',

		e: 'up-right',
		'9': 'up-right'
	};

	getKeyBindings() {
		return this.keyBindings;
	}

	constructor() {
		window.addEventListener('keydown', (e) => this.handleKeyDown(e));
		window.addEventListener('keyup', (e) => this.handleKeyUp(e));
	}

	registerAction(action: string, pressCallback: () => void, releaseCallback: () => void) {
		this.actions[action] = {
			press: pressCallback,
			release: releaseCallback
		};
	}

	private handleKeyDown(event: KeyboardEvent) {
		const action = this.keyBindings[event.key.toLowerCase()];
		if (action && !this.keysPressed[event.key]) {
			this.keysPressed[event.key] = true;
			this.pressedKeysOrder.push(event.key); // Añadir la tecla a la lista de orden
			if (this.actions[action]) {
				this.actions[action].press();
			}
		}
	}

	private handleKeyUp(event: KeyboardEvent) {
		const action = this.keyBindings[event.key.toLowerCase()];
		if (action) {
			// Marcar la tecla como no presionada
			this.keysPressed[event.key] = false;

			// Eliminar la tecla de la lista de orden
			const keyIndex = this.pressedKeysOrder.indexOf(event.key);
			if (keyIndex !== -1) {
				this.pressedKeysOrder.splice(keyIndex, 1);
			}

			// Establecer la última tecla soltada
			this.lastKeyReleased = event.key;

			// Solo ejecutar el release si esta es la última tecla presionada
			if (this.pressedKeysOrder.length === 0) {
				if (this.actions[action]) {
					this.actions[action].release();
				}
			} else {
				// Verificar si la tecla soltada es la última en la lista de presionadas
				const lastPressedKey = this.pressedKeysOrder[this.pressedKeysOrder.length - 1];
				if (event.key === lastPressedKey) {
					if (this.actions[action]) {
						this.actions[action].release();
					}
				}
			}
		}
	}
}
