import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const store= new Vuex.Store({
	state:{
		LogisShow: null,
		RegisShow: null
	},
	getters:{

	},
	mutations:{
		setPopLog(state,data){
			state.LogisShow = data
		},
		setPopReg(state,data){
			state.RegisShow = data
		},
	},
	actions:{

	}
})
