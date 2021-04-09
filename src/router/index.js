import Vue from 'vue'
import VueRouter from 'vue-router'
import register from "@/views/register";
import login from "@/views/login";
import dropbox from "@/views";


Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/',
    name: 'index',
    component: dropbox
  }
]

const router = new VueRouter({
  routes
})

export default router
