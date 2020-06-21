<template>
  <div class="d1">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">欢迎登录(账号密码均为admin)</h3>
      <el-form-item label="账号" prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="form.username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
      </el-form-item>
      <el-checkbox v-model="checked"
                   checked
                   style="margin-left: 40px;margin-bottom: 10px"
                   class="remember">记住密码</el-checkbox>

      <el-form-item>
        <el-button type="primary" v-on:click="handleSubmit2" :loading="logining">登录</el-button>
        <el-button type="warning" v-on:click="handleReset()">重置</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <span>请输入账号和密码</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import { setCookie, getCookie, delCookie } from '../utils/util'
  import axios from 'axios'
  import {login} from '@/api/User'
  export default {
    name: "Login",
    data() {
      return {
        logining:false,
        form: {
          username: '',
          password: ''
        },
        checked: false,
        // 表单验证，需要在 el-form-item 元素中增加 prop 属性
        rules: {
          username: [
            {required: true, message: '账号不可为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不可为空', trigger: 'blur'}
          ]
        },

        // 对话框显示和隐藏
        dialogVisible: false
      }
    },
    created() {
      this.getuserpwd()
    },
    methods: {
      getuserpwd() {
        if (getCookie('user') != '' && getCookie('pwd') != '') {
          this.form.username = getCookie('user')
          this.form.password = getCookie('pwd')
          this.checked = true
        }
      },
      handleSubmit2 (ev) {
        var _this = this;
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = { username: this.form.username, password: this.form.password };
            login(loginParams).then(res =>{
              this.logining = false;
              console.log(res)
              if(res.status==200){
                if (this.checked) {
                  //保存帐号到cookie，有效期7天
                  setCookie('user', this.form.username, 7)
                  //保存密码到cookie，有效期7天
                  setCookie('pwd', this.form.password, 7)
                } else {
                  delCookie('user')
                  delCookie('pwd')
                }
                this.$message({
                  message: '登录成功',
                  type: 'success'
                });
                this.$store.commit("login",res.data.token)
                console.log("success")
                this.$router.push("/echarts/echarts")
              }else{
                this.$message({
                  message: "登录失败",
                  type: "error"
                });
              }

            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      onSubmit(formName) {
        // 为表单绑定验证功能
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
            login(this.form).then(res => {
              console.log(res)
              if(res.status==200){
                this.$message({
                  message: "登录成功",
                  type: "success"
                });
                this.$store.commit("login",res.data.token)
                console.log("success")
                this.$router.push("/echarts/echarts")
              }else{
                this.$message({
                  message: "登录失败",
                  type: "error"
                });
              }
            })
          } else {
            this.dialogVisible = true;
            return false;
          }
        });

      },
      handleReset () {
        this.$refs.form.resetFields();
      },
    }
  }
</script>

<style lang="scss" scoped>
  .login-box {
    border: 1px solid #DCDFE6;
    width: 350px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    /*border-radius: 5px;*/
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    /*box-shadow: 0 0 25px #909399;*/
    border-radius: 5px;
    background: rgba(255, 255, 255, .7);
    box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, .3);
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }
  .d1{
    background-image: url(../assets/img/bgn.png);
    background-size:100% 100%;
    overflow: hidden;
    background-size: cover;
    background-repeat:no-repeat;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
