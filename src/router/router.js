import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/components/MainPage";
import ListPage from '@/components/ListPage'

const routes = [
  {
    path: "/",
    component: MainPage,
  },
  {
    path: "/list",
    component: ListPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
