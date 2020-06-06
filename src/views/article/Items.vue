<template>
  <div>
  <li  style="list-style-type: none">
        <span @click="toggle" style="line-height: 60px">
           <img style="border-radius:25px;height: 50px;width: 50px;line-height: 60px" :size="50" :src="this.avatarUrl"/>
          {{ model.name }}
          <span v-if="model.pid==null">评论</span>
          <span v-else>回复</span>
          {{$parent.model1}}
        </span>
    <span style="float: right">
      {{model.time}}
    </span>
    <p>{{model.content}}<span style="float: right"><el-link type="primary" @click="change">回复</el-link></span></p>
    <el-form :model="editForm" :rules="rules" ref="editForm" style="margin-left: 200px;width: 800px" v-show="flag">
      <el-form-item  prop="content">
        <el-input
          style="width: 400px"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入回复内容"
          v-model="editForm.content">
        </el-input>
        <el-button size="small" @click="resetForm('editForm')">重置</el-button>
        <el-button type="primary"
                   size="small"
                   class="title"
                   @click="commitReply(model.aid,model.id)"
                  >保存</el-button>
      </el-form-item>
    </el-form>
    <HR align=center width=300 color=#987cb9 SIZE=1></HR>
    <ul v-if="isFolder" v-show="open">
      <items v-for="(item, index1) in model.child" :model="item" :key="index1">
        {{index}}
      </items>
    </ul>
  </li>

  </div>
</template>

<script>
  import { addReply } from '@/api/Article'
    export default {
        name: "Items",
      props: ['model','index'],
      data() {
        return {
          editForm:{
            content:'',
          },
          flag:false,
          model1:'',
          avatar:'',
          // 控制子列表的显示隐藏
          open: true,
          avatarUrl:require("@/assets/img/avatar.jpg"),
          rules: {
            content: [
              { required: true, message: '请输入回复内容', trigger: 'blur' }
            ],

          },
        }
      },
      created() {
          this.model1=this.model.name
      },
      computed: {
        // 是否还有子列表需要渲染，作为v-if的判断条件
        isFolder() {
          return this.model.child && this.model.child.length
        }
      },
      methods: {
        // 切换列表显示隐藏的方法
        toggle() {
          if(this.isFolder) {
            this.open = !this.open
          }
        },
        commitReply(params1,params2){
          console.log("p1"+params1+"p2"+params2)
          let userId = JSON.parse(sessionStorage.getItem("user"));
          let para={aid:params1,pid:params2,uid:userId.id,content:this.editForm.content}
          addReply(para).then(res=>{
            if(res.status==200){
              this.$message({
                type: 'success',
                message: "提交成功"
              })
              this.resetForm('editForm')
              this.$parent.fatherMethod();
            }else{
              this.$message({
                type: 'error',
                message: "提交失败"
              })
            }
          })
        },
        change(){
            this.flag = !this.flag
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
      }
    }
</script>

<style scoped>

</style>
