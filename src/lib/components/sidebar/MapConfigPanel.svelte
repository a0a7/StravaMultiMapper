<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import * as Dropdown from '$lib/components/ui/dropdown-menu';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Label } from '$lib/components/ui/label';
	import BasemapSelect from '$lib/components/sidebar/map-config-components/BasemapSelect.svelte';
	import CommuteSelect from '$lib/components/sidebar/map-config-components/CommuteSelect.svelte';
	import ActivityTypeSelect from '$lib/components/sidebar/map-config-components/ActivityTypeSelect.svelte';
	import DateRangePicker from '$lib/components/sidebar/map-config-components/DateRangePicker.svelte';
	import type { StravaActivity } from '$lib/activities';
	export let activities: StravaActivity[];
</script>

<div class="w-full px-6 flex flex-col gap-2">
	<DateRangePicker {activities} />
	<ActivityTypeSelect />
	<CommuteSelect />
	<Separator class="mb-3 mx-5 w-[calc(100vw-2.5rem)] md:w-auto" />
	<BasemapSelect />
</div>
