<template>
    <div class="app-container">
        <!-- 搜索 -->
        <div class="header_con">
            <el-form :inline="true">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="资产产品ID" label-width="90px">
                            <el-input class="el_input" value="null" v-model="search_query.asset_product_id" />
                        </el-form-item>
                        <el-form-item label="进件编号" label-width="90px">
                            <el-input class="el_input" v-model.number="search_query.third_bid_num" />
                        </el-form-item>
                        <el-form-item label="资金方" label-width="90px">
                            <el-select v-model="search_query.asset_party_id" clearable placeholder="" class="el_select">
                                <el-option v-for="item in funding_party" :key="item.fund_party_id" :label="item.funding_party_name" :value="item.funding_party_id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="放款结果" label-width="90px">
                            <el-select v-model="search_query.order_state" clearable placeholder="" class="el_select">
                                <el-option label="待放款" :value="4" />
                                <el-option label="放款成功" :value="5" />
                                <el-option label="放款失败" :value="6" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="申请放款时间">
                            <el-date-picker v-model="search_query.apply_make_loan_start_time" type="datetime" default-time="00:00:00" class="el_input"></el-date-picker>
                            <em class="time_space">至</em>
                            <el-date-picker v-model="search_query.apply_make_loan_end_time" type="datetime" default-time="23:59:59" class="el_input"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="交易处理完成时间" label-width="130px">
                            <el-date-picker v-model="search_query.deal_make_loan_start_time" type="datetime" default-time="00:00:00" class="el_input"></el-date-picker>
                            <em class="time_space">至</em>
                            <el-date-picker v-model="search_query.deal_make_loan_end_time" type="datetime" default-time="23:59:59" class="el_input"></el-date-picker>
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
            :data="list"
            border
            highlight-current-row
            :header-cell-style="{background: '#f2f2f2'}"
            style="width: 100%;">
                <el-table-column label="资产产品ID" align="center" width="100" prop="asset_product_id" />
                <el-table-column label="进件编号" align="center" prop="third_bid_num" />
                <el-table-column label="资金方" align="center" prop="fund_party_name" />
                <el-table-column label="交易金额(元)" width="180" align="center" prop="loan_money" />
                <el-table-column label="申请放款时间" width="200" align="center" prop="apply_make_loan_time" />
                <el-table-column label="交易处理完成时间" width="200" align="center" prop="deal_make_loan_time" />
                <el-table-column label="放款结果" width="150" align="center">
                    <template slot-scope="scope">
                        <template v-if="scope.row.order_state == 4">待放款</template>
                        <template v-if="scope.row.order_state == 5">放款成功</template>
                        <template v-if="scope.row.order_state == 6">放款失败</template>
                    </template>
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
import { loansManageLists } from '@/api/borrowing'
import Pagination from '@/components/Pagination'
export default {
    data() {
        return {
            search_query: {},
            loading: false,
            list: null,
            total: 0,
            curr_page: 1,
            page_size: 20
        }
    },
    computed: mapGetters(['funding_party']),
    components: { 
        Pagination 
    },
    created(){
        this.funcGetTableLists();
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
            let { status, returnData, pageInfo } = await loansManageLists(params);
            this.loading = false;
            if( status == 'SUCCESS' ){
                this.list = returnData;
                this.total = pageInfo.totalCount || 0;
            }
        },
        /* 搜索 */
        handleSearchFilter() {
            let query = this.search_query;
            if( (query.deal_make_loan_start_time && !query.deal_make_loan_end_time) || ( !query.deal_make_loan_start_time && query.deal_make_loan_end_time ) ){
                this.$message({
                    message: '查询开始时间或结束时间不能为空！',
                    type: 'error'
                });
                return false;
            }
            if( (query.apply_make_loan_start_time && !query.apply_make_loan_end_time) || ( !query.apply_make_loan_start_time && query.apply_make_loan_end_time ) ){
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