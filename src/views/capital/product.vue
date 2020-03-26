<template>
    <div class="app-container">
        <!-- 创建 -->
        <el-button class="el_back_btn" icon="el-icon-arrow-left" plain @click="funcGoToBack">返回列表</el-button>
        <div class="section">
            <el-form :model="create_form" :inline="true" :rules="rules" ref="create_form" :hide-required-asterisk="true">
                <el-row v-if="state != 'add' ">
                    <el-col :span="24">
                        <el-form-item label="资金产品ID" label-width="110px">
                            <el-input class="el_width_195" v-model="productId" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex">
                    <el-col :span="24">
                        <el-form-item label="资金产品名称" label-width="110px" prop="fundProductsName" class="el_margin_50">
                            <el-input class="el_width_195" :disabled="state == 'detail'" v-model.trim="create_form.fundProductsName" placeholder="请输入(必填)"></el-input>
                        </el-form-item>
                        <el-form-item label="资金方" label-width="110px" prop="fundingPartyId">
                            <el-select clearable :disabled="state != 'add'" v-model="create_form.fundingPartyId" placeholder="请选择(必填)">
                                <el-option v-for="item in funding_party" :key="item.funding_party_id" :label="item.funding_party_name" :value="item.funding_party_id" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="金融产品" label-width="110px" prop="financialProductInfoId">
                            <el-select clearable :disabled="state == 'detail'" v-model="create_form.financialProductInfoId" placeholder="请选择(必填)">
                                <el-option v-for="item in config.financialProductInfoSource" :key="item.id" :label="item.financialProductName" :value="item.id" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="存管银行" label-width="110px">
                            <el-select clearable :disabled="state == 'detail'" v-model="create_form.depositBankId" placeholder="请选择(选填)">
                                <el-option v-for="item in config.depositBankSource" :key="item.id" :label="item.depositName" :value="item.id" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="保障方式" label-width="110px" class="el_margin_50">
                            <el-select clearable :disabled="state == 'detail'" v-model="create_form.assureWayId" placeholder="请选择(选填)">
                                <el-option v-for="item in assure_way" :key="item.assure_way_id" :label="item.assure_way_name" :value="item.assure_way_id" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="保障方" label-width="110px" v-if="create_form.assureWayId" prop="assurePartyId">
                            <el-select clearable :disabled="state == 'detail'" v-model="create_form.assurePartyId" placeholder="请选择(选填)">
                                <el-option v-for="item in ensureSelect" :key="item.id" :label="item.assurePartyName" :value="item.id" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="需签约合同模板" label-width="110px">
                            <el-select clearable :disabled="state == 'detail'" collapse-tags multiple style="width: 553px;" v-model="create_form.contractTemplateInfoId">
                                <el-option v-for="item in config.contractTemplateInfoSource" :key="item.id" :label="item.contractTemplateName" :value="item.id" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="需授权支付渠道" label-width="110px">
                            <el-select clearable :disabled="state == 'detail'" collapse-tags multiple style="width: 553px;" v-model="create_form.thirdPartyPaymentChannelInfoId">
                                <el-option v-for="item in config.thirdPartyPaymentChannelInfoSource" :key="item.id" :label="item.paymentChannelName" :value="item.id" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="el_enter" v-if="state != 'detail'">
            <template v-if="state == 'edit'">
                <el-button type="primary" :disabled="!is_submit" @click="funcUpdateSubmit('create_form')">确认</el-button>
            </template>
            <template v-else> 
                <el-button type="primary" :disabled="!is_submit" @click="funcCreateProduct('create_form')">确认</el-button>
            </template>
        </div>
        <!-- End -->
    </div>
</template>

<script>
import { capitalProductConfig, createCapitalProduct, capitalProductDetail, updateCapitalProduct, ensureSelect } from '@/api/capital'
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            is_submit: true,
            config: {},
            create_form: {
                fundProductsName: '',
                fundingPartyId: '',
                financialProductInfoId: '',
                depositBankId: '',
                assureWayId: '',
                assurePartyId: '',
                contractTemplateInfoId: [],
                thirdPartyPaymentChannelInfoId: []
            },
            ensureSelect: null,
            rules: {
                fundProductsName: [
                    { required: true, message: '内容不能为空，请输入', trigger: 'blur' }
                ],
                fundingPartyId: [
                    { required: true, message: '内容不能为空，请选择', trigger: 'change' }
                ],
                financialProductInfoId: [
                    { required: true, message: '内容不能为空，请选择', trigger: 'change' }
                ],
                assurePartyId: [
                    { required: true, message: '内容不能为空，请选择', trigger: 'change' }
                ]
            }
        }
    },
    computed: {
        ...mapGetters(['funding_party','assure_way']),
        state:function(){
            return this.$route.query.s
        },
        productId: function(){
            return this.$route.query.id;
        }
    },
    watch:{
        'create_form.assureWayId':function(n,o){
            if( n ){
                let query = {
                    assureWay_id: n
                }
                ensureSelect(query).then( res => {
                    let { status, returnData } = res;
                    if( status == 'SUCCESS' ){
                        this.ensureSelect = returnData;
                    }
                });
            }
        }
    },
    created(){
        this.funcGetInitConfig();
        if( this.state != 'add' ){
            this.funcGetProductDetail();
        }
        
    },
    methods: {
        /* 初始化获取配置信息 */
        async funcGetInitConfig(){
            let { status, returnData } = await capitalProductConfig();
            if( status == 'SUCCESS' ){
                this.config = returnData;
            }
        },
        /* 获取资金产品详情 */
        async funcGetProductDetail(){
            let params = {
                product_id: this.productId
            }
            let { status, returnData } = await capitalProductDetail(params);
            if( status == 'SUCCESS' ){
                let contractTemplateInfoId = [];
                let PaymentChannel = [];
                if( returnData.contractTemplateInfoId ){
                    contractTemplateInfoId = returnData.contractTemplateInfoId.split(',').map(Number)
                }
                if( returnData.thirdPartyPaymentChannelInfoId ){
                    PaymentChannel = returnData.thirdPartyPaymentChannelInfoId.split(',').map(Number)
                }
                this.create_form = {
                    fundProductsName: returnData.fundProductsName,
                    fundingPartyId: returnData.fundingPartyId,
                    financialProductInfoId: returnData.financialProductInfoId,
                    depositBankId: returnData.depositBankId,
                    assureWayId: returnData.assureWayId,
                    assurePartyId: returnData.assurePartyId,
                    contractTemplateInfoId: contractTemplateInfoId,
                    thirdPartyPaymentChannelInfoId: PaymentChannel
                }
                this.$nextTick(() => {
                    this.$refs.create_form.clearValidate()
                });
            } else {
                this.funcGoToBack();
            }
        },
        /* 创建资金产品 */
        funcCreateProduct(name) {
            this.$refs[name].validate(async (valid) => {
                if (valid) {
                    try{
                        let params = Object.assign({},this.create_form);
                        params.contractTemplateInfoId = params.contractTemplateInfoId.toString();
                        params.thirdPartyPaymentChannelInfoId = params.thirdPartyPaymentChannelInfoId.toString();
                        this.is_submit = false;
                        let { status } = await createCapitalProduct(params);
                        this.is_submit = true;
                        if( status == 'SUCCESS' ){
                            this.$store.dispatch('select/getSelect');
                            this.$message({
                                showClose: true,
                                message: '资金产品创建成功！',
                                type: 'success'
                            });
                            this.funcGoToBack();
                        }
                    }
                    catch(err){
                        this.is_submit = true;
                    }
                }
            });
        },
        
        /* 更新资金产品 */
        funcUpdateSubmit(name){
            this.$refs[name].validate(async (valid) => {
                if (valid) {
                    try {
                        let params = Object.assign({},this.create_form);
                        params.id = this.productId;
                        params.contractTemplateInfoId = params.contractTemplateInfoId.toString();
                        params.thirdPartyPaymentChannelInfoId = params.thirdPartyPaymentChannelInfoId.toString();
                        this.is_submit = false;
                        let { status } = await updateCapitalProduct(params);
                        this.is_submit = true;
                        if( status == 'SUCCESS' ){
                            this.$store.dispatch('select/getSelect');
                            this.$message({
                                showClose: true,
                                message: '资金产品更新成功！',
                                type: 'success'
                            });
                            this.funcGoToBack();
                        }
                    }
                    catch(err){
                        this.is_submit = true;
                    }
                }
            });
        },
        /* 返回列表 */
        funcGoToBack(){
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
.el_back_btn {
    margin: 10px 20px;
}
.section {
    margin: 20px 0 0 20px;
}
.el_width_195{
    width: 195px;
}
.el_enter {
    margin-left: 130px;
}
.el_margin_50{
    margin-right: 50px;
}

</style>
