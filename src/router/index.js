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

import Notice from "../views/task/Notice";
import Task from "../views/task/Task";

import DayReport from "../views/message/DayReport";
import WeekReport from "../views/message/WeekReport";

import AddArticle from "../views/article/AddArticle";
import Sort from "../views/article/Sort";
import Article from "../views/article/Article";
import ArticleItem from "../views/article/ArticleItem";

import ChangePwd from "../views/sysSetting/ChangePwd";

import Echarts from "../views/echarts/Echarts";

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
import da from "element-ui/src/locale/lang/da";

import Role from "../views/user/Role";

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
        {path:'/users/user',name:'User',component:User},
        {path:'/users/role',name:'Role',component:Role},
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
        {path:'/ques/answer',component:Answer},
        {path:'/task/notice',component:Notice},
        {path:'/task/task',component:Task},
        {path:'/message/dayReport',component:DayReport},
        {path:'/message/weekReport',component:WeekReport},
        {path:'/echarts/echarts',component:Echarts},
        {path:'/article/add',component:AddArticle},
        {path:'/article/sort',component:Sort},
        {path:'/article/article',component:Article},
        {path:'/article/articleItem/:id',name:'ArticleItem',component:ArticleItem},

        {path:'/sys/changePwd',component:ChangePwd},
      ]
    },
    //重定向
    {
      path:'/goHome',
      name:'goHome',
      redirect: Echarts
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
