<template>
  <div class="app-container">
    <el-button v-permission="['permission:edit']" type="primary" @click="handleAddRole">添加角色</el-button>

    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="权限ID" width="220">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色名称" width="220">
        <template slot-scope="scope">
          {{ scope.row.roleName }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="角色说明">
        <template slot-scope="scope">
          {{ scope.row.roleDescription }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button v-permission="['permission:edit']" type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <!-- <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog 
    :visible.sync="dialogVisible" 
    :close-on-click-modal="false"
    :before-close="funcDialogCLose"
    :title="dialogType==='edit'?'编辑权限':'添加权限'"
    >
    <div ref="scroll" style="max-height: 500px; overflow: auto;">
      <el-form :model="role" :rules="rules" ref="create_form" label-width="80px" label-position="left">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="role.roleName" placeholder="角色名称" />
        </el-form-item>
        <el-form-item label="角色说明" prop="roleDescription">
          <el-input
            v-model="role.roleDescription"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="角色说明"
          />
        </el-form-item>
        <el-form-item label="权限列表">
            <el-tree
                :data="routesData"
                show-checkbox
                :default-expand-all="false"
                node-key="name"
                ref="tree"
                :default-expanded-keys="expanded"
                :props="defaultProps">
            </el-tree>



          <!-- <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="defaultProps"
            :expand-on-click-node="false"
            default-expand-all
            node-key="name"
            class="permission-tree"
          >
            <span v-if="data.name" slot-scope="{ node, data }" class="custom-tree-node">
              <span>{{ data.meta.title || data.name }}</span>
              <span style="float: right">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll">全选</el-checkbox>
                <span><el-checkbox v-model="roleObj[data.name + ':view']">列表</el-checkbox></span>
                <span><el-checkbox v-model="roleObj[data.name + ':detail']">详情</el-checkbox></span>
                <span><el-checkbox v-model="roleObj[data.name + ':add']">创建</el-checkbox></span>
                <span><el-checkbox v-model="roleObj[data.name + ':edit']">编辑</el-checkbox></span>
                <span><el-checkbox v-model="roleObj[data.name + ':del']">删除</el-checkbox></span>
                <span><el-checkbox v-model="roleObj[data.name + ':export']">导出</el-checkbox></span>
              </span>
            </span>
          </el-tree> -->
        </el-form-item>
      </el-form>
    </div>
      <div style="text-align:right;">
        <el-button type="danger" @click="funcDialogCLose">取消</el-button>
        <el-button type="primary" @click="confirmRole('create_form')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import path from 'path'
import { deepClone } from '@/utils'
import { getRoutes, getRoles, getRolesById, dealRole } from '@/api/role'
import { asyncRoutes } from '@/router'

const defaultRole = {
  role_name: '',
  scopes: [],
  role_description: ''
}

export default {
  directives: { permission },
  data() {
    return {
      role: Object.assign({}, defaultRole),
      roleObj: {},
      routes: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      expanded: ['borrowing'],
      rules: {
        roleName: [
            { required: true, message: '内容不能为空，请输入', trigger: 'blur' }
        ],
        roleDescription: [
            { required: true, message: '内容不能为空，请输入', trigger: 'blur' }
        ]
    }
    }
  },
  computed: {
    routesData() {
        let routers = JSON.parse(JSON.stringify(asyncRoutes));
        let result = [];
        
        routers.forEach((item) => {
            if( item.meta ){
                let child = {
                    name: item.name,
                    label: item.meta.title,
                    children: []
                }
                if( item.children ){
                    item.children.forEach(product => {
                        if( !product.hidden ) {
                            let status = [{
                                name: `${product.name}:view`,
                                label: '列表',
                                parent: `${item.name}:view`
                            },
                            {
                                name: `${product.name}:detail`,
                                label: '详情',
                                parent: `${item.name}:view`
                            },{
                                name: `${product.name}:add`,
                                label: '添加',
                                parent: `${item.name}:view`
                            },{
                                name: `${product.name}:edit`,
                                label: '编辑',
                                parent: `${item.name}:view`
                            },{
                                name: `${product.name}:del`,
                                label: '删除',
                                parent: `${item.name}:view`
                            },
                            {
                                name: `${product.name}:export`,
                                label: '导出',
                                parent: `${item.name}:view`
                            }]
                            let subchild = {
                                name: product.name,
                                label: product.meta.title,
                                parent: `${item.name}:view`,
                                children: status
                            }
                            child.children.push(subchild)
                        }
                    });
                }

                result.push(child);
            }
            
        });
    //   const printData = {}
    //   const addToData = (arr) => {
    //     arr.forEach((route) => {
    //       if (route.meta && route.meta.title) {
    //         printData[route.name + ':view'] = route.meta.title + '-列表'
    //         printData[route.name + ':detail'] = route.meta.title + '-详情'
    //         printData[route.name + ':add'] = route.meta.title + '-添加'
    //         printData[route.name + ':edit'] = route.meta.title + '-编辑'
    //         printData[route.name + ':del'] = route.meta.title + '-删除'
    //         printData[route.name + ':export'] = route.meta.title + '-导出'
    //       }
    //       if (route.children) {
    //         addToData(route.children)
    //       }
    //     })
    //   }

    //   addToData(asyncRoutes)

    // //   console.log(JSON.stringify(printData, null, 2))
    //     console.log(asyncRoutes)
      return result// this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    // this.getRoutes()
    this.getRoles()
  },
  methods: {
      funcDialogCLose(){
          this.expanded = ['borrowing'];
          this.dialogVisible = false;
          this.$refs.tree.setCheckedKeys([]);
          for(var i=0;i<this.$refs.tree.store._getAllNodes().length;i++){
           this.$refs.tree.store._getAllNodes()[i].expanded=false;
        }
      },
    async getRoutes() {
      const res = await getRoutes()
      this.serviceRoutes = res.data.returnData
      this.routes = this.generateRoutes(res.returnData)
    },
    async getRoles() {
      const res = await getRoles({
        pageNum: 1,
        pageSize: 20
      })
      this.rolesList = res.returnData
    },
    // Reshape the routes structure so that it looks the same as the sidebar
    generateRoutes(routes, basePath = '/') {
      const res = []

      for (let route of routes) {
        // skip some route
        if (route.hidden) { continue }

        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild
        }

        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title

        }

        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    },
    handleAddRole() {
      this.role = Object.assign({}, defaultRole)
      this.roleObj = {}
      this.roleData = {}
      this.dialogType = 'new'
      this.dialogVisible = true
      this.$nextTick(() => {
        //   this.$refs.scroll.scrollTop = 0;
         this.$refs.create_form.clearValidate();
         
        });
    },
    async handleEdit(scope) {
      this.dialogType = 'edit'
      this.checkStrictly = true
      this.role = deepClone(scope.row)
      const { returnData, status } = await getRolesById(scope.row.id);
      if( status == 'SUCCESS' ){
          this.dialogVisible = true;
          this.expanded = returnData;
        //   const roleObj = {}
        // returnData.forEach((role) => {
        //     roleObj[role] = true;
        // })
        // this.role = scope.row
        // this.roleObj = roleObj
        // this.$forceUpdate()
        this.$nextTick(() => {
            this.$refs.create_form.clearValidate();
            this.$refs.tree.setCheckedKeys(returnData);
        })
      }
      
    },
    /* handleDelete({ $index, row }) {
      this.$confirm('Confirm to remove the role?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await deleteRole(row.key)
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch(err => { console.error(err) })
    },*/
    generateTree(routes, basePath = '/', checkedKeys) {
      const res = []

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys)
        }

        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.push(route)
        }
      }
      return res
    },
    async confirmRole(formName) {
        this.$refs[formName].validate( async (valid) => {
            if (valid) {
                let isEdit = this.dialogType === 'edit'
                let checkNode = this.$refs.tree.getCheckedNodes();
                let roleData = {
                    role_name: this.role.roleName,
                    role_description: this.role.roleDescription,
                    scopes: []
                }
                checkNode.forEach((item) => {
                    if( !item.children ){
                        roleData.scopes.push(item.name)
                    }
                    if( item.parent && item.children ){
                        if( !roleData.scopes.includes(item.parent) ){
                            roleData.scopes.push(item.parent)
                        }
                    }
                    
                });

                // for (let x in this.roleObj) {
                //     if (this.roleObj[x] == true) {
                //     roleData.scopes.push(x)
                //     }
                // }
                if (isEdit) {
                    roleData.role_id = this.role.id
                }
                dealRole(roleData).then((res) => {
                    // const { description, key, name } = this.role
                    let { status } = res;
                    if( status == 'SUCCESS' ){
                        this.dialogVisible = false
                        this.$notify({
                            title: 'Success',
                            dangerouslyUseHTMLString: true,
                            // message: `
                            //     <div>权限名称: ${key}</div>
                            //     <div>权限名称: ${name}</div>
                            //     <div>权限说明: ${description}</div>
                            // `,
                            message: isEdit?'角色更新成功！':'角色创建成功！',
                            type: 'success'
                        })
                        this.getRoles()
                    }
                    
                }).catch(err => { 
                    console.error(err) 
                })
            }
        });
      
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
  .custom-tree-node{
    display: block;
    overflow: hidden;
    width: 100%;
  }
}
</style>
