<script>
    import { createEventDispatcher} from 'svelte';
    export let partners = [];

    $: console.log('AA',partners);

    const dispatch = createEventDispatcher();

    let selectPartner = (partner)=>{
        dispatch('selectPartner', partner);
    }
</script>


<style>
    button{
        float: right;
    }

    .pointer {cursor: pointer;}
</style>


<h4>Partners list</h4>
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

    <tr class="collection-item pointer"
        on:click="{()=>{selectPartner(partner);}}"
    ><td>{partner.name}</td><td>{partner.regNo}</td>
    <td>
        <button 
        class="waves-effect waves-teal btn-flat"
        on:click="{()=>dispatch('deletePartner', partner)}">
            <i class="material-icons">close</i>
        </button>
    </td> 
    </tr>
{/each}
</tbody>
</table>