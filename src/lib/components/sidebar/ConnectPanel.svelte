<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import Button from "../ui/button/button.svelte";
    import * as Alert from "$lib/components/ui/alert";
</script>


<Card.Root>
    <Card.Header>
        <p>To map your activities, you will first need to <b>import your activities from Strava.</b></p>
    </Card.Header>
    <Card.Content>
        <Button class="bg-[#FC4C02] hover:bg-[#d14002] flex items-center mx-auto px-0 h-10">
            <img src="img/icon/connect_with_strava.svg" alt="Connect with Strava" class="h-14">
        </Button>
    </Card.Content>
    <Card.Footer>
        
    </Card.Footer>
  </Card.Root>
