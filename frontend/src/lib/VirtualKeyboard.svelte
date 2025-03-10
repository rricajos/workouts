<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function handleButtonPress(key: string) {
      dispatch('keydown', { key });
  }
</script>

<div class="virtual-keyboard">
  <div class="row">
      <button on:click={() => handleButtonPress('ArrowLeft')}>←</button>
      <button on:click={() => handleButtonPress('ArrowRight')}>→</button>
  </div>
  <div class="row">
      <button on:click={() => handleButtonPress('ArrowUp')}>↑</button>
  </div>
</div>

<style>
  .virtual-keyboard {
      display: flex;
      flex-direction: column;
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
  }
  
  .row {
      display: flex;
      justify-content: center;
      margin: 5px 0;
  }

  button {
      background-color: #4CAF50; /* Color verde */
      border: none;
      color: white;
      padding: 15px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 24px;
      margin: 4px 2px;
      cursor: pointer;
      border-radius: 5px;
      transition: background-color 0.3s;
  }

  button:hover {
      background-color: #45a049; /* Color verde oscuro al pasar el ratón */
  }
</style>
