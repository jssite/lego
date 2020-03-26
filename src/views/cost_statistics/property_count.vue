<template>
    <div class="app-container">
        <!-- 搜索 -->
        <div class="header_con">
            <el-form :inline="true">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="保障方名称">
                            <el-select clearable class="el_select" v-model="search_query.assure_party_id">
                                <el-option v-for="item in assure_party" :label="item.assure_party_name" :value="item.assure_id" :key="item.assure_id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="资金方">
                            <el-select clearable class="el_select" v-model="search_query.funding_party_id">
                                <el-option v-for="item in funding_party" :label="item.funding_party_name" :value="item.funding_party_id" :key="item.funding_party_id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="收入事项">
                            <el-select clearable class="el_select" v-model="search_query.type">
                                <el-option label="保障金" :value="1" />
                                <el-option label="保障服务费" :value="2" />
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" icon="el-icon-search" @click="handleSearchFilter">查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!-- End -->
        <!-- 数据列表 -->
        <div class="section_con">
            <el-table
            v-loading="loading"
            :data="tableList"
            border
            highlight-current-row
            :header-cell-style="{background: '#f2f2f2'}"
            style="width: 100%;">
                <el-table-column label="保障方公司名称" align="center" prop="assure_company_name" />
                <el-table-column label="保障方名称" width="250" align="center" prop="assure_party_name" />
                <el-table-column label="资金方" width="250" align="center" prop="funding_party_name" />
                <el-table-column label="收入事项" width="200" align="center">
                    <template slot-scope="scope">
                        <template v-if="scope.row.income_matters == 1">保障金</template>
                        <template v-if="scope.row.income_matters == 2">保障服务费</template>
                    </template>
                </el-table-column>
                <el-table-column label="累计收入金额" width="180" align="center" prop="amount" />
                <el-table-column label="收入明细" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="funcDialogShow(scope.row)">导出</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- End -->
        <!-- 页码 -->
        <pagination class="page_align" v-show="total" :total="total" :page.sync="curr_page" :limit.sync="page_size" @pagination="funcGetTableList" />
        <!-- End -->
        <!-- 弹窗 -->
        <el-dialog
        :visible.sync="visibility"
        width="830px"
        :close-on-click-modal="false"
        :before-close="handleDialogClose">
            <div class="dialog_section">
                <el-form :inline="true" :model="export_date" :rules="rules" ref="export" :hide-required-asterisk="true">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="保障方名称">
                                <el-select :disabled="true" clearable class="el_select_180" v-model="exportInfo.assure_party_id">
                                    <el-option v-for="item in assure_party" :label="item.assure_party_name" :value="item.assure_id" :key="item.assure_id" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="资金方">
                                <el-select :disabled="true" class="el_select_180" v-model="exportInfo.funding_party_id">
                                    <el-option v-for="item in funding_party" :label="item.funding_party_name" :value="item.funding_party_id" :key="item.funding_party_id" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="收入事项">
                                <el-select :disabled="true" clearable class="el_select_180" v-model="exportInfo.income_matters">
                                    <el-option label="保障金" :value="1" />
                                    <el-option label="保障服务费" :value="2" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-table
                            :data="exportList"
                            border
                            highlight-current-row
                            :header-cell-style="{background: '#f2f2f2'}"
                            style="width: 100%;">
                                <el-table-column label="资产产品ID" width="150" align="center" prop="asset_product_id" />
                                <el-table-column label="进件编号" align="center" prop="third_bid_num" />
                                <el-table-column label="收入金额" width="150" align="center" prop="amount" />
                                <el-table-column label="交易时间" width="200" align="center" prop="create_time" />
                            </el-table>
                        </el-col>
                        <el-col :span="24" class="el_export">
                            <el-form-item label="交易时间" prop="start_date">
                                <el-date-picker type="datetime" v-model="export_date.start_date" default-time="00:00:00" value-format="yyyy-MM-dd HH:mm:ss" class="el_input"></el-date-picker>
                            </el-form-item>
                            <em class="time_space">至</em>
                            <el-form-item prop="end_date">
                                <el-date-picker type="datetime" v-model="export_date.end_date" default-time="23:59:59" value-format="yyyy-MM-dd HH:mm:ss" class="el_input"></el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" v-permission="['admin','propertyCount:export']" icon="el-icon-search" @click="funcExpoftFile('export')">导出</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-dialog>
        <!-- End -->
    </div>
</template>

<script>
import { formatParmas, param } from '@/utils'
import { mapGetters } from 'vuex';
import { propertyCountList, propertyCountDetail, exportPropertyCountDetail } from '@/api/cost_statistics'
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js'
export default {
    data() {
        return {
            visibility: false,
            search_query: {},
            loading: false,
            tableList: null,
            exportList: null,
            export_date: {
                start_date: '',
                end_date: ''
            },
            exportInfo: {},
            total: 0,
            curr_page: 1,
            page_size: 20,
            rules: {
                start_date: [
                    { required: true, message: '时间不能为空，请选择', trigger: 'blur' }
                ],
                end_date: [
                    { required: true, message: '时间不能为空，请选择', trigger: 'blur' },
                    {
                        validator:(rule,value,callback) => {
                            var s = this.export_date.start_date;
                            if(s){
                                let startTimemap = +new Date(s);
                                let endTimemap = +new Date(value);
                                if( endTimemap < startTimemap) {
                                    callback(new Error('结束时间必须大于开始时间'));
                                } else {
                                    callback();
                                }
                            } else {
                                callback();
                            }
                        },
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    directives: { 
        permission
    },
    components: { 
        Pagination 
    },
    computed: mapGetters(['assure_party','funding_party']),
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
            let { status, returnData, pageInfo } = await propertyCountList(params);
            this.loading = false;
            if( status == 'SUCCESS' ){
                this.tableList = returnData;
                this.total = pageInfo.totalCount || 0;
            }
        },
        /* 搜索 */
        handleSearchFilter() {
            this.curr_page = 1;
            this.funcGetTableList();
        },
        /* 显示弹窗 */
        async funcDialogShow(row) {
            let query = {
                assure_party_id: row.assure_party_id,
                funding_party_id: row.funding_party_id,
                income_matters: row.income_matters
            }
            this.exportInfo = row;
            let { status, returnData } = await propertyCountDetail(query);
            if( status == 'SUCCESS' ){
                this.exportList = returnData;
                this.visibility = true;
            }
        },
        /* 关闭弹窗 */
        handleDialogClose() {
            this.visibility = false;
            this.$refs.export.resetFields();
        },
        /* 导出 */
        funcExpoftFile(ref){
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    let startTimemap = new Date(this.export_date.start_date).getTime();
                    let endTimemap = new Date(this.export_date.end_date).getTime();
                    let query = {
                        assure_party_id: this.exportInfo.assure_party_id,
                        funding_party_id: this.exportInfo.funding_party_id,
                        income_matters: this.exportInfo.income_matters,
                        start_date: this.export_date.start_date,
                        end_date: this.export_date.end_date
                    }
                    if( endTimemap < startTimemap ){
                        this.$message({
                            message: '导出开始时间大于结束时间，请重新选择！',
                            type: 'error'
                        });
                        return false;
                    }
                    exportPropertyCountDetail(param(query));
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
.el_select_180 {
    width: 180px;
}
.el_export {
    padding-top: 20px;
    text-align: center;
}
.time_space {
    padding: 0 10px 0 0;
    font-style: normal;
    line-height: 36px;
}
.page_align {
    text-align: right;
}
.aside_con {
    padding-bottom: 10px;
}
</style>
