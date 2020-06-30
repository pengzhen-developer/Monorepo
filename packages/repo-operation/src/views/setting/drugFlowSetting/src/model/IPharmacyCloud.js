/**
 * 云药房模型
 *
 * @export
 * @class IPharmacyCloud
 */
export class IPharmacyCloud {
  /** 云药房图片 */
  image = 'https://placeimg.com/500/300/nature'

  /** 云药房名称 */
  name = ''

  /** 云药房仓库 */
  store = ''
}

/**
 * 云药房视图模型
 *
 * @export
 * @class IPharmacyCloudViewModel
 */
export class IPharmacyCloudViewModel {
  /** 是否选择云药房 */
  pharmacyCloudChecked = false

  /** 云药房数据 */
  pharmacyCloudData = new IPharmacyCloud()
}

export default IPharmacyCloudViewModel
