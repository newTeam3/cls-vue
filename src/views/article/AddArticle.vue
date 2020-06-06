<template>
<div>
  <!--    面包屑导航-->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/article/article' }">文章管理</el-breadcrumb-item>
    <el-breadcrumb-item>发布文章</el-breadcrumb-item>
  </el-breadcrumb>
  <div style="width: 800px">
  <el-form label-width="200px" :model="editForm" :rules="rules" ref="editForm">
    <el-form-item label="文章分类" prop="sid">
      <el-select v-model="editForm.sid" clearable placeholder="请选择文章分类" style="width: 800px" size="small">
        <el-option
          v-for="(item,index) in selectData"
          :key="item.id"
          :label="item.sortName"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="文章标题" prop="title">
      <el-input size="small"  auto-complete="off" style="width: 800px" v-model="editForm.title" placeholder="请输入文章标题"></el-input>
    </el-form-item>
    <el-form-item label="文章内容" prop="content">
    <editor
      v-model="editForm.content"
      api-key="x5n0l0djz5nlbwol5fxxdz06rf6pvhyf7mqef6bbbhkopmbc"
      :init="tinyConfig"
    />
    </el-form-item>
    <el-form-item>
      <el-button @click="resetForm('editForm')">重置</el-button>
      <el-button type="primary"
                 :loading="loading"
                 class="title"
                 @click="handleEdit">保存</el-button>
    </el-form-item>
  </el-form>
  </div>
  <el-dialog title="提交报告" :visible.sync="delVisible" width="30%" @click="closeDialog" center>
    <div class="del-dialog-cnt">确定要提交吗？</div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="closeDialog">取消</el-button>
      <el-button size="small" type="primary" :loading="loading" class="title" @click="commit" >保存</el-button>
    </div>
  </el-dialog>
</div>

</template>

<script>
  import { addArticle,getSort } from '@/api/Article'
  import Editor from '@tinymce/tinymce-vue'
    export default {
        name: "AddArticle",
      components: {
        'editor': Editor
      },
      data(){
          return{
            editForm:{
              sid:'',
              title:'',
              content:'',
            },
            rules: {
              title: [
                { required: true, message: '请输入文章标题', trigger: 'blur' }
              ],
              sid: [
                { required: true, message: '请选择文章分类', trigger: 'blur' }
              ],
              content: [
                { required: true, message: '请输入文章内容', trigger: 'blur' }
              ],
            },
            loading:false,
            selectData:[],
            delVisible:false,
            tinyConfig:{
              language_url: '/static/tinymce/langs/zh_CN.js',
              language: 'zh_CN',
              height: 400,
              width:800,
              menubar: true,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help'
            },
          }
      },
      created() {
        this.getSortData()
      },
      methods:{
          commit(){
            this.loading=true
            let userId = JSON.parse(sessionStorage.getItem("user"));
            let params={title:this.editForm.title,content:this.editForm.content,uid:userId.id,sid:this.editForm.sid}
            addArticle(params).then(res=>{
              this.loading=false
              if(res.status=200){
                this.$message({
                  type: 'success',
                  message: "提交成功"
                })
                this.$router.push("/article/article")
              }else{
                this.$message({
                  type: 'error',
                  message: "提交失败"
                })
              }
            })
          },
        getSortData(){
          getSort().then(res=>{
            this.selectData=res.data
          })
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        handleEdit: function (index, row) {
          this.delVisible = true

        },
        closeDialog() {
            this.delVisible = false
        },
      }
    }
</script>

<style scoped>
  .el-form-item{
    padding-top: 20px;
  }
</style>
