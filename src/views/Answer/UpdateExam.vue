<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="编号" prop="id">
      <el-input  v-model="ruleForm.id"  readonly></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="username">
      <el-input v-model="ruleForm.username" ></el-input>
    </el-form-item>
    <el-form-item label="题库名称" prop="name">
      <el-input v-model="ruleForm.name" ></el-input>
    </el-form-item>
    <el-form-item label="分数" prop="score">
      <el-input v-model="ruleForm.score"></el-input>
    </el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form>
</template>

<script>
  import {findOne,update}  from '@/api/Exam'
  export default {
    data() {
      return {
        ruleForm: {
          id: '',
          username: '',
          name: '',
          score: '',
        },
        rules: {
          username: [
            { required: true, message: '姓名', trigger: 'blur' },
          ],
          name: [
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
            update(this.ruleForm).then(res=>{
              // console.log(res.data)
              this.$alert('修改成功,点击跳转到首页', '消息', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.push("/Answer/Exam");
                }
              })
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
    created() {
      findOne(this.$route.query.id) .then(res => {
        // console.log(res.data);
        this.ruleForm=res.data;
      })
    }
  }
</script>
<style scoped>

</style>
