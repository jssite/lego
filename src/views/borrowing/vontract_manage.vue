<template>
<div class="app-container">
    <!-- 搜索 -->
    <div class="header_con">
        <el-form :inline="true">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="资产产品ID" label-width="100px">
                        <el-input v-model="search_query.id" class="el_input" />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="进件编号" label-width="100px">
                        <el-input v-model="search_query.number" class="el_input" />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="借款人姓名" label-width="100px">
                        <el-input v-model="search_query.username" class="el_input" />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="身份证号" label-width="100px">
                        <el-input v-model="search_query.cardId" class="el_input" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="签约申请时间" label-width="100px">
                        <el-date-picker v-model="search_query.signing_start_time" type="datetime" default-time="00:00:00" class="el_input" />
                        <em class="time_space">至</em>
                        <el-date-picker v-model="search_query.signing_end_time" type="datetime" default-time="23:59:59" class="el_input" />
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="签约合同上传时间">
                        <el-date-picker v-model="search_query.upload_start_time" type="datetime" default-time="00:00:00" class="el_input" />
                        <em class="time_space">至</em>
                        <el-date-picker v-model="search_query.upLoad_end_time" type="datetime" default-time="23:59:59" class="el_input" />
                    </el-form-item>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" icon="el-icon-search" @click="handleSearchFilter">查询</el-button>
                </el-col>
            </el-row>
      </el-form>
    </div>
    <!-- End -->
    <!-- 数据列表 -->
    <div class="section_con">
        <el-table
        v-loading="listLoading"
        :data="list"
        border
        highlight-current-row
        :header-cell-style="{background: '#f2f2f2'}"
        style="width: 100%;">
            <el-table-column label="资产产品ID" prop="id" align="center" width="100">
            <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
            </template>
            </el-table-column>
            <el-table-column label="进件编号" width="220" align="center">
                HXDZCHXDHH12948570982
            </el-table-column>
            <el-table-column label="资产方" min-width="120" align="center">
                <template slot-scope="{row}">
                    和信贷
                </template>
            </el-table-column>
            <el-table-column label="资金产品ID" prop="author" width="100" align="center">
                <template slot-scope="scope">
                    123904
                </template>
            </el-table-column>
            <el-table-column label="资金方" min-width="120" align="center">
                <template slot-scope="scope">
                    和信贷
                </template>
            </el-table-column>
            <el-table-column label="借款人姓名" width="110" align="center">
                <template slot-scope="scope">
                    和信贷
                </template>
            </el-table-column>
            <el-table-column label="身份证号" width="150" align="center">
                <template slot-scope="scope">
                    220***********1980
                </template>
            </el-table-column>
            <el-table-column label="合同" width="200" align="center">
                <template slot-scope="scope">
                    <a href="" class="file_link">《授权委托书》</a>
                    <a href="" class="file_link">《信用借款咨询服务协议》</a>
                    <a href="" class="file_link">《委托扣款授权书》</a>
                </template>
            </el-table-column>
            <el-table-column label="签约申请时间" width="150" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="签约合同上传时间" width="150" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <!-- End -->
    <!-- 页码 -->
    <pagination v-show="total" class="page_align" :total="total" :page.sync="curr_page" :limit.sync="page_size" @pagination="getList" />
    <!-- End -->
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import Pagination from '@/components/Pagination'
const calendarTypeOptions = [
    { key: 'CN', display_name: 'China' },
    { key: 'US', display_name: 'USA' },
    { key: 'JP', display_name: 'Japan' },
    { key: 'EU', display_name: 'Eurozone' }
]
export default {
    components: {
        Pagination
    },
    data() {
        return {
        search_query: {
            id: '',
            number: '',
            username: '',
            cardId: '',
            assets: '',
            signing_start_time: '',
            signing_end_time: '',
            upload_start_time: '',
            upLoad_end_time: ''
        },
        calendarTypeOptions,
        listloading: false,
        list: null,
        total: 10,
        curr_page: 1,
        page_size: 20
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            this.listloading = true
            fetchList({
                page: this.curr_page,
                limit: this.page_size
            }).then(response => {
                this.list = response.data.items
                this.total = response.data.total
                setTimeout(() => {
                this.listLoading = false
                }, 1.5 * 1000)
            })
        },
        /* 搜搜 */
        async handleSearchFilter() {
            this.listloading = true
            const { res } = await fetchList()
            this.listloading = false
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
