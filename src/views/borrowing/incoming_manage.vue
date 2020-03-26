<template>
    <div class="app-container">
        <!-- 搜索 -->
        <div class="header_con">
            <el-form :inline="true">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="资产产品ID" label-width="85px">
                            <el-input class="el_input" v-model.number="search_query.asset_product_id" />
                        </el-form-item>
                        <el-form-item label="资金方" label-width="85px">
                            <el-select v-model="search_query.fund_party_id" clearable class="el_select">
                                <el-option v-for="item in funding_party" :label="item.funding_party_name" :value="item.funding_party_id" :key="item.funding_party_id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="资产方" label-width="85px">
                            <el-select v-model="search_query.asset_party_id" clearable class="el_select">
                                <el-option v-for="item in asset_party" :label="item.asset_party_name" :value="item.asset_party_id" :key="item.asset_party_id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="进件编号" label-width="85px">
                            <el-input class="el_input" v-model="search_query.third_bid_num" />
                        </el-form-item>
                        <el-form-item label="进件状态" label-width="85px">
                            <el-select v-model="search_query.bid_state" clearable class="el_select">
                                <el-option label="签约中" :value="1" />
                                <el-option label="待放款" :value="2" />
                                <el-option label="放款中" :value="3" />
                                <el-option label="放款失败" :value="4" />
                                <el-option label="还款中" :value="5" />
                                <el-option label="已撤销" :value="6" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="进件时间" label-width="85px">
                            <el-date-picker v-model="search_query.create_start_time" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" default-time="00:00:00" class="el_input"></el-date-picker>
                            <em class="time_space">至</em>
                            <el-date-picker v-model="search_query.create_end_time" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" default-time="23:59:59" class="el_input"></el-date-picker>
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
            ref="table"
            :data="list"
            border
            highlight-current-row
            :header-cell-style="{background: '#f2f2f2'}"
            style="width: 100%;">
                <el-table-column label="资产产品ID" align="center" width="100" prop="asset_product_id">
                </el-table-column>
                <el-table-column label="进件编号" width="220" align="center" prop="third_bid_num">
                </el-table-column>
                <el-table-column label="资产方" min-width="150" align="center" prop="asset_party_name">
                </el-table-column>
                <el-table-column label="资金产品ID" width="100" align="center" prop="fund_product_id">
                </el-table-column>
                <el-table-column label="资金方" min-width="150" align="center" prop="fund_party_name">
                </el-table-column>
                <el-table-column label="状态" width="80" align="center">
                    <template slot-scope="scope">
                        <template v-if="scope.row.bid_state == 1">签约中</template>
                        <template v-if="scope.row.bid_state == 2">待放款</template>
                        <template v-if="scope.row.bid_state == 3">放款中</template>
                        <template v-if="scope.row.bid_state == 4">放款失败</template>
                        <template v-if="scope.row.bid_state == 5">还款中</template>
                        <template v-if="scope.row.bid_state == 6">已撤销</template>
                        <template v-if="scope.row.bid_state == 7">放款成功</template>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="保障方" min-width="200" align="center" prop="assure_party_name">
                </el-table-column> -->
                <!-- <el-table-column label="保障方式" width="110" align="center" prop="assure_way_name">
                </el-table-column> -->
                <el-table-column label="借款人姓名" width="110" align="center" prop="real_name">
                </el-table-column>
                <el-table-column label="身份证号" width="170" align="center" prop="id_no">
                </el-table-column>
                <el-table-column label="借款金额(元)" width="100" align="center" prop="loan_money">
                </el-table-column>
                <el-table-column label="借款期限(月)" width="100" align="center" prop="loan_period">
                </el-table-column>
                <!-- <el-table-column label="借款利率" width="90" align="center">
                </el-table-column> -->
                <!-- <el-table-column label="还款方式" width="130" align="center">
                    <template slot-scope="scope">
                        <template v-if="scope.row.repayment_type == 1">
                            等额本息
                        </template>
                        <template v-if="scope.row.repayment_type == 2">
                            每月还息到期还本
                        </template>
                        <template v-if="scope.row.repayment_type == 3">
                            到期还本付息
                        </template>
                    </template>
                </el-table-column> -->
                <!-- <el-table-column label="抵押信息" width="100" align="center" prop="mortgage_info">
                </el-table-column> -->
                <el-table-column label="详情信息" width="80" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" v-permission="['admin','incomingManage:detail']" @click="funcToogleExpand(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="风控信息" width="80" align="center">
                    <template slot-scope="scope">
                        <span v-permission="['admin','incomingManage:detail']">查看</span>
                    </template>
                </el-table-column> -->
                <el-table-column label="进件时间" width="160" align="center" prop="create_time">
                </el-table-column>
                <el-table-column type="expand" width="1">
                    <ul class="el_info_ul">
                        <li>
                            <label class="label_name">资产产品ID：</label>{{product_info.asset_product_id}}
                        </li>
                        <li>
                            <label class="label_name">进件编号：</label>{{product_info.third_bid_num}}
                        </li>
                        <li>
                            <label class="label_name">借款用途：</label>{{product_info.loan_purpose}}
                        </li>
                        <li>
                            <label class="label_name">还款来源：</label>{{product_info.repay_source}}
                        </li>
                        <li>
                            <label class="label_name">保障方：</label>{{product_info.assure_party_name}}
                        </li>
                        <li>
                            <label class="label_name">保障方式：</label>{{product_info.assure_way_name}}
                        </li>
                        <li>
                            <label class="label_name">还款方式：</label>
                            <template v-if="product_info.repayment_type == 1">
                                等额本息
                            </template>
                            <template v-if="product_info.repayment_type == 2">
                                每月还息到期还本
                            </template>
                            <template v-if="product_info.repayment_type == 3">
                                到期还本付息
                            </template>
                        </li>
                        <li>
                            <label class="label_name">抵押信息：</label>{{product_info.mortgage_info}}
                        </li>
                        <li>
                            <label class="label_name">风控信息：</label>查看
                        </li>
                        <template v-for="item in product_info.fee_info_list">
                            <li>
                                <label class="label_name">
                                    <span v-if="item.feeType == 1">保障金趸缴金额(元)：</span>
                                    <span v-if="item.feeType == 2">担保服务费趸缴金额(元)：</span>
                                    <span v-if="item.feeType == 3">居间服务费趸缴金额(元)：</span>
                                    <span v-if="item.feeType == 4">反担保费趸缴金额(元)：</span>
                                </label>{{item.singleFee}}
                            </li>
                            <li>
                                <label class="label_name">
                                    <span v-if="item.feeType == 1">保障金期缴金额(元)：</span>
                                    <span v-if="item.feeType == 2">担保服务费期缴金额(元)：</span>
                                    <span v-if="item.feeType == 3">居间服务费期缴金额(元)：</span>
                                    <span v-if="item.feeType == 4">反担保费期缴金额(元)：</span>
                                </label>{{item.regularFee}}
                            </li>
                        </template>
                    </ul>
                </el-table-column>
            </el-table>
        </div>
        <!-- End -->
        <!-- 页码 -->
        <pagination class="page_align" v-show="total" :total="total" :page.sync="curr_page" :limit.sync="page_size" @pagination="funcGetTableList" />
        <!-- End -->
    </div>
</template>

<script>
import { formatParmas } from '@/utils'
import { mapGetters} from 'vuex'
import { incomingManageList } from '@/api/borrowing'
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js'
export default {
    data() {
        return {
            search_query: {},
            product_info: {},
            loading: false,
            list: null,
            total: 0,
            curr_page: 1,
            page_size: 20
        }
    },
    directives: { 
        permission
    },
    computed: mapGetters(['funding_party','asset_party']),
    components: { 
        Pagination 
    },
    created(){
        this.funcGetTableList()
    },
    methods: {
        /* 点击显示详情 */
        funcToogleExpand(row) {
            let $table = this.$refs.table;
            this.list.forEach((item) => {
                if (row.expand_id != item.expand_id) {
                    $table.toggleRowExpansion(item,false);
                }
            });
            this.product_info = row;
            $table.toggleRowExpansion(row)
        },
        /* 获取列表数据 */
        async funcGetTableList() {
            let params = {
                pageNum: this.curr_page,
                pageSize: this.page_size,
                parameters: formatParmas(this.search_query)
            }
            this.loading = true;
            let { status, returnData, pageInfo } = await incomingManageList(params);
            this.loading = false;
            if( status == 'SUCCESS' ){
                this.list = returnData.map((item,index) => {
                    if( typeof item.expand_id == 'undefined' ){
                        this.$set(item,'expand_id',index)
                    } else {
                        this.$set(item,'expand_id',index)
                    }
                    return item;
                });
                this.total = pageInfo.totalCount || 0;
            }

        },
        /* 搜索 */
        funcSearchFilter() {
            this.curr_page = 1;
            if( (this.search_query.create_start_time && !this.search_query.create_end_time) || ( !this.search_query.create_start_time && this.search_query.create_end_time ) ){
                this.$message({
                    message: '查询开始时间或结束时间不能为空！',
                    type: 'error'
                });
                return false;
            }
            this.funcGetTableList();
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
.el_disable {
    color: #DCDFE6;
}
.el_info_ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    li {
        width: 50%;
        padding-left: 20px;
        box-sizing: border-box;
        line-height: 40px;
        font-size: 14px;
    }
}
</style>
