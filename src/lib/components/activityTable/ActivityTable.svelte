<script lang="ts">
    import { createTable, Render, Subscribe } from "svelte-headless-table";
    import { readable } from "svelte/store";
    import * as Table from "$lib/components/ui/table";
    import type { StravaActivity } from '$lib/activities';
    export let activityData: StravaActivity[] = [];
   
    const table = createTable(readable(activityData));
   
    const columns = table.createColumns([
      table.column({
        accessor: "name",
        header: "Name",

      }),
      table.column({
        accessor: "sport_type",
        header: "sport_type",
      }),
      table.column({
        accessor: "commute",
        header: "commute",
      }),
      table.column({
        accessor: "distance",
        header: "Distance",
      }),
      table.column({
        accessor: "total_elevation_gain",
        header: "total_elevation_gain",
      }),
      table.column({
        accessor: "kilojoules",
        header: "Kilojoules",
      }),
      table.column({
        accessor: "average_speed",
        header: "Average Speed",
      }),
      table.column({
        accessor: "average_watts",
        header: "Average Wattage",
      }),
      table.column({
        accessor: "average_heartrate",
        header: "Average average_heartrate",
      }),
      table.column({
        accessor: "start_date_local",
        header: "start_date_local",
      }),
      table.column({
        accessor: ({ id }) => id,
        header: "",
      }),
    ]);
   
    const { headerRows, pageRows, tableAttrs, tableBodyAttrs } =
      table.createViewModel(columns);
  </script>
   
  <div class="rounded-md border">
    <Table.Root {...$tableAttrs}>
      <Table.Header>
        {#each $headerRows as headerRow}
          <Subscribe rowAttrs={headerRow.attrs()}>
            <Table.Row>
              {#each headerRow.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
                  <Table.Head {...attrs}>
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
            <Table.Row {...rowAttrs}>
              {#each row.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs>
                  <Table.Cell {...attrs}>
                    <Render of={cell.render()} />
                  </Table.Cell>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>