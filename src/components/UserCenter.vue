<template>
  <div v-theme:column="'middle'" id="show-blogs" class="mt-10 blogs">
  	
  	<div class=" bb pt-5 pb-5 mb-5 bg-white">
      <div class="pl-20 fw-b fs20 ta-c">USER CENTER</div>
      
    </div> 
    <div class="dis-box justify-content-between bb pt-5 pb-5 pl-20 bg-white mb-5">
    	<div class=" fs14 fw-b">用户类型：<span class="c-red">{{usertype}}</span></div>
    	<div class="seainpu">
          <input type="text" placeholder="搜索" v-model="search">
          <i class="iconfont icon-sousuo1 c9" @click="gosearch"></i>
      </div>
    </div>
  	<!-- 原本展示 -->
  	<div v-if="localshow" class="bg-white">
	    <div class="allblogs">
	    	<div class="pl-20 pt-5 pb-5 bb fw-b fs14">MY BLOGS</div>
	      <div class="pl-20 pr-20">
	        <div class="single-blog"  v-for="blog in tenBlogs">
	          <router-link :to="'/blog/'+blog.blogid">
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
    <!-- 搜索router-view的复用 -->
    <div v-if="!localshow">
    	<search-blogs></search-blogs>
    </div>
  </div>
</template>

<script>
import SearchBlogs from './SearchBlogs.vue'
export default {
  name: 'show-blogs',
  components:{
  	SearchBlogs
  },
  data(){
    return{
      cuserblogs:[],
      search:'',
      pageSize:10,
      total:20,
      tenBlogs:[],
      filteredBlogs:[],
      localshow:true
    }
  },
 
  created(){
  	// console.log(this.cid)
    this.$http.get('/Aposts/.json').then(res=>{
        console.log(777,res.data)
        let myarr=[]
      for(let key in res.data){
      	res.data[key].blogid =key
      	// console.log(24342,res.data[key])
      	if(res.data[key].cid == this.cid)
      	myarr.push(res.data[key])

      }
    // console.log(12323,myarr)
    this.total = myarr.length
    this.cuserblogs = myarr
    this.tenBlogs = myarr.slice(0,10)
    })    
  },  

  computed:{
  	cid(){
  		return this.$store.state.cid
  	},
  	ctype(){
  		return this.$store.state.ctype
  	},
  	usertype(){
  		if(this.ctype==0){
  			return "会员"
  		}else{
  			return "管理员"
  		}
  	}  	
  },
  methods:{
   
      handleCurrentChange(val) {
        let n = `${val}`
        let start = (n-1)*10
        let end = n*10
        this.tenBlogs = this.cuserblogs.slice(start,end)
        // console.log(858585,this.tenBlogs)
      },
      gosearch(){
      	this.localshow= false;
        this.filteredBlogs = this.cuserblogs.filter((blog)=>{
          return blog.title.match(this.search)
        })
        this.$store.commit('getSearchBlogs',this.filteredBlogs)
        // this.$router.push("/search")
        //可以通过路由传值，但数据是一个对象，浏览器地址会跟上很长一串字符串，故改为vuex传值。
        // this.$router.push({path:'/search',query:{filteredBlogs:this.filteredBlogs}})
      }

  }
 
}
</script>

<style >
#show-blogs{  
  box-shadow: 1px 1px 2px #eee;
  background: #f6f6f6 !important;
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
