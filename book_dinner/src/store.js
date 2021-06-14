import Vue from "vue";
import Vuex from "vuex";
import { db } from "@/main";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isLoggedIn: false,
		isCooker: false,
		users: [],
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
	actions: {
		async getUsers () {
			let snapshot = await db.collection("users").get();
			snapshot.forEach((doc) => {
				let appData = doc.data();
				appData.id = doc.id;
				console.log(appData);
				this.state.users.push(appData);
			});
		},
	},
});
