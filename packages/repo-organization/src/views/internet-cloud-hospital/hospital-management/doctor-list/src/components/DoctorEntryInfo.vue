<template>
  <div class="entry">
    <!-- 基础信息 -->
    <div class="entry-block"
         v-if="info.baseInfo">
      <div class="entry-title">基础信息</div>
      <div class="entry-two-col">
        <div class=" tow-col">
          <div class="entry-item-key">所学系、专业</div>
          <div class="entry-item-val">{{info.baseInfo.profession}}</div>
        </div>
        <div class="tow-col">
          <div class="entry-item-key"><span>学历</span>:</div>
          <div class="entry-item-val">{{info.baseInfo.eduBackground | getEnumLabel(source.ENUM_EDUCATION)}}</div>
        </div>
      </div>

      <div class="entry-item">
        <div class="entry-item-key">健康状况</div>
        <div class="entry-item-val">{{info.baseInfo.healthCondition}}</div>
      </div>
      <div class="entry-item">
        <div class="entry-item-key">家庭地址</div>
        <div class="entry-item-val">{{info.baseInfo.address}}</div>
      </div>
    </div>
    <!-- 业务水平考核经历 -->
    <div class="entry-block"
         v-if="info.checkInfo">
      <div class="entry-title">业务水平考核经历</div>
      <div v-for="(item,index) in info.checkInfo"
           :key="index">
        <div class="entry-item">
          <div class="entry-item-key">考核机构/组织名称</div>
          <div class="entry-item-val">{{item.checkInstitution}}</div>
        </div>
        <div class="entry-item">
          <div class="entry-item-key ">考核培训时间</div>
          <div class="entry-item-val">
            {{item.checkStartTime.split(' ')[0]}} - {{item.checkEndTime.split(' ')[0]}}</div>
        </div>
        <div class="entry-item">
          <div class="entry-item-key">考核结果</div>
          <div class="entry-item-val">{{item.checkResult}}</div>
        </div>
      </div>
    </div>

    <!-- 个人工作经历 -->
    <div class="entry-block"
         v-if="info.workInfo">
      <div class="entry-title nmb">个人工作经历</div>
      <div class="work-item"
           v-for="(item,index) in info.workInfo"
           :key="index">
        <div class="entry-subtitle">第{{index+1}}段工作经历</div>
        <div class="entry-item">
          <div class="entry-item-key">工作时间</div>
          <div class="entry-item-val">{{item.workStartTime.split(' ')[0]}} -
            {{item.workEndTime.split(' ')[0]}}</div>
        </div>
        <div class="entry-item">
          <div class="entry-item-key">工作单位</div>
          <div class="entry-item-val">{{item.workUnit}}</div>
        </div>
        <div class="entry-two-col">
          <div class=" tow-col">
            <div class="entry-item-key">技术职务</div>
            <div class="entry-item-val">{{item.workDuty}}</div>
          </div>
          <div class="tow-col">
            <div class="entry-item-key"><span>证明人</span>:</div>
            <div class="entry-item-val">{{item.workCertifier}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CONSTANT from '../constant'

export default {
  name: 'DoctorEntryInfo',
  props: {
    entryInfo: [String, Object]
  },
  data() {
    return {
      source: {
        ENUM_EDUCATION: CONSTANT.ENUM_EDUCATION
      },
      info: {}
    }
  },
  filters: {
    getEnumLabel: function(value, ENUM) {
      return ENUM.find((item) => item.value == value)?.label
    }
  },
  watch: {
    entryInfo: {
      handler() {
        if (typeof this.entryInfo == 'object') {
          this.info = Object.assign({}, this.entryInfo)
        }
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.entry {
  padding: 10px 15px;
  .entry-block {
    margin-bottom: 10px;
    padding-bottom: 10px;
    .entry-title {
      width: 100%;
      border-bottom: 1px solid #eee;
      line-height: 1.8;
      font-size: 16px;
      margin-bottom: 10px;
      &.nmb {
        margin-bottom: 0;
      }
    }
    .entry-subtitle {
      width: 100%;
      line-height: 18px;
      display: flex;
      align-items: center;
      &::before {
        content: '';
        display: block;
        width: 8px;
        height: 8px;
        background: var(--q-color-primary);
        border-radius: 4px;
        margin-right: 5px;
      }
    }
    .work-item {
      border-bottom: 1px dashed #eee;
      padding: 10px 0;
      &:last-child {
        border-bottom: 0;
      }
    }
    .entry-two-col {
      width: 100%;
      display: flex;
      align-items: center;
      .tow-col {
        display: flex;
        align-items: center;
        width: 60%;
        &:last-child {
          width: 40%;
          .entry-item-key {
            width: 4.7em;
            height: 16px;
            &::after {
              content: '';
            }
            span {
              display: inline-block;
              height: 16px;
              line-height: 16px;
              text-align: justify;
              text-align-last: justify;
              width: 4.2em;
              margin-right: 0.3em;
              &::after {
                height: 0;
                width: 100%;
                display: inline-block;
              }
            }
          }
        }
      }
    }
    .entry-item {
      width: 100%;
      display: flex;
      padding: 5px 0;
      justify-content: space-between;
      .entry-item-key {
        max-width: 30%;
      }
    }
  }
}
.entry-item-key {
  color: #778899;
  margin-right: 10px;
  &::after {
    content: ':';
    display: inline-block;
    margin-left: 3px;
  }
}
.entry-item-val {
  color: #23313f;
  font-weight: bold;
  flex: 1;
  word-break: break-all;
}
</style>
