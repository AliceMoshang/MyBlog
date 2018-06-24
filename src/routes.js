import ShowBlogs from './components/ShowBlogs.vue'
import AddBlog from './components/AddBlog.vue'
import SingleBlog from './components/SingleBlog.vue'
import EditBlog from './components/EditBlog.vue'
import Admin from './components/Admin.vue'


import {store} from './store/store.js'
export default [
	{path:'/admin',component:Admin,beforeEnter:(to,from,next)=>{
		if(store.state.loginstatus == true){
			// console.log('已登陆')
			next()
		}else{
			// console.log('未登录')
			store.commit("setPopLog",{LogisShow:true,nav:1})
		}
	}},
	{path:'/',component:ShowBlogs},
	{path:'/add',component:AddBlog,beforeEnter:(to,from,next)=>{
		if(store.state.loginstatus == true){
			// console.log('已登陆')
			next()
		}else{
			// console.log('未登录')
			store.commit("setPopLog",{LogisShow:true,nav:1})
		}
	}},
	{path:'/blog/:id',component:SingleBlog},
	{path:'/edit',component:EditBlog
	// beforeEnter:(to,from,next)=>{
		

		// if(store.state.loginstatus == false){
		// 			//未登录让其登录
		// 			this.$store.commit("setPopLog",{LogisShow:true,nav:1})
		// 		}else{
		// 			if(this.store.state.phone !== this.phone){
		// 				// console.log('他人文章无权限删除')
		// 				this.deletestate = true
		// 				this.stateMessage ="他人文章无权限删除!"

		// 			}else{
		// 				axios.delete('https://wd2206394391jwoklu.wilddogio.com/Aposts/'+this.id+'.json')
		// 				.then(res=>{
		// 					this.$router.push({path:'/'}) //删除成功跳转到主页
		// 				})
		// 			}
		// 		}
	// }
},

]

