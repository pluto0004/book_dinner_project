import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import store from "./store";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/functions";
import vuetify from "./plugins/vuetify";
import VueTextareaAutosize from "vue-textarea-autosize";

Vue.use(VueTextareaAutosize);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyC3J8G7wo55Qra8IF26KjYckSO4YpJRodM",
	authDomain: "book-dinner-project.firebaseapp.com",
	projectId: "book-dinner-project",
	storageBucket: "book-dinner-project.appspot.com",
	messagingSenderId: "763141006467",
	appId: "1:763141006467:web:7b2a54fec215b041bf27b6",
	measurementId: "G-5SQ652L2BX",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const db = firebase.firestore();
export const func = firebase.functions();
const requestCollection = db.collection("calRequest");

export const createReq = (request) => {
	return requestCollection.add(request);
};

export default {
	onAuth () {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				store.commit("setCurrentUser", user);
				store.commit("setLogin", user.uid ? true : false);
				console.log("firebase.auth is called", store.state.userName);
			}
		});
	},
};

let app;
firebase.auth().onAuthStateChanged(() => {
	if (!app) {
		app = new Vue({
			store,
			router,
			vuetify,
			render: (h) => h(App),
		}).$mount("#app");
	}
});
