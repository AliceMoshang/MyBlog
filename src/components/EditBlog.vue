<template>
  <div id="add-blog" >

    
    <form action="" v-if="submitie" v-theme:column="'middle'" class="mt-10">
      <div class="dis-box bb pt-5">
        <label class="tit "><i class="iconfont icon-wenxue pl-5"></i>BlOGTITLE:</label>
        <input type="text" v-model="blog.title" required="" class="flex-1" />
      </div> 
      <div class="plr-20">
          <div>
            <label class="tit">CONTENT:</label></br>
            <textarea rows="5" v-model="blog.content"></textarea>
          </div>     
          
          <div class="dis-box bb">
            <label class="fw-b">AUTHOR：</label>
            <!-- <select v-model="blog.author">
              <option v-for="author in authors">{{author}}</option>
            </select> -->
            <input type="text" v-model="blog.author" class="flex-1">
          </div>
          <!-- <div class="dis-box justify-content-between pb-5">
              <div id="checkboxes">
                <label for=""><span class="fw-b pr-10">CATEGORY：</span> Vue.js</label>
                <input type="checkbox" value="Vue.js" v-model="blog.category">
                <label for="">Node.js</label>
                <input type="checkbox" value="Node.js" v-model="blog.category">
                <label for="">React.js</label>
                <input type="checkbox" value="React.js" v-model="blog.category">
                <label for="">Angular4.js</label>
                <input type="checkbox" value="Angular4.js" v-model="blog.category">
              </div>  
              <button @click.prevent="post" class="btn-block bg-grey">Update<i class="iconfont icon-bokenormal  pl-5"></i></button>
          </div>  -->
          <div class="dis-box justify-content-between pb-5 align-item-bottom">
              <div id="checkboxes " class="bb dis-box " style="width: 56%">
                 <span class="fw-b fs14">CATEGORY：</span>
                
                <input type="text" v-model="blog.category" >
              </div>  
              <button @click.prevent="post" class="btn-block bg-grey">Update<i class="iconfont icon-bokenormal  pl-5"></i></button>
          </div> 
      </div>    
           
    </form>

    <div v-if="!submitie" v-theme:column="'middle'">
      <div class="pd-10 fs12 c-red el-icon-info"><span class="pl-10 c-red">您的博客更改成功！</span></div>
    </div>

    <div id="preview" v-theme:column="'middle'">
      <label class="tit">PREVIEW</label>
      <p class="fs20 fw-b ta-c pd-10">{{blog.title}}</p>
      <article class="ti-20 fs14 mb-10">{{blog.content}}</article>
      <div class="pd-20 pb-10">
        <label class="fs12 pt-10 fs-inta c9"><span class="pr-10 c9">Author:</span>{{blog.author}}</label>
        </br>
        <label class="pr-10 c9 fs12 fs-inta">Category:</label>
        <label class="fs12 fs-inta c9">{{blog.category}}</label>
      </div>
      
    </div>

  </div>
</template>

<script>
export default {
  name: 'add-blog',
  data () {
    return {
    	cid:"",
      blog: {},
      authors:['请选择','helen','chric','alice'],
      submitie: true,
      blogid:''
    }
  },
  mounted(){
    // alert(1)
    console.log(443,this.$route.query.blogid)
    if(this.$route.query.blogid){
      this.blogid = this.$route.query.blogid
      console.log(24521,this.blogid)
    }
    console.log(2323,this.blogid)
  	this.fetchData()
  },
  methods:{
  	fetchData(){
  		this.$http.get("/Aposts/"+this.blogid+'.json').then(res=>{
  			console.log(111,res.data)
  			this.blog= res.data
  		})
  	},
    post(){
      this.$http.put("/Aposts/"+this.blogid+'.json',this.blog).then((data)=>{
          console.log(data)
          this.submitie = false
          setTimeout(()=>{
            this.$router.push('/')
          },1000)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#add-blog *{
  margin: 7px 0;
}

form{
  box-sizing: border-box;
  box-shadow: 1px 1px 2px #eee;
  margin-bottom: 2px;

}
.tit{
  font-weight: bold;
  font-size: 14px;
}

label{
  font-size: 14px;
  padding: 0 10px 0 0;
}
#checkboxes input{
  font-size: 12px;
  margin: 0;
} 
#preview{
  box-sizing: border-box;
  box-shadow: 1px 1px 2px #eee;
  padding: 20px;
  margin-bottom: 5px;
}
</style>
