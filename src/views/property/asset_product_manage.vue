<template>
    <div class="app-container">
        <!-- 搜索 -->
        <div class="header_con">
            <el-form :inline="true">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="资产产品ID" label-width="90px">
                            <el-input v-model.number="search_query.product_id" class="el_input" />
                        </el-form-item>
                        <el-form-item label="资产方">
                            <el-select v-model="search_query.party_id" clearable class="el_select">
                                <el-option v-for="item in asset_party" :label="item.asset_party_name" :value="item.asset_party_id" :key="item.asset_party_id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="资产产品名称">
                            <el-select v-model="search_query.product_name" clearable class="el_select">
                                <el-option v-for="item in asset_product" :label="item.asset_product_name" :key="item.asset_product_id" :value="item.asset_product_id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="创建时间" label-width="90px">
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
        <div class="aside_con">
            <el-button type="primary" v-permission="['admin','assetProductManage:add']" icon="el-icon-circle-plus-outline" @click="funcCreateProduct">创建</el-button>
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
                <el-table-column label="资产产品ID" min-width="100" align="center" prop="id">
                </el-table-column>
                <el-table-column label="资产产品名称" width="200" align="center" prop="product_name">
                </el-table-column>
                <el-table-column label="资产方" min-width="150" align="center" prop="asset_party_name">
                </el-table-column>
                <el-table-column label="详情信息" min-width="100" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" v-permission="['admin','assetProductManage:detail']" @click="funcGetDetailsInfo(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="创建人" width="110" align="center" prop="create_user_name">
                </el-table-column>
                <el-table-column label="创建时间" width="160" align="center" prop="create_time">
                </el-table-column>
                <el-table-column label="修改人" width="110" align="center" prop="update_user_name">
                </el-table-column>
                <el-table-column label="修改时间" width="160" align="center" prop="update_time">
                </el-table-column>
                <el-table-column label="操作" align="center" width="100">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" v-permission="['admin','assetProductManage:edit']" @click="funcUpadataFile(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- End -->
        <!-- 页码 -->
        <pagination class="page_align" v-show="total" :total="total" :page.sync="curr_page" :limit.sync="page_size" @pagination="funcGetProductLists" />
        <!-- End -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatParmas } from '@/utils'
import Pagination from '@/components/Pagination'
import { createProduct, productLists, productDetail, productEdit } from '@/api/property';
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
    computed: mapGetters(['asset_party','asset_product']),
    components: { 
        Pagination 
    },
    created(){
        this.funcGetProductLists();
    },
    methods: {
        /* 初始化获取列表数据 */
        async funcGetProductLists() {
            let params = {
                pageNum: this.curr_page,
                pageSize: this.page_size,
                parameters: formatParmas(this.search_query)
            }
            this.loading = true;
            let { status, returnData, pageInfo } = await productLists(params);
            this.loading = false;
            if( status == 'SUCCESS' ){
                this.tableList = returnData;
                this.total = pageInfo.totalCount || 0;
            }
        },
        /* 条件搜索 */
        funcSearchFilter() {
            this.curr_page = 1;
            this.funcGetProductLists();
        },
        /* 创建产品 */
        funcCreateProduct(){
            this.$router.push({
                name: 'assetsProduct',
                query: {
                    s: 'add'
                }
            });
        },
        /* 查看详情 */
        funcGetDetailsInfo(item){
            this.$router.push({
                name: 'assetsProduct',
                query: {
                    s: 'detail',
                    id: item.id
                }
            });
        },
        /* 更新产品 */
        funcUpadataFile(item){
            this.$router.push({
                name: 'assetsProduct',
                query: {
                    s: 'edit',
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
.aside_con {
    padding-bottom: 10px;
}

</style>
