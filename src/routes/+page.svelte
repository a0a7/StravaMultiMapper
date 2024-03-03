<script lang="ts">
    import Fa from 'svelte-fa'
    import { faMoon, faSun} from '@fortawesome/free-solid-svg-icons'
    import { faGithub } from '@fortawesome/free-brands-svg-icons';
    import { MapLibre, NavigationControl, Marker,  Popup, FullscreenControl, ScaleControl, Control, ControlGroup, ControlButton } from 'svelte-maplibre';
    import * as Table from "$lib/components/ui/table";
    import { Button } from "$lib/components/ui/button";
    import { toggleMode } from "mode-watcher";    
</script>

<svelte:head>
    <title>Strava Multi-Activity Mapper</title> 
    <meta name="description" content="Advanced & modern utility to map all of your Strava activities onto a customizable and ">
    <meta name="keywords" content="Strava, Mapper, Ride">
    <meta name="author" content="Alexander Akira Weimer">
</svelte:head>

<div class="sm:flex sm:flex-col md:flex-row">
    <div class="w-full md:w-[25vw] md:h-[100vh]"> 
        <Button on:click={toggleMode} variant="outline" size="icon">
            <img src="icons/sun.svg" alt="Switch to light mode"
              class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            />
            <img src="icons/moon.svg" alt="Switch to dark mode"
              class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            />
            <span class="sr-only">Toggle theme</span>
          </Button>
    </div>
    <div class="w-full md:w-[75vw] md:h-[100vh]">Div 2</div>
</div>