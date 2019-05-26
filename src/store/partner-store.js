import { writable } from 'svelte/store';

const partners = writable([])
const partnerStore = {
    subscribe: partners.subscribe,
    setPartners: items =>{
        partners.set(items);
    },
    addPartner: partner => {
        partners.update(items=>{
                return items.concat(partner)
        });
    },
    removePartner: partner =>{
        partners.update(items=>{
            return items.filter(i=> i.id  != partner.id )
        });
    },
    setInitialized: function(){
        this.isInitDataTaken= true;
    },
    getInitialized: function(){
        return this.isInitDataTaken;
    },
    isInitDataTaken: false
}

export default partnerStore;