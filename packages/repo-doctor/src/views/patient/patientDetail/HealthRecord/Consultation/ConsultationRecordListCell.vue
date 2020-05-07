<template>
  <div>
    <div class="list-item" @click="showDetail">
      <div class="time-line-header">
        <span class="time-line-time">{{ item.createdTime }}</span>
        <span
          class="tag"
          v-bind:style="{
            color: borderColor,
            'background-color': bgColor,
            'border-color': borderColor
          }"
          >{{ item.consultStatus | getConsultationStatus }}</span
        >
      </div>
      <div class="item-content">
        <div class="info-row">
          <div class="info-row-label">
            {{ type === 'out' ? '会诊医生' : '申请医生' }}
          </div>
          <div class="info-row-content">
            <b>{{ item.doctorName + ' ' + item.doctorTitle }}</b> <br />
            {{ item.hospitalName + ' ' + item.deptName }}
          </div>
        </div>
        <div class="info-row">
          <div class="info-row-label">初步诊断</div>
          <div class="info-row-content">{{ item.disagnose || ' ' }}</div>
        </div>
        <div class="info-row">
          <div class="info-row-label">会诊说明</div>
          <div class="info-row-content">{{ item.consultExplain || ' ' }}</div>
        </div>
        <div class="info-row">
          <div class="info-row-label">期望会诊时间</div>
          <div class="info-row-content">{{ item.expectTime || ' ' }}</div>
        </div>
      </div>
    </div>
    <peace-dialog
      :append-to-body="true"
      :visible.sync="dialog.visible"
      custom-class="dialog"
      title="会诊详情"
    >
      <TheConsultationDetail
        :data="dialog.data"
        :type="type"
        @close="() => (dialog.visible = false)"
      ></TheConsultationDetail>
    </peace-dialog>
  </div>
</template>

<script>
import peace from '@src/library'
import TheConsultationDetail from '@src/views/record/consultation/TheConsultationDetail'
import {
  getConsultationStatus,
  getConsultStatusTextBorderColor,
  getConsultStatusBgColor
} from '@src/views/filters/index'
export default {
  props: {
    item: undefined,
    type: String
  },
  components: {
    TheConsultationDetail
  },
  data() {
    return {
      dialog: {
        visible: false,
        data: {}
      }
    }
  },
  filters: { getConsultationStatus },
  computed: {
    borderColor() {
      return getConsultStatusTextBorderColor(this.item.consultStatus)
    },

    bgColor() {
      return getConsultStatusBgColor(this.item.consultStatus)
    }
  },
  methods: {
    showDetail() {
      this.dialog.data = undefined
      this.dialog.visible = true
      const params = {
        consultNo: this.item.consultNo
      }
      peace.service.consult.getConsultInfo(params).then(res => {
        this.dialog.data = res.data.info
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-item {
  margin-bottom: 16px;

  .time-line-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 10px 0;

    .time-line-time {
      color: rgba(153, 153, 153, 1);
      vertical-align: middle;
      line-height: 15px;
      &:before {
        display: inline-block;
        content: '';
        width: 5px;
        height: 5px;
        background: #00c6ae;
        border-radius: 50%;
        margin: 0 8px 0 0;
        vertical-align: middle;
      }
    }

    .tag {
      width: auto;
      height: 20px;
      padding: 0 8px;
      border-radius: 50px;
      font-size: 12px;
      font-weight: 400;
      border: 1px solid;
    }
  }

  .item-content {
    padding: 15px 15px 9px 15px;
    background: rgba(249, 249, 249, 1);
    border-radius: 4px;

    .info-row {
      margin-bottom: 6px;
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
        width: 99px;
        color: #666666;
        &:after {
          content: '：';
        }
      }
      &-content {
        flex: 1;
        color: #333333;
      }
    }
  }
}
</style>
