<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">

    <el-submenu index="2" class="submenu">
      <!-- <template slot="title">{{user.userRealName}}</template> -->
      <template slot="title">
        <i class="el-icon-user-solid"></i>
        <span>超级管理员</span>
      </template>
      <el-menu-item index="2-1">设置</el-menu-item>
      <el-menu-item index="2-2" @click="logout">退出</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
    export default {
        name: "Topnav",
      data() {
        return {
          activeIndex: '1',
          activeIndex2: '1'
        };
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        logout(){
          window.sessionStorage.clear()
          this.$router.push("/login")
        }
      }
    }
</script>

<style scoped>
  .submenu {
    float: right;
  }
</style>
