<script lang="ts">
	import { onMount } from "svelte";
	import * as Resizable from "$lib/components/ui/resizable";
	import type { PaneAPI } from "paneforge";
	import '$lib/components/sidebar/resizable-handle.css';
	import Map from '$lib/components/map/Map.svelte';

	let mapElement: any = null;

	let onMobile: boolean;
	$: deviceTypeKnown = typeof onMobile !== 'undefined';
	let settingsPane: PaneAPI, settingsPaneCollapsed: boolean = false;

	onMount(() => {
		onMobile = window.innerWidth <= 768;
		window.addEventListener('resize', () => {onMobile = window.innerWidth <= 768});
	});
</script>
<svelte:head>
	<title>Strava Multi Mapper</title>
	<meta
		property="og:description"
		content="The best way to visualize your Strava runs, rides, or other activities on a beautiful & modern map."
	/>
</svelte:head>

<Resizable.PaneGroup direction={onMobile ? "vertical" : "horizontal"} class="w-screen h-screen">
	{#if deviceTypeKnown && onMobile}
		<Resizable.Pane class="map-pane w-screen" defaultSize={60} order={1} >
			<Map bind:map={mapElement} bind:onMobile />
		</Resizable.Pane>
		<div role="button" tabindex="0"
			on:dblclick={() => {
				if (settingsPaneCollapsed) settingsPane.expand();
				else settingsPane.collapse();
			}}
			on:dragstart={() => {
				if (settingsPaneCollapsed) settingsPane.expand();
			}}
		>
			<Resizable.Handle class="resizable-touchbar w-screen"/>
		</div>
	{/if}
	<Resizable.Pane bind:pane={settingsPane}
		class="settings-pane"
		order={2}
		defaultSize={40}
		minSize={8}
		collapsedSize={8}
		collapsible={true}
		onCollapse={() => (settingsPaneCollapsed = true)}
		onExpand={() => (settingsPaneCollapsed = false)}
	>
		<div class="w-full h-full bg-black"></div>
	</Resizable.Pane>
	{#if deviceTypeKnown && !onMobile}
		<Resizable.Handle withHandle class="h-screen" />
		<Resizable.Pane class="map-pane h-screen" defaultSize={60} order={3}>
			<Map bind:map={mapElement} bind:onMobile />
		</Resizable.Pane>
	{/if}
</Resizable.PaneGroup>