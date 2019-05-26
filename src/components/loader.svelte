<script>
    import { onMount} from 'svelte';

    onMount(()=>{
        console.log('MM')
    });
</script>

<style>
.loader-wrapper{
  content: '';
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.2);
  z-index: 999;
}

.loader {
    border: 8px solid lightgrey;
    border-top: 8px solid rgb(148, 13, 35);
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin .3s linear alternate;
    left: 50%;
    top: 50%;
    margin-left: -15px;
    margin-top: -15px;
    position: absolute;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>

<div class="loader-wrapper">
    <div class="loader"></div>
</div>