<template>
  <div>
    <!--    搜索框-->
    <el-form :inline="true" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="bank.name" placeholder="输入题库名称"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="bank.bankCount" placeholder="输入题库数量"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search1">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="AddBank">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="banks.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      highlight-current-row v-loading="loading"
      border element-loading-text="拼命加载中"
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
        label="当前状态"
        :formatter="stateFormat">
      </el-table-column>
      <el-table-column
        align="left">
        <template slot="header" slot-scope="scope">
          <div align="center">操作</div>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)" :disabled="scope.row.status===0">修改
          </el-button>
          <el-button
            type="danger" size="small"
            @click="handleDelete(scope.row)" :disabled="scope.row.status===0">禁用
          </el-button>
          <el-button
            type="success" size="small"
            @click="handleDelete(scope.row)" :disabled="scope.row.status===1">启动
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="10" :offset="9">
        <el-pagination
          background
          layout="total,prev, pager, next, jumper, sizes"
          prev-text="上一页"
          next-text="下一页"
          :current-page="page"
          :page-size="size"
          :page-sizes="[2, 4, 6, 8,10]"
          @current-change="findPage"
          @size-change="handleSizeChange"
          :total="totals">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {findNameOrCount, updateStatus} from '@/api/Bank'

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
        size:4,
        totalPage: 0,
        totals: 0,
        search: '',
        bank: {
          name: '',
          bankCount: ''
        },
        loading: false,
      }
    },
    methods: {
      handleSizeChange(size){
        this.size = size;
        this.search1(this.page,size);
      },
      findPage(page) {
        this.page = page;
        this.search1(page,this.size);
      },
      AddBank() {
        this.$router.push({
          path: '/Answer/AddBank',
        });
      },
      handleEdit(index, row) {
        this.$router.push({
          path: '/Answer/UpdateBank',
          query: {
            id: row.id
          }
        });
      },
      handleDelete(index) {

        // console.log(index.status);
        // console.log(index.id);
        updateStatus(index.id, index.status).then(res => {

          // console.log(res.data);
          location.reload()
        })

      },
      //根据查询到status判断，为1则显示启用，为0则禁用
      stateFormat(row) {
        if (row.status === 1) {
          return "启用";
        } else {
          return "禁用";
        }
      },
      search1(page,size) {
        // console.log(this.bank)
        this.loading = true;
        findNameOrCount(this.page,this.size, this.bank).then(res => {
          this.loading = false;
          // console.log(res.data)
          this.banks = res.data.banks;
          this.page = res.data.page;
          this.totalPage = res.data.totalPage;
          this.totals = res.data.totals;
        });
      }
    },
    created() {
      this.search1();
    }
  }
</script>

<style scoped>

</style>
