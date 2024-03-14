<script lang="ts">
	import { SyncLoader } from 'svelte-loading-spinners';
	import WordmarkLogo from './WordmarkLogo.svelte';
</script>

<div
	class="absolute w-screen h-screen top-0 left-0 z-50 flex flex-col items-center justify-center bg-background overflow-x-hidden"
>
	<WordmarkLogo />
	<div class="mt-[75px] flex flex-col items-center text-muted-foreground">
		<SyncLoader size="60" color="#313c47" unit="px" duration="1s" />
		<h2 class="py-4">The page is now loading. This shouldn't take long.</h2>
		<h3>
			Experiencing issues? <a href="https://github.com/sudolev/StravaMultiMapper" target="_blank"
				>Report them on GitHub</a
			>
			or <a href="https://discord.gg/5P3AYFrwQG">Discord</a>.
		</h3>
	</div>
</div>
