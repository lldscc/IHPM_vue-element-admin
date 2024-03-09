<template>
  <div class="container">
    <div class="app-container">
      <el-tree :data="dapts" :props="defaultProps" :default-expand-all="true" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Department',
  data() {
    return {
      dapts: [
        {
          name: '传智教育',
          children: [
            {
              name: '总裁办'

            },
            {
              name: '行政部'

            }, {
              name: '人事部'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children', // 子节点字段
        label: 'name' // 显示的字段
      }
    }
  },
  created() {},
  methods: {}
}
</script>

<style scoped>
.app-container{
  padding:30px 140px;
  font-size: 14px;
  }
</style>
