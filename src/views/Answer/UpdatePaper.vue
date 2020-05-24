<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="编号" prop="id">
      <el-input v-model="ruleForm.id" readonly></el-input>
    </el-form-item>
    <el-form-item label="试卷名称" prop="paperName">
      <el-input v-model="ruleForm.paperName"></el-input>
    </el-form-item>
    <el-form-item label="题库组成编号" prop="paperNum">
      <el-input v-model="ruleForm.paperNum"></el-input>
    </el-form-item>
    <el-form-item label="分数" prop="totalScore">
      <el-input v-model="ruleForm.totalScore"></el-input>
    </el-form-item>
    <el-form-item label="时间" prop="time">
      <el-input v-model="ruleForm.time"></el-input>
    </el-form-item>
    <el-form-item label="题库名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form>
</template>

<script>
  import {findOne, update} from '@/api/Paper'

  export default {
    data() {
      return {
        ruleForm: {
          totalScore: '',
          time: '',
          name: '',
          status: '',
          paperNum: '',
          paperName: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入题库名称', trigger: 'blur'},
          ],
          time: [
            {required: true, message: '请输入时间', trigger: 'blur'},
          ],
          score: [
            {required: true, message: '请输入试卷分数', trigger: 'blur'},
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            update(this.ruleForm).then(res => {

              if (res.data == 'fail1') {
                this.$alert('题库中没用该题库名,点击重新输入题库名！', '消息', {
                  confirmButtonText: '确定',
                  callback: action => {
                    location.reload();
                  }
                })
              } else {
                // console.log(res.data)
                this.$alert('修改成功,点击跳转到首页', '消息', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$router.push("/Answer/Paper");
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
    created() {
      findOne(this.$route.query.id).then(res => {
        console.log(res.data);
        this.ruleForm = res.data;
      })
    }
  }
</script>
<style scoped>

</style>
