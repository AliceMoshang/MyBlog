import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const store= new Vuex.Store({
	state:{
		LogisShow: null,
		RegisShow: null,
		nav:null,
	},
	getters:{

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
	},
	actions:{

	}
})
