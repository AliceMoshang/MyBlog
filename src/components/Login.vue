<template>
  <div id="login">
  <div class="close el-icon-close" @click="closeLog"></div>
  <div class="dis-box justify-content-center mt-10">
    <div class="navitem" @click="tapnav(true,1)" :class="{on : nav == 1}">登录</div>
    <div class="plr-20 dot fw-b fs12 c9">·</div>
    <div class="navitem" @click="tapnav(false,2)" :class="{on : nav == 2}">注册</div>
  </div>
  <div class="line mb-40">
    <div :class="{dotline: nav== 1}" v-show="nav==1"></div>
    <div :class="{movedot: nav== 2}" v-show="nav==2"></div>
  </div>

  <div class="b b-r-4 ">

    <div class="pd-15 bb dis-box">
      <div class="iconfont icon-dengluyonghu c9"></div>
      <input type="text" placeholder="手机号或者邮箱" class="pl-10 flex-1" v-model="ruleForm2.account" @blur="checkAccount" >
    </div>

    <div class="pd-15 bb dis-box">
      <div class="iconfont icon-mima c9"></div>
      <input type="text" placeholder="密码" class="pl-10 flex-1" v-model="ruleForm2.pass">
    </div>
  </div>

  <div class="notice fs12 c-red" v-if="message">{{message}}</div>
  <div class="btn-block bg-main pd-10 mt-50 mb-20 cf fs14" @click="apply">登录</div>

</div>
</template>

<script>
  export default {
    name:'login',
    data() {
      
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        message:'',
        ruleForm2: {
          pass: '',
          account:'',
          checkpass:''
        },
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
      closeLog(){
        this.$store.commit("setPopLog",false)
      },
      tapnav(boolean,n){
        this.$store.commit("setPopLog",{LogisShow:boolean,nav:n})
        this.$store.commit("setPopReg",{RegisShow:!boolean,nav:n})
      },
      checkAccount(){
        let res1= checkData('account',this.ruleForm2.account)
          this.message = res1.msg
          return
      },
      apply(){
        let data={
          account:this.ruleForm2.account,
          pass:this.ruleForm2.pass,
        }
        let nec = ['account', 'pass']
        let re_account = checkData('account',this.ruleForm2.account)

        //手机号或邮箱字段限制
        if(!re_account.status) {
          this.message = re_account.msg    
          return
        }

        // 必填项不能为空
        let rs = checkData('complement', data, nec)
        if(!rs.status){
          this.message = rs.msg
          return
        }
        this.$http.get('/BlogUsers.json',data).then(res=>{
          console.log(11,res.data)
          let users = []
          for (let key in res.data){
            res.data[key].id = key
            users.push(res.data[key])
          }
          let result = users.filter((user)=>{
            return user.account === this.ruleForm2.account &&
            user.pass === this.ruleForm2.pass
          })
          if(result.length>0){
            this.$store.commit('userAction',
              {success:true,
              msg:"登录成功！",
              })
             setTimeout(()=>{
              this.$store.commit('userAction',{success:false,msg:"",loginstatus:true,
                account:result[0].account})
              this.$store.commit("setPopLog",{LogisShow:false,nav:1})
            },1000)
          }else{
            this.$store.commit('userAction',
              {success:true,
              msg:"用户名或密码错误",
              })
            setTimeout(()=>{
              this.$store.commit('userAction',{success:false,msg:"",loginstatus:false,
                account:""})
            },1000)
          }
         

        })
      }
    }
  }
</script>

<style scoped>
#login{
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
