<template>
    <div class="app-container">
        <!-- 搜索 -->
        <div class="header_con">
            <el-form :inline="true">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="资金方名称">
                            <el-select clearable class="el_select" v-model="search_query.assure_party_id">
                                <el-option v-for="item in funding_party" :label="item.funding_party_name" :key="item.funding_party_id" :value="item.funding_party_id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="资金方公司名称">
                            <el-select clearable class="el_select" v-model="search_query.signature_id">
                                <el-option v-for="item in sign" :key="item.sign_id" :label="item.sign_company_name" :value="item.sign_id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" icon="el-icon-search" @click="funcSearchQuery">查询</el-button>
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
                <el-table-column label="资金方公司名称" align="center" prop="funding_company_name" />
                <el-table-column label="资金方名称" align="center" prop="funding_party_name" />
                <el-table-column label="收入事项" align="center">
                    <template slot-scope="scope">
                        <template v-if="scope.row.income_matters == 3">
                            居间服务费
                        </template>
                        <template v-if="scope.row.income_matters == 4">
                            反担保费
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="累计收入金额" width="180" align="center" prop="amount" />
                <el-table-column label="收入明细" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" v-permission="['admin','capitalCount:export']"  @click="funcDialogShow(scope.row)">导出</el-button>
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
        width="850px"
        :close-on-click-modal="false"
        :before-close="handleDialogClose">
            <div class="dialog_section">
                <el-form :inline="true" :model="export_date" :rules="rules" ref="export" :hide-required-asterisk="true">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="资金方公司名称">
                                <el-input :disabled="true" v-model="detail.funding_company_name" class="el_input" />
                            </el-form-item>
                            <el-form-item label="资金方名称">
                                <el-input :disabled="true" v-model="detail.funding_party_name" class="el_width_150" />
                            </el-form-item>
                            <el-form-item label="收入事项">
                                <template v-if="detail.income_matters == 1">
                                    <el-input :disabled="true" value="居间服务费" class="el_width_150" />
                                </template>
                                <template v-else>
                                    <el-input :disabled="true" value="" class="el_width_150" />
                                </template>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-table
                            v-loading="loading"
                            :data="detail_list"
                            border
                            highlight-current-row
                            :header-cell-style="{background: '#f2f2f2'}"
                            style="width: 100%;">
                                <el-table-column label="资产产品ID" width="120" align="center" prop="asset_product_id" />
                                <el-table-column label="进件编号" align="center" prop="third_bid_num" />
                                <el-table-column label="收入金额" width="150" align="center" prop="amount" />
                                <el-table-column label="费用类型" width="100" align="center">
                                    <template slot-scope="scope">
                                        <template v-if="scope.row.cost_type == 0">趸缴</template>
                                        <template v-if="scope.row.cost_type == 1">期缴</template>
                                    </template>
                                </el-table-column>
                                <el-table-column label="交易时间" width="200" align="center" prop="create_time" />
                            </el-table>
                        </el-col>
                        <el-col :span="24" class="el_export">
                            <el-form-item label="交易时间" prop="start_time">
                                <el-date-picker type="datetime" v-model="export_date.start_time" value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" class="el_input"></el-date-picker>
                            </el-form-item>
                            <em class="time_space">至</em>
                            <el-form-item prop="end_time">
                                <el-date-picker type="datetime" v-model="export_date.end_time" value-format="yyyy-MM-dd HH:mm:ss" default-time="23:59:59" class="el_input"></el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" icon="el-icon-search" @click="funcExpoftFile('export')">导出</el-button>
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
import { capitalCountList, capitalCountDetail, exportCapitalCount } from '@/api/cost_statistics'
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js'
export default {
    data() {
        return {
            visibility: false,
            search_query: {},
            loading: false,
            tableList: null,
            total: 0,
            curr_page: 1,
            page_size: 20,
            detail: {},
            detail_list: null,
            export_date: {
                start_time: '',
                end_time: ''
            },
            rules: {
                start_time: [
                    { required: true, message: '时间不能为空，请选择', trigger: 'blur' }
                ],
                end_time: [
                    { required: true, message: '时间不能为空，请选择', trigger: 'blur' },
                    {
                        validator:(rule,value,callback) => {
                            var s = this.export_date.start_time;
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
    computed: mapGetters(['funding_party','sign']),
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
            let { status, pageInfo, returnData } = await capitalCountList(params);
            this.loading = false;
            if( status == 'SUCCESS' ){
                this.tableList = returnData;
                this.total = pageInfo.totalCount || 0;
            }
        },
        /* 搜索 */
        funcSearchQuery() {
            this.curr_page = 1;
            this.funcGetTableList();
        },
        /* 显示弹窗 */
        async funcDialogShow(row) {
            let query = {
                funding_party_id: row.funding_party_id,
                income_matters: row.income_matters
            }
            this.detail = Object.assign({},{
                funding_company_name: row.funding_company_name,
                funding_party_name: row.funding_party_name,
                income_matters: row.income_matters,
                funding_party_id: row.funding_party_id

            })
            let { status, returnData } = await capitalCountDetail(query);
            if( status == 'SUCCESS' ){
                this.detail_list = returnData;
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
                    let query = {
                        funding_party_id: this.detail.funding_party_id,
                        income_matters: this.detail.income_matters,
                        start_date: this.export_date.start_time,
                        end_date: this.export_date.end_time
                    }
                    exportCapitalCount(param(query));
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
.el_width_150{
    width: 150px;
}
.el_export {
    padding-top: 20px;
    text-align: center;
}
.time_space {
    padding: 0 10px 0 0;
    line-height: 36px;
    font-style: normal;
}
.page_align {
    text-align: right;
}
.aside_con {
    padding-bottom: 10px;
}
</style>
