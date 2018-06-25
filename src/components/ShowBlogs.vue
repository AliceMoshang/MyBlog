<template>
  <div v-theme:column="'middle'" id="show-blogs" class="mt-10 blogs">
    <div class="dis-box justify-content-between bb pd-5">
      <div class="pl-20 fw-b fs18 ">ARTICLES</div>
      <div class="seainpu">
          <input type="text" placeholder="搜索" v-model="search">
          <i class="iconfont icon-sousuo1 c9" @click="gosearch"></i>
      </div>
    </div> 

    <div class="allblogs">
      <div class="pl-20 pr-20">
        <div class="single-blog"  v-for="blog in tenBlogs">
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

      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="pageSize" 
        :current-page="1"
        layout=" prev, pager, next, jumper"
        :total="total" class="pd-10">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'show-blogs',
  data(){
    return{
      blogs:[],
      search:'',
      pageSize:10,
      total:20,
      tenBlogs:[],
      filteredBlogs:[]
    }
  },
 
  created(){
    this.$http.get('https://wd2206394391jwoklu.wilddogio.com/Aposts.json').then(res=>{
        // console.log(777,res.data)
      let blogsArray = [];
      for (let key in res.data){
        res.data[key].id = key
        blogsArray.push(res.data[key])
      }
      this.blogs = blogsArray 
      this.total = blogsArray.length
      this.tenBlogs = blogsArray.slice(0,10)
      //取数组中的前10个对象，起始index是0，终止Index是10，
      //包含index为0的对象，不包含index为10的对象
    })
  },
  mounted(){
    
  },
  methods:{
   
      handleCurrentChange(val) {
        let n = `${val}`
        let start = (n-1)*10
        let end = n*10
        this.tenBlogs = this.blogs.slice(start,end)
        // console.log(858585,this.tenBlogs)
      },
      gosearch(){
        this.filteredBlogs = this.blogs.filter((blog)=>{
          return blog.title.match(this.search)
        })
        this.$store.commit('getSearchBlogs',this.filteredBlogs)
        this.$router.push("/search")
        //可以通过路由传值，但数据是一个对象，浏览器地址会跟上很长一串字符串，故改为vuex传值。
        // this.$router.push({path:'/search',query:{filteredBlogs:this.filteredBlogs}})
      }

  }
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

<style >
#show-blogs{  
  box-shadow: 1px 1px 2px #eee;
}
.single-blog{
  padding: 20px 0;
  box-sizing: border-box;
  border-bottom: solid 1px #eee;
}
a{
  text-decoration: none;
}
.seainpu{
    text-align: right;
}
.seainpu input{
    border: none;
    padding: 4px 12px;
    background: #eee;
    border-radius: 15px;
}
.blogs article{
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
