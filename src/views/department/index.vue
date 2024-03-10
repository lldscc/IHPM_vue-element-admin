<template>
  <div class="container">
    <div class="app-container">
      <el-tree :data="dapts" :props="defaultProps" default-expand-all>
        <!-- 自定义节点结构 -->
        <!-- v-slot ={ node,data} 只能作用在template-->
        <template v-slot="{data}">
          <el-row
            type="flex"
            justify="space-between"
            style="width: 100%; height: 40px;align-items: center;"
          >
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span class="textG">{{ data.managerName }}</span>
              <el-dropdown>
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>添加子部门</el-dropdown-item>
                  <el-dropdown-item>编辑部门</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

            </el-col>
          </el-row>
        </template>
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
          managerName: '管理员',
          children: [
            {
              name: '总裁办',
              managerName: '张三'

            },
            {
              name: '行政部',
              managerName: '小明'

            },
            {
              name: '人事部',
              managerName: '小李'

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
}
</style>
