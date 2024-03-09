<script lang="ts">
	import { onMount } from "svelte";
	import * as Resizable from "$lib/components/ui/resizable";
	import Map from '$lib/components/map/Map.svelte';

	let onMobile: boolean;

	onMount(() => {
		onMobile = window.innerWidth <= 768; // Change this value based on your definition of a "phone" screen size
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

<Resizable.PaneGroup direction={onMobile ? "vertical" : "horizontal"}>
  <Resizable.Pane defaultSize={40}></Resizable.Pane>
  <Resizable.Handle withHandle />
  <Resizable.Pane defaultSize={60}><Map /></Resizable.Pane>
</Resizable.PaneGroup>
