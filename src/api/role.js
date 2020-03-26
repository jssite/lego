import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/routes',
    method: 'get'
  })
}

export function getRoles(data) {
  return request({
    url: '/user/getRolesPage',
    method: 'post',
    data
  })
}

export function getRolesById(roleId) {
  return request({
    url: '/user/getPermissionsByRoleId/' + roleId,
    method: 'get'
  })
}

export function dealRole(data) {
  return request({
    url: '/user/dealRole',
    method: 'post',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/role/${id}`,
    method: 'delete'
  })
}
