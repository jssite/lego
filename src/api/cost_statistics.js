import ajax from '@/utils/axios';
const BASE_URL = process.env.VUE_APP_BASE_API;

/* 保障方费用统计列表 */
export const propertyCountList = params => {
    return ajax.post('/v1/costs/assure_party', params)
}

/* 保障方费用详细信息 */
export const propertyCountDetail = params => {
    return ajax.get('/v1/costs/assure_party/record', { params })
}

/* 导出保障方费用明细 */
export const exportPropertyCountDetail = params => {
    location.href=`${BASE_URL}/v1/costs/assure_party/export?${params}`;
}


/* 资金方费用统计列表 */
export const capitalCountList = params => {
    return ajax.post('/v1/costs/funding_party', params)
}

/* 资金方费用详情 */
export const capitalCountDetail = params => {
    return ajax.get('/v1/costs/funding_party/record', { params })
}

/* 导出资金方费用明细 */
export const exportCapitalCount = params => {
    location.href=`${BASE_URL}/v1/costs/funding_party/export?${params}`;
}