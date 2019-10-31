import peace from '@src/library'

export const goDetail = (type, data) => {
  if (type === '病历') {
    const json = peace.util.encode({
      inquiryNo: data.inquiryNo
    })

    $peace.$router.push(`/file/fileAllDetail/${json}`)
  } else if (type === '血压') {
    const json = peace.util.encode({
      type: peace.config.file.type[type],
      idCard: data.idCard,
      dataId: data.id
    })

    $peace.$router.push(`/file/fileBloodPressureDetail/${json}`)
  } else if (type === '血糖') {
    const json = peace.util.encode({
      type: peace.config.file.type[type],
      idCard: data.idCard,
      dataId: data.id
    })

    $peace.$router.push(`/file/fileBloodSugarDetail/${json}`)
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
      type,
      serviceType,
      idcard: idCard,
      idCard: idCard,
      serviceId: peace.config.file.week[type]
    })
  } else if (serviceType === '月报') {
    json = peace.util.encode({
      type,
      serviceType,
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
