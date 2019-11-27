<template>
  <div class="consult-detatil">
    <div class="module order"
         v-if="internalData!=null">
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
           v-if="internalData.inquiryOrderInfo&&internalData.inquiryOrderInfo.isAgain==='1'">
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
                     @click="viewImage(item)" />
              </div>

            </div>
          </div>
          <div class="form-dl">
            <div class="form-dt">初诊诊断 :</div>
            <div class="form-dd">{{internalData.inquiryOrderInfo.confirmIllness}}
            </div>
          </div>
        </div>
      </div>
    </div>
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
      internalData: null
    }
  },
  mounted() {
    this.internalData = peace.util.decode(this.$route.params.json).InquiryOrder
    console.log(this.internalData)
  },
  methods: {
    viewImage(path) {
      ImagePreview([path])
    }
  }
}
</script>

<style lang="scss">
.module-item {
  border-bottom: 1px solid #e8e8e8;
  &:last-child {
    border-bottom: 0;
  }
}
.order {
  padding: 0 15px;
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
        &:nth-child(5n) {
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
    padding: 10px 15px;
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