<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
	import { onMount } from 'svelte';
	import * as Resizable from '$lib/components/ui/resizable';
	import type { PaneAPI } from 'paneforge';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import '$lib/components/sidebar/resizable-handle.css';
	import Map from '$lib/components/map/Map.svelte';
	import ConnectPanel from '$lib/components/sidebar/ConnectPanel.svelte';
	import Footer from '$lib/components/sidebar/Footer.svelte';

	let map: any = null,
		mapLoaded: boolean = false,
		mapComponent: Map | null = null;

	let onMobile: boolean, mapSizePercent: number;
	$: deviceTypeKnown = typeof onMobile !== 'undefined';
	let settingsPane: PaneAPI,
		settingsPaneCollapsed: boolean = false;

	onMount(() => {
		// Mobile device detection
		onMobile = window.innerWidth <= 768;
		window.addEventListener('resize', () => {
			onMobile = window.innerWidth <= 768;
		});
		// Map width percentage calculation
		mapSizePercent	= onMobile ? 75 : Math.round(window.innerWidth * -0.013 + 50);
	});
</script>

<svelte:head>
	<title>Strava Multi Mapper</title>
	<meta
		property="og:description"
		content="The best way to visualize your Strava runs, rides, or other activities on a beautiful & modern map."
	/>
</svelte:head>
{#if !mapLoaded}
	<Loading />
{/if}
<Resizable.PaneGroup direction={onMobile ? 'vertical' : 'horizontal'} class="w-screen h-screen">
	{#if deviceTypeKnown && onMobile}
		<Resizable.Pane class="map-pane w-screen" defaultSize={100 - mapSizePercent} order={1}>
			<Map bind:map bind:loaded={mapLoaded} bind:this={mapComponent} bind:onMobile />
		</Resizable.Pane>
		<div
			role="button"
			tabindex="0"
			on:dblclick={() => {
				if (settingsPaneCollapsed) settingsPane.expand();
				else settingsPane.collapse();
			}}
			on:dragstart={() => {
				if (settingsPaneCollapsed) settingsPane.expand();
			}}
		>
			<Resizable.Handle class="resizable-touchbar w-screen" />
		</div>
	{/if}
	<Resizable.Pane
		bind:pane={settingsPane}
		class="settings-pane"
		order={2}
		defaultSize={mapSizePercent}
		minSize={8}
		collapsedSize={8}
		collapsible={true}
		onCollapse={() => (settingsPaneCollapsed = true)}
		onExpand={() => (settingsPaneCollapsed = false)}
	>
		<div class="w-full h-full px-5 pt-1 md:py-5 background">
			<ScrollArea class="w-full overflow-y-scroll h-full">
				<div class="flex flex-col md:min-h-screen">
					<ConnectPanel />
					<Footer bind:onMobile />
				</div>
			</ScrollArea>
		</div>
	</Resizable.Pane>
	{#if deviceTypeKnown && !onMobile}
		<Resizable.Handle withHandle class="resizable-touchbar h-screen w-1 bg-accent dark:bg-border" />
		<Resizable.Pane class="map-pane h-screen" defaultSize={100 - mapSizePercent} order={3}>
			<Map bind:map bind:loaded={mapLoaded} bind:this={mapComponent} bind:onMobile />
		</Resizable.Pane>
	{/if}
</Resizable.PaneGroup>
