const BASE_KEYS_MAP = {
    name: '借款人基本信息',
    children: [
        {
            name: '姓名',
            form_key: 'loan_name',
            wrap: 'borrower_info_entity',
            checkbox: 1,
            disabled: true,
            children_type: 'checkbox',
            form_select: [],
            old_select_value: [],
            select_value: [],
            input_value: {
                min: '',
                max: ''
            },
            is_error: false,
            error_txt: ''
        },
        {
            name: '身份证号',
            form_key: 'loan_id_number',
            wrap: 'borrower_info_entity',
            checkbox: 1,
            disabled: true,
            children_type: 'checkbox',
            form_select: [],
            old_select_value: [],
            select_value: [],
            input_value: {
                min: '',
                max: ''
            },
            is_error: false,
            error_txt: ''
        },
        // {
        //     name: '性别',
        //     form_key: 'sex',
        //     wrap: 'borrower_info_entity',
        //     checkbox: 1,
        //     disabled: true,
        //     children_type: 'checkbox',
        //     form_select: [],
        //     old_select_value: [],
        //     select_value: [],
        //     input_value: {
        //         min: '',
        //         max: ''
        //     },
        //     is_error: false,
        //     error_txt: ''
        // }
    ]
}
const DETAIL_KEYS_MAP = {
    name: '借款人详细信息',
    children: {
        col_1: [{
                name: '手机号',
                form_key: 'loan_mobile_number',
                wrap: 'borrower_detail_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'checkbox',
                form_select: [],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '电子邮箱',
                form_key: 'loan_email',
                wrap: 'borrower_detail_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'checkbox',
                form_select: [],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '毕业院校',
                form_key: 'graduate_school',
                wrap: 'borrower_detail_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'checkbox',
                form_select: [],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '户籍地址',
                form_key: 'family_address',
                wrap: 'borrower_detail_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'checkbox',
                form_select: [],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '居住地址',
                form_key: 'live_address',
                wrap: 'borrower_detail_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'checkbox',
                form_select: [],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '公司名称',
                form_key: 'company_name',
                wrap: 'borrower_detail_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'checkbox',
                form_select: [],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '公司地址',
                form_key: 'company_address',
                wrap: 'borrower_detail_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'checkbox',
                form_select: [],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '联系人姓名',
                form_key: 'contract_name',
                wrap: 'borrower_detail_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'checkbox',
                form_select: [],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '联系人关系',
                form_key: 'contract_relation',
                wrap: 'borrower_detail_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'checkbox',
                form_select: [],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '联系人手机号',
                form_key: 'contract_mobile_number',
                wrap: 'borrower_detail_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'checkbox',
                form_select: [],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            }
        ],
        col_2: [{
                name: '婚姻状况',
                form_key: 'has_married',
                wrap: 'borrower_detail_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'select',
                form_select: [
                    {
                        value: 'ALL',
                        name: '全部'
                    },
                    {
                        value: 1,
                        name: '未婚'
                    },
                    {
                        value: 2,
                        name: '已婚'
                    },
                    {
                        value: 3,
                        name: '离异'
                    },
                    {
                        value: 4,
                        name: '丧偶'
                    }
                ],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '有无子女',
                form_key: 'has_children',
                wrap: 'borrower_detail_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'select',
                form_select: [
                    {
                        value: 'ALL',
                        name: '全部'
                    },
                    {
                        value: 1,
                        name: '有'
                    },
                    {
                        value: 2,
                        name: '无'
                    }
                ],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '学历',
                form_key: 'degree',
                wrap: 'borrower_detail_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'select',
                form_select: [
                    {
                        value: 'ALL',
                        name: '全部'
                    },
                    {
                        value: 7,
                        name: '博士'
                    },
                    {
                        value: 6,
                        name: '硕士'
                    },
                    {
                        value: 5,
                        name: '本科'
                    },
                    {
                        value: 4,
                        name: '大专'
                    },
                    {
                        value: 3,
                        name: '中专'
                    },
                    {
                        value: 2,
                        name: '高中'
                    },
                    {
                        value: 1,
                        name: '初中及以下'
                    }
                ],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '职业',
                form_key: 'job',
                wrap: 'borrower_detail_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'select',
                form_select: [
                    {
                        value: 'ALL',
                        name: '全部'
                    },
                    {
                        value: 1,
                        name: '普通员工'
                    },
                    {
                        value: 2,
                        name: '管理人员'
                    },
                    {
                        value: 3,
                        name: '股东'
                    },
                    {
                        value: 4,
                        name: '私营企业业主'
                    },
                    {
                        value: 5,
                        name: '其他'
                    }
                ],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '月收入(元)',
                form_key: 'month_income',
                wrap: 'borrower_detail_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'input',
                form_select: [],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '工作年限(年)',
                form_key: 'works_years',
                wrap: 'borrower_detail_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'input',
                form_select: [],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            
            {
                name: '公司性质',
                form_key: 'company_nature',
                wrap: 'borrower_detail_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'select',
                form_select: [
                    {
                        value: 'ALL',
                        name: '全部'
                    },
                    {
                        value: 1,
                        name: '国家及地方政府行政机构'
                    },
                    {
                        value: 2,
                        name: '事业单位'
                    },
                    {
                        value: 3,
                        name: '学校及科研机构'
                    },
                    {
                        value: 4,
                        name: '央企（包括下级单位）'
                    },
                    {
                        value: 5,
                        name: '一般国企（包括下级单位）'
                    },
                    {
                        value: 6,
                        name: '外资企业'
                    },
                    {
                        value: 7,
                        name: '台港澳企业'
                    },
                    {
                        value: 8,
                        name: '合资企业'
                    },
                    {
                        value: 9,
                        name: '民营企业'
                    },
                    {
                        value: 10,
                        name: '个体经营'
                    },
                    {
                        value: 11,
                        name: '其他'
                    }
                ],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '公司规模',
                form_key: 'company_size',
                wrap: 'borrower_detail_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'select',
                form_select: [
                    {
                        value: 'ALL',
                        name: '全部'
                    },
                    {
                        value: 6,
                        name: '10001人以上'
                    },
                    {
                        value: 5,
                        name: '2001~10000人'
                    },
                    {
                        value: 4,
                        name: '501~2000人'
                    },
                    {
                        value: 3,
                        name: '101~500人'
                    },
                    {
                        value: 2,
                        name: '11~100人'
                    },
                    {
                        value: 1,
                        name: '10人以下'
                    }
                ],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '所属行业',
                form_key: 'company_industry',
                wrap: 'borrower_detail_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'select',
                form_select: [
                    {
                        value: 'ALL',
                        name: '全部'
                    },
                    {
                        name: '采掘业',
                        value: 1
                    },
                    {
                        name: '地质勘查业',
                        value: 2
                    },
                    {
                        name: '科学研究/技术服务',
                        value: 3
                    },
                    {
                        name: '水利/环境/公共设施管理',
                        value: 4
                    },
                    {
                        name: '租赁/商务服务',
                        value: 5
                    },
                    {
                        name: '军队/武警',
                        value: 6
                    },
                    {
                        name: '国际组织',
                        value: 7
                    },
                    {
                        name: '制造业',
                        value: 8
                    },
                    {
                        name: '电信/通信/计算机/软件/互联网',
                        value: 9
                    },
                    {
                        name: '国家机关/党政机关/社会团体',
                        value: 10
                    },
                    {
                        name: '媒体/广告/广播/电影/电视',
                        value: 11
                    },
                    {
                        name: '零售/批发',
                        value: 12
                    },
                    {
                        name: '教育/培训',
                        value: 13
                    },
                    {
                        name: '社会服务业',
                        value: 14
                    },
                    {
                        name: '金融/保险/法律',
                        value: 15
                    },
                    {
                        name: '交通运输/仓储/邮政',
                        value: 16
                    },
                    {
                        name: '房地产业',
                        value: 17
                    },
                    {
                        name: '水/电/煤/气/能源生产供应',
                        value: 18
                    },
                    {
                        name: '住宿/餐饮',
                        value: 19
                    },
                    {
                        name: '医疗/卫生/保健',
                        value: 20
                    },
                    {
                        name: '建筑/工程',
                        value: 21
                    },
                    {
                        name: '农/林/牧/渔',
                        value: 22
                    },
                    {
                        name: '文化/娱乐服务业',
                        value: 23
                    },
                    {
                        name: '体育/艺术',
                        value: 24
                    },
                    {
                        name: '社会福利/公益事业',
                        value: 25
                    },
                    {
                        name: '其他',
                        value: 26
                    }
                ],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            }
        ],
        col_3: [{
                name: '信用额度(元)',
                form_key: 'credit_line',
                wrap: 'borrower_detail_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'input',
                form_select: [],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '信用评级',
                form_key: 'credit_level',
                wrap: 'borrower_detail_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'select',
                form_select: [
                    {
                        value: 'ALL',
                        name: '全部'
                    },
                    {
                        name:'A',
                        value: 'A'
                    },
                    {
                        name:'B',
                        value: 'B'
                    },
                    {
                        name:'C',
                        value: 'C'
                    },
                    {
                        name:'D',
                        value: 'D'
                    },
                    {
                        name:'E',
                        value: 'E'
                    },
                    {
                        name:'F',
                        value: 'F'
                    }
                ],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '有无房产',
                form_key: 'has_house',
                wrap: 'borrower_detail_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'select',
                form_select: [
                    {
                        value: 'ALL',
                        name: '全部'
                    },
                    {
                        value: 1,
                        name: '有'
                    },
                    {
                        value: 2,
                        name: '无'
                    }
                ],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '有无房贷',
                form_key: 'has_house_mortgage',
                wrap: 'borrower_detail_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'select',
                form_select: [
                    {
                        value: 'ALL',
                        name: '全部'
                    },
                    {
                        value: 1,
                        name: '有'
                    },
                    {
                        value: 0,
                        name: '无'
                    }
                ],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '有无车产',
                form_key: 'has_car',
                wrap: 'borrower_detail_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'select',
                form_select: [
                    {
                        value: 'ALL',
                        name: '全部'
                    },
                    {
                        value: 1,
                        name: '有'
                    },
                    {
                        value: 0,
                        name: '无'
                    }
                ],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '有无车贷',
                form_key: 'has_car_mortgage',
                wrap: 'borrower_detail_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'select',
                form_select: [
                    {
                        value: 'ALL',
                        name: '全部'
                    },
                    {
                        value: 1,
                        name: '有'
                    },
                    {
                        value: 0,
                        name: '无'
                    }
                ],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '有无社保',
                form_key: 'has_security',
                wrap: 'borrower_detail_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'select',
                form_select: [
                    {
                        value: 'ALL',
                        name: '全部'
                    },
                    {
                        value: 1,
                        name: '有'
                    },
                    {
                        value: 0,
                        name: '无'
                    }
                ],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '有无公积金',
                form_key: 'has_reserved_funds',
                wrap: 'borrower_detail_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'select',
                form_select: [
                    {
                        value: 'ALL',
                        name: '全部'
                    },
                    {
                        value: 1,
                        name: '有'
                    },
                    {
                        value: 0,
                        name: '无'
                    }
                ],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '有无保单',
                form_key: 'has_insurance_policy',
                wrap: 'borrower_detail_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'select',
                form_select: [
                    {
                        value: 'ALL',
                        name: '全部'
                    },
                    {
                        value: 1,
                        name: '有'
                    },
                    {
                        value: 0,
                        name: '无'
                    }
                ],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '有无其他贷款',
                form_key: 'has_other_mortgage',
                wrap: 'borrower_detail_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'select',
                form_select: [
                    {
                        value: 'ALL',
                        name: '全部'
                    },
                    {
                        value: 1,
                        name: '有'
                    },
                    {
                        value: 0,
                        name: '无'
                    }
                ],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            }
        ]
    }
}
const INFO_KEYS_MAP = {
    name: '借款信息',
    children: {
        col_1: [
            {
                name: '进件编号',
                form_key: 'loan_code',
                wrap: 'bid_info_entity',
                checkbox: 1,
                disabled: true,
                children_type: 'checkbox',
                form_select: [],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '借款金额',
                form_key: 'loan_money',
                wrap: 'bid_info_entity',
                checkbox: 1,
                disabled: true,
                children_type: 'input',
                form_select: [],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '借款期限（月）',
                form_key: 'loan_period',
                wrap: 'bid_info_entity',
                checkbox: 1,
                disabled: true,
                children_type: 'input',
                form_select: [],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '还款方式',
                form_key: 'repay_type',
                wrap: 'bid_info_entity',
                checkbox: 1,
                disabled: true,
                children_type: 'select',
                form_select: [
                    {
                        value: 'ALL',
                        name: '全部'
                    },
                    {
                        value: 1,
                        name: '等额本息'
                    },
                    {
                        value: 2,
                        name: '每月还息到期还本'
                    },
                    {
                        value: 3,
                        name: '到期还本付息'
                    }
                ],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            }
        ],
        col_2: [
            {
                name: '借款天数',
                form_key: 'loan_days',
                wrap: 'bid_info_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'input',
                form_select: [],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '标的类型',
                form_key: 'bid_type',
                wrap: 'bid_info_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'select',
                form_select: [
                    {
                        value: 'ALL',
                        name: '全部'
                    },
                    {
                        value: 1,
                        name: '信用类'
                    },
                    {
                        value: 2,
                        name: '抵押类'
                    },
                    {
                        value: 3,
                        name: '质押类'
                    }
                ],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '标的信用等级',
                form_key: 'bid_credit_level',
                wrap: 'bid_info_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'select',
                form_select: [
                    {
                        value: 'ALL',
                        name: '全部'
                    },
                    {
                        value: 'A',
                        name: 'A'
                    },
                    {
                        value: 'B',
                        name: 'B'
                    },
                    {
                        value: 'C',
                        name: 'C'
                    },
                    {
                        value: 'D',
                        name: 'D'
                    },
                    {
                        value: 'E',
                        name: 'E'
                    }
                ],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            }
        ],
        col_3: [
            {
                name: '借款用途',
                form_key: 'loan_purposes',
                wrap: 'bid_info_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'select',
                form_select: [
                    {
                        value: 'ALL',
                        name: '全部'
                    },
                    {
                        name: '投资创业',
                        value: 1
                    },
                    {
                        name: '个人消费',
                        value: 2
                    },
                    {
                        name: '家庭消费',
                        value: 3
                    },
                    {
                        name: '医疗美容',
                        value: 4
                    },
                    {
                        name: '教育培训',
                        value: 5
                    },
                    {
                        name: '经营融资',
                        value: 6
                    }
                ],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '借款用途详情',
                form_key: 'loan_purposes_detail',
                wrap: 'bid_info_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'checkbox',
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '还款来源',
                form_key: 'repay_source',
                wrap: 'bid_info_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'checkbox',
                form_select: [],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            },
            {
                name: '借款产品名称',
                form_key: 'loan_product_name',
                wrap: 'bid_info_entity',
                checkbox: 0,
                disabled: false,
                children_type: 'checkbox',
                form_select: [],
                old_select_value: [],
                select_value: [],
                input_value: {
                    min: '',
                    max: ''
                },
                is_error: false,
                error_txt: ''
            }
        ]
    }
}
export { BASE_KEYS_MAP, DETAIL_KEYS_MAP, INFO_KEYS_MAP };