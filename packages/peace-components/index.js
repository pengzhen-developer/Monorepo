import { name, version } from './package.json'

import PeaceCaseDetail from './packages/case-detail/index.js'
import PeacePrescriptionDetail from './packages/prescription-detail/index.js'
import PeacePrescriptionDetailHIS from './packages/prescription-detail-his/index.js'
import PeacePrescriptionAuditResult from './packages/prescription-audit-result/index.js'
import PeaceBaseImportWorkflow from './packages/base-import-workflow/index.js'
import PeaceIMMessageHistory from './packages/im-message-history/index.js'
import PeaceOrderInquiryDetail from './packages/order-inquiry-detail/index.js'

const components = [
  PeaceCaseDetail,
  PeacePrescriptionDetail,
  PeacePrescriptionDetailHIS,
  PeacePrescriptionAuditResult,
  PeaceBaseImportWorkflow,
  PeaceIMMessageHistory,
  PeaceOrderInquiryDetail
]

const install = (Vue) => {
  components.forEach((component) => {
    Vue.component(component.name, component)
  })

  console.log(
    `%c ${name} %c ${version} %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 3px;  color: #fff',
    'background:transparent'
  )
}

export {
  PeaceCaseDetail,
  PeacePrescriptionDetail,
  PeacePrescriptionDetailHIS,
  PeacePrescriptionAuditResult,
  PeaceBaseImportWorkflow,
  PeaceIMMessageHistory,
  PeaceOrderInquiryDetail
}

export default {
  install,

  name,
  version
}
