<script lang="ts">
    import CalendarIcon from "svelte-radix/Calendar.svelte";
    import type { DateRange } from "bits-ui";
    import {
      CalendarDate,
      DateFormatter,
      getLocalTimeZone,
      today,
      type DateValue
    } from "@internationalized/date";
    import { cn } from "$lib/utils.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { RangeCalendar } from "$lib/components/ui/range-calendar/index.js";
    import * as Popover from "$lib/components/ui/popover/index.js";
   
    const df = new DateFormatter("en-US", {
      dateStyle: "medium"
    });
   
    let value: DateRange | undefined = {
      start: new CalendarDate(1970, 1, 1),
      end: today(getLocalTimeZone())
    };
   
    let startValue: DateValue | undefined = undefined;
  </script>
   
  <div class="inline">
    <Popover.Root openFocus>
      <Popover.Trigger asChild let:builder>
        <Button
          variant="outline"
          class={cn(
            "w-fit justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
          builders={[builder]}
        >
          <CalendarIcon class="mr-2 h-4 w-4" />
          {#if value && value.start}
            {#if value.end}
              {df.format(value.start.toDate(getLocalTimeZone()))} - {df.format(
                value.end.toDate(getLocalTimeZone())
              )}
            {:else}
              {df.format(value.start.toDate(getLocalTimeZone()))}
            {/if}
          {:else if startValue}
            {df.format(startValue.toDate(getLocalTimeZone()))}
          {:else}
            Pick a date
          {/if}
        </Button>
      </Popover.Trigger>
      <Popover.Content class="w-auto p-0" align="start">
        <RangeCalendar
          bind:value
          bind:startValue
          placeholder={value?.start}
          initialFocus
        />
      </Popover.Content>
    </Popover.Root>
  </div>