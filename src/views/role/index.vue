<template>
  <div class="container">
    <div class="app-container">
      <!-- 管理内容 -->
      <div class="role-operate">
        <el-button size="small " type="primary" @click="showDialog=true">添加角色</el-button>
      </div>
      <!-- table 组件 -->
      <el-table :data="rolelist">

        <el-table-column label="序号" width="200" highlight-current-row="true" align="center" prop="id" />
        <el-table-column label="角色" width="200" align="center" prop="name" />
        <el-table-column label="启用" width="200" align="center" prop="state">
          <!-- 自定义结构 {{ ？？？ }} -->
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
      <el-row type="flex" style="height:60px" align="middle" justify="center">
        <!-- 放置分页组件 total：总数量  page-size：每页显示条目个数  current-page：当前页数  current-change方法：currentPage 改变时会触发-->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pageParams.total"
          :page-size="pageParams.pagesize"
          :current-page="pageParams.page"
          @current-change="changePage"
        />
      </el-row>
    </div>

    <!-- 弹层组件Dialog -->
    <el-dialog title="新增角色" width="500px" :visible.sync="showDialog">
      <el-form label-width="100px">
        <el-form-item label="角色名称">
          <el-input style="width:300px" size="mini" />
        </el-form-item>
        <el-form-item label="启动">
          <el-switch size="mini" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input type="textarea" :rows="3" style="width:300px" size="mini" />
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="space-between" style="width:300px">
            <el-button type="primary" size="small">确定</el-button>
            <el-button size="mini">取消</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
// 获取请求方法
import { getRoleList } from '@/api/role'
export default {
  name: 'Role',
  data() {
    return {
      rolelist: [],
      // 分页数据
      pageParams: {
        page: 1, // 第几页
        pagesize: 5, // 每页多少条
        total: 0 // 总条数
      },
      showDialog: false // 控制弹层显示隐藏
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 获取角色列表
    async getRoleList() {
      const { rows, total } = await getRoleList(this.pageParams) // 参数：page 当前页码数；pagesize 每页多少条
      this.rolelist = rows // 每条赋值给表格数据
      // 总数据赋值给分页数据
      this.pageParams.total = total
    },
    // 分页的功能
    changePage(page) {
      this.pageParams.page = page
      this.getRoleList()
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
