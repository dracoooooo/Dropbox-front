import Vue from 'vue'
import VueRouter from 'vue-router'
import register from "@/views/register";
import login from "@/views/login";
import dropbox from "@/views";
import {checkToken} from "../api/api";

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

router.beforeEach((to, from, next)=>{
  if(to.path === '/login') return next();
  if(to.path === '/register') return next();

  const token = window.sessionStorage.getItem('token');
  if(!token) return next('/login');
  checkToken().then((response)=>{
    if(response.data.success === true)
      return next();
    else return next('/login')
  })

})

export default router
