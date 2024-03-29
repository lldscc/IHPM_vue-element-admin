<template>
  <div class="container">
    <div class="app-container">
      <!-- 一、页面左侧部分 -->
      <div class="left">
        <!-- 1.搜索栏 -->
        <el-input
          style="margin-bottom: 10px;"
          type="text"
          prefix-icon="el-icon-search"
          size="small"
          placeholder="输入员工姓名搜索"
        />
        <!-- 2.树形控件 -->
        <el-tree
          :data="depts"
          :props="defaultProps"
          default-expand-all
          :expand-on-click-node="false"
          highlight-current
        />
      </div>

      <!-- 二、右侧部分 -->
      <div class="right">
        <!-- 1.操作栏 -->
        <el-row class="opeate-tools" type="flex" justify="end">
          <el-button size="mini" type="primary">添加员工</el-button>
          <el-button size="mini">excel导入</el-button>
          <el-button size="mini">excel导出</el-button>
        </el-row>
        <!-- 2.表格组件 -->
        <!-- 3.分页 -->
      </div>
    </div>
  </div>
</template>
<script>

import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils/index.js'
export default {
  name: 'Employee',
  data() {
    return {
      depts: [], // 左边树形结构的数据
      defaultProps: {
        label: 'name', // 显示的字段
        children: 'children' // 子节点字段
      }
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    async getDepartment() {
      // this.depts = await getDepartment()
      // 递归方法处理数据：将列表数据转换为树形结构
      const result = await getDepartment()
      this.depts = transListToTreeData(result, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container{
  background: #fff;
  display: flex;
  .left {
    width: 280px;
    padding: 20px;
    border-right: 1px solid #eaeef4;
  }
  .right {
    flex: 1;
    padding: 20px;
    .opeate-tools {
      margin:10px ;
    }
    .username {
      height: 30px;
      width: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      background: #04C9BE;
      font-size: 12px;
      display:inline-block;
    }
  }
}

</style>
