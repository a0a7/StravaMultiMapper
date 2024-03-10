<script lang="ts">
	import { onMount } from "svelte";
	import * as Resizable from "$lib/components/ui/resizable";
	import type { PaneAPI } from "paneforge";
	import Map from '$lib/components/map/Map.svelte';

	let onMobile: boolean;
	let settingsPane: PaneAPI, settingsPaneCollapsed: boolean = false;
	let mapWidth: number = 0, mapHeight: number = 0;

	onMount(() => {
		onMobile = window.innerWidth <= 768; // Change this value based on your definition of a "phone" screen size
		window.addEventListener('resize', () => {
			onMobile = window.innerWidth <= 768;
		});
	});

	function paneResized(newSize: number) {
		console.log(`Pane Resized to ${newSize}%`)
		settingsPaneCollapsed = newSize < 15;
		onMobile ? mapHeight : mapWidth = 100 - newSize;
		onMobile ? mapWidth : mapHeight = 100;	
	}
</script>
<svelte:head>
	<title>Strava Multi Mapper</title>
	<meta
		property="og:description"
		content="The best way to visualize your Strava runs, rides, or other activities on a beautiful & modern map."
	/>
</svelte:head>

<Resizable.PaneGroup direction={onMobile ? "vertical" : "horizontal"} class="h-[100vh]">
  	<Resizable.Pane bind:pane={settingsPane}
		defaultSize={40}
		minSize={15}
		collapsedSize={5}
		collapsible={true}
		onCollapse={() => (settingsPaneCollapsed = true)}
		onExpand={() => (settingsPaneCollapsed = false)}
		onResize={(size) => (paneResized(size))}
	></Resizable.Pane>
  	<Resizable.Handle withHandle class="h-full "/>
  	<Resizable.Pane 
		defaultSize={60}
	>
		<Map/>
</Resizable.Pane>
</Resizable.PaneGroup>
