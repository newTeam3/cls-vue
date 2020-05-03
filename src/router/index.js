import Vue from 'vue'
import Router from 'vue-router'
import Login from "../views/Login";

import NotFound from "../views/NotFound";
import Index from "../views/Index";
//用于嵌套的路由组件
//用户模块组件
import User from "../views/user/User";
import List from "../views/user/List";
//班级管理模块组件
import Classes from "../views/classes/Classes";


Vue.use(Router);

export default new Router({
    mode:'history',
  routes:[
    {
      path:'/login',
      name:'Login',
      component:Login
  },
    {
      path:'/index',
      name:'Index',
      component:Index,
      meta:{
        requireAuth: true
      },
      children:[
        //如果要使用props传参的方式，要添加props:true
        //用户菜单
        {path:'/users/page',name:'User',component:User},
        {path:'/users/test',component:List},
        {path:'/cls/classes',component:Classes}
      ]
    },
    //重定向
    {
      path:'/goHome',
      name:'goHome',
      redirect: Index
    },
    {
      path: '*',
      component: NotFound
    },
    {
      path: '/',
      component: Login
    },
  ]
});
