<template>
  <div id="add-blog" >

    
    <form action="" v-if="submitie" v-theme:column="'middle'" class="mt-10">
      <div class="dis-box bb pt-5">
        <label class="tit "><i class="iconfont icon-wenxue pl-5"></i>BlOGTITLE:</label>
        <input id="blog_titile" type="text" v-model="blog.title" required="" class="flex-1" />
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
          <div class="dis-box justify-content-between pb-5">
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
              <button @click.prevent="post" class="btn-block bg-grey">AddBlog<i class="iconfont icon-bokenormal  pl-5"></i></button>
          </div> 
      </div>    
           
    </form>

    <div v-if="!submitie" v-theme:column="'middle'">
      <h3  class="pd-10 ">您的博客发布成功！</h3>
    </div>

    <div id="preview" v-theme:column="'middle'">
      <label class="tit">PREVIEW</label>
      <p class="fs20 fw-b ta-c pd-10">{{blog.title}}</p>
      <article class="ti-20 fs14 mb-10">{{blog.content}}</article>
      <label class="fs12 pt-10 fs-inta c9"><span class="pr-10 c9">Author:</span>{{blog.author}}</label>
      </br>
      <label class="pr-10 c9 fs12 fs-inta">Category:</label>
      <label v-for="item in blog.category" class="fs12 fs-inta c9">{{item}}</label>
    </div>

  </div>
</template>

<script>
export default {
  name: 'add-blog',
  data () {
    return {
      blog: {
        title:'',
        content:'',
        category:[],
        author:""
      },
      authors:['请选择','helen','chric','alice'],
      submitie: true
    }
  },
  computed:{
    phone(){
      return this.$store.getters.getAccount
    }
  },
  mounted(){
    document.getElementById('blog_titile').focus();
  },
  methods:{

    post(){ 
      let data ={
        title: this.blog.title,
        content: this.blog.content,
        category: this.blog.category,
        author: this.blog.author,
        phone: this.phone
      }     
      this.$http.post("/Aposts.json",data).then((data)=>{
          this.submitie = false
          setTimeout(()=>{
            this.$router.push('/')
          },1000)
      })
    }
  }
}
</script>

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
