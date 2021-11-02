import Vue from 'vue'

export declare class PeaceComponents extends Vue {
  static install(vue: typeof Vue): void
}

/**
 * @description: 基础 - 导入工作流
 */
export declare class PeaceBaseImportWorkflow extends PeaceComponents {}

/**
 * @description: 病历 - 详情
 */
export declare class PeaceCaseDetail extends PeaceComponents {}

/**
 * @description: 处方 - 详情
 */
export declare class PeacePrescriptionDetail extends PeaceComponents {}

/**
 * @description: 处方 - 详情 - 院内 HIS
 */
export declare class PeacePrescriptionDetailHIS extends PeaceComponents {}

/**
 * @description: 审方结果
 */
export declare class PeacePrescriptionAuditResult extends PeaceComponents {}

/**
 * @description: 消息记录
 */
export declare class PeaceIMMessageHistory extends PeaceComponents {}
