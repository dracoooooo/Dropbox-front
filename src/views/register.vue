<template>
  <el-container>
    <el-header>
      <h1>dropbox</h1>
    </el-header>
    <el-main>
      <el-card class="box-card">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input type="" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="gotoLogin()">登陆</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import {checkRepetition, register} from '@/api/api'

export default {
  name: "register",
  data() {
    var checkUserName = (rule, value, callback) => {
      if(!value){
        return callback(new Error('用户名不能为空'));
      } else {
        checkRepetition(value).then((response)=>{
          if(response.data['success'] === true){
            return callback();
          }
          else{
            return callback(new Error('用户名重复'));
          }
        })
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: '',
        pass: '',
        checkPass: '',
      },
      rules: {
        username: [
          {validator: checkUserName, trigger: 'blur'}
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          register(this.ruleForm.username, this.ruleForm.pass).then((response)=>{
            if(response.data['success'] === true){
              alert(response.data['msg']);
            //  注册成功跳转
            }else {
              alert(response.data['msg']);
            }
          })
        } else {
          console.log('请检查提交的信息');
          return false;
        }
      });
    },
    gotoLogin(){
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.box-card{
  width: 420px;
  padding: 20px;
}
.el-main{
  align-self: center;
}
.el-container{
  padding: 10%;
}
</style>
