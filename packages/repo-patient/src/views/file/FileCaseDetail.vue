<template>
  <div class="file-case-detail">
    <van-cell-group v-if="data!=null&&data.caseNo">
      <van-cell title="病历号"
                :value="data.caseNo" />
      <van-cell title="就诊时间"
                :value="data.visitDate || '无'" />
      <van-cell title="主诉"
                :value="data.baseIllness || '无'" />
      <van-cell title="过敏史"
                :value="data.allergyHistory || '无'" />
      <van-cell title="既往史"
                :value="data.pastHistory || '无'" />
      <van-cell title="检查指标"
                v-if=" data.InspectionIndex&&!(data.InspectionIndex.temperature=='' && data.InspectionIndex.weight=='' && data.InspectionIndex.heart_rate =='' && data.InspectionIndex.blood_pressure=='') ">
        <div slot="label"
             class="file-case-detail-card">
          <div class="row">
            <div class="row-item">
              <span
                    class="color-000">体温：</span><span>{{ data.InspectionIndex && data.InspectionIndex.temperature && (data.InspectionIndex.temperature + '°') || '无' }}</span>
            </div>
            <div class="row-item">
              <span
                    class="color-000">体重：</span><span>{{ data.InspectionIndex && data.InspectionIndex.weight && (data.InspectionIndex.weight + 'kg') || '无'  }}</span>
            </div>
          </div>
          <div class="row">
            <div class="row-item">
              <span
                    class="color-000">心率：</span><span>{{ data.InspectionIndex && data.InspectionIndex.heart_rate && (data.InspectionIndex.heart_rate + 'bpm') || '无' }}</span>
            </div>
            <div class="row-item">
              <span
                    class="color-000">血压：</span><span>{{ data.InspectionIndex && data.InspectionIndex.blood_pressure && (data.InspectionIndex.blood_pressure + 'mmHg') || '无' }}</span>
            </div>
          </div>
        </div>
      </van-cell>
      <van-cell title="辅助检查"
                v-if="data.InspectionIndex.More"
                :value="data.InspectionIndex.More || '无'" />
      <van-cell title="诊断"
                :value="data.diagnose || '无'" />
      <van-cell title="医嘱小结"
                :value="data.summary || '无'" />
      <van-cell title="其它检查"
                v-if="!(data.ALT==''&&data.AST==''&&data.HBV=='')">
        <div slot="label"
             class="file-case-detail-card">
          <div class="row">
            <div>
              <span class="color-000">谷丙转氨酶(ALT)：</span>
            </div>
            <div>
              <span>{{ data.ALT && ( data.ALT + ' IU/ml') || '无' }}</span>
            </div>
          </div>
          <div class="row">
            <div>
              <span class="color-000">谷草转氨酶(AST)：</span>
            </div>
            <div>
              <span>{{ data.AST && ( data.AST + ' IU/ml') || '无' }}</span>
            </div>
          </div>
          <div class="row">
            <div>
              <span class="color-000">HBV-DNA：</span>
            </div>
            <div>
              <span>{{ data.HBV && ( data.HBV + ' IU/ml') || '无' }}</span>
            </div>
          </div>
        </div>
      </van-cell>
    </van-cell-group>
    <div class="none-page"
         v-else>
      <div class="icon ic_no_consultation t20"></div>
      <div class="none-text">暂无病历</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {}
  }
}
</script>

<style lang="scss" scoped>
.van-cell__title {
  flex: 1;
  font-size: 14px;
  font-weight: 400;
  color: #000000;
}

.van-cell__label,
.van-cell__value {
  flex: 2;
  font-size: 14px;
  font-weight: 400;
  color: #666666;
}

.file-case-detail {
  .file-case-detail-card {
    background: rgba(248, 248, 248, 1);
    border-radius: 8px;
    padding: 16px;

    .row {
      display: flex;
      justify-content: space-between;
      line-height: 30px;
      width: 100%;
      .row-item {
        width: 48%;
      }
    }
  }
}
.color-000 {
  color: #000;
}
</style>
