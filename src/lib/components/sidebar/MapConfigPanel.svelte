<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import * as Dropdown from '$lib/components/ui/dropdown-menu';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Label } from '$lib/components/ui/label';
	import BasemapSelect from '$lib/components/sidebar/map-config-components/BasemapSelect.svelte';
</script>

<div class="w-full px-6">
	<p class="inline">Map Appearance: </p><BasemapSelect />
</div>