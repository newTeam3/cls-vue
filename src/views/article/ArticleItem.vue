<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/article/article' }">文章管理</el-breadcrumb-item>
        <el-breadcrumb-item>文章详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div style="margin: 30px auto;text-align: center;border-bottom: 2px solid rgb(220, 220, 220);">
        <h1>{{articleData.title}}</h1>
        <h4>文章类别：{{articleData.sortName}}</h4>
        <h4>作者：{{articleData.name}}</h4>
        <div v-html="articleData.content">
        </div>
      </div>
      <div style="text-align: center;width: 800px;">
        <el-form label-width="200px" :model="editForm" style="margin-left: 250px" :rules="rules" ref="editForm">
          <el-form-item label="发布评论" prop="content">
            <el-input
              style="width: 400px"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="editForm.content">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm('editForm')">重置</el-button>
            <el-button type="primary"
                       :loading="loading"
                       class="title"
                       @click="handleEdit">保存</el-button>
          </el-form-item>
        </el-form>
      <ul>
        <li v-if="JSON.stringify(commentsData)=='[]'" style="text-align: center;list-style: none"><p style="margin-left: 350px"> <el-link type="success">暂无评论，快来评论吧</el-link></p></li>
        <Items v-else v-for="(model, index) in commentsData" :model="model" :key="index"></Items>

      </ul>
      </div>

<!--      <div v-for="i in commentsData">-->
<!--        <span>{{i.name}}</span>-->
<!--        <div v-if="isFolder" v-for="ii in i.child">-->
<!--          <span>{{ii.name}}</span>-->
<!--        </div>-->
<!--      </div>-->
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
  import { getArticle,getComments,addComments } from '@/api/Article'
  import Items from "./Items";
    export default {
        name: "ArticleItem",
      components: {
        Items,
      },
      data(){
          return{
            id:'',
            delVisible:false,
            loading:false,
            articleData:[],
            commentsData:[],
            editForm:{
                content:'',
            },
            rules: {
              content: [
                { required: true, message: '请输入评论内容', trigger: 'blur' }
              ],
            },
          }
      },
      created() {
        this.id=this.$route.params.id
        let params={id:this.id}
        this.getArticleData(params);
        this.getCommentData(this.id);
      },
      methods:{
        getArticleData(params){
            getArticle(params).then(res=>{
              if(res.status==200){
                console.log(res.data)
                this.articleData=res.data

              }

            })
        },
        getCommentData(params){
          let para={aid:params}
            getComments(para).then(res=>{
              console.log("这是comm"+JSON.stringify(res.data))
              this.commentsData=res.data
              console.log("这是"+JSON.stringify(this.commentsData))
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

        commit(){
          this.delVisible=false
          this.loading=true
          let userId = JSON.parse(sessionStorage.getItem("user"));
          let params={aid:this.id,content:this.editForm.content,uid:userId.id}
          addComments(params).then(res=>{
            this.loading=false
            if(res.status=200){
              this.$message({
                type: 'success',
                message: "提交成功"
              })
              this.getCommentData(this.id)
              this.resetForm('editForm')
            }else{
              this.$message({
                type: 'error',
                message: "提交失败"
              })
            }
          })
        },
        fatherMethod() {
          this.getCommentData(this.id)
        }
      },
    }
</script>

<style scoped>

</style>
