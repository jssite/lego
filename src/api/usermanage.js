import ajax from '@/utils/axios';

/* 用户管理数据列表 */
export const userManageLists = params => {
    return ajax.post('/v1/borrower/list', params );
}
/* 用户详细数据 */
export const userManageDeatail = params => {
    return ajax.get(`/v1/borrower/${params}`);
}

/* 存管用户管理数据列表 */
export const openUserManage = params => {
    return ajax.post('/v1/deposit/users', params );
}
/* 存管用户信息数据*/
export const openUserManageDetail = params => {
    return ajax.get('/v1/deposit/signing', { params } );
}
