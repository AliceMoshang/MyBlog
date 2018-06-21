<template>
  <div class="register">
  注册
  <div class="close" @click="closeReg">X</div>
  </div>
</template>

<script>




export default {
  name: 'register',
  data(){
    return{
    }
  },
  methods:{
    closeReg(){
      this.$store.commit("setPopReg",false)
    }
  }
}
</script>

<style scoped>
.register{
  position: relative;
  width: 340px;
  height: 355px;
}
.close{
  position: absolute;
  top: 5px;
  right: 5px;
}
 

</style>
