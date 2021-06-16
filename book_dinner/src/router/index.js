import Vue from "vue";
import VueRouter from "vue-router";
import App from "../App.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Calendar from "../components/Calendar.vue";
import About from "../views/About.vue";
import CreateReq from "../components/CreateReq.vue";
import ReqList from "../views/ReqList.vue";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);
Vue.use(App);

const routes = [
	{
    path: "/",
    redirect:{name:'About'},
		name: "App",
		components: {
			App,
			Login,
			Register,
		},
	},
	{
		path: "/about",
		name: "About",
		component: About,
	},

	{
		path: "/login",
		name: "Login",
		component: Login,
	},
	{
		path: "/register",
		name: "Register",
		component: Register,
	},
	{
		path: "/calendar",
		name: "Calendar",
		component: Calendar,
		meta: { requiresAuth: true },
	},
	{
		path: "/createreq",
		name: "CreateReq",
		component: CreateReq,
		meta: { requiresAuth: true },
	},
	{
		path: "/reqlist",
		name: "ReqList",
		component: ReqList,
		meta: { requiresAuth: true },
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
	const isAuthenticated = firebase.auth().currentUser;
	if (requiresAuth && !isAuthenticated) {
		next("/login");
	} else {
		next();
	}
});

export default router;
