import ajax from '@/utils/axios';

/* 保障方式列表 */
export const ensureMethodList = params => {
    return ajax.post('/v1/assure_way/list', params);
}

/* 保障方列表 */
export const ensurePartyList = params => {
    return ajax.post('/v1/assure_party/list', params);
}

/* 创建保障方 */
export const ensureCreateFile = params => {
    return ajax.post('/v1/assure_party', params);
}

/* 编辑保障方 */
export const ensureUpdateFile = (id,params) => {
    return ajax.put(`/v1/assure_party/${id}`, params);
}

/* 保障方详情 */
export const ensureDetailsFile = params => {
    return ajax.get('/v1/assure_party/detail', {params});
}