

let isLoadingNow = false;

let loader = {
    startLoader: ()=>{
        isLoadingNow = true;
        return isLoadingNow;
    },
    closeLoader: ()=>{
        isLoadingNow = false;
        return isLoadingNow;
    },
    isLoading: ()=>{
        return isLoadingNow;
    }
};

export default loader;