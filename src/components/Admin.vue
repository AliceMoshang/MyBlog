<template>
	<div id="admin" >
		<div class="fs14 fw-b pd-10 c6 mb-5 bg-white title icon-unie612 iconfont"><span class="pl-5">添加用户</span></div>
		<div class="wrapper w-full">
		    
		    <table cellspacing="0">
				<tr class="t_head">
					<th style="width: 82px;">日期</th>
					<th style="width: 120px;">姓名</th>
					<th style="width: 120px;">手机号</th>
					<th style="width: 120px;">密码</th>
					<th style="width: 168px;">邮箱</th>
					<th style="width: 123px;">权限</th>
					<th style="width: 86px;">提交</th>
				</tr>
				<tr >
					<td style="width: 82px;" class="firsticon">{{DateStr}} {{TimeStr}}</td>
					<td style="width: 100px;"><input type="text" placeholder="请输入" v-model="newUsers.name" ></td>
					<td style="width: 100px;">
						<input type="text" placeholder="必填" v-model="newUsers.phone" @blur="checkPhone(newUsers.phone)">
					</td>
					<td style="width: 102px;">
						<input type="text" placeholder="必填" v-model="newUsers.pass" >
					</td>
					<td style="width: 168px;"><input type="text" placeholder="请输入" v-model="newUsers.email" @blur="checkEmail(newUsers.email)"></td>
					<td style="width: 123px;">
						<el-select v-model="newUsers.type" placeholder="必选"  style="width: 100px;">
							<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</td>
					
					<td style="width: 86px;">
						<span class="post el-icon-success pointer" :class="{gogreen:addSuccess}" @click="post"></span>
					</td>
				</tr>
			</table>
		</div>
		<div class="fs14 fw-b pd-10 c6 mb-5 mt-5 bg-white title iconfont icon-ai-users"><span class="pl-5">所有用户</span></div>
		<div class="wrapper w-full">
			
			<table cellspacing="0">
				<tr class="t_head">
					<th style="width: 62px;"></th>
					<th style="width: 130px;">日期</th>
					<th style="width: 100px;">姓名</th>
					<th style="width: 122px;">手机号</th>
					<th style="width: 168px;">邮箱</th>
					<th style="width: 123px;">
						<div class="dis-box justify-content-center">
							<div class="pr-10 c6">权限</div>
							<div class="dis-box flex-direction-column">
								<div class="el-icon-caret-top"></div>
								<div class="el-icon-caret-bottom"></div>
							</div>
						</div>
					</th>
					<th style="width: 90px;">更新修改</th>
					<th style="width: 70px;">编辑</th>
				</tr>
				<tr v-for="item in tableData">
					<td style="width: 62px;" class="firsticon"><span class="el-icon-remove-outline minus pointer" @click="deleteUser(item)"></span></td>
					<td style="width: 130px;">{{item.datestr}} {{item.timestr}}</td>
					<td style="width: 100px;">{{item.name}}</td>
					<td style="width: 122px;">{{item.phone}}</td>
					<td style="width: 168px;">{{item.email}}</td>
					<td style="width: 123px;">
						<el-select v-model="item.type"  style="width: 93px;"  v-bind:disabled="item.hidden">
							<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</td>
					<td style="width: 90px;"><span class="iconfont icon-gengxin pointer fs18" @click="update(item)"></span></td>
					<td style="width: 70px;"><span class="iconfont icon-bianji4 fs16 pointer" @click="modify(item)"></span></td>
				</tr>
			</table>

			<!-- <div class="tips dis-box justify-content-center flex-direction-column" v-if="tipShow">

				<div class="fs14 pb-30 pt-10 el-icon-warning c9"><span class="pl-10 fs14 c6">{{tipMsg}}</span></div>
				<div class="dis-box" >
					<div class="btn-block btn-quit mr-30" @click="quit">取消</div>
					<div class="btn-block btn-confirm" @click="confirm">确认</div>
				</div>
		    </div> -->
		</div>
		<div v-if="botMsg" class="botMsg mt-5 pt-10 pb-10 pl-10 fs12 el-icon-warning c-main" :class="{gogreen:addSuccess}">
		<span class="pl-10 c-main fw-b" :class="{gogreen:addSuccess}">{{botMsg}}</span>
		</div>

		
	
	</div>
</template>

<script>
export default{
	name:'admin',
	data(){
		return{
			DateStr:"",
			TimeStr:"",
			botMsg:'',
			tipShow: false,
			addSuccess: false,
			disabledSelct: false,
			// tableData: [],
	        newUsers:{
	        	name:'',
	        	pass:'',
	        	phone:'',
	        	email:'',
	        	type:'',
	        	DateStr:'',
	        	TimeStr:'',
	        },
	        options:[{
	        		value: '0',
          			label: '会员'
	        	},{
	        		value: '1',
          			label: '管理员'
	        	}],

		}
	},
	created(){
		this.getCtime()		
		setInterval(this.getCtime, 1000);
	},
	computed:{
		tableData(){
			return this.$store.state.UserItems
		}
	},
	mounted(){
		this.$http.get('/BlogUsers.json').then(res=>{
			// console.log(777,res.data)
			let UserArr = []
			for(let key in res.data){
				res.data[key].id = key
				
				UserArr.push(res.data[key])
				
			}
			//请求来的数据设置到vuex
			this.$store.commit('setUserItems',UserArr)
		})

	},
	methods:{
		
		update(item){
			// console.log(645,item)
			let rs_type = ""
			if(item.type==0){
				rs_type = 1
			}else{
				rs_type =0
			}
			this.$http.put('/BlogUsers/'+item.id+'.json',item).then(res=>{
				console.log(7474,res.data)

				this.botMsg = "权限更改成功"
				item.hidden = true

			})
		},
		modify(item){
			item.hidden = !item.hidden
		},
		deleteUser(item){
			
			console.log(777,rs_type)
			this.$http.delete('/BlogUsers/'+item.id+'.json').then(res=>{
				this.$store.commit('deleteUserItems',item)
				 
		})
		},
		checkPhone(Phone){
			let re_phone = checkData('phone',Phone)
			// console.log(661)
				this.botMsg = re_phone.msg
				if(re_phone.status == true){
		          this.$http.get('/BlogUsers.json').then(res=>{
		              // console.log(6666,res.data)
		              for(let key in res.data){
		                if(res.data[key].phone === this.newUsers.phone){
		                  this.botMsg = "该手机已被注册"
		                  return
		                }
		              }
		          })
		          return
		        }
		},
		checkEmail(Email){
			let re_email = checkData('email',Email)
			console.log(888)
				this.botMsg = re_email.msg
				if(re_email.status == true){
		         this.$http.get('/BlogUsers.json').then(res=>{
		              console.log(6666,res.data)
		              for(let key in res.data){
		                // console.log(res.data[key])
		                if(res.data[key].email === this.newUsers.email){
		                  this.botMsg = "该邮箱已被注册"
		                  return
		                }
		              }
		          })
		          return
		        }
		},
		//添加用户
		post(){
			let data = {
				name: this.newUsers.name,
				pass: this.newUsers.pass,
				phone: this.newUsers.phone,
				email: this.newUsers.email,
				type: this.newUsers.type,
				datestr: this.DateStr,
				timestr: this.TimeStr,
			}
			let nec = ['phone','pass','type']
			let res_exist = checkData('complement',data,nec)
			if(!res_exist.status){
				this.botMsg = res_exist.msg
				return
			}

			this.checkPhone(data.phone)
			if(data.email){
				this.checkEmail(data.email)
			}
			
			this.newUsers.hidden = false
			console.log(55,this.newUsers)
			let data1={
				name: data.name,
				pass: data.pass,
				checkpass:"",
				phone: data.phone,
				email: data.email,
				type: data.type,
				datestr: this.DateStr,
				timestr: this.TimeStr,
				hidden: this.newUsers.hidden,
			}
			console.log(44,data1)
			
			this.$http.post('BlogUsers.json',data1).then(res=>{
				this.botMsg = "添加用户成功！"
				// console.log(res.data.name)
				data1.id =res.data.name
				// console.log(999,data1)
				//数据发送到接口并同步到vuex
				this.$store.commit('addUserItems',data1)
				this.addSuccess = true
				this.newUsers.name = ""
				this.newUsers.pass = ""
				this.newUsers.phone = ""
				this.newUsers.email = ""
				this.newUsers.type = ""
			})
		},
		getCtime(){
			let d = new Date()		
			let DateArray =[]		
			DateArray[0] = d.getFullYear()
			DateArray[1] = d.getMonth() +1
			DateArray[2] = d.getDate()
			let DateStr = DateArray.join("/")
			//获取日期DateStr，2018/6/24
			this.DateStr = DateStr
			let TimeArray =[]
			TimeArray[0] = d.getHours()
			TimeArray[1] = d.getMinutes()
			TimeArray[2] = d.getSeconds()
			let TimeStr = TimeArray.join(":")
			//获取时间TimeStr，16：38：39
			this.TimeStr = TimeStr
		}
	}
}	
</script>

<style scoped>
#admin{
	position: relative;
	max-width: 960px;
	background: #f6f6f6;
	margin: 0 auto;
}



.title{
	box-sizing: border-box;
	
}
table{
	background: #fff;
	width: 960px;
	padding: 10px;
}
th{
	font-size: 14px; 
	padding: 10px 0;
	border-bottom: 1px solid #eee;
	text-align: center;
	color: #666;
}
td{
	border-bottom: 1px solid #eee;
	font-size: 14px;
	color: #666;
	margin: 0;
	text-align: center;
}
.firsticon{
	padding:10px 0 10px 10px ;
}
.minus:hover{
	color: #C43;
	font-weight: bold;
}
.t_head{
	background: #f0f9eb;
}
.tips{
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	width: 180px;
	border: 1px solid #ddd;
	padding: 0.83rem;
	background-color: #fff;
	border-radius: 5px;
}
.btn-confirm:hover{
	background: #ccc;
	color: #fff;
}
.btn-quit:hover{
	border: 1px solid #12B8EC;
	background: #eee;
}
.btn-block {
	border-radius: 5px;
	font-size: 14px;
	padding: 5px 10px;
}
input{
	text-align: center;
	color: #666;
	width: 100%;
}

.wrapper{
	overflow: auto;

}
.post{
	color: #666;
}
.gogreen{
	color: #67C23A !important;
}
.botMsg{
	width: 100%;
	box-sizing: border-box;
	color: #666;
	background: #fff;
}
</style>