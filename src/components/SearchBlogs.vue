<template>
	<div class="blogs mt-10" v-theme:column="'middle'">
	  <div class="pl-20 fw-b fs18 pd-5 bb">SEARCHED ARTICLES</div>
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
        :page-size="10" 
        :current-page="1"
        layout=" prev, pager, next, jumper"
        :total="total" class="pd-10">
      </el-pagination>
    </div>
</template>
<script>
	export default{
		name:'searchblogs',
		data(){
			return{
				tenBlogs:[]
			}
		},
		computed:{
			filteredBlogs(){
				return this.$store.state.filteredBlogs
			},
			total(){
				return this.filteredBlogs.length
			}

		},
		created(){
			this.tenBlogs = this.filteredBlogs.slice(0,10)
		},
		methods:{
			handleCurrentChange(val) {
		        let n = `${val}`
		        let start = (n-1)*10
		        let end = n*10
		        this.tenBlogs = this.filteredBlogs.slice(start,end)
		        // console.log(858585,this.tenBlogs)
		     },
		}
	}
</script>
<style>
	
</style>