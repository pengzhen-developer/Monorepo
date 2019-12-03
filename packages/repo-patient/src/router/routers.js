const routers = [
  {
    path: '/',
    name: '/',
    meta: {
      auth: false
    },
    component: () => import('@src/components/redirect/Redirect.vue')
  },
  {
    path: '/redirect',
    name: '/redirect',
    meta: {
      auth: false
    },
    component: () => import('@src/components/redirect/Redirect.vue')
  },
  {
    path: '/WXAuth',
    name: '/WXAuth',
    meta: {
      auth: false
    },
    component: () => import('@src/components/redirect/WXAuth.vue')
  },
  {
    path: '/errorPage',
    name: '/errorPage',
    meta: {
      auth: false
    },
    component: () => import('@src/components/ErrorPage.vue')
  },
  // 首页
  {
    path: '/home/index',
    name: '/home/index',
    meta: {
      auth: false,
      keepAlive: true,
      tabBar: true,
      navbar: {
        title: '首页'
      }
    },
    component: () => {
      if (
        $peace.cache.get($peace.type.SYSTEM.NETHOSPITALID) &&
        $peace.cache.get($peace.type.SYSTEM.CHANNELID)
      ) {
        return import('@src/views/hospital/HospitalHome.vue')
      } else {
        return import('@src/views/home/index.vue')
      }
    }
  },
  // 医院首页
  {
    path: '/home/index/:json',
    name: '/home/index',
    meta: {
      auth: false,
      keepAlive: true,
      tabBar: true,
      navbar: {
        title: '首页'
      }
    },
    component: () => import('@src/views/hospital/HospitalHome.vue')
  },
  {
    path: '/home/map/:json',
    name: '/home/map',
    meta: {
      auth: false,
      keepAlive: true,
      tabBar: true,
      navbar: {
        title: '地图',
        back: true
      }
    },
    component: () => import('@src/views/home/map.vue')
  },
  // 消息
  {
    path: '/message/index',
    name: '/message/index',
    meta: {
      auth: false,
      keepAlive: true,
      tabBar: true,
      navbar: {
        title: '消息'
      }
    },
    component: () => import('@src/views/message/index.vue')
  },

  // 健康档案
  {
    path: '/file/index',
    name: '/file/index',
    meta: {
      auth: true,
      tabBar: true,
      navbar: {
        title: '健康档案'
      }
    },
    component: () => import('@src/views/file/index.vue')
  },

  {
    path: '/file/fileHealthDetail/:json',
    name: '/file/fileHealthDetail',
    meta: {
      tabBar: true,
      navbar: {
        title: '健康档案-基本健康信息'
      }
    },
    component: () => import('@src/views/file/FileHealthDetail.vue')
  },
  {
    path: '/file/fileAllDetail/:json',
    name: '/file/fileAllDetail/:json',
    meta: {
      auth: false,
      navbar: {
        title: '健康档案-全部'
      }
    },
    component: () => import('@src/views/file/FileAllDetail.vue')
  },
  {
    path: '/file/fileReportList/:json',
    name: '/file/fileReportList/:json',
    meta: {
      auth: false,
      navbar: {
        title: '健康档案-报表'
      }
    },
    component: () => import('@src/views/file/FileReportList.vue')
  },
  {
    path: '/file/fileBloodPressureHistory/:json',
    name: '/file/fileBloodPressureHistory/:json',
    meta: {
      auth: false,
      navbar: {
        title: '健康档案-血压历史数据'
      }
    },
    component: () => import('@src/views/file/FileBloodPressureHistory.vue')
  },
  {
    path: '/file/fileBloodPressureDetail/:json',
    name: '/file/fileBloodPressureDetail/:json',
    meta: {
      auth: false,
      navbar: {
        title: '健康档案-血压详情'
      }
    },
    component: () => import('@src/views/file/FileBloodPressureDetail.vue')
  },
  {
    path: '/file/fileBloodPressureAddData/:json',
    name: '/file/fileBloodPressureAddData/:json',
    meta: {
      auth: false,
      navbar: {
        title: '健康档案-添加血压'
      }
    },
    component: () => import('@src/views/file/FileBloodPressureAddData.vue')
  },

  {
    path: '/file/fileBloodOxyGenHistory/:json',
    name: '/file/fileBloodOxyGenHistory/:json',
    meta: {
      auth: false,
      navbar: {
        title: '健康档案-血氧历史数据'
      }
    },
    component: () => import('@src/views/file/FileBloodOxyGenHistory.vue')
  },
  {
    path: '/file/fileBloodOxyGenDetail/:json',
    name: '/file/fileBloodOxyGenDetail/:json',
    meta: {
      auth: false,
      navbar: {
        title: '健康档案-血氧详情'
      }
    },
    component: () => import('@src/views/file/FileBloodOxyGenDetail.vue')
  },
  {
    path: '/file/fileBloodOxyGenAddData/:json',
    name: '/file/fileBloodOxyGenAddData/:json',
    meta: {
      auth: false,
      navbar: {
        title: '健康档案-添加血氧'
      }
    },
    component: () => import('@src/views/file/FileBloodOxyGenAddData.vue')
  },

  {
    path: '/file/fileBodyFatHistory/:json',
    name: '/file/fileBodyFatHistory/:json',
    meta: {
      auth: false,
      navbar: {
        title: '健康档案-体脂历史数据'
      }
    },
    component: () => import('@src/views/file/FileBodyFatHistory.vue')
  },
  {
    path: '/file/fileBodyFatDetail/:json',
    name: '/file/fileBodyFatDetail/:json',
    meta: {
      auth: false,
      navbar: {
        title: '健康档案-体脂详情'
      }
    },
    component: () => import('@src/views/file/FileBodyFatDetail.vue')
  },
  {
    path: '/file/fileBodyFatAddData/:json',
    name: '/file/fileBodyFatAddData/:json',
    meta: {
      auth: false,
      navbar: {
        title: '健康档案-添加体脂'
      }
    },
    component: () => import('@src/views/file/FileBodyFatAddData.vue')
  },

  {
    path: '/file/fileBloodSugarDetail/:json',
    name: '/file/fileBloodSugarDetail/:json',
    meta: {
      auth: false,
      navbar: {
        title: '健康档案-血糖'
      }
    },
    component: () => import('@src/views/file/FileBloodSugarDetail.vue')
  },
  {
    path: '/file/fileBloodSugarHistory/:json',
    name: '/file/fileBloodSugarHistory/:json',
    meta: {
      auth: false,
      navbar: {
        title: '健康档案-历史数据'
      }
    },
    component: () => import('@src/views/file/FileBloodSugarHistory.vue')
  },
  {
    path: '/file/fileBloodSugarAddData/:json',
    name: '/file/fileBloodSugarAddData/:json',
    meta: {
      auth: false,
      navbar: {
        title: '健康档案-添加血压'
      }
    },
    component: () => import('@src/views/file/FileBloodSugarAddData.vue')
  },
  // 我的
  {
    path: '/setting/index',
    name: '/setting/index',
    meta: {
      auth: true,
      keepAlive: true,
      tabBar: true,
      navbar: {
        title: '个人中心'
      }
    },
    component: () => import('@src/views/setting/index.vue')
  },

  // 我的家人
  {
    path: '/setting/myFamilyMembers',
    name: '/setting/myFamilyMembers',
    meta: {
      auth: true,
      navbar: {
        title: '我的家人',
        back: true
      }
    },
    component: () => import('@src/views/setting/MyFamilyMembers.vue')
  },
  // 我的家人
  {
    path: '/setting/familyMember/:json',
    name: '/setting/familyMember/:json',
    meta: {
      auth: true,
      navbar: {
        title: '我的家人',
        back: true
      }
    },
    component: () => import('@src/views/components/FamilyMembersModel.vue')
  },

  // 电子健康卡详情
  {
    path: '/setting/cardDetail/:json',
    name: '/setting/cardDetail',
    meta: {
      auth: true,
      navbar: {
        title: '我的家人',
        back: true
      }
    },
    component: () => import('@src/views/setting/CardDetail.vue')
  },
  {
    path: '/card/index',
    name: '电子健康卡',
    meta: {
      auth: true,
      navbar: {
        title: '我的家人',
        back: true
      }
    },
    component: () => import('@src/views/card/index.vue')
  },
  // 我的咨询
  {
    path: '/setting/userConsultList',
    name: '/setting/userConsultList',
    meta: {
      auth: true,
      navbar: {
        title: '我的咨询',
        back: true
      }
    },
    component: () => import('@src/views/setting/UserConsultList.vue')
  },

  // 咨询详情
  {
    path: '/setting/userConsultDetail/:json',
    name: '/setting/userConsultDetail',
    meta: {
      auth: true,
      navbar: {
        title: '咨询详情',
        back: true
      }
    },
    component: () => import('@src/views/components/ConsultDetail.vue')
  },

  // 用药建议
  {
    path: '/components/theRecipeList/:json',
    name: '/components/theRecipeList/:json',
    meta: {
      auth: false,
      navbar: {
        title: '用药建议',
        back: true
      }
    },
    component: () => import('@src/views/components/TheRecipeList.vue')
  },
  // 用药建议详情（处方详情）
  {
    path: '/components/theRecipe/:json',
    name: '/components/theRecipe/:json',
    meta: {
      auth: true,
      navbar: {
        title: '用药建议',
        back: true
      }
    },
    component: () => import('@src/views/components/TheRecipe.vue')
  },
  // 咨询小结（病历详情）
  {
    path: '/components/theCase/:json',
    name: '/components/theCase/:json',
    meta: {
      auth: true,
      navbar: {
        title: '咨询小结',
        back: true
      }
    },
    component: () => import('@src/views/components/TheCase.vue')
  },
  // 检查单
  {
    path: '/components/theInspection/:json',
    name: '/components/theInspection/:json',
    meta: {
      auth: true,
      navbar: {
        title: '检查单',
        back: true
      }
    },
    component: () => import('@src/views/components/TheInspection.vue')
  },
  // 转诊单
  {
    path: '/components/theTransfer/:json',
    name: '/components/theTransfer/:json',
    meta: {
      auth: true,
      navbar: {
        title: '转诊详情',
        back: true
      }
    },
    component: () => import('@src/views/components/TheTransfer.vue')
  },
  // 会诊单
  {
    path: '/components/theConsultation/:json',
    name: '/components/theConsultation/:json',
    meta: {
      auth: true,
      navbar: {
        title: '会诊详情',
        back: true
      }
    },
    component: () => import('@src/views/components/TheConsultation.vue')
  },
  // 问诊表单
  {
    path: '/components/thePreliminaryForm/:json',
    name: '/components/thePreliminaryForm/:json',
    meta: {
      auth: true,
      navbar: {
        title: '问诊表单',
        back: true
      }
    },
    component: () => import('@src/views/components/ThePreliminaryForm.vue')
  },
  // 用药建议
  {
    path: '/drug/list/:json',
    name: 'druglist',
    meta: {
      auth: true,
      navbar: {
        title: '药房列表',
        back: true
      }
    },
    component: () => import('@src/views/drug/DrugListPharmacy.vue')
  },

  // 地图选择
  {
    path: '/drug/selectMap/:json',
    name: 'DrugMapSelect',
    meta: {
      auth: true,
      navbar: {
        title: '选择地点',
        back: true
      }
    },
    component: () => import('@src/views/drug/DrugMapSelect.vue')
  },
  // 提交订单
  {
    path: '/drug/drugOrderBefore/:json',
    name: 'drugOrderBefore',
    meta: {
      auth: true,
      navbar: {
        title: '提交订单',
        back: true
      }
    },
    component: () => import('@src/views/drug/DrugOrderBefore.vue')
  },
  // 医生列表
  {
    path: '/components/doctorList/:json',
    name: '/components/doctorList',
    meta: {
      auth: false,
      navbar: {
        title: '医生列表',
        back: true
      }
    },
    component: () => import('@src/views/components/DoctorList.vue')
  },
  // 消息列表
  {
    path: '/components/messageList/:json',
    name: '/components/messageList',
    meta: {
      auth: true
    },
    component: () => import('@src/views/components/MessageList.vue')
  },
  // 医生主页
  {
    path: '/components/doctorDetail/:json',
    name: '/components/doctorDetail',
    meta: {
      auth: false,
      navbar: {
        title: '医生主页',
        back: true
      }
    },
    component: () => import('@src/views/components/DoctorDetail.vue')
  },
  // 申请图文问诊
  {
    path: '/components/doctorInquiryApply/:json',
    name: '/components/doctorInquiryApply',
    meta: {
      keepAlive: true,
      auth: true,
      navbar: {
        title: '图文咨询',
        back: true
      }
    },
    component: () => import('@src/views/components/DoctorInquiryApply.vue')
  },
  // 附件上传
  {
    path: '/components/uploader/',
    name: '/components/uploader',
    component: () => import('@src/views/components/Uploader.vue')
  },
  // 申请图文问诊 - 订单支付
  {
    path: '/components/doctorInquiryPay/:json',
    name: '/components/doctorInquiryPay/:json',
    meta: {
      auth: true,
      navbar: {
        title: '支付方式',
        back: true
      }
    },
    component: () => import('@src/views/components/DoctorInquiryPay.vue')
  },
  // 申请图文问诊 - 订单支付结果
  {
    path: '/components/doctorInquiryPayResult/:json',
    name: '/components/doctorInquiryPayResult/:json',
    meta: {
      auth: true,
      navbar: {
        title: '支付结果',
        back: true
      }
    },
    component: () => import('@src/views/components/DoctorInquiryPayResult.vue')
  },

  // 添加既往史
  {
    path: '/components/addIllnessHistory',
    name: '/components/addIllnessHistory',
    meta: {
      auth: true,
      navbar: {
        title: '添加既往史',
        back: true
      }
    },
    component: () => import('@src/views/components/AddIllnessHistory.vue')
  },
  // 添加过敏史
  {
    path: '/components/addAllergicHistory',
    name: '/components/addAllergicHistory',
    meta: {
      auth: true,
      navbar: {
        title: '添加过敏史',
        back: true
      }
    },
    component: () => import('@src/views/components/AddAllergicHistory.vue')
  },
  // 添加过敏史
  {
    path: '/components/AddFoodAllergy',
    name: '/components/AddFoodAllergy',
    meta: {
      auth: true,
      navbar: {
        title: '添加过敏史',
        back: true
      }
    },
    component: () => import('@src/views/components/AddFoodAllergy.vue')
  },

  // 知情同意书
  {
    path: '/components/informedConsent',
    name: '/components/informedConsent',
    meta: {
      auth: true,
      navbar: {
        title: '知情同意书',
        back: true
      }
    },
    component: () => import('@src/views/components/InformedConsent.vue')
  },

  // 医院列表
  {
    path: '/hospital/HospitalList/:json',
    name: '/hospital/HospitalList',
    meta: {
      auth: false,
      navbar: {
        title: '医院列表',
        back: true
      }
    },
    component: () => import('@src/views/hospital/HospitalList.vue')
  },
  // 医院通知列表
  {
    path: '/hospital/HospitalNoticesList/:json',
    name: '/hospital/HospitalNoticesList',
    meta: {
      keepAlive: false,
      auth: false,
      navbar: {
        title: '医院通知',
        back: true
      }
    },
    component: () => import('@src/views/hospital/notice/HospitalNoticesList.vue')
  },
  // 医院通知详情
  {
    path: '/hospital/HospitalNoticesDetail/:json',
    name: '/hospital/HospitalNoticesDetail',
    meta: {
      keepAlive: false,
      auth: false,
      navbar: {
        title: '医院通知',
        back: true
      }
    },
    component: () => import('@src/views/hospital/notice/HospitalNoticesDetail.vue')
  },
  // 医院主页
  {
    path: '/hospital/HospitalHome/:json',
    name: '/hospital/HospitalHome',
    meta: {
      auth: false,
      navbar: {
        title: '医院主页',
        back: true
      }
    },
    component: () => import('@src/views/hospital/HospitalHome.vue')
  },
  // 医院科室二联动
  {
    path: '/hospital/depart/hospitalDepartSelect/:json',
    name: '/hospital/depart/hospitalDepartSelect',
    meta: {
      auth: false,
      keepAlive: true,
      navbar: {
        title: '科室选择',
        back: true
      }
    },
    component: () => import('@src/views/hospital/depart/hospitalDepartSelect.vue')
  },
  // 预约挂号医生列表
  {
    path: '/appoint/doctor/appointDoctorList/:json',
    name: '/appoint/doctor/appointDoctorList',
    meta: {
      auth: false,
      navbar: {
        title: '选择医生',
        back: true
      }
    },
    component: () => import('@src/views/appoint/doctor/appointDoctorList.vue')
  },
  {
    path: '/hospital/depart/HospitalDepartList',
    meta: {
      auth: false,
      navbar: {
        title: '选择科室',
        back: true
      }
    },
    component: () => import('@src/views/hospital/depart/HospitalDepartList.vue')
  },
  {
    path: '/appoint/doctor/appointDoctorSelect/:json',
    name: '/appoint/doctor/appointDoctorSelect',
    meta: {
      auth: false,
      keepAlive: true,
      navbar: {
        title: '选择就诊时间',
        back: true
      }
    },
    component: () => import('@src/views/appoint/doctor/appointDoctorSelect.vue')
  },
  {
    path: '/appoint/order/appointOrderSubmit/:json',
    name: '/appoint/order/appointOrderSubmit',
    meta: {
      auth: true,
      keepAlive: true,
      navbar: {
        title: '预约信息',
        back: true
      }
    },
    component: () => import('@src/views/appoint/order/appointOrderSubmit.vue')
  },
  {
    path: '/setting/userDoctorList',
    name: '/setting/userDoctorList',
    meta: {
      auth: true,
      navbar: {
        title: '我的医生',
        back: true
      }
    },
    component: () => import('@src/views/setting/userDoctorList.vue')
  },
  {
    path: '/setting/AdressManger',
    name: '/setting/AdressManger',
    meta: {
      auth: true,
      navbar: {
        title: '地址管理',
        back: true
      }
    },
    component: () => import('@src/views/setting/AdressManger.vue')
  },
  {
    path: '/setting/SelectAddressManger/:json',
    name: '/setting/SelectAddressManger',
    meta: {
      auth: true,
      navbar: {
        title: '选择地址',
        back: true
      }
    },
    component: () => import('@src/views/setting/SelectAddressManger.vue')
  },
  {
    path: '/setting/userAddressEdit/:json',
    name: '/setting/userAddressEdit',
    meta: {
      auth: true,
      navbar: {
        title: '编辑地址',
        back: true
      }
    },
    component: () => import('@src/views/setting/userAddressEdit.vue')
  },
  {
    path: '/setting/userAddressEdit',
    name: '/setting/userAddressEdit',
    meta: {
      auth: true,
      navbar: {
        title: '添加新地址',
        back: true
      }
    },
    component: () => import('@src/views/setting/userAddressEdit.vue')
  },
  {
    path: '/setting/order/userOrderList',
    name: '/setting/order/userOrderList',
    meta: {
      auth: true,
      navbar: {
        title: '我的订单',
        back: true
      }
    },
    component: () => import('@src/views/setting/order/userOrderList.vue')
  },
  {
    path: '/setting/order/userDrugList',
    name: '/setting/order/userDrugList',
    meta: {
      auth: true,
      navbar: {
        title: '购药记录',
        back: true
      }
    },
    component: () => import('@src/views/setting/order/userDrugList.vue')
  },
  {
    path: '/setting/order/userOrderDetail/:json',
    name: '/setting/order/userOrderDetail',
    meta: {
      auth: true,
      navbar: {
        title: '订单详情',
        back: true
      }
    },
    component: () => import('@src/views/setting/order/userOrderDetail.vue')
  },
  {
    path: '/record/recordCondition/:json',
    name: '/record/recordCondition',
    meta: {
      keepAlive: true,
      auth: false,
      navbar: {
        title: '查询报告',
        back: true
      }
    },
    component: () => import('@src/views/record/recordCondition.vue')
  },
  {
    path: '/record/recordHome/:json',
    name: '/record/recordHome',
    meta: {
      // keepAlive: true,
      auth: true,
      navbar: {
        title: '查询报告',
        back: true
      }
    },
    component: () => import('@src/views/record/recordHome.vue')
  },
  {
    path: '/diagnose/select/diagnoseSelectBody/:json',
    name: '/diagnose/select/diagnoseSelectBody',
    meta: {
      keepAlive: true,
      auth: false,
      navbar: {
        title: '选择症状',
        back: true
      }
    },
    component: () => import('@src/views/diagnose/select/diagnoseSelectBody.vue')
  },
  {
    path: '/diagnose/diagnoseHome/:json',
    name: '/diagnose/diagnoseHome',
    meta: {
      keepAlive: true,
      auth: false,
      navbar: {
        title: '疾病',
        back: true
      }
    },
    component: () => import('@src/views/diagnose/diagnoseHome.vue')
  },
  {
    path: '/diagnose/diagnoseGroup/:json',
    name: '/diagnose/diagnoseGroup',
    meta: {
      keepAlive: true,
      auth: false,
      navbar: {
        title: '疾病人群',
        back: true
      }
    },
    component: () => import('@src/views/diagnose/diagnoseGroup.vue')
  },
  {
    path: '/diagnose/select/diagnoseSelectHumen/:json',
    name: '/diagnose/select/diagnoseSelectHumen',
    meta: {
      keepAlive: true,
      auth: false,
      navbar: {
        title: '常见人群',
        back: true
      }
    },
    component: () => import('@src/views/diagnose/select/diagnoseSelectHumen.vue')
  },
  {
    path: '/diagnose/diagnoseName/:json',
    name: '/diagnose/diagnoseName',
    meta: {
      // keepAlive: true,
      auth: false,
      navbar: {
        title: '疾病描述',
        back: true
      }
    },
    component: () => import('@src/views/diagnose/diagnoseName.vue')
  },

  {
    path: '/inter/drugInterList/:json',
    name: '/inter/drugInterList',
    meta: {
      auth: false,
      navbar: {
        title: '说明书',
        back: true
      }
    },
    component: () => import('@src/views/inter/DrugInterList.vue')
  },
  {
    path: '/inter/drugInterDetail/:json',
    name: '/inter/drugInterDetail',
    meta: {
      auth: false,
      navbar: {
        title: '说明书',
        back: true
      }
    },
    component: () => import('@src/views/inter/DrugInterDetail.vue')
  },
  {
    path: '/order/userDrugDetail/:json',
    name: '/order/userDrugDetail',
    meta: {
      auth: false,
      navbar: {
        title: '订单详情',
        back: true
      }
    },
    component: () => import('@src/views/setting/order/userDrugDetail.vue')
  },
  {
    path: '/order/userDrugLogistics/:json',
    name: '/order/userDrugLogistics',
    meta: {
      auth: false,
      navbar: {
        title: '订单状态',
        back: true
      }
    },
    component: () => import('@src/views/setting/order/userDrugLogistics.vue')
  },
  {
    path: '/login',
    name: '/login',
    meta: {
      auth: false
    },
    component: () => import('@src/components/Login.vue')
  }
]

export default routers
