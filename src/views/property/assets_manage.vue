<template>
    <div class="app-container">
        <!-- 搜索 -->
        <div class="header_con">
            <el-form :inline="true">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="资产ID" label-width="70px">
                            <el-input v-model="search_query.id" class="el_input" />
                        </el-form-item>
                        <el-form-item label="资产方名称" label-width="90px">
                            <el-input v-model="search_query.asset_party_name" class="el_input" />
                        </el-form-item>
                        <el-form-item label="公司名称" label-width="70px">
                            <el-select v-model="search_query.company_name" clearable class="el_select">
                                <el-option v-for="item in sign" :label="item.sign_company_name" :value="item.sign_id" :key="item.sign_id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="状态" label-width="70px">
                            <el-select v-model="search_query.asset_party_state" clearable class="el_select">
                                <el-option label="启用中" :value="1" />
                                <el-option label="禁用中" :value="0" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="创建时间" label-width="70px">
                            <el-date-picker v-model="search_query.create_start_time" type="datetime" default-time="00:00:00" class="el_input"></el-date-picker>
                            <em class="time_space">至</em>
                            <el-date-picker v-model="search_query.create_end_time" type="datetime" default-time="23:59:59" class="el_input"></el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" icon="el-icon-search" @click="funcSearchList">查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!-- End -->
        <div class="aside_con">
            <el-button type="primary" v-permission="['admin','assetsManage:add']" icon="el-icon-circle-plus-outline" @click="funcDialogShow">创建</el-button>
        </div>
        <!-- 数据列表 -->
        <div class="section_con">
            <el-table
            v-loading="loading"
            :data="list"
            border
            highlight-current-row
            :header-cell-style="{background: '#f2f2f2'}"
            style="width: 100%;">
                <el-table-column label="资产方ID" min-width="150" prop="id" align="center">
                </el-table-column>
                <el-table-column label="资产方名称" width="200" align="center" prop="asset_party_name">
                </el-table-column>
                <el-table-column label="公司名称" min-width="180" align="center" prop="company_name">
                </el-table-column>
                <el-table-column label="统一社会信用代码" min-width="200" align="center" prop="unified_social_credit_code">
                </el-table-column>
                <el-table-column label="签章" width="180" align="center" prop="signature_name">
                </el-table-column>
                <el-table-column label="创建人" width="110" align="center" prop="create_user_name">
                </el-table-column>
                <el-table-column label="创建时间" width="160" align="center" prop="create_time">
                    <!-- {{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }} -->
                </el-table-column>
                <el-table-column label="修改人" width="110" align="center" prop="update_user_name">
                </el-table-column>
                <el-table-column label="修改时间" width="160" align="center" prop="update_time">
                </el-table-column>
                <el-table-column label="是否启用" width="120" align="center">
                    <template slot-scope="scope">
                        {{scope.row.asset_party_state == 1?'启用中':'已禁用'}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" v-permission="['admin','assetsManage:edit']" size="mini" @click="funcUpadateDialog(scope.row)">编辑</el-button>
                        <template v-if="scope.row.asset_party_state == 1">
                            <el-button type="danger" v-permission="['admin','assetsManage:edit']" size="mini" @click="funcDisableFile(scope.row)">禁用</el-button>
                        </template>
                        <template v-else>
                            <el-button type="success" v-permission="['admin','assetsManage:edit']" size="mini" @click="funcEnableFile(scope.row)">启用</el-button>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- End -->
        <!-- 页码 -->
        <pagination class="page_align" v-show="total" :total="total" :page.sync="curr_page" :limit.sync="page_size" @pagination="funcGetTableList" />
        <!-- End -->
        <!-- 创建 -->
        <el-dialog
        :title="is_updata?'编辑资产方':'创建资产方'"
        :visible.sync="visibility"
        width="35%"
        :close-on-click-modal="false"
        :show-close="false"
        :before-close="funcDialogClose">
            <div class="dialog_section">
                <el-form :model="create_form" :rules="rules" ref="create_form" label-width="130px">
                    <el-form-item label="资产方ID" prop="id" v-if="is_updata">
                        <el-input v-model="create_form.id" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="资产方名称" prop="asset_party_name">
                        <el-input v-model="create_form.asset_party_name"></el-input>
                    </el-form-item>
                    <el-form-item label="公司名称">
                        <el-input v-model="create_form.sign_company_name" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="统一社会信用代码">
                        <el-input v-model="create_form.sign_unified_social_credit_code" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="签章" prop="signature_id">
                        <el-select v-model="create_form.signature_id" clearable class="el_width_100">
                            <el-option v-for="item in sign" :label="item.sign_name" :value="item.sign_id" :key="item.sign_id" />
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="funcDialogClose">取 消</el-button>
                <template v-if="is_updata">
                    <el-button type="primary" :disabled="!is_success" @click="funcUpdateFile('create_form')">更新</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" :disabled="!is_success" @click="funcCreateFile('create_form')">创建</el-button>
                </template>
            </div>
        </el-dialog>
        <!-- End -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { formatParmas } from '@/utils'
import { assetLists, createAaset, editAaset, enableAaset, disableAaset } from '@/api/property'
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js'
export default {
    data() {
        return {
            visibility: false,
            is_updata: false,
            is_success: true,
            create_form: {
                id: '',
                asset_party_name: '',
                signature_id: '',
                sign_company_name: '',
                sign_unified_social_credit_code: ''
            },
            search_query: {},
            loading: false,
            list: null,
            total: 0,
            curr_page: 1,
            page_size: 20,
            rules: {
                asset_party_name: [
                    { required: true, message: '请输入资产方名称', trigger: 'blur' }
                ],
                signature_id: [
                    { required: true, message: '请选择签章', trigger: 'change' }
                ]
            }
        }
    },
    directives: { 
        permission
    },
    watch:{
        'create_form.signature_id':function(n,o){
            let result = {};
            this.sign.forEach((item,index) => {
                if( item.sign_id == n) result = item;;
            });
            this.create_form.sign_company_name = result.sign_company_name || '';
            this.create_form.sign_unified_social_credit_code = result.sign_unified_social_credit_code || '';
        }
    },
    computed: {
        ...mapGetters(['sign'])
    },
    components: { 
        Pagination 
    },
    created(){
        this.funcGetTableList()
    },
    methods: {
        /* 初始化获取数据列表 */
        async funcGetTableList() {
            let params = {
                pageNum: this.curr_page,
                pageSize: this.page_size,
                parameters: formatParmas(this.search_query)
            }
            this.loading = true;
            let { status, returnData, pageInfo } = await assetLists(params);
            this.loading = false;
            if( status == 'SUCCESS' ){
                this.list = returnData;
                this.total = pageInfo.totalCount || 0;
            }
        },
        /* 搜索 */
        funcSearchList() {
            this.curr_page = 1;
            this.funcGetTableList();
        },
        /* 显示弹窗 */
        funcDialogShow() {
            this.is_updata = false;
            this.visibility = true;
        },
        /* 关闭弹窗 */
        funcDialogClose() {
            this.visibility = false;
            this.$refs.create_form.resetFields();
        },
        /* 创建资产方 */
        funcCreateFile(formName) {
            let create_form = this.create_form;
            let params = {
                assetPartyName: create_form.asset_party_name,
                signatureId: create_form.signature_id
            }
            this.$refs[formName].validate( async (valid) => {
                if ( valid ) {
                    try{
                        this.is_success = false;
                        let { status } = await createAaset(params);
                        this.is_success = true;
                        if( status == 'SUCCESS' ){
                            this.$message({
                                showClose: true,
                                message: '资产方创建成功！',
                                type: 'success'
                            });
                            this.curr_page = 1;
                            this.funcDialogClose();
                            this.funcGetTableList()
                            this.$store.dispatch('select/getSelect');
                        }
                    }
                    catch(err){
                        this.is_success = true;
                    }
                }
            });
        },
        /* 编辑资产方弹窗 */
        funcUpadateDialog(row){
            let product = Object.assign({},{
                id: row.id,
                asset_party_name: row.asset_party_name,
                company_name: row.company_name,
                signature_id: row.signature_id
            });
            this.create_form = product;
            this.visibility = true;
            this.is_updata = true;
        },
        /* 更新资产方 */
        funcUpdateFile(formName) {
            let create_form = this.create_form;
            let params = {
                id: create_form.id,
                assetPartyName: create_form.asset_party_name,
                signatureId: create_form.signature_id
            }
            this.$refs[formName].validate( async (valid) => {
                if (valid) {
                    try{
                        this.is_success = false;
                        let { status } = await editAaset(params);
                        this.is_success = true;
                        if( status == 'SUCCESS' ){
                            this.$message({
                                showClose: true,
                                message: '资产方更新成功！',
                                type: 'success'
                            });
                            this.funcDialogClose();
                            this.funcGetTableList();
                            this.$store.dispatch('select/getSelect');
                        }
                    }
                    catch(err){
                        this.is_success = true;
                    }
                }
            });
        },
        /* 禁用资产方 */
        async funcDisableFile(row){
            let params = {
                id: row.id
            }
            let { status } = await disableAaset(params);
            if( status == 'SUCCESS' ){
                this.funcGetTableList()
            }
        },
        /* 启用资产方 */
        async funcEnableFile(row){
            let params = {
                id: row.id
            }
            let { status } = await enableAaset(params);
            if( status == 'SUCCESS' ){
                this.funcGetTableList();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.el_input {
    width: 210px;
}
.el_select {
    width: 210px;
}
.el_width_100{
    width: 100%;
}
.time_space {
    padding: 0 10px;
    font-style: normal;
}
.page_align {
    text-align: right;
}
.aside_con {
    padding-bottom: 10px;
}
</style>
