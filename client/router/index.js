import VueRouter from 'vue-router';
import Vue from 'vue';
import kanban from './kanban';
import stat from './stat';
import graph from './graph';
import Auth from './guards/auth';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'auth.login',
    meta: {
      layout: 'no-menu-layout',
    },
    component: () => import('../pages/login/Index'),
  },
  {
    path: '/',
    redirect: '/assigned',
  },
  {
    path: '/assigned',
    component: () => import('../pages/home/Assigned'),
    name: 'home.assigned',
  },
  ...kanban,
  ...stat,
  ...graph,
];

const router = new VueRouter({
  mode: 'history',
  routes,
  linkExactActiveClass: 'is-active',
});

router.beforeEach((to, from, next) => {
  const target = Auth(to, from);
  return target ? next(target) : next();
});

export default router;
