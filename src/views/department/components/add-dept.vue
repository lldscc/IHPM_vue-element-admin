<template>
  <!-- 对话框组件 visible属性控制显示隐藏  -->
  <el-dialog
    title="新增部门"
    :visible.sync="dialogVisible"
    width="30%"
  >
    <el-form label-width="120px">
      <el-form-item label="部门名称">
        <el-input placeholder="2-10个字符" style="width: 80%;" />
      </el-form-item>
      <el-form-item label="部门编码">
        <el-input placeholder="2-10个字符" style="width: 80%;" />
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select placeholder="选择负责人" style="width: 40%;" />
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input type="textarea" :rows="4" placeholder="20-100字符" />
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
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {

  }

}
</script>

<style>

</style>
