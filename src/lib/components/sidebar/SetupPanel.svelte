<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import * as Card from '$lib/components/ui/card';
	import Button from '../ui/button/button.svelte';
	import * as Alert from '$lib/components/ui/alert';
	import '$lib/components/sidebar/svg-styles.css';

	import { page } from '$app/stores';
</script>

<Card.Root>
	<Card.Header>
		{#if $page.data.session?.user?.name && $page.data.session?.user?.image}
			<img
				src={$page.data.session.user.image}
				alt="{$page.data.session.user.name} Profile picture"
				class="h-14 w-14 rounded-full mx-auto"
			/>
			<p>
				Connected to Strava as {$page.data.session.user.name}.
			</p>
		{/if}
	</Card.Header>
	<Card.Content>
		<Button
			class="bg-[#FC4C02] hover:bg-[#d14002] flex items-center mx-auto h-10 my-3 px-4"
			on:click={() => signOut('strava')}
		>
			<p>Sign out & clear session.</p>
		</Button>
	</Card.Content>
	<Card.Footer></Card.Footer>
</Card.Root>
