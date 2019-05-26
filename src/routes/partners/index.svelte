<!-- <script context="module">
    // import Loader from '../../components/loader.svelte';
    
    export function preload({params, query}){
        return readPartners(); 
    }
</script> -->

<script>
    import Partnerform from '../../components/forms/partner.svelte';
    import Partners from '../../components/forms/partners.svelte';
    // import inp from '../../components/UI/input.svelte';
    import Btn from '../../components/UI/button.svelte';
    import { onMount} from 'svelte';
    // import { writable } from 'svelte/store';

    import Loader from '../../components/loader.svelte';
    import loaderer from '../../components/loader.js';
    import partnerStore from '../../store/partner-store.js';


    let loaderStatus = false;


    let showPartnerForm = null;
   

    let partner = {
        id: null,
        name: '',
        regNo: ''
    }


    let storePartner = (event)=>{

        if(partner.id){
            return updatePartner();
        }

        loaderStatus = loaderer.startLoader();

        fetch('https://my-app-ag.firebaseio.com/partners.json', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: partner.name,
                regNo: partner.regNo
            }),
        })
        .then(response => {
            console.log('ok');
            if(!response.ok){
                throw new Error('Failed!!!');   
            }
            return response.json();
        })
        .then(data=>{
            showPartnerForm = null;
            partner.id = data.name;
            console.log(data.name, partner);
            partnerStore.addPartner({
                id: data.name,
                name: partner.name,
                regNo: partner.regNo
            })
            closePartnerForm();
        })
        .catch(error => {
            closePartnerForm();
            console.log('blin');
            console.error(error)
        });
    };

    let readPartners = ()=>{
        loaderStatus = loaderer.startLoader();

        fetch('https://my-app-ag.firebaseio.com/partners.json')
        .then(resp => {
            console.log('ok');
            if(!resp.ok){
                confirm.log('bled');
                throw new Error('Failed!!!');   
            }
            return resp.json();
        })
        .then(data=>{

            let tempPartners =[];
            Object.keys(data ? data : {}).forEach((key)=>{
                tempPartners.push({
                    id: key,
                    name: data[key].name,
                    regNo: data[key].regNo
                });
            });
            partnerStore.setPartners(tempPartners);
            closePartnerForm();
        })
        .catch(error => {
            closePartnerForm();
            console.log('blin');
            console.error(error)
        })
    };

    let deletePartner = (event)=>{
        
        loaderStatus = loaderer.startLoader();

        fetch(`https://my-app-ag.firebaseio.com/partners/${event.detail.id}.json`, {
            method: 'delete',
        })
        .then(res=>{
            if(!res.ok){
                throw new Error('Error on deleting fb');
            }
            return res.json()
        })
        .then(data=>{
            partnerStore.removePartner(event.detail);
            closePartnerForm();
        })
        .catch(err=>{
            closePartnerForm();
            console.log(err)
        })
    }

    let updatePartner = ()=>{
        loaderStatus = loaderer.startLoader();
        fetch(`https://my-app-ag.firebaseio.com/partners/${partner.id}.json`, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: partner.name,
                regNo: partner.regNo
            })
        })
        .then(res=>{
            if(!res.ok){
                throw new Error('Error on updating f-base');
            }
            partnerStore.removePartner(partner);
            partnerStore.addPartner(partner);
            closePartnerForm();
        })
        .catch(err=>{
            console.log(err);
        })
    }

    let editPartner = (partn)=>{
        partner = {...partn};
        showPartnerForm = true;
    }

    let createPartner = () =>{
        showPartnerForm = true;
    }

    let cancelPartnerForm = ()=>{
        closePartnerForm();
    }

    let closePartnerForm = ()=>{
        loaderStatus = loaderer.closeLoader();
        showPartnerForm = null;
        partner = {
            id: null,name:'', regNo:''
        };
    }

    onMount(()=>{
        if(!partnerStore.getInitialized()){
            readPartners();
            partnerStore.setInitialized();
        }
    })
</script>


{#if loaderStatus}
    <Loader/> 
{/if}  

{#if showPartnerForm}
<Partnerform
    partner="{partner}"
    on:update="{storePartner}"
    on:cancelPartnerForm="{cancelPartnerForm}"
/>
{:else}
<Partners
    partners="{$partnerStore.sort((a,b)=>(a.name.toLowerCase() > b.name.toLowerCase())? 1 : -1 )}"
    on:deletePartner="{deletePartner}"
    on:selectPartner="{(partner)=>editPartner(partner.detail)}"
/>
<Btn
    title='+'
    classes='waves-effect waves-light btn-small'
    on:click="{createPartner}"
/>
{/if}