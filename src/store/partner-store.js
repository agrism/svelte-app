import { writable } from 'svelte/store';

const partners = writable([]);
const partnerStore = {
    subscribe: partners.subscribe,
    setPartners: items => {
        partners.set(items);
    },
    addPartner: partner => {
        partners.update(items => {
            return items.concat(partner)
        });
    },
    storePartner: partner => {
        fetch("https://my-app-ag.firebaseio.com/partners.json", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: partner.name,
              regNo: partner.regNo
            })
          })
            .then(response => {
              console.log("ok");
              if (!response.ok) {
                throw new Error("Failed!!!");
              }
              console.log('partner saved in FB OK', partner);
              return response.json();
            })
            .then(data => {
              partner.id = data.name;
              console.log(data.name, partner);
              partnerStore.addPartner({
                id: data.name,
                name: partner.name,
                regNo: partner.regNo
              });
              console.log('partner stored in svelteStorage OK', partner);
            })
            .catch(error => {
              console.log("blin");
              console.error(error);
            });
    },
    removePartner: partner => {

        console.log('deleting');

        fetch(`https://my-app-ag.firebaseio.com/partners/${partner.id}.json`, {
            method: 'delete',
        }).then(res => {
            if (!res.ok) {
                throw new Error('Error on deleting fb');
            }
            return res.json()
        }).then(data => {
            partners.update(items => {
                return items.filter(i => i.id != partner.id)
            });
        }).catch(err => {
            console.log(err)
        })
    },
    updatePartner: (partner) => {

        console.log('storageUpdate', partner);

        fetch(`https://my-app-ag.firebaseio.com/partners/${partner.id}.json`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: partner.name,
                regNo: partner.regNo
            })
        }).then(res => {
            if (!res.ok) {
                throw new Error("Error on updating f-base");
            }

            partners.update(items => {
                return items.filter(i => i.id != partner.id)
            });

            partners.update(items => {
                return items.concat(partner)
            });

        }).catch(err => {
            console.log(err);
        });
    },
    setInitialized: function () {
        this.isInitDataTaken = true;
    },
    getInitialized: function () {
        return this.isInitDataTaken;
    },
    isInitDataTaken: false
}

export default partnerStore;