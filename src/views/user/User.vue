<template>
  <div>
    <!--    面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/echarts/echarts' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    搜索框-->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-select v-model="formInline.cid" clearable placeholder="请选择班级" size="small">
          <el-option
            v-for="(item,index) in selectData.class"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="formInline.gid" clearable placeholder="请选择所属小组" size="small">
          <el-option
            v-for="(item,index) in selectData.group"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
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
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户姓名"
        width="120"
      >
      </el-table-column>
      <el-table-column
        label="性别"
        width="120"
        :formatter="stateFormat2"
      >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="coidName"
        label="所在学院"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="cidName"
        label="所在班级"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="gidName"
        label="所属小组"
        width="120"
      >
      </el-table-column>
<!--      <el-table-column-->
<!--        label="账号角色"-->
<!--        width="120"-->
<!--      >-->
<!--        <template slot-scope="scope">-->
<!--&lt;!&ndash;          {{ scope.row.roles[0].roleName.join(",") }}&ndash;&gt;-->
<!--          <span v-for="i in scope.row.roles">-->
<!--            {{i.roleName}}-->
<!--          </span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column
        prop="pidName"
        label="担任职务"
        width="120"
      >
      </el-table-column>
      <el-table-column
        label="当前状态"
        width="120"

        :formatter="stateFormat">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="300">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click="handleEdit2(scope.$index, scope.row)" type="primary" size="small">角色</el-button>
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
        <el-form-item label="用户名" prop="username">
          <el-input size="small"  auto-complete="off" v-model="editForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input size="small"  auto-complete="off" v-model="editForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input size="small"  auto-complete="off" v-model="editForm.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input size="small"  auto-complete="off" v-model="editForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="editForm.sex" clearable placeholder="请选择性别" size="small">
            <el-option
              label="男"
              :value="1">
            </el-option>
            <el-option
              label="女"
              :value="0">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属学院" prop="coid">
          <el-select v-model="editForm.coid" clearable placeholder="请选择所属学院" size="small">
            <el-option
              v-for="(item,index) in selectData.college"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属班级" prop="cid">
          <el-select v-model="editForm.cid" clearable placeholder="请选择所属班级" size="small">
            <el-option
              v-for="(item,index) in selectData.class"
              v-if="item.college.id==editForm.coid"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属小组" prop="cid">
          <el-select v-model="editForm.gid" clearable placeholder="请选择所属小组" size="small">
            <el-option
              v-for="(item,index) in selectData.group"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="担任职务" prop="pid">
          <el-select v-model="editForm.pid" clearable placeholder="请选择职务" size="small">
            <el-option
              v-for="(item,index) in selectData.position"
              :key="item.id"
              :label="item.name"
              :value="item.id">
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

    <el-dialog title="角色分配" :visible.sync="editFormVisible2" width="30%" @click="closeDialog" :before-close="handleDialogClose" center>
      <el-form label-width="120px" :model="editForm"  ref="editForm">
        <el-form-item label="角色">
          <el-checkbox v-model="checked1" >超级管理员</el-checkbox>
          <el-checkbox v-model="checked2" >管理员</el-checkbox>
          <el-checkbox v-model="checked3" >用户</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button size="small"
                   type="primary"
                   :loading="loading1"
                   class="title"

                   @click="updateRole">保存</el-button>

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
  import { findAllUser,getSearchData,addUser,updateUser,banUser,banUserRows,findRolesByUid,updateRoles } from '@/api/User'
  export default {
    name: "User",
    components: {Pagination},
    data() {
      return {
        uid:'',
        par:'',
        loading1:false,
        checked1:false,
        checked2:false,
        checked3:false,
        classid:[],
        rolesData:[],
        selectData:[],
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
          gid: '',
          cid:'',
          name:'',
          username:'',
          password:'',
          phone:'',
          sex:'',
          coid:'',
          pid:'',
          // token: localStorage.getItem('logintoken')
        },
        //存放id的数组转换后的字符串
        logIds:"",
        updatearr:[],
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
          gid: [
            { required: true, message: '请选择小组', trigger: 'blur' }
          ],
          pid: [
            { required: true, message: '请选择职务', trigger: 'blur' }
          ],
          coid: [
            { required: true, message: '请选择学院', trigger: 'blur' }
          ],
          cid: [
            { required: true, message: '请选择班级', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          username: [
            { required: true, message: '请输入用户名称', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: "请输入手机号", trigger: "blur" },
            // 这个只能验证手机号
            // { pattern:/^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/, message: "请输入合法手机号", trigger: "blur" }
            { pattern:/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: "请输入合法手机号/电话号", trigger: "blur" }
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
      }
    },

    /**
     * 页面加载完即调用
     */
    created:function(){
      this.getData(this.formInline)
      this.getSearch()

    },
    /**
     * 里面的方法只有被调用才会执行
     */
    methods: {
      //将分页参数及查询条件发送到后端，获取查询内容
      async getData(parameter) {

        this.loading = true
        //分页查询
        findAllUser(parameter)
          .then(res => {

            this.loading = false
            if (res.status!=200) {
              console.log("CC"+res.data)
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
              console.log("CC"+JSON.stringify(this.tableData))
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
      async getSearch(){
        getSearchData().then(res=>{
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
          key:{cid:this.formInline.cid,
               gid:this.formInline.gid}};
        this.getData(para)
      },
      handleDialogClose(){
        this.checked1=false
        this.checked2=false
        this.checked3=false
        this.editFormVisible2=false
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
        if (row.sex === 1) {
          return "男";
        } else {
          return "女";
        }
      },
      //模糊查询 将当前页，每页显示条数，搜索框的班级id和班级名称赋值给para,再将para作为getData方法的参数请求后端接口，后端使用pageVO对象接收参数
      search() {
        // console.log(this.formInline.college)
        let para = {page: this.formInline.page,
          rows:this.formInline.rows,
          key:{cid:this.formInline.cid,
            gid:this.formInline.gid}};
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
          this.editForm.username = row.username
          this.editForm.password=row.password
          this.editForm.cid=row.cid
          this.editForm.coid=row.coid
          this.editForm.pid=row.pid
          this.editForm.gid=row.gid
          this.editForm.sex=row.sex
          this.editForm.phone=row.phone
        } else {
          this.title = '添加'
          this.editForm.id = ''
          this.editForm.name = ''
          this.editForm.username = ''
          this.editForm.password=''
          this.editForm.cid=''
          this.editForm.coid=''
          this.editForm.pid=''
          this.editForm.gid=''
          this.editForm.sex=''
          this.editForm.phone=''
        }
      },

      handleEdit2: function (index, row) {
        this.editFormVisible2 = true
        this.uid=row.id
        let p={userId:row.id}
        findRolesByUid(p).then(res=>{
          if(res.status==200){
            this.rolesData=res.data
            for(let i=0;i<this.rolesData.length;i++){
              if(this.rolesData[i].id==1){
                this.checked1=true
              }
              if(this.rolesData[i].id==2){
                this.checked2=true
              }
              if(this.rolesData[i].id==3){
                this.checked3=true
              }
            }
          }
        })

        // this.loading = true
        // this.editForm.id = row.id
        // var userId = JSON.parse(sessionStorage.getItem("user"));
        // this.editForm.uid = userId.id
        // this.editForm.content = ''
        // let para = {qid: row.id};
        // this.findAnswer(para)
      },
      // 新增的确定按钮
      createData () {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {}).then(() => {
              let para = {name:this.editForm.name,
                          username:this.editForm.username,
                          password:this.editForm.password,
                          phone:this.editForm.phone,
                          sex:this.editForm.sex,
                          cid:this.editForm.cid,
                          coid:this.editForm.coid,
                          pid:this.editForm.pid,
                          gid:this.editForm.gid}
              // // para.birth = !para.birth || para.birth == "" ? "" : date.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
              addUser(para).then(res => {
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
      updateRole(){
        console.log(this.checked1)
        if(this.checked1==true){
          this.updatearr.push(1)
        }
        if(this.checked2==true){
          this.updatearr.push(2)
        }
        if(this.checked3==true){
          this.updatearr.push(3)
        }
        this.par=this.updatearr.join()
        let p={ids:this.par,userId:this.uid}
        console.log("par"+this.par)
        updateRoles(p).then(res=>{
          if(res.status==200){
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.editFormVisible2=false
            this.closeDialog()
            window.location.reload(true);
            // this.getData(this.formInline)
          }
        })
      },
      // 编辑的确定按钮
        updateData () {
          this.$refs.editForm.validate(valid => {
            if (valid) {
              this.$confirm("确认修改吗?", "提示", {}).then(() => {
                let para = {
                  id:this.editForm.id,
                  name:this.editForm.name,
                  username:this.editForm.username,
                  password:this.editForm.password,
                  phone:this.editForm.phone,
                  sex:this.editForm.sex,
                  cid:this.editForm.cid,
                  coid:this.editForm.coid,
                  pid:this.editForm.pid,
                  gid:this.editForm.gid};
                console.log(para)
                // para.birth = !para.birth || para.birth == "" ? "" : date.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
                updateUser(para).then(res => {
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
        this.editFormVisible2 = false
        this.delVisible = false
        this.logIds = ""
        this.updatearr=[]
        this.par=""
        this.checked1=false
        this.checked2=false
        this.checked3=false
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
          banUser(para).then(res => {
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
        banUserRows(para)
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
          const tHeader = ['ID', '用户名', '密码','姓名','手机','性别(0:男1：女)','所属学院','所在班级','所在小组','职务','创建时间','当前状态'];
          // 上面设置Excel的表格第一行的标题
          const filterVal = ['id', 'username', 'password','name','phone','sex','coidName','cidName','gidName','pidName','created','status'];
          // 上面的index、nickName、name是tableData里对象的属性
          const list = this.tableData;  //把data里的tableData存到list
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '用户列表excel');
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
