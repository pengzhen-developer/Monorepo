<template>
  <div class="record">
    <div class="record-no">No.{{ internalData.case_no }}</div>
    <div class="record-title">
      <span>{{ internalData.netHospital_name }}</span>
      <br>
      <span>门(急)诊病历</span>
    </div>
    <div class="record-info">
      <div class="info-row two-cols">
        <div class="info-row-label">
          <span>姓名</span>
        </div>
        <div class="info-row-content">{{ internalData.patient_name }}</div>
        <div class="info-row-label">
          <span>性别</span>
        </div>
        <div class="info-row-content">{{ internalData.sex }}</div>
      </div>
      <div class="info-row two-cols">
        <div class="info-row-label">
          <span>年龄</span>
        </div>
        <div class="info-row-content">{{ internalData.age }}岁</div>
        <div class="info-row-label">
          <span>科别</span>
        </div>
        <div class="info-row-content">{{ internalData.netdept_child }}</div>
      </div>
    </div>
    <div class="record-info">
      <div class="info-row">
        <div class="info-row-label">
          <span>就诊时间</span>
        </div>
        <div class="info-row-content">{{ internalData.created_time }}</div>
      </div>
      <div class="info-row">
        <div class="info-row-label">
          <span>主诉</span>
        </div>
        <div class="info-row-content">{{ internalData.base_illness }}</div>
      </div>
      <div class="info-row">
        <div class="info-row-label">
          <span>现病史</span>
        </div>
        <div class="info-row-content">{{ internalData.present_history || '无' }}</div>
      </div>
      <div class="info-row">
        <div class="info-row-label">
          <span>既往史</span>
        </div>
        <div class="info-row-content">{{ internalData.past_history || '无' }}</div>
      </div>
      <div class="info-row">
        <div class="info-row-label">
          <span>过敏史</span>
        </div>
        <div class="info-row-content">{{ internalData.allergy_history || '无' }}</div>
      </div>
      <div
        class="info-row"
        v-if="internalData.Inspection_index && 
                internalData.Inspection_index.temperature && 
                internalData.Inspection_index.weight && 
                internalData.Inspection_index.heart_rate && 
                internalData.Inspection_index.blood_pressure"
      >
        <div class="info-row-label">
          <span>体检指标</span>
        </div>
        <div class="info-row-content spec-row">
          <div class="info-row two-cols">
            <div class="info-row-label">体温</div>
            <div class="info-row-content">{{ internalData.Inspection_index.temperature || '- ' }} 度</div>
            <div class="info-row-label">体重</div>
            <div class="info-row-content">{{ internalData.Inspection_index.weight || '- ' }} kg</div>
          </div>
          <div class="info-row two-cols">
            <div class="info-row-label">心率</div>
            <div class="info-row-content">{{ internalData.Inspection_index.heart_rate || '- ' }} bpm</div>
            <div class="info-row-label">血压</div>
            <div class="info-row-content">{{ internalData.Inspection_index.blood_pressure || '- ' }} mmHg</div>
          </div>
        </div>
      </div>
      <div class="info-row">
        <div class="info-row-label">
          <span>辅助检查</span>
        </div>
        <div class="info-row-content">{{ internalData.Inspection_index && internalData.Inspection_index.More || '无' }}</div>
      </div>
      <div class="info-row">
        <div class="info-row-label">
          <span>诊断</span>
        </div>
        <div class="info-row-content">
          <span :key="'diag_' + index" v-for="(diag, index) in data.diagnose">{{ diag || '无' }}</span>
        </div>
      </div>
      <div class="info-row">
        <div class="info-row-label">
          <span>医嘱小结</span>
        </div>
        <div class="info-row-content">
          <div v-html="data.summary  || '无' "></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'record-info',

  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  computed: {
    internalData() {
      const temp = $peace.util.clone(this.data)

      if (temp.Inspection_index) {
        temp.Inspection_index = JSON.parse(temp.Inspection_index)
      }

      return temp
    }
  }
}
</script>

<style lang="scss" scoped>
.small-text {
  font-size: 12px;
}

.info-row {
  margin-top: 4px;
  font-size: 0;
  display: flex;
  &-label,
  &-content {
    font-size: 14px;
    line-height: 20px;
    display: inline-block;
    vertical-align: middle;
  }
  &-label {
    & > span {
      width: 4em;
      display: inline-block;
      text-align-last: justify;
      text-align: justify;
      text-justify: distribute-all-lines;
    }
    &.t-6 > span {
      width: 6em;
    }
    &.t-6 + .info-row-content {
      width: calc(100% - 7em);
    }
    &:after {
      content: '：';
    }
  }
  &-content {
    padding-left: 2px;
    width: calc(100% - 5em);
    font-weight: bold;
    word-break: break-all;
    & > img {
      height: 20px;
      display: block;
    }
  }
  &.two-cols {
    .info-row-label.t-6 + .info-row-content {
      width: calc(50% - 7em);
    }
    .info-row-content {
      width: calc(50% - 5em);
    }
  }
}

.spec-row {
  padding: 10px 20px;
  border-radius: 4px;
  background-color: #f8f8f8;
  .info-row {
    font-size: 0;
    border-bottom: 1px solid #e5e5e5;
    &:last-of-type {
      padding-top: 10px;
      border-bottom: 0;
    }
    &-content {
      font-size: 12px;
    }
  }
}

.record {
  position: relative;
  padding: 7px 30px;
  &-no {
    padding-left: 11px;
    font-size: 14px;
    line-height: 22px;
  }
  &-title {
    margin-top: 2px;
    padding: 0 11px 35px 11px;
    font-size: 22px;
    line-height: 25px;
    font-weight: bold;
    text-align: center;
  }
  &-info {
    padding: 0 11px 5px 11px;
    border-bottom: 1px dashed #bfbfbf;
  }
}
</style>
