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
    let deviceDependentPos: ControlPosition = "top-left";

    // Import browser-only modules, set browser-dependent variables
    onMount(async () => {
        const module = await import('@watergis/maplibre-gl-export');

		MaplibreExportControl = module.MaplibreExportControl;
		Size = module.Size;
		PageOrientation = module.PageOrientation;
		Format = module.Format;
		DPI = module.DPI;

        deviceDependentPos = window.innerWidth <= 768 ? 'top-left' : 'top-right';
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
    <NavigationControl position="{deviceDependentPos}" />
    <GeolocateControl position="{deviceDependentPos}" fitBoundsOptions={{ maxZoom: 12 }} />
    <FullscreenControl position="{deviceDependentPos}" bind:this={finalDefaultControl} />
    <ScaleControl />
    <AttributionControl compact customAttribution={
            `App created by <a href="https://github.com/sudolev" target="_blank">Alexander Weimer</a> |
            <img src="img/icon/powered_by_strava.svg" class="h-4 inline p-0" title="Powered by Strava" alt="Powered by Strava">`
    }/>
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

    :global(.maplibregl-export-control) {
        background: url('img/icon/print.svg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: 70%;
    }
</style>