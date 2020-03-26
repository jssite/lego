import ajax from '@/utils/axios';

/* 进件管理列表 */
export const incomingManageList = params => {
    return ajax.post('/v1/third_bid/list', params)
}

/* 放款管理列表 */
export const loansManageLists = params => {
    return ajax.post('/v1/loan/list', params)
}

/* 推标管理列表 */
export const pushBidsManageLists = params => {
    return ajax.post('/v1/bid_order_relation/list', params)
}