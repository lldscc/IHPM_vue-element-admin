<template>
  <div class="login-container">
    <div class="logo" />
    <div class="form">
      <h1>登录</h1>
      <el-card shadow="never" class="login-card">
        <!--登录表单 绑定对应的属性 ref :model :rules el的属性-->
        <el-form ref="form" :model="loginForm" :rules="loginRules">

          <el-form-item prop="mobile">
            <el-input v-model="loginForm.mobile" placeholder="请输入手机号" />
          </el-form-item>

          <el-form-item prop="password">
            <el-input v-model="loginForm.password" placeholder="请输入密码" />
          </el-form-item>

          <el-form-item prop="isAgree">
            <el-checkbox v-model="loginForm.isAgree"> 用户平台使用协议 </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 350px" type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <!-- 测试接口 -->
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      // 登录数据
      loginForm: {
        // 区分环境
        mobile: process.env.NODE_ENV === 'development' ? '13800000002' : '13800000002',
        password: process.env.NODE_ENV === 'development' ? 'hm#qd@23!' : 'hm#qd@23!',
        isAgree: process.env.NODE_ENV === 'development'
      },
      // 登录规则
      // rule规则
      // value检查的数据 true/false
      // validator: (rule, value, callback) 检验true flase

      loginRules: {
        mobile: [{
          required: true,
          message: '手机号不为空',
          trigger: 'blur'
        }, {
          pattern: /^1[3-9]\d{9}$/,
          message: '手机号格式不正确',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '密码不为空',
          trigger: 'blur'
        }, {
          min: 6,
          max: 16,
          message: '密码长度应该为6-16位之间',
          trigger: 'blur'
        }],
        isAgree: [{
          validator: (rule, value, callback) => {
            // rule 校验规则
            // value 校验的值
            value ? callback() : callback(new Error('没有勾选用户平台协议'))
          }
        }]
      }
    }
  },
  methods: {
    login() {
      // ref获取表单的实例对象
      this.$refs.form.validate(async(isOK) => {
        if (isOK) {
          await this.$store.dispatch('user/login', this.loginForm)// vuex
          // vuex中的action 返回的是一个promise
          // 登录成功后跳转到首页
          this.$router.push('/')
        }
      })
    }
  }
}
</script>
<style lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  .logo {
    flex: 3;
    background: url(../../assets/common/back02.png) no-repeat center / cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;
    .icon {
      background: url(../../assets/common/logo.png) no-repeat 70px center /
        contain;
      width: 300px;
      height: 50px;
      margin-bottom: 50px;
    }
    p {
      color: #fff;
      font-size: 18px;
      margin-top: 20px;
      width: 300px;
      text-align: center;
    }
  }
  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 176px;
    .el-card {
      border: none;
      padding: 0;
    }
    h1 {
      padding-left: 20px;
      font-size: 24px;
    }
    .el-input {
      width: 350px;
      height: 44px;
      .el-input__inner {
        background: #f4f5fb;
      }
    }
    .el-checkbox {
      color: #606266;
    }
  }
}
</style>
