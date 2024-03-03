<script lang="ts">
    import { MapLibre, NavigationControl, Marker,  Popup, FullscreenControl, ScaleControl, Control, ControlGroup, ControlButton } from 'svelte-maplibre';
    import DarkMode from "svelte-dark-mode";
    import { onMount } from 'svelte';
	import type { Theme } from 'svelte-dark-mode/types/DarkMode.svelte';

    let theme: Theme | undefined;

    $: switchTheme = (theme === "dark" ? "light" : "dark") as Theme;
</script>

<svelte:head>
    <title>Strava Multi-Activity Mapper</title> 
    <meta name="description" content="Advanced & modern utility to map all of your Strava activities onto a customizable and ">
    <meta name="keywords" content="Strava, Mapper, Ride">
    <meta name="author" content="Alexander Akira Weimer">
</svelte:head>