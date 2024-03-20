<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import * as Dropdown from '$lib/components/ui/dropdown-menu';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Label } from '$lib/components/ui/label';
	import BasemapSelect from '$lib/components/sidebar/map-config-components/BasemapSelect.svelte';
	import ActivityTypeSelect from '$lib/components/sidebar/map-config-components/ActivityTypeSelect.svelte';
	import DateRangePicker from '$lib/components/sidebar/map-config-components/DateRangePicker.svelte';
</script>

<div class="w-full px-6">
	<table>
		<tr>
			<td>Map Appearance:</td>
			<td><BasemapSelect /></td>
		</tr>
		<tr>
			<td>Date:</td>
			<td><DateRangePicker /></td>
		</tr>
		<tr>
			<td>Activity Type:</td>
			<td><ActivityTypeSelect /></td>
		</tr>
	</table>
</div>

<style>
	td {
		@apply pr-4 pb-2 leading-none
	}
</style>