<template>
    <div class="app-container">
        <!-- 搜索 -->
        <div class="header_con">
            <el-form :inline="true">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="借款人姓名">
                            <el-input v-model="search_query.borrowName" class="el_input" />
                        </el-form-item>
                        <el-form-item label="身份证号">
                            <el-input v-model="search_query.cardNo" class="el_input" />
                        </el-form-item>
                        <el-form-item label="支付授权状态">
                            <el-select v-model="search_query.paymentAuthState" clearable class="el_select">
                                <el-option label="授权成功" :value="1" />
                                <el-option label="授权失败" :value="0" />
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
            :data="tableLists"
            border
            highlight-current-row
            :header-cell-style="{background: '#f2f2f2'}"
            style="width: 100%;">
                <el-table-column label="借款人姓名" width="110" align="center" prop="borrow_name" />
                <el-table-column label="身份证号" align="center" prop="card_no" />
                <el-table-column label="银行名称" width="250" align="center" prop="payment_auth_bankname" />
                <el-table-column label="银行卡号" align="center" prop="payment_auth_bankcard" />
                <el-table-column label="银行卡预留手机号" width="180" align="center" prop="payment_auth_mobile" />
                <el-table-column label="授权支付渠道名称" align="center" prop="payment_channel_name" />
                <el-table-column label="支付授权状态" width="110" align="center">
                    <template slot-scope="scope">
                        {{scope.row.payment_auth_state == 1?'授权成功':'授权失败'}}
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- End -->
        <!-- 页码 -->
        <pagination class="page_align" v-show="total" :total="total" :page.sync="curr_page" :limit.sync="page_size" @pagination="funcGetPayList"></pagination>
        <!-- End -->
    </div>
</template>

<script>
import { payRecordLists } from '@/api/pay'
import { formatParmas } from '@/utils'
import Pagination from '@/components/Pagination'
export default {
    data() {
        return {
            search_query: {},
            loading: false,
            tableLists: null,
            total: 0,
            curr_page: 1,
            page_size: 20
        }
    },
    components: { 
        Pagination 
    },
    created(){
        this.funcGetPayList()
    },
    methods: {
        async funcGetPayList() {
            let params = {
                pageNum: this.curr_page,
                pageSize: this.page_size,
                parameters: formatParmas(this.search_query)
            }
            this.loading = true;
            let { pageInfo, returnData, status } = await payRecordLists(params);
            this.loading = false;
            if( status == 'SUCCESS' ){
                this.total = pageInfo.totalCount || 0;
                this.tableLists = returnData;
            }
        },
        /* 搜索 */
        handleSearchFilter() {
            this.curr_page = 1;
            this.funcGetPayList();
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
