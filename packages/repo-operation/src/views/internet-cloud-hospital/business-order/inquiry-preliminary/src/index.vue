<template>
  <div class="consult-detatil">
    <div class="module order"
         v-if="internalData!=null">
      <div class="module-item"
           v-if="internalData.inquiryInfo.inquiryType == 'returnVisit' && internalData.inquiryOrderInfo.appointmentDate">
        <div class="b">复诊时间</div>
        <div class="span">{{ internalData.inquiryOrderInfo.appointmentDate}}</div>

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
          <div class="form-dt"><span>监护人</span>:</div>
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
           v-if="internalData.inquiryOrderInfo && internalData.inquiryOrderInfo.isAgain && internalData.inquiryOrderInfo.confirmIllness">
        <div>
          <div class="b">复诊信息</div>
          <div class="form-dl img"
               v-if="internalData.inquiryOrderInfo&&internalData.inquiryOrderInfo.imgs.length > 0">
            <div class="form-dt ">复诊凭证 :</div>
            <div class="form-img"
                 style="display: inline-block; ">
              <div class="imgs">
                <preview-img :key="'img_' + index"
                             :src="img"
                             v-for="(img, index) in internalData.inquiryOrderInfo.imgs">
                </preview-img>
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
          <div class="row"
               v-for="item in firstOptionList"
               v-bind:key="item.key">
            <el-card class="case-bg">
              <div class="row">
                <img :src="require('./assets/images/ic_medical record.png')"
                     style="with:60px;height:60px" />
                <div class="case-content">
                  <p class="case-title"><span>{{Peace.util.formatDate(item.createdTime)}}</span><span>{{ item.title }}</span></p>
                  <p>{{item.diagnosis}}</p>
                  <p class="case-subtitle">{{item.hospitalName }} | {{ item.deptName }}</p>
                </div>
              </div>
            </el-card>
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
              <div class="imgs">
                <preview-img :key="'img_' + index"
                             :src="img"
                             v-for="(img, index) in internalData.inquiryOrderInfo.aImages">
                </preview-img>
              </div>
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
import Service from './service'
import PreviewImg from './components/PreviewImg'
export default {
  components: { PreviewImg },
  props: {
    data: Object
  },

  data() {
    return {
      internalData: null,
      firstOptionList: null
    }
  },

  mounted() {
    this.internalData = this.data
    if (this.internalData.inquiryOrderInfo.isAgain) {
      this.getFirstOptionList(this.internalData?.inquiryInfo?.inquiryNo)
    }
  },

  methods: {
    getFirstOptionList(value) {
      const params = { inquiryNo: value }
      Service.getFirstOptionList(params).then((res) => {
        this.firstOptionList = res.data.firstOptionList
      })
    }
  }
}
</script>

<style lang="scss">
.imgs {
  padding: 10px 0;
  .preview-img {
    width: 57px;
    height: 57px;
    text-align: center;
    display: inline-block;
    margin-right: 10px;
  }
}
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
      background: rgba(240, 252, 250, 1) url('./assets/images/ic_notice.png') no-repeat;
      background-size: 17px 17px;
      background-position: 15px 14px;
    }
  }
  .form-dl {
    font-size: 14px;
  }
  .form-dl.img {
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

.case-bg {
  border-radius: 4px;
  background-color: white;
  width: 320px;
  margin-top: 10px;
  .case-content {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    p {
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .case-title {
    font-size: 16px;
    color: #333 !important;
    line-height: 22px;
    span + span {
      margin-left: 15px;
    }
  }

  .case-subtitle {
    font-size: 13px;
    color: #999 !important;
    line-height: 18px;
  }
}
</style>
