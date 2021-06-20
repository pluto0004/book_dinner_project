import Vue from "vue";
import Vuex from "vuex";
import { db } from "@/main";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isLoggedIn: false,
		currentUser: {},
		isCooker: false,
		register: false,
		eventLists: [],
		userEmail: "",
		userColor: "green",
	},
	getters: {
		user: (state) => {
			return state.currentUser;
		},
	},

	mounted: {
		async getCurrentUser (state) {
			const user = await firebase.auth().currentUser;
			state.currentUser = user.email.toLowerCase();
		},
	},
	mutations: {
		setLogin (state, status) {
			state.isLoggedIn = status;
		},
		setCurrentUser (state, user) {
			state.currentUser = user;
		},

		setUserEmail (state, email) {
			state.userName = email;
		},
		setColor (state, color) {
			state.userColor = color;
		},
		setRegister (state) {
			state.register = !state.register;
		},
		logInAsCooker (state, cooker) {
			console.log("cooker called");
			state.isCooker = cooker;
		},
		setEventLists (state, lists) {
			state.eventLists = lists;
		},
	},
	actions: {
		async getUsers () {
			let snapshot = await db.collection("users").get();
			snapshot.forEach((doc) => {
				let appData = doc.data();
				appData.id = doc.id;
				this.state.users.push(appData);
			});
		},
		onAuth ({ commit }) {
			firebase.auth().onAuthStateChanged((user) => {
				user = user ? user : {};
				commit("setCurrentUser", user);
				commit("setLogin", user.uid ? true : false);
				console.log("onAuth called", user, this.state.isCooker, this.state.currentUser.displayName);
			});
		},

	},
});
