<template>
  <div class="container">
    <div class="app-container">
      <el-button class="btn-add" size="mini" type="primary">添加权限</el-button>
      <el-table :data="list" row-key="id">
        <el-table-column label="名称" prop="name" />
        <el-table-column label="标识" prop="code" />
        <el-table-column label="描述" prop="description" />
        <el-table-column label="操作">
          <el-button size="mini" type="text">添加</el-button>
          <el-button size="mini" type="text">编辑</el-button>
          <el-button size="mini" type="text">删除</el-button>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getPermissionList } from '@/api/permission'
import { transListToTreeData } from '@/utils'
export default {
  name: 'Permission',
  data() {
    return {
      list: []
    }
  },
  created() {
    getPermissionList()
    console.log(this.list)
  },
  methods: {
    async getPermissionList() {
      this.list = transListToTreeData(await getPermissionList(), 0)
    }
  }
}
</script>
<style>
.btn-add {
  margin: 10px;
}
</style>
