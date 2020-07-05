<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/echarts/echarts' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>修改密码</el-breadcrumb-item>
      </el-breadcrumb>
      <div style="width: 800px;margin: 30px auto">
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="输入手机号" prop="phone">
        <el-input v-model="editForm.phone" @blur="checkPhone()" placeholder="请输入手机号" style="width: 70%"></el-input>

        <el-button icon="el-icon-mobile-phone" @click="send" style="width: 20%" type="success" :disabled="disabled=!show" >
          <span v-show="show">获取验证码</span>
          <span v-show="!show" class="count">{{count}} s</span>
        </el-button>
          <p class="p1" :style="style">{{errorPhone}}</p>
      </el-form-item>
        <el-form-item label="输入验证码" prop="code">
          <el-input v-model="editForm.code" @blur="checkCode()" placeholder="请输入验证码" style="width: 70%"></el-input>
          <p class="p1" :style="style1">{{errorCode}}</p>
        </el-form-item>

        <el-form-item label="输入新密码" prop="pwd">
          <el-input v-model="editForm.pwd" show-password placeholder="请输入新密码" style="width: 70%"></el-input>
          <p class="p1" :style="style3"></p>
        </el-form-item>
        <el-form-item label="请再次输入密码" prop="confirm">
          <el-input v-model="editForm.confirm" show-password @blur="checkPwd()" placeholder="请确认新密码" style="width: 70%"></el-input>
          <p class="p1" :style="style2">{{errorPwd}}</p>
        </el-form-item>
        <el-form-item>
        <el-button  @click="resetForm('editForm')">重置</el-button>
        <el-button  type="primary" :loading="loading" class="title" @click="commit" :disabled="iscommit">提交</el-button>
        </el-form-item>
      </el-form>
      </div>
    </div>
</template>

<script>
  import { checkPhone,send,checkCode,changePwd } from '@/api/User'
    export default {
        name: "ChangePwd",
      data(){
        return {
          id:'',
          loading:false,
          style:{
            color:'',

          },
          style1:{
            color:'',

          },
          style2:{
            color:'',

          },
          style3:{
            color:'',

          },
          errorPwd:'',
          errorCode:'',
          errorPhone:'',
          editForm:{
            phone:'',
            code:'',
            pwd:'',
            confirm:'',
          },
          show: true,  // 初始启用按钮
          count: '',   // 初始化次数
          timer: null,
          rules: {
            phone: [
              { required: true, message: '请输入手机号', trigger: 'blur' }
            ],
            code: [
              { required: true, message: '请输入验证码', trigger: 'blur' }
            ],

          },
        }
      },
      created() {
        let userId = JSON.parse(sessionStorage.getItem("user"));
          this.id=userId.id
      },
      computed: {

        iscommit() {

          return !this.editForm.phone && !this.editForm.code&&!this.editForm.pwd&&!this.editForm.confirm

        }

      },
      methods:{
        send(){
          const TIME_COUNT = 300;
          let params={phone:this.editForm.phone}
          send(params).then(res=>{
            if(res.data=='success'){
              this.$message({
                message: "发送成功，请注意查收",
                type: "success"
              })
            }else if(res.data=='error'){
              this.$message({
                message: "发送失败",
                type: "error"
              })
            }else {
              this.$message({
                message: "当前验证码已存在，请勿频繁操作",
                type: "error"
              })
            }
          })
          if (!this.timer) {
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--;
              } else {
                this.show = true;
                clearInterval(this.timer);  // 清除定时器
                this.timer = null;
              }
            }, 1000)
          }
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        checkPhone(){

          let params={id:this.id,phone:this.editForm.phone}
          checkPhone(params).then(res=>{
              if(res.data==null||res.data==''){
                this.errorPhone="手机号错误"
                this.style.color="red"
                this.$refs["editForm"].resetFields();
              }else {
                this.errorPhone="手机号正确"
                this.style.color="green"
              }
          })
        },
        checkCode(){
          let params={code:this.editForm.code,phone:this.editForm.phone}
          checkCode(params).then(res=>{
            console.log(res.data)
            if(res.data=='success'){
              this.errorCode="验证码正确"
              this.style1.color='green'
            }else{
              this.errorCode="验证码错误"
              this.style1.color='red'

            }
          })
        },
        checkPwd(){
          if(this.editForm.confirm==this.editForm.pwd){
            this.errorPwd="两次密码相同"
            this.style2.color='green'
          }else{
            this.errorPwd="两次密码不相同"
            this.style2.color='red'
          }
        },
        commit(){
          this.loading=true
          let params={id:this.id,password:this.editForm.pwd}
          changePwd(params).then(res=>{
            this.loading=false
            if(res.status==200){
              this.$message({
                message: "提交成功",
                type: "success"
              });
              window.sessionStorage.clear()
              this.$router.push("/login")
            }else{
              this.$message({
                message: "提交失败",
                type: "error"
              });
            }
          })
        }
      }

    }
</script>

<style scoped>
  el-form-item{
    margin-top: 20px;
  }
  .p1{
    height: 10px;
  }
</style>
