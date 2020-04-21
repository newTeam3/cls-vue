// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.use(router);
Vue.use(ElementUI);
 Vue.use(axios,VueAxios)
Vue.prototype.$axios=axios
axios.defaults.baseURL="http://localhost:8081"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render:h => h(App)
});
