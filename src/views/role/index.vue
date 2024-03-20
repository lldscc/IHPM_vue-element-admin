<template>
  <div class="container">
    <div class="app-container">
      <!-- 管理内容 -->
      <div class="role-operate">
        <el-button size="small " type="primary">添加角色</el-button>
      </div>
      <!-- table 组件 -->
      <el-table :data="rolelist">

        <el-table-column type="index" label="序号" highlight-current-row="true" align="center" />
        <el-table-column label="角色" width="200" align="center" prop="name" />
        <el-table-column label="启用" width="200" align="center" prop="state">
          <!-- 自定义结构 -->
          <template v-slot="{ row }">
            <span>  {{ row.state === 1 ? "已启用" : row.state === 0 ? "未启用" : "无" }} </span>
          </template>
        </el-table-column>
        <el-table-column label="描述" align="center" prop="description" />
        <el-table-column label="操作" align="center">
          <!-- 放置操作按钮 -->
          <template>
            <el-button size="mini" type="text">分配权限</el-button>
            <el-button size="mini" type="text">编辑</el-button>
            <el-button size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>

      </el-table>

      <!-- 分页组件 -->
      <el-row type="flex" style="height:60px" align="middle" justify="end">
        <!-- 放置分页组件 -->
        <el-pagination layout="prev, pager, next" />
      </el-row>
    </div>
  </div>
</template>
<script>
// 获取请求方法
import { getRoleList } from '@/api/role'
export default {
  name: 'Role',
  data() {
    return {
      rolelist: []
    }
  },
  created() {
    this.getRoleList()
    console.log(this.rolelist)
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      // const res = await getRoleList()
      // this.rolelist = res.data.rows
      const { rows } = await getRoleList()
      this.rolelist = rows // 赋值数据
    }
  }
}
</script>
<style scoped>
.role-operate {
  padding: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
