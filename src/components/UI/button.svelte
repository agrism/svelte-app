<script>
    import { createEventDispatcher } from 'svelte';
    export let title = 'Button';
    export let classes = '';

    let dispatch = createEventDispatcher();
</script>


<button
    class={classes}
    on:click="{()=> dispatch('click')}"
>
    {@html title}
</button>