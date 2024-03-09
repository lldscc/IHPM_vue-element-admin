<template>
  <div class="container">
    <div class="app-container">
      <el-tree :data="dapts" :props="defaultProps" :default-expand-all="true">
        <!-- 自定义节点结构 -->
        <el-row
          type="flex"
          justify="space-between"
          style="width: 100%; height: 40px;align-items: center;"
        >
          <el-col>传智教育</el-col>
          <el-col :span="4">
            <span class="textG">管理员</span>
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>添加子部门</el-dropdown-item>
              <el-dropdown-item>编辑部门</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-col>
        </el-row>
      </el-tree>
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
            },
            {
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
.app-container {
  padding: 30px 140px;
  font-size: 14px;
}
.textG {
  color: #67c23a;
  display: inline-block;
  margin-right: 30px;
  user-select: none;
}
</style>
