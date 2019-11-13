<template>
  <div class="the-case"
       v-if="internalData">
    <div class="prescript">
      <div class="prescript-no">NO.{{internalData.case_no}}</div>
      <div class="prescript-head">{{internalData.hospitalName}}</div>
      <div class="prescript-h4">门(急)诊病历</div>
      <div class="prescript-table">
        <div class="th">
          姓名
          <div class="td">{{internalData.patientName}}</div>
        </div>
        <div class="th">
          性别
          <div class="td">{{internalData.patientSex}}</div>
        </div>
        <div class="th">
          年龄
          <div class="td">{{internalData.patientAge}}</div>
        </div>
        <div class="th">
          科别
          <div class="td">{{internalData.deptName}}</div>
        </div>
      </div>
    </div>
    <!--病历列表-->
    <div class>
      <div class="form-dl">
        <div class="form-dt">就诊时间</div>
        <div class="form-dd">{{internalData.createdTime || '无'}}</div>
      </div>
      <div class="form-dl">
        <div class="form-dt">主诉</div>
        <div class="form-dd">{{internalData.baseIllness || '无'}}</div>
      </div>
      <div class="form-dl">
        <div class="form-dt">现病史</div>
        <div class="form-dd">{{internalData.presentHistory || '无'}}</div>
      </div>
      <div class="form-dl">
        <div class="form-dt">过敏史</div>
        <div class="form-dd">{{internalData.allergyHistory || '无'}}</div>
      </div>
      <div class="form-dl">
        <div class="form-dt">既往史</div>
        <div class="form-dd">{{internalData.pastHistory || '无'}}</div>
      </div>
      <div class="form-dl"
           style="display: block;"
           v-if="internalData.inspectionIndex &&
                 (internalData.inspectionIndex.temperature ||
                  internalData.inspectionIndex.weight ||
                  internalData.inspectionIndex.heart_rate ||
                  internalData.inspectionIndex.blood_pressure ||
                  internalData.inspectionIndex.More)">
        <div class="form-dt">
          检查指标
          <div class="form-code">
            <div class="namelist-dl bb between"
                 v-if="internalData.inspectionIndex.temperature">
              <div class="dt">体温：</div>
              <div class="dd">
                {{internalData.inspectionIndex.temperature ? internalData.inspectionIndex.temperature + '度' : '--'}}
              </div>
            </div>
            <div class="namelist-dl bb between"
                 v-if="internalData.inspectionIndex.weight">
              <div class="dt">体重：</div>
              <div class="dd">
                {{internalData.inspectionIndex.weight ? internalData.inspectionIndex.weight + 'kg' : '--'}}
              </div>
            </div>
            <div class="namelist-dl bb between"
                 v-if="internalData.inspectionIndex.heart_rate">
              <div class="dt">心率：</div>
              <div class="dd">
                {{internalData.inspectionIndex.heart_rate ? internalData.inspectionIndex.heart_rate + 'bpm' : '--'}}
              </div>
            </div>
            <div class="namelist-dl bb between"
                 v-if="internalData.inspectionIndex.blood_pressure">
              <div class="dt">血压：</div>
              <div class="dd">
                {{internalData.inspectionIndex.blood_pressure ? internalData.inspectionIndex.blood_pressure + 'mmHg' : '--'}}
              </div>
            </div>
            <div class="namelist-dl between"
                 style="flex-basis: 100%"
                 v-if="internalData.inspectionIndex.More">
              <div class="dt">辅助检查：</div>
              <div class="dd ">
                <div class="elip">
                  {{internalData.inspectionIndex.More}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-dl">
        <div class="form-dt">诊断</div>
        <div class="form-dd">{{internalData.diagnose || '无'}}</div>
      </div>
      <div class="form-dl">
        <div class="form-dt">医嘱小结</div>
        <div class="form-dd">{{internalData.summary || '无'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  props: {
    data: {
      type: Object,
      default() {
        return undefined
      }
    }
  },

  data() {
    return {
      internalData: undefined
    }
  },

  watch: {
    data: {
      handler() {
        this.internalData = this.data
      },
      immediate: true
    }
  },

  created() {
    if (!this.data) {
      this.get()
    }
  },

  methods: {
    get() {
      const params = peace.util.decode(this.$route.params.json)

      peace.service.patient.getCaseInfo(params).then(res => {
        this.internalData = res.data
      })
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
    border-top: 2px dotted #eeeeee;
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
.namelist-dl.between {
  justify-content: space-between;
}
.namelist-dl {
  flex: 0 1 100%;
  font-size: 15px;
  padding: 10px 0;
  display: flex;
}
.namelist-dl .dt {
  flex: 0 0 auto;
  width: 25%;
  color: #000;
}
.namelist-dl .dd {
  flex: 1 1 auto;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
  width: 0;
}
.namelist-dl .dd .elip {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
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
