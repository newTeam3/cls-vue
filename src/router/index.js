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
import College from "../views/college/College";
import Group from "../views/Group/Group";
import Position from "../views/position/Position";

import Question from "../views/questions/Question";
import Answer from "../views/questions/Answer";
//考试模块
import Bank from "../views/Answer/Bank";
import Wor from "../views/Answer/Wor";
import Exam from "../views/Answer/Exam";
import Paper from "../views/Answer/Paper";
import UpdateBank from "../views/Answer/UpdateBank";
import AddBank from "../views/Answer/AddBank";
import AddWor from "../views/Answer/AddWor";
import UpdateWor from "../views/Answer/UpdateWor";
import AddExam from "../views/Answer/AddExam";
import UpdateExam from "../views/Answer/UpdateExam";
import AddPaper from "../views/Answer/AddPaper";
import UpdatePaper from "../views/Answer/UpdatePaper";


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
        {path:'/Answer/Bank',component:Bank},
        {path:'/Answer/Wor',component:Wor},
        {path:'/Answer/Exam',component:Exam},
        {path:'/Answer/Paper',component:Paper},
        {path:'/Answer/UpdateBank',component:UpdateBank},
        {path:'/Answer/AddBank',component:AddBank},
        {path:'/Answer/AddWor',component:AddWor},
        {path:'/Answer/UpdateWor',component:UpdateWor},
        {path:'/Answer/AddExam',component:AddExam},
        {path:'/Answer/UpdateExam',component:UpdateExam},
        {path:'/Answer/Paper',component:Paper},
        {path:'/Answer/AddPaper',component:AddPaper},
        {path:'/Answer/UpdatePaper',component:UpdatePaper},
        {path:'/coll/college',component:College},
        {path:'/cls/classes',component:Classes},
        {path:'/gro/group',component:Group},
        {path:'/pos/position',component:Position},
        {path:'/ques/question',component:Question},
        {path:'/ques/answer',component:Answer}
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
