import Vue from "vue";
import Vuex from "vuex";
import { db } from "@/main";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isLoggedIn: false,
		isCooker: false,
		register: false,
		currentUser: [],
		eventLists: [],
	},
	getters: {},

	mounted: {
		async getCurrentUser (state) {
			const user = await firebase.auth().currentUser;
			state.currentUser = user.email.toLowerCase();
		},
	},
	mutations: {
		setRegister (state) {
			state.register = !state.register;
		},
		logInAsCooker (state) {
			state.isCooker = true
		},
		setEventLists (state, lists) {
			state.eventLists = lists;
		},
		setCurrentUser (state, user) {
			state.currentUser = user;
		},
		setLogin (state) {
			state.isLoggedIn = true;
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
