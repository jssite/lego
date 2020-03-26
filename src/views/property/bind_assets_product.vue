<template>
    <div class="app-container">
        <!-- 搜索 -->
        <div class="header_con">
            <el-form :inline="true">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="资产方">
                            <el-select clearable class="el_select" v-model="search_query.asset_party_id">
                                <el-option v-for="item in asset_party" :label="item.asset_party_name" :value="item.asset_party_id" :key="item.asset_party_id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="资产产品名称">
                            <el-select clearable class="el_select" v-model="search_query.asset_product_id">
                                <el-option v-for="item in asset_product" :label="item.asset_product_name" :value="item.asset_product_id" :key="item.asset_product_id" />
                            </el-select>
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
            :data="list"
            border
            highlight-current-row
            :header-cell-style="{background: '#f2f2f2'}"
            style="width: 100%;">
                <el-table-column label="资产产品ID" width="100" align="center" prop="id">
                </el-table-column>
                <el-table-column label="资产产品名称" width="200" align="center" prop="product_name">
                </el-table-column>
                <el-table-column label="资产方" min-width="150" align="center" prop="asset_party_name">
                </el-table-column>
                <el-table-column label="绑定详情" min-width="100" align="center">
                    <template slot-scope="scope">
                        <template v-if="scope.row.bind_state == 1">
                            <el-button type="text" v-permission="['admin','bindAssetsProduct:detail']" @click="funcFileDetail(scope.row)">查看</el-button>
                        </template>
                        <template v-else>-</template>
                    </template>
                </el-table-column>
                <el-table-column label="操作人" width="110" align="center" prop="create_user_name">
                </el-table-column>
                <el-table-column label="操作时间" width="160" align="center" prop="create_time">
                </el-table-column>
                <el-table-column label="修改人" width="110" align="center" prop="update_user_name">
                </el-table-column>
                <el-table-column label="修改时间" width="160" align="center" prop="update_time">
                </el-table-column>
                <el-table-column label="操作" align="center" width="100">
                    <template slot-scope="scope">
                        <el-button type="primary" v-permission="['admin','bindAssetsProduct:edit']" size="mini" @click="funcEditBindProduct(scope.row)">编辑</el-button>
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
        :title="disabled_select?'绑定关系详情':'编辑绑定关系'"
        :visible.sync="dialog_show"
        width="1210px"
        :close-on-click-modal="false"
        :show-close="dialog_detail"
        :before-close="funcDialogClose">
            <div class="dialog_section">
                <el-form :inline="true" :model="create_form" :rules="form_rules" ref="create_form" :hide-required-asterisk="dialog_detail">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="资产产品ID">
                                <el-input class="el_input_100" v-model="create_form.asset_product_id" :disabled="true" />
                            </el-form-item>
                            <el-form-item label="资产产品名称">
                                <el-input v-model="create_form.asset_product_name" :disabled="true" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" style="margin-bottom: 20px;">
                            <el-radio-group v-model="create_form.route_type" :disabled="dialog_detail">
                                <el-radio :label="2">优先级</el-radio>
                                <el-radio :label="1">轮询</el-radio>
                            </el-radio-group>
                        </el-col>
                        <el-col :span="24">
                            <h4>生效中</h4>
                        </el-col>
                        <el-col :span="24" v-for="(item,index) in create_form.relations" :key="index">
                            <el-form-item v-if="create_form.route_type == 2" label="优先级" 
                            :rules="form_rules.priority"
                            :prop="'relations.'+index+'.priority'">
                                <el-select clearable class="el_select_130" :disabled="item.binding_state == 0 || dialog_detail" @change="funcSelectChange" v-model="item.priority" placeholder="请选择优先级">
                                    <el-option v-for="i in create_form.relations.length" :disabled="priority_select.includes(i)" :key="i" :label="i" :value="i" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="资金产品ID">
                                <el-input :disabled="true" class="el_input_100" v-model="item.fund_product_id" />
                            </el-form-item>
                            <el-form-item label="资金产品名称" 
                            :rules="form_rules.product"
                            :prop="'relations.'+index+'.fund_product_id'">
                                <el-select clearable class="el_select" :disabled="item.binding_state == 0 || dialog_detail" @change="funcSelectChange" v-model="item.fund_product_id" placeholder="请选择资金产品名称">
                                    <el-option :disabled="disabled_select.includes(item.fund_product_id)" v-for="item in fund_product" :label="item.fund_products_name" :value="item.fund_product_id" :key="item.fund_product_id" />
                                </el-select>
                            </el-form-item>
                            <el-form-item style="padding-left: 35px;" 
                            :rules="form_rules.amount"
                            :prop="'relations.'+index+'.amount'" label="放款额度(元)">
                                <el-input :disabled="item.binding_state == 0 || dialog_detail" class="el_input_100" v-model="item.amount" ></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-radio-group :disabled="item.binding_state == 0 || dialog_detail" v-model="item.period">
                                    <el-radio :label="1">月</el-radio>
                                    <el-radio :label="2">日</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <template v-if="!dialog_detail">
                                <el-form-item v-if="item.binding_state != 0 && del_btn > 1">
                                    <el-button type="danger" size="mini" icon="el-icon-minus" circle @click="funcDeleteProduct(index,item)"></el-button>
                                    <!-- <el-button type="danger" plain @click="funcDeleteProduct(index,item)">删除</el-button> -->
                                </el-form-item>
                            </template>
                        </el-col>
                        <template v-if="dialog_detail">
                            <el-col :span="24" v-if="create_form.invalid_relations.length">
                                <h4>已失效</h4>
                            </el-col>
                            <el-col :span="24" v-for="(item,m) in create_form.invalid_relations" :key="item.binding_relation_id">
                                <el-form-item v-if="create_form.route_type == 2" label="优先级">
                                    <el-input :disabled="true" class="el_select_130" v-model="item.priority"></el-input>
                                </el-form-item>
                                <el-form-item label="资金产品ID">
                                    <el-input :disabled="true" class="el_input_100" v-model="item.fund_product_id" />
                                </el-form-item>
                                <el-form-item label="资金产品名称">
                                    <el-select clearable class="el_select" :disabled="true" v-model="item.fund_product_id" placeholder="请选择资金产品名称">
                                        <el-option v-for="item in fund_product" :label="item.fund_products_name" :value="item.fund_product_id" :key="item.fund_product_id" />
                                    </el-select>
                                </el-form-item>
                                <el-form-item style="padding-left: 35px;" label="放款额度(元)">
                                    <el-input :disabled="true" class="el_input_100" v-model="item.amount" ></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-radio-group :disabled="true" v-model="item.period">
                                        <el-radio :label="1">月</el-radio>
                                        <el-radio :label="2">日</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </template>
                    </el-row>
                    <template v-if="!dialog_detail">
                        <div class="el_add_button">
                            <el-button type="primary" @click="funcBindProduct">添加</el-button>
                        </div>
                    </template>
                    
                </el-form>
            </div>
            <template v-if="!dialog_detail">
                <div slot="footer" class="dialog-footer">
                    <el-button @click="funcDialogClose">取 消</el-button>
                    <el-button type="primary" :disabled="btn_loading" @click="funcCreateBindProduct('create_form')">确认</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- End -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatParmas } from '@/utils'
import { getBindAssetsProductList, bindAssetsProduct, getBindAssetsProduct } from '@/api/property'
import Pagination from '@/components/Pagination'
import permission from '@/directive/permission/index.js'
export default {
    data() {
        const checkInteger = (rule, value, callback) => {
            let reg = /^[1-9]\d*$/;
            if (!value) {
                return callback(new Error('额度不能为空'));
            } else if( !reg.test(value) ){
                return callback(new Error('额度设置不正确'));
            } else {
                callback();
            }
        }
        return {
            create_form: {
                asset_product_id: '',
                route_type: '',
                asset_product_name: '',
                relations: [
                    {
                        fund_product_id: '',    //产品ID
                        amount: '',             //金额
                        priority: '',           //优先级的顺序
                        period: '',             //1月2日
                        binding_state: -1,      //0失效 1未失效
                        binding_relation_id: '' //当期列表的位置索引
                    }
                ],
                invalid_relations: []
            },
            search_query: {},
            btn_loading: false,
            dialog_detail: false,
            dialog_show: false,
            del_btn: 1,
            disabled_select: [],
            priority_select: [],
            loading: false,
            list: null,
            total: 0,
            curr_page: 1,
            page_size: 20,
            form_rules: {
                priority: [
                    { required: true, message: '优先级不能为空', trigger: 'change' }
                ],
                product: [
                    { required: true, message: '资金产品不能为空', trigger: 'change' }
                ],
                amount: [
                    { required: true, validator: checkInteger, trigger: 'blur' }
                ]
            }
        }
    },
    directives: { 
        permission
    },
    computed: mapGetters(['asset_party','asset_product','fund_product']),
    components: { 
        Pagination 
    },
    created(){
        this.funcGetTableList();
    },
    methods: {
        /* 列表数据 */
        async funcGetTableList() {
            let params = {
                pageNum: this.curr_page,
                pageSize: this.page_size,
                parameters: formatParmas(this.search_query)
            }
            this.loading = true;
            let { status, returnData, pageInfo } = await getBindAssetsProductList(params);
            this.loading = false;
            if( status == 'SUCCESS' ){
                this.list = returnData;
                this.total = pageInfo.totalCount || 0;
            }
        },
        /* 搜索列表数据 */
        funcSearchFilter() {
            this.curr_page = 1;
            this.funcGetTableList();
        },
        /* 关闭弹窗 */
        funcDialogClose() {
            this.dialog_show = false;
            this.is_details = false;
            this.create_form.invalid_relations = this.$options.data().create_form.invalid_relations;
            this.create_form.relations = this.$options.data().create_form.relations;
            this.$nextTick(() => {
                this.$refs.create_form.resetFields();
            });
        },
        /* 获取已选中的数据 */
        funcSelectChange(){
            this.disabled_select = [];
            this.priority_select = [];
            this.create_form.relations.forEach( (product,index) => {
                if( product.fund_product_id && product.binding_state != 0){
                    this.disabled_select.push(product.fund_product_id)
                }
                if( product.priority){
                    this.priority_select.push(product.priority)
                }
            })
        },
        /* 编辑绑定关系 */
        funcEditBindProduct(row){
            this.disabled_select = [];
            this.priority_select = [];
            this.dialog_detail = false;
            this.funcGetProductInfo(row);
        },
        /* 获取资金绑定信息 */
        async funcGetProductInfo(row){
            this.del_btn = 1;
            let params = {
                asset_product_id: row.id
            }
            let { status, returnData: { asset_product_id, asset_product_name, invalid_relations, relations, route_type } } = await getBindAssetsProduct(params);
            if( status == 'SUCCESS' ){
                this.create_form = Object.assign(this.create_form,{
                    asset_product_id, 
                    asset_product_name,
                    route_type: route_type?route_type:2,
                    invalid_relations
                });
                if(this.dialog_detail) {
                    this.create_form.relations = relations
                } else {
                    if( relations.length ) {
                        this.del_btn = relations.length;
                        this.create_form.relations = relations;
                        this.funcSelectChange();
                    } else {
                        this.create_form.relations = [{
                            fund_product_id: '',    //产品ID
                            amount: '',             //金额
                            priority: '',           //优先级的顺序
                            period: '',             //1月2日
                            binding_state: -1,      //0失效 1未失效
                            binding_relation_id: '' //当期列表的位置索引
                        }]
                    }
                }
                this.dialog_show = true;
                this.$nextTick(()=>{
                    this.$refs.create_form.clearValidate();
                });
            }
            console.log(this.create_form);
        },
        /* 提交表单 */
        funcCreateBindProduct(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    try {
                        let params = Object.assign({},this.create_form);
                        params.relations.forEach((item,index) => {
                            if( params.route_type == '1' ){
                                item.priority = index+1;
                            }
                        });
                        params.relations = params.relations.filter( current => {
                            return current.binding_state != 0;
                        });
                        this.btn_loading = true;
                        let { status } = await bindAssetsProduct(params);
                        this.btn_loading = false;
                        if( status == 'SUCCESS' ){
                            this.funcDialogClose();
                            this.funcGetTableList();
                            this.$message({
                                message: '资金产品绑定成功！',
                                type: 'success'
                            });
                        }
                    }
                    catch(err){
                        this.btn_loading = false;
                    }
                }
            });
        },
        /* 查看详情 */
        funcFileDetail(row) {
            this.dialog_detail = true;
            this.funcGetProductInfo(row);
        },
        /* 添加绑定资金 */
        funcBindProduct() {
            let result = this.$options.data().create_form.relations[0];
            this.create_form.relations.push(result);
            this.del_btn += 1;
        },
        /* 删除资金绑定 */
        funcDeleteProduct(index,row){
            let del_priority = row.priority;
            if( row.binding_state == 1 ){
                row.binding_state = 0;
                this.create_form.invalid_relations.push(row);
            }
            if( row.binding_state == -1 ){
                this.create_form.relations.forEach(item => {
                    if( del_priority ){
                        if( item.priority > del_priority ) item.priority = item.priority - 1;
                    } else {
                        if( item.priority == this.create_form.relations.length ) item.priority = item.priority - 1;
                    }
                });
                this.create_form.relations.splice(index,1);
            }
            this.del_btn -= 1;
            this.funcSelectChange();
        }
    }
}
</script>

<style lang="scss" scoped>
.el_input {
    width: 210px;
}
.el_input_100 {
    width: 110px;
}
.el_select {
    width: 210px;
}
.el_select_130 {
    width: 130px;
}
.el_index {
    width: 20px;
    height: 20px;
    margin-top: 8px;
    line-height: 20px;
    text-align: center;
    display: inline-block;
    border: 1px solid #1890ff;
    border-radius: 50%;
}
.el_width_100{
    width: 100%;
}
.el_add_button {
    padding-top: 10px;
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
