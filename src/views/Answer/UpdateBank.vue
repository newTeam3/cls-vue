<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="编号" prop="id">
      <el-input  v-model="ruleForm.id"  readonly></el-input>
    </el-form-item>
    <el-form-item label="题库名称" prop="name">
      <el-input v-model="ruleForm.name" ></el-input>
    </el-form-item>
    <el-form-item label="题库说明" prop="explain1">
      <el-input v-model="ruleForm.explain1" ></el-input>
    </el-form-item>
    <el-form-item label="题库数量" prop="bankCount">
      <el-input v-model="ruleForm.bankCount" readonly ></el-input>
    </el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form>
</template>

<script>
  import {findOne,update}  from '@/api/Bank'
  export default {
    data() {
      return {
        ruleForm: {
          id: '',
          name: '',
          explain1: '',
          bankCount: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入题库名称', trigger: 'blur' },
          ],
          explain1: [
            { required: true, message: '题库说明', trigger: 'blur' },
            { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
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
              console.log(res.data)
              this.$alert('修改成功,点击跳转到首页', '消息', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.push("/Answer/Bank");
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
     // console.log(this.$route.query.id);
        findOne(this.$route.query.id) .then(res => {
             console.log(res.data);
             this.ruleForm=res.data;
        })
        }

  }
</script>
<style scoped>

</style>
