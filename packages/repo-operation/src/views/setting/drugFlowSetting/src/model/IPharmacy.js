/** 实体药店属性 */
export class IPharmacy {
  /** 实体药店图片 */
  image = 'https://placeimg.com/500/300/nature'

  /** 实体药店名称 */
  name = ''
}

export class IPharmacyViewModel {
  /** 是否选择实体药店 */
  pharmacyChecked = false

  /** 实体药店列表 */
  pharmacyData = []
}

export default IPharmacyViewModel
