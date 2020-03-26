import Layout from '@/layout'


export const borrowingRouter = {
    path: '/borrowing',
    component: Layout,
    redirect: '/borrowing/incoming_manage',
    alwaysShow: true,
    name: 'borrowing',
    meta: {
        title: '借贷管理',
        icon: 'lock',
        roles: ['admin','borrowing:view']
    },
    children: [{
        path: 'incoming_manage',
        component: () => import('@/views/borrowing/incoming_manage'),
        name: 'incomingManage',
        meta: {
            title: '进件管理',
            roles: ['admin','incomingManage:view']
        }
    },
    // {
    //     path: 'vontract_manage',
    //     component: () => import('@/views/borrowing/vontract_manage'),
    //     name: 'vontractManage',
    //     meta: {
    //         title: '签约管理'
    //     }
    // },
    {
        path: 'pushBids_manage',
        component: () => import('@/views/borrowing/push_bids_manage'),
        name: 'pushBidsManage',
        meta: {
            title: '推标管理',
            roles: ['admin','pushBidsManage:view']
        }
    },
    {
        path: 'make_loans_manage',
        component: () => import('@/views/borrowing/make_loans_manage'),
        name: 'makeLoansManage',
        meta: {
            title: '放款管理',
            roles: ['admin','makeLoansManage:view']
        }
    }]
}
export const userManageRouter = {
    path: '/usermanage',
    component: Layout,
    redirect: '/usermanage/user_lists_manage',
    alwaysShow: true,
    name: 'usermanage',
    meta: {
        title: '用户管理',
        icon: 'peoples',
        roles: ['admin','usermanage:view']
    },
    children: [{
        path: 'user_lists_manage',
        component: () => import('@/views/user_manage/user_lists_manage'),
        name: 'userListsManage',
        meta: {
            title: '用户管理',
            roles: ['admin','userListsManage:view']
        }
    },
    {
        path: 'open_user_manage',
        component: () => import('@/views/user_manage/open_user_manage'),
        name: 'openUserManage',
        meta: {
            title: '存管开户管理',
            roles: ['admin','openUserManage:view']
        }
    }]
}
export const propertyRouter = {
    path: '/property',
    component: Layout,
    redirect: '/property/assets_manage',
    alwaysShow: true,
    name: 'property',
    meta: {
        title: '资产-产品管理',
        icon: 'clipboard',
        roles: ['admin','property:view']
    },
    children: [{
        path: 'assets_manage',
        component: () => import('@/views/property/assets_manage'),
        name: 'assetsManage',
        meta: {
            title: '资产方管理',
            roles: ['admin','assetsManage:view']
        }
    },
    {
        path: 'asset_product_manage',
        component: () => import('@/views/property/asset_product_manage'),
        name: 'assetProductManage',
        meta: {
            title: '资产产品管理',
            roles: ['admin','assetProductManage:view']
        }
    },{
        path: 'bind_assets_product',
        component: () => import('@/views/property/bind_assets_product'),
        name: 'bindAssetsProduct',
        meta: {
            title: '绑定资金产品',
            roles: ['admin','bindAssetsProduct:view']
        }
    },{
        path: 'assets_product',
        component: () => import('@/views/property/product'),
        name: 'assetsProduct',
        hidden: true,
        meta: {
            title: '资产产品',
            noCache: true,
            breadcrumb: false
        }
    }]
}

export const capitalRouter = {
    path: '/capital',
    component: Layout,
    redirect: '/capital/incoming_manage',
    alwaysShow: true,
    name: 'capital',
    meta: {
        title: '资金-产品管理',
        icon: 'example',
        roles: ['admin','capital:view']
    },
    children: [{
        path: 'capital_manage',
        component: () => import('@/views/capital/capital_manage'),
        name: 'capitalManage',
        meta: {
            title: '资金方管理',
            roles: ['admin','capitalManage:view']
        }
    },
    {
        path: 'capital_product_lists',
        component: () => import('@/views/capital/capital_product'),
        name: 'capitalProduct',
        meta: {
            title: '资金产品管理',
            roles: ['admin','capitalProduct:view']
        }
    },{
        path: 'capital_product',
        component: () => import('@/views/capital/product'),
        name: 'capitalProductItem',
        hidden: true,
        meta: {
            title: '资金产品',
            noCache: true,
            breadcrumb: false
        },
    }]
}
export const contractRouter = {
    path: '/contract',
    component: Layout,
    redirect: '/contract/contract_manage',
    alwaysShow: true,
    name: 'contract',
    meta: {
        title: '合同管理',
        icon: 'education',
        roles: ['admin']
    },
    children: [{
        path: 'contract_manage',
        component: () => import('@/views/contract/contract_manage'),
        name: 'contractManage',
        meta: {
            title: '合同模板管理',
            roles: ['admin']
        }
    },
    {
        path: 'signature_manage',
        component: () => import('@/views/contract/signature_manage'),
        name: 'signatureManage',
        meta: {
            title: '签章管理',
            roles: ['admin']
        }
    }]
}
export const ensureRouter = {
    path: '/ensure',
    component: Layout,
    redirect: '/ensure/ensure_party_manage',
    alwaysShow: true,
    name: 'ensure',
    meta: {
        title: '保障方式管理',
        icon: 'link',
        roles: ['admin','ensure:view']
    },
    children: [{
        path: 'ensure_party_manage',
        component: () => import('@/views/ensure_party/ensure_party_manage'),
        name: 'ensurePartyManage',
        meta: {
            title: '保障方管理',
            roles: ['admin','ensurePartyManage:view']
        }
    },
    {
        path: 'ensure_method_manage',
        component: () => import('@/views/ensure_party/ensure_method_manage'),
        name: 'ensureMethodManage',
        meta: {
            title: '保障方式管理',
            roles: ['admin','ensureMethodManage:view']
        }
    }]
}
export const paychannelRouter = {
    path: '/paychannel',
    component: Layout,
    redirect: '/paychannel/pay_channel_manage',
    alwaysShow: true,
    name: 'paychannel',
    meta: {
        title: '支付渠道管理',
        icon: 'tree-table',
        roles: ['admin','paychannel:view']
    },
    children: [{
        path: 'pay_channel_manage',
        component: () => import('@/views/pay_channel/pay_channel_manage'),
        name: 'payChannelManage',
        meta: {
            title: '支付渠道信息管理',
            roles: ['admin','payChannelManage:view']
        }
    },
    {
        path: 'pay_record_list',
        component: () => import('@/views/pay_channel/pay_record_list'),
        name: 'payRecond',
        meta: {
            title: '用户支付授权记录',
            roles: ['admin','payRecond:view']
        }
    }]
}

export const costStatisticsRouter = {
    path: '/coststatistics',
    component: Layout,
    redirect: '/coststatistics/property_count',
    alwaysShow: true,
    name: 'costStatistics',
    meta: {
        title: '费用统计管理',
        icon: 'money',
        roles: ['admin','costStatistics:view']
    },
    children: [{
        path: 'property_count',
        component: () => import('@/views/cost_statistics/property_count'),
        name: 'propertyCount',
        meta: {
            title: '保障方费用统计',
            roles: ['admin','propertyCount:view']
        }
    },
    {
        path: 'capital_count',
        component: () => import('@/views/cost_statistics/capital_count'),
        name: 'capitalCount',
        meta: {
            title: '资金方费用统计',
            roles: ['admin','capitalCount:view']
        }
    }]
}