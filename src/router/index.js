import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";

const routes = [
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/home",
    name: "Home",
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
