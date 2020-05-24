<template>
  <div>
    <!--    搜索框-->
    <el-form :inline="true" class="user-search">
      <el-form-item label="搜索:">
        <el-input size="small" v-model="wor.question" placeholder="输入题目内容"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="wor.name" placeholder="输入题库名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search1">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="AddBank">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="worS.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      highlight-current-row v-loading="loading"
      border element-loading-text="拼命加载中"
      style="width: 100% ">
      <el-table-column
        label="单选，多选"
        prop="questions"
        v-model="worS.questions">
      </el-table-column>
      <el-table-column
        label="题目内容"
        prop="question"
        v-model="worS.question">
      </el-table-column>
      <el-table-column
        label="选项A"
        prop="optionA"
        v-model="worS.optionA">
      </el-table-column>
      <el-table-column
        label="选项B"
        prop="optionB"
        v-model="worS.optionB">
      </el-table-column>
      <el-table-column
        label="选项C"
        prop="optionC"
        v-model="worS.optionC">
      </el-table-column>
      <el-table-column
        label="选项D"
        prop="optionD"
        v-model="worS.optionD">
      </el-table-column>
      <el-table-column
        label="正确答案"
        prop="answer"
        v-model="worS.answer">
      </el-table-column>
      <el-table-column
        label="题目名"
        prop="name"
        v-model="worS.name">
      </el-table-column>
      <el-table-column
        label="当前状态"
        :formatter="stateFormat">
      </el-table-column>
      <el-table-column width="220px"
                       align="right">
        <template slot="header" slot-scope="scope">
          <div align="center">操作</div>
        </template>
        <template slot-scope="scope">
          <el-button
            size="small"
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
  import {findQuestionOrName, updateStatus} from '@/api/Wor'

  export default {
    name: "Wor",
    data() {
      return {
        worS: [{
          questions: '多选',
          question: '题目内容',
          answer: 'D',
          name: 'C语言',
          status: '启动',
          optionA: 'A',
          optionB: 'B',
          optionC: 'C',
          optionD: 'D',
        }, {
          questions: '多选',
          question: '题目内容',
          answer: 'D',
          name: 'C语言',
          status: '启动'
        }, {
          questions: '多选',
          question: '题目内容',
          answer: 'D',
          name: 'C语言',
          status: '启动'
        }],
        page: 1,
        rows: 4,
        size:4,
        totalPage: 0,
        totals: 0,
        search: '',
        wor: {
          question: '',
          name: ''
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
        this.search1(page,this.size)
      },
      AddBank() {
        this.$router.push({
          path: '/Answer/AddWor',
        });
      },
      ViewDetails(index, row) {

      },
      handleEdit(index, row) {
        this.$router.push({
          path: '/Answer/UpdateWor',
          query: {
            id: row.id
          }
        });
      },
      handleDelete(index, row) {

        // console.log(index.status);
        // console.log(index.id);
        updateStatus(index.id, index.status).then(res => {

          // console.log(res.data)
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
      search1(page) {
        this.loading = true;
        // console.log(this.bank)
        // this.page = indexpage1;
        // console.log(this.wor);
        findQuestionOrName(this.page,this.size,this.wor).then(res => {
          this.loading = false;
          console.log(res.data);
          this.worS = res.data.wors;
          this.page = res.data.page;
          this.totalPage = res.data.totalPage;
          this.totals = res.data.totals;
        });
      }
    },
    created() {
      this.search1()
    }
  }
</script>

<style scoped>

</style>
