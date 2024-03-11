<script lang="ts">
	import { onMount } from "svelte";
	import * as Resizable from "$lib/components/ui/resizable";
	import type { PaneAPI } from "paneforge";
	import Button from "$lib/components/ui/button/button.svelte";
	import '$lib/components/sidebar/resizable-handle.css';
	import Map from '$lib/components/map/Map.svelte';
	import { mode, toggleMode } from 'mode-watcher';
	let map: any = null;
	let mapComponent: Map | null = null;

	let onMobile: boolean;
	$: deviceTypeKnown = typeof onMobile !== 'undefined';
	let settingsPane: PaneAPI, settingsPaneCollapsed: boolean = false;

	onMount(() => {
		onMobile = window.innerWidth <= 768;
		window.addEventListener('resize', () => {onMobile = window.innerWidth <= 768});
	});
	function invertMapColor() {
		console.log('attempting to invert map color')
		if (mapComponent) {
			console.log('inverting map color')
			mapComponent.conditionallyInvertMapColor();
		}
	}
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
			<Map bind:map={map} bind:this={mapComponent} bind:onMobile />
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
		<div class="w-full h-full px-5 pt-1 pb-2 md:py-5 background overflow-y-scroll">
			<Button on:click={() => {
				toggleMode();
				invertMapColor();
			}}>
				Toggle Mode
			</Button>
		</div>
	</Resizable.Pane>
	{#if deviceTypeKnown && !onMobile}
		<Resizable.Handle withHandle class="h-screen" />
		<Resizable.Pane class="map-pane h-screen" defaultSize={60} order={3}>
			<Map bind:map={map} bind:this={mapComponent} bind:onMobile />
		</Resizable.Pane>
	{/if}
</Resizable.PaneGroup>