import { selectAll } from '@/api/select'
const state = {
    status: false,
    funding_party: [],      //资金方
    fund_product: [],   // 资金产品
    asset_party: [],        //资产方
    asset_product: [],      //资产产品
    payment_channel: [],     //支付渠道
    assure_party: [],        //保障方
    assure_way: [],         //保障方式
    sign: [],                  //签章
    institution: [
        {
            id: 1,
            name: '宝付'
        },
        {
            id: 2,
            name: '易宝'
        },
        {
            id: 3,
            name: '先锋'
        },
        {
            id: 4,
            name: '京东'
        },
        {
            id: 5,
            name: '拉卡拉'
        },
    ]

}
const mutations = {
    GET_SELECT:( state, all ) => {
        state.funding_party = all.funding_party;
        state.fund_product = all.fund_product;
        state.asset_party = all.asset_party;
        state.asset_product = all.asset_product;
        state.payment_channel = all.payment_channel;
        state.assure_party = all.assure_party;
        state.assure_way = all.assure_way;
        state.sign = all.sign;
    }
}
const actions = {
    getSelect({ commit, state }){
        return new Promise((resolve, reject) => {
            state.status = false;
            if( !state.status ){
                selectAll().then( res => {
                    let { status, returnData } = res;
                    if( status == 'SUCCESS' ){
                        commit('GET_SELECT',returnData);
                        state.status = true;
                        resolve();
                    }
                }).catch(error => {
                    reject(error)
                });
            }
        });
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
  }