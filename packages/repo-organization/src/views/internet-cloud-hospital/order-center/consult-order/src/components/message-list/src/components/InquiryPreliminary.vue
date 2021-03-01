<template>
  <div class="consult-detatil">
    <div class="module order"
         v-if="internalData!=null">
      <div class="module-item"
           v-if="retrunVisitBlock">
        <div class="b">复诊时间</div>
        <div class="span">{{ internalData.inquiryOrderInfo.appointmentDate }}</div>
      </div>
      <div class="module-item">
        <div class="b">个人信息</div>
        <div class="form-dl">
          <div class="form-dt"><span>姓名</span> :</div>
          <div class="form-dd">{{internalData.inquiryOrderInfo.patientsName}}</div>
        </div>
        <div class="form-dl">
          <div class="form-dt"><span>年龄</span> :</div>
          <div class="form-dd">{{internalData.inquiryOrderInfo.age}}</div>
        </div>
        <div class="form-dl">
          <div class="form-dt"><span>性别</span> :</div>
          <div class="form-dd">{{internalData.inquiryOrderInfo.sex}}
          </div>
        </div>
        <div class="form-dl"
             v-if="internalData.inquiryOrderInfo.guardianName">
          <div class="form-dt">监护人:</div>
          <div class="form-dd">
            {{internalData.inquiryOrderInfo.guardianName}} |
            {{internalData.inquiryOrderInfo.guardianAge}} |
            {{internalData.inquiryOrderInfo.guardianSex}}
          </div>
        </div>
      </div>
      <!--病情描述-->
      <div class="module-item">
        <div class="b">病情现状</div>
        <div class="span">{{ internalData.inquiryOrderInfo.describe}}</div>

      </div>
      <div class="module-item"
           v-if="retrunVisitBlock">
        <div>
          <div class="b">复诊信息</div>
          <div class="form-dl img"
               v-if="internalData.inquiryOrderInfo.imgs.length > 0">
            <div class="form-dt ">复诊凭证 :</div>
            <div class="form-img"
                 style="display: inline-block; ">
              <el-image class="preview-img img"
                        :z-index="9999"
                        v-for="(item, index) in internalData.inquiryOrderInfo.imgs"
                        :key="index"
                        :src="item"
                        :preview-src-list="internalData.inquiryOrderInfo.imgs">
              </el-image>
            </div>
          </div>
          <div class="form-dl"
               v-else>
            <div class="form-dt">复诊凭证 :</div>
            <div class="form-dd">确认遗失
            </div>
          </div>
          <div class="form-dl">
            <div class="form-dt">初诊诊断 :</div>
            <div class="form-dd">{{internalData.inquiryOrderInfo.confirmIllness}}
            </div>
          </div>
        </div>
      </div>

      <div class="module-item"
           v-if="firstOptionList&&firstOptionList.length>0">
        <div>
          <div class="b">诊疗记录</div>
          <div class="row  items-baseline">

            <div class="first-list">
              <div class="first-item"
                   v-for="(item, index) in firstOptionList"
                   :key="index">

                <div class="first-time">
                  <div class="first-day">{{item.createdTime.split(' ')[0].substring(5, 10)}}</div>
                  <div class="first-year">{{item.createdTime.split(' ')[0].substring(0, 4)}}</div>
                </div>
                <div class="first-content">
                  <div class="first-card">
                    <div class="first-info">
                      <img class="first-icon"
                           src="../assets/images/ic_medical_record.png">
                      <div>
                        <div class="first-title">{{item.title}}</div>
                        <div class="first-hospital">{{item.hospitalName}} | {{item.deptName}}</div>
                      </div>
                    </div>
                    <div v-if="item.diagnosis"
                         class="first-diagnosis">{{item.diagnosis || ''}}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="module-item"
           v-if="internalData.inquiryOrderInfo&&((internalData.inquiryOrderInfo.aImages&&internalData.inquiryOrderInfo.aImages.length>0)||internalData.inquiryOrderInfo.allergicHistory||internalData.inquiryOrderInfo.pregnancyText)">
        <div>
          <div class="b">补充信息</div>
          <div class="form-dl img"
               style="display: flex; align-items: flex-start;"
               v-if="internalData.inquiryOrderInfo.aImages.length > 0">
            <div class="form-dt">患处图片 :</div>
            <div class="form-img"
                 style="display: inline-block; ">
              <el-image class="preview-img img"
                        :z-index="9999"
                        v-for="(item,index) in internalData.inquiryOrderInfo.aImages"
                        :key="index"
                        :src="item"
                        :preview-src-list="internalData.inquiryOrderInfo.aImages">
              </el-image>
            </div>
          </div>
          <div class="form-dl"
               v-if="internalData.inquiryOrderInfo.pregnancyText">
            <div class="form-dt">特殊时期 :</div>
            <div class="form-dd">{{internalData.inquiryOrderInfo.pregnancyText}}
            </div>
          </div>
          <div class="form-dl"
               v-if="internalData.inquiryOrderInfo.allergicHistory">
            <div class="form-dt"><span>过敏史</span>:</div>
            <div class="form-dd">{{internalData.inquiryOrderInfo.allergicHistory}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Service from '../service'
export default {
  props: {
    data: Object
  },

  data() {
    return {
      internalData: null,
      firstOptionList: null
    }
  },
  computed: {
    retrunVisitBlock() {
      return (
        this.internalData &&
        this.internalData.inquiryOrderInfo &&
        this.internalData.inquiryOrderInfo.isAgain &&
        this.internalData.inquiryOrderInfo.confirmIllness
      )
    }
  },
  mounted() {
    this.internalData = this.data
    if (this.internalData.inquiryOrderInfo.isAgain) {
      this.getFirstOptionList(this.internalData.inquiryInfo.inquiryNo)
    }
  },

  methods: {
    getFirstOptionList(inquiryNo) {
      let params = {
        inquiryNo: inquiryNo
      }
      Service.getFirstOptionList(params).then((res) => {
        this.firstOptionList = res.data.firstOptionList
      })
    }
  }
}
</script>

<style lang="scss">
.module-item {
  border-bottom: 1px solid #e8e8e8;
  margin: 0 0 5px 0;
  padding: 10px 0;
  &:last-child {
    border-bottom: 0;
  }
}
.order {
  padding: 0 15px;
  .b {
    padding-left: 0 !important;
    margin: 0 0 10px 0;
  }
  .form-dl {
    padding: 3px 0;
    border-bottom: 0;
    display: flex;
    &:last-child {
      padding-bottom: 10px;
    }

    .form-dt {
      color: #999;
      min-width: 75px;
      display: flex;
      padding-right: 10px;
      span {
        flex: 1;
        text-align-last: justify;
        margin-right: 3px;
      }
    }
    .form-dd {
      color: #333;
      text-align: left;
      padding-left: 2px;
    }
  }
}
.bb {
  height: 1px;
  background: #e8e8e8;
}
.consult-detatil {
  background-color: #fff;
  color: #333;
  min-height: 100%;
  padding: 10px;
  border-radius: 3px;
  box-sizing: border-box;
  .module,
  .brief {
    border-radius: 5px;
  }
  .module {
    background: #fff;
    margin-bottom: 10px;
    .cancelText {
      height: 45px;
      background: rgba(240, 252, 250, 1);
      border-radius: 2px;
      margin: 10px 15px 0 15px;
      font-size: 12px;
      color: var(--q-color-primary);
      line-height: 16px;
      padding: 6px 22px 0px 55px;
      background: rgba(240, 252, 250, 1) url('../assets/images/ic_notice.png') no-repeat;
      background-size: 17px 17px;
      background-position: 15px 14px;
    }
  }
  .form-dl {
    font-size: 14px;
  }
  .form-dl.img {
    // display: block;
    .form-dt {
      padding-top: 5px;
      padding-bottom: 5px;
    }
    .form-img {
      padding: 5px 0;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .img {
        width: 57px;
        height: 57px;
        background: #ccc;
        margin-right: 10px;
        margin-bottom: 10px;
        // &:nth-child(5n) {
        //   margin-right: 0 !important;
        // }
        img {
          width: 57px;
          height: 57px;
          display: block;
        }
      }
    }
  }
  .nmg {
    margin-top: 0;
    padding-bottom: 10px;
  }
  .module .strong {
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
    padding: 10px 15px;
    color: #333;
  }
  .module .brief {
    font-size: 13px;
    padding: 0 15px;
    /*color: #888;*/
  }
  .module .small {
    font-size: 15px;
    padding: 10px 15px;
  }

  .module .module-body {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
  .module-body .label {
    flex: 1;
    text-align: center;
    font-size: 13px;
    padding: 4px 6px;
    margin: 5px;
    border-radius: 20px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .module-body .blue-full {
    background: var(--q-color-primary);
    color: #fff;
    border-color: transparent;
  }

  .card {
    background: #fff;
    padding: 10px 15px;
  }
  .b {
    display: block;
    font-weight: 600;
    color: #000;

    &::before {
      display: inline-block;
      content: '';
      width: 4px;
      height: 15px;
      background: var(--q-color-primary);
      margin-right: 8px;
      margin-bottom: -2px;
    }
  }
  .b,
  .span,
  .ul {
    padding: 0 15px;
  }

  .dl-packet {
    display: flex;
    justify-content: space-between;
    align-content: center;
    color: #999;
    font-size: 13px;
  }
  .dl-packet .dt {
    flex: 0 0 auto;
    width: 115px;
    padding: 5px 15px;
  }
  .dl-packet .dd {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: right;
    padding: 5px 15px;
  }
  .pdtb {
    padding: 10px 0;
  }
  .right {
    // text-align: right;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .money {
    color: #f2223b;
    font-size: 18px;
    display: inline;
    padding-left: 8px;
  }
  .ul {
    display: flex;
    padding-bottom: 15px;
  }
  .ul .li {
    flex: 0 0 auto;
    width: 45px;
    height: 45px;
    margin-right: 13px;
    border: 1px solid #e5e5e5;
    padding: 5px;
  }
  .label.label-private {
    font-size: 8px;
    padding: 1px 2px;
    border-radius: 2px;
    color: #f7e9b3;
    background: #504c4f;
    border-color: #504c4f;
    vertical-align: text-top;
    margin-top: 2px;
  }
}

.first-list {
  .first-item {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
  }
  .first-time {
    position: relative;
    flex: none;
    width: 56px;
    min-height: 75px;
    padding-right: 16px;
    margin-right: 16px;
    border-right: 1px solid #eeeeee;
    font-weight: 400;
    color: #999999;
    text-align: right;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: -5px;
      width: 9px;
      height: 9px;
      border-radius: 50px;
      background-color: var(--q-color-primary);
    }
    .first-day {
      height: 14px;
      font-size: 14px;
      color: #333333;
      line-height: 14px;
      margin-bottom: 6px;
    }
    .first-year {
      height: 12px;
      font-size: 12px;
      line-height: 12px;
    }
  }
  .first-content {
    width: 320px;
  }
  .first-card {
    background-color: #ffffff;
    box-shadow: 0px 1px 5px 0px rgba(221, 221, 221, 0.5);
    border-radius: 4px;
    margin-bottom: 12px;
    .first-info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 20px 16px 12px 16px;
      .first-icon {
        float: none;
        width: 36px;
        height: 36px;
        margin-right: 16px;
      }
      .first-title {
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        line-height: 20px;
      }
      .first-hospital {
        font-size: 14px;
        font-weight: 400;
        color: #999999;
        line-height: 18px;
      }
    }
    .first-diagnosis {
      border-top: 1px solid #efefef;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 400;
      color: #3099a6;
      line-height: 18px;
      white-space: normal;
      word-break: break-all;
      word-wrap: normal;
    }
  }
}
</style>
