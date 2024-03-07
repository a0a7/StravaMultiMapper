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
    import { MeasurePanel, type MeasureOption } from '@watergis/svelte-maplibre-measure';
    import '@watergis/maplibre-gl-export/dist/maplibre-gl-export.css';
    import '$lib/styles/measure-control.css';

    let map: any;
    let loaded: boolean;
    let MaplibreExportControl: any, Size: any, PageOrientation: any, Format: any, DPI: any;
    let measureControl: SvelteComponentTyped;

    // Configure Measure Plugin
    let measureOptions: MeasureOption = {
        tileSize: 512,
        font: ['Roboto Medium'],
        fontSize: 12,
        fontHalo: 1,
        mainColor: '#263238',
        haloColor: '#fff',
    };

    // Import browser-only modules, set browser-dependent variables
    onMount(async () => {
        const exportModule = await import('@watergis/maplibre-gl-export');
		MaplibreExportControl = exportModule.MaplibreExportControl;
		Size = exportModule.Size;
		PageOrientation = exportModule.PageOrientation;
		Format = exportModule.Format;
		DPI = exportModule.DPI;
    });

    // $: if (map && finalDefaultControl && MeasuresControl) {
    //     map.addControl(new MeasuresControl(), 'top-left');
    // }
    
    $: if (map && measureControl && MaplibreExportControl && Size && PageOrientation && Format && DPI) {
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

<svelte:head>
    <title>Strava Multi Mapper</title>
    <meta property="og:description" content="The best way to visualize your Strava runs, rides, or other activities on a beautiful & modern map." />
</svelte:head>
  
<MapLibre 
    bind:map={map}
    bind:loaded
    center={[15,30]}
    zoom={2}
    class="map"
    attributionControl={false}
    style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
>
    <NavigationControl position="top-left" />
    <GeolocateControl position="top-right" fitBoundsOptions={{ maxZoom: 12 }} />
    <FullscreenControl position="top-left" />
    <ScaleControl />
    <AttributionControl compact customAttribution={
            `App created by <a href="https://github.com/sudolev" target="_blank">Alexander Weimer</a> |
            <img src="img/icon/powered_by_strava.svg" class="h-4 inline p-0" title="Powered by Strava" alt="Powered by Strava">`
    }/>
    <Control position="top-right" class="flex flex-col gap-y-2">
        <ControlGroup>
            {#if map}
                <MeasurePanel bind:map bind:measureOption={measureOptions} bind:this={measureControl} />
            {/if}
        </ControlGroup>
    </Control>
    <Control position="top-left" class="flex flex-col gap-y-2">
        <ControlGroup>
            <ControlButton>
                <img src="img/icon/layer.svg" class="p-[3px]" alt="Switch Map Baselayers" title="Map Layers">
            </ControlButton>
        </ControlGroup>
    </Control>
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
</style>
