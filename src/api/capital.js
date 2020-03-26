import ajax from '@/utils/axios';

/* 资金方管理列表 */
export const capitalManageList = params => {
    return ajax.post('/v1/fund_party/list', params)
}
/* 创建资金方 */
export const createCapital = params => {
    return ajax.post('/v1/fund_party/add', params )
}
/* 编辑资金方 */
export const updateCapital = params => {
    return ajax.post('/v1/fund_party/edit', params )
}

/* 资金产品数据列表 */
export const capitalProductList = params => {
    return ajax.post('/v1/fund_product/list', params )
}

/* 资金产品创建数据 */
export const capitalProductConfig = params => {
    return ajax.post('/v1/fund_product/findFundproductAll', params )
}

/* 创建资金产品 */
export const createCapitalProduct = params => {
    return ajax.post('/v1/fund_product/add', params )
}

/* 获取资金产品详情 */
export const capitalProductDetail = params => {
    return ajax.get('/v1/fund_product/detail', {params} )
}

/* 更新资金产品 */
export const updateCapitalProduct = params => {
    return ajax.post('/v1/fund_product/edit', params )
}

/* 更新保障方 */
export const ensureSelect = params => {
    return ajax.get('/v1/assure_way/findAssurePartyByAssureWayId', { params } )
}
