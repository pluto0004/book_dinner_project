import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import firebase from 'firebase';



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

new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");
