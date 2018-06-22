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
		loginstatus:null
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

		}
	},
	actions:{

	}
})
