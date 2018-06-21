<template>
  <div id="login">
  登陆
  <div class="close" @click="closeLog">X</div>
  </div>
</template>

<script>




export default {
  name: 'login',
  data(){
    return{
    }
  },
  methods:{
    closeLog(){
      this.$store.commit("setPopLog",false)
    }
  }
}
</script>

<style>
#login{
  position: relative;
  width: 21.25rem;
  height: 22.25rem;
}
.close{
  position: absolute;
  top: 0.3rem;
  right:  0.3rem;
}

</style>
