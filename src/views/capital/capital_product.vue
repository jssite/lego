<template>
    <div class="app-container">
        <!-- 搜索 -->
        <div class="header_con">
            <el-form :inline="true">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="资金产品ID" label-width="100px">
                            <el-input v-model="search_query.fund_products_id" class="el_input" />
                        </el-form-item>
                        <el-form-item label="资金方">
                            <el-input v-model="search_query.fundPartyName" class="el_input" />
                        </el-form-item>
                        <el-form-item label="资金产品名称" label-width="100px">
                            <el-select v-model="search_query.fund_products_name" clearable>
                                <el-option v-for="item in fund_product" :key="item.fund_product_id" :label="item.fund_products_name" :value="item.fund_products_name" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="创建时间" label-width="100px">
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
        <div class="aside_con">
            <el-button v-permission="['admin','capitalProduct:add']" type="primary" icon="el-icon-circle-plus-outline" @click="funcCreateProduct">创建</el-button>
        </div>
        <!-- 数据列表 -->
        <div class="section_con">
            <el-table
            v-loading="loading"
            :data="tableList"
            border
            highlight-current-row
            :header-cell-style="{background: '#f2f2f2'}"
            style="width: 100%;">
                <el-table-column label="资金产品ID" width="100" align="center" prop="id" />
                <el-table-column label="资金产品名称" width="260" align="center" prop="fund_products_name" />
                <el-table-column label="资金方" min-width="180" align="center" prop="funding_party_name" />
                <el-table-column label="详情信息" width="100" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" v-permission="['admin','capitalProduct:detail']" @click="funcGetDetails(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="创建人" width="110" align="center" prop="create_user_name" />
                <el-table-column label="创建时间" width="160" align="center" prop="create_time" />
                <el-table-column label="修改人" width="110" align="center" prop="update_user_name" />
                <el-table-column label="修改时间" width="160" align="center" prop="update_time" />
                <el-table-column label="操作" align="center" width="120">
                    <template slot-scope="scope">
                        <el-button type="primary" v-permission="['admin','capitalProduct:edit']" size="mini" @click="funcUpadataProduct(scope.row)">编辑</el-button>
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
import { capitalProductList } from '@/api/capital'
import { mapGetters } from 'vuex';
import { formatParmas } from '@/utils'
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js'
export default {
    data() {
        return {
            search_query: {},
            loading: false,
            tableList: null,
            total: 0,
            curr_page: 1,
            page_size: 20
        }
    },
    directives: { 
        permission
    },
    computed: mapGetters(['funding_party','assure_way','assure_party','fund_product']),
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
            let { status, pageInfo, returnData } = await capitalProductList(params);
            this.loading = false;
            if( status == 'SUCCESS' ){
                this.total = pageInfo && pageInfo.totalCount || 0;
                this.tableList = returnData;
            }

        },
        /* 搜索 */
        funcSearchFilter() {
            this.curr_page = 1;
            this.funcGetTableLists();
        },
        /* 创建 */
        funcCreateProduct(){
            this.$router.push({ 
                name: 'capitalProductItem',
                query: {
                    s: 'add'
                }
            });
        },
        /* 编辑 */
        funcUpadataProduct(item){
            this.$router.push({ 
                name: 'capitalProductItem',
                query: {
                    s: 'edit',
                    id: item.id
                }
            });
        },
        /* 查看 */
        funcGetDetails(item){
            this.$router.push({ 
                name: 'capitalProductItem',
                query: {
                    s: 'detail',
                    id: item.id
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
