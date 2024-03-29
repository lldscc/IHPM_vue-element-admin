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
              <!-- 使用组件中的事件完成点击事件 command 是用来指定自定义事件码的属性-->
              <!-- 记录部门id,传给子组件-->
              <el-dropdown @command="operateDept($event, data.id)">
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
    <!-- id传给子组件 -->
    <!-- 父组件监听updateDepartment事件，调用 getDepartment方法-->
    <!-- ref 可以获取dom实例对象 也可以获取自定义组件的实例对象 -->
    <AppDept ref="addDept" :show-dialog.sync="showDialog" :current-node-id="currentNodeId" @updateDepartment="getDepartment" />
  </div>
</template>

<script>
import { getDepartment, delDepartment } from '@/api/department'
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
      currentNodeId: null, // 存储当前点击的节点id
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
    // 获取部门列表
    async getDepartment() {
      const result = await getDepartment() // 获取部门列表的请求
      this.dapts = transListToTree(result, 0) // 将部门列表转换为树形结构
    },
    // 下拉菜单点击事件
    operateDept(type, id) {
      if (type === 'add') {
        // 添加业务
        this.showDialog = true // 显示弹窗
        this.currentNodeId = id // 记录当前点击的节点id
      } else if (type === 'edit') {
        // 编辑业务
        this.showDialog = true
        this.currentNodeId = id // 记录当前点击的节点id，要用它获取数据
        // 上步赋值id，是更新props 异步动作
        // 直接调用子组件的方法 是同步动作
        // 同步动作先执行，异步动作后执行，就无法获取到数据id
        // 解决方法：this.$nextTick() 会在下次dom更新后执行
        this.$nextTick(() => {
        // 要在父组件获取数据，父组件调用子组件的方法获取数据ref
          this.$refs.addDept.getDepartmentDetail() // this.$refs.addDept相当于子组件的this
        })
      } else {
        // 删除业务
        this.$confirm(' 您确定要删除该部门吗？').then(async() => {
          await delDepartment(id)
          this.$message.success('删除成功')
          this.getDepartment()
        })
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
