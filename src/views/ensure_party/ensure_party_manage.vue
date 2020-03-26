<template>
    <div class="app-container">
        <!-- 搜索 -->
        <div class="header_con">
            <el-form :inline="true">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="保障方ID">
                            <el-input v-model="search_query.assurePartyId" class="el_input" />
                        </el-form-item>
                        <el-form-item label="保障方名称">
                            <el-input v-model="search_query.assurePartyName" class="el_input" />
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <el-date-picker v-model="search_query.startDate" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" default-time="00:00:00" class="el_input"></el-date-picker>
                            <em class="time_space">至</em>
                            <el-date-picker v-model="search_query.endDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" default-time="23:59:59" class="el_input"></el-date-picker>
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
            <el-button type="primary" v-permission="['admin','ensurePartyManage:add']" icon="el-icon-circle-plus-outline" @click="funcDialogShow">创建</el-button>
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
                <el-table-column label="保障方ID" width="110" align="center" prop="id">
                </el-table-column>
                <el-table-column label="保障方名称" prop="assure_party_name" width="150" align="center">
                </el-table-column>
                <el-table-column label="保障方式" width="160" align="center" prop="assure_way_name">
                </el-table-column>
                <el-table-column label="公司名称" width="200" align="center" prop="assure_company_name">
                </el-table-column>
                <el-table-column label="统一社会信用代码" width="180" align="center" prop="unified_social_credit_code">
                </el-table-column>
                <el-table-column label="签章" width="200" align="center" prop="signature_name">
                </el-table-column>
                <el-table-column label="创建人" width="110" align="center" prop="create_user_name">
                </el-table-column>
                <el-table-column label="创建时间" width="160" align="center" prop="create_time">
                </el-table-column>
                <el-table-column label="修改人" width="110" align="center" prop="update_user_name">
                </el-table-column>
                <el-table-column label="修改时间" width="160" align="center" prop="update_time">
                </el-table-column>
                <el-table-column label="操作" align="center" width="120">
                    <template slot-scope="scope">
                        <el-button v-permission="['admin','ensurePartyManage:edit']" type="primary" size="mini" @click="funcUpadataFile(scope.row)">编辑</el-button>
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
        :title="is_updata?'编辑保障方':'创建保障方'"
        :visible.sync="visibility"
        width="35%"
        :show-close="false"
        :close-on-click-modal="false"
        :before-close="funcDialogClose">
            <div class="dialog_section">
                <el-form :model="create_form" :rules="rules" ref="create_form" label-width="130px">
                    <el-form-item label="保障方ID" v-if="is_updata">
                        <el-input :disabled="true" v-model="create_form.id" class="el_width_200"></el-input>
                    </el-form-item>
                    <el-form-item label="保障方名称" prop="assurePartyName">
                        <el-input v-model="create_form.assurePartyName" class="el_width_300"></el-input>
                    </el-form-item>
                    <el-form-item label="保障方式" prop="assureWayId">
                        <el-select clearable v-model="create_form.assureWayId">
                            <el-option v-for="item in assure_way" :label="item.assure_way_name" :value="item.assure_way_id" :key="item.assure_way_id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="公司名称" prop="assureCompanyName">
                        <el-input :disabled="true" v-model="create_form.assureCompanyName" class="el_width_300"></el-input>
                    </el-form-item>
                    <el-form-item label="统一社会信用代码" prop="registeredNo">
                        <el-input :disabled="true" v-model="create_form.registeredNo" class="el_width_200"></el-input>
                    </el-form-item>
                    <el-form-item label="签章" prop="signatureId">
                        <el-select clearable v-model="create_form.signatureId">
                            <el-option v-for="item in sign" :label="item.sign_name" :value="item.sign_id" :key="item.sign_id" />
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="funcDialogClose">取 消</el-button>
                <template v-if="is_updata">
                    <el-button type="primary" :disabled="is_submit" @click="funcUpdateFile('create_form')">更新</el-button>
                </template>
                <template v-else>
                    <el-button type="primary" :disabled="is_submit" @click="funcCreateFile('create_form')">创建</el-button>
                </template>
            </div>
        </el-dialog>
        <!-- End -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { formatParmas } from '@/utils'
import { ensurePartyList, ensureCreateFile, ensureUpdateFile, ensureDetailsFile } from '@/api/ensure'
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js'
export default {
    directives: { permission },
    data() {
        return {
            visibility: false,
            is_updata: false,
            create_form: {},
            search_query: {},
            loading: false,
            is_submit: false,
            list: null,
            total: 0,
            curr_page: 1,
            page_size: 20,
            rules: {
                assurePartyName: [
                    { required: true, message: '内容不能为空，请输入', trigger: 'blur' }
                ],
                assureWayId: [
                    { required: true, message: '内容不能为空，请选择', trigger: 'change' }
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
    watch: {
        'create_form.signatureId':function(n,o){
            let result = {};
            this.sign.forEach((item,index) => {
                if( item.sign_id == n ) result = item
            });
            this.create_form.assureCompanyName = result.sign_company_name || '';
            this.create_form.registeredNo = result.sign_unified_social_credit_code || '';
        }
    },
    components: { 
        Pagination 
    },
    computed: mapGetters(['sign','assure_way']),
    created(){
        this.funcGetTableList()
    },
    methods: {
        async funcGetTableList() {
            let params = {
                pageNum: this.curr_page,
                pageSize: this.page_size,
                parameters: formatParmas(this.search_query)
            }
            this.loading = true;
            let { status, returnData, pageInfo } = await ensurePartyList(params);
            this.loading = false;
            if( status == 'SUCCESS' ){
                this.list = returnData;
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
            this.funcGetTableList();
        },
        /* 创建显示弹窗 */
        funcDialogShow() {
            this.is_updata = false;
            this.visibility = true;
        },
        /* 关闭弹窗 */
        funcDialogClose() {
            this.visibility = false;
            this.$refs.create_form.resetFields();
            this.create_form = {};
        },
        /* 创建 */
        funcCreateFile(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let params = {
                        assurePartyName: this.create_form.assurePartyName,
                        assureWayId: this.create_form.assureWayId,
                        signatureId: this.create_form.signatureId
                    };
                    this.is_submit = true;
                    let { status } = await ensureCreateFile(params);
                    this.is_submit = false;
                    if( status == 'SUCCESS' ){
                        this.curr_page = 1;
                        this.funcGetTableList();
                        this.funcDialogClose();
                        this.$message({
                            showClose: true,
                            message: '保障方创建成功！',
                            type: 'success'
                        });
                        this.$store.dispatch('select/getSelect');
                    }
                }
            });
        },
        /* 编辑 */
        async funcUpadataFile(row){
            let query = {
                assureParty_id: row.id
            }
            let { status, returnData } = await ensureDetailsFile(query);
            if( status == 'SUCCESS' ){
                this.create_form = returnData;
                this.visibility = true;
                this.is_updata = true;
            }
        },
        /* 编辑保障方 */
        funcUpdateFile(formName){
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let id = this.create_form.id;
                    let params = {
                        assurePartyName: this.create_form.assurePartyName,
                        assureWayId: this.create_form.assureWayId,
                        signatureId: this.create_form.signatureId
                    };
                    this.is_submit = true;
                    let { status } = await ensureUpdateFile(id,params);
                    this.is_submit = false;
                    if( status == 'SUCCESS' ){
                        this.funcGetTableList();
                        this.funcDialogClose();
                        this.$store.dispatch('select/getSelect');
                        this.$message({
                            showClose: true,
                            message: '保障方更新成功！',
                            type: 'success'
                        });
                    }
                }
            });
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
.el_width_200{
    width: 200px;
}
.el_width_300{
    width: 300px;
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
