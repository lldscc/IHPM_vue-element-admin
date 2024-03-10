<template>
  <!-- 对话框组件 visible属性控制显示隐藏  -->
  <el-dialog
    title="新增部门"
    :visible.sync="dialogVisible"
    width="30%"
  />
</template>

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
