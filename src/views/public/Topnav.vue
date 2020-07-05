<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :data="userData">

    <el-submenu index="2" class="submenu">
      <!-- <template slot="title">{{user.userRealName}}</template> -->
      <template slot="title">
        <span v-for="i in userData.authorities">
         <span v-show="i.authority=='ROLE_root'">[超级管理员]</span>
          <span v-show="i.authority=='ROLE_admin'">[管理员]</span>
           <span v-show="i.authority=='ROLE_user'">[用户]</span>
<!--          [{{i.authority}}]-->
        </span>
        <i class="el-icon-user-solid"></i>
        <span>{{userData.name}}</span>
      </template>
      <el-menu-item index="2-1">个人资料</el-menu-item>
      <el-menu-item index="2-2">修改密码</el-menu-item>
      <el-menu-item index="2-3" @click="logout">退出</el-menu-item>
    </el-submenu>
  </el-menu>

</template>

<script>
  import { userData } from '@/api/Topnav'
    export default {
        name: "Topnav",
      data() {
        return {
          activeIndex: '1',
          activeIndex2: '1',
          userData:[]
        };
      },
      created:function(){
        this.getData()
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        isShow(i) {
          if(i.authority=='ROLE_root'){
            return '超级管理员';
          }
          if(i.authority=='ROLE_admin'){
            return '管理员';
          }
          if(i.authority=='ROLE_user'){
            return '用户';
          }


        },
        logout(){
          window.sessionStorage.clear()
          this.$router.push("/login")
        },
        async  getData(){
        userData()
        .then(res => {
          console.log("res:"+JSON.stringify(res.data))
          if(res.status==200){
            console.log(res.data)
             let par= JSON.stringify(res.data)
              sessionStorage.setItem('user',par)
              this.userData=res.data
          }
        })
      }
      }
    }
</script>

<style scoped>
  .submenu {
    float: right;
  }
</style>
