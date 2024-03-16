<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
	import * as Resizable from '$lib/components/ui/resizable';
	import type { PaneAPI } from 'paneforge';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import '$lib/components/sidebar/resizable-handle.css';
	import Map from '$lib/components/map/Map.svelte';
	import ConnectPanel from '$lib/components/sidebar/ConnectPanel.svelte';
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
	<title>Strava Multi Mapper</title>
	<meta
		property="og:description"
		content="The best way to visualize your Strava runs, rides, or other activities on a beautiful & modern map."
	/>
</svelte:head>
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
			<Resizable.Handle
				class="resizable-touchbar w-screen"
				onDraggingChange={() => (panelsResized = true)}
			/>
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
		<div class="w-full h-full px-5 pt-1 md:py-5 background">
			<ScrollArea class="w-full overflow-y-scroll h-full">
				<div class="flex flex-col md:min-h-screen">
					{#if ($page.data.session?.access_token === undefined || $page.data.session?.access_token === null)}
						<ConnectPanel />
					{:else if (new Date($page.data.session.expires) < new Date())}
						<ConnectPanel sessionExpired={true}/>
					{:else}
						<p class="text-center p-3">Something has gone wrong. If reloading the page doesn't fix the issue, please report it on <a href="https://github.com/sudolev/StravaMultiMapper" target="_blank"
							>GitHub</a> or <a href="https://discord.gg/5P3AYFrwQG">Discord</a>.</p>
					{/if }
					<Footer bind:onMobile />
				</div>
			</ScrollArea>
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
