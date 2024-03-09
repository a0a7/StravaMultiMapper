<script lang="ts">
    import { SvelteComponentTyped, onMount } from 'svelte';
    import {
        MapLibre,
        NavigationControl,
        ScaleControl,
        GeolocateControl,
        FullscreenControl,
        AttributionControl,
        Control,
        ControlButton,
        ControlGroup
    } from 'svelte-maplibre';
    import { MeasurePanel, type MeasureOption } from '@watergis/svelte-maplibre-measure';
    import '@watergis/maplibre-gl-export/dist/maplibre-gl-export.css';
    import '$lib/styles/map.css';
    import '$lib/styles/measure-control.css';
    import '$lib/styles/layers-control.css';
    import type IControl from 'maplibre-gl';

    let map: any; 
    let loaded: boolean;
    let StyleSwitcher: any, StyleSwitcherControl: any, StyleUrl: any;
    let MaplibreExportControl: any, Size: any, PageOrientation: any, Format: any, DPI: any;
    let measureControl: SvelteComponentTyped, exportControl: IControl;
    let layerControlOpen: boolean = false;

    // Configure Map Baselayers
    let styles = [
        {
            title: 'Positron',
            uri: `./map_styles/light.json`
        },
        {
            title: 'Dark Matter',
            uri: `./map_styles/dark.json`
        },
        {
            title: 'Satellite',
            uri: `./map_styles/satellite.json`
        },

        {
            title: 'Landscape',
            uri: `./map_styles/landscape.json`
        },
        {
            title: 'Topographic',
            uri: `./map_styles/topo.json`
        },   
        {
            title: 'Winter',
            uri: `./map_styles/winter.json`
        }
    ];
    let selectedStyle = styles[0];

    // Configure Measuring Plugin
    let measureOptions: MeasureOption = {
        tileSize: 512,
        font: ['Roboto Medium'],
        fontSize: 12,
        fontHalo: 1,
        mainColor: '#263238',
        haloColor: '#fff'
    };

    // Import browser-only modules, set browser-dependent variables
    onMount(async () => {
        const styleSwitcherModule = await import('@watergis/svelte-maplibre-style-switcher');
        const exportModule = await import('@watergis/maplibre-gl-export');

        StyleSwitcher = styleSwitcherModule.StyleSwitcher;
        StyleSwitcherControl = styleSwitcherModule.StyleSwitcherControl;
        StyleUrl = styleSwitcherModule.StyleUrl;
        MaplibreExportControl = exportModule.MaplibreExportControl;
        Size = exportModule.Size;
        PageOrientation = exportModule.PageOrientation;
        Format = exportModule.Format;
        DPI = exportModule.DPI;
    });

    // Add image export control when ready
    $: if (
        map && loaded && !map.hasControl(exportControl) &&
        MaplibreExportControl && Size && PageOrientation && Format && DPI 
    ) {
        exportControl = new MaplibreExportControl({
            PageSize: Size.A3,
            PageOrientation: PageOrientation.Landscape,
            Format: Format.PNG,
            DPI: DPI[96],
            Crosshair: true,
            PrintableArea: true
        });
        map.addControl(exportControl, 'top-right');
    }

    $: if (map && loaded) {
        // textLayers = map.getStyle().layers.filter((layer) => layer['source-layer'] === 'place');
    }
</script>

<MapLibre
    bind:map
    bind:loaded
    center={[15, 30]}
    zoom={1}
    class="map"
    attributionControl={false}
    style={selectedStyle.uri}
>
    <NavigationControl position="top-left" />
    <GeolocateControl position="top-right" fitBoundsOptions={{ maxZoom: 12 }} />
    <FullscreenControl position="top-left" />
    <ScaleControl />
    <AttributionControl
        compact
        customAttribution={`App created by <a href="https://github.com/sudolev" target="_blank">Alexander Weimer</a> |
            <img src="img/icon/powered_by_strava.svg" class="h-4 inline p-0" title="Powered by Strava" alt="Powered by Strava">`}
    />
    <Control position="top-right" class="flex flex-col gap-y-2">
        <ControlGroup>
            {#if map}
                <MeasurePanel bind:map bind:measureOption={measureOptions} bind:this={measureControl} />
            {/if}
        </ControlGroup>
    </Control>
    <Control position="top-left" class="flex flex-col gap-y-2">
        <ControlGroup>
            <ControlButton
                on:click={() => {
                    layerControlOpen = !layerControlOpen;
                    document
                        .querySelectorAll('.maplibregl-ctrl-top-left .maplibregl-ctrl:empty')
                        .forEach((el) => el.remove());
                }}
            >
                <img
                    src="img/icon/layer.svg"
                    class="p-[3px]"
                    alt="Switch Map Baselayers"
                    title="Map Layers"
                    style="{layerControlOpen ? 'filter: invert(22%) sepia(17%) saturate(1191%) hue-rotate(164deg) brightness(93%) contrast(87%);' : ''}"
                />
            </ControlButton>
            {#if map && layerControlOpen && StyleSwitcher && StyleSwitcherControl && StyleUrl}
                <StyleSwitcherControl bind:map bind:styles bind:selectedStyle position="top-left" />
            {/if}
        </ControlGroup>
    </Control>
</MapLibre>