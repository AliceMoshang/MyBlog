<template>
  <div id="app">
<!--     <add-blog></add-blog> -->
   <!-- <show-blogs></show-blogs> -->
   <blog-header></blog-header>
   <router-view></router-view>
   <blog-footer></blog-footer>
    <div class="popup b" v-show="isShow">
    
    </div>
  </div>
</template>

<script>


import AddBlog from './components/AddBlog'
import ShowBlogs from './components/ShowBlogs'
import BlogHeader from './components/BlogHeader'
import BlogFooter from './components/BlogFooter'


export default {
  name: 'App',
  data(){
    return{
      isShow: true
    }
  },
  components: { 
    AddBlog,ShowBlogs,BlogHeader,BlogFooter
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
