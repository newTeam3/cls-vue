import Vue from 'vue'
import Router from 'vue-router'
import Login from "../views/Login";
import Main from "../views/Main";
import NotFound from "../views/NotFound";
import Userpage from "../views/Userpage";
import User from "../views/user/User";

//用于嵌套的路由组件
import UserProfile from "../views/user/Profile"
import UserList from "../views/user/List"
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
      path:'/goPage',
      name:'Userpage',
      component:Userpage
    },
    {
      // path: '/main/:name',
      path: '/main',
      name:'Main',
      component: Main,
      // props:true,
      children:[
        //如果要使用props传参的方式，要添加props:true
        {path:'/user/profile/:id',name:'UserProfile',component:UserProfile,props:true},
        {path: '/user/list',component: UserList},
        {path:'/user/page',name:'User',component:User},
        ]
    },
    //重定向
    {
      path:'/goHome',
      name:'goHome',
      component: Main
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
