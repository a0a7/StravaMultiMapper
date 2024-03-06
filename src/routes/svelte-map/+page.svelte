<script lang="ts">
    import { onMount } from 'svelte';
    import { MapLibre, mapContext, type Map } from 'svelte-maplibre';
    import '@mapbox-controls/ruler/src/index.css';

    let RulerControl: any;
    let map: any = mapContext();
    onMount(async () => {
        const module = await import('@mapbox-controls/ruler');
        RulerControl = module.default;
        console.log(RulerControl)
    });
    $: if (RulerControl && map) {
        map.addControl( RulerControl(), 'top-left');
    }
  </script>
  
<MapLibre 
center={[50,20]}
zoom={7}
class="map"
standardControls
style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json">

</MapLibre>

<style>
    .mapbox-ctrl-ruler button {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333;
        z-index: 10;
    }

    .mapbox-ctrl-ruler button.-active {
        color: #4264fb;
    }

    :global(.map) {
        height: 100vh;
    }
</style>