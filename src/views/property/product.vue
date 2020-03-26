<template>
    <div class="app-container">
        <el-button class="el_back_btn" icon="el-icon-arrow-left" plain @click="funcGoToProductList">返回列表</el-button>
        <!-- 创建 -->
        <div class="section">
            <el-form :inline="true" :rules="rules" ref="create_form" :model="create_form" :hide-required-asterisk="true">
                <el-row>
                    <el-col :span="24">
                        <el-form-item v-if="state == 'edit'" label="资产产品ID">
                            <el-input :disabled="true" v-model="id" />
                        </el-form-item>
                        <el-form-item label="资产产品名称" prop="product_name">
                            <el-input :disabled="state == 'detail'" v-model="create_form.product_name" />
                        </el-form-item>
                        <el-form-item label="资产方" prop="asset_name">
                            <el-select :disabled="state == 'edit' || state == 'detail'" v-model="create_form.asset_name" clearable>
                                <el-option v-for="item in asset_party" :label="item.asset_party_name" :value="item.asset_party_id" :key="item.asset_party_id" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="el_tips">
                    <el-col :span="24">请选择进件必选参数，并设置参数值范围</el-col>
                </el-row>
                <fieldset>
                    <legend>{{BASE_KEYS.name}}</legend>
                    <el-row class="el_row_content">
                        <el-col :span="4" v-for="(item,i) in BASE_KEYS.children" :key="i">
                            <el-checkbox :disabled="item.disabled" v-model="item.checkbox" :true-label='1' :false-label='0'>{{item.name}}</el-checkbox>
                        </el-col>
                    </el-row>
                </fieldset>
                <fieldset>
                    <legend>{{DETAIL_KEYS.name}}</legend>
                    <el-row class="el_row_content">
                        <el-col :span="8" v-for="(item, m) in DETAIL_KEYS.children" :key="m">
                            <ul class="keys_list">
                                <li v-for="(key,j) in item" :key="j" :class="key.is_error?'el-form-item is-error':''">
                                    <el-checkbox @change="funcCheckboxChange(key)" :disabled="key.disabled || state == 'detail'" v-model="key.checkbox" :true-label='1' :false-label='0'>{{key.name}}</el-checkbox>
                                    <template v-if="key.children_type == 'input'">
                                        <div class="inline_block">
                                            <el-input size="mini" :disabled="!key.checkbox || state == 'detail'" style="width: 90px;" @blur="funcInputChange(key)" v-model.number="key.input_value.min"></el-input>
                                            <em class="el_space">-</em>
                                            <el-input size="mini" :disabled="!key.checkbox || state == 'detail'" style="width: 90px;" @blur="funcInputChange(key)" v-model.number="key.input_value.max"></el-input>
                                            <template v-if="key.is_error">
                                                <div class="el_item_error">{{key.error_txt}}</div>
                                            </template>
                                        </div>
                                    </template>
                                    <template v-if="key.children_type == 'select'">
                                        <div class="inline_block">
                                            <el-select size="mini" :disabled="!key.checkbox || state == 'detail'" @change="(val) => {funcSelectChange(val,key)}" collapse-tags v-model="key.select_value" multiple placeholder="请选择">
                                                <el-option v-for="(option,n) in key.form_select" :label="option.name" :key="n" :value="option.value" />
                                            </el-select>
                                            <template v-if="key.is_error">
                                                <div class="el_item_error">{{key.error_txt}}</div>
                                            </template>
                                        </div>
                                    </template>
                                </li>
                            </ul>
                        </el-col>
                    </el-row>
                </fieldset>
                <fieldset>
                    <legend>{{INFO_KEYS.name}}</legend>
                    <el-row class="el_row_content">
                        <el-col :span="8" v-for="(item, m) in INFO_KEYS.children" :key="m">
                            <ul class="keys_list">
                                <li v-for="(key,j) in item" :key="j" :class="key.is_error?'el-form-item is-error':''">
                                    <el-checkbox @change="funcCheckboxChange(key)" :disabled="key.disabled || state == 'detail'" v-model="key.checkbox" :true-label='1' :false-label='0'>{{key.name}}</el-checkbox>
                                    <template v-if="key.children_type == 'input'">
                                        <div class="inline_block">
                                            <el-input size="mini" :disabled="!key.checkbox || state == 'detail'" style="max-width: 90px;" @blur="funcInputChange(key)" v-model.number="key.input_value.min"></el-input>
                                            <em class="el_space">-</em>
                                            <el-input size="mini" :disabled="!key.checkbox || state == 'detail'" style="max-width: 90px;" @blur="funcInputChange(key)" v-model.number="key.input_value.max"></el-input>
                                            <template v-if="key.is_error">
                                                <div class="el_item_error">{{key.error_txt}}</div>
                                            </template>
                                        </div>
                                    </template>
                                    <template v-if="key.children_type == 'select'">
                                        <div class="inline_block">
                                            <el-select size="mini" :disabled="!key.checkbox || state == 'detail'" @change="(val) => {funcSelectChange(val,key)}" collapse-tags v-model="key.select_value" multiple placeholder="请选择">
                                                <el-option v-for="(option,n) in key.form_select" :label="option.name" :key="n" :value="option.value" />
                                            </el-select>
                                            <template v-if="key.is_error">
                                                <div class="el_item_error">{{key.error_txt}}</div>
                                            </template>
                                        </div>
                                    </template>
                                </li>
                            </ul>
                        </el-col>
                    </el-row>
                </fieldset>
            </el-form>
        </div>
        <div class="footer" v-if="state != 'detail'">
            <template v-if="state == 'edit'">
                <el-button :disabled="!is_submit" class="el_sbumit_btn" type="primary" @click="funcUpdateFile('create_form')">确认</el-button>
            </template>
            <template v-else>
                <el-button :disabled="!is_submit" class="el_sbumit_btn" type="primary" @click="funcCreateFile('create_form')">确认</el-button>
            </template>
        </div>
        <!-- End -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatParmas } from '@/utils'
import { createProduct, productLists, productDetail, productEdit } from '@/api/property';
import { BASE_KEYS_MAP, DETAIL_KEYS_MAP, INFO_KEYS_MAP } from '@/utils/keys';
export default {
    data() {
        return {
            is_submit: true,
            create_form: {
                asset_name: '',
                product_name:''
            },
            valid: [],
            BASE_KEYS: JSON.parse(JSON.stringify(BASE_KEYS_MAP)),
            DETAIL_KEYS: JSON.parse(JSON.stringify(DETAIL_KEYS_MAP)),
            INFO_KEYS: JSON.parse(JSON.stringify(INFO_KEYS_MAP)),
            rules: {
                asset_name: [
                    { required: true, message: '内容不能为空，请选择', trigger: 'change' }
                ],
                product_name: [
                    { required: true, message: '内容不能为空，请输入', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        ...mapGetters(['asset_party']),
        id: function(){
            let res = ''
            res = this.$route.query.s == 'edit'?this.$route.query.id:'';
            return res;
        },
        state: function(){
            return this.$route.query.s;
        }
    },
    created(){
        if( this.state == 'edit' || this.state == 'detail' ){
            let id = this.$route.query.id;
            this.funcGetUpadataFile(id);
        }
    },
    methods: {
        /* 创建参数  */
        funcSubmitParams(){
            let DETAIL_KEYS_ARR = [...this.DETAIL_KEYS.children.col_1, ...this.DETAIL_KEYS.children.col_2, ...this.DETAIL_KEYS.children.col_3];
            let INFO_KEYS_ARR = [...this.INFO_KEYS.children.col_1, ...this.INFO_KEYS.children.col_2, ...this.INFO_KEYS.children.col_3];
            let BASE_KEYS_ARR = [...this.BASE_KEYS.children]
            let params = {
                asset_party_id: this.create_form.asset_name,
                asset_product_name: this.create_form.product_name,
                borrower_info_entity: {},
                borrower_detail_entity: {},
                bid_info_entity: {}
            };
            this.valid = [...BASE_KEYS_ARR, ...DETAIL_KEYS_ARR, ...INFO_KEYS_ARR];
            this.valid.forEach((data, key) => {
                if( data.checkbox ){
                    if( data.children_type == 'checkbox' ){
                        params[data.wrap][data.form_key] = data.checkbox;
                    } else if( data.children_type == 'select' ){
                        if( !data.select_value.length ){
                            data.is_error = true;
                            data.error_txt = '内容不能为空，请选择'
                        } else {
                            if( data.select_value.length == data.form_select.length ){
                                let result = [...data.select_value];
                                params[data.wrap][data.form_key] = result.splice(1);
                            } else {
                                params[data.wrap][data.form_key] = data.select_value;
                            }
                        }
                    } else if( data.children_type == 'input' ){
                        if( !data.input_value.min || !data.input_value.max){
                            data.is_error = true;
                            data.error_txt = '内容不能为空，请输入'
                        } else {
                            params[data.wrap][data.form_key] = data.input_value;
                        }
                    }
                }
            });
            return params;
        },
        /* 创建资产产品 */
        funcCreateFile(formName) {
            this.$refs[formName].validate( async (valid) => {
                let params = this.funcSubmitParams();
                if ( valid ) {
                    try{
                        var success = this.valid.every(( item, index, array ) => !item.is_error);
                        if( !success ) return false;
                        this.is_submit = false;
                        let { status } = await createProduct( params );
                        this.is_submit = true;
                        if( status == 'SUCCESS' ){
                            this.funcGoToProductList();
                            this.curr_page = 1;
                            this.$store.dispatch('select/getSelect');
                            this.$message({
                                message: '资产产品创建成功！',
                                type: 'success'
                            });
                        }
                    }
                    catch(err){
                        this.is_submit = true;
                    }
                }
            });
        },
        /* 提交成功返回列表 */
        funcGoToProductList(){
            this.$router.push({
                name: 'assetProductManage'
            });
        },
        /* 获取资产产品数据 */
        async funcGetUpadataFile(id){
            let DETAIL_KEYS_ARR = [...this.DETAIL_KEYS.children.col_1, ...this.DETAIL_KEYS.children.col_2, ...this.DETAIL_KEYS.children.col_3];
            let INFO_KEYS_ARR = [...this.INFO_KEYS.children.col_1, ...this.INFO_KEYS.children.col_2, ...this.INFO_KEYS.children.col_3];
            let BASE_KEYS_ARR = [...this.BASE_KEYS.children]
            let params = {
                parameters: {
                    product_id: Number(id)
                }
            }
            let { status, returnData } = await productDetail( params );
            if( status == 'SUCCESS' ){
                let result = Object.assign({},returnData.bid_info_entity,returnData.borrower_detail_entity,returnData.borrower_info_entity)
                this.create_form = {
                    product_name: returnData.asset_product_name,
                    asset_name: returnData.asset_party_id
                };
                for( let [attr, item] of Object.entries(result)){
                    [...DETAIL_KEYS_ARR,...INFO_KEYS_ARR,...BASE_KEYS_ARR].forEach((keys) => {
                        if( attr == keys.form_key ) {
                            keys.checkbox = 1;
                            if( keys.children_type == 'input' ){
                                keys.input_value = item;
                            }
                            if( keys.children_type == 'select' ){
                                if(item.length == keys.form_select.length - 1){
                                    item.unshift('ALL')
                                }
                                keys.select_value = item;
                                keys.old_select_value = item;
                            }
                        }
                    });
                }
                this.$nextTick(() => {
                    this.$refs.create_form.clearValidate()
                });
            } else {
                this.funcGoToProductList();
            }
        },
        /* 提交更新 */
        funcUpdateFile(formName){
            this.$refs[formName].validate( async (valid) => {
                let params = this.funcSubmitParams();
                if ( valid ) {
                    try {
                        params.asset_product_id = this.id;
                        var success = this.valid.every(( item, index, array ) => !item.is_error);
                        if( !success ) return false;
                        this.is_submit = false;
                        let { status } = await productEdit( params );
                        this.is_submit = true;
                        if( status == 'SUCCESS' ){
                            this.funcGoToProductList();
                            this.$message({
                                message: '资产产品更新成功！',
                                type: 'success'
                            });
                            this.$store.dispatch('select/getSelect');
                        }
                    }
                    catch(err){
                        this.is_submit = true;
                    }
                }
            });
        },
        /* select change */
        funcSelectChange(val,item){
            let all_select = item.form_select.map(item => {
                return item.value;
            })
            const oldVal = item.old_select_value.length > 0 ? item.old_select_value : [];
            if (val.includes('ALL')) {
                item.select_value = all_select;
            }
            if (oldVal.includes('ALL') && !val.includes('ALL')) {
                item.select_value = [];
            }
            if (oldVal.includes('ALL') && val.includes('ALL')) {
                const index = val.indexOf('ALL');
                val.splice(index, 1);
                item.select_value = val;
            }
            if (!oldVal.includes('ALL') && !val.includes('ALL')) {
                if (val.length === all_select.length - 1) {
                    item.select_value = ['ALL'].concat(val);
                }
            }
            item.old_select_value = item.select_value;
            if( item.select_value.length ){
                item.is_error = false;
                item.error_txt = '';
            } else {
                item.is_error = true;
                if( item.children_type == 'input'){
                    item.error_txt = '内容不能为空，请输入';
                } else {
                    item.error_txt = '内容不能为空，请选择';
                }
            }
        },
        /* checkbox change */
        funcCheckboxChange(item){
            console.log(item.checkbox);
            if( !item.checkbox ){
                item.select_value = [];
                item.input_value = {
                    min: '',
                    max: ''
                }
                item.is_error = false;
                item.error_txt = '';
            }
        },
        /* input change */
        funcInputChange(item){
            //年龄
            if( item.form_key == 'age' ){
                this.funcRulesExtral(item,18,70)
            }
            //月收入
            if( item.form_key == 'month_income' ){
                this.funcRulesExtral(item,0,1000000)
            }
            //工作年限
            if( item.form_key == 'works_years' ){
                this.funcRulesExtral(item,0,70)
            }
            //信用额度
            if( item.form_key == 'credit_line' ){
                this.funcRulesExtral(item,0,500000)
            }
            //借款金额
            if( item.form_key == 'loan_money' ){
                this.funcRulesExtral(item,500,200000)
            }
            //借款期限
            if( item.form_key == 'loan_period' ){
                this.funcRulesExtral(item,1,100)
            }
            //借款天数
            if( item.form_key == 'loan_days' ){
                this.funcRulesExtral(item,1,9999999)
            }
        },
        /* 参数校验  */
        funcRulesExtral(item,s,e){
            let min = item.input_value.min;
            let max = item.input_value.max;
            let reg = /^[0-9]+$/;

            if( min === '' || max === '' ){
                item.is_error = true;
                item.error_txt = '内容不能为空，请输入';
            } else if( !reg.test(min) || !reg.test(max) ){
                item.is_error = true;
                item.error_txt = '内容输入错误，请重新输入';
            } else if( min < s || max > e ){
                item.is_error = true;
                item.error_txt = `内容输入错误，请输入${s}-${e}`;
            } else if( min >= max ){
                item.is_error = true;
                item.error_txt = '内容输入错误，请重新输入';
            } else {
                item.is_error = false;
                item.error_txt = '';
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.content_keys {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
        width: 33%;
        float: left;
        height: 40px;
        line-height: 29px;
        padding: 0;
    }
    
}
.el-form-item {
    padding: 0;
    margin-bottom: 0;
}
.el-form-item.is-error .el-input__inner{
    border-color: #ff4949;
}
.el_item_error{
    color: #ff4949;
    font-size: 12px;
    line-height: 180%;
}
.el-checkbox__input.el_disabled .el-checkbox__label{
    color: red!important;
}

.el_space {
    padding: 0 5px;
}
.footer {
    margin: 50px 0;
    text-align: center;
}
.el_sbumit_btn {
    padding: 12px 50px;
    font-size: 16px;
}
fieldset {
    margin: 0 0 30px;
    border: 1px solid #000;
}
legend {
    padding: 0 10px;
    font-weight: 700;
    font-size: 16px;
}
.el_tips {
    padding-top: 20px;
    color: #ff4949;
    margin-bottom: 15px;
}
.el_row_content {
    padding: 10px 10px;
}
.keys_list {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
        line-height: 36px;
        color: #333333;
        display: flex;
    }
}
.el_back_btn {
    margin: 0 0 20px;
}
</style>
