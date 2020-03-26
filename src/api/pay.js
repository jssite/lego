import ajax from '@/utils/axios';

/* 用户授权列表 */
export const payRecordLists = params => {
    return ajax.post('/v1/third_payment_channel/list_for_auth', params);
}

/* 支付渠道列表 */
export const payChannelManageList = params => {
    return ajax.post('/v1/third_payment_channel/list', params);
}

/* 创建支付渠道 */
export const createPayChannel = params => {
    return ajax.post('/v1/third_payment_channel/list', params);
}
