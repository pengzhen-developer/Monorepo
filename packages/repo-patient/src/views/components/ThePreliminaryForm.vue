<template>
  <div class="consult-detatil">
    <div class="module order"
         v-if="internalData!=null&&firstLoad">
      <div class="module-item"
           v-if="retrunVisitBlock">
        <div class="b">复诊时间</div>
        <div class="span">{{internalData.inquiryOrderInfo.appointmentDate}}</div>
      </div>
      <div class="module-item">
        <div class="b">个人信息</div>
        <div class="form-dl">
          <div class="form-dt"><span>姓名</span> :</div>
          <div class="form-dd">{{internalData.patientInfo.familyName}}</div>
        </div>
        <div class="form-dl">
          <div class="form-dt"><span>年龄</span> :</div>
          <div class="form-dd">{{internalData.patientInfo.familyAge + "岁"}}</div>
        </div>
        <div class="form-dl">
          <div class="form-dt"><span>性别</span> :</div>
          <div class="form-dd">{{internalData.patientInfo.familySex}}
          </div>
        </div>
        <div class="form-dl"
             v-if="internalData.inquiryOrderInfo.guardianName">
          <div class="form-dt"><span>监 护 人</span> :</div>
          <div class="form-dd">{{internalData.inquiryOrderInfo.guardianName}} |
            {{internalData.inquiryOrderInfo.guardianSex}} |
            {{internalData.inquiryOrderInfo.guardianAge +'岁'}}
          </div>
        </div>
      </div>
      <!--病情描述-->
      <div class="module-item">
        <div class="b">病情描述</div>
        <div class="span">{{ internalData.inquiryOrderInfo.describe}}</div>

      </div>
      <div class="module-item"
           v-if="hasReturnVisitInfo">
        <div>
          <div class="b">复诊信息</div>
          <div class="form-dl img"
               v-if="internalData.inquiryOrderInfo.imgs.length>0">
            <div class="form-dt ">复诊凭证 :</div>
            <div class="form-img">

              <div class="img"
                   v-for="(item,index) in internalData.inquiryOrderInfo.imgs"
                   :key="index">
                <img :src="item"
                     @click="viewImage(item, index,internalData.inquiryOrderInfo.imgs)" />
              </div>

            </div>
          </div>
          <div class="form-dl"
               v-else>
            <div class="form-dt">复诊凭证 :</div>
            <div class="form-dd">确认遗失
            </div>
          </div>
          <div class="form-dl">
            <div class="form-dt start">初诊诊断 :</div>
            <div class="form-dd">{{internalData.inquiryOrderInfo.confirmIllness}}
            </div>
          </div>
        </div>
      </div>

      <div class="module-item"
           v-if="hasFirstVisitInfo">
        <div class="module-item-title">
          <div class="b">首诊记录</div>
          <div class="module-item-more"
               @click="seeMoreCase"
               v-if="canSeeMoreCase">查看更多>></div>
        </div>
        <div class="case-card"
             v-for="(value, key) in firstVisitData"
             :key="key">
          <div class="case-card-time">
            <div class="m">{{ key.toDate().formatDate('MM-dd') }}</div>
            <div class="y">{{ key.toDate().formatDate('yyyy') }}</div>
          </div>
          <div class="case-box">
            <!-- @click="gotoCaseDetail(item.dataNo)" -->
            <div class="case-card-note"
                 v-for="(item,index) in value"
                 :key="index">
              <div class="case-card-note-content">
                <div class="case-left">
                  <van-image width="35px"
                             height="35px"
                             :src="require('@src/assets/images/file/ic_medical record.png')" />
                </div>
                <div class="case-right">
                  <p class="title">
                    {{item.title}}
                  </p>
                  <p class="name">
                    {{ item.hospitalName }} | {{ item.deptName }}
                  </p>
                </div>
              </div>
              <div class="case-diagnosis"
                   v-if="item.diagnosis">{{item.diagnosis}}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="module-item"
           v-if="internalData.inquiryOrderInfo&&(internalData.inquiryOrderInfo.aImages.length>0||internalData.inquiryOrderInfo.pregnancyText||internalData.inquiryOrderInfo.allergicHistory)">
        <div>
          <div class="b">补充信息</div>
          <div class="form-dl img"
               v-if="internalData.inquiryOrderInfo.aImages.length>0">
            <div class="form-dt ">患处图片 :</div>
            <div class="form-img">
              <div class="img"
                   v-for="(item,index) in internalData.inquiryOrderInfo.aImages"
                   :key="index">
                <img :src="item"
                     @click="viewImage(item, index,internalData.inquiryOrderInfo.aImages)" />
              </div>

            </div>
          </div>
          <div class="form-dl"
               v-if="internalData.inquiryOrderInfo.pregnancyText">
            <div class="form-dt">特殊时期 :</div>
            <div class="form-dd">{{internalData.inquiryOrderInfo.pregnancyText}} </div>
          </div>
          <div class="form-dl"
               v-if="internalData.inquiryOrderInfo.allergicHistory">
            <div class="form-dt"><span>过敏史</span> :</div>
            <div class="form-dd">{{internalData.inquiryOrderInfo.allergicHistory}}
            </div>
          </div>
        </div>
      </div>
    </div>

    <van-image-preview v-model="imagePreview.visible"
                       :start-position="imagePreview.position"
                       :images="imagePreview.images">
      <template v-slot:cover>
        <van-button icon="cross"
                    type="primary"
                    round
                    @click="imagePreview.visible = false" />
      </template>
    </van-image-preview>
  </div>
</template>

<script>
import peace from '@src/library'
import Vue from 'vue'
import { ImagePreview } from 'vant'
Vue.use(ImagePreview)
export default {
  data() {
    return {
      internalData: null,
      firstVisitData: null,
      canSeeMoreCase: false,
      firstLoad: false,
      hasFirstVisitInfo: false,
      imagePreview: {
        visible: false,
        position: 0,
        iamges: []
      }
    }
  },
  computed: {
    retrunVisitBlock() {
      return this.internalData?.inquiryOrderInfo?.isAgain.toString() === '1'
    },
    hasReturnVisitInfo() {
      return this.internalData?.inquiryOrderInfo?.confirmIllness
    }
  },
  mounted() {
    this.get()
  },

  methods: {
    async get() {
      this.internalData = peace.util.decode(this.$route.params.json).InquiryOrder
      if (this.internalData != null) {
        if (this.retrunVisitBlock) {
          await this.getFirstOptionList()
        }
        this.firstLoad = true
      }
    },
    viewImage(file, fileIndex, files) {
      this.imagePreview.visible = true
      this.imagePreview.position = fileIndex
      this.imagePreview.images = files.map((item) => item)
    },
    getFirstOptionList() {
      const params = {
        familyId: this.internalData?.patientInfo?.familyId,
        inquiryNo: this.internalData?.inquiryInfo?.inquiryNo
      }
      peace.service.yibao.GetFirstOptionList(params).then((res) => {
        if (res.data == null || !res.data.firstOptionList) {
          return
        }
        let list = []
        if (res.data.firstOptionList.length > 2) {
          this.canSeeMoreCase = true
          list = res.data.firstOptionList.slice(0, 2)
        } else {
          this.canSeeMoreCase = false
          list = res.data.firstOptionList
        }
        const temp = {}
        // 遍历时间
        const timeList = new Set(list.map((item) => item.createdTime))
        if (timeList.size) {
          timeList.forEach((time) => {
            temp[time] = list.filter((item) => item.createdTime === time)
          })
        }
        this.firstVisitData = temp
        this.hasFirstVisitInfo = res.data.firstOptionList.length > 0 ? true : false
      })
    }
  }
}
</script>

<style lang="scss">
.case-card {
  display: flex;

  .case-card-time {
    padding: 8px 15px 0 0;
    min-width: 70px;
    position: relative;
    text-align: right;
    font-family: monospace;
    .y {
      font-size: 12px;
      color: #999999;
    }
    .m {
      font-size: 17px;
      font-weight: 600;
      color: #333333;
    }
  }
  .case-box {
    flex: 1;
    width: 0;
  }
  .case-card-note {
    width: 100%;
    min-height: 50px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 5px 0px rgba(221, 221, 221, 0.5);
    border-radius: 4px;
    margin: 0 0 15px 0;
    .case-card-note-content {
      display: flex;
      align-items: center;
      padding: 6px 0px 6px 16px;
    }
    .case-left {
      width: 50px;
      text-align: left;
      position: relative;
    }
    .case-right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      width: 0;
      .title {
        color: #333;
        font-size: 14px;
      }
      .name {
        font-size: 12px;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 98%;
      }
    }
    .case-diagnosis {
      padding-left: 16px;
      height: 25px;
      line-height: 25px;
      border-top: 1px solid #e8e8e8;
      color: $primary;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
/deep/ .van-image-preview__index {
  top: 24px;
}

/deep/ .van-image-preview__cover {
  position: absolute;
  top: 24px;
  left: 24px;

  .van-button--round {
    border-radius: 50%;
    width: 26px;
    height: 26px;
    padding: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    color: #2a2a2a;
    background-color: #999999;
    border: 1px solid #999999;

    .van-button__icon {
      line-height: 1;
    }
  }
}

.module-item {
  border-bottom: 1px solid #e8e8e8;
  .module-item-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    .module-item-more {
      color: #999;
      font-weight: normal;
      padding-top: 10px;
    }
  }
  &:last-child {
    border-bottom: 0;
  }
}
.order {
  padding: 5px 15px;
  .b {
    padding-left: 0 !important;
  }
  .form-dl {
    padding: 3px 0;
    border-bottom: 0;
    &:last-child {
      padding-bottom: 10px;
    }

    .form-dt {
      color: #999;
      min-width: 70px;
      display: flex;
      padding-right: 10px;
      align-items: center;
      &.start {
        align-items: flex-start;
      }
      span {
        flex: 1;
        text-align: justify;
        text-align-last: justify;
        padding-right: 3px;
        height: 16px;
        line-height: 16px;
        &::after {
          content: ' ';
          display: inline-block;
          width: 100%;
          height: 0px;
        }
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
  background-color: #f5f5f5;
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
      color: rgba(0, 198, 174, 1);
      line-height: 16px;
      padding: 6px 22px 0px 55px;
      background: rgba(240, 252, 250, 1) url('../../assets/images/icons/ic_notice.png') no-repeat;
      background-size: 17px 17px;
      background-position: 15px 14px;
    }
  }
  .form-dl {
    font-size: 14px;
  }
  .form-dl.img {
    display: block;
    .form-dt {
      padding-top: 5px;
      padding-bottom: 5px;
    }
    .form-img {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .img {
        width: 57px;
        height: 57px;
        background: #ccc;
        margin: 5px 10px 5px 0;
        &:nth-child(5) {
          margin-right: 0 !important;
        }
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
    background: #00c6ae;
    color: #fff;
    border-color: transparent;
  }

  .card {
    background: #fff;
    padding: 10px 15px;
  }
  .b {
    display: block;
    font-weight: bold;
    color: #000;

    &::before {
      display: inline-block;
      content: '';
      width: 4px;
      height: 15px;
      background: #00c6ae;
      margin-right: 8px;
      margin-bottom: -2px;
    }
  }
  .b,
  .span,
  .ul {
    padding: 10px 15px 0 15px;
  }
  .span {
    padding: 10px 15px 10px 0;
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
</style>
