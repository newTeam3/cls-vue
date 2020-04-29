// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from "./vuex/store";
Vue.config.productionTip = false
Vue.use(router);
Vue.use(ElementUI);

Vue.prototype.$axios=axios
axios.defaults.baseURL="http://localhost:8080"
axios.interceptors.request.use(config=>{
  config.headers.Authorization="Bearer "+store.state.token
  console.log(config)
  return config
})
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
      if (store.state.token) {
        next()
      } else {
        next({
          path: '/login',
          query: {redirect: to.fullPath}
        })
      }
    } else {
      next()
    }
  }
)


new Vue({
  el: '#app',
  router,
  store,
  render:h => h(App)
});
