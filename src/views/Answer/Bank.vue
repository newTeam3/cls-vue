<template>
  <div>
    <el-button type="success" size="medium" @click="AddBank">添加</el-button>
    <el-table
      :data="banks.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column
        label="题库名称"
        prop="name"
       v-model="banks.name">
      </el-table-column>
      <el-table-column
        label="题库描述"
        prop="explain1"
        v-model="banks.explain1">
      </el-table-column>
      <el-table-column
        label="题库数量"
        prop="bankCount"
        v-model="banks.bankCount">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="ViewDetails(scope.$index, scope.row)" :disabled="scope.row.status===0">查看详情
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)" :disabled="scope.row.status===0">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)" :disabled="scope.row.status===0">禁用
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)" :disabled="scope.row.status===1">启动
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div id="pages" style="text-align: center">
      <el-button type="primary" size="small" icon="el-icon-arrow-left"@click="findAll(page-1)" v-if="page>1" >&lt;上一页</el-button>
      <el-button type="primary" size="small" @click="findAll(indexpage)" v-for="indexpage in totalPage"
         v-text="indexpage"></el-button>
      <el-button type="primary" size="small" @click="findAll(page+1)" v-if="page<totalPage">下一页&gt;<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </div>
  </div>
</template>

<script>
  import {findAllBank,deleteById,updateStatus}  from '@/api/Bank'
  export default {
    name: "Bank",
    data() {
      return {
        banks: [{
          name: 'C语言',
          explain1: 'C语言真的好难',
          bankCount: '2'
        }, {
          name: 'JAVA',
          explain1: 'JAVA实战操作',
          bankCount: '3'
        }, {
          name: '操作系统',
          explain1: '操作系统真的好难',
          bankCount: '5'
        }],
        page: 1,
        rows: 4,
        totalPage: 0,
        totals: 0,
        search: ''

      }
    },
    methods: {
      AddBank(){
        this.$router.push({
          path:'/Answer/AddBank',
        });
      },
      ViewDetails(index, row) {

      },
      handleEdit(index, row) {
        this.$router.push({
          path:'/Answer/UpdateBank',
          query:{
            id:row.id
          }
        });
      },
      handleDelete(index, row) {
        // console.log(index.status);
        // console.log(index.id);
        updateStatus(index.id,index.status).then(res=>{
          console.log(res.data)
          location. reload()
        })

      },
      findAll(indexpage) {
        if (indexpage) {
          this.page = indexpage;
        }
        findAllBank(this.page).then(res => {
              console.log(res.data);
          this.banks=res.data.banks;
          this.page = res.data.page;
          this.totalPage = res.data.totalPage;
          this.totals = res.data.totals;
          });
      },
    },
    created() {
      this.findAll();
    }
  }
</script>

<style scoped>

</style>
