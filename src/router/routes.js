import MainLayout from "src/layouts/MainLayout.vue";
import IndexPage from "src/pages/IndexPage.vue";

const routes = [
  {
    path: "/auth",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      { path: "login", component: () => import("pages/LoginPage.vue") },
      { path: "register", component: () => import("pages/RegisterPage.vue") },
    ],
  },
  {
    path: "/",
    component: MainLayout,
    children: [{ path: "", component: IndexPage }],
    meta: { requiresAuth: true },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
