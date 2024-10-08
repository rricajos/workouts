<script lang="ts">
import { onMount } from 'svelte';
import '../app.css'

  async function detectPWAUpdate() {
    const registration = await navigator.serviceWorker.ready

    registration.addEventListener('updatefound', () => {
      const update = registration.installing
      update?.addEventListener('statechanged', () => {

        if (update.state === 'installed') {
          if (confirm('New update aviable! Reload to updater?')) {

            window.location.reload()

          }
        }
      })
    })
  }

  onMount(() => {
    detectPWAUpdate()
  })
</script>

<slot />

<svelte:head>
  <title>Hello PWA</title>

</svelte:head>