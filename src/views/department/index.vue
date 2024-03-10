<template>
  <div class="container">
    <div class="app-container">
      <el-tree :data="dapts" :props="defaultProps" default-expand-all :expand-on-click-node="false">
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
              <!-- 下拉菜单 -->
              <!-- 使用组件中的事件完成点击事件 -->
              <el-dropdown @command="operateDept">
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="del">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
    <!-- 操作对话框组件 -->
    <!-- sync修饰符 =》会接受子组件的事件 update：dialogVisible值 -->
    <AppDept :dialog-visible="showDialog" />
  </div>
</template>

<script>
import { getDepartment } from '@/api/department'
import { transListToTree } from '@/utils'
import AppDept from './components/add-dept.vue'
export default {
  name: 'Department',
  components: {
    AppDept
  },
  data() {
    return {
      showDialog: false, // 控制弹窗显示隐藏
      dapts: [],
      defaultProps: {
        children: 'children', // 子节点字段
        label: 'name' // 显示的字段
      }
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    // 声明一个方法，用来获取部门列表
    async getDepartment() {
      const result = await getDepartment() // 获取部门列表的请求
      this.dapts = transListToTree(result, 0) // 将部门列表转换为树形结构
    },
    // 下拉菜单点击事件

    operateDept(command) {
      if (command === 'add') {
        this.showDialog = true
        this.$message('添加子部门')
      } else if (command === 'edit') {
        this.$message('编辑部门')
      } else if (command === 'del') {
        this.$message('删除')
      }
    }

  }
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
