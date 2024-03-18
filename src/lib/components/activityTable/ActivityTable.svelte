<script lang="ts">
	import { createTable, createRender, Render, Subscribe } from 'svelte-headless-table';
	import {
		addPagination,
		addSortBy,
		addTableFilter,
		addHiddenColumns,
		addSelectedRows
	} from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import ActivityDescriptionCell from './ActivityDescriptionCell.svelte';
	import DataTableCheckbox from './DataTableCheckbox.svelte';

	import type { StravaActivity } from '$lib/activities';

	export let activityData: StravaActivity[] = [];
	const table = createTable(readable(activityData), {
		sort: addSortBy({ disableMultiSort: true }),
		filter: addTableFilter({
			fn: ({ filterValue, value }: { filterValue: string; value: string }) =>
				value.includes(filterValue)
		}),
		hide: addHiddenColumns(),
		select: addSelectedRows()
	});
	const columns = table.createColumns([
		table.column({
			accessor: (item) => item,
			header: 'Name',
			id: 'name',
			cell: ({ value: { name, sport_type, commute } }) =>
				createRender(ActivityDescriptionCell, { name, sport_type })
		}),
		table.column({
			accessor: 'distance',
			header: 'Distance',
			cell: ({ value }) => {
				if (value === 0) {
					return '-';
				}
				return (
					(value / 1000).toFixed(
						Math.max(0, 2 - (value === 0 ? -1 : Math.floor(Math.log10(value))))
					) + ' km'
				);
			}
		}),
		table.column({
			accessor: 'total_elevation_gain',
			header: 'Elevation',
			cell: ({ value }) => {
				if (value === 0) {
					return '-';
				}
				const formatted = new Intl.NumberFormat('en-US', {
					style: 'decimal',
					minimumFractionDigits: 0,
					maximumFractionDigits: 0
				}).format(value);
				return `${formatted} m`;
			}
		}),
		table.column({
			accessor: 'kilojoules',
			header: 'Calories',
			cell: ({ value }) => {
				if (value === undefined) {
					return '-';
				}
				const formatted = new Intl.NumberFormat('en-US', {
					style: 'decimal',
					minimumFractionDigits: 0,
					maximumFractionDigits: 0
				}).format(value / 4.18);
				return `${formatted} kcal`;
			}
		}),
		table.column({
			accessor: 'average_speed',
			header: 'Average Speed',
			cell: ({ value }) => {
				if (value === 0) {
					return '-';
				}
				const formatted = new Intl.NumberFormat('en-US', {
					style: 'decimal',
					minimumFractionDigits: 1,
					maximumFractionDigits: 1
				}).format(value * 3.6);
				return `${formatted} kmh`;
			}
		}),
		table.column({
			accessor: 'average_watts',
			header: 'Average Power',
			cell: ({ value }) => {
				if (value === undefined) {
					return '-';
				}
				const formatted = new Intl.NumberFormat('en-US', {
					style: 'decimal',
					minimumFractionDigits: 0,
					maximumFractionDigits: 0
				}).format(value);
				return `${formatted} W`;
			}
		}),
		table.column({
			accessor: 'average_heartrate',
			header: 'Average Heartrate'
		}),
		table.column({
			accessor: 'start_date_local',
			header: 'Date',
			cell: ({ value }) => {
				return new Date(value).toLocaleDateString();
			}
		}),
		table.column({
			accessor: ({ id }) => id,
			header: '',
			id: 'idString'
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns, rows } =
		table.createViewModel(columns);

	// const { pageIndex, hasNextPage, hasPreviousPage } = pluginStates.page;
	const { filterValue } = pluginStates.filter;
	const { hiddenColumnIds } = pluginStates.hide;
	const { selectedDataIds } = pluginStates.select;

	const colsHiddenByDefault = [
		'total_elevation_gain',
		'average_speed',
		'average_heartrate',
		'kilojoules',
		'average_watts',
		'idString'
	];
	const ids = flatColumns.map((col) => col.id);
	let hideForId = Object.fromEntries(ids.map((id) => [id, !colsHiddenByDefault.includes(id)]));

	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);

	const hidableCols = [
		'distance',
		'elevation',
		'kilojoules',
		'average_speed',
		'average_watts',
		'average_heartrate',
		'start_date_local'
	];
</script>

<div class="m-5">
	<div class="flex items-center py-4">
		<Input
			class="max-w-sm"
			placeholder="Filter activities..."
			type="text"
			bind:value={$filterValue}
		/>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button variant="outline" class="ml-auto" builders={[builder]}>
					Columns <ChevronDown class="ml-2 h-4 w-4" />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				{#each flatColumns as col}
					{#if hidableCols.includes(col.id)}
						<DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
							{col.header}
						</DropdownMenu.CheckboxItem>
					{/if}
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
	<ScrollArea class="h-[336px] rounded-md border" orientation="both">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs} class="[&:has([role=checkbox])]:pl-3">
										<Render of={cell.render()} />
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs} data-state={$selectedDataIds[row.id] && 'selected'} class="">
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell
										{...attrs}
										class={cell.id === 'name' ? 'truncate max-w-40 min-w-2' : ''}
									>
										<Render of={cell.render()} />
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</ScrollArea>
</div>
