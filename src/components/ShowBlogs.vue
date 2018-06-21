<template>
  <div v-theme:column="'middle'" id="show-blogs" class="mt-10">
    <div class="dis-box justify-content-between bb pd-5">
      <div class="pl-20 fw-b fs18 ">ARTICLES</div>
      <div class="seainpu">
          <input type="text" placeholder="搜索" v-model="search">
          <i class="iconfont icon-sousuo1 c9"></i>
      </div>
    </div> 
    <div class="pl-20 pr-20">
        <div class="single-blog"  v-for="blog in filteredBlogs">
          <router-link :to="'/blog/'+blog.id">
            <!-- <h4 v-rainbow>{{blog.title | to-uppercase}}</h4>  -->
            <h4 class="iconfont icon-wenxue pr-10" >&nbsp{{blog.title | to-uppercase}}</h4> 
            <article class="c9">
              {{blog.content | snippet}}
            </article>
            <div class="dis-box pt-10">

              <div v-for="item in blog.category" class="cate">{{item}}</div>
            </div>
            
          </router-link>
        </div>
    </div>
    <!-- <el-pagination
      layout="prev, pager, next"
      :total="50">
    </el-pagination> -->
    

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'show-blogs',
  data(){
    return{
      blogs:[],
      search:''
    }
  },
  created(){
    //vue-resource方式请求
    // this.$http.get('https://wd2206394391jwoklu.wilddogio.com/Aposts.json').then(res=>{
    //     return res.json()
    //   // console.log(11,res.json())      
    //   // this.blogs = res.data.slice(0,10)
    //   // console.log(this.blogs)
    //   }).then(data=>{
    //   var blogsArray = [];
    //   for (let key in data){
    //     // console.log(33,key)
    //     // console.log(22,data[key])
    //     data[key].id = key
    //     blogsArray.push(data[key])
        
    //   }
    //   console.log(44,blogsArray)
    //   this.blogs = blogsArray
    // })

    // axios请求
    axios.get('https://wd2206394391jwoklu.wilddogio.com/Aposts.json').then(res=>{
        return res.data  
      }).then(data=>{
      var blogsArray = [];
      for (let key in data){
  
        data[key].id = key
        blogsArray.push(data[key])
        
      }
      console.log(44,blogsArray)
      this.blogs = blogsArray
    })
  },
  //实现搜索
  computed:{
    filteredBlogs: function(){
      return this.blogs.filter((blog) =>{
        return blog.title.match(this.search)
      })
    }
  },
  //局部注册过滤器
  // filters:{
  //   // 'to-uppercase':function(value){
  //   //  return value.toUpperCase()
  //   // }
  //   toUppercase(value){
  //     return value.toUpperCase()
  //   },
  //   'snippet':function(value){
  //       return value.slice(0,100)+"..."
  //   }
  //   },
  //局部注册自定义指令
  // directives:{
  //   'rainbow':{
  //       bind(el,binding,vnode){
  //         el.style.color = "#"+Math.random().toString(16).slice(2,8)
  //       }
  //     },
  //   'theme':{
  //       bind(el,binding,vnode){
  //         if(binding.value == 'wide'){
  //           el.style.maxWidth = "1260px"
  //         }else if(binding.value == 'narrow'){
  //           el.style.maxWidth = '560px'
  //         }

  //         if(binding.arg == 'column'){
  //           el.style.background = '#ddd'
  //           el.style.padding = '10px 10px'
  //         }
  //       }
  //     }

  // }
}
</script>

<style scoped>
#show-blogs{  
  box-shadow: 1px 1px 2px #eee;
}
.single-blog{
  padding: 20px 0;
  box-sizing: border-box;
  border-bottom: solid 1px #eee;
}
#show-blogs a{
  text-decoration: none;
}
.seainpu{
    text-align: right;
}
input{
    border: none;
    padding: 4px 12px;
    background: #eee;
    border-radius: 15px;
}
article{
    padding-top: 10px;
    color: #999;
    font-size: 14px;
}
.cate{
    font-size: 14px;
    color: #999;
    padding-right: 10px;
    font-style: italic;
}
</style>
