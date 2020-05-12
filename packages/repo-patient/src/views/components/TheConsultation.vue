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
         :class="'icon-status-groupConsult-'+data[current].consultStatus">
      <div class="prescript-no">No.{{data[current].consultNo}}</div>
      <div class="prescript-head">{{data[current].fromHospitalName}}</div>
      <div class="prescript-h4">会诊单</div>
      <div class="prescript-table">
        <div class="th">姓名
          <div class="td">{{data[current].familyName}}</div>
        </div>
        <div class="th">性别
          <div class="td">{{data[current].familySex}}</div>
        </div>
        <div class="th">年龄
          <div class="td">{{data[current].familyAge}}</div>
        </div>
        <div class="th">科别
          <div class="td">{{data[current].fromDeptName}}</div>
        </div>
      </div>
    </div>
    <!--就诊信息-->
    <div class="outline">
      <div class="outline-header">
        <div class="outline-tit">发起会诊信息</div>
      </div>
      <div class="outline-body">
        <div class="card">
          <div class="card-avatar avatar-circular">
            <img class=""
                 :src="data[current].fromPhoto" />
          </div>
          <div class="card-body">
            <div class="card-name">
              {{data[current].fromDoctorName}} {{data[current].fromDoctorTitle}}
            </div>
            <div class="card-small">
              {{data[current].fromHospitalName}} {{data[current].fromDeptName}}
            </div>
          </div>
        </div>
        <div class="code">
          <div class="inline">
            就诊时间：
            <div class="b">{{data[current].createdTime}}</div>
          </div>
          <div class="inline">
            初步诊断：
            <div class="b">{{data[current].familyDisagnose}}</div>
          </div>
          <div class="inline">
            会诊原因：
            <div class="b">{{data[current].consultExplain}}</div>
          </div>
          <div class="inline">
            期望会诊时间：
            <div class="b">{{data[current].expectTime}}</div>
          </div>
        </div>
      </div>
    </div>
    <!--转诊信息-->
    <div class="outline">
      <div class="outline-header">
        <div class="outline-tit">受邀会诊医生</div>
      </div>
      <div class="outline-body">
        <div class="card">
          <div class="card-avatar avatar-circular">
            <img class=""
                 :src=" data[current].toPhoto" />
          </div>
          <div class="card-body">
            <div class="card-name">
              {{data[current].toDoctorName}} {{data[current].toDoctorTitle}}
            </div>
            <div class="card-small">
              {{data[current].toHospitalName}} {{data[current].toDeptName}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--备注-->
    <div class="outline pb10">
      <div class="outline-header">
        <div class="outline-tit">备注</div>
      </div>
      <div class="outline-body nmp">
        <div class="txt-p"
             v-if="data[current].outCheckStatus == '1'">
          {{data[current].outCheckSuggest || '会诊申请正在等待医院审核，请耐心等候'}}
        </div>
        <div class="timeline"
             v-else-if="data[current].outCheckStatus == '2'">
          <div class="time-item">
            <div class="time-time">
              <div>
                {{data[current].outCheckTime&&data[current].outCheckTime.split(' ')[0].substring(5)}}
              </div>
              <div>
                {{data[current].outCheckTime&&data[current].outCheckTime.split(' ')[1].substring(0,5)}}
              </div>
            </div>
            <div class="item b0 ">
              <div class="item-time">{{data[current].fromHospitalName}}
              </div>
              <div class="item-text">不同意会诊</div>
              <div class="item-text "
                   :class="data[current].outCheckTime ? '' : 'item-time' ">拒接原因：
                {{data[current].outCheckSuggest ||  '转出失败，会诊被拒绝。'}}</div>
            </div>
          </div>
        </div>
        <div class="timeline"
             v-if="data[current].outCheckStatus == '3'">
          <div class="time-item">
            <div class="time-time">
              <div>
                {{data[current].outCheckTime&&data[current].outCheckTime.split(' ')[0].substring(5)}}
              </div>
              <div>
                {{data[current].outCheckTime&&data[current].outCheckTime.split(' ')[1].substring(0,5)}}
              </div>
            </div>
            <div class="item">
              <div class="item-time">{{data[current].fromHospitalName}}
              </div>
              <div class="item-text"
                   :class="data[current].outCheckTime ? '' : 'item-time' ">
                {{data[current].outCheckSuggest}}</div>
            </div>
          </div>
          <div class="time-item">
            <div class="time-time">
              <div>
                {{data[current].inCheckTime&&data[current].inCheckTime.split(' ')[0].substring(5)}}
              </div>
              <div>
                {{data[current].inCheckTime&&data[current].inCheckTime.split(' ')[1].substring(0,5)}}
              </div>
            </div>
            <div class="item"
                 :class="(!data[current].consultStatus==4||!data[current].doctorExamineTime)&&'b0'">
              <div class="item-time"
                   v-if="data[current].inCheckTime">{{data[current].toHospitalName}}
              </div>
              <div :class="data[current].inCheckTime?'item-text':'item-time'">
                {{data[current].inCheckSuggest || data[current].markedWords}}</div>
            </div>
          </div>
          <div class="time-item"
               v-if="[5,6, 7].includes(data[current].consultStatus)">
            <div class="time-time">
              <div>
                {{data[current].doctorExamineTime&&data[current].doctorExamineTime.split(' ')[0].substring(5)}}
              </div>
              <div>
                {{data[current].doctorExamineTime&&data[current].doctorExamineTime.split(' ')[1].substring(0,5)}}
              </div>
            </div>
            <div class="item b0">
              <div class="item-time">{{data[current].toDoctorName}}医生
              </div>
              <div class="item-text">
                {{data[current].consultSuggest || '会诊医生已接诊'}}</div>
            </div>
          </div>
          <div class="time-item"
               v-if="data[current].consultStatus=='9'">
            <div class="time-time"></div>
            <div class="item  b0">
              <div class="item-time color-333">会诊申请正在等待医生审核，请耐心等候</div>
            </div>
          </div>
          <div class="time-item"
               v-if="data[current].consultStatus=='10'">
            <div class="time-time">
              <div>
                {{data[current].doctorExamineTime&&data[current].doctorExamineTime.split(' ')[0].substring(5)}}
              </div>
              <div>
                {{data[current].doctorExamineTime&&data[current].doctorExamineTime.split(' ')[1].substring(0,5)}}
              </div>
            </div>
            <div class="item b0">
              <div class="item-time">{{data[current].toDoctorName}}医生
              </div>
              <div class="item-text">会诊医生退诊</div>
              <div class="item-text">退诊原因: {{data[current].consultSuggest}}</div>
            </div>
          </div>
        </div>
        <div class="txt-p nmp"
             v-if="[5,6,8].includes(data[current].consultStatus)">
          {{data[current].consultStatus == '8'?data[current].closeReason:data[current].markedWords}}
        </div>
      </div>

    </div>
    <!-- 会诊小结   -->
    <div class="outline"
         v-if="data[current].consultStatus == '7'">
      <div class="outline-header">
        <div class="outline-tit">会诊小结</div>
      </div>
      <div class="outline-body bdstyle">
        <div class="dl-packet">
          <div class="dt justify">会诊所见</div>
          <div class="dd suggest">{{data[current].consultFind}}</div>
        </div>
        <div class="dl-packet">
          <div class="dt justify">目前诊断</div>
          <div class="dd suggest">{{data[current].consultDiagnose}}</div>
        </div>
        <div class="dl-packet">
          <div class="dt justify">建议</div>
          <div class="dd suggest">{{data[current].consultSuggest}}</div>
        </div>
        <div class="dl-packet">
          <div class="dt">会诊医师签名</div>
          <div class="dd">
            <img :src="data[current].doctorSignImg"
                 v-if="data[current].doctorSignImg"
                 style="width:88rpx;height: 33rpx;background-size: cover" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'
export default {
  data() {
    return {
      data: [],
      current: 0
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const params = peace.util.decode(this.$route.params.json)
      if (params.consultNo) {
        this.getDetail(params.consultNo)
      } else if (params.inquiryNo) {
        this.getList(params.inquiryNo)
      }
    },

    getList(inquiryNo) {
      peace.service.group.getConsultList({ inquiryNo: inquiryNo }).then(res => {
        this.data = res.data || []
      })
    },
    getDetail(consultNo) {
      peace.service.group.getConsultDetail({ consultNo: consultNo }).then(res => {
        this.data.push(res.data)
      })
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
  border-top: 2px dotted #000;

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

.prescript.icon-status::after {
  content: '';
  right: 0;
  top: 15px;
  display: block;
  position: absolute;
  width: 98px;
  height: 105px;
  background-size: cover;
  /*background-image: url(data:image/png;base64,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);*/
}
.outline {
  margin: 10px 0 0 0;
  padding-left: 15px;

  &.pb10 {
    padding-bottom: 10px;
  }
}
.page .outline .outline-header {
  margin: 10px 0;
}
.outline .outline-body {
  margin-top: 10px;
  padding: 10px 0 15px 0;
  border-top: 1px solid #dedede;
  overflow: hidden;
  &.nmp {
    padding: 0;
  }
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

.prescript .prescript-table {
  border-top: 1px dashed #e5e5e5;
}
// .outline .outline-body {
//   margin: 10px 0;
//   padding: 0;
// }
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
    padding-top: 0;
    margin: 0;
  }
}
.timeline {
  margin-top: 10px;
  padding-top: 10px;
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

// .timeline .item:last-child {
//   border-left: 1px solid transparent !important;
//   margin-bottom: 0;
//   min-height: 24px;
// }

.timeline .item.b0 {
  border-left: 1px solid transparent !important;
  padding-bottom: 0;
  margin-bottom: 0;
  min-height: 40px;
}

.timeline .item-time {
  color: #333;
  margin-top: -10px;
  font-size: 14px;
  margin-bottom: 2px;
}
.timeline .item-text.item-time {
  font-size: 14px;
}
.timeline .item-time.color-333 {
  color: #333;
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

.time-item {
  width: 100%;
  display: flex;
}
.time-time {
  display: flex;
  width: 10%;
  flex-direction: column;
  font-size: 12px;
  margin-top: -10px;
  color: #999;
}
.timeline .item-text {
  font-size: 12px;
  color: #333;
  // padding-top: 5px;
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
.icon-status-groupConsult-1::after,
.icon-status-groupConsult-3::after,
.icon-status-groupConsult-9::after {
  content: '';
  background-image: url(data:image/png;base64,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);
}
/*拒绝色 红*/
.icon-status-groupConsult-2::after,
.icon-status-groupConsult-4::after,
.icon-status-groupConsult-10::after {
  content: '';
  background-image: url(data:image/png;base64,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);
}
/*pass色 蓝*/
.icon-status-groupConsult-5::after {
  content: '';
  background-image: url(data:image/png;base64,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);
}
/*doing色 绿*/
.icon-status-groupConsult-6::after {
  content: '';
  background-image: url(data:image/png;base64,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);
}
/*完成关闭色 灰*/
.icon-status-groupConsult-7::after {
  content: '';
  background-image: url(data:image/png;base64,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);
}
.icon-status-groupConsult-8::after {
  content: '';
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAACaBAMAAACAr0rYAAAALVBMVEVHcEzNzc3Nzc3c3NzNzc3Nzc3Nzc3Nzc3Ozs7Nzc3Pz8/R0dHOzs7Nzc3MzMxNpAjIAAAADnRSTlMAutMHc6KL5zj1JRRKXdG1I7kAAA8WSURBVHjazFv/b1PXFXfy4vB4tqVssNLQyorGmpUWWaaDAhWtwrp0o2NWxNqyrSziy1qqlVlBZR3rqOUC3YYmRQu008SG5bGWCKkgl6EiVFplCk1HkaxMG2gLazR7OOalyf0bdu73+77Yuc9JSP1LEsfv+fqc8/l8zufc61BoQR9PPD2WDH0uHm9tvT+FbtzzeViKtctG5TPouccXfimXd2aOPf5eDiGUXeCVGEe2wSo6v5PFq/n9gi5lfXcC0UdPCFZTXcAKPrsrx5aCyvlQqH/h8mQcWYbEUr6Nn2lGqGtBlhIZaRdL2be3QJ5rRahtIaB8g5cKqi69xp+NIvTbBVhMP1/KfVsKSuJy6PYCLKaFReXHzqfj6NYdrVr2sxehY8/8q+D6bwpV7iCrbMrsp789tP8Tn/+fQ9U7x/qYVSh4I76EAtjO3xlW2Urr5ESdFwG2R+8oq9SrCsD2jvlvVuKC4Oy76sgPYLtjnpfyzi5J+z+sXxNx9Nm8LuX0SmUphRlenEJT87mW11l2QIG2FGZ8dT+amLf8PPEcF+b7//ZnnSs2oNI8dnDkAVyr2TQ1ITs5n1iuPvVJIM2a8/bKui46BDtQw2/NeXu1vjsjWWU42LWZV+c0TVSBWIYOB726d9UcLuUDheB+oi96xkiBE03X3AMIDewt6FcKNKFDnGgm57zF/um39FNvkhJjAvnYnLCeCqDOm/rXbWQl1sY7mtmzHrRwstsPULVnRYkdp0+EEZolnM7qyzJ5JF0lZneOc1swS9YLXrXWl8hqou0ylM3cFpizYb2vrWlH1S8wY6hZtR+jB/CPmBLKMC8Vo3FTaXz0SrwChuNjbMfGdNEDwchS6kfHWChjwhYkUF+DDLcNHc91hP4SMm48c03/sn8jmpSMDKUlbEFvY0RDyrYvc2uPHbCJNhOUVlQ1z3BbMN6AqeRlW8kEwzJ5vIs81BZHPZyCg5pKhWy1sOyRQ8641vVVXJM6OAUHM5UK2eph+cp/8h6zRkOziIeon9uCYKZy/aacVCC9SxIeawahGQqpkN7AbUE4gKmUZGt36gIIrJn7/mF0khEu63mbeIhaEK8efbINUrWWD8Vvy3LOybLElQQL9c1n1YKDLqhN6Qp8MxG0LvYaFiKg4Mm5r1q15VcB8qFjVBYn7P9+KCKil0DTWg1QkL7JelYpkJJjBqOyWhqS8ta2W3gNXby2K5oA0q/aq+W8fPsJR+2qSyuiCUh+Ca+hjTNOWavdD1C1AIoD0rOqbj6mJi0yTm+MZaCPMw6qVQWR97dBm78pcNVGc8geFZ/+uBNb/D4WT76dD53jdftYLaKBUnkerYKF/jW3L2DV/gqJQmQZOMtqjbPORp58Yq8W8Zc3+0+vItdh4d9AN0deaMQrJMQnzEBtYorKqpooDRYNeBOvW5AKz/TKeIduvmzH+Wmkw1jNQwN5+Q2hqC6piSZnzxzTBSiyMq8pz/TqNGcVOyirKBRCQwO1nFDdCNZEk9NEkSfF5HULa3dMr8znWziABrRYxfrUPzS4Jtd/nWOxR4LLwE90jhHFbONcPMSzqjLBSKZSZCt/slFZxrePA54EL0gsEtpJ2Hddo0vgUIvze/QqRLMR0lnN8JXrik/JJ4CrD5zdymdXSq6JJv7zML+Sq0Nash73ccZHOT5Z0W+xm+D1D/po/FeRn4eJKqOyMFrJ1UGwUT+raXNnewMeFQgLrsjX0ni3h4koHcUZ9HeuDkJAN7CaTjXW16bR04h1S16Nn/CpMGEae6sPc3UQAtrEajpOhzwBsWxkUDaNkJTp0GsZHuBDPlMFoYmA54koVwchoK2spnO4WQk8BYhB+cdy1CaKtLMAt/rMUoUmQhAmI5yohYBGWU3n0JTmUsLKEHMdptqrkBBx7WIBoJhPsy80EYq2DZLW4xTQCDOcae3RfbEqV5NCL8G9oEhWSXhxAFk+GryYayLoVx6S1uEylQmasBZdbxkBI8lXE8mR6n8YorGco3dMcQYKHxpZhyYSSzDOpUiYyjSy6aUV3TKB6uziBWcX6KQDoRd9oNOjoP0zhyam0B9w0qZcpnKcJszIlDXT9Bou0CzjCoreCOiM/QMvdDoUtE+pmhglQu41leeowLfUbvl8VmPTio3jkiE3x9xyr4eD+pSh34SqiYOonPQzlYuojwvz7kLj8TaibW6Mfg4T7rsmhzx+MIVPFAi5rCi6aiTI5qnXVIapj2sJsGGZPIRwykOXyOcLXfwdxPQ95BnJQX0KuSwxuaSauJoCzWsqW2jvYfpO1GJbl/sS72byxnEa3TRJ1umc28kW8SacSy6JJhpxkTSXqTRpjwj/+J/3XUGxfPdprC/SLOHEWOyWF37mksuEj1wSTYTArFBMpSqgOZrOuM8xDeARDhz3fwiWqgWS8DJjOT+5dPUjWBMhMEzo01wdBD/GKfZTPqwXJjBI1jQBU/TC6dpT8/2H3Xcs4cAc4OD/L4/MKEcgAXW/j8j2o2lQ84M1PUAPpYy2Wj7Ue+IAa+IgsrOsO2X8IsdERQrqDd6JGiCwB2N2VY1WhqTnDDaFofDdYqYk+s04FHDZFdZHgGKtzB/p7Q/RjoGcNSoIU7mDNjZ5j2uG9znlQ2dMFk5QqZoin4gdhxyUAEqjkwgtcV2GTeUgDkOUmDOI7dqMckyimca5xSuylwgCIY3obu9i1tGAniL0AjHsEJ0jBxB0Ur2edh1rosEoBdBRIB2VXDNrr0wPgxqU7U1C9Y57Wt0PhMwcLngzQz6U3BFpksMTSPJDCN3jJosOiVT7RfqLvV2J923aQXZ4pqQkVjEcx5fzjpkN7ql66Px9CYkhj3OraOgxpQHiqlkXJriDTfP93W8qFsBi7dW42+gWud4T4SmxnWFq2+G9o0nSyVSSJCMn2LDOyiuWaghn8Q1HUOXE5sJh5x4U77MqNMBT7i6KH/4kx1KrLySljSg7tgJayY9197oCCxzv6AK9syy/CTq59VHXy1Yryvc2YY43b4qOm0DRSIugYi5O0c0k+bb4M651gbF1hp3IlD/rpdW/L1BK7SxAnIHhMwRJwBNV/NPM4RhCJFc4q4NEejNc9pWCr6n0e/Rz1rOdVhT9QvnzUWKs4BVhPGyiVv0ic0yDpNLdR7gS1ANZ+MKBm36m0u+xWLCe+rKjardldh+0vo+QiBUFqIleJW+XIAm+5JxViuF7zDlKSNTfiWwSrKe8DEIvSghvQE+EjJGM0NJ++qm7C2yGt4SUngMAF1mzDkGlAr7vR9dohdbdIGilJ06drDfIew62gYFjYu6aFACV/QY4Skyklkswe2UX8Cg7kXbbaSprzVgmKUn1qf0BaVbkBjSpp7zPrDtFhyKuLLcipZwtOsIitz9V388bbB4YV/YRzhMZNPhwwz2yUQC6lo2LUk4wjjsb/CPtSLPJpgUIWJ5WZMkeEseIvSObqOg3MO99lyZ50hltJ2sZI8t0NvSNI8zhFuX1EJjp1zO1RzYR3m8YvYz3Bp0f/KpPf3955qVcaefs/qHAJibxrmK9TZ0E4xQwtmQ2Dz2E2iyA+JYDz1ciLBMlWpVVCaUKrK3Opg4D6Fpu+cNOikw7/9TaGBITL3ZDm9VBBqO82XusIDIs67ODYeYNBik765C1arBxnGzhB55ksbVFwqF6Yu6ZJxT0bTn1of1GvJRXzJdS1A8GWYps4ct8emaxNEGb5YNCcupNsMsiTLfQPp4f5dohCROLeSVAxYgWHlWV46gZO88mHbdqrL0kJQRitzqvkLB890MogG9Xz+AszTqq8iWmSy4tE1vaJSmD8GuqR5LwK+LFeI51UncpysmxzmFXY8Mi8qn/2ge2iI8PRZK0cpOC+pV6hb9KmqMeMyGXcs3T2HhPRshxt2NrA4Qs28QChYlPrdd0dVQnKFd244aILeWmX2OT9wCoxpk3aEv4eZd3qf+RedL4ehueUZR+Ha9znq7J1auJY6P20mGvuV2eo7qM6XpJowTne2/enHX5gL/6VFY2D9LH7EMUfJuDAdlxsq/OXkVUYQsBILqfYA64ahKLBcnSn1CwbwyoMwo8Sk/Wbmy41ErwDzFWO+B8bTPbecQGL8BRKeWQ4Uzn6RIvF4Q/JwDqZt+bA1FGu931hVtBXDDlrO5SFIKb+TxdentByi7GWzP30Ofd5NFMxswGdkW7dbm2XflyxsybfUUhd0Va5GKgjvXmoGsLrovONQ7oNSsjK4OdAoWq5MOENVnGycel/DgMD53UQ/q0kKRiWXe3vNlNwcpexClnoqKUW85Uh3SwLAF0n/bZ5bCLgi2lxcekrxr7rWRlsWdnxrL8+iYKsC+MW9dR11BPfo4Wx/Zf6JGgzUrQ846Wi7+alXNHEXySZjoY7asACn7e0TVK65cullnUriDdvtKsNHLGI+7cQBA7v/Q0wJdRgAPwKoCCnLhX26spZ9ZokZh7MFF9D3ym7jFvVQy1D1Z42qtbPo76l/jGpX9gm6QnQ7P7noicRZYcQ2lcMhv3kI+XJ/DeEQxA+xo9DkTlTx2l4W0zWi1VdvYqpgGgZVKAxkKzeTjO/uODDh8QQLw5HBxA5cbzI5v+LmVlZXJKz96eDAygwEc8/IKcU5zhUYbLYV0A/Vz45b3J0Bw84nKUFiWIqGqG5fLOgf8vZ3UeCSvHiCpo4BMIXCDHqBFXrgAz0MsFHBp5JGzOICKa+pCqH793D4lbkgYpEzfnFecRvYiNyIIGUeAbxRKTCLlXtECSbeW7C263GagJGN89Ikk9IgM9orBUwT5ATUKUI9VAZRsYqA44SFifgdwHUjGgvltApS5xTRbkEzgmkbKtlbS8LUDUKCmi40G1YgUTmKMstMaRVBAL7kHtJmZauQVYIRE6RgO55656i4GWwAh/+wl+rAJJi//JBUfDHxLXxH4p0sxAa8CdiXNCE7mJDWpNGtDcMYy42tzApPJclIxdxxS29RywF3CPYleEkN0HIjOasEwUQUaCqxnitMnuA5EJMLZWwlLto2XvDtM6L6MDtK2VSEcMvdNhOM1AX4CytRL5AAGRbga6A6Stlchl7dTbDAMA2GGjV8gtBGJ3KlIbQEevSBolpRngffcuAXkaiJQtEbRoXj3XI3foiwbNq3cUbfWlciOCgqEvagNLSoa+qJ+3KRj6onpV6SqY0swwCqAAAOPBeTxVOFvcAAAAAElFTkSuQmCC);
}
.code {
  border-radius: 4px;
}
.outline-body.bdstyle {
  padding: 0;
}
.bdstyle .dl-packet {
  padding: 5px 0;
  border-bottom: 1px solid #dedede;
}

.bdstyle .dt {
  width: 6em;
  padding-left: 0;
  padding-right: 0;
  color: #666;
  font-size: 14px;
  &.justify {
    width: 4em;
    height: 24px;
    line-height: 24px;
    padding: 0;
    text-align: justify;
    text-align-last: justify;
    &::after {
      content: '';
      display: inline-block;
      width: 100%;
      height: 0;
    }
  }
}
.bdstyle .dd {
  color: #333333;
  &.suggest {
    overflow: auto;
    text-overflow: unset;
    white-space: normal;
    word-break: break-all;
  }
}
</style>
