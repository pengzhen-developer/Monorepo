// from db ddl

export const orgAllergy = [
  { COLUMN_NAME: 'id', COLUMN_COMMENT: '物理主键' },
  { COLUMN_NAME: 'code', COLUMN_COMMENT: '过敏编码' },
  { COLUMN_NAME: 'name', COLUMN_COMMENT: '过敏名称' },
  { COLUMN_NAME: 'institutionCode', COLUMN_COMMENT: '机构编码' },
  { COLUMN_NAME: 'applicationCode', COLUMN_COMMENT: '来源编码' },
  { COLUMN_NAME: 'status', COLUMN_COMMENT: '使用状态' },
  { COLUMN_NAME: 'createTime', COLUMN_COMMENT: '创建时间' },
  { COLUMN_NAME: 'updateTime', COLUMN_COMMENT: '更新时间' },
  { COLUMN_NAME: 'isDelete', COLUMN_COMMENT: '逻辑删除' }
]

export const orgDepartment = [
  { COLUMN_NAME: 'id', COLUMN_COMMENT: '物理主键' },
  { COLUMN_NAME: 'code', COLUMN_COMMENT: '科室编码' },
  { COLUMN_NAME: 'name', COLUMN_COMMENT: '科室名称' },
  { COLUMN_NAME: 'institutionCode', COLUMN_COMMENT: '机构编码' },
  { COLUMN_NAME: 'applicationCode', COLUMN_COMMENT: '来源编码' },
  { COLUMN_NAME: 'parentCode', COLUMN_COMMENT: '父级id' },
  { COLUMN_NAME: 'hisCode', COLUMN_COMMENT: 'his编码' },
  { COLUMN_NAME: 'status', COLUMN_COMMENT: '使用状态' },
  { COLUMN_NAME: 'property', COLUMN_COMMENT: '科室属性' },
  { COLUMN_NAME: 'createTime', COLUMN_COMMENT: '创建时间' },
  { COLUMN_NAME: 'updateTime', COLUMN_COMMENT: '更新时间' },
  { COLUMN_NAME: 'isDelete', COLUMN_COMMENT: '逻辑删除' }
]

export const orgDisease = [
  { COLUMN_NAME: 'id', COLUMN_COMMENT: '物理主键' },
  { COLUMN_NAME: 'code', COLUMN_COMMENT: '疾病编码' },
  { COLUMN_NAME: 'name', COLUMN_COMMENT: '疾病名称' },
  { COLUMN_NAME: 'institutionCode', COLUMN_COMMENT: '机构编码' },
  { COLUMN_NAME: 'applicationCode', COLUMN_COMMENT: '来源编码' },
  { COLUMN_NAME: 'status', COLUMN_COMMENT: '使用状态' },
  { COLUMN_NAME: 'createTime', COLUMN_COMMENT: '创建时间' },
  { COLUMN_NAME: 'updateTime', COLUMN_COMMENT: '更新时间' },
  { COLUMN_NAME: 'isDelete', COLUMN_COMMENT: '逻辑删除' }
]

export const orgFrequency = [
  { COLUMN_NAME: 'id', COLUMN_COMMENT: '物理主键' },
  { COLUMN_NAME: 'code', COLUMN_COMMENT: '给药频次编码' },
  { COLUMN_NAME: 'name', COLUMN_COMMENT: '给药频次名称' },
  { COLUMN_NAME: 'abbreviationEn', COLUMN_COMMENT: '给药频次缩写名' },
  { COLUMN_NAME: 'institutionCode', COLUMN_COMMENT: '机构code' },
  { COLUMN_NAME: 'applicationCode', COLUMN_COMMENT: '来源code' },
  { COLUMN_NAME: 'status', COLUMN_COMMENT: '使用状态' },
  { COLUMN_NAME: 'createTime', COLUMN_COMMENT: '创建时间' },
  { COLUMN_NAME: 'updateTime', COLUMN_COMMENT: '更新时间' },
  { COLUMN_NAME: 'isDelete', COLUMN_COMMENT: '逻辑删除' }
]

export const orgDrug = [
  { COLUMN_NAME: 'id', COLUMN_COMMENT: '物理主键' },
  { COLUMN_NAME: 'code', COLUMN_COMMENT: '药品编码' },
  { COLUMN_NAME: 'name', COLUMN_COMMENT: '通用名' },
  { COLUMN_NAME: 'institutionCode', COLUMN_COMMENT: '机构编码' },
  { COLUMN_NAME: 'applicationCode', COLUMN_COMMENT: '来源编码' },
  { COLUMN_NAME: 'productName', COLUMN_COMMENT: '商品名' },
  { COLUMN_NAME: 'drugSpecifications', COLUMN_COMMENT: '药品规格' },
  { COLUMN_NAME: 'minUnit', COLUMN_COMMENT: '最小单位' },
  { COLUMN_NAME: 'price', COLUMN_COMMENT: '药品价格' },
  { COLUMN_NAME: 'baseDose', COLUMN_COMMENT: '基本剂量' },
  { COLUMN_NAME: 'doseUnit', COLUMN_COMMENT: '剂量单位' },
  { COLUMN_NAME: 'drugCscCode', COLUMN_COMMENT: '本位码' },
  { COLUMN_NAME: 'drugDosageForm', COLUMN_COMMENT: '剂型' },
  { COLUMN_NAME: 'enterpriseCnName', COLUMN_COMMENT: '生产厂家' },
  { COLUMN_NAME: 'approvalNo', COLUMN_COMMENT: '批准文号' },
  { COLUMN_NAME: 'status', COLUMN_COMMENT: '使用状态' },
  { COLUMN_NAME: 'drugSourceName', COLUMN_COMMENT: '药品来源' },
  { COLUMN_NAME: 'medicalInsuranceCatalogue', COLUMN_COMMENT: '医保目录' },
  { COLUMN_NAME: 'medicalInsuranceCode', COLUMN_COMMENT: '药品医保编码' },
  { COLUMN_NAME: 'packageUnit', COLUMN_COMMENT: '包装单位' },
  { COLUMN_NAME: 'packageNum', COLUMN_COMMENT: '包装数量' },
  { COLUMN_NAME: 'recommendRouteCode', COLUMN_COMMENT: '推荐给药途径' },
  { COLUMN_NAME: 'recommendFrequencyCode', COLUMN_COMMENT: '推荐给药频次' },
  { COLUMN_NAME: 'recommendSingleDoseUnit', COLUMN_COMMENT: '推荐单次用量单位' },
  { COLUMN_NAME: 'recommendSingleDose', COLUMN_COMMENT: '推荐单次用量数值' },
  { COLUMN_NAME: 'storageConditions', COLUMN_COMMENT: '储存条件' },
  { COLUMN_NAME: 'isApart', COLUMN_COMMENT: '是否可拆零' },
  { COLUMN_NAME: 'mnemonics', COLUMN_COMMENT: '助记码' },
  { COLUMN_NAME: 'productTypeValue', COLUMN_COMMENT: '商品类型' },
  { COLUMN_NAME: 'drugTypeValue', COLUMN_COMMENT: '药品类型' },
  { COLUMN_NAME: 'prescriptionTypeValue', COLUMN_COMMENT: '处方药属性' },
  { COLUMN_NAME: 'createTime', COLUMN_COMMENT: '创建时间' },
  { COLUMN_NAME: 'updateTime', COLUMN_COMMENT: '更新时间' },
  { COLUMN_NAME: 'isDelete', COLUMN_COMMENT: '逻辑删除' }
]

export const orgIcd = [
  { COLUMN_NAME: 'id', COLUMN_COMMENT: '物理主键' },
  { COLUMN_NAME: 'code', COLUMN_COMMENT: '逻辑主键' },
  { COLUMN_NAME: 'institutionCode', COLUMN_COMMENT: '机构code' },
  { COLUMN_NAME: 'applicationCode', COLUMN_COMMENT: '来源code' },
  { COLUMN_NAME: 'icdVersionCode', COLUMN_COMMENT: '机构版本code' },
  { COLUMN_NAME: 'icdVersionCodeName', COLUMN_COMMENT: '机构版本' },
  { COLUMN_NAME: 'createTime', COLUMN_COMMENT: '创建时间' },
  { COLUMN_NAME: 'updateTime', COLUMN_COMMENT: '更新时间' },
  { COLUMN_NAME: 'isDelete', COLUMN_COMMENT: '逻辑删除' }
]

export const orgIcdDisease = [
  { COLUMN_NAME: 'id', COLUMN_COMMENT: '物理主键' },
  { COLUMN_NAME: 'code', COLUMN_COMMENT: '主要编码' },
  { COLUMN_NAME: 'institutionCode', COLUMN_COMMENT: '机构code' },
  { COLUMN_NAME: 'applicationCode', COLUMN_COMMENT: '来源code' },
  { COLUMN_NAME: 'extCode', COLUMN_COMMENT: '附加编码' },
  { COLUMN_NAME: 'orgIcdCode', COLUMN_COMMENT: '机构icd版本编码' },
  { COLUMN_NAME: 'diseaseName', COLUMN_COMMENT: '疾病名称' },
  { COLUMN_NAME: 'status', COLUMN_COMMENT: '使用状态' },
  { COLUMN_NAME: 'createTime', COLUMN_COMMENT: '创建时间' },
  { COLUMN_NAME: 'updateTime', COLUMN_COMMENT: '更新时间' },
  { COLUMN_NAME: 'isDelete', COLUMN_COMMENT: '逻辑删除' }
]

export const orgPeopleClassification = [
  { COLUMN_NAME: 'id', COLUMN_COMMENT: '物理主键' },
  { COLUMN_NAME: 'code', COLUMN_COMMENT: '逻辑主键' },
  { COLUMN_NAME: 'name', COLUMN_COMMENT: '人群分类' },
  { COLUMN_NAME: 'institutionCode', COLUMN_COMMENT: '机构编码' },
  { COLUMN_NAME: 'applicationCode', COLUMN_COMMENT: '来源编码' },
  { COLUMN_NAME: 'status', COLUMN_COMMENT: '使用状态' },
  { COLUMN_NAME: 'createTime', COLUMN_COMMENT: '创建时间' },
  { COLUMN_NAME: 'updateTime', COLUMN_COMMENT: '更新时间' },
  { COLUMN_NAME: 'isDelete', COLUMN_COMMENT: '逻辑删除' }
]

export const orgRoute = [
  { COLUMN_NAME: 'id', COLUMN_COMMENT: '物理主键' },
  { COLUMN_NAME: 'code', COLUMN_COMMENT: '给药途径编码' },
  { COLUMN_NAME: 'name', COLUMN_COMMENT: '给药途径名称' },
  { COLUMN_NAME: 'institutionCode', COLUMN_COMMENT: '机构编码' },
  { COLUMN_NAME: 'applicationCode', COLUMN_COMMENT: '来源编码' },
  { COLUMN_NAME: 'abbreviationEn', COLUMN_COMMENT: '给药途径缩写名' },
  { COLUMN_NAME: 'status', COLUMN_COMMENT: '使用状态' },
  { COLUMN_NAME: 'createTime', COLUMN_COMMENT: '创建时间' },
  { COLUMN_NAME: 'updateTime', COLUMN_COMMENT: '更新时间' },
  { COLUMN_NAME: 'isDelete', COLUMN_COMMENT: '逻辑删除' }
]

export const plaDepartment = [
  { COLUMN_NAME: 'id', COLUMN_COMMENT: '物理主键' },
  { COLUMN_NAME: 'code', COLUMN_COMMENT: '逻辑主键' },
  { COLUMN_NAME: 'name', COLUMN_COMMENT: '给药途径' },
  { COLUMN_NAME: 'institutionCode', COLUMN_COMMENT: '机构编码' },
  { COLUMN_NAME: 'applicationCode', COLUMN_COMMENT: '来源编码' },
  { COLUMN_NAME: 'abbreviationEn', COLUMN_COMMENT: '给药途径英文缩写' },
  { COLUMN_NAME: 'status', COLUMN_COMMENT: '使用状态' },
  { COLUMN_NAME: 'createTime', COLUMN_COMMENT: '创建时间' },
  { COLUMN_NAME: 'updateTime', COLUMN_COMMENT: '更新时间' },
  { COLUMN_NAME: 'isDelete', COLUMN_COMMENT: '逻辑删除' }
]

export const plaDisease = [
  { COLUMN_NAME: 'id', COLUMN_COMMENT: '物理主键' },
  { COLUMN_NAME: 'code', COLUMN_COMMENT: '逻辑编码' },
  { COLUMN_NAME: 'name', COLUMN_COMMENT: '疾病名称' },
  { COLUMN_NAME: 'createTime', COLUMN_COMMENT: '创建时间' },
  { COLUMN_NAME: 'updateTime', COLUMN_COMMENT: '更新时间' },
  { COLUMN_NAME: 'isDelete', COLUMN_COMMENT: '逻辑删除' }
]

export const plaFrequency = [
  { COLUMN_NAME: 'id', COLUMN_COMMENT: '物理主键' },
  { COLUMN_NAME: 'code', COLUMN_COMMENT: '逻辑编码' },
  { COLUMN_NAME: 'name', COLUMN_COMMENT: '给药频次名称' },
  { COLUMN_NAME: 'abbreviationEn', COLUMN_COMMENT: '给药频次英文缩写' },
  { COLUMN_NAME: 'frequency', COLUMN_COMMENT: '给药频次' },
  { COLUMN_NAME: 'interval', COLUMN_COMMENT: '给药间隔' },
  { COLUMN_NAME: 'createTime', COLUMN_COMMENT: '创建时间' },
  { COLUMN_NAME: 'updateTime', COLUMN_COMMENT: '更新时间' },
  { COLUMN_NAME: 'isDelete', COLUMN_COMMENT: '逻辑删除' }
]

export const plaIcd = [
  { COLUMN_NAME: 'id', COLUMN_COMMENT: '物理主键' },
  { COLUMN_NAME: 'code', COLUMN_COMMENT: '逻辑编码' },
  { COLUMN_NAME: 'icdVersion', COLUMN_COMMENT: 'icd 版本号' },
  { COLUMN_NAME: 'icdName', COLUMN_COMMENT: 'icd 版本名称' },
  { COLUMN_NAME: 'createTime', COLUMN_COMMENT: '创建时间' },
  { COLUMN_NAME: 'updateTime', COLUMN_COMMENT: '更新时间' },
  { COLUMN_NAME: 'isDelete', COLUMN_COMMENT: '逻辑删除' }
]

export const plaIcdDisease = [
  { COLUMN_NAME: 'id', COLUMN_COMMENT: '物理主键' },
  { COLUMN_NAME: 'code', COLUMN_COMMENT: '逻辑主键' },
  { COLUMN_NAME: 'icdCode', COLUMN_COMMENT: 'icd 版本code' },
  { COLUMN_NAME: 'mainCode', COLUMN_COMMENT: '主要编码' },
  { COLUMN_NAME: 'extMainCode', COLUMN_COMMENT: '附加编码' },
  { COLUMN_NAME: 'icdName', COLUMN_COMMENT: 'ICD疾病名称' },
  { COLUMN_NAME: 'level', COLUMN_COMMENT: '级别' },
  { COLUMN_NAME: 'createTime', COLUMN_COMMENT: '创建时间' },
  { COLUMN_NAME: 'updateTime', COLUMN_COMMENT: '更新时间' },
  { COLUMN_NAME: 'isDelete', COLUMN_COMMENT: '逻辑删除' }
]

export const plaRoute = [
  { COLUMN_NAME: 'id', COLUMN_COMMENT: '物理主键' },
  { COLUMN_NAME: 'code', COLUMN_COMMENT: '逻辑主键' },
  { COLUMN_NAME: 'name', COLUMN_COMMENT: '给药途径' },
  { COLUMN_NAME: 'abbreviationEn', COLUMN_COMMENT: '给药途径英文缩写' },
  { COLUMN_NAME: 'remark', COLUMN_COMMENT: '备注' },
  { COLUMN_NAME: 'isBlood', COLUMN_COMMENT: '是否入血' },
  { COLUMN_NAME: 'createTime', COLUMN_COMMENT: '创建时间' },
  { COLUMN_NAME: 'updateTime', COLUMN_COMMENT: '更新时间' },
  { COLUMN_NAME: 'isDelete', COLUMN_COMMENT: '逻辑删除' }
]

export default {
  orgAllergy,
  orgDepartment,
  orgDisease,
  orgFrequency,
  orgDrug,
  orgIcd,
  orgIcdDisease,
  orgPeopleClassification,
  orgRoute,
  plaDepartment,
  plaDisease,
  plaFrequency,
  plaIcd,
  plaIcdDisease,
  plaRoute
}
