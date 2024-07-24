import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    alias: "/home",
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/ProfileView.vue"),
    meta: {
      login: true,
    },
  },
  {
    path: "/products",
    name: "products",
    component: () => import("../views/ProductsView.vue"),
  },
  {
    path: "/products/detail/:id",
    name: "productsDetail",
    component: () => import("../views/ProductsDetailView.vue"),
    props: true,
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/CartView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/crud_products",
    name: "crudProduct",
    component: () => import("../views/CrudProductView.vue"),
    meta: {
      admin: true,
    },
  },
  {
    path: "/product/update/:id",
    name: "updateProduct",
    component: () => import("../views/UpdateProductView.vue"),
    meta: {
      admin: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.login) {
    if (store.state.user) {
      next();
    } else {
      alert("Usted no puede acceder a esta vista, necesita estar autenticado");
      next("/login");
    }
  } else if (to.meta.admin) {
    if (store.state.user) {
      if (store.state.user.admin) {
        next();
      } else {
        alert("Vista restringida para usuarios comunes.");
        next("/");
      }
    } else {
      alert("Usted no puede acceder a esta vista, necesita estar autenticado");
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
