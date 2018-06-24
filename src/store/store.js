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
		editUserItems(state,data){
			// for(let key in state.UserItems){
			// 	if(state.UserItems[key].id==data){
			// 		if(state.UserItems[key].type==0){
			// 			state.UserItems[key].permission = "管理员"
			// 		}else{
			// 			state.UserItems[key].permission = "会员"
			// 		}
					
			// 	}
			// }
		}
	},
	actions:{

	}
})
