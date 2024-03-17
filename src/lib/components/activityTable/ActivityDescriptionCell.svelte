<script lang="ts">
    import { getActivityIconURL, getCommuteIconURL } from '$lib/utils'
	import '$lib/components/sidebar/svg-styles.css';

    export let name: string;
    export let sport_type: string;
    export let commute: boolean;

</script>
<div class="flex">
    <p class="inline-block truncate">{name}</p>
    <div class="inline-block px-1 w-4 h-4 translate-y-1">
        {@html getActivityIconURL(sport_type)}
    </div>
    <!-- Commute Icon
    <div class="svg-icon inline-block w-3 h-3 left-4 translate-y-[6px]">
        {@html getCommuteIconURL(commute)}
    </div>-->
</div>