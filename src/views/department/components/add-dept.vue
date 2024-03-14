<template>
  <!-- 对话框组件 visible属性控制显示隐藏  -->
  <el-dialog
    title="新增部门"
    :visible="showDialog"
    @close="close"
  >
    <!-- 表单
      model 绑定数据对象 rules 表单验证规则 ref整个form的实例

    -->
    <el-form ref="addDept" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" placeholder="2-10个字符" style="width: 80%;" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" placeholder="2-10个字符" style="width: 80%;" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="managerId">
        <el-select v-model="formData.managerId" placeholder="选择负责人" style="width: 40%;" />
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" type="textarea" :rows="4" placeholder="20-100字符" />
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="center">
          <el-col>
            <el-button type="primary">提交</el-button>
          </el-col>
          <el-col>
            <el-button>取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog></template>

<script>
export default {
  // 通过props接收父组件传递的值
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 定义新增部门的数据类型
      formData: {
        code: '', // 部门编码
        introduce: '', // 部门介绍
        managerId: '', // 部门负责人id
        name: '', // 部门名称
        pid: '' // 上级部门id
      },
      // 表单验证的规则
      rules: {
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }],

        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 20 到 100 个字符', trigger: 'blur' }],

        managerId: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],

        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }]
      }
    }
  },
  methods: {
    close() {
      // 通过$emit触发父组件的事件 子传父
      this.$emit('update:showDialog', false)
    }
  }

}
</script>

<style>

</style>
