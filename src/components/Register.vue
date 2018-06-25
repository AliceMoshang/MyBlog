<template>
  <div id="register">
  <div class="close el-icon-close" @click="closeReg"></div>
  <div class="dis-box justify-content-center mt-10">
    <div class="navitem" @click="tapnav(true,1)" :class="{on : nav == 1}">登录</div>
    <div class="plr-20 dot fw-b fs12 c9">·</div>
    <div class="navitem" @click="tapnav(false,2)" :class="{on : nav == 2}">注册</div>
  </div>
  <div class="line mb-15">
    <div :class="{dotline: nav== 1}" v-show="nav==1"></div>
    <div :class="{movedot: nav== 2}" v-show="nav==2"></div>
  </div>

  <div class="b b-r-4 ">

    <div class="pd-15 bb dis-box">
      <div class="iconfont icon-dengluyonghu c9"></div>
      <input type="text" placeholder="手机号" class="pl-10 flex-1" v-model="ruleForm2.phone" @blur="checkAccount" >
    </div>

    <div class="pd-15 bb dis-box">
      <div class="iconfont icon-mima c9"></div>
      <input type="text" placeholder="密码" class="pl-10 flex-1" v-model="ruleForm2.pass">
    </div>

    <div class="pd-15 bb dis-box">
      <div class="iconfont icon-mima c9"></div>
      <input type="text" placeholder="确认密码" class="pl-10 flex-1" v-model="ruleForm2.checkpass">
    </div>

  </div>

  <div class="notice fs12 c-red" v-if="message">{{message}}</div>
  <div class="btn-block bg-main pd-10 mt-40 mb-20 cf fs14" @click="apply">注册</div>

</div>
</template>

<script>
  export default {
    name:'register',
    data() {
      return {
        message:'',
        ruleForm2: {
          pass: '',
          phone:'',
          checkpass:''
        },
        // userExist:""
        users:[]
      }
    },
    mounted(){
        
    },
    computed:{
      nav(){
        return this.$store.state.nav
      }
    },
    methods: {
      closeReg(){
        this.$store.commit("setPopReg",false)
      },
      tapnav(boolean,n){
        this.$store.commit("setPopLog",{LogisShow:boolean,nav:n,phone:null,ctype:""})
        this.$store.commit("setPopReg",{RegisShow:!boolean,nav:n})
      },
      checkAccount(){
        //检查用户名，并限制为手机号
        let res1= checkData('phone',this.ruleForm2.phone)
        this.message = res1.msg
        if(res1.status == true){
          this.$http.get('/BlogUsers.json').then(res=>{
              // console.log(6666,res.data)
              for(let key in res.data){
                // console.log(res.data[key])
                if(res.data[key].phone ===this.ruleForm2.phone){
                  this.message = "用户名已存在"
                  return
                }
              }
          })
          return
        }          
      },
      apply(){
        //获取注册时间
        let re_Ctime = getCtime()
        console.log(4532,re_Ctime)
        let data={
          phone:this.ruleForm2.phone,
          pass:this.ruleForm2.pass,
          checkpass:this.ruleForm2.checkpass,
          name:"",
          email:"",
          ctype:"0",
          datestr:re_Ctime.DateStr,
          timestr:re_Ctime.TimeStr,
          hidden: false,
        }
        console.log(888,data)
        // 必填项不能为空
        let nec = ['phone', 'pass','checkpass']
        let rs = checkData('complement', data, nec)
        if(!rs.status){
          this.message = rs.msg
          return
        }
        //检查2次输入的密码
        if(data.pass !== data.checkpass){
          this.message = "两次输入密码不一致!"
          return
        }else{
          this.message = ""
        }

        //检查用户名，并限制为手机号
        let re_phone = checkData('phone',this.ruleForm2.phone)
        this.message = re_phone.msg

        if(re_phone.status == true){
          this.$http.get('/BlogUsers.json').then((res)=>{
              for(let key in res.data){
                this.users.push(res.data[key])
              }
              let re_user = this.users.filter((user)=>{
                  return user.phone === this.ruleForm2.phone
              })
              console.log(66666,re_user)//为对象组成的数组
              if(re_user.length>0){
                this.message = "用户名已存在!"
                return
              }else{
                console.log(989898,data)
                this.$http.post('/BlogUsers.json',data).then((res)=>{
                  console.log(11,res.data)
                  console.log(24324234,data)

                  this.$store.commit('userAction',{success:true,msg:"注册成功！!"})
                  this.$store.commit('addUserItems',data)

                  setTimeout(()=>{
                    this.$store.commit('userAction',{success:false,msg:""})
                    this.$store.commit("setPopLog",{LogisShow:true,nav:1})
                    this.$store.commit("setPopReg",{RegisShow:false,nav:1})
                  },1000)
                })
              }
          })          
        }return
       
        
        

      }
      
    }
  }
</script>

<style scoped>
#register{
  position: relative;
 
}
.close{
  position: absolute;
  top: -0.8rem;
  right: -0.4rem;
}
.navitem{
  font-weight: bold;
  color: #666;
}
.dot{
  height: 2.5rem;
  line-height: 2.5rem;
}
.navitem.on{
  color: #C43;
  
}
.line{
  height: 1px;
  width: 7.4rem;
  margin: 0 auto; 
/*   background-color: #C43; */
}
.dotline{
  height: 1px;
  width: 2.9rem;
  background-color: #C43;
}
.movedot{
  height: 1px;
  width: 2.9rem;
  background-color: #C43;
  transform:translateX(4.5rem);
}

.notice{
  position: absolute;
  z-index: 44;
  bottom: 3rem;
}
</style>
