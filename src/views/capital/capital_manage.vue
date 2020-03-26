<template>
    <div class="app-container">
        <!-- 搜索 -->
        <div class="header_con">
            <el-form :inline="true">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="资金方ID" label-width="70px">
                            <el-input v-model="search_query.fundPartyId" class="el_input" />
                        </el-form-item>
                        <el-form-item label="资金方名称">
                            <el-select v-model="search_query.fundPartyName" clearable class="el_select">
                                <el-option v-for="item in funding_party" :key="item.fund_party_id" :label="item.funding_party_name" :value="item.funding_party_name" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="创建时间" label-width="70px">
                            <el-date-picker v-model="search_query.startDate" type="datetime" default-time="00:00:00" class="el_input"></el-date-picker>
                            <em class="time_space">至</em>
                            <el-date-picker v-model="search_query.endDate" type="datetime" default-time="23:59:59" class="el_input"></el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" icon="el-icon-search" @click="funcSearchFilter">查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!-- End -->
        <div class="aside_con">
            <el-button type="primary" v-permission="['admin','capitalManage:add']" icon="el-icon-circle-plus-outline" @click="funcDialogShow">创建</el-button>
        </div>
        <!-- 数据列表 -->
        <div class="section_con">
            <el-table
            v-loading="loading"
            :data="tableList"
            border
            highlight-current-row
            :header-cell-style="{background: '#f2f2f2'}"
            style="width: 100%;">
                <el-table-column label="资金方ID" width="120" align="center" prop="id" />
                <el-table-column label="资金方名称" width="150" align="center" prop="funding_party_name" />
                <el-table-column label="公司名称" min-width="180" align="center" prop="company_name" />
                <el-table-column label="统一社会信用代码" min-width="200" align="center" prop="unified_social_credit_code" />
                <el-table-column label="签章" width="180" align="center" prop="signature_company_name" />
                <el-table-column label="创建人" width="110" align="center" prop="create_user_name" />
                <el-table-column label="创建时间" width="160" align="center" prop="create_time" />
                <el-table-column label="修改人" width="110" align="center" prop="update_user_name" />
                <el-table-column label="修改时间" width="160" align="center" prop="update_time" />
                <el-table-column label="操作" align="center" width="120">
                    <template slot-scope="scope">
                        <el-button type="primary" v-permission="['admin','capitalManage:edit']" size="mini" @click="funcUpadataFile(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- End -->
        <!-- 页码 -->
        <pagination class="page_align" v-show="total" :total="total" :page.sync="curr_page" :limit.sync="page_size" @pagination="funcGetTableLists" />
        <!-- End -->
        <!-- 创建 -->
        <el-dialog
        :title="is_updata?'编辑资金方':'创建资金方'"
        :visible.sync="visibility"
        :close-on-click-modal="false"
        width="35%"
        :show-close="false"
        :before-close="funcDialogClose">
            <div class="dialog_section">
                <el-form :model="create_form" :rules="rules" ref="create_form" label-width="130px">
                    <el-form-item label="资金方ID" prop="id" v-if="is_updata">
                        <el-input v-model="create_form.id" :disabled="true" class="el_width_150" />
                    </el-form-item>
                    <el-form-item label="资金方名称" prop="fundingPartyName">
                        <el-input v-model="create_form.fundingPartyName" />
                    </el-form-item>
                    <el-form-item label="公司名称">
                        <el-input v-model="create_form.companyName" :disabled="true" />
                    </el-form-item>
                    <el-form-item label="统一社会信用代码">
                        <el-input v-model="create_form.unifiedSocialCreditCode" :disabled="true" class="el_width_250" />
                    </el-form-item>
                    <el-form-item label="签章" prop="signatureId">
                        <el-select v-model="create_form.signatureId" clearable class="el_width_200">
                            <el-option v-for="item in sign" :key="item.sign_id" :label="item.sign_name" :value="item.sign_id" />
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="funcDialogClose">取 消</el-button>
                <template v-if="is_updata">
                    <el-button type="primary" :disabled="!is_submit" @click="funcUpdateSubmit('create_form')">更新</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" :disabled="!is_submit" @click="funcCreateSubmit('create_form')">创建</el-button>
                </template>
            </div>
        </el-dialog>
        <!-- End -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { capitalManageList, createCapital, updateCapital } from '@/api/capital'
import { formatParmas } from '@/utils'
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js'
export default {
    data() {
        return {
            visibility: false,
            is_updata: false,
            is_submit: true,
            create_form: {},
            search_query: {},
            loading: false,
            tableList: null,
            total: 0,
            curr_page: 1,
            page_size: 20,
            rules: {
                fundingPartyName: [
                    { required: true, message: '内容不能为空，请输入', trigger: 'blur' }
                ],
                signatureId: [
                    { required: true, message: '内容不能为空，请选择', trigger: 'change' }
                ]
            }
        }
    },
    directives: { 
        permission
    },
    computed: mapGetters(['funding_party','sign']),
    components: { 
        Pagination 
    },
    created(){
        this.funcGetTableLists()
    },
    watch: {
        'create_form.signatureId':function(n,o){
            let result = {};
            this.sign.forEach((item,index) => {
                if( item.sign_id == n ) result = item
            });
            this.create_form.companyName = result.sign_company_name || '';
            this.create_form.unifiedSocialCreditCode = result.sign_unified_social_credit_code || '';
            this.create_form.registeredNo = result.registered_no || ''
        }
    },
    methods: {
        /* 初始化获取列表数据 */
        async funcGetTableLists() {
            let params = {
                pageNum: this.curr_page,
                pageSize: this.page_size,
                parameters: formatParmas(this.search_query)
            }
            this.loading = true;
            let { status, returnData, pageInfo } = await capitalManageList(params);
            this.loading = false;
            if( status == 'SUCCESS' ){
                this.tableList = returnData;
                this.total = pageInfo.totalCount || 0;
            }
        },
        /* 搜索 */
        funcSearchFilter() {
            let query = this.search_query;
            if( (query.startDate && !query.endDate) || (!query.startDate && query.endDate) ){
                this.$message({
                    message: '查询开始时间或结束时间不能为空！',
                    type: 'error'
                });
                return false;
            }
            this.curr_page = 1;
            this.funcGetTableLists();
        },
        /* 创建显示弹窗 */
        funcDialogShow() {
            this.is_updata = false;
            this.visibility = true;
            this.$nextTick(() => {
                this.$refs.create_form.clearValidate();
            });
        },
        /* 关闭弹窗 */
        funcDialogClose() {
            this.visibility = false;
            this.create_form = Object.assign({},this.$options.data().create_form);
        },
        /* 创建资金方 */
        funcCreateSubmit(formName) {
            this.$refs[formName].validate( async (valid) => {
                if (valid) {
                    try {
                        let params = this.create_form;
                        this.is_submit = false;
                        let { status } = await createCapital(params);
                        this.is_submit = true;
                        if( status == 'SUCCESS' ){
                            this.curr_page = 1;
                            this.funcGetTableLists();
                            this.funcDialogClose();
                            this.$store.dispatch('select/getSelect');
                            this.$message({
                                showClose: true,
                                message: '资金方创建成功！',
                                type: 'success'
                            });
                        }
                    }
                    catch(err){
                        this.is_submit = true;
                    }
                }
            });
        },
        /* 编辑资金方 */
        funcUpadataFile(row){
            this.create_form = Object.assign({},{
                id: row.id,
                registeredNo: row.registered_no,
                companyName: row.company_name,
                fundingPartyName: row.funding_party_name,
                unifiedSocialCreditCode: row.unified_social_credit_code,
                signatureId: row.signature_id
            });
            this.visibility = true;
            this.is_updata = true;
            this.$nextTick(() => {
                this.$refs.create_form.clearValidate();
            });
        },
        /* 更新资产方 */
        funcUpdateSubmit(formName) {
            this.$refs[formName].validate( async (valid) => {
                if (valid) {
                    try{
                        let params = this.create_form;
                        this.is_submit = false;
                        let { status } = await updateCapital(params);
                        this.is_submit = true;
                        if( status == 'SUCCESS' ){
                            this.funcGetTableLists();
                            this.funcDialogClose();
                            this.$message({
                                showClose: true,
                                message: '资金方更新成功！',
                                type: 'success'
                            });
                            this.$store.dispatch('select/getSelect');
                        }
                    }
                    catch(err){
                        this.is_submit = true;
                    }
                }
            });
        },
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
.el_width_250 {
    width: 250px;
}
.el_width_200{
    width: 200px;
}
.el_width_150{
    width: 150px;
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
