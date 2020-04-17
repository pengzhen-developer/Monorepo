import Translation from './translation'
import { getLabelByValue } from './utils'

const getReferralStatus = v =>
  getLabelByValue(v, Translation.ReferralStatus, 'value', 'label')

const getReferralStatusTextBorderColor = v =>
  getLabelByValue(v, Translation.ReferralStatusTextBorderColor, 'value', 'label')

const getReferralStatusBgColor = v =>
  getLabelByValue(v, Translation.ReferralStatusBgColor, 'value', 'label')

const getConsultationStatus = v =>
  getLabelByValue(v, Translation.ConsultationStatus, 'value', 'label')

const getConsultStatusTextBorderColor = v =>
  getLabelByValue(v, Translation.ConsultStatusTextBorderColor, 'value', 'label')

const getConsultStatusBgColor = v =>
  getLabelByValue(v, Translation.ConsultStatusBgColor, 'value', 'label')

export {
  getReferralStatus,
  getReferralStatusTextBorderColor,
  getReferralStatusBgColor,
  getConsultationStatus,
  getConsultStatusTextBorderColor,
  getConsultStatusBgColor,
}

export default {
  getReferralStatus,
  getReferralStatusTextBorderColor,
  getReferralStatusBgColor,
  getConsultationStatus,
  getConsultStatusTextBorderColor,
  getConsultStatusBgColor,
}