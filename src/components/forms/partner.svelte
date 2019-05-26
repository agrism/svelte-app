<script>
    import Inputf from '../UI/input.svelte';
    import Buttonf from '../UI/button.svelte';
    import { createEventDispatcher } from 'svelte';

    let inputEvent = (event) => {};
    let dispatch = createEventDispatcher();

    export let partner = {
        id: '',
        name: '',
        regNo: ''
    }

    let getPartner = () => {
        dispatch('update', partner)
    }

    let cancelParterForm = ()=>{
        dispatch('cancelPartnerForm')
    }
</script>

<style>
    /* .btn1{
        display: flex;
        background: red;
    }
    .btn {
        flex: 1 auto;
    } */
</style>

<div>
    <Inputf
        label="Name"
        showLabel="{true}"
        bind:value="{partner.name}"
        on:change="{inputEvent}"
    />
</div>
<div>
    <Inputf
        label="Reg no"
        showLabel="{true}"
        bind:value="{partner.regNo}"
        on:change="{inputEvent}"
    />
</div>
<div>


<Buttonf
    classes="waves-effect waves-light btn-small"
    on:click="{cancelParterForm}"
    title="cancel"
/>

<Buttonf
    classes="waves-effect waves-light btn-small"
    on:click="{getPartner}"
    title="save"
/>

</div>


