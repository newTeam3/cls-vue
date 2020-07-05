// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from "./vuex/store";
import Blob from './Excel/Blob'
import Export2Excel from './Excel/Export2Excel.js'
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
Vue.use(router);
Vue.use(ElementUI);

Vue.prototype.$axios=axios
axios.defaults.baseURL="http://localhost:8080"
axios.interceptors.request.use(config=>{
  config.headers.Authorization="Bearer "+store.state.token;
  console.log(config);
  return config
}),
  axios.interceptors.response.use(function (response){
    // 处理响应数据
    return response;
  }, function (error) {
    // 处理响应失败
      Vue.prototype.$message.error('用户名和密码错误');

    return Promise.reject(error);
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
