import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import 'vue-simple-context-menu/dist/vue-simple-context-menu.css'
// import VueSimpleContextMenu from 'vue-simple-context-menu'
import Contextmenu from "vue-contextmenujs"

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Contextmenu)
// Vue.component('vue-simple-context-menu', VueSimpleContextMenu);

var Alert = function (msg, type) {
  this.$message({
    message: msg,
    center: true,
    type: type
  })
}

Vue.prototype.Alert = Alert;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

