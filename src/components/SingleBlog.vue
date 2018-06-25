<template>
	<div id="single-blog"  class="bg-ligrey">
		
		<div v-if="msgState" v-theme:column="'middle'" class="bg-white mb-5">
	      <div class="pd-10 fs12 c-red el-icon-warning"><span class="pl-10 c-red">{{stateMessage}}</span></div>
	    </div>
		<div class="rel bg-white">
			<div class="edit">
				<div class="iconfont icon-compile-alt" @click="edit"><span class="fs12 c9 pl-10 fw-b">编辑</span></div>
			</div>
			<div class="fs20 fw-b ta-c pd-20">{{blog.title}}</div>
			<article class="ti-20 fs14 mb-10">{{blog.content}}</article>
			<div class="pd-20">
				<label class="fs12  fs-inta c9"><span class="pr-10 c9">Author:</span>{{blog.author}}</label>
				</br>
				<div class="dis-box justify-content-between ">
					<div>
						<label class="pr-10 c9 fs12 fs-inta">Category:</label>
						<label v-for="item in blog.category" class="fs12 fs-inta c9">{{item}}</label>
					</div>			
					<button @click="deleteBlog" class="btn-block mr-10 fs12 ">删除</button>	
				</div>
			</div>
			
			
			
		</div>
		
		
		
		
		
	</div>
</template>

<script>
	export default {
		name:'single-blog',
		data(){
			return{
				id:this.$route.params.id,
				blog:{},
				blogaccount:'',
				stateMessage:'',
<<<<<<< HEAD
				msgState: false,
				ctype:''
=======
				msgState: false
>>>>>>> parent of 5c1b10b... 增加管理员权限，增加用户注册时间
			}
		},
		computed:{
			loginstatus(){
				return this.$store.state.loginstatus
			},
			phone(){
				return this.$store.state.phone
<<<<<<< HEAD
			},
			
=======
			}
>>>>>>> parent of 5c1b10b... 增加管理员权限，增加用户注册时间
		},
		created(){
			this.$http.get('/Aposts/'+this.id+'.json').then((res)=> {
				// console.log(888,res.data)
				this.blog = res.data
				this.blogaccount = res.data.phone
			})
<<<<<<< HEAD
			
		},
		mounted(){
			this.$http.get('/BlogUsers.json').then(res=>{
				let users = []
				for(let key in res.data){
					users.push(res.data[key])
				}
				// console.log(767,users)
				let result = users.filter((user)=>{
					return user.phone == this.phone
				})
				// console.log(666,result)
				if(result.length>0){
					this.ctype = result[0].ctype
				}return
				

			})
=======
>>>>>>> parent of 5c1b10b... 增加管理员权限，增加用户注册时间
		},
		methods:{
			deleteBlog(){
				if(this.loginstatus == null){
					//未登录让其登录
					this.$store.commit("setPopLog",{LogisShow:true,nav:1})
				}else{
<<<<<<< HEAD
					if(this.ctype==0 && this.blogaccount !== this.phone){
=======
					if(this.blogaccount !== this.phone){
>>>>>>> parent of 5c1b10b... 增加管理员权限，增加用户注册时间
						// console.log('他人文章无权限删除')
						this.msgState = true
						this.stateMessage ="他人文章无权删除!"

					}else{
						this.$http.delete('https://wd2206394391jwoklu.wilddogio.com/Aposts/'+this.id+'.json')
						.then(res=>{
							this.$router.push({path:'/'}) //删除成功跳转到主页
						})
					}
				}
				// if(this.loginstatus == true && this.blogaccount == this.phone){
				// 	this.$http.delete('https://wd2206394391jwoklu.wilddogio.com/Aposts/'+this.id+'.json').then(res=>{
				// 	this.$router.push({path:'/'}) //删除成功跳转到主页
				// 	})
				// }else{
				// 	// console.log('未登录')
				// 	this.$store.commit("setPopLog",{LogisShow:true,nav:1})
				// }				
			},
			edit(){
				// console.log(66,this.phone)
				// console.log(67,this.loginstatus)
				// console.log(77,this.id)
				if(this.loginstatus == null || this.loginstatus == false){
					//未登录让其登录
					this.$store.commit("setPopLog",{LogisShow:true,nav:1})
				}else{
<<<<<<< HEAD
					if( this.ctype==0 && this.blogaccount !== this.phone){
=======
					if(this.blogaccount !== this.phone){
>>>>>>> parent of 5c1b10b... 增加管理员权限，增加用户注册时间
						this.msgState = true
						this.stateMessage ="他人文章无权编辑!"

					}else{
						this.$router.push({path:'/edit',query:{cid:this.id}})
					}
				}
			}
		}
	}
</script>

<style scoped>
	#single-blog{
		/* position: relative; */
		box-sizing: border-box;
		margin: 0 auto;
		padding: 10px 10px 20px;
		max-width: 960px;
	    background: #f6f6f6;
	}
	.edit{
		position: absolute;
		top: 10px;
		left: 10px;
	}
	article{
		text-indent: 20px;
		padding: 10px;
	}
	.tit{
		font-size: 24px;
		padding:10px 0 20px;
		/* font-weight: bold; */
	}
	.bg-ligrey{
		background: #f6f6f6;
	}
</style>