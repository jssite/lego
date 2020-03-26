<template>
    <div class="app-container">
        <!-- 搜索 -->
        <div class="header_con">
            <el-form :inline="true">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="借款人姓名" label-width="100px">
                            <el-input class="el_input" v-model="search_query.name" />
                        </el-form-item>
                        <el-form-item label="身份证号" label-width="100px">
                            <el-input class="el_input" v-model="search_query.id_number" />
                        </el-form-item>
                        <el-form-item label="资金方" label-width="100px">
                            <el-select clearable v-model="search_query.funding_party_id" class="el_select">
                                <el-option v-for="item in funding_party" :key="item.fund_party_id" :label="item.funding_party_name" :value="item.funding_party_id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="开户结果" label-width="100px">
                            <el-select clearable class="el_select" v-model="search_query.state">
                                <el-option label="开户成功" :value="1" />
                                <el-option label="开户失败" :value="0" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="开户授权结果" label-width="100px">
                            <el-select clearable class="el_select" v-model="search_query.signing_result">
                                <el-option label="开户授权成功" :value="1" />
                                <el-option label="开户授权失败" :value="0" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="开户申请时间" label-width="100px">
                            <el-date-picker type="datetime" v-model="search_query.apply_start_date" default-time="00:00:00" class="el_input"></el-date-picker>
                            <em class="time_space">至</em>
                            <el-date-picker type="datetime" v-model="search_query.apply_end_date" default-time="23:59:59" class="el_input"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="开户授权处理按成时间" label-width="160px">
                            <el-date-picker type="datetime" v-model="search_query.complete_start_date" default-time="00:00:00" class="el_input"></el-date-picker>
                            <em class="time_space">至</em>
                            <el-date-picker type="datetime" v-model="search_query.complete_end_date" default-time="23:59:59" class="el_input"></el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" icon="el-icon-search" @click="funcSearchFilter">查询</el-button>
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
                <el-table-column label="身份证号" width="150" align="center" prop="id_number" />
                <el-table-column label="资金方" width="150" align="center" prop="funding_party_name" />
                <el-table-column label="存管银行" width="120" align="center" prop="deposit_bank_name" />
                <el-table-column label="开户银行卡号" width="180" align="center" prop="bank_card_number" />
                <el-table-column label="开户银行卡预留手机号" width="170" align="center" prop="mobile" /> 
                <el-table-column label="开户申请时间" width="170" align="center" prop="open_account_apply_time" />
                <el-table-column label="开户处理完成时间" width="170" align="center" prop="open_account_complete_time" />
                <el-table-column label="开户结果" width="150" align="center">
                    <template slot-scope="scope">
                        <template v-if="scope.row.open_account_result == 0">失败</template>
                        <template v-if="scope.row.open_account_result == 1">成功</template>
                    </template>
                </el-table-column>
                <el-table-column label="开户授权申请时间" width="170" align="center" prop="signing_apply_time" />
                <el-table-column label="开户授权处理完成时间" width="170" align="center" prop="signing_complete_time" />
                <el-table-column label="开户授权结果" width="150" align="center">
                    <template slot-scope="scope">
                        <template v-if="scope.row.signing_result == 0">开户授权失败</template>
                        <template v-if="scope.row.signing_result == 1">开户授权成功</template>
                    </template>
                </el-table-column>
                <el-table-column label="详情信息" width="110" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" v-permission="['admin','openUserManage:detail']" @click="funcDialogShow(scope.row)">查看</el-button>
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
        :visible.sync="visibility"
        width="450px"
        :close-on-click-modal="false"
        :before-close="funcDialogClose">
            <div class="dialog_section">
                <el-form label-width="100px">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="借款人姓名">
                                <el-input :disabled="true" v-model="product.username" class="el_input"></el-input>
                            </el-form-item>
                            <el-form-item label="身份证号">
                                <el-input :disabled="true" v-model="product.IDCard" class="el_input"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" class="el_title">开户授权信息：</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-table
                                :data="product.info"
                                border
                                highlight-current-row
                                :header-cell-style="{background: '#f2f2f2'}"
                                style="width: 100%;">
                                    <el-table-column width="110" align="center">
                                        <template slot-scope="scope">
                                            {{scope.row.type == 1?'缴费':'还款'}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="单笔限额" align="center" prop="amount">
                                    </el-table-column>
                                    <el-table-column label="有效截止时间" width="170" align="center" prop="deadline_time">
                                    </el-table-column>
                                </el-table>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-dialog>
        <!-- End -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { openUserManage, openUserManageDetail } from '@/api/usermanage'
import Pagination from '@/components/Pagination'
import { formatParmas } from '@/utils'
import permission from '@/directive/permission/index.js'
export default {
    data() {
        return {
            visibility: false,
            search_query: {},
            loading: false,
            tableLists: null,
            product: {},
            total: 0,
            curr_page: 1,
            page_size: 20
        }
    },
    directives: { 
        permission
    },
    computed: mapGetters(['funding_party']),
    components: { 
        Pagination 
    },
    created(){
        this.funcGetTableList()
    },
    methods: {
        /* 初始化获取列表数据 */
        async funcGetTableList() {
            let params = {
                pageNum: this.curr_page,
                pageSize: this.page_size,
                parameters: formatParmas(this.search_query)
            }
            this.loading = true;
            let { status, pageInfo, returnData } = await openUserManage(params);
            this.loading = false;
            if( status == 'SUCCESS' ){
                this.tableLists = returnData;
                this.total = pageInfo.totalCount || 0;
            }
        },
        /* 搜索 */
        funcSearchFilter() {
            let query = this.search_query;
            if( (query.apply_start_date && !query.apply_end_date) || ( !query.apply_start_date && query.apply_end_date ) ){
                this.$message({
                    message: '查询开始时间或结束时间不能为空！',
                    type: 'error'
                });
                return false;
            }
            if( (query.complete_start_date && !query.complete_end_date) || ( !query.complete_start_date && query.complete_end_date ) ){
                this.$message({
                    message: '查询开始时间或结束时间不能为空！',
                    type: 'error'
                });
                return false;
            }
            this.curr_page = 1;
            this.funcGetTableList();
        },
        /* 显示弹窗 */
        async funcDialogShow(row) {
            let query = {
                order_id: row.order_id,
                fund_product_id: row.fund_product_id
            }
            let { status, returnData } = await openUserManageDetail(query);
            if( status == 'SUCCESS' ){
                this.product = Object.assign({},{
                    info: returnData,
                    username: row.borrow_name,
                    IDCard: row.id_number
                });
                this.visibility = true;
            }
        },
        /* 关闭弹窗 */
        funcDialogClose() {
            this.visibility = false;
        }
    }
}
</script>

<style lang="scss" scoped>
.el_input {
    width: 210px;
}
.el_title {
    font-weight: 700;
    padding: 0 0 10px;
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
