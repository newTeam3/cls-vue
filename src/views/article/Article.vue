<template>
  <div>
    <!--    面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    搜索框-->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="formInline.title"  placeholder="输入文章标题"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="formInline.sid" clearable placeholder="请选择文章分类" size="small">
          <el-option
            v-for="(item,index) in selectData"
            :key="item.id"
            :label="item.sortName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus"><router-link :to="{ path: '/article/add'}">发布文章</router-link></el-button>
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
        prop="sortName"
        label="文章分类"
      >
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="作者"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="发布时间"
      >
      </el-table-column>
      <el-table-column
        prop="quantity"
        label="阅读量"
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
          <el-button type="primary" size="small"><router-link :to="{ name: 'ArticleItem',params:{id:scope.row.id}}">查看</router-link></el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)" :disabled="scope.row.status===0">禁用</el-button>
          <el-button type="success" size="small" @click="handleDelete(scope.$index, scope.row)" :disabled="scope.row.status===1">启用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>

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
  import { findAllArticle,addArticle,updateArticle,banArticle,banArticleRows,getSort } from '@/api/Article'
  import Pagination from "../public/Pagination";

  export default {
    name: "Article",
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
          sid: '',
          title: '',
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
          sortName: [
            { required: true, message: '请输入文章分类名', trigger: 'blur' }
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
        //存放添加编辑弹窗中下拉菜单的值
        selectData:[]
      }
    },

    /**
     * 页面加载完即调用
     */
    created:function(){
      this.getData(this.formInline)
      this.getSortAll()
    },
    /**
     * 里面的方法只有被调用才会执行
     */
    methods: {
      //将分页参数及查询条件发送到后端，获取查询内容
      async getData(parameter) {

        this.loading = true
        //分页查询
        findAllArticle(parameter)
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

      async getSortAll() {
        getSort()
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
          key:{title:this.formInline.title}};
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
          key:{"title":this.formInline.title,
            "sid":this.formInline.sid,
          }};
        this.getData(para)
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
          banArticle(para).then(res => {
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
        banArticleRows(para)
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
          const tHeader = ['ID', '文章标题', '发布时间','发布人','阅读量','文章所属分类','状态'];
          // 上面设置Excel的表格第一行的标题
          const filterVal = ['id', 'title', 'createTime','name','quantity','sortName','status'];
          // 上面的index、nickName、name是tableData里对象的属性
          const list = this.tableData;  //把data里的tableData存到list
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '文章列表excel');
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
  a {
    text-decoration: none;
    color: white;
  }
  .router-link-active {
    text-decoration: none;
  }

</style>
