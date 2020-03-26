<template>
  <div class="app-container">
    <el-button v-permission="['administrators:edit']" type="primary" style="margin-bottom: 30px" @click="showAddForm">创建</el-button>
    <!-- <pagination v-show="total>0" :total="total" :current-page.sync="listQuery.page || 1" :limit="listQuery.limit" :pager-count="7" style="float:right" @pagination="getList" /> -->

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户名" fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.loginName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.realName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="角色">
        <template slot-scope="scope">
          <el-tag v-for="(role, index) in scope.row.userRoles" :key="index" type="info" effect="plain" style="margin: 0 4px;background: #fff">{{ role }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="工号">
        <template slot-scope="scope">
          <span>{{ scope.row.employeeNum }}</span>
        </template>
      </el-table-column>

      <el-table-column label="邮箱地址">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column label="手机号码">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建人">
        <template slot-scope="scope">
          <span>{{ scope.row.createUser }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="修改人">
        <template slot-scope="scope">
          <span>{{ scope.row.updateUser }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="修改时间">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column v-permission="['administrators:edit']" align="center" label="操作" width="120" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="showEditForm(scope.row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :current-page.sync="listQuery.page || 1" :limit="listQuery.limit" :pager-count="7" style="float:right" @pagination="getList" />
    <add-or-edit-officer
      ref="editForm"
      :dialog-visible="showFormDialog"
      :data="formData"
      :options="options"
      :options-obj="optionsObj"
      @hideEditForm="hideEditForm"
      @addOrEditSuccess="appendNewUser"
    />
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import addOrEditOfficer from './addOrEditOfficer.vue'
import request from '@/utils/request'
import { getRoles } from '@/api/role'

export default {
  components: { Pagination, addOrEditOfficer },
  directives: { permission },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      options: [],
      optionsObj: {},
      optionsNames: {},
      formData: {},
      roleList: {},
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: Number(this.$route.query.page) || 1,
        limit: Number(this.$route.query.page_size) || 20
      },
      showFormDialog: false
    }
  },
  async created() {
    const res = await getRoles({
      pageNum: 1,
      pageSize: 10000
    })
    const options = res.returnData
    const optionsObj = {}
    const optionsNames = {}
    options.forEach((item) => {
      optionsObj[item.roleName] = item.id
      optionsNames[item.roleName] = item.roleDescription
    })
    this.options = options
    this.optionsObj = optionsObj
    this.optionsNames = optionsNames
    this.getList()
  },
  methods: {
    getList(page) {
      const page_num = (page && page.page) || Number(this.$route.query.page) || 1
      const page_size = (page && page.limit) || Number(this.$route.query.page_size) || 20
      this.$router.push({
        query: {
          page: page_num,
          page_size
        }
      })
      this.listQuery = {
        page: page_num,
        limit: page_size
      }
      this.listLoading = true

      request({
        url: '/user/list',
        method: 'post',
        data: {
          pageSize: page_size,
          pageNum: page_num
        }
      }).then(response => {
        this.list = response.returnData
        this.total = response.pageInfo.totalCount
        this.listLoading = false
      })
    },
    showAddForm() {
      this.formData = {}
      this.showFormDialog = true
    },
    showEditForm(data) {
      this.formData = Object.assign({}, data)
      this.showFormDialog = true;
      this.$refs.editForm.funcClerValidate()
    },
    hideEditForm() {
      this.formData = {}
      this.showFormDialog = false
    },
    appendNewUser() {
      this.formData = {}
      this.showFormDialog = false
      this.getList()
    },
    editOneUser() {

    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
