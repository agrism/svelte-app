<script>
    import { createEventDispatcher} from 'svelte';
    import partnerStore from '../../store/partner-store.js';
    export let partners = [];

    $: console.log('AA',partners);

    const dispatch = createEventDispatcher();

    let selectPartner = (partner)=>{
        console.log(event.target)
        dispatch('selectPartner', partner);
    }
</script>


<style>
    button{
        float: right;
    }

    .pointer {cursor: pointer;}
</style>


<h4>Partner list</h4>
<table>
<thead>
    <tr>
        <th>Name</th>
        <th>Reg. no.</th>
        <th>Action</th>
    </tr>
    </thead>
    <tbody>
{#each partners as partner}

    <tr class="collection-item pointer">
    <td on:click="{()=>{selectPartner(partner);}}">
        {partner.name}
    </td>
    <td style="width:20%"
        on:click="{()=>{selectPartner(partner);}}">
        {partner.regNo}
    </td>
    <td style="width:20%">
        <button 
        class="waves-effect waves-teal btn-flat"
        on:click="{()=>{
            partnerStore.removePartner(partner);
        }}"
        >
        <i class="material-icons">close</i>    
        </button>
    </td> 
    </tr>
{/each}
</tbody>
</table>