<template>
  <div id="login">
  登陆
  </div>
</template>

<script>




export default {
  name: 'login',
  data(){
    return{
    }
  },
  components: { 
  }
}
</script>

<style>
.popup{
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background: #aaa;
    z-index: 3;   
    width: 340px;
    height: 355px;
    border-radius: 8px;
  }
 

</style>
