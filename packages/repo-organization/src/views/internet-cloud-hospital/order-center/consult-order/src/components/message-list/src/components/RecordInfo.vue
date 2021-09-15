<template>
  <div class="record">
    <div class="record-no">No.{{ recordInfo.case_no }}</div>
    <div class="record-title">
      <span>{{ recordInfo.hospitalName || '互联网医院' }}</span>
      <br />
      <span>门(急)诊病历</span>
    </div>
    <div class="record-info">
      <div class="info-row two-cols">
        <div class="info-row-label">
          <span>姓名</span>
        </div>
        <div class="info-row-content">{{ recordInfo.patientName }}</div>
        <div class="info-row-label">
          <span>性别</span>
        </div>
        <div class="info-row-content">{{ recordInfo.patientSex }}</div>
      </div>
      <div class="info-row two-cols">
        <div class="info-row-label">
          <span>年龄</span>
        </div>
        <div class="info-row-content">{{ recordInfo.patientAge }}</div>
        <div class="info-row-label">
          <span>科别</span>
        </div>
        <div class="info-row-content">{{ recordInfo.deptName }}</div>
      </div>
    </div>
    <div class="record-info">
      <div class="info-row">
        <div class="info-row-label">
          <span>就诊时间</span>
        </div>
        <div class="info-row-content">{{ recordInfo.createdTime }}</div>
      </div>
      <div class="info-row">
        <div class="info-row-label">
          <span>主诉</span>
        </div>
        <div class="info-row-content">{{ recordInfo.baseIllness || '无' }}</div>
      </div>
      <div class="info-row">
        <div class="info-row-label">
          <span>现病史</span>
        </div>
        <div class="info-row-content">{{ recordInfo.presentHistory || '无' }}</div>
      </div>
      <div class="info-row">
        <div class="info-row-label">
          <span>过敏史</span>
        </div>
        <div class="info-row-content">{{ recordInfo.allergyHistory || '无' }}</div>
      </div>
      <div class="info-row">
        <div class="info-row-label">
          <span>既往史</span>
        </div>
        <div class="info-row-content">{{ recordInfo.pastHistory || '无' }}</div>
      </div>
      <div class="info-row"
           v-if="recordInfo.inspectionIndex &&
          (recordInfo.inspectionIndex.temperature ||
          recordInfo.inspectionIndex.weight ||
          recordInfo.inspectionIndex.heart_rate ||
          recordInfo.inspectionIndex.blood_pressure ||
          recordInfo.inspectionIndex.More)">
        <div class="info-row-label">
          <span>检查指标</span>
        </div>
        <!-- 值全部为空时，不显示体检指标 -->
        <div class="info-row-content spec-row">
          <div class="info-row"
               v-if="recordInfo.inspectionIndex.temperature">
            <div class="info-row-label">体温</div>
            <div class="info-row-content">{{ recordInfo.inspectionIndex.temperature }} 度</div>
          </div>
          <div class="info-row"
               v-if="recordInfo.inspectionIndex.weight">
            <div class="info-row-label">体重</div>
            <div class="info-row-content">{{ recordInfo.inspectionIndex.weight }} kg</div>
          </div>
          <div class="info-row"
               v-if="recordInfo.inspectionIndex.heart_rate">
            <div class="info-row-label">心率</div>
            <div class="info-row-content">{{ recordInfo.inspectionIndex.heart_rate }} bpm</div>
          </div>
          <div class="info-row"
               v-if="recordInfo.inspectionIndex.blood_pressure">
            <div class="info-row-label">血压</div>
            <div class="info-row-content">{{ recordInfo.inspectionIndex.blood_pressure }} mmHg</div>
          </div>
          <div class="info-row"
               v-if="recordInfo.inspectionIndex.More">
            <div class="info-row-label">辅助检查</div>
            <div class="info-row-content">{{ recordInfo.inspectionIndex.More }}</div>
          </div>
        </div>
      </div>
      <div class="info-row">
        <div class="info-row-label">
          <span>诊断</span>
        </div>
        <div class="info-row-content">
          <span :key="'diag_' + index"
                v-for="(diag, index) in recordInfo.diagnose">{{ diag }}</span>
        </div>
      </div>
      <div class="info-row">
        <div class="info-row-label">
          <span>医嘱小结</span>
        </div>
        <div class="info-row-content">
          <div v-html="recordInfo.summary"
               v-if="recordInfo.summary"></div>
          <div v-else>无</div>
        </div>
      </div>
      <div class="info-row"
           v-if="recordInfo.otherCheck && 
             (recordInfo.otherCheck.ALT ||
              recordInfo.otherCheck.AST ||
              recordInfo.otherCheck.HBV)
      ">
        <div class="info-row-label">
          <span>其他检查</span>
        </div>
        <div class="info-row-content spec-row">
          <div class="info-row"
               v-if="recordInfo.otherCheck.ALT">
            <div class="info-row-label">谷丙转氨酶(ALT)</div>
            <div class="info-row-content">{{ recordInfo.otherCheck.ALT }} IU/ml</div>
          </div>
          <div class="info-row"
               v-if="recordInfo.otherCheck.AST">
            <div class="info-row-label">谷草转氨酶(AST)</div>
            <div class="info-row-content">{{ recordInfo.otherCheck.AST }} IU/ml</div>
          </div>
          <div class="info-row"
               v-if="recordInfo.otherCheck.HBV">
            <div class="info-row-label">HBV-DNA</div>
            <div class="info-row-content">{{ recordInfo.otherCheck.HBV }} IU/ml</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RecordInfo',
  props: {
    recordInfo: {
      type: Object
    }
  }
}
</script>
<style lang="scss" scoped>
.record {
  position: relative;
  padding: 7px 0px;
  &-no {
    padding-left: 11px;
    font-size: 14px;
    line-height: 22px;
    color: #999;
  }
  &-title {
    margin-top: 2px;
    padding: 0 11px 35px 11px;
    font-size: 22px;
    line-height: 25px;
    font-weight: bold;
    text-align: center;
    color: #333;
  }
  &-info {
    padding: 0 11px 5px 11px;
    border-bottom: 1px dashed #bfbfbf;
    &:last-of-type {
      border-bottom: 0;
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
    }
  }
}

.info-row {
  font-size: 0;
  display: flex;
  &-label,
  &-content {
    font-size: 14px;
    line-height: 28px;
    display: inline-block;
    vertical-align: middle;
  }
  &-label {
    color: #778899;
    white-space: nowrap;
    & > span {
      width: 4.3em;
      text-align: right;
      text-align-last: justify;
      text-align: justify;
      text-justify: distribute-all-lines;
      display: inline-block;
    }
    &.t-6 > span {
      width: 6em;
    }
    &.t-6 + .info-row-content {
      width: calc(100% - 7em);
    }
    &.t-7 > span {
      width: 7em;
    }
    &.t-7 + .info-row-content {
      width: calc(100% - 8em);
    }
    &:after {
      content: '：';
    }
  }
  &-content {
    padding-left: 2px;
    width: calc(100% - 1em - 4.3em);
    font-weight: bold;
    word-break: break-all;
    color: #23313f;
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
      width: calc(50% - 1em - 4.3em);
    }
  }
}
</style>
