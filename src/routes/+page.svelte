<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
	import * as Resizable from '$lib/components/ui/resizable';
	import type { PaneAPI } from 'paneforge';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import '$lib/components/sidebar/resizable-handle.css';
	import Map from '$lib/components/map/Map.svelte';
	import ConnectPanel from '$lib/components/sidebar/ConnectPanel.svelte';
	import SetupPanel from '$lib/components/sidebar/SetupPanel.svelte';
	import Footer from '$lib/components/sidebar/Footer.svelte';
	import { onMount } from 'svelte';

	import { page } from '$app/stores';
	console.log($page.data.session);

	let onMobile: boolean,
		settingsSizePercent: number,
		panelsResized: boolean = false;
	let map: any = null,
		mapLoaded: boolean = false,
		mapComponent: Map | null = null;
	let settingsPane: PaneAPI, mobileMap: PaneAPI, desktopMap: PaneAPI;

	$: deviceTypeKnown = typeof onMobile !== 'undefined';

	onMount(() => {
		// Mobile device detection
		onMobile = window.innerWidth <= 768;
		window.addEventListener('resize', () => {
			onMobile = window.innerWidth <= 768;
			if (panelsResized) return;
			else if (onMobile) return;
			else {
				settingsSizePercent = Math.round(window.innerWidth * -0.013 + 50);
				settingsPane.resize(settingsSizePercent);
			}
		});
		// Map width percentage calculation
		settingsSizePercent = onMobile ? 75 : Math.round(window.innerWidth * -0.013 + 50);
		settingsPane.resize(settingsSizePercent);
	});
</script>

<svelte:head>
	<title>Multi-Activity Heatmap for Strava</title>
	<meta
		name="description"
		content="The best way to visualize your Strava runs, rides, or other activities on a beautiful & modern map."
	/>
	<meta name="keywords" content="Strava, Heatmap, Mapper" />
	<meta name="author" content="Alexander Weimer" />
	<meta
		property="og:description"
		content="The best way to visualize your Strava runs, rides, or other activities on a beautiful & modern map."
	/>
	<meta property="og:site_name" content="Multi-Activity Heatmap for Strava" />
	<meta name="google-site-verification" content="2M89RJWGTKCA8xmIIjzY9ZVbahvhk9wkiWi78YJtpi0" />
</svelte:head>
<h1 style="position: absolute; visibility: hidden;">
	Strava Multi-Activity Heatmap for Rides, runs and sports
</h1>
{#if !mapLoaded}
	<Loading />
{/if}
<Resizable.PaneGroup
	direction={onMobile ? 'vertical' : 'horizontal'}
	autoSaveId="mainPaneGroup"
	class="w-screen h-screen"
>
	{#if deviceTypeKnown && onMobile}
		<Resizable.Pane
			class="map-pane w-screen"
			defaultSize={100 - settingsSizePercent}
			order={1}
			bind:pane={mobileMap}
		>
			<Map bind:map bind:loaded={mapLoaded} bind:this={mapComponent} bind:onMobile />
		</Resizable.Pane>
		<div
			role="button"
			tabindex="0"
			on:dblclick={() => {
				if (settingsPane.isCollapsed()) settingsPane.expand();
				else settingsPane.collapse();
			}}
			on:dragstart={() => {
				if (settingsPane.isCollapsed()) settingsPane.expand();
			}}
		>
			<Resizable.Handle class="resizable-touchbar w-screen" />
		</div>
	{/if}
	<Resizable.Pane
		bind:pane={settingsPane}
		class="settings-pane"
		order={2}
		defaultSize={settingsSizePercent}
		minSize={8}
		collapsedSize={8}
		collapsible={true}
	>
		<div class="w-full h-screen md:h-full md:px-5 pt-1 md:pt-5 background overflow-hidden">
			<ScrollArea class="rounded-xl sw-full overflow-y-scroll h-[calc(100vh-90px)]">
				<div class="flex flex-col md:min-h-[calc(100vh-110px)]">
					{#if $page.data.session?.access_token === undefined || $page.data.session?.access_token === null}
						<ConnectPanel />
					{:else if new Date($page.data.session?.expires) < new Date()}
						<ConnectPanel sessionExpired />
					{:else if $page.data.session?.user}
						<SetupPanel {map} />
					{:else}
						<p class="text-center p-3">
							Something has gone wrong. If reloading the page doesn't fix the issue, please report
							it on <a
								href="https://github.com/sudolev/StravaMultiMapper"
								target="_blank"
								rel="noopener noreferrer">GitHub</a
							>
							or
							<a href="https://discord.gg/5P3AYFrwQG" target="_blank" rel="noopener noreferrer"
								>Discord</a
							>.
						</p>
					{/if}
					{#if onMobile}
						<div class="mx-5">
							<Footer bind:onMobile />
						</div>
					{/if}
				</div>
			</ScrollArea>
			{#if !onMobile}
				<div class="mx-5">
					<Footer bind:onMobile />
				</div>
			{/if}
		</div>
	</Resizable.Pane>
	{#if deviceTypeKnown && !onMobile}
		<Resizable.Handle
			withHandle
			class="resizable-touchbar h-screen w-1 bg-accent dark:bg-border"
			onDraggingChange={() => (panelsResized = true)}
		/>
		<Resizable.Pane
			class="map-pane h-screen"
			defaultSize={100 - settingsSizePercent}
			order={3}
			bind:pane={desktopMap}
		>
			<Map bind:map bind:loaded={mapLoaded} bind:this={mapComponent} bind:onMobile />
		</Resizable.Pane>
	{/if}
</Resizable.PaneGroup>
