import ajax from '@/utils/axios';

export const selectAll = params => {
    return ajax.post('/v1/select/all', params);
}