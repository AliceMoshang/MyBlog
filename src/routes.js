import ShowBlogs from './components/ShowBlogs.vue'
import AddBlog from './components/AddBlog.vue'
import SingleBlog from './components/SingleBlog.vue'
import EditBlog from './components/EditBlog.vue'
import Admin from './components/Admin.vue'
import SearchBlogs from './components/SearchBlogs.vue'
import {store} from './store/store.js'

export default [

	{path:'/admin',component:Admin
	,beforeEnter:(to,from,next)=>{
		if(store.state.loginstatus == true){
			if(store.state.ctype !== 1){
				store.commit('userAction',{success:true,msg:"没有权限查看，请联系管理员。"})
				setTimeout(()=>{
					store.commit('userAction',{success:false,msg:""})

				},1000)
			}else{
				next()
			}
			
		}else{
			// 未登录提示登录
			store.commit('userAction',{success:true,msg:"请登录"})
			setTimeout(()=>{
				store.commit('userAction',{success:false,msg:""},1000)
			})
			store.commit("setPopLog",{LogisShow:true,nav:1})
		}
	}
},
	{path:'/',component:ShowBlogs},
	{path:'/search',component:SearchBlogs},
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
	{path:'/edit',component:EditBlog},

]

