<template>
  <div id="app">
<!--     <add-blog></add-blog> -->
   <!-- <show-blogs></show-blogs> -->
   <blog-header></blog-header>
   <router-view></router-view>
   <blog-footer></blog-footer>
   <div class="popwrap" v-show="LogisShow">
     <div class="popup">
      <login></login>
    </div>
   </div>
   <div class="popwrap" v-show="RegisShow">
    <div class="popup">
      <register></register>
    </div>
   </div>
    
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
  computed:{
    LogisShow(){
      return this.$store.state.LogisShow
    },
    RegisShow(){
      return this.$store.state.RegisShow
    },
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
    width: 21.25rem;
    height: 22.25rem;
    border-radius: 8px;
  }
  @media screen and (max-width: 768px){
  html{
    font-size: 16px;
  }
 }
  @media screen and (max-width: 480px){
    
    html{
      font-size: 14px;
  }
}
</style>
