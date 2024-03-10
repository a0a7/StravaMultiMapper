<script lang="ts">
	import { onMount } from "svelte";
	import * as Resizable from "$lib/components/ui/resizable";
	import type { PaneAPI } from "paneforge";
	import '$lib/components/sidebar/resizable-handle.css';
	import Map from '$lib/components/map/Map.svelte';

	let mapElement: any = null;

	let onMobile: boolean;
	let settingsPane: PaneAPI, settingsPaneCollapsed: boolean = false;

	onMount(() => {
		onMobile = window.innerWidth <= 768;
		window.addEventListener('resize', () => {
			onMobile = window.innerWidth <= 768;
		});
	});
</script>
<svelte:head>
	<title>Strava Multi Mapper</title>
	<meta
		property="og:description"
		content="The best way to visualize your Strava runs, rides, or other activities on a beautiful & modern map."
	/>
</svelte:head>

<Resizable.PaneGroup direction={onMobile ? "vertical" : "horizontal"} class="w-screen h-screen flex {onMobile ? "flex-col" : "flex-row"}">
	<Resizable.Pane bind:pane={settingsPane}
		class="settings-pane {onMobile ? "w-screen order-3" : "h-screen order-1"}"
		order="{onMobile ? 3 : 1}"
		defaultSize={40}
		minSize={5}
		collapsedSize={5}
		collapsible={true}
		onCollapse={() => (settingsPaneCollapsed = true)}
		onExpand={() => (settingsPaneCollapsed = false)}
	>
	</Resizable.Pane>
	<Resizable.Handle 
		withHandle={!onMobile}
		class="order-2 resizable-handle {onMobile ? "w-screen" : "h-screen"}"
	/>
	<Resizable.Pane 
			class="map-pane {onMobile ? "w-screen order-1" : "h-screen order-3"}"
			order="{onMobile ? 1 : 3}"
			defaultSize={60}
	>
		<Map bind:map={mapElement} bind:onMobile />
	</Resizable.Pane>
</Resizable.PaneGroup>
