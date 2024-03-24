<script lang="ts">
	import { SvelteComponentTyped, onMount, onDestroy } from 'svelte';
	import { mode } from 'mode-watcher';
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
	import '$lib/components/map/map.css';
	import '$lib/components/map/measure-control.css';
	import '$lib/components/map/layers-control.css';
	import maplibregl from 'maplibre-gl';
	import type IControl from 'maplibre-gl';

	export let onMobile: boolean;
	export let map: any;
	export let loaded: boolean;
	let mapDiv: Element;
	let mapResizeObserver: ResizeObserver;
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

	// Properly control map size
	function rigorouslyResizeMap() {
		if (map && onMobile != undefined) {
			const mapCanvas = document.getElementsByClassName('maplibregl-map')[0] as HTMLCanvasElement;
			const mapDiv = document.getElementsByClassName('map-pane')[0] as HTMLDivElement;
			const mapBottomControls = [
				document.getElementsByClassName('maplibregl-ctrl-bottom-left')[0] as HTMLDivElement,
				document.getElementsByClassName('maplibregl-ctrl-bottom-right')[0] as HTMLDivElement
			];
			map.resize(); // Pre-resize helps counteract map flickering
			if (onMobile) {
				mapDiv.style.width = '100vw';
				mapDiv.style.height = `${mapDiv.clientHeight + 5}px`;
				mapBottomControls.forEach((el) => (el.style.paddingBottom = '15px'));
			} else if (!onMobile) {
				mapDiv.style.width = `${mapDiv.clientWidth}px`;
				mapDiv.style.height = '100vh';
				mapBottomControls.forEach((el) => (el.style.paddingBottom = '0px'));
			}
			setTimeout(() => map.resize(), 0); // Timer helps counteract map flickering
		}
	}

	// Change map color when theme changes if using positron/dark matte
	$: {
		if ($mode) {
			// Done so that the reactive statement is only reactive with regard to mode
			if ($mode == 'dark' && selectedStyle == styles[0]) {
				selectedStyle = styles[1];
			} else if ($mode == 'light' && selectedStyle == styles[1]) {
				selectedStyle = styles[0];
			}
		}
	}

	// Add image export control when ready
	$: if (
		map &&
		loaded &&
		!map.hasControl(exportControl) &&
		MaplibreExportControl &&
		Size &&
		PageOrientation &&
		Format &&
		DPI
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

	onMount(async () => {
		// Import browser-only modules
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

		if ($mode) {
			if ($mode == 'dark') {
				selectedStyle = styles[1];
			}
		}

		// Handle map resizing
		mapDiv = document.getElementsByClassName('map-pane')[0];

		mapResizeObserver = new ResizeObserver(() => {
			setTimeout(() => rigorouslyResizeMap(), 0); // This timeout hard carries this app bro it prevents so much map flicker
		});

		mapResizeObserver.observe(mapDiv);
		mapResizeObserver.observe(document.body);

		map.on('load', () => {
			rigorouslyResizeMap();
		});
	});

	onDestroy(() => {
		if (mapResizeObserver && mapDiv) {
			mapResizeObserver.unobserve(mapDiv);
		}
	});
</script>

<svelte:head>
	{#each styles as style}
		<link rel="prefetch" href={style.uri} />
	{/each}
</svelte:head>

<MapLibre
	bind:map
	bind:loaded
	center={[15, 30]}
	zoom={1}
	class="map w-full h-full"
	attributionControl={false}
	style={selectedStyle.uri}
>
	<NavigationControl position="top-left" />
	<GeolocateControl position="top-right" fitBoundsOptions={{ maxZoom: 12 }} />
	<FullscreenControl position="top-left" />
	<ScaleControl />
	<AttributionControl
		compact
		customAttribution={`<img src="img/icon/powered_by_strava.svg" class="h-4 inline p-0" title="Powered by Strava" alt="Powered by Strava">`}
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
					style={layerControlOpen
						? 'filter: invert(22%) sepia(17%) saturate(1191%) hue-rotate(164deg) brightness(93%) contrast(87%);'
						: ''}
				/>
			</ControlButton>
			{#if map && layerControlOpen && StyleSwitcher && StyleSwitcherControl && StyleUrl}
				<StyleSwitcherControl bind:map bind:styles bind:selectedStyle position="top-left" />
			{/if}
		</ControlGroup>
	</Control>
</MapLibre>
