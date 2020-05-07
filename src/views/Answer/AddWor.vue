<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="编号" prop="id">
      <el-input  v-model="ruleForm.id"  readonly></el-input>
    </el-form-item>
    <el-form-item label="单选，多选" prop="questions">
      <el-input v-model="ruleForm.questions" ></el-input>
    </el-form-item>
    <el-form-item label="题目内容" prop="question">
      <el-input v-model="ruleForm.question" ></el-input>
    </el-form-item>
    <el-form-item label="选项A" prop="optionA">
      <el-input v-model="ruleForm.optionA" ></el-input>
    </el-form-item>
    <el-form-item label="选项B" prop="optionB">
      <el-input v-model="ruleForm.optionB" ></el-input>
    </el-form-item>
    <el-form-item label="选项C" prop="optionC">
      <el-input v-model="ruleForm.optionC" ></el-input>
    </el-form-item>
    <el-form-item label="选项D" prop="optionD">
      <el-input v-model="ruleForm.optionD" ></el-input>
    </el-form-item>
    <el-form-item label="正确答案" prop="answer">
      <el-input v-model="ruleForm.answer"  ></el-input>
    </el-form-item>
    <el-form-item label="题目名" prop="name">
      <el-input v-model="ruleForm.name"  ></el-input>
    </el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form>
</template>

<script>
  import {save}  from '@/api/Wor'
  export default {
    data() {
      return {
        ruleForm: {
          id: '',
          questions: '',
          question: '',
          answer: '',
          name:'',
          optionA:'',
          optionB:'',
          optionC:'',
          optionD:'',
        },
        rules: {
          questions: [
            { required: true, message: '请输入是单选还是多选', trigger: 'blur' },
          ],
          question: [
            { required: true, message: '请输入题目内容', trigger: 'blur' },
          ],
          answer: [
            { required: true, message: '请输入正确答案', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入题目名', trigger: 'blur' },
          ],
          optionA: [
            { required: true, message: '请输入选项A', trigger: 'blur' },
          ],
          optionB: [
            { required: true, message: '请输入选项B', trigger: 'blur' },
          ],
          optionC: [
            { required: true, message: '请输入选项C', trigger: 'blur' },
          ],
          optionD: [
            { required: true, message: '请输入选项D', trigger: 'blur' },
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
              // console.log(res.data)
              if (res.data=='repeat'){
                this.$alert('此题目已经存在,点击重新输入', '消息', {
                  confirmButtonText: '确定',
                  callback: action => {
                    location.reload();
                  }
                })
              }else {
                this.$alert('添加成功,点击跳转到首页', '消息', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$router.push("/Answer/Wor");
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
