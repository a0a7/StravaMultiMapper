<script lang="ts">
	import Check from 'svelte-radix/Check.svelte';
	import CaretSort from 'svelte-radix/CaretSort.svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Label } from '$lib/components/ui/label/';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import { tick } from 'svelte';

	const basemaps = [
		{
			value: 'proton',
			label: 'Light'
		},
		{
			value: 'darkmatter',
			label: 'Dark'
		},
		{
			value: 'summer',
			label: 'Summer'
		},
		{
			value: 'winter',
			label: 'Winter'
		},
		{
			value: 'streets',
			label: 'Streets'
		},
		{
			value: 'satellite',
			label: 'Satellite'
		}
	];

	let open = false;
	let value = '';

	$: selectedValue = basemaps.find((f) => f.value === value)?.label ?? 'Select a basemap style...';

	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<Popover.Root bind:open let:ids>
	<Popover.Trigger asChild id="basemap-select" let:builder>
		<Button
			builders={[builder]}
			variant="outline"
			role="combobox"
			aria-expanded={open}
			class="w-[200px] justify-between"
		>
			{selectedValue}
			<CaretSort class="ml-2 h-4 w-4 shrink-0 opacity-50" />
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0">
		<Command.Root>
			<Command.Group heading="Palettes">
				{#each basemaps.slice(0, 4) as basemap}
					<Command.Item
						value={basemap.value}
						onSelect={(currentValue) => {
							value = currentValue;
							closeAndFocusTrigger(ids.trigger);
						}}
					>
						{basemap.label}
					</Command.Item>
				{/each}
			</Command.Group>
			<Command.Group heading="Data Sources">
				{#each basemaps.slice(4, 6) as basemap}
					<Command.Item
						value={basemap.value}
						onSelect={(currentValue) => {
							value = currentValue;
							closeAndFocusTrigger(ids.trigger);
						}}
					>
						{basemap.label}
					</Command.Item>
				{/each}
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
