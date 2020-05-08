/**
 * @param
 * flow,
 * roleId,
 * flag
 * */
import peace from '@src/library'
export function onClickAvatar(flow, roleId, flag) {
  if (flow == 'out') {
    gotoFamilyPage(roleId, flag)
  } else {
    gotoDoctorDetail(roleId)
  }
}
function gotoDoctorDetail(roleId) {
  const json = peace.util.encode({
    doctorId: roleId,
  })
  $peace.$router.push(`/components/DoctorDetail/${json}`)
}
function gotoFamilyPage(roleId, flag) {
  let familyId = roleId
  if (flag) {
    peace.cache.set('familyId', familyId)
    $peace.$router.push(`/file/index/`)
  } else {
    $peace.util.alert('该就诊人已从您的家人列表移除，不可查看其健康档案')
  }
}
export default {
  onClickAvatar,
}
