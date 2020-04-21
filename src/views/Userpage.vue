<template>
<div>
  <h2>这是分页</h2>
  <table>
    <tr>
      <td>id</td>
      <td>姓名</td>
      <td>密码</td>
    </tr>
    <tr v-for="(item,index) in info">
     <td>{{ item.id }}</td>
     <td>{{ item.name }}</td>
     <td>{{ item.pwd }}</td>
    </tr>
  </table>

</div>
</template>

<script>
    export default {
        name: "Userpage",
        data:function () {
          return{
            info:{
              id:""
            }
          }
        },
      created:function(){
        this.$axios.get("http://localhost:8081/findAll").then(response =>(this.info = response.data));
      }
    }



</script>

<style scoped>

</style>
