export function CheckOptionHospitalList(params) {
  const isMock = false

  const apiPath = 'webapi/api/PrescriptionsTeam/CheckOptionHospitalList'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

export function GetByClientIDAndType10(params) {
  const isMock = false

  const apiPath = 'psd/Prescription/GetByClientIDAndType10'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.get(requestApi, { params })
}

export function CheckHospitalList(params) {
  const isMock = false

  const apiPath = 'webapi/api/PrescriptionsTeam/CheckHospitalList'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

export function GetPharmacistByCusts(params, cancelToken) {
  const isMock = false

  const apiPath = 'webapi/api/User/GetPharmacistByCusts'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.get(requestApi, { params, cancelToken })
}

export function getDrugList(params) {
  const isMock = false

  const apiPath = 'nethospital/operate/drug/getDrugList'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.get(requestApi, { params })
}

export function Saverescriptionsteam(params) {
  const isMock = false

  const apiPath = 'psd/Prescription/Saverescriptionsteam'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

export function Deletescriptionsteam(params) {
  const isMock = false

  const apiPath = 'psd/Prescription/Deletescriptionsteam'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.get(requestApi, { params })
}

export function Sortscriptionsteam(params) {
  const isMock = false

  const apiPath = 'psd/Prescription/Sortscriptionsteam'
  const mockPath = process.env.VUE_APP_API_MOCK + apiPath
  const serverPath = process.env.VUE_APP_API_BASE + apiPath

  const requestApi = isMock ? mockPath : serverPath

  return Peace.http.post(requestApi, params)
}

export default {
  CheckOptionHospitalList,
  GetByClientIDAndType10,
  CheckHospitalList,
  GetPharmacistByCusts,
  getDrugList,
  Saverescriptionsteam,
  Deletescriptionsteam,
  Sortscriptionsteam
}
