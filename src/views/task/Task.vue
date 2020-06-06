<template>
  <div>
    <!--    面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/echarts/echarts' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>任务管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    搜索框-->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="formInline.content"  placeholder="输入公告内容"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.name" placeholder="输入发布人名字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()" >发布任务</el-button>
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
        :selectable='checkbox'
        width="55"
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
        prop="content"
        label="内容"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="发布时间"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="deadline"
        label="截至时间"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="userVO.name"
        label="发布人"
        width="120"
      >
      </el-table-column>
      <el-table-column
        label="当前状态"
        width="120"
        :formatter="stateFormat">
      </el-table-column>
      <el-table-column
        :formatter="stateFormat2"
        label="报告类型"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="count"
        label="提交数量"
        width="120"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="300">
        <template slot-scope="scope">
          <el-button @click="handleEdit2(scope.$index, scope.row)" type="primary" size="small">查看</el-button>
          <el-button @click="handleEdit(scope.$index, scope.row)" type="primary" size="small">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)" :disabled="scope.row.status===0">禁用</el-button>
          <el-button type="success" size="small" @click="handleDelete(scope.$index, scope.row)" :disabled="scope.row.status===1">启用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>

    <!-- 编辑及新增弹窗 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click="closeDialog" center>
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="报告标题" prop="content">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入报告标题"
            v-model="editForm.content">
          </el-input>
        </el-form-item>
        <el-form-item label="截至时间" prop="deadline">
          <el-date-picker
            v-model="editForm.deadline"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="报告类型" prop="sort">
        <el-select v-model="editForm.sort" clearable placeholder="请选择">
          <el-option
            label="周报"
            :value="1">
          </el-option>
          <el-option

            label="日报"
            :value="0">
          </el-option>
        </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button size="small"
                   type="primary"
                   :loading="loading"
                   class="title"
                   v-if="this.title=='添加'"
                   @click="createData">保存</el-button>
        <el-button size="small"
                   type="primary"
                   :loading="loading"
                   class="title"
                   v-else
                   @click="updateData">修改</el-button>
      </div>
    </el-dialog>

    <el-dialog title="当前提交情况" :visible.sync="editFormVisible2" width="30%" @click="closeDialog" center>
        <div class="li-for" style="text-align: center;">
          <template>
            <table cellspacing=0 cellpadding=0  style="margin: auto">
              <tr>
                <th>已提交</th>
                <th>未提交</th>
              </tr>
              <tr>
                <td>
                  <ul class="infinite-list"  style="overflow:auto;">
                    <!--              <h4>已提交</h4>-->
                    <li style="list-style-type: decimal-leading-zero"  class="infinite-list-item" v-for="i in commitData.commit">
                      <span>{{i.name}}</span>
                    </li>
                  </ul>
                </td>
                <td>
                  <ul class="infinite-list"  style="overflow:auto;">
                    <li style="list-style-type: decimal-leading-zero"  class="infinite-list-item" v-for="i in commitData.uncommit">
                      <span>{{i.name}}</span>
                    </li>
                  </ul>
                </td>
              </tr>
            </table>
          </template>
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
  import { findAllTask,addTask,updateTask,banTask,banTaskRows,findCommitData} from '@/api/task'
  export default {
    name: "Notice",
    components: {Pagination},
    data() {
      return {
        //新增及编辑弹窗的标题
        title: '添加',
        //新增及编辑弹窗是否显示
        editFormVisible: false,

        editFormVisible2: false,
        //批量禁用弹窗是否显示
        delVisible:false,
        //数据加载前loading的动画是否显示
        loading: false,
        //新增及编辑弹窗form表单的值
        editForm: {
          id: '',
          name: '',
          content:'',
          uid:'',
          deadline:'',
          sort:'',
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
            { required: true, message: '请输入日周报标题', trigger: 'blur' }
          ],
          deadline: [
            { required: true, message: '请选择截止时间', trigger: 'blur' }
          ],
          sort: [
            { required: true, message: '请选择报告类型', trigger: 'blur' }
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
        commitData:[],
      }
    },

    /**
     * 页面加载完即调用
     */
    created:function(){
      this.getData(this.formInline)


    },
    /**
     * 里面的方法只有被调用才会执行
     */
    methods: {
      //将分页参数及查询条件发送到后端，获取查询内容
      async getData(parameter) {

        this.loading = true
        //分页查询
        findAllTask(parameter)
          .then(res => {
            // console.log("res:"+JSON.stringify(res.data.list))
            this.loading = false
            if (res.status!=200) {

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
      //分页组件的点击事件，获取分页的属性
      callFather(parm) {
        this.formInline.page = parm.currentPage
        this.formInline.rows = parm.pageSize
        let para = {page: this.formInline.page,
          rows:this.formInline.rows,
          key:{"name":this.formInline.name}};
        this.getData(para)
      },
      //根据查询到status判断，为1则显示启用，为0则禁用
      stateFormat(row) {
        if (row.status === 1) {
          return "启用";
        } else {
          return "禁用";
        }
      },

      stateFormat2(row) {
        if (row.sort === 1) {
          return "周报";
        } else {
          return "日报";
        }
      },
      //模糊查询 将当前页，每页显示条数，搜索框的班级id和班级名称赋值给para,再将para作为getData方法的参数请求后端接口，后端使用pageVO对象接收参数
      search() {
        // console.log(this.formInline.college)
        let para = {page: this.formInline.page,
          rows:this.formInline.rows,
          key:{"content":this.formInline.content,
            "name":this.formInline.name}};
        this.getData(para)
      },
      //新增及编辑的点击事件，判断是新增还是编辑
      handleEdit: function (index, row) {
        // console.log("这是row"+JSON.stringify(row.id))
        this.editFormVisible = true
        if (row != undefined && row != 'undefined') {
          console.log(row.type)
          this.title = '修改'
          this.editForm.id = row.id
          this.editForm.content = row.content
          this.editForm.deadline=row.deadline
          this.editForm.sort=row.sort
        } else {
          this.title = '添加'
          this.editForm.deadline=''
          var userId = JSON.parse(sessionStorage.getItem("user"));
          this.editForm.content = ''
          this.editForm.uid = userId.id
          this.editForm.sort=''
        }
      },

      handleEdit2: function (index, row) {
        this.editFormVisible2 = true
        this.loading = true
        let para = {id: row.id};
        this.findCommit(para)

      },
      findCommit(params){
        findCommitData(params).then(res =>{
          console.log(res.data)
          if(res.status==200){
            this.loading = false
            this.commitData=res.data
          }

        } )
      },
      // 新增的确定按钮
      createData () {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {}).then(() => {
              let para = {userVO:{id:this.editForm.uid},
                content:this.editForm.content,
                deadline:this.editForm.deadline,
                sort:this.editForm.sort
              }
              // // para.birth = !para.birth || para.birth == "" ? "" : date.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
              addTask(para).then(res => {
                console.log("succ")
                if(res.status==200){
                  this.$message({
                    message: "提交成功",
                    type: "success"
                  });
                  this.$refs["editForm"].resetFields();
                  this.editFormVisible = false;
                  this.getData(this.formInline);
                }else{
                  this.$message({
                    message: "提交失败",
                    type: "error"
                  });
                }

              })
            }).catch(err => {
              console.log(e)
            })
          }
        })
      },
      // 编辑的确定按钮
      updateData () {
        console.log(this.editForm.deadline)
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm("确认修改吗?", "提示", {}).then(() => {
              let para = {id: this.editForm.id,
                content:this.editForm.content,
                deadline:this.editForm.deadline,
                sort:this.editForm.sort
              };
              console.log(para)
              // para.birth = !para.birth || para.birth == "" ? "" : date.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
              updateTask(para).then(res => {
                console.log(JSON.stringify(res))
                if(res.status==200){
                  this.$message({
                    message: "提交成功",
                    type: "success"
                  });
                  this.$refs["editForm"].resetFields();
                  this.editFormVisible = false;
                  this.getData(this.formInline);
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
        this.editFormVisible = false
        this.delVisible = false
        this.logIds = ""
      },
      //点击复选框时，将长度赋值给delarr[]
      selsChange(val) {
        this.delarr = val

      },
      //禁用单个用户
      handleDelete(index, row) {
        let i = ""
        if (row.status === 0) {
          i = "确认启用该用户吗?"
        } else if (row.status === 1) {
          i = "确认禁用该用户吗?"
        }
        this.$confirm(i, "提示", {
          type: "warning"
        }).then(() => {
          let para = {id: row.id,
            status:row.status===0?1:0};
          banTask(para).then(res => {
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
        banTaskRows(para)
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
          const tHeader = ['ID', '公告内容', '发布时间','发布人','当前状态'];
          // 上面设置Excel的表格第一行的标题
          const filterVal = ['id', 'content', 'content','userVO','status'];
          // 上面的index、nickName、name是tableData里对象的属性
          const list = this.tableData;  //把data里的tableData存到list
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '公告列表excel');
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

</style>
