<template>
  <div>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      fixed
      prop="id"
      label="ID"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="pwd"
      label="省份"
      width="120">
    </el-table-column>
    <el-table-column
      prop=""
      label="市区"
      width="120">
    </el-table-column>
    <el-table-column
      prop=""
      label="地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop=""
      label="邮编"
      width="120">
    </el-table-column>
    <el-table-column
      prop=""
      label="邮编"
      width="120">
    </el-table-column>
    <el-table-column
      prop=""
      label="邮编"
      width="120">
    </el-table-column>
    <el-table-column
      prop=""
      label="邮编"
      width="120">
    </el-table-column>
    <el-table-column
      prop=""
      label="邮编"
      width="120">
    </el-table-column>
    <el-table-column
      prop=""
      label="邮编"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="1000"
    >
  </el-pagination>
  </div>
</template>

<script>
    export default {
        name: "User",
      methods: {
        handleClick(row) {
          console.log(row);
        }
      },
      data() {
        return {
          tableData: [
      //    {date: '2016-05-02',
      //     name: '王小虎',
      //     province: '上海',
      //     city: '普陀区',
      //     address: '上海市普陀区金沙江路 1518 弄',
      //     zip: 200333
      // }, {
      //     date: '2016-05-04',
      //       name: '王小虎',
      //       province: '上海',
      //       city: '普陀区',
      //       address: '上海市普陀区金沙江路 1517 弄',
      //       zip: 200333
      //   }, {
      //     date: '2016-05-01',
      //       name: '王小虎',
      //       province: '上海',
      //       city: '普陀区',
      //       address: '上海市普陀区金沙江路 1519 弄',
      //       zip: 200333
      //   }, {
      //     date: '2016-05-03',
      //       name: '王小虎',
      //       province: '上海',
      //       city: '普陀区',
      //       address: '上海市普陀区金沙江路 1516 弄',
      //       zip: 200333
      //   }
          ]

        }
      },
      created:function(){
        this.$axios.get("/findAll").then(response =>(this.tableData = response.data));
      }
    }
</script>

<style scoped>

</style>
