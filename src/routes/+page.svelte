<script lang="ts">
    import { SvelteComponentTyped, onMount } from 'svelte';
    import { MapLibre,
        NavigationControl,
        ScaleControl, 
        GeolocateControl, 
        FullscreenControl, 
        AttributionControl, 
        Control, 
        ControlButton, 
        ControlGroup,
        type Map, 
		type ControlPosition

    } from 'svelte-maplibre';

    import '@watergis/maplibre-gl-export/dist/maplibre-gl-export.css';


    let map: Map | null | undefined;
    let loaded: boolean;
    let MaplibreExportControl: any, Size: any, PageOrientation: any, Format: any, DPI: any;
    let finalDefaultControl: SvelteComponentTyped;

    let deviceSizeDependentControlPosition: ControlPosition = "top-left";

    onMount(async () => {
        const module = await import('@watergis/maplibre-gl-export');

		MaplibreExportControl = module.MaplibreExportControl;
		Size = module.Size;
		PageOrientation = module.PageOrientation;
		Format = module.Format;
		DPI = module.DPI;

        deviceSizeDependentControlPosition = window.innerWidth <= 768 ? 'top-left' : 'top-right';
    });
    
    $: if (map && MaplibreExportControl && Size && PageOrientation && Format && DPI && finalDefaultControl) {
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
    <NavigationControl position="{deviceSizeDependentControlPosition}" />
    <GeolocateControl position="{deviceSizeDependentControlPosition}" fitBoundsOptions={{ maxZoom: 12 }} />
    <FullscreenControl position="{deviceSizeDependentControlPosition}" bind:this={finalDefaultControl} />
    <ScaleControl />
    <AttributionControl 
        compact
        customAttribution={
            `App created by <a href="https://github.com/sudolev" target="_blank">Alexander Weimer</a> |
            <img src="img/icon/powered_by_strava.svg" class="h-4 inline p-0" title="Powered by Strava" alt="Powered by Strava">`}
    />

</MapLibre>

<style>
    :global(.map) {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    /* :global(.maplibregl-export-control) {
        background-color: #333;
        background:url('data:image/svg+xml;charset=UTF-8,<svg id="Capa_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path fill="currentColor" d="m422.5 99v-24c0-41.355-33.645-75-75-75h-184c-41.355 0-75 33.645-75 75v24z"/><path fill="currentColor" d="m118.5 319v122 26 15c0 16.568 13.431 30 30 30h214c16.569 0 30-13.432 30-30v-15-26-122zm177 128h-80c-8.284 0-15-6.716-15-15s6.716-15 15-15h80c8.284 0 15 6.716 15 15s-6.716 15-15 15zm0-64h-80c-8.284 0-15-6.716-15-15s6.716-15 15-15h80c8.284 0 15 6.716 15 15s-6.716 15-15 15z"/><path fill="currentColor" d="m436.5 129h-361c-41.355 0-75 33.645-75 75v120c0 41.355 33.645 75 75 75h13v-80h-9c-8.284 0-15-6.716-15-15s6.716-15 15-15h24 304 24c8.284 0 15 6.716 15 15s-6.716 15-15 15h-9v80h14c41.355 0 75-33.645 75-75v-120c0-41.355-33.645-75-75-75zm-309 94h-48c-8.284 0-15-6.716-15-15s6.716-15 15-15h48c8.284 0 15 6.716 15 15s-6.716 15-15 15z"/></g></svg>');            
    }*/
</style>