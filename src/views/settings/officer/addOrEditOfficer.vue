<template>
  <el-dialog
    :title="(data.id ? '编辑' : '添加') + '管理员'"
    :visible.sync="dialogVisible"
    @open="initData"
    :close-on-click-modal="false"
    :before-close="resetData"
  >
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="姓名" prop="realName">
        <el-input v-model="form.realName" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="用户名" prop="loginName">
        <el-input v-model="form.loginName" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="工号" prop="employeeNum">
        <el-input v-model="form.employeeNum" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="邮箱地址" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱地址" />
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号码" />
      </el-form-item>
      <el-form-item label="角色" prop="roleIds">
        <el-checkbox-group v-model="form.roleIds" @change="handleCheckedCitiesChange">
          <el-checkbox
            v-for="(item, index) in options"
            :key="index"
            :label="item.id"
          >{{ item.roleName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">{{ data.id ? '提交修改' : '立即创建' }}</el-button>
        <el-button @click="resetData">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import request from '@/utils/request'

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    options: {
      type: Array,
      default() {
        return []
      }
    },
    optionsObj: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
      const checkPhone = ( rule, value, callback ) => {
          let reg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
          if( !reg.test(value) ){
                callback(new Error('内容输入不正确，请输入'));
            } else {
                callback();
            }
      }
      const checkJobNumber = ( rule, value, callback ) => {
          let reg = /^\d{6}$/;
          if( !reg.test(value) ){
                callback(new Error('内容输入不正确，请输入'));
            } else {
                callback();
            }
      }
      const checkEmail = ( rule, value, callback ) => {
          let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
          if( !reg.test(value) ){
                callback(new Error('内容输入不正确，请输入'));
            } else {
                callback();
            }
      }
    return {
      form: {
        realName: '',
        loginName: '',
        employeeNum: '',
        email: '',
        phone: '',
        roleIds: []
      },
      rules: {
          realName: [
              { required: true, message: '内容不能为空，请输入', trigger: 'blur' }
          ],
          loginName: [
              { required: true, message: '内容不能为空，请输入', trigger: 'blur' }
          ],
          employeeNum: [
              { required: true, message: '内容不能为空，请输入', trigger: 'blur' },
              { validator: checkJobNumber, trigger: 'blur'}
          ],
          email: [
              { required: true, message: '内容不能为空，请输入', trigger: 'blur' },
              { validator: checkEmail, trigger: 'blur'}
          ],
          phone: [
              { required: true, message: '内容不能为空，请输入', trigger: 'blur' },
              { validator: checkPhone, trigger: 'blur'}
          ],
          roleIds: [
              { type: 'array', required: true, message: '内容不能为空，请选择', trigger: ['change','blur'] }
          ]
      }
    }
  },
  methods: {
    handleCheckedCitiesChange(value) {
      console.log(value)
    },
    initData() {
      const vm = this
      const form = Object.assign({}, vm.form, vm.data)
      if (vm.data.userRoles) {
        form.roleIds = vm.data.userRoles.map(function(roleName) {
          return vm.optionsObj[roleName]
        })
      }
      vm.form = form
      // vm.$forceUpdate()
    },
    resetData() {
      this.form = this.$options.data().form
      this.$emit('hideEditForm');
      this.$refs.form.clearValidate();
      this.$refs.form.resetFields();
      
    },
    funcClerValidate(){
        this.$nextTick( () => {
            this.$refs.form.clearValidate();
        })
    },
    onSubmit(formName) {
    this.$refs[formName].validate((valid) => {
        if( valid ){
            const vm = this
            const api = this.data.id ? '/user/edit' : '/user/add'
            const data = vm.data.id ? {
                userId: vm.form.id,
                loginName: vm.form.loginName,
                realName: vm.form.realName,
                employeeNum: vm.form.employeeNum,
                email: vm.form.email,
                roleIds: vm.form.roleIds,
                phone: vm.form.phone
            } : vm.form
            request({
                method: 'POST',
                url: api,
                data
            })
                .then((res) => {
                    let { status, message } = res;
                    if( status == 'SUCCESS' ){
                        this.resetData()
                        this.$emit('addOrEditSuccess')
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: message
                        });
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    })
      
    }
  }
}
</script>
