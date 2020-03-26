<template>
    <div class="app-container">
        <!-- 搜索 -->
        <div class="header_con">
            <el-form :inline="true">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="支付渠道ID" label-width="90px">
                            <el-input class="el_input" v-model.number="search_query.payMentChannelId"  />
                        </el-form-item>
                        <el-form-item label="资金方名称">
                            <el-select clearable v-model="search_query.fundPartyId" class="el_select">
                                <el-option v-for="item in funding_party" :label="item.funding_party_name" :value="item.funding_party_id" :key="item.funding_party_id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="第三方支付机构">
                            <el-select clearable v-model="search_query.thirdaymenthannel" class="el_select">
                                <el-option v-for="item in institution" :label="item.name" :value="item.id" :key="item.id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="创建时间" label-width="90px">
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
        <!-- <div class="aside_con">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleDialogShow">创建</el-button>
        </div> -->
        <!-- 数据列表 -->
        <div class="section_con">
            <el-table
            v-loading="loading"
            :data="list"
            border
            highlight-current-row
            :header-cell-style="{background: '#f2f2f2'}"
            style="width: 100%;">
                <el-table-column label="支付渠道ID" width="110" align="center" prop="id" />
                <el-table-column label="支付渠道名称" prop="payment_channel_name" align="center" />
                <el-table-column label="第三方支付机构" width="250"  align="center" prop="third_payment_channel" />
                <el-table-column label="资金方名称" width="200" align="center" prop="funding_party_name" />
                <el-table-column label="商户号" width="180" align="center" prop="payment_channel_code" />
                <el-table-column label="授权业务" width="200" align="center" prop="auth_business" />
                <el-table-column label="创建人" width="110" align="center" prop="create_user" />
                <el-table-column label="创建时间" width="160" align="center" prop="create_time" />
            </el-table>
        </div>
        <!-- End -->
        <!-- 页码 -->
        <pagination class="page_align" v-show="total" :total="total" :page.sync="curr_page" :limit.sync="page_size" @pagination="funcGetPayChanelList" />
        <!-- End -->
        <!-- 创建 -->
        <!-- <el-dialog
        :title="is_updata?'编辑支付渠道':'创建支付渠道'"
        :visible.sync="visibility"
        width="35%"
        :close-on-click-modal="false"
        :show-close="false"
        :before-close="handleDialogClose">
            <div class="dialog_section">
                <el-form :model="create_form" :rules="rules" ref="create_form" label-width="130px">
                    <el-form-item label="支付渠道ID" prop="id" v-if="is_updata">
                        <el-input :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="支付渠道名称">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="第三方支付机构">
                        <el-select clearable v-model="create_form.payment_id">
                            <el-option v-for="item in payment_channel" :label="item.payment_channel_name" :value="item.payment_id" :key="item.payment_id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="资金方名称">
                        <el-select clearable v-model="create_form.funding_party_id">
                            <el-option v-for="item in funding_party" :label="item.funding_party_name" :value="item.funding_party_id" :key="item.funding_party_id" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商户号">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="授权业务">
                         <el-input></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleDialogClose">取 消</el-button>
                <el-button type="primary" @click="handleCreateFile('create_form')">{{is_updata?'更新':'创建'}}</el-button>
            </div>
        </el-dialog> -->
        <!-- End -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatParmas } from '@/utils'
import { payChannelManageList } from '@/api/pay'
import Pagination from '@/components/Pagination'
export default {
    data() {
        return {
            visibility: false,
            is_updata: false,
            create_form: {},
            search_query: {},
            loading: false,
            list: null,
            total: 0,
            curr_page: 1,
            page_size: 20
        }
    },
    computed: mapGetters(['institution','funding_party']),
    components: { 
        Pagination 
    },
    created(){
        this.funcGetPayChanelList();
    },
    methods: {
        async funcGetPayChanelList() {
            let params = {
                pageNum: this.curr_page,
                pageSize: this.page_size,
                parameters: formatParmas(this.search_query)
            }
            this.loading = true;
            let { status, pageInfo, returnData } = await payChannelManageList(params);
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
            this.funcGetPayChanelList();
        },
        /* 创建显示弹窗 
        handleDialogShow() {
            this.is_updata = false;
            this.visibility = true;
        },
        */
        /* 关闭弹窗 
        handleDialogClose() {
            this.visibility = false;
            this.$refs.create_form.resetFields();
        },
        */
        /* 创建 
        handleCreateFile(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    
                }
            });
        }
        */
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
