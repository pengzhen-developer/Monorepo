import peace from '@src/library'

export const goDetail = (type, data, familyId) => {
  if (type === '病历') {
    const json = peace.util.encode({
      inquiryNo: data.inquiryNo
    })

    $peace.$router.push(`/file/fileAllDetail/${json}`)
  }

  // 跳转血压详情
  else if (type === '血压') {
    const json = peace.util.encode({
      type: peace.config.file.type[type],
      idCard: data.idCard,
      dataId: data.id,
      familyId: familyId
    })

    $peace.$router.push(`/file/fileBloodPressureDetail/${json}`)
  }

  // 跳转血氧详情
  else if (type === '血氧') {
    const json = peace.util.encode({
      type: peace.config.file.type[type],
      idCard: data.idCard,
      dataId: data.id,
      familyId: familyId
    })

    $peace.$router.push(`/file/fileBloodOxyGenDetail/${json}`)
  }

  // 跳转血糖详情
  else if (type === '血糖') {
    const json = peace.util.encode({
      type: peace.config.file.type[type],
      idCard: data.idCard,
      dataId: data.id,
      familyId: familyId
    })

    $peace.$router.push(`/file/fileBloodSugarDetail/${json}`)
  }

  // 跳转体脂详情
  else if (type === '体脂') {
    const json = peace.util.encode({
      type: peace.config.file.type[type],
      idCard: data.idCard,
      dataId: data.id,
      familyId: familyId
    })

    $peace.$router.push(`/file/fileBodyFatDetail/${json}`)
  }
}

export const goHealthDetail = data => {
  const json = peace.util.encode({
    familyId: data.familyId
  })

  $peace.$router.push(`/file/fileHealthDetail/${json}`)
}

export const goReportList = (type, serviceType, idCard) => {
  let json = {}

  if (serviceType === '周报') {
    json = peace.util.encode({
      type: peace.config.file.type[type],
      serviceType: serviceType,
      idcard: idCard,
      idCard: idCard,
      serviceId: peace.config.file.week[type]
    })
  } else if (serviceType === '月报') {
    json = peace.util.encode({
      type: peace.config.file.type[type],
      serviceType: serviceType,
      idcard: idCard,
      idCard: idCard,
      serviceId: peace.config.file.month[type]
    })
  }

  $peace.$router.push(`/file/fileReportList/${json}`)
}

export const getUnit = type => {
  return peace.config.file.unit[type]
}

export default {
  goDetail,
  goHealthDetail,
  goReportList,
  getUnit
}
