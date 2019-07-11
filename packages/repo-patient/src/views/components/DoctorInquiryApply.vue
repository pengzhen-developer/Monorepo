<template>
  <div class="doctor-inquiry-apply">
    <div class="title">
      <div class="title-avatar">
        <img />
      </div>

      <div class="title-info">
        <div class="title-doctor">
          <span class="title-doctor-name">张逗豆</span>
          <span>副主任医生</span>
          <span>妇产科</span>
        </div>
        <div class="title-hospital">
          <span>郑州大学第一附属医院</span>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <van-cell-group>
      <van-field :value="model.familyId" @click="showFamily = true" clickable label="就诊人" placeholder="请选择就诊人" readonly right-icon="arrow" />
      <van-popup position="bottom" v-model="showFamily">
        <van-picker :columns="source.familyList" @cancel="showFamily = false" @confirm="selectFamily" show-toolbar />
      </van-popup>
    </van-cell-group>

    <van-cell-group>
      <van-field autosize label="病情描述" placeholder="请输入病情描述，如发病时间、主要病症、治疗经过、目前状况等，最少输入5字。" rows="5" type="textarea" v-model="model.illnessDescribe" />
    </van-cell-group>

    <van-cell-group>
      <van-field label="附件上传">
        <van-uploader :after-read="afterRead" :max-count="4" multiple slot="input" v-model="model.attachment" />
      </van-field>
    </van-cell-group>

    <van-cell-group>
      <van-field label="是否复诊">
        <van-switch active-color="#00c6ae" size="20px" slot="right-icon" v-model="model.isAgain" />
      </van-field>
    </van-cell-group>

    <div class="divider"></div>

    <template v-if="model.isAgain">
      <van-cell-group>
        <van-field :value="model.illnessHistory" @click="showIllnessHistory" clickable label="既往史" placeholder="请选择诊断" readonly right-icon="arrow" />
      </van-cell-group>

      <van-cell-group>
        <van-field :value="model.confirmTime" @click="showConfirmTime = true" clickable label="确认时间" placeholder="请选择时间" readonly right-icon="arrow" />
        <van-popup position="bottom" v-model="showConfirmTime">
          <van-datetime-picker @cancel="showConfirmTime = false" @confirm="selectConfirmTime" type="date" />
        </van-popup>
      </van-cell-group>

      <van-cell-group>
        <van-field autosize label="既往用药" placeholder="请输入既往用药" rows="2" type="textarea" v-model="model.pastDrug" />
      </van-cell-group>

      <van-cell-group>
        <van-field :value="model.allergicHistory" @click="showAllergicHistory" clickable label="过敏史" placeholder="请选择过敏史" readonly right-icon="arrow" />
      </van-cell-group>

      <van-cell-group>
        <van-field label="是否怀孕">
          <van-switch active-color="#00c6ae" size="20px" slot="right-icon" v-model="model.isPregnancy" />
        </van-field>
      </van-cell-group>

      <van-cell-group>
        <van-field label="是否不良反应">
          <van-switch active-color="#00c6ae" size="20px" slot="right-icon" v-model="model.isBadEffect" />
        </van-field>
      </van-cell-group>

      <van-cell-group>
        <van-field label="本次复诊情况">
          <van-radio-group slot="right-icon" v-model="model.againType">
            <van-radio name="1">本院同医生复诊</van-radio>
            <van-radio name="2">本院非同医生复诊</van-radio>
            <van-radio name="3">非本院复诊</van-radio>
          </van-radio-group>
        </van-field>
      </van-cell-group>
    </template>

    <div class="footer">
      <van-checkbox v-model="model.informedConsent">
        <span>我已阅读并同意</span>
        <a @click="redirect" class="informed-consent">《知情同意书》</a>
      </van-checkbox>
      <van-button style="width: 100%;" type="primary">保存</van-button>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  data() {
    return {
      showFamily: false,
      showConfirmTime: false,

      model: {
        // 就诊人 (家人 ID)
        familyId: '',
        // 病情描述
        illnessDescribe: '',
        // 附件
        attachment: [],
        // 是否复诊
        isAgain: false,
        // 既往史
        illnessHistory: '',
        // 确认时间
        confirmTime: '',
        // 既往用药
        pastDrug: '',
        // 过敏史
        allergicHistory: '',
        // 是否怀孕
        isPregnancy: false,
        // 是否不良反应
        isBadEffect: false,
        // 本次复诊情况
        againType: false,
        // 知情同意
        informedConsent: false
      },

      source: {
        familyList: [],

        confirmIllness: [],
        pastDrug: [],
        allergicHistory: []
      }
    }
  },

  activated() {
    if (this.$route.params.illnessHistory) {
      this.model.illnessHistory = this.$route.params.illnessHistory.map(item => item.value).toString()
    }

    if (this.$route.params.allergicHistory) {
      this.model.allergicHistory = this.$route.params.allergicHistory.map(item => item.value).toString()
    }
  },

  created() {
    peace.service.patient.getMyFamilyList().then(() => {
      this.source.familyList = ['家人1', '家人2']
    })
  },

  methods: {
    redirect() {
      this.$router.push({
        name: '/components/informedConsent',
        params: {
          keepAlive: false
        }
      })
    },

    afterRead(file) {
      console.log(file)
    },

    selectFamily(value) {
      this.showFamily = false
      this.model.familyId = value
    },

    selectConfirmTime(value) {
      this.showConfirmTime = false
      this.model.confirmTime = value.formatDate()
    },

    showIllnessHistory() {
      this.$router.push({
        name: '/components/addIllnessHistory',
        params: {
          keepAlive: false,
          illnessHistory: this.model.illnessHistory && this.model.illnessHistory.split(',')
        }
      })
    },

    showAllergicHistory() {
      this.$router.push({
        name: '/components/addAllergicHistory',
        params: {
          keepAlive: false,
          allergicHistory: this.model.allergicHistory && this.model.allergicHistory.split(',')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.doctor-inquiry-apply {
  height: 100%;

  .title {
    display: flex;
    align-items: center;
    height: 80px;
    padding: 0 20px;

    .title-avatar {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(241, 248, 255, 1);
        border: 1px solid rgba(221, 225, 234, 1);
      }
    }

    .title-info {
      margin: 0 0 0 20px;

      .title-doctor {
        color: #000000;
        margin: 0 0 5px 0;

        .title-doctor-name {
          font-size: 18px;
          font-weight: 600;
        }

        span {
          margin: 0 10px 0 0;
        }
      }

      .title-hospital {
        margin: 0 0 5px 0;
        color: #000000;
      }
    }
  }

  /deep/ .van-uploader__upload,
  /deep/ .van-uploader__preview-image {
    width: 50px;
    height: 50px;
  }

  /deep/ .van-radio {
    margin: 0 0 10px 0;
  }

  .divider {
    height: 10px;
    background: #f5f5f5;
  }

  .footer {
    text-align: center;
    background: #f5f5f5;
    padding: 20px 10px;

    .informed-consent {
      color: $-color--primary;
    }

    .van-checkbox {
      margin: 0 0 10px 0;
      justify-content: center;
    }
  }
}
</style>
