<template>
  <div>
    <!--    搜索框-->
    <el-form :inline="true"  class="user-search">
      <el-form-item label="搜索:">
        <el-input size="small"   v-model="wor.question"   placeholder="输入题目内容"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small"  v-model="wor.name"  placeholder="输入题库名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search1">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="AddBank">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="worS.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
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
    <div id="pages" style="text-align: center">
      <el-tag  type="" size="medium " v-text="'一共'+totals+'条'"    effect="dark"></el-tag>
      <el-button type="primary" size="small" icon="el-icon-arrow-left"@click="search1(page-1)" v-if="page>1" >&lt;上一页</el-button>
      <el-button type="primary" size="small" @click="search1(indexpage1)" v-for="indexpage1 in totalPage" :key="indexpage1.id"
                 v-text="indexpage1"></el-button>
      <el-button type="primary" size="small" @click="search1(page+1)" v-if="page<totalPage">下一页&gt;<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </div>
  </div>
</template>

<script>
  import {findAllBank,updateStatus,findQuestionOrName}  from '@/api/Wor'
  export default {
    name: "Wor",
    data() {
      return {
        worS: [{
          questions: '多选',
          question: '题目内容',
          answer: 'D',
          name:'C语言',
          status:'启动',
          optionA:'A',
          optionB:'B',
          optionC:'C',
          optionD:'D',
        }, {
          questions: '多选',
          question: '题目内容',
          answer: 'D',
          name:'C语言',
          status:'启动'
        }, {
          questions: '多选',
          question: '题目内容',
          answer: 'D',
          name:'C语言',
          status:'启动'
        }],
        page: 1,
        rows: 4,
        totalPage: 0,
        totals: 0,
        search: '',
        wor:{
          question: '',
          name:''
        },
      }
    },
    methods: {
      AddBank(){
        this.$router.push({
          path:'/Answer/AddWor',
        });
      },
      ViewDetails(index, row) {

      },
      handleEdit(index, row) {
        this.$router.push({
          path:'/Answer/UpdateWor',
          query:{
            id:row.id
          }
        });
      },
      handleDelete(index, row) {
        // console.log(index.status);
        // console.log(index.id);
        updateStatus(index.id,index.status).then(res=>{
          // console.log(res.data)
          location. reload()
        })

      },
      findAll(indexpage) {
        if (indexpage) {
          this.page = indexpage;
        }
        findAllBank(this.page).then(res => {
          // console.log(res.data);
          this.worS=res.data.wors;
          this.page = res.data.page;
          this.totalPage = res.data.totalPage;
          this.totals = res.data.totals;
        });
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
        // console.log(this.wor);
        findQuestionOrName(this.page,this.wor).then(res => {
          console.log(res.data)
          this.worS = res.data.wors;
          this.page = res.data.page;
          this.totalPage = res.data.totalPage;
          this.totals = res.data.totals;
        });
      }
    },
    created() {
   this.findAll()
    }
  }
</script>

<style scoped>

</style>
