<template>
  <div id="app">
   <blog-header></blog-header>
   <router-view></router-view>
   <blog-footer></blog-footer>
   <div class="popwrap" v-show="LogisShow">
     <div class="popup plr-30 ptb-20">
      <login></login>
    </div>
   </div>

   <div class="popwrap" v-show="RegisShow">
    <div class="popup plr-30 ptb-20">
      <register></register>
    </div>
   </div>

   <div class="poptips dis-box justify-content-center" v-if="success"><div class="cf fs12">{{msg}}</div></div>
  </div>
</template>

<script>


import AddBlog from './components/AddBlog'
import ShowBlogs from './components/ShowBlogs'
import BlogHeader from './components/BlogHeader'
import BlogFooter from './components/BlogFooter'
import Login from './components/Login'
import Register from './components/Register'


export default {
  name: 'App',
  data(){
    return{
   
    }
  },
  created(){
    
  },
  watch:{
    msg:()=>{
      return setTimeout(()=>{
        this.msg = ""
      },1000)
    }
  },
  computed:{
    LogisShow(){
      return this.$store.state.LogisShow
    },
    RegisShow(){
      return this.$store.state.RegisShow
    },
    success(){
      return this.$store.state.success
    },
    msg(){
      return this.$store.state.msg
    }
  },
  components: { 
    AddBlog,ShowBlogs,BlogHeader,BlogFooter,Login,Register
  },
  methods:{
      
    }
}
</script>

<style>
.popwrap{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 997;
  width: 100%;
  height: 100%;
  background-color: rgba(136,136,136,.7);
  
}
.popup{
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background: #fff;
    z-index: 999;   
    width: 20rem;
    height: 20rem;
    border-radius: 8px;
    box-sizing: border-box;
  }
.poptips{
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, 50%);
  -moz-transform: translate(-50%, 50%);
  transform: translate(-50%, -50%);
  background: #888;
  z-index: 1003;   
  width: 6.5rem;
  height: 3.5rem;
  border-radius: 8px;
  opacity: 0.9;
  padding: 0 0.555556rem;
}
.el-input__inner{
  height: 30px !important;
    line-height: 30px !important;
} 
.el-input__icon{
  line-height: 30px !important;
}
</style>
