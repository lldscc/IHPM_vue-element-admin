<template>
  <div class="container">
    <div class="app-container">
      <!-- 一、页面左侧部分 -->
      <div class="left">
        <!-- 1.搜索栏 -->
        <!-- input事件是只要内容发生变化就会触发 -->
        <el-input
          v-model="queryParams.keyword"
          style="margin-bottom: 10px;"
          type="text"
          prefix-icon="el-icon-search"
          size="small"
          placeholder="输入员工姓名搜索"
          @input="changeValue"
        />
        <!-- 2.树形控件 -->
        <!-- 通过ref属性获取组件实例 -->
        <el-tree
          ref="deptTree"
          node-key="id"
          :data="depts"
          :props="defaultProps"
          default-expand-all
          :expand-on-click-node="false"
          highlight-current
          @current-change="selectNode"
        />
      </div>

      <!-- 二、右侧部分 -->
      <div class="right">
        <!-- 1.操作栏 -->
        <el-row class="opeate-tools" type="flex" justify="end">
          <el-button size="mini" type="primary">添加员工</el-button>
          <el-button size="mini" @click="showExcelDialog = true">excel导入</el-button>
          <el-button size="mini" @click="exportEmployee">excel导出</el-button>
        </el-row>
        <!-- 2.表格组件 员工列表 -->
        <el-table :data="list">
          <el-table-column label="头像" align="center" prop="staffPhoto">
            <template v-slot="{ row }">
              <el-avatar v-if="row.staffPhoto" :src="row.staffPhoto" :size="30" />
              <span v-else class="username">{{ row.username?.charAt(0) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" prop="username" />
          <el-table-column label="手机号" sortable prop="mobile" />
          <el-table-column label="工号" sortable prop="workNumber" />
          <el-table-column label="聘用形式" prop="formOfEmployment">
            <template v-slot="{ row }">
              {{ row.formOfEmployment === 1 ? '正式' : '临时' }}
            </template>
          </el-table-column>
          <el-table-column label="部门" prop="departmentName" />
          <el-table-column label="入职时间" sortable prop="timeOfEntry" />
          <el-table-column label="操作">
            <template>
              <el-button size="mini" type="text">查看</el-button>
              <el-button size="mini" type="text">角色</el-button>
              <el-popconfirm title="确认删除该行数据吗？" @onConfirm="confirmDel(row.id)">
                <el-button slot="reference" size="mini" type="text" style="margin-left: 10px;">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>

        </el-table>

        <!-- 3.分页 -->
        <el-row style="height: 60px" align="middle" type="flex" justify="end">
          <el-pagination
            layout="total,prev, pager, next"
            :total="total"
            :page-size="queryParams.pagesize"
            :current-page="queryParams.page"
            @current-change="changePage"
          />
        </el-row>
      </div>
    </div>
    <!-- ### .sync的作用 -->
    <importExcel :show-excel-dialog.sync="showExcelDialog" />
  </div>
</template>
<script>

import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils/index.js'
import { delEmployee, getEmployeeeList } from '@/api/employee'
import importExcel from './components/import-excel.vue'
// import FileSaver from 'file-saver'
export default {
  name: 'Employee',
  components: {
    importExcel
  },
  data() {
    return {
      depts: [], // 左边树形结构的数据
      list: [], // 员工列表数据
      defaultProps: {
        label: 'name', // 显示的字段
        children: 'children' // 子节点字段
      },
      // 存储响应的数据
      queryParams: {
        // 1.节点Id
        departmentId: null,

        // 分页相关
        // 2.当前页码
        page: 1,
        // 3.每页显示条数
        pagesize: 10,

        // 搜索相关
        // 4.模糊搜索的字段
        keyword: ''
      },
      total: 0, // 总条数
      showExcelDialog: false // 导出弹层
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    // 获取部门列表
    async getDepartment() {
      // this.depts = await getDepartment()
      // 递归方法处理数据：将列表数据转换为树形结构
      const result = await getDepartment()
      this.depts = transListToTreeData(result, 0)
      // 存储节点数据
      this.queryParams.departmentId = this.depts[0].id
      // 树组件渲染是异步的 $nextTick更新完成后  设置选中
      this.$nextTick(() => {
        // 通过el-tree组件的setCurrentKey 设置选中状态
        this.$refs.deptTree.setCurrentKey(this.queryParams.departmentId)
      })
      // 初始的时候 获取员工列表
      this.getEmployeeeList()
    },
    selectNode(node) {
      // 记录点击的节点id 传给数据 设置选中状态
      this.queryParams.departmentId = node.id
      // 点击切换部门后：重置页码
      this.queryParams.page = 1
      // 点击切换id后：重新获取员工列表
      this.getEmployeeeList()
    },
    // 获取员工列表
    async getEmployeeeList() {
      // 通过部门id获取员工列表 传入参数：部门id queryParams
      const { rows, total } = await getEmployeeeList(this.queryParams)
      this.list = rows
      this.total = total
    },
    changePage(newPage) {
      // 获取新页码
      console.log(newPage)
      this.queryParams.page = newPage // 赋值新页码
      this.getEmployeeeList() // 查询数据
    },
    // 搜索框输入事件 input事件:只要内容发生变化就会触发
    changeValue() {
      // console.log(this.queryParams.keyword)
      clearTimeout(this.timer) // 清理上一次的定时器
      this.timer = setTimeout(() => {
        this.queryParams.page = 1
        this.getEmployeeList()
      }, 300)
    },
    // 导出员工
    exportEmployee() {
      // const result = exportEmployee()
      // console.log(result)
      console.log('export')
      // FileSaver.saveAs(result, '员工列表.xlsx')
    },
    // 删除员工
    async confirmDel(id) {
      await delEmployee(id)
      if (this.list.length === 1 && this.queryParams.page > 1) this.queryParams.page--
      this.getEmployeeeList()
      this.$message.success('删除员工成功')
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
