<script lang="ts">
	import { onMount } from 'svelte';
	import { Map, NavigationControl } from 'maplibre-gl';
	import { MenuControl } from '@watergis/svelte-maplibre-menu';
	import { MeasurePanel } from '@watergis/svelte-maplibre-measure';
	import type { MeasureOption } from '@watergis/svelte-maplibre-measure';
	import '@watergis/maplibre-gl-export/dist/maplibre-gl-export.css';

	let mapContainer: HTMLDivElement;
	let map: Map;
	let MaplibreExportControl, Size, PageOrientation, Format, DPI;

	onMount(async () => {
		const module = await import('@watergis/maplibre-gl-export');
		MaplibreExportControl = module.MaplibreExportControl;
		Size = module.Size;
		PageOrientation = module.PageOrientation;
		Format = module.Format;
		DPI = module.DPI;

		map = new Map({
			container: mapContainer,
			style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
		});
		map.addControl(new NavigationControl({}));

		map.scrollZoom.disable();
		map.touchPitch.enable();
	});
	let terrainRgbUrl = 'https://narwassco.github.io/narok-terrain/tiles/{z}/{x}/{y}.png';
	let measureOption: MeasureOption = {
		tileSize: 512,
		font: ['Roboto Medium'],
		fontSize: 12,
		fontHalo: 1,
		mainColor: '#263238',
		haloColor: '#fff'
	};
</script>

<MeasurePanel bind:map bind:measureOption bind:terrainRgbUrl />
<div bind:this={mapContainer} class="map" />

<style>
	@import 'maplibre-gl/dist/maplibre-gl.css';
	.map {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}
</style>
