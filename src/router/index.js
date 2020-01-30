import Vue from 'vue';
import VueRouter from 'vue-router';
import Twitter from '../views/Twitter';
import Instagram from '../views/Instagram';

Vue.use(VueRouter);

const routes = [
  {
    path: '/social',
    name: 'twitter',
    component: Twitter
  },
  {
    path: '/social/twitter',
    name: 'twitter',
    component: Twitter
  },
  {
    path: '/social/instagram',
    name: 'instagram',
    component: Instagram
  },
  {
    path: '/social/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
