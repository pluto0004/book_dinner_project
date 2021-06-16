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
		userName: "",
	},
	getters: {},

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
		setUserName (state, name) {
			state.userName = name;
		},
		setRegister (state) {
			state.register = !state.register;
		},
		logInAsCooker (state) {
			state.isCooker = true;
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
	},
});
