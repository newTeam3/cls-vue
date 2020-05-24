<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="编号" prop="id">
      <el-input  v-model="ruleForm.id"  readonly></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="username">
      <el-input v-model="ruleForm.username" ></el-input>
    </el-form-item>
    <el-form-item label="题库名称" prop="paperName">
      <el-input v-model="ruleForm.paperName" ></el-input>
    </el-form-item>
    <el-form-item label="分数" prop="score">
      <el-input v-model="ruleForm.score"></el-input>
    </el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form>
</template>

<script>
  import {save}  from '@/api/Exam'
  export default {
    data() {
      return {
        ruleForm: {
          id: '',
          username: '',
          paperName: '',
          score: '',
        },
        rules: {
          username: [
            { required: true, message: '姓名', trigger: 'blur' },
          ],
          paperName: [
            { required: true, message: '请输入题库名称', trigger: 'blur' },
          ],
          score: [
            { required: true, message: '分数', trigger: 'blur' },
            { min: 0, max: 100, message: '分数在 0 到 100之间 ', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            save(this.ruleForm).then(res=>{
              // console.log(res.data);
              if (res.data=='update'){
                this.$alert('此试卷该学生已经有分数了,点击刷新分数', '消息', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$router.push("/Answer/Exam");
                  }
                })
              }else if (res.data=='fail1'){
                this.$alert('题库中没用该题库名,点击重新输入题库名！', '消息', {
                  confirmButtonText: '确定',
                  callback: action => {
                    location.reload();
                  }
                })
              }else if (res.data=='fail2'){
                this.$alert('查无此学生信息,点击重新输入姓名！', '消息', {
                  confirmButtonText: '确定',
                  callback: action => {
                    location.reload();
                  }
                })
              }else {
                this.$alert('添加成功,点击跳转到首页', '消息', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$router.push("/Answer/Exam");
                  }
                })
              }

            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
  }
</script>
<style scoped>

</style>
