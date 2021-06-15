import Vue from "vue";
import VueRouter from "vue-router";
import App from "../App.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Calendar from "../components/Calendar.vue";
import CreateReq from "../components/CreateReq.vue";
import ReqList from "../views/ReqList.vue";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);
Vue.use(App)

const routes = [
  {
    path: "/",
    name: "app",
    components:{
      App,
      Login,
      Register,
    } ,
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
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
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
  console.log(isAuthenticated)
  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
