import Vue from "vue";
import Vuex from "vuex";
// import { db } from "@/main";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isLoggedIn: false,
		isCooker: false,
	},
	getters: {},
	mutations: {
		setLoggedIn (state) {
			state.isLoggedIn = !state.isLoggedIn;
		},
		logInAsCooker (state) {
			state.isCooker = !state.isCooker;
		},
	},
	actions: {},
});
