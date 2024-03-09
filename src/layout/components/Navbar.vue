<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- 头像 -->
          <img v-if="avatar" :src="avatar" class="user-avatar">
          <span v-else class="username">{{ name?.charAt(2) }}</span>
          <!-- 用户名 -->
          <span class="name">{{ name }}</span>
          <!-- 图标 -->
          <i class="el-icon-setting" style="font-size: 17px;" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/lldscc/IHPM_vue-element-admin">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <!-- prevent修饰符，阻止默认事件 -->
          <a target="_blank" @click.prevent="updatePassword">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </a>
          <!-- native:事件修饰符： 注册组件的根元素的原生事件-->
          <!-- el-dropdown-item无点击事件 -->
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- dialog弹出层 -->
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="35%"
      :modal="false"
      @close="btnCancel"
    >
      <!-- ref:获取表单的实例 model：绑定表单数据  rules：表单的规则-->
      <el-form ref="passform" :model="passform" :rules="rules" label-width="80px">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="passform.oldPassword" type="password" show-password />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passform.newPassword" type="password" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="passform.confirmPassword" type="password" show-password />
        </el-form-item>
        <el-form-item>
          <el-button @click="btnOK">取 消</el-button>
          <el-button type="primary" @click="btnCancel">确 定</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { updatePassword } from '@/api/user'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      // 控制dialog的显示与隐藏
      dialogVisible: false,
      // 表单数据
      passform: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      // 表单验证规则
      rules: {
        oldPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }, { min: 6, max: 16, message: '密码长度6位-16位', trigger: 'blur' }],
        confirmPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { trigger: 'blur',
            validator: (rule, value, callback) => {
              // 使用箭头函数，this指向外层作用域
              if (this.passform.oldPassword === value) {
                callback(new Error('新密码不能与原密码相同'))
              } else if (this.passform.newPassword === value) {
                callback() // 校验通过
              } else {
                callback(new Error('两次输入的密码不一致'))
              }
            } }]
      }
    }
  },
  computed: {
    // 从 store 中获取数据
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    // 修改密码 弹出对话框
    updatePassword() {
      this.dialogVisible = true
    },
    async logout() {
      // 退出登录
      // 调用 store 中的 logout action
      await this.$store.dispatch('user/logout')
      // 跳转到登录页
      this.$router.push('/login')
    },
    // 确认
    btnOK() {
      // 校验表单
      this.$refs.passform.validate(async isOK => {
        if (isOK) {
          // 调用接口
          await updatePassword(this.passform)
          this.$message.success('修改成功')
          // 重置表单
          this.$refs.passform.resetFields()
          this.dialogVisible = false
        }
      })
    },
    btnCancel() {
      this.dialogVisible = false
      this.$refs.passform.resetFields()
    }

  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          user-select: none;

        }
        .username{
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background-color: #04c9be;
          color: #fff;
          border-radius: 50%;
          margin-right: 4px;
          user-select: none;
        }
        .name{
          margin-right: 10px;
          font-size: 16px;
          // 无法选中
          user-select: none;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
