<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="编号" prop="id">
      <el-input  v-model="ruleForm.id"  readonly></el-input>
    </el-form-item>
    <el-form-item label="分数" prop="score">
      <el-input v-model="ruleForm.score" ></el-input>
    </el-form-item>
    <el-form-item label="时间" prop="time">
      <el-input v-model="ruleForm.time" ></el-input>
    </el-form-item>
    <el-form-item label="题库名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form>
</template>

<script>
  import {save}  from '@/api/Paper'
  export default {
    data() {
      return {
        ruleForm: {
          score: '',
          time: '',
          name: '',
          status:''
        },
        rules: {
          name: [
            { required: true, message: '请输入题库名称', trigger: 'blur' },
          ],
          time: [
            { required: true, message: '请输入时间', trigger: 'blur' },
          ],
          score: [
            { required: true, message: '请输入试卷分数', trigger: 'blur' },
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            console.log(this.ruleForm);
            save(this.ruleForm).then(res=>{
              // console.log(res.data)
              if (res.data=='repeat'){
                this.$alert('此试卷信息已经存在,点击重新输入', '消息', {
                  confirmButtonText: '确定',
                  callback: action => {
                    location.reload();
                  }
                })
              }else {
                this.$alert('添加成功,点击跳转到首页', '消息', {
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
  }
</script>
<style scoped>

</style>
