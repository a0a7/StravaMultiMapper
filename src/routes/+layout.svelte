<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { navigating } from '$app/stores';
	import Loading from '$lib/components/Loading.svelte';
</script>

<ModeWatcher themeColors={{ dark: 'black', light: 'white' }} />
{#if $navigating}
	<Loading />
{/if}
<slot />
