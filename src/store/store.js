import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const store= new Vuex.Store({
	state:{
		LogisShow: null,
		RegisShow: null,
		nav:null,
		success:null,
		msg:'',
		account:'',
		loginstatus:null,
		UserItems:[]
	},
	getters:{
		getLoginstatus: state=>state.loginstatus,
		getAccount: state=>state.account
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
			state.account = data.account

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
