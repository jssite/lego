const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,

  funding_party: state => state.select.funding_party,
  fund_product: state => state.select.fund_product,
  asset_party: state => state.select.asset_party,
  asset_product: state => state.select.asset_product,
  payment_channel: state => state.select.payment_channel,
  assure_party: state => state.select.assure_party,
  assure_way: state => state.select.assure_way,
  sign: state => state.select.sign,
  institution: state => state.select.institution
}
export default getters
