<template>
    <div class="app-container">
        <!-- 搜索 -->
        <div class="header_con">
            <el-form :inline="true">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="借款人姓名" label-width="90px">
                            <el-input class="el_input" v-model="search_query.name" />
                        </el-form-item>
                        <el-form-item label="记录时间" label-width="90px">
                            <el-date-picker type="datetime" v-model="search_query.start_date" default-time="00:00:00" class="el_input"></el-date-picker>
                            <em class="time_space">至</em>
                            <el-date-picker type="datetime" v-model="search_query.end_date" default-time="23:59:59" class="el_input"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="身份证号" label-width="90px">
                            <el-input class="el_input" v-model="search_query.id_number" />
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
            :data="tableLists"
            border
            highlight-current-row
            :header-cell-style="{background: '#f2f2f2'}"
            style="width: 100%;">
                <el-table-column label="借款人姓名" width="110" align="center" prop="NAME">
                </el-table-column>
                <el-table-column label="身份证号" width="180" align="center" prop="id_number">
                </el-table-column>
                <el-table-column label="手机号" width="120" align="center" prop="mobile">
                </el-table-column>
                <el-table-column label="年龄" width="80" align="center" prop="age">
                </el-table-column>
                <el-table-column label="性别" width="80" align="center">
                    <template slot-scope="scope">
                        <template v-if="scope.row.sex == 1">
                            男
                        </template>
                        <template v-if="scope.row.sex == 2">
                            女
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="婚姻状况" width="80" align="center">
                    <template slot-scope="scope">
                        <template v-if="scope.row.marital_status == 1">未婚</template>
                        <template v-if="scope.row.marital_status == 2">已婚</template>
                        <template v-if="scope.row.marital_status == 3">离异</template>
                        <template v-if="scope.row.marital_status == 4">丧偶</template>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="有无子女" width="90" align="center">
                    <template slot-scope="scope">
                        <template v-if="scope.row.children_status == 1">有</template>
                        <template v-if="scope.row.children_status == 2">无</template>
                    </template>
                </el-table-column> -->
                <el-table-column label="户籍地址" width="170" align="center" prop="permanent_address">
                </el-table-column>
                <el-table-column label="居住地址" width="180"  align="center" prop="address">
                </el-table-column>
                <el-table-column label="电子邮箱" width="150" align="center" prop="email">
                </el-table-column>
                <el-table-column label="学历" width="110" align="center">
                    <template slot-scope="scope">
                        <template v-if="scope.row.degree == 1">初中及以下</template>
                        <template v-if="scope.row.degree == 2">高中</template>
                        <template v-if="scope.row.degree == 3">中专</template>
                        <template v-if="scope.row.degree == 4">大专</template>
                        <template v-if="scope.row.degree == 5">本科</template>
                        <template v-if="scope.row.degree == 6">硕士</template>
                        <template v-if="scope.row.degree == 7">博士</template>
                    </template>
                </el-table-column>
                <el-table-column label="详情信息" width="110" align="center">
                    <template slot-scope="scope">
                        <el-button v-permission="['admin','userListsManage:detail']" type="text" @click="funcToogleExpand(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="记录时间" width="160" align="center" prop="create_time">
                </el-table-column>
                <el-table-column type="expand" width="1">
                    <ul class="details_ul">
                        <li>
                            <label>借款人姓名：</label>
                            <span>{{details.NAME}}</span>
                        </li>
                        <li>
                            <label>身份证号：</label>
                            <span>{{details.id_number}}</span>
                        </li>
                        <li>
                            <label>职业：</label>
                            <span>{{perfession[details.perfession]}}</span>
                        </li>
                        <li>
                            <label>信用额度(元)：</label>
                            <span>{{details.line_of_credit}}</span>
                        </li>
                        <li>
                            <label>月收入(元)：</label>
                            <span>{{details.monthly_salary}}</span>
                        </li>
                        <li>
                            <label>信用等级：</label>
                            <span>{{credit_rating[details.credit_rating]}}</span>
                        </li>
                        <li>
                            <label>工作年限(年)：</label>
                            <span>{{details.work_experience}}年</span>
                        </li>
                        <li>
                            <label>有无子女：</label>
                            <span>{{details.children_status == 1?'有':'无'}}</span>
                        </li>
                        <li>
                            <label>有无房产：</label>
                            <span>{{details.is_has_estate == 1?'有':'无'}}</span>
                        </li>
                        <li>
                            <label>公司名称：</label>
                            <span>{{details.company_name}}</span>
                        </li>
                        <li>
                            <label>有无房贷：</label>
                            <span>{{details.is_has_mortgage == 1?'有':'无'}}</span>
                        </li>
                        <li>
                            <label>公司性质：</label>
                            <span>{{business_nature[details.business_nature]}}</span>
                        </li>
                        <li>
                            <label>有无车产：</label>
                            <span>{{details.is_has_car == 1?'有':'无'}}</span>
                        </li>
                        <li>
                            <label>公司规模：</label>
                            <span>{{company_scale[details.company_scale]}}</span>
                        </li>
                        <li>
                            <label>有无车贷：</label>
                            <span>{{details.is_har_car_mortgage == 1?'有':'无'}}</span>
                        </li>
                        <li>
                            <label>所属行业：</label>
                            <span>{{industry[details.industry+1]}}</span>
                        </li>
                        <li>
                            <label>有无社保：</label>
                            <span>{{details.is_has_social_insurance == 1?'有':'无'}}</span>
                        </li>
                        <li>
                            <label>公司地址：</label>
                            <span>{{details.company_address}}</span>
                        </li>
                        <li>
                            <label>有无公积金：</label>
                            <span>{{details.is_has_reserved_funds == 1?'有':'无'}}</span>
                        </li>
                        <li>
                            <label>联系人姓名：</label>
                            <span>{{details.contact_name}}</span>
                        </li>
                        <li>
                            <label>有无保单：</label>
                            <span> {{details.is_has_guarantee_slip == 1?'有':'无'}}</span>
                        </li>
                        <li>
                            <label>联系人关系：</label>
                            <span>{{details.contact_relationship}}</span>
                        </li>
                        <li>
                            <label>有无其他贷款：</label>
                            <span>{{details.is_has_other_loans == 1?'有':'无'}}</span>
                        </li>
                        <li>
                            <label>联系人手机号：</label>
                            <span>{{details.contact_mobile}}</span>
                        </li>
                    </ul>
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
import { userManageLists, userManageDeatail } from '@/api/usermanage'
import Pagination from '@/components/Pagination'
import { formatParmas } from '@/utils'
import permission from '@/directive/permission/index.js'
const perfession = ['','公务员','国企员工','民营或私营企业','企业管理人员','股东','私营业主','其它'];
const business_nature = ['','国家及地方政府行政机构','事业单位','学校及科研机构','央企（包括下级单位）','一般国企（包括下级单位）','外资企业','台港澳企业','合资企业','民营企业','个体经营','其他']
const company_scale = ['','10人以下','11 - 100人','101 - 500人','501 - 2000人','2001 - 10000人','10001人以上']
const industry = ['','采掘业','地质勘查业','科学研究/技术服务','水利/环境/公共设施管理','租赁/商务服务','军队/武警','国际组织','制造业','电信/通信/计算机/软件/互联网','国家机关/党政机关/社会团体','媒体/广告/广播/电影/电视','零售/批发','教育/培训','社会服务业','金融/保险/法律','交通运输/仓储/邮政','房地产业','水/电/煤/气/能源生产供应','住宿/餐饮','医疗/卫生/保健','建筑/工程','农/林/牧/渔','文化/娱乐服务业','体育/艺术','社会福利/公益事业','其他']
const credit_rating = ['','A','B','C','D','E','F']
export default {
    data() {
        return {
            perfession,
            business_nature,
            company_scale,
            industry,
            credit_rating,
            visibility: false,
            search_query: {},
            details: {},
            loading: false,
            tableLists: null,
            total: 0,
            curr_page: 1,
            page_size: 20
        }
    },
    directives: { 
        permission
    },
    components: { 
        Pagination 
    },
    created(){
        this.funcGetTableLists();
    },
    methods: {
        /* 点击显示详情 */
        async funcToogleExpand(row) {
            let $table = this.$refs.table;
            let { status, returnData } = await userManageDeatail(row.id);
            if( status == 'SUCCESS' ){
                this.details = returnData;
                this.tableLists.forEach((item) => {
                    if (row.id != item.id) {
                        $table.toggleRowExpansion(item,false);
                    }
                });
                $table.toggleRowExpansion(row)
            }
            
        },
        /* 初始化获取页面数据 */
        async funcGetTableLists() {
            let params = {
                pageNum: this.curr_page,
                pageSize: this.page_size,
                parameters: formatParmas(this.search_query)
            }
            this.loading = true;
            let { status, returnData, pageInfo } = await userManageLists(params);
            this.loading = false;
            if( status == 'SUCCESS' ){
                this.tableLists = returnData;
                this.total = pageInfo && pageInfo.totalCount || 0;
            }
        },
        /* 搜索 */
        funcSearchFilter() {
            let query = this.search_query;
            if( ( query.start_date && !query.end_date) || ( !query.start_date && query.end_date ) ){
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
.details_ul {
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    display: -webkit-flex;
    display: -moz-flex;
    display: -o-flex;
    flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    -moz-flex-wrap: wrap;
    -o-flex-wrap: wrap;
    box-sizing: border-box;
    padding-left: 20px;
    li {
        width: 33.3%;
        line-height: 30px;
        color: #333333;
        
    }
}
</style>
