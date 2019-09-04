<template>
  <div class="the-case" v-if="data">
    <div class="prescript">
      <div class="prescript-no">NO.{{data.case_no}}</div>
      <div class="prescript-head">{{data.hospitalName}}</div>
      <div class="prescript-h4">门(急)诊病历</div>
      <div class="prescript-table">
        <div class="th">
          姓名
          <div class="td">{{data.patientName}}</div>
        </div>
        <div class="th">
          性别
          <div class="td">{{data.patientSex}}</div>
        </div>
        <div class="th">
          年龄
          <div class="td">{{data.patientAge}}</div>
        </div>
        <div class="th">
          科别
          <div class="td">{{data.deptName}}</div>
        </div>
      </div>
    </div>
    <!--病历列表-->
    <div class>
      <div class="form-dl">
        <div class="form-dt">就诊时间</div>
        <div class="form-dd">{{data.createdTime || '无'}}</div>
      </div>
      <div class="form-dl">
        <div class="form-dt">主诉</div>
        <div class="form-dd">{{data.baseIllness || '无'}}</div>
      </div>
      <div class="form-dl">
        <div class="form-dt">现病史</div>
        <div class="form-dd">{{data.presentHistory || '无'}}</div>
      </div>
      <div class="form-dl">
        <div class="form-dt">过敏史</div>
        <div class="form-dd">{{data.allergyHistory || '无'}}</div>
      </div>
      <div class="form-dl">
        <div class="form-dt">既往史</div>
        <div class="form-dd">{{data.pastHistory || '无'}}</div>
      </div>
      <div
        class="form-dl"
        style="display: block;"
        v-if="data.inspectionIndex && data.inspectionIndex.temperature || data.inspectionIndex.weight || data.inspectionIndex.heart_rate || data.inspectionIndex.blood_pressure || data.inspectionIndex.More"
      >
        <div class="form-dt">
          检查指标
          <div class="form-code">
            <div class="namelist-dl bb" v-if="data.inspectionIndex.temperature">
              <div class="dt">体温：</div>
              <div class="dd">{{data.inspectionIndex.temperature ? data.inspectionIndex.temperature + '度' : '--'}}</div>
            </div>
            <div class="namelist-dl bb" v-if="data.inspectionIndex.weight">
              <div class="dt">体重：</div>
              <div class="dd">{{data.inspectionIndex.weight ? data.inspectionIndex.weight + 'kg' : '--'}}</div>
            </div>
            <div class="namelist-dl bb" v-if="data.inspectionIndex.heart_rate">
              <div class="dt">心率：</div>
              <div class="dd">{{data.inspectionIndex.heart_rate ? data.inspectionIndex.heart_rate + 'bpm' : '--'}}</div>
            </div>
            <div class="namelist-dl bb" v-if="data.inspectionIndex.blood_pressure">
              <div class="dt">血压：</div>
              <div class="dd">{{data.inspectionIndex.blood_pressure ? data.inspectionIndex.blood_pressure + 'mmHg' : '--'}}</div>
            </div>
            <div class="namelist-dl" style="flex-basis: 100%" v-if="data.inspectionIndex.More">
              <div class="dt" style="width:75px">辅助检查：</div>
              <div class="dd">{{data.inspectionIndex.More}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-dl">
        <div class="form-dt">诊断</div>
        <div class="form-dd">{{data.diagnose || '无'}}</div>
      </div>
      <div class="form-dl">
        <div class="form-dt">医嘱小结</div>
        <div class="form-dd">{{data.summary || '无'}}</div>
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
        return undefined
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.the-case {
  background-color: #f5f5f5;

  .prescript {
    background: #fff;
    padding: 5px 15px;
    margin-bottom: 10px;
  }

  .prescript .prescript-no,
  .prescript .prescript-line {
    color: #999;
    font-size: 11px;
  }
  .prescript .prescript-line {
    display: flex;
    justify-content: space-around;
  }
  .prescript-line .span {
    flex: 1 1 auto;
    width: 40%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .prescript .prescript-head {
    font-size: 15px;
    line-height: 1.5;
    margin-top: 10px;
    text-align: center;
  }
  .prescript .prescript-h4 {
    font-size: 22px;
    font-weight: 600;
    text-align: center;
    margin: 5px 0;
  }
  .prescript .prescript-table {
    border-top: 2px dotted #000;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    text-align: center;
    padding-top: 10px;
    margin-top: 10px;
  }
  .prescript-table .th {
    flex: 1;
    font-size: 13px;
    color: #999;
  }
  .prescript-table .td {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 15px;
    color: #000;
    padding: 3px;
  }
}
</style>

<style lang="scss" scoped>
.form-code {
  background: #f8f8f8;
  padding: 0 15px;
  margin-top: 10px;
  border-radius: 5px;
  box-sizing: border-box;

  display: flex;
  flex-wrap: wrap;
}
.namelist-dl.bb {
  border-bottom: 1px solid #ebebeb;
}
.namelist-dl {
  flex: 0 1 100%;
  font-size: 15px;
  padding: 10px 0;
  display: flex;
}
.namelist-dl .dt {
  flex: 0 0 auto;
  width: 50px;
  color: #000;
}
.namelist-dl .dd {
  flex: 1 1 auto;
  color: #666;
  width: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.form-dl {
  background-color: #fff;
  padding: 10px;
  display: flex;
  color: #000;
  font-size: 15px;
  border-bottom: 1px solid #f5f5f5;
}

.form-dl .form-dt {
  position: relative;
  flex: 0 0 auto;
  min-width: 100px;
}

.form-dt .red {
  display: inline;
  color: #fb2828;
}

.form-dl .form-dd {
  position: relative;
  flex: 1;
  color: #999;
  text-align: right;
}
.form-dl .form-dd.blue {
  color: #00c6ae;
}
.form-dd.value {
  color: #333;
}
.form-dd.icon-next {
  padding-right: 15px;
}

.form-dd.icon-next::before {
  content: '';
  position: absolute;
  display: inline-block;
  top: 4px;
  right: -7px;
  width: 15px;
  height: 15px;
  background-size: 7px;
  background-repeat: no-repeat;
}

.form-dd input,
input {
  color: #666;
}

.form-dd input.placeholder {
  color: #bebebe;
}
</style>
