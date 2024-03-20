<script lang="ts">
	import Check from 'svelte-radix/Check.svelte';
	import CaretSort from 'svelte-radix/CaretSort.svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Label } from '$lib/components/ui/label/';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import { tick } from 'svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import QuestionMarkIcon from '$lib/components/QuestionMarkIcon.svelte';

	const activityList = [
		'Run',
		'Ride',
		'Walk',
		'Hike',
		'EBikeRide',
		'NordicSki',
		'AlpineSki',
		'BackcountrySki',
		'Snowboard',
		'RollerSki',
		'Canoeing',
		'Handcycle',
		'IceSkate',
		'InlineSkate',
		'Kayaking',
		'Kitesurf',
		'Rowing',
		'Sail',
		'Skateboard',
		'Snowshoe',
		'Soccer',
		'StandUpPaddling',
		'Surfing',
		'Swim',
		'Velomobile',
		'WeightTraining',
		'Wheelchair',
		'Windsurf',
		'Elliptical',
		'Golf',
		'Crossfit',
		'RockClimbing',
		'StairStepper',
		'VirtualRide',
		'VirtualRun',
		'Workout',
		'Yoga'
	];

	const activityGroupings = [
		{
			activityTypes: 'all',
			label: 'All Activities'
		},
		{
			activityTypes: 'Run-VirtualRun-Walk-Hike-Snowshoe-RockClimbing',
			label: 'Foot sports'
		},
		{
			value: 'Ride-VirtualRide-Handcycle-Velomobile-Wheelchair',
			label: 'Cycling sports'
		},
		{
			value: 'AlpineSki-BackcountrySki-NordicSki-Snowboard-IceSkate',
			label: 'Snow sports'
		},
		{
			value: 'InlineSkate-RollerSki-Skateboard-IceSkate',
			label: 'Skate sports'
		},
		{
			value: 'StandUpPaddling-Canoeing-Kayaking-Rowing',
			label: 'Paddle Sports'
		},
		{
			value:
				'Swimming-StandUpPaddling-Canoeing-Kayaking-Rowing-Sailing-Surfing-Windsurfing-Kitesurfing',
			label: 'Water Sports'
		}
	];

	// Populate the above array with all the individual activity types
	for (const index in activityList) {
		activityGroupings.push({
			activityTypes: activityList[index],
			label: activityList[index]
				.replace(/(?<=.)([A-Z])/g, ' $1')
				.replace('E Bike', 'E-bike')
				.replace('Stand Up', 'Stand-up')
		});
	}

	let open = false;
	let value = '';

	$: selectedValue =
		activityGroupings.find((f) => f.value === value)?.label ?? activityGroupings[0].label;

	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<Popover.Root bind:open let:ids preventScroll={false}>
	<Popover.Trigger asChild id="activityGroup-select" let:builder>
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
	<Popover.Content class="w-[200px] p-0 max-h-[400px] md:max-h-[500px] overflow-y-auto">
		<ScrollArea class="">
			<Command.Root>
				<Command.Group>
					<Command.Item
						value={activityGroupings[0].value}
						onSelect={(currentValue) => {
							value = currentValue;
							closeAndFocusTrigger(ids.trigger);
						}}
					>
						{activityGroupings[0].label}
					</Command.Item>
				</Command.Group>
				<Command.Group heading="Groups">
					{#each activityGroupings.slice(1, 7) as activityGroup}
						<Command.Item
							value={activityGroup.value}
							onSelect={(currentValue) => {
								value = currentValue;
								closeAndFocusTrigger(ids.trigger);
							}}
						>
							{activityGroup.label}
							<QuestionMarkIcon content={activityGroup.activityTypes?.replace(/(?<=.)([A-Z])/g, ' $1').replace(/-/g, ',').replace('E Bike', 'E-bike').replace('Stand Up', 'Stand-up')}/>
						</Command.Item>
					{/each}
				</Command.Group>
				<Command.Group heading="Individual Types">
					{#each activityGroupings.slice(7, activityGroupings.length) as activityGroup}
						<Command.Item
							value={activityGroup.value}
							onSelect={(currentValue) => {
								value = currentValue;
								closeAndFocusTrigger(ids.trigger);
							}}
						>
							{activityGroup.label}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.Root>
		</ScrollArea>
	</Popover.Content>
</Popover.Root>
