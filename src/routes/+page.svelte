<script lang="ts">
    import { onMount } from 'svelte';
    import { MapLibre, type Map } from 'svelte-maplibre';
    import '@mapbox-controls/ruler/src/index.css';

    let map: Map | null | undefined;
    let loaded: boolean;
    let MaplibreExportControl: any, Size: any, PageOrientation: any, Format: any, DPI: any;

    onMount(async () => {
        const module = await import('@watergis/maplibre-gl-export');
		MaplibreExportControl = module.MaplibreExportControl;
		Size = module.Size;
		PageOrientation = module.PageOrientation;
		Format = module.Format;
		DPI = module.DPI;
    });
    
    $: if (map && MaplibreExportControl && Size && PageOrientation && Format && DPI) {
        map.addControl(new MaplibreExportControl({
			PageSize: Size.A3,
			PageOrientation: PageOrientation.Landscape,
			Format: Format.PNG,
			DPI: DPI[96],
			Crosshair: true,
			PrintableArea: true
		}), 'top-right');
    }
    $: if (map && loaded) {
       // textLayers = map.getStyle().layers.filter((layer) => layer['source-layer'] === 'place');
    }


  </script>
  
<MapLibre 
    bind:map={map}
    bind:loaded
    center={[15,30]}
    zoom={2}
    class="map"
    attributionControl={false}
    style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
>

</MapLibre>

<style>
  :global(.map) {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    z-index: 1;
  }
</style>