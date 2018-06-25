import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const store= new Vuex.Store({
	state:{
		LogisShow: null,//登陆界面显示条件 ，app.vue中使用
		RegisShow: null,//注册页面显示条件 ，app.vue中使用
		nav:null, //切换登陆注册的导航状态，登陆注册组件有使用
		success:null,//app.vue中消息提示状态
		msg:'',//app.vue中消息提示的信息内容
		phone:'', //当前登陆的用户
		loginstatus:null,//登陆状态
		UserItems:[],//admin中使用到,注册时候或者在admin添加用户时候写入state里用户信息
<<<<<<< HEAD
		ctype:"",//当前用户的类型，0为普通用户，1为管理员
		filteredBlogs:[]//searchblogs组件需要的数据，点击搜索按钮时候传入该数据
=======
>>>>>>> parent of 5c1b10b... 增加管理员权限，增加用户注册时间
	},
	getters:{
		getLoginstatus: state=>state.loginstatus,
		getAccount: state=>state.phone
	},
	mutations:{
		setPopLog(state,data){
			state.LogisShow = data.LogisShow
			state.nav = data.nav
		},
		setPopReg(state,data){
			state.RegisShow = data.RegisShow
			state.nav = data.nav

		},
		userAction(state,data){

			state.success = data.success
			state.msg = data.msg
			state.loginstatus = data.loginstatus
			state.phone = data.phone
<<<<<<< HEAD
			state.ctype = data.ctype
=======
			

>>>>>>> parent of 5c1b10b... 增加管理员权限，增加用户注册时间
		},
		setUserItems(state,data){
			state.UserItems = data
		},
		addUserItems(state,data){
			state.UserItems.push(data)
		},
		deleteUserItems(state,data){
			state.UserItems.splice(state.UserItems.indexOf(data),1)
		},
		getSearchBlogs(state,data){
			state.filteredBlogs = data
		}
	},
	actions:{

	}
})
