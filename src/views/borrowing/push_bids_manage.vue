<template>
    <div class="app-container">
        <!-- 搜索 -->
        <div class="header_con">
            <el-form :inline="true">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="资产产品ID" label-width="100px">
                            <el-input class="el_input" v-model="search_query.asset_product_id" />
                        </el-form-item>
                        <el-form-item label="资产方" label-width="100px">
                            <el-select clearable v-model="search_query.asset_party_id" class="el_select">
                                <el-option v-for="item in asset_party" :key="item.asset_party_id" :label="item.asset_party_name" :value="item.asset_party_id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="进件编号" label-width="100px">
                            <el-input class="el_input" v-model="search_query.third_bid_num" />
                        </el-form-item>
                        <el-form-item label="资金方" label-width="100px">
                            <el-select clearable v-model="search_query.fund_party_id" class="el_select">
                                <el-option v-for="item in funding_party" :key="item.fund_party_id" :label="item.funding_party_name" :value="item.funding_party_id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="推标完成时间" label-width="100px">
                            <el-date-picker type="datetime" v-model="search_query.apply_make_start_loan_time" default-time="00:00:00" class="el_input"></el-date-picker>
                            <em class="time_space">至</em>
                            <el-date-picker type="datetime" v-model="search_query.apply_make_end_loan_time" default-time="23:59:59" class="el_input"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="推标处理时间" label-width="100px">
                            <el-date-picker type="datetime" v-model="search_query.apply_make_start_process_time" default-time="00:00:00" class="el_input"></el-date-picker>
                            <em class="time_space">至</em>
                            <el-date-picker type="datetime" v-model="search_query.apply_make_end_process_time" default-time="23:59:59" class="el_input"></el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" icon="el-icon-search" @click="funcSearchLists">查询</el-button>
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
                <el-table-column label="资产产品ID" align="center" width="100" prop="asset_product_id">
                </el-table-column>
                <el-table-column label="进件编号" align="center" prop="third_bid_num">
                </el-table-column>
                <el-table-column label="资产方" align="center" prop="asset_party_name">
                </el-table-column>
                <el-table-column label="资金方" align="center" prop="fund_party_name">
                </el-table-column>
                <el-table-column label="推标处理时间" width="200" align="center" prop="apply_make_process_time">
                </el-table-column>
                <el-table-column label="推标完成时间" width="200" align="center" prop="apply_make_loan_time">
                </el-table-column>
            </el-table>
        </div>
        <!-- End -->
        <!-- 页码 -->
        <pagination class="page_align" v-show="total" :total="total" :page.sync="curr_page" :limit.sync="page_size" @pagination="funcGetTableLists" />
        <!-- End -->
    </div>
</template>

<script>
import { formatParmas } from '@/utils'
import { mapGetters } from 'vuex';
import { pushBidsManageLists } from '@/api/borrowing'
import Pagination from '@/components/Pagination'
export default {
    data() {
        return {
            search_query: {},
            loading: false,
            tableList: null,
            total: 10,
            curr_page: 1,
            page_size: 20
        }
    },
    computed:mapGetters(['funding_party','asset_party']),
    components: { 
        Pagination 
    },
    created(){
        this.funcGetTableLists()
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
            let { status, pageInfo, returnData } = await pushBidsManageLists(params)
            this.loading = false;
            if( status == 'SUCCESS' ){
                this.tableList = returnData;
                this.total = pageInfo.totalCount || 0;
            }
        },
        /* 搜索 */
        funcSearchLists() {
            let query = this.search_query;
            if( (query.apply_make_start_process_time && !query.apply_make_end_process_time) || ( !query.apply_make_start_process_time && query.apply_make_end_process_time ) ){
                this.$message({
                    message: '查询开始时间或结束时间不能为空！',
                    type: 'error'
                });
                return false;
            }
            if( (query.apply_make_start_loan_time && !query.apply_make_end_loan_time) || ( !query.apply_make_start_loan_time && query.apply_make_end_loan_time ) ){
                this.$message({
                    message: '查询开始时间或结束时间不能为空！',
                    type: 'error'
                });
                return false;
            }
            this.curr_page = 1;
            this.funcGetTableLists();
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
.time_space {
    padding: 0 10px;
    font-style: normal;
}
.page_align {
    text-align: right;
}
.file_link {
    color: #1890ff;
    display: block;
}
</style>
