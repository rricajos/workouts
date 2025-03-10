export class InputHandler {
	private keysPressed: { [key: string]: boolean } = {};
	private actions: { [action: string]: { press: () => void; release: () => void } } = {};
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
        return this.keyBindings; // Agregamos este método para acceder a keyBindings
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
		const action = this.keyBindings[event.key.toLowerCase()]; // Obtener la acción a partir del keyBinding
		if (action && !this.keysPressed[event.key]) {
			this.keysPressed[event.key] = true;
			if (this.actions[action]) {
				this.actions[action].press();
			}
		}
	}

	private handleKeyUp(event: KeyboardEvent) {
		const action = this.keyBindings[event.key.toLowerCase()]; // Obtener la acción a partir del keyBinding
		if (action) {
			this.keysPressed[event.key] = false;
			if (this.actions[action]) {
				this.actions[action].release();
			}
		}
	}
}
