<template>
  <div class="page"
       v-if="data.length>0">
    <div class="tip"
         v-if="data.length > 1">
      <div class="tip-left">
        <van-icon :name="require('@src/assets/images/ic_tixing.png')"
                  style="margin: 0 5px 0 0;">
        </van-icon>
        <span>
          共{{ data.length }}张， 当前为第{{ current + 1 }}张（{{
              current + 1
            }}
          / {{ data.length }}）</span>
      </div>
      <div class="tip-right"
           @click="next">
        <span>下一张</span>
        <van-icon :name="require('@src/assets/images/ic_arrow.png')"
                  style="margin: 0 0 0 5px;">
        </van-icon>
      </div>
    </div>
    <div class="prescript icon-status"
         :class="'icon-status-referr-'+data[current].familyInfo.transferStatus">
      <div class="prescript-no">No.{{data[current].reReferralOut.referralNo}}</div>
      <div class="prescript-head">{{data[current].reReferralOut.doctorInfo.hospitalName}}</div>
      <div class="prescript-h4">转诊单</div>
      <div class="prescript-table dotted-line-before">
        <div class="th">姓名
          <div class="td">{{data[current].familyInfo.name}}</div>
        </div>
        <div class="th">性别
          <div class="td">{{data[current].familyInfo.sex}}</div>
        </div>
        <div class="th">年龄
          <div class="td">{{data[current].familyInfo.age}}</div>
        </div>
      </div>
    </div>
    <!--就诊信息-->
    <div class="outline">
      <div class="outline-header">
        <div class="outline-tit">就诊信息</div>
      </div>
      <div class="outline-body">
        <div class="card">
          <div class="card-avatar avatar-circular">
            <img class=""
                 :src="data[current].reReferralOut.doctorInfo.avartor" />>
          </div>
          <div class="card-body">
            <div class="card-name">
              {{data[current].reReferralOut.doctorInfo.name}}
              {{data[current].reReferralOut.doctorInfo.doctorTitle}}
            </div>
            <div class="card-small">
              {{data[current].reReferralOut.doctorInfo.hospitalName}}
              {{data[current].reReferralOut.doctorInfo.deptName}}
            </div>
          </div>
        </div>
        <div class="code">
          <div class="inline">
            就诊时间：
            <div class="b">{{data[current].reReferralOut.createdTime}}</div>
          </div>
          <div class="inline">
            初步诊断：
            <div class="b">{{data[current].reReferralOut.diagnose}}</div>
          </div>
          <div class="inline">
            转诊原因：
            <div class="b">{{data[current].reReferralOut.referralCause}}</div>
          </div>
          <div class="inline">
            期望转诊时间：
            <div class="b">{{data[current].reReferralOut.expectTime}}</div>
          </div>
        </div>
      </div>
    </div>
    <!--转诊信息-->
    <div class="outline">
      <div class="outline-header">
        <div class="outline-tit">转诊信息</div>
      </div>
      <div class="outline-body">
        <div class="card">
          <div class="card-avatar avatar-circular">
            <img class=""
                 :src="data[current].reReferralIn.doctorInfo.avartor" />
          </div>
          <div class="card-body">
            <div class="card-name">
              {{data[current].reReferralIn.doctorInfo.name}}
              {{data[current].reReferralIn.doctorInfo.doctorTitle}}
            </div>
            <div class="card-small">
              {{data[current].reReferralIn.doctorInfo.hospitalName}}
              {{data[current].reReferralIn.doctorInfo.deptName}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--备注-->
    <div class="outline">
      <div class="outline-header">
        <div class="outline-tit">备注</div>
      </div>
      <div class="outline-body">
        <div class="txt-p"
             v-if="data[current].familyInfo.transferStatus == '1'">
          {{data[current].reReferralOut.checkSuggest || '转诊申请正在等待医院审核，请耐心等候'}}
        </div>
        <!-- <div class="txt-p"
             v-else-if="data[current].familyInfo.transferStatus == '2'">
          {{data[current].reReferralOut.checkSuggest || '转出失败，转诊被拒绝。'}}
        </div> -->
        <div class="timeline"
             v-if="(data[current].reReferralOut.checkTime&&data[current].reReferralOut.checkSuggest||data[current].reReferralIn.checkTime&&data[current].reReferralIn.checkSuggest)&&(data[current].familyInfo.transferStatus > '1')">
          <div class="time-item">

            <div class="time"
                 v-if="data[current].reReferralOut.checkTime&&data[current].reReferralOut.checkSuggest">
              <div>
                {{data[current].reReferralOut.checkTime&&data[current].reReferralOut.checkTime.split(' ')[0].substring(5)}}
              </div>
              <div>
                {{data[current].reReferralOut.checkTime&&data[current].reReferralOut.checkTime.split(' ')[1].substring(0,5)}}
              </div>
            </div>
            <div class="item"
                 :class="data[current].familyInfo.transferStatus==2&&'noline'">
              <div class="item-time">{{data[current].reReferralOut.doctorInfo.hospitalName}}</div>
              <div class="item-text"
                   v-if="data[current].familyInfo.transferStatus==2">
                不同意转诊。</div>

              <div class="item-text">
                <span v-if="data[current].familyInfo.transferStatus==2">拒接原因：</span>
                {{data[current].reReferralOut.checkSuggest}}
              </div>
            </div>
          </div>
          <!--  -->
          <div class="time-item"
               v-if="data[current].familyInfo.transferStatus>2">
            <div class="time">
              <div>
                {{data[current].reReferralIn.checkTime&&data[current].reReferralIn.checkTime.split(' ')[0].substring(5)}}
              </div>
              <div>
                {{data[current].reReferralIn.checkTime&&data[current].reReferralIn.checkTime.split(' ')[1].substring(0,5)}}
              </div>
            </div>
            <div class="item noline">
              <div class="item-time"
                   v-if="data[current].reReferralIn.checkSuggest">
                {{data[current].reReferralIn.doctorInfo.hospitalName}}</div>
              <div class="item-text"
                   v-if="data[current].familyInfo.transferStatus==5">
                不同意转诊。</div>
              <div class="item-text"
                   :class=" data[current].reReferralIn.checkTime ? '' : 'item-time' ">
                <span v-if="data[current].familyInfo.transferStatus==5">拒接原因：</span>
                {{data[current].reReferralIn.checkSuggest || '转诊申请正在等待医院审核，请耐心等候'}}</div>
            </div>
          </div>
        </div>
        <div class="txt-p"
             :class="(data[current].reReferralOut.checkTime&&data[current].reReferralOut.checkSuggest||data[current].reReferralIn.checkTime&&data[current].reReferralIn.checkSuggest)&&'nmp'"
             v-if="data[current].familyInfo.transferStatus == '6' || data[current].familyInfo.transferStatus == '7'">
          {{ data[current].reReferralIn.referralSuggest }}</div>
        <!-- <div class="txt-p"
             v-else-if="data[current].familyInfo.transferStatus == '5'">
          {{data[current].reReferralIn.checkSuggest || '转入失败，转诊被拒绝。'}}
        </div> -->
      </div>

    </div>
    <div class="btn-group"
         v-if="data[current].familyInfo.transferStatus == '4'">
      <div @click="applyConsult(data[current].familyInfo.isConsultation)"
           class="btn"
           :class="data[current].familyInfo.isConsultation ? 'btn-default' : 'btn-blue'">咨询医生</div>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
import { Dialog } from 'vant'
export default {
  data() {
    return {
      data: [],
      current: 0,
      hasApply: false
    }
  },
  activated() {
    this.data = []
    this.getData()
  },
  mounted() {
    // this.getData()
  },
  methods: {
    getData() {
      const params = peace.util.decode(this.$route.params.json)
      if (params.referralNo) {
        this.getDetail(params.referralNo)
      } else if (params.inquiryNo) {
        this.getList(params.inquiryNo)
      }
    },

    getList(inquiryNo) {
      peace.service.group.getTransferList({ inquiryNo: inquiryNo }).then(res => {
        this.data = res.data || []
      })
    },
    getDetail(referralNo, type) {
      peace.service.group.getTransferDetail({ referralNo: referralNo }).then(res => {
        if (typeof type != 'undefined') {
          this.data.splice(this.current, 1, res.data)
        } else {
          this.data.push(res.data)
        }
      })
    },

    applyConsult(isConsultation) {
      if (isConsultation) {
        return
      }
      if (this.hasApply) {
        return
      }
      this.hasApply = true
      Dialog.confirm({
        title: '温馨提示',
        message: '是否开启线上咨询？'
      })
        .then(() => {
          peace.service.group
            .applyConsult({
              referralNo: this.data[this.current].reReferralOut.referralNo,
              inquiryNo: this.data[this.current].familyInfo.inquiryNo
            })
            .then(res => {
              // debugger
              if (res.code == '200') {
                let session = {
                  inquiryStatus: res.data.inquiryStatus,
                  inquiryNo: res.data.inquiryNo,
                  doctorId: res.data.doctorId,
                  createdTime: res.data.createTime,
                  familyId: res.data.familyId
                }
                this.selectSession(session)
              }
            })
            .catch(res => {
              if (res.data.code == '202') {
                Dialog.confirm({
                  title: '温馨提示',
                  message: res.data.msg + '是否继续咨询？',
                  confirmButtonText: '查看详情'
                }).then(() => {
                  const inquiryId = res.data.data.data.inquiryId
                  const inquiryStatus = res.data.data.data.inquiryStatus

                  if (inquiryStatus === 1 || inquiryStatus === 2) {
                    this.goUserConsultDetail(inquiryId)
                    return
                  }

                  let session = {
                    inquiryStatus: res.data.data.param.inquiryStatus,
                    inquiryNo: '',
                    doctorId: res.data.data.param.doctorId,
                    createdTime: res.data.data.data.createTime,
                    familyId: res.data.data.param.familyId
                  }
                  this.selectSession(session)
                })
              }
              //on cancel
            })
        })
        .catch(() => {
          //on cancel
        })
        .finally(() => {
          this.hasApply = false
        })
    },

    goUserConsultDetail(inquiryId) {
      const params = {
        inquiryId
      }
      let json = peace.util.encode(params)
      //跳转订单详情
      this.$router.push(`/setting/userConsultDetail/${json}`)
    },

    selectSession(session) {
      let params = null
      if (
        session.inquiryStatus == peace.type.INQUIRY.INQUIRY_STATUS.已退诊 ||
        session.inquiryStatus == peace.type.INQUIRY.INQUIRY_STATUS.已完成 ||
        session.inquiryStatus == peace.type.INQUIRY.INQUIRY_STATUS.已取消
      ) {
        // 当前问诊【已完成】【已退诊】【已取消】
        // 获取数据库记录，无法在 service/IM.js 重置未读数，因此手动重置为 0
        // $peace.NIM.resetSessionUnread(session.id)

        params = peace.util.encode({
          inquiryNo: session.inquiryNo,
          familyId: session.familyId
        })
      } else {
        params = peace.util.encode({
          id: 'p2p-' + session.doctorId,
          scene: 'p2p',
          beginTime: session.createdTime.toDate().getTime(),
          to: session.doctorId,
          familyId: session.familyId
        })
      }
      // 清除聊天记录
      peace.service.IM.resetInquirySessionMessages()

      // 跳转聊天详情
      setTimeout(() => {
        this.$router.push(`/components/messageList/${params}`)
      }, 500)
    },
    next() {
      if (this.current + 1 >= this.data.length) {
        this.current = 0
      } else {
        this.current = this.current + 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tip {
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: #ebfbf9;
  padding: 10px 20px;
  color: #00c6ae;
  font-size: 12px;

  .tip-left,
  .tip-right {
    display: flex;
    align-items: center;
    span {
      line-height: normal;
    }
  }
}
.page {
  background-color: #f5f5f5;
  min-height: 100%;
}
.prescript {
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  padding: 5px 15px;
  // margin-bottom: 10px;
  position: relative;
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

.form-code {
  background: #f8f8f8;
  padding: 0rpx 15px;
  margin-top: 10px;
  border-radius: 5px;
  box-sizing: border-box;

  display: flex;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  -webkit-box-lines: multiple;
  -moz-flex-wrap: wrap;
}
.namelist-dl.bb {
  border-bottom: 1px solid #ebebeb;
}
.namelist-dl {
  flex: 0 1 50%;
  font-size: 15px;
  padding: 10px 0;

  display: flex;
}
.namelist-dl .dt {
  flex: 0 0 auto;
  width: 45px;
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

.outline {
  margin: 10px 0 0 0;
  padding-left: 15px;
}
.outline .outline-header {
  margin: 10px 0;
}
.outline .outline-body {
  margin-top: 10px;
  padding: 10px 0 15px 0;
  border-top: 1px solid #dedede;
  overflow: hidden;
}
.outline-body,
.outline-body .inline,
.inline {
  display: block;
  word-wrap: break-word;
}
.bt {
  padding: 0 15rpx;
  font-size: 11px;
  color: #999;
}

.column-2 {
  display: flex;
  color: #000;
  font-size: 15px;
  border-top: 1px dotted #bfbfbf;
  margin-top: 1px;
  padding: 10px 0;
}
.column-2.index-0 {
  border-top: 0;
  padding-top: 0;
}
.column-2 .column-left {
  flex: 1 1 auto;
}
.column-2 .column-left .inline {
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  display: flex;
}
.column-left .inline .span {
  flex: 0 0 auto;
  width: 125px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.column-left .inline .span.l {
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 15px;
}
.column-left .small {
  color: #999;
  font-size: 13px;
  padding-top: 10px;
}
.column-2 .column-right {
  flex: 0 0 auto;
  width: 30px;
  text-align: right;
}

.module {
  padding-left: 30px;
  box-sizing: border-box;

  display: flex;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  -webkit-box-lines: multiple;
  -moz-flex-wrap: wrap;
}
.namelist-dl {
  font-size: 13px;
  color: #999;
}
.namelist-dl .dt {
  flex: 0 0 auto;
  width: 65px;
}
.namelist-dl .dd {
  flex: 1 1 auto;
  width: 65px;
  color: #000;
}
.namelist-dl .dd image {
  width: 45px;
  height: 17px;
}
.npd {
  padding-bottom: 0;
}

.inline {
  color: #666;
}
.inline .b {
  color: #000;
  display: inline;
}
.txt-p {
  padding: 10px 0;
  font-size: 15px;
  color: #333;
  &.nmp {
    padding: 0;
    margin: 0;
  }
}
.timeline {
  margin-top: 10px;
  padding-top: 10px;
}
.time-item {
  width: 100%;
  display: flex;
}
.time-item .time {
  display: flex;
  width: 10%;
  flex-direction: column;
  font-size: 12px;
  margin-top: -10px;
  color: #999;
  // padding-right: 5px;
}
.timeline .item {
  position: relative;
  padding-left: 10px;
  margin-left: 5px;
  border-left: 1px solid #00c6ae;
  padding-bottom: 10px;
  min-height: 50px;
  padding-top: 1px;
}
.timeline .item.noline {
  border-left-color: #fff;
  padding-bottom: 0;
  min-height: 40px;
}
.timeline .item-time {
  color: #333;
  margin-top: -10px;
  font-size: 14px;
  margin-bottom: 2px;
}
.timeline .item-time::before {
  content: '';
  position: absolute;
  display: block;
  width: 7.5px;
  height: 7.5px;
  border-radius: 50%;
  background: #00c6ae;
  left: -4px;
  top: -3px;
}
.timeline .item-text {
  font-size: 12px;
  color: #333;
}
.timeline .item-text.item-time {
  font-size: 14px;
}
.prescript.icon-status::after {
  content: '';
  right: 20px;
  top: 45px;
  display: block;
  position: absolute;
  width: 70px;
  height: 38px;
  background-size: cover;
}
/*等待色 蓝*/
.icon-status-referr-1::after,
.icon-status-referr-3::after {
  content: '';
  background-image: url(data:image/png;base64,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);
}
/*拒绝色 红*/
.icon-status-referr-2::after,
.icon-status-referr-5::after {
  content: '';
  background-image: url(data:image/png;base64,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);
}
/*pass色 绿*/
.icon-status-referr-4::after {
  content: '';
  background-image: url(data:image/png;base64,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);
}
/*完成色 灰*/
.icon-status-referr-6::after,
.icon-status-referr-7::after {
  content: '';
  background-image: url(data:image/png;base64,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);
}

.code {
  border-radius: 4px;
}
.bdstyle .dl-packet {
  padding: 5px 0;
  border-bottom: 1px solid #dedede;
}
.bdstyle .dt {
  width: 90px;
  padding-left: 0;
}
.bdstyle .dd {
  color: #333333;
}
// .group
.btn-group {
  margin-top: -10px;
  background-color: #fff;
}
.btn-blue {
  border-color: #00c6ae;
  background-color: #00c6ae;
  color: #fff;
}
.btn.btn-default {
  background: #e0e0e0;
  border-color: #e0e0e0;
  color: #999999;
}
</style>
