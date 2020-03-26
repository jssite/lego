<template>
    <div class="app-container">
        <!-- 搜索 -->
        <div class="header_con">
            <el-form :inline="true">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="签章ID" label-width="90px">
                            <el-input v-model="search_query.id" class="el_input" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="签章名称" label-width="110px">
                            <el-select v-model="search_query.name" clearable class="el_select">
                                <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="签章类别" label-width="110px">
                            <el-select v-model="search_query.type" clearable class="el_select">
                                <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="创建时间" label-width="90px">
                            <el-date-picker v-model="search_query.start_time" type="datetime" default-time="00:00:00" class="el_input"></el-date-picker>
                            <em class="time_space">至</em>
                            <el-date-picker v-model="search_query.end_time" type="datetime" default-time="23:59:59" class="el_input"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="primary" icon="el-icon-search" @click="handleSearchFilter">查询</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!-- End -->
        <div class="aside_con">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleDialogShow">创建</el-button>
        </div>
        <!-- 数据列表 -->
        <div class="section_con">
            <el-table
            v-loading="listLoading"
            :data="list"
            border
            highlight-current-row
            :header-cell-style="{background: '#f2f2f2'}"
            style="width: 100%;">
                <el-table-column label="签章ID" width="110" align="center">
                    <template slot-scope="scope">
                        11345
                    </template>
                </el-table-column>
                <el-table-column label="签章名称" prop="author" width="150" align="center">
                    <template slot-scope="scope">
                        和信贷
                    </template>
                </el-table-column>
                <el-table-column label="公司名称" width="200" align="center">
                    <template slot-scope="scope">
                        和信电子商务有限公司
                    </template>
                </el-table-column>
                <el-table-column label="统一社会信用代码" width="200" align="center">
                    <template slot-scope="scope">
                        911100000083736298C
                    </template>
                </el-table-column>
                <el-table-column label="签章类别" width="180" align="center">
                    <template slot-scope="scope">
                        资产方
                    </template>
                </el-table-column>
                <el-table-column label="签章关联标识" width="180" align="center">
                    <template slot-scope="scope">
                        -
                    </template>
                </el-table-column>
                <el-table-column label="创建人" width="110" align="center">
                    <template slot-scope="scope">
                        和信贷
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" width="150" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="修改人" width="110" align="center">
                    <template slot-scope="scope">
                        和信贷
                    </template>
                </el-table-column>
                <el-table-column label="修改时间" width="150" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="120">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handlerUpadataFile(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- End -->
        <!-- 页码 -->
        <pagination class="page_align" v-show="total" :total="total" :page.sync="curr_page" :limit.sync="page_size" @pagination="getList" />
        <!-- End -->
        <!-- 创建 -->
        <el-dialog
        :title="is_updata?'编辑签章':'创建签章'"
        :visible.sync="visibility"
        width="35%"
        :show-close="false"
        :before-close="handleDialogClose">
            <div class="dialog_section">
                <el-form :model="create_form" :rules="rules" ref="create_form" label-width="130px">
                    <el-form-item label="签章ID" prop="id" v-if="is_updata">
                        <el-input v-model="create_form.id" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="签章名称" prop="name">
                        <el-input v-model="create_form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="公司名称" prop="business_name">
                        <el-input v-model="create_form.business_name"></el-input>
                    </el-form-item>
                    <el-form-item label="统一社会信用代码" prop="code">
                        <el-input v-model="create_form.code"></el-input>
                    </el-form-item>
                    <el-form-item label="签章类别" prop="type">
                       <el-select v-model="create_form.type" clearable>
                            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="签章关联标识" prop="mark">
                        <el-input v-model="create_form.mark"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleDialogClose">取 消</el-button>
                <el-button type="primary" @click="handleCreateFile('create_form')">{{is_updata?'更新':'创建'}}</el-button>
            </div>
        </el-dialog>
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
    data() {
        return {
            visibility: false,
            is_updata: false,
            create_form: {
                id: '',
                name: '',
                business_name: '',
                type: '',
                signature: ''
            },
            search_query: {
                id: '',
                name: '',
                type: '',
                mark: '',
                start_time: '',
                end_time: ''
            },
            calendarTypeOptions,
            listloading: false,
            list: null,
            total: 10,
            curr_page: 1,
            page_size: 20,
            rules: {
                name: [
                    { required: true, message: '请输入资产方名称', trigger: 'blur' }
                ],
                signature: [
                    { required: true, message: '请选择签章', trigger: 'change' }
                ]
            }
        }
    },
    components: { 
        Pagination 
    },
    created(){
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
        /* 搜索 */
        handleSearchFilter() {

        },
        /* 创建显示弹窗 */
        handleDialogShow() {
            this.is_updata = false;
            this.visibility = true;
        },
        /* 关闭弹窗 */
        handleDialogClose() {
            this.visibility = false;
            this.$refs.create_form.resetFields();
        },
        /* 创建资金方 */
        handleCreateFile(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        /* 编辑资金方 */
        handlerUpadataFile(){
            this.visibility = true;
            this.is_updata = true;
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
