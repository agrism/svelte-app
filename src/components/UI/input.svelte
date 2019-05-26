<script>
    import {createEventDispatcher } from 'svelte';
    export let value = '';
    export let label = "default";
    export let showLabel = true;

    let dispatch = createEventDispatcher();
</script>

<style>
    label {
        display: inline-block;
        width: 100px;
    }
</style>

{#if showLabel}
<label for="">{label}</label>
{/if}
<input 
    type="text" 
    bind:value="{value}" 
    on:input="{()=>dispatch('change', value)}"
    />