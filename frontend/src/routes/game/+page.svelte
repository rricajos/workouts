<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Game } from '$lib/game/Game';

	let canvas: HTMLCanvasElement;
	let game: Game;

	function resizeCanvas() {
		if (canvas) {
			canvas.width = canvas.clientWidth;
			canvas.height = canvas.clientHeight;
		}
	}

	onMount(() => {
		if (!import.meta.env.SSR) {
			// Ajustar tamaño de canvas
			resizeCanvas();
			window.addEventListener('resize', resizeCanvas);

			game = new Game(canvas); // Ahora Game se encarga de las entradas
			game.start();
		}
	});

	onDestroy(() => {
		if (!import.meta.env.SSR) {
			window.removeEventListener('resize', resizeCanvas);
			game.stop();
		}
	});

</script>

<div class="canvas-container">
	<canvas bind:this={canvas}></canvas>
</div>

<div>
	<div class="buttons-container">
			<button 
					on:mousedown={() => game.player.move('up-left')} 
					on:mouseup={() => game.player.beat('up-left')}
					on:touchstart={() => game.player.move('up-left')} 
					on:touchend={() => game.player.beat('up-left')}>
					↖ (Q/7)
			</button>
			<button 
					on:mousedown={() => game.player.move('up')} 
					on:mouseup={() => game.player.beat('up')}
					on:touchstart={() => game.player.move('up')} 
					on:touchend={() => game.player.beat('up')}>
					↑ (W/8)
			</button>
			<button 
					on:mousedown={() => game.player.move('up-right')} 
					on:mouseup={() => game.player.beat('up-right')}
					on:touchstart={() => game.player.move('up-right')} 
					on:touchend={() => game.player.beat('up-right')}>
					↗ (E/9)
			</button>

			<button 
					on:mousedown={() => game.player.move('left')} 
					on:mouseup={() => game.player.beat('left')}
					on:touchstart={() => game.player.move('left')} 
					on:touchend={() => game.player.beat('left')}>
					← (A/4)
			</button>
			<button 
					on:click={() => game.activateSlowMotion()}
					on:touchstart={() => game.activateSlowMotion()}>
					Wombo Kombo
			</button>

			<button 
					on:mousedown={() => game.player.move('right')} 
					on:mouseup={() => game.player.beat('right')}
					on:touchstart={() => game.player.move('right')} 
					on:touchend={() => game.player.beat('right')}>
					→ (D/6)
			</button>

			<button 
					on:mousedown={() => game.player.move('down-left')} 
					on:mouseup={() => game.player.beat('down-left')}
					on:touchstart={() => game.player.move('down-left')} 
					on:touchend={() => game.player.beat('down-left')}>
					↙ (Z/1)
			</button>
			<button 
					on:mousedown={() => game.player.move('down')} 
					on:mouseup={() => game.player.beat('down')}
					on:touchstart={() => game.player.move('down')} 
					on:touchend={() => game.player.beat('down')}>
					↓ (X/2)
			</button>
			<button 
					on:mousedown={() => game.player.move('down-right')} 
					on:mouseup={() => game.player.beat('down-right')}
					on:touchstart={() => game.player.move('down-right')} 
					on:touchend={() => game.player.beat('down-right')}>
					↘ (C/3)
			</button>
	</div>
</div>


<style>
	.canvas-container {
		width: 100%;
		height: 63vh; /* Ajusta la altura según sea necesario */
		position: relative; /* Permite que los elementos hijos se posicionen relativos a este contenedor */
	}

	canvas {
		display: block; /* Elimina el espacio extra debajo del canvas */
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
		height: 100%;
		background-color: #222; /* Color de fondo opcional */
	}

	.buttons-container {
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(3, 1fr); /* 3 columnas de igual tamaño */
		grid-template-rows: repeat(3, 1fr); /* 3 filas de igual tamaño */
		gap: 10px; /* Espacio entre los botones */
		width: 100%;
		max-width: 800px;
		height: 35vh; /* El contenedor ocupa el 100% del alto disponible */
	}

	.buttons-container button {
		background-color: #eee;
		border: none;
		border-radius: 1em;
		font-size: 1.5rem; /* Ajusta el tamaño de la fuente */
		padding: 10px; /* Espaciado interno del botón */
		width: 100%; /* Cada botón ocupa el 100% de su celda en la cuadrícula */
		height: 100%; /* Cada botón ocupa el 100% de su celda en la cuadrícula */
		box-sizing: border-box; /* Incluir el padding y border en las dimensiones */
	}
</style>
