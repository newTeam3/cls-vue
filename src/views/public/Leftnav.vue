<template>

  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :unique-opened="true"
    style="height: 100%">
    <div class="logobox">
      <img class="logoimg" src="@/assets/img/logo.png" alt="">
    </div>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>用户管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1">
<!--          <router-link :to="{name:'UserProfile',params:{id:1}}">个人信息</router-link>-->
          <router-link to="/users/user">用户管理</router-link>
        </el-menu-item>
        <el-menu-item index="1-2">
        <router-link to="/users/page">内容列表</router-link>
      </el-menu-item>
        <el-menu-item index="1-3">
          <router-link to="/users/test">测试列表</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>


    <el-submenu index="2">
      <template slot="title">
      <i class="el-icon-setting"></i>
      <span slot="title">公共管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1">
          <!--          <router-link :to="{name:'UserProfile',params:{id:1}}">个人信息</router-link>-->
          <i class="el-icon-menu"></i>
          <router-link to="/cls/classes">班级管理</router-link>
        </el-menu-item>
        <el-menu-item index="2-2">
          <!--          <router-link :to="{name:'UserProfile',params:{id:1}}">个人信息</router-link>-->
          <i class="el-icon-menu"></i>
          <router-link to="/coll/college">学院管理</router-link>
        </el-menu-item>
        <el-menu-item index="2-3">
          <!--          <router-link :to="{name:'UserProfile',params:{id:1}}">个人信息</router-link>-->
          <i class="el-icon-menu"></i>
          <router-link to="/gro/group">小组管理</router-link>
        </el-menu-item>
        <el-menu-item index="2-4">
          <!--          <router-link :to="{name:'UserProfile',params:{id:1}}">个人信息</router-link>-->
          <i class="el-icon-menu"></i>
          <router-link to="/pos/position">职称管理</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
      <i class="el-icon-setting"></i>
      <span slot="title">文章管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1">
          <i class="el-icon-menu"></i>
          <router-link to="/article/add">添加文章</router-link>
        </el-menu-item>
        <el-menu-item index="3-2">
        <i class="el-icon-menu"></i>
        <router-link to="/article/sort">文章分类管理</router-link>
      </el-menu-item>
        <el-menu-item index="3-3">
          <i class="el-icon-menu"></i>
          <router-link to="/article/article">文章管理</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span slot="title">在线答题</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="4-1">
          <i class="el-icon-menu"></i>
          <router-link to="/Answer/Bank">题库管理</router-link>
        </el-menu-item>
        <el-menu-item index="4-2">
          <i class="el-icon-menu"></i>
          <router-link to="/Answer/Wor">题目</router-link>
        </el-menu-item>
        <el-menu-item index="4-3">
          <i class="el-icon-menu"></i>
          <router-link to="/Answer/Exam">用户成绩</router-link>
        </el-menu-item>
        <el-menu-item index="4-4">
          <i class="el-icon-menu"></i>
          <router-link to="/Answer/Paper">试卷信息</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">
      <i class="el-icon-setting"></i>
      <span slot="title">任务管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="5-1">
          <i class="el-icon-menu"></i>
          <router-link to="/task/notice">公告管理</router-link>
        </el-menu-item>
        <el-menu-item index="5-2">
          <i class="el-icon-menu"></i>
          <router-link to="/task/task">任务管理</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="6">
      <template slot="title">
      <i class="el-icon-setting"></i>
      <span slot="title">日周报管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="6-1">
          <i class="el-icon-menu"></i>
          <router-link to="/message/dayReport">日报管理</router-link>
        </el-menu-item>
        <el-menu-item index="6-2">
          <i class="el-icon-menu"></i>
          <router-link to="/message/weekReport">周报管理</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="7">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span slot="title">答疑管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="7-1">
          <i class="el-icon-menu"></i>
          <router-link to="/ques/question">问题管理</router-link>
        </el-menu-item>
        <el-menu-item index="7-2">
          <i class="el-icon-menu"></i>
          <router-link to="/ques/answer">回答管理</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="8">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span slot="title">数据报表</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="8-1">
          <i class="el-icon-menu"></i>
          <router-link to="/echarts/echarts">数据报表</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="9">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span slot="title">系统管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="9-1">
          <i class="el-icon-menu"></i>
          <router-link to="/sys/changePwd">修改密码</router-link>
        </el-menu-item>
        <el-menu-item index="8-2" @click="logout">
          <i class="el-icon-menu"></i>
          退出登录
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>

</template>

<script>
    export default {
        name: "Leftnav",
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        logout(){
          window.sessionStorage.clear()
          this.$router.push("/login")
        },
      }
    }
</script>

<style scoped>

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    border: none;
    text-align: left;
  }
  .logobox {
    height: 40px;
    line-height: 40px;
    color: white;
    font-size: 20px;
    text-align: center;
    padding: 20px 0px;
  }
  .logoimg {
    height: 40px;
  }
  a {
    text-decoration: none;
    color: white;
  }


</style>
