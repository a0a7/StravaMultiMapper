<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	export let content: string;
</script>

<AlertDialog.Root closeOnOutsideClick={true} open={true}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>An error has occured!</AlertDialog.Title>
			<AlertDialog.Description>{content}</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Close</AlertDialog.Cancel>
			<!--<AlertDialog.Action on:click={() => window.location.reload()}>Reload</AlertDialog.Action>-->
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
