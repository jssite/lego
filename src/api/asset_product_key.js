const create_product_map = [
    {
        title_name: '借款人基本信息',
        children: [
            {
                name: '借款人姓名',
                form_key: 'loan_name',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '手机号',
                form_key: 'loan_mobile_number',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '银行卡号',
                form_key: 'card_number',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '银行卡名称',
                form_key: 'bank_name',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '身份证号',
                form_key: 'loan_id_number',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '年龄',
                form_key: 'age',
                checkbox: 0,
                children_type: 'interval', //none //input //interval  //select
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '性别',
                form_key: 'sex',
                checkbox: 0,
                children_type: 'select', //none //input //interval  //select
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [
                    {
                        value: 1,
                        name: '男'
                    },
                    {
                        value: 2,
                        name: '女'
                    }
                ],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '婚姻状况',
                form_key: 'has_married',
                checkbox: 0,
                children_type: 'select',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [
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
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '有无子女',
                form_key: 'has_children',
                checkbox: 0,
                children_type: 'select',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [
                    {
                        value: 1,
                        name: '有'
                    },
                    {
                        value: 2,
                        name: '无'
                    }
                ],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '户籍地址',
                form_key: 'family_address',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '居住地址',
                form_key: 'live_address',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '电子邮箱',
                form_key: 'loan_email',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '学历',
                form_key: 'degree',
                checkbox: 0,
                children_type: 'select',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [
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
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '职业',
                form_key: 'job',
                checkbox: 0,
                children_type: 'select',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [
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
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '月收入(元)',
                form_key: 'month_income',
                checkbox: 0,
                children_type: 'interval',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            }
        ]
    },
    {
        title_name: '借款人详细信息',
        children: [
            
            {
                name: '工作年限(年)',
                form_key: 'works_years',
                checkbox: 0,
                children_type: 'interval',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '公司名称',
                form_key: 'company_name',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '公司性质',
                form_key: 'company_nature',
                checkbox: 0,
                children_type: 'select',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [
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
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '公司规模',
                form_key: 'company_size',
                checkbox: 0,
                children_type: 'select',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [
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
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '所属行业',
                form_key: 'company_industry',
                checkbox: 0,
                children_type: 'select',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [
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
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '公司地址',
                form_key: 'company_address',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '联系人姓名',
                form_key: 'contract_name',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '联系人关系',
                form_key: 'contract_relation',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '联系人手机号',
                form_key: 'contract_mobile_number',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '信用额度(元)',
                form_key: 'credit_line',
                checkbox: 0,
                children_type: 'interval',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '信用评级',
                form_key: 'credit_level',
                checkbox: 0,
                children_type: 'select',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [
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
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '有无房产',
                form_key: 'has_house',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [
                    {
                        value: 1,
                        name: '有'
                    },
                    {
                        value: 2,
                        name: '无'
                    }
                ],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '有无房贷',
                form_key: 'has_house_mortgage',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [
                    {
                        value: 1,
                        name: '有'
                    },
                    {
                        value: 0,
                        name: '无'
                    }
                ],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '有无车产',
                form_key: 'has_car',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [
                    {
                        value: 1,
                        name: '有'
                    },
                    {
                        value: 0,
                        name: '无'
                    }
                ],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '有无车贷',
                form_key: 'has_car_mortgage',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [
                    {
                        value: 1,
                        name: '有'
                    },
                    {
                        value: 0,
                        name: '无'
                    }
                ],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '有无社保',
                form_key: 'has_security',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [
                    {
                        value: 1,
                        name: '有'
                    },
                    {
                        value: 0,
                        name: '无'
                    }
                ],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '有无公积金',
                form_key: 'has_reserved_funds',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [
                    {
                        value: 1,
                        name: '有'
                    },
                    {
                        value: 0,
                        name: '无'
                    }
                ],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '有无保单',
                form_key: 'has_insurance_policy',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [
                    {
                        value: 1,
                        name: '有'
                    },
                    {
                        value: 0,
                        name: '无'
                    }
                ],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '有无其他贷款',
                form_key: 'has_other_mortgage',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [
                    {
                        value: 1,
                        name: '有'
                    },
                    {
                        value: 0,
                        name: '无'
                    }
                ],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            }
        ]
    },
    {
        title_name: '借款信息',
        children: [
            {
                name: '进件编号',
                form_key: 'thirt_bid_num',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '借款金额',
                form_key: 'loan_money',
                checkbox: 0,
                children_type: 'interval',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '借款期限（月）',
                form_key: 'loan_period',
                checkbox: 0,
                children_type: 'interval',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '还款方式',
                form_key: 'repay_type',
                checkbox: 0,
                children_type: 'select',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [
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
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '抵押信息',
                form_key: 'mortgage_type',
                checkbox: 0,
                children_type: 'select',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [
                    {
                        value: 1,
                        name: '车'
                    },
                    {
                        value: 2,
                        name: '房'
                    },
                    {
                        value: 3,
                        name: '其他'
                    },
                    {
                        value: 4,
                        name: '无抵押'
                    }
                ],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '借款用途',
                form_key: 'loan_puposes',
                checkbox: 0,
                children_type: 'select',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [
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
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '借款用途详情',
                form_key: 'loan_desc_detail',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '还款来源',
                form_key: 'repay_source',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '标的信用等级',
                form_key: 'bid_credit_level',
                checkbox: 0,
                children_type: 'select',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [
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
                form_val_select: [],
                is_error: false,
                error_txt: ''
            }
        ]
    },
    {
        title_name: '扩展字段',
        children: [
            {
                name: '借款编号',
                form_key: 'loan_code',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '真实利率',
                form_key: 'actual_rate',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '合同编号',
                form_key: 'contract_id',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '反担保服务费',
                form_key: 'reverse_guarantee_service_fee',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '服务费',
                form_key: 'service_fee',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '担保服务费',
                form_key: 'guarantee_service_fee',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '标的描述',
                form_key: 'bid_detail',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '申请编号',
                form_key: 'apply_num',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '借款唯一编号',
                form_key: '',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '标的名称',
                form_key: 'bid_name',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '标的二级类型',
                form_key: 'bid_type_second',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '线下标的类型',
                form_key: 'offline_bid_type',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '缴费方式',
                form_key: 'fee_mode',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '二级机构类型',
                form_key: 'second_party_type',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '线下获客',
                form_key: 'customer_channel',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '保障金',
                form_key: 'guarantee_money',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '合同金额',
                form_key: 'contract_money',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '咨询费',
                form_key: 'consulting_fee',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '银行类型',
                form_key: 'bank_type',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '利息总额',
                form_key: 'total_interest',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '利率',
                form_key: 'rate',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '电商咨询费',
                form_key: 'ds_consulting_fee',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '提现方式',
                form_key: 'source_type',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '资产产品ID',
                form_key: 'asset_product_num',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            },
            {
                name: '资产方',
                form_key: 'asset_num',
                checkbox: 0,
                children_type: 'none',
                form_input_0: '',
                form_input_1: '',
                form_input_2: '',
                form_select: [],
                form_val_select: [],
                is_error: false,
                error_txt: ''
            }
        ]
    }
]
export default create_product_map;