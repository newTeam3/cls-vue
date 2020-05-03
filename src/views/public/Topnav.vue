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
        <i class="el-icon-user-solid"></i>
        <span>{{userData.username}}</span>
      </template>
      <el-menu-item index="2-1">设置</el-menu-item>
      <el-menu-item index="2-2" @click="logout">退出</el-menu-item>
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
        logout(){
          window.sessionStorage.clear()
          this.$router.push("/login")
        },
        getData(){
        userData()
        .then(res => {
          console.log("res:"+JSON.stringify(res.data))
          if(res.status==200){
              this.userData=res.data
          }
          // this.loading = false
          // if (res.status!=200) {
          //   this.$message({
          //     type: 'error',
          //     message: "查询失败"
          //   })
          // } else {
          //   this.$message({
          //     message: "查询成功",
          //     type: "success"
          //   });
          //   //将查询到的用户数据赋值给tableData
          //   this.tableData = res.data.list
          //   // 将当前第几页每页多少条数据等赋值给pageparm
          //   this.pageparm.currentPage = this.formInline.page
          //   this.pageparm.pageSize = this.formInline.rows
          //   this.pageparm.total = res.data.total
          // }
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
