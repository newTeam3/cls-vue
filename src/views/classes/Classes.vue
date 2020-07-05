<template>
  <div>
    <!--    面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/echarts/echarts' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>班级管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    搜索框-->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="formInline.id"  placeholder="输入班级id"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.name" placeholder="输入班级名称"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="formInline.college" clearable placeholder="请选择" size="small">
          <el-option
            v-for="(item,index) in selectData"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
<!--        <el-input size="small" v-model="formInline.name" placeholder="输入班级名称"></el-input>-->
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()" >添加</el-button>
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
       >
      </el-table-column>
      <el-table-column
        prop="name"
        label="班级名"
        >
      </el-table-column>
      <el-table-column
        prop="college.name"
        label="所属学院"
        >
      </el-table-column>
      <el-table-column
        label="当前状态"

        :formatter="stateFormat">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="230">
        <template slot-scope="scope">
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
        <el-form-item label="班级名" prop="name">
          <el-input size="small"  auto-complete="off" v-model="editForm.name" placeholder="请输入班级名称"></el-input>
        </el-form-item>
        <el-form-item label="所属学院" prop="college">
<!--          <el-input size="small"  auto-complete="off" v-model="editForm.college" placeholder="请输入用户密码"></el-input>-->
          <template>
            <el-select v-model="editForm.college" placeholder="请选择">
              <el-option
                v-for="(item,index) in selectData"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </template>
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
  // 导入请求方法的接口
  import { findAllClass,findAllCollege,addClasses,updateClasses,banClasses,banRows } from '@/api/Classes'
  import Pagination from "../public/Pagination";

  export default {
    name: "Classes",
    components: {Pagination},
    data() {
      return {
        //新增及编辑弹窗的标题
        title: '添加',
        //新增及编辑弹窗是否显示
        editFormVisible: false,
        //批量禁用弹窗是否显示
        delVisible:false,
        //数据加载前loading的动画是否显示
        loading: false,
        //新增及编辑弹窗form表单的值
        editForm: {
          id: '',
          name: '',
          college: '',
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
          name: [
            { required: true, message: '请输入班级名称', trigger: 'blur' }
          ],
          college: [{ required: true, message: '请选择所属学院', trigger: 'blur' }]
        },
        //返回给分页组件
        pageparm: {
          currentPage: 1,
          pageSize: 5,
          total: 1
        },
        //表格的内容
        tableData: [],
        //存放添加编辑弹窗中下拉菜单的值
        selectData:[]
      }
    },

    /**
     * 页面加载完即调用
     */
    created:function(){
      this.getData(this.formInline)
      this.getColoege()

    },
    /**
     * 里面的方法只有被调用才会执行
     */
    methods: {
      //将分页参数及查询条件发送到后端，获取查询内容
      async getData(parameter) {

        this.loading = true
        //分页查询
        findAllClass(parameter)
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
      async getColoege() {
        findAllCollege()
          .then(res => {
          if(res.status==200){
            this.selectData=res.data
          }
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
      //模糊查询 将当前页，每页显示条数，搜索框的班级id和班级名称赋值给para,再将para作为getData方法的参数请求后端接口，后端使用pageVO对象接收参数
      search() {
        // console.log(this.formInline.college)
        let para = {page: this.formInline.page,
                    rows:this.formInline.rows,
                    key:{"id":this.formInline.id,
                         "name":this.formInline.name,
                         "cid":this.formInline.college}};
        this.getData(para)
      },
      //新增及编辑的点击事件，判断是新增还是编辑
      handleEdit: function (index, row) {
        // console.log("这是row"+JSON.stringify(row.id))
        this.editFormVisible = true
        if (row != undefined && row != 'undefined') {
                console.log(row.id)
                this.title = '修改'
                this.editForm.id = row.id
                this.editForm.name = row.name
                this.editForm.college = row.college.id
              } else {
                this.title = '添加'
                this.editForm.id = ''
                this.editForm.name = ''
                this.editForm.college = ''
              }
      },
      // 新增的确定按钮
      createData () {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {}).then(() => {
              let para = {name:this.editForm.name,
                          college:{id:this.editForm.college}}
              // // para.birth = !para.birth || para.birth == "" ? "" : date.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
              addClasses(para).then(res => {
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
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm("确认修改吗?", "提示", {}).then(() => {
              let para = {id: this.editForm.id,
                          name:this.editForm.name,
                          college:{id:this.editForm.college}};
              console.log(para)
              // para.birth = !para.birth || para.birth == "" ? "" : date.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
              updateClasses(para).then(res => {
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
          banClasses(para).then(res => {
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
        banRows(para)
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
          const tHeader = ['ID', '班级名称', '所属学院','当前状态'];
          // 上面设置Excel的表格第一行的标题
          const filterVal = ['id', 'name', 'college.id','status'];
          // 上面的index、nickName、name是tableData里对象的属性
          const list = this.tableData;  //把data里的tableData存到list
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '列表excel');
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
