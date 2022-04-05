import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TodoList from '@/views/TodoList.vue';
import EditModal from '@/views/EditModal.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: `/:type`,
    component: TodoList,
  },
  {
    path: `/edit/:id`,
    name: 'edit',
    component: EditModal,
  },
  {
    path: `/new`,
    name: 'new',
    component: EditModal,
  },
  {
    path: "/:catchAll(.*)",
    redirect: '/todo',
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
