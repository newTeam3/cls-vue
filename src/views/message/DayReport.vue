<template>
  <div>
    <!--    面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>日报管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    搜索框-->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-select v-model="formInline.state" clearable placeholder="请选择批阅状态" size="small">
          <el-option
            label="未批阅"
            :value="0">
          </el-option>
          <el-option
            label="已批阅"
            :value="1">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="formInline.id" clearable placeholder="请选择报告任务" size="small">
          <el-option
            v-for="item in selectContent"
            :key="item.id"
            :label="item.content"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <!--        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()" >添加</el-button>-->
        <el-button size="small" type="danger" icon="el-icon-delete" @click="delsels" :disabled="this.delarr.length===0">批量禁用</el-button>
        <el-button size="small" type="warning" icon="el-icon-download" @click="exportExcel" >导出</el-button>
      </el-form-item>
    </el-form>
    <!--    表格-->
    <el-table
      :data="tableData"
      border
      highlight-current-row v-loading="loading"
      border element-loading-text="拼命加载中"
      style="width: 100%;"
      @selection-change="selsChange">
      <el-table-column
        type="selection"
        width="55"
        :selectable='checkbox'
      >
      </el-table-column>
      <el-table-column
        fixed
        prop="id"
        label="ID"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="userVO.name"
        label="姓名"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="time"
        label="时间"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="work"
        label="今日工作内容"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="problem"
        label="遇到的困难"
        width="160"
      >
      </el-table-column>
      <el-table-column
        prop="solve"
        label="解决办法"
        width="160"
      >
      </el-table-column>
      <el-table-column
        prop="summary"
        label="今日总结"
        width="160"
      >
      </el-table-column>
      <el-table-column
        prop="plan"
        label="明日计划"
        width="160"
      >
      </el-table-column>

      <el-table-column
        prop="task.content"
        label="所属任务"
        width="120"
      >
      </el-table-column>
      <el-table-column
        label="是否批阅"
        width="120"

        :formatter="stateFormat2">
      </el-table-column>

      <el-table-column
        label="当前状态"
        width="120"

        :formatter="stateFormat">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="230">
        <template slot-scope="scope">
          <el-button @click="handleEdit2(scope.$index, scope.row)" type="primary" size="small">评阅</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)" :disabled="scope.row.status===0">禁用</el-button>
          <el-button type="success" size="small" @click="handleDelete(scope.$index, scope.row)" :disabled="scope.row.status===1">启用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>

    <el-dialog title="查看" :visible.sync="editFormVisible2" width="50%" @click="closeDialog" center>
      <el-form label-width="120px" :model="editForm" :rules="rules2" ref="editForm">
        <div class="li-for">
          <template>
            <ul class="infinite-list"  style="overflow:auto;height: 100px">
              <li  class="infinite-list-item" v-for="i in answerData">
                <span>{{i.time}}</span>
                <span>{{i.userVO.name}}&nbsp;&nbsp;:</span>
                <span>{{ i.content}}</span>
              </li>
            </ul>
          </template>
        </div>
        <el-form-item label="回复内容" prop="content">

          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="editForm.content">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button size="small"
                   type="primary"
                   :loading="loading"
                   class="title"
                   @click="updateData">提交</el-button>
      </div>
    </el-dialog>

    <!--    批量禁用弹窗-->
    <el-dialog title="批量禁用" :visible.sync="delVisible" width="30%" @click="closeDialog" center>
      <div class="del-dialog-cnt">危险操作，确定禁用吗？</div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="deleteAll" >保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Pagination from "../public/Pagination";
  import { findAllDayReport,evaluate,banMessage,banMessageRows,findEvaluateByMid,getContentAll} from '@/api/Message'
  import Answer from "../questions/Answer";

  export default {
    name: "DayReport",
    components: {Pagination},
    data() {
      return {
        //新增及编辑弹窗的标题
        title: '添加',
        //查看弹窗是否显示
        editFormVisible2:false,
        //批量禁用弹窗是否显示
        delVisible:false,
        //数据加载前loading的动画是否显示
        loading: false,
        //新增及编辑弹窗form表单的值
        editForm: {
          id: '',
          uid:'',
          name: '',
          title:'',
          content:'',
          state:'',
          // token: localStorage.getItem('logintoken')
        },
        //存放id的数组转换后的字符串
        logIds:"",

        //存放批量禁用的id
        delarr:[],
        //分页
        formInline: {
          page: 1,//当前页
          rows: 5,
          // uid: '',
          // name: '',
          //token: localStorage.getItem('logintoken')
        },
        //表单验证
        rules: {
          content: [
            { required: true, message: '请输入回复内容', trigger: 'blur' }
          ],

        },
        rules2: {
          content: [
            {required: true, message: '请输入回复内容', trigger: 'blur'}
          ],
        },
        //返回给分页组件
        pageparm: {
          currentPage: 1,
          pageSize: 5,
          total: 1
        },
        //表格的内容
        tableData: [],
        answerData: [],
        selectContent:[],
      }
    },

    /**
     * 页面加载完即调用
     */
    created:function(){
      this.getData(this.formInline)
      let para = {"sort":0};
      this.getAllContent(para)

    },
    /**
     * 里面的方法只有被调用才会执行
     */
    methods: {
      //将分页参数及查询条件发送到后端，获取查询内容
      async getData(parameter){

        this.loading = true
        //分页查询
        findAllDayReport(parameter)
          .then(res => {
            // console.log("res:"+JSON.stringify(res.data.list))
            this.loading = false
            if (res.status!=200) {
              console.log("呼呼"+JSON.stringify(res.data))
              this.$message({
                type: 'error',
                message: "查询失败"
              })
            } else {
              this.$message({
                message: "查询成功",
                type: "success"
              });
              //将查询到的用户数据赋值给tableData
              this.tableData = res.data.list
              console.log("test:"+JSON.stringify(res.data.list))
              // 将当前第几页每页多少条数据等赋值给pageparm
              this.pageparm.currentPage = this.formInline.page
              this.pageparm.pageSize = this.formInline.rows
              this.pageparm.total = res.data.total
            }
          })
          .catch(err => {
            this.loading = false
            this.$message.error('加载失败，请稍后再试！')
          })
      },

      async getAllContent(params) {
        getContentAll(params)
          .then(res => {
            if(res.status==200){
              this.selectContent=res.data
            }
          })
      },
      //分页组件的点击事件，获取分页的属性
      callFather(parm) {
        this.formInline.page = parm.currentPage
        this.formInline.rows = parm.pageSize
        let para = {page: this.formInline.page,
          rows:this.formInline.rows,
          key:{"id":this.formInline.id,
            "state":this.formInline.state}};
        this.getData(para)
      },
      //根据查询到status判断，为1则显示启用，为0则禁用
      stateFormat(row) {
        if (row.status === 1) {
          return "正常";
        } else {
          return "屏蔽";
        }
      },
      stateFormat2(row) {
        if (row.state === 1) {
          return "已批阅";
        } else {
          return "未批阅";
        }
      },

      //模糊查询
      search() {
        console.log(this.formInline.state)
        let para = {page: this.formInline.page,
          rows:this.formInline.rows,
          key:{"id":this.formInline.id,
            "state":this.formInline.state}};
        this.getData(para)
      },
      //根据qid查询回答
      findEvaluate(params){
        findEvaluateByMid(params).then(res => {
          if(res.status==200){
            this.loading = false
            this.answerData=res.data
            console.log(JSON.stringify(this.answerData))
          }
        })
      },

      handleEdit2: function (index, row) {
        this.editFormVisible2 = true
        this.loading = true
        this.editForm.id = row.id
        var userId = JSON.parse(sessionStorage.getItem("user"));
        this.editForm.uid = userId.id
        this.editForm.content = ''
        let para = {mid: row.id};
        this.findEvaluate(para)
      },
      // 回复的确定按钮
      updateData () {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗?", "提示", {}).then(() => {
              let para = {userVO:{id:this.editForm.uid},
                message:{id:this.editForm.id},
                content:this.editForm.content};
              console.log(para)
              // para.birth = !para.birth || para.birth == "" ? "" : date.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
              evaluate(para).then(res => {
                console.log(JSON.stringify(res))
                if(res.status==200){
                  this.$message({
                    message: "提交成功",
                    type: "success"
                  });
                  this.$refs["editForm"].resetFields();
                  this.editFormVisible = false;
                  // this.getData(this.formInline);
                  console.log("ni"+this.editForm.id)
                  let para = {mid: this.editForm.id};
                  this.findEvaluate(para)
                  this.getData(this.formInline)
                  console.log("success")
                }else{
                  this.$message({
                    message: "提交失败",
                    type: "error"
                  });
                }

              })
            }).catch(err => {
              console.log(err)
            })
          }
        })
      },
      //关闭弹窗
      closeDialog() {
        this.delVisible = false
        this.editFormVisible2=false
        this.logIds = ""
      },
      //点击复选框时，将长度赋值给delarr[]
      selsChange(val) {
        this.delarr = val

      },
      //禁用单个用户
      handleDelete(index, row) {
        let i = ""
        if (row.state === 0) {
          i = "确认启用该日报吗?"
        } else if (row.state === 1) {
          i = "确认禁用该日报吗?"
        }
        this.$confirm(i, "提示", {
          type: "warning"
        }).then(() => {
          let para = {id: row.id,
            status:row.status===0?1:0};
          banMessage(para).then(res => {
            if (res > 0) {
              this.$message({
                message: "操作成功",
                type: "success"
              });
            }

            this.getData(this.formInline);
          })
        }).catch(() => {
        });
      },
      //判断用户的status,如果已被禁用，则该条记录的复选框不能选中
      checkbox(row, index) {
        if (row.status == 0) {
          return 0;
        } else {
          return 1;
        }
      },
      //批量删除按钮的点击事件，将delarr数组转换为string字符串并显示批量删除的弹窗
      delsels() {
        this.logIds = this.delarr.map(item => item.id).toString();
        this.delVisible = true
      },
      //批量删除弹窗点击确定按钮的点击事件
      deleteAll() {
        let para = {"ids": this.logIds};
        banMessageRows(para)
          .then(res => {
            this.loading = false
            if (res.status==200) {
              this.$message.success('操作成功')
            }else{
              this.$message.error('操作失败')
            }
            this.delVisible = false;//关闭删除提示的弹窗
            this.getData(this.formInline)
          });

      },

//导出的方法
      exportExcel() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/Excel/Export2Excel');
          const tHeader = ['ID', '姓名', '时间','今日工作内容','遇到的困难','解决办法','今日总结','明日计划','所属任务','当前状态'];

          // 上面设置Excel的表格第一行的标题
          const filterVal = ['id', 'userVO', 'time','work','problem','solve','summary','plan','task','status'];
          // 上面的index、nickName、name是tableData里对象的属性
          const list = this.tableData;  //把data里的tableData存到list
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '日报列表excel');
        })
      },

      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }
    },



  }
</script>

<style scoped>
  .user-search {
    margin-top: 20px;
  }
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .del-dialog-cnt{
    text-align: center;
    color: red;
    font-size: 18px;
  }
  .infinite-list{
    text-align: center;
  }
  .infinite-list-item{
    margin-top: 10px;
    height: 60px;
    line-height: 60px;
    text-align: left;
    width: 650px;
    background-color: #eef1f0;
    list-style-type: none;
  }
</style>
