import ajax from '@/utils/axios';

/* 资产方列表数据 */
export const assetLists = params => {
    return ajax.post('/v1/controller/asset_party/list', params);
}
/* 创建资产方 */
export const createAaset = params => {
    return ajax.post('/v1/controller/asset_party/add', params);
}
/* 编辑资产方 */
export const editAaset = params => {
    return ajax.post('/v1/controller/asset_party/edit', params)
}
/* 启用资产方 */
export const enableAaset = params => {
    return ajax.post('/v1/controller/asset_party/enable', params)
}
/* 禁用资产方 */
export const disableAaset = params => {
    return ajax.post('/v1/controller/asset_party/disable', params)
}
/* 创建资产产品 */
export const createProduct = params => {
    return ajax.post('/v1/controller/asset_product/add', params)
}
/* 资产产品数据列表 */
export const productLists = params => {
    return ajax.post('/v1/controller/asset_product/list', params )
}
/* 编辑资产产品 */
export const productEdit = params => {
    return ajax.post('/v1/controller/asset_product/edit', params)
}
/* 资产产品详情 */
export const productDetail = params => {
    return ajax.post('/v1/controller/asset_product/info', params )
}
/* 绑定资金产品 */
export const bindAssetsProduct = params => {
    return ajax.post('/v1/controller/asset_product/binding_relation', params)
}
/* 获取绑定资金产品信息 */
export const getBindAssetsProduct = params => {
    return ajax.get('/v1/controller/asset_product/get_binding_relation', { params })
}
/* 获取绑定资金产品列表 */
export const getBindAssetsProductList = params => {
    return ajax.post('/v1/controller/asset_product/binding_relation/list', params)
}