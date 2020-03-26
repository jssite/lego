<template>
    <div class="app-container">
        <!-- 数据列表 -->
        <div class="section_con">
            <el-table
            v-loading="loading"
            :data="list"
            border
            highlight-current-row
            :header-cell-style="{background: '#f2f2f2'}"
            style="width: 100%;">
                <el-table-column label="保障方式ID" width="110" align="center" prop="id">
                </el-table-column>
                <el-table-column label="保障方式" align="center" prop="assure_way_name">
                </el-table-column>
                <el-table-column label="创建人" align="center" prop="create_user">
                </el-table-column>
                <el-table-column label="创建时间" width="200" align="center" prop="create_time">
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
import { ensureMethodList } from '@/api/ensure'
import Pagination from '@/components/Pagination'
export default {
    data() {
        return {
            loading: false,
            list: null,
            total: 0,
            curr_page: 1,
            page_size: 20
        }
    },
    components: { 
        Pagination 
    },
    created(){
        this.funcGetTableList()
    },
    methods: {
        async funcGetTableList() {
            let params = {
                pageNum: this.curr_page,
                pageSize: this.page_size
            }
            this.loading = true;
            let { status, returnData, pageInfo } = await ensureMethodList(params);
            this.loading = false;
            if( status == 'SUCCESS' ){
                this.list = returnData;
                this.total = pageInfo.totalCount || 0;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.page_align {
    text-align: right;
}
.aside_con {
    padding-bottom: 10px;
}
</style>
