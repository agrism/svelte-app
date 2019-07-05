<script context="module">
  // import Loader from '../../components/loader.svelte';

  export function preload({ params, query }) {
    return readPartners();
  }
</script>

<script>
  import Partnerform from "../../components/forms/partner.svelte";
  import Partners from "../../components/forms/partners.svelte";
  // import inp from '../../components/UI/input.svelte';
  import Btn from "../../components/UI/button.svelte";
  import { onMount } from "svelte";
  // import { writable } from 'svelte/store';

  import Loader from "../../components/loader.svelte";
  import loaderer from "../../components/loader.js";
  import partnerStore from "../../store/partner-store.js";

  let loaderStatus = false;

  let showPartnerForm = null;

  let partner = {
    id: null,
    name: "",
    regNo: ""
  };

  let storePartner = event => {

      console.log('A7', event);

    // if (partner.id) {
    //   return updatePartner(partner);
    // }

    // console.log("A6", "storing- not update");

    // loaderStatus = loaderer.startLoader();
  };

  let readPartners = () => {
    loaderStatus = loaderer.startLoader();

    fetch("https://my-app-ag.firebaseio.com/partners.json")
      .then(resp => {
        console.log("ok");
        if (!resp.ok) {
          confirm.log("bled");
          throw new Error("Failed!!!");
        }
        return resp.json();
      })
      .then(data => {
        console.log("A5", data);
        let tempPartners = [];
        Object.keys(data ? data : {}).forEach(key => {
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
        console.log("blin");
        console.error(error);
      });
  };

  let deletePartner = event => {
    loaderStatus = loaderer.startLoader();

    fetch(`https://my-app-ag.firebaseio.com/partners/${event.detail.id}.json`, {
      method: "delete"
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Error on deleting fb");
        }
        return res.json();
      })
      .then(data => {
        partnerStore.removePartner(event.detail);
      })
      .catch(err => {
        console.log(err);
      });
  };

  let deletePartner1 = event => {
    // partnerStore.removePartner(event.detail);
  };

  let updatePartner = partner => {

      console.log('A9', partner);
      if(!partner.id){
        console.log('A9.1 - need to store');
        partnerStore.storePartner(partner);
      } else{
          console.log('A9.2 - need to update');
      }


    // partnerStore.updatePartner(partner);
    // showPartnerForm = false;

    // loaderStatus = loaderer.startLoader();
    // fetch(`https://my-app-ag.firebaseio.com/partners/${partner.id}.json`, {
    //   method: "put",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     name: partner.name,
    //     regNo: partner.regNo
    //   })
    // })
    //   .then(res => {
    //     if (!res.ok) {
    //       throw new Error("Error on updating f-base");
    //     }
    //     partnerStore.removePartner(partner);
    //     partnerStore.addPartner(partner);
    //     closePartnerForm();
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };

  let editPartner = partn => {
    console.log("Ao", partn);
    partner = { ...partn };
    showPartnerForm = true;
  };

  let createPartner = () => {
    showPartnerForm = true;
  };

  let cancelPartnerForm = () => {
    closePartnerForm();
  };

  let closePartnerForm = () => {
    loaderStatus = loaderer.closeLoader();
    showPartnerForm = null;
    partner = {
      id: null,
      name: "",
      regNo: ""
    };
  };

  onMount(() => {
    if (!partnerStore.getInitialized()) {
      readPartners();
      partnerStore.setInitialized();
    }
  });
</script>

<!--  -->

{#if loaderStatus}
  <Loader />
{/if}

{#if showPartnerForm}
  <Partnerform
    {partner}
    on:update111={storePartner}
    on:update={partner => updatePartner(partner.detail)}
    on:cancelPartnerForm={cancelPartnerForm} />
{:else}
  <Partners
    partners={$partnerStore.sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    )}
    on:deletePartner={deletePartner1}
    on:selectPartner={partner => editPartner(partner.detail)} />
  <Btn
    title="+"
    classes="waves-effect waves-light btn-small"
    on:click={createPartner} />
{/if}
