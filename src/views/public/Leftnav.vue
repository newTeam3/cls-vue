<template>

  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
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
          <router-link to="/users/page">内容列表</router-link>
        </el-menu-item>
        <el-menu-item index="1-2">
        <router-link to="/users/page">内容列表</router-link>
      </el-menu-item>
        <el-menu-item index="1-3">
          <router-link to="/users/test">测试列表</router-link>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">小组管理</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-document"></i>
      <span slot="title">学院管理</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">班级管理</span>
    </el-menu-item>
    <el-menu-item index="5">
      <i class="el-icon-setting"></i>
      <span slot="title">职务管理</span>
    </el-menu-item>
    <el-menu-item index="6">
      <i class="el-icon-setting"></i>
      <span slot="title">文章管理</span>
    </el-menu-item>
    <el-menu-item index="7">
      <i class="el-icon-setting"></i>
      <span slot="title">在线答题</span>
    </el-menu-item>
    <el-menu-item index="8">
      <i class="el-icon-setting"></i>
      <span slot="title">公告管理</span>
    </el-menu-item>
    <el-menu-item index="9">
      <i class="el-icon-setting"></i>
      <span slot="title">日周报管理</span>
    </el-menu-item>
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
        }
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
