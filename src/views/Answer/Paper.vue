<template>
  <div>
    <!--    搜索框-->
    <el-form :inline="true"  class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="paper.name"  placeholder="输入题库名称"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="paper.score" placeholder="输入试卷总分数"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search1">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="AddBank">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="papers.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column
        label="分数"
        prop="score"
        v-model="papers.score">
      </el-table-column>
      <el-table-column
        label="时间"
        prop="time"
        v-model="papers.time">
      </el-table-column>
      <el-table-column
        label="题库名称"
        prop="name"
        v-model="papers.name">
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
    <div id="pages" style="text-align: center" >
      <el-tag  type="" size="medium " v-text="'一共'+totals+'条'"  effect="dark"></el-tag>
      <el-button type="primary" size="small" icon="el-icon-arrow-left" @click="search1(page-1)"  v-if="page>1" >&lt;上一页</el-button>
      <el-button type="primary" size="small" @click="search1(indexpage1)" v-for="indexpage1 in totalPage"
                 v-text="indexpage1"></el-button>
      <el-button type="primary" size="small" @click="search1(page+1)" v-if="page<totalPage">下一页&gt;<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </div>
  </div>
</template>

<script>
  import {findAllPaper,updateStatus,findByNameOrScore}  from '@/api/Paper'
  export default {
    name: "Paper",
    data() {
      return {
        papers: [{
          score: '100',
          time: '40',
          name: 'C语言',
          status:'状态'
        },{
          score: '100',
          time: '40',
          name: 'C语言',
          status:'状态'
        }, {
          score: '100',
          time: '40',
          name: 'C语言',
          status:'状态'
        }],
        page: 1,
        rows: 4,
        totalPage: 0,
        totals: 0,
        search: '',
        paper:{
          score:'',
          time:''
        }
      }
    },
    methods: {
      AddBank() {
        this.$router.push({
          path: '/Answer/AddPaper',
        });
      },
      handleEdit(index, row) {
        this.$router.push({
          path: '/Answer/UpdatePaper',
          query: {
            id: row.id
          }
        });
      },
      handleDelete(index) {
        // console.log(index.status);
        // console.log(index.id);
        updateStatus(index.id, index.status).then(res => {
          // console.log(res.data)
          location.reload()
        })

      },
      findAll(indexpage) {
        if (indexpage) {
          this.page = indexpage;
        }
        findAllPaper(this.page).then(res =>{
          console.log(res.data);
          this.papers = res.data.papers;
          this.page = res.data.page;
          this.totalPage = res.data.totalPage;
          this.totals = res.data.totals;

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
      search1(indexpage1){
        // console.log(this.bank)

        if (indexpage1.isTrusted==true) {
          indexpage1=1;
        }
        this.page = indexpage1;
        findByNameOrScore(this.page,this.paper).then(res => {
          // console.log(res.data)
          this.papers = res.data.papers;
          this.page = res.data.page;
          this.totalPage = res.data.totalPage;
          this.totals = res.data.totals;
        });
      }
    },

    created() {
      this.findAll();
    }
  }
</script>

<style scoped>

</style>
