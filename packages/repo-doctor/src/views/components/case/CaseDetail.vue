<template>
  <div class="record">
    <div class="record-no">No.{{ internalData.case_no }}</div>
    <div class="record-title">
      <span>{{ internalData.netHospital_name }}</span>
      <br />
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
        <div class="info-row-content">{{ internalData.age }}</div>
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
        <div class="info-row-content">{{ internalData.visit_date }}</div>
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
          <span>过敏史</span>
        </div>
        <div class="info-row-content">
          <div>{{ internalData.allergy_history || '无' }}</div>
        </div>
      </div>
      <div class="info-row">
        <div class="info-row-label">
          <span>既往史</span>
        </div>
        <div class="info-row-content">{{ internalData.past_history || '无' }}</div>
      </div>
      <div class="info-row"
           v-if="internalData.Inspection_index && 
             (internalData.Inspection_index.temperature ||
              internalData.Inspection_index.weight ||
              internalData.Inspection_index.heart_rate ||
              internalData.Inspection_index.blood_pressure ||
              internalData.Inspection_index.More)">
        <div class="info-row-label">
          <span>检查指标</span>
        </div>
        <div class="info-row-content spec-row">
          <div class="info-row"
               v-if="internalData.Inspection_index.temperature">
            <div class="info-row-label">体温</div>
            <div class="info-row-content">{{ internalData.Inspection_index.temperature }} 度</div>
          </div>
          <div class="info-row"
               v-if="internalData.Inspection_index.weight">
            <div class="info-row-label">体重</div>
            <div class="info-row-content">{{ internalData.Inspection_index.weight }} kg</div>
          </div>
          <div class="info-row"
               v-if="internalData.Inspection_index.heart_rate">
            <div class="info-row-label">心率</div>
            <div class="info-row-content">{{ internalData.Inspection_index.heart_rate }} bpm</div>
          </div>
          <div class="info-row"
               v-if="internalData.Inspection_index.blood_pressure">
            <div class="info-row-label">血压</div>
            <div class="info-row-content">{{ internalData.Inspection_index.blood_pressure }} mmHg
            </div>
          </div>
          <div class="info-row"
               v-if="internalData.Inspection_index.More">
            <div class="info-row-label">辅助检查</div>
            <div class="info-row-content">{{ internalData.Inspection_index.More }}</div>
          </div>
        </div>
      </div>
      <div class="info-row">
        <div class="info-row-label">
          <span>疾病诊断</span>
        </div>
        <div class="info-row-content">
          <template v-if="internalData.diagnoseList">
            <el-tag :key="item"
                    class="q-mr-6 q-mb-4"
                    type="info"
                    v-for="item in internalData.diagnose.split('|')">{{item}}</el-tag>
            <!-- v-for="item in internalData.diagnoseList">{{item.diagnoseName}}</el-tag> -->
          </template>
          <template v-else>
            <span>无</span>
          </template>
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
      <div class="info-row"
           v-if="internalData.otherCheck && 
             (internalData.otherCheck.ALT ||
              internalData.otherCheck.AST ||
              internalData.otherCheck.HBV)">
        <div class="info-row-label">
          <span>其他检查</span>
        </div>
        <div class="info-row-content spec-row">
          <div class="info-row"
               v-if="internalData.otherCheck.ALT">
            <div class="info-row-label">谷丙转氨酶(ALT)</div>
            <div class="info-row-content">{{ internalData.otherCheck.ALT }} IU/ml</div>
          </div>
          <div class="info-row"
               v-if="internalData.otherCheck.AST">
            <div class="info-row-label">谷草转氨酶(AST)</div>
            <div class="info-row-content">{{ internalData.otherCheck.AST }} IU/ml</div>
          </div>
          <div class="info-row"
               v-if="internalData.otherCheck.HBV">
            <div class="info-row-label">HBV-DNA</div>
            <div class="info-row-content">{{ internalData.otherCheck.HBV }} IU/ml</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
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
      const temp = Peace.util.deepClone(this.data)

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
  margin-top: 8px;
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
      border-bottom: 0;
    }
    &-content {
      font-size: 12px;
      width: 200px !important;
    }
  }
}

.record {
  position: relative;
  padding: 7px 20px;
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
    &:last-of-type {
      border-bottom: 0;
    }
  }
}
</style>
