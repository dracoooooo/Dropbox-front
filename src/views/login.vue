<template>
  <el-container>
    <el-header>
      <h1 align="center" style="color: #00a6ff;"><i class="el-icon-s-promotion"></i>&nbsp;dropbox</h1>
    </el-header>
    <el-main>
      <el-card class="box-card">
        <el-form status-icon label-width="70px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input type="" v-model="username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">提交</el-button>
            <el-button type="" @click="gotoRegister()">注册</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import {login} from "@/api/api";

export default {
  name: "login",
  data(){
    return {
      username: '',
      password: ''
    }
  },
  methods:{
    submitForm: function (){
      login(this.username, this.password).then((response)=>{
        if(response.data['success'] === true){
          // alert(response.data['msg']);
          window.sessionStorage.setItem('token', response.data.data);
          // console.log(response.data)
          this.Alert(response.data.msg, "success");
          // 跳转
          this.$router.push("/")
        }else {
          this.Alert(response.data.msg, "error");
        }
      })
    },
    gotoRegister: function (){
      this.$router.push('/register');
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
