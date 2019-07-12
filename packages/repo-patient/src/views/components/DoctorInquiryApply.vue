<template>
  <div class="doctor-inquiry-apply">
    <div class="title">
      <div class="title-avatar">
        <img :src="doctor.doctorInfo.avartor" />
      </div>

      <div class="title-info">
        <div class="title-doctor">
          <span class="title-doctor-name">{{ doctor.doctorInfo.name }}</span>
          <span>{{ doctor.doctorInfo.doctorTitle }}</span>
          <span>{{ doctor.doctorInfo.deptName }}</span>
        </div>
        <div class="title-hospital">
          <span>{{ doctor.doctorInfo.hospitalName }}</span>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <van-cell-group>
      <van-field :value="model.familyName" @click="showFamily = true" clickable label="就诊人" placeholder="请选择就诊人" readonly required right-icon="arrow" />
      <van-popup position="bottom" v-model="showFamily">
        <van-picker :columns="source.familyList" @cancel="showFamily = false" @confirm="selectFamily" show-toolbar value-key="name" />
      </van-popup>
    </van-cell-group>

    <van-cell-group>
      <van-field
        autosize
        label="病情描述"
        maxlength="255"
        placeholder="请输入病情描述，如发病时间、主要病症、治疗经过、目前状况等，最少输入5字。"
        required
        rows="5"
        type="textarea"
        v-model="model.illnessDescribe"
      />
    </van-cell-group>

    <van-cell-group>
      <van-field label="附件上传">
        <van-uploader :after-read="afterRead" :max-count="4" multiple slot="input" v-model="attachment" />
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
        <van-field :value="model.confirmIllness" @click="showAddIllnessHistory = true" clickable label="确认病种" placeholder="请选择诊断" readonly right-icon="arrow" />
        
        <peace-dialog :visible.sync="showAddIllnessHistory">
          <AddIllnessHistory @onSave="showAddIllnessHistory = false" v-model="model.confirmIllness"></AddIllnessHistory>
        </peace-dialog>
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
        <van-field :value="model.allergicHistory" @click="showAddAllergicHistory= true" clickable label="过敏史" placeholder="请选择过敏史" readonly right-icon="arrow" />

        <peace-dialog :visible.sync="showAddAllergicHistory">
          <AddAllergicHistory @onSave="showAddAllergicHistory = false" v-model="model.allergicHistory"></AddAllergicHistory>
        </peace-dialog>
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
      <van-button :disabled="!model.informedConsent" @click="apply" style="width: 100%;" type="primary">保存</van-button>
    </div>
  </div>
</template>

<script>
import peace from '@src/library'

import AddAllergicHistory from '@src/views/components/AddAllergicHistory'
import AddIllnessHistory from '@src/views/components/AddIllnessHistory'

export default {
  components: {
    AddAllergicHistory,
    AddIllnessHistory
  },

  data() {
    return {
      // 显示确认病种
      showAddAllergicHistory: false,
      // 显示过敏史
      showAddIllnessHistory: false,

      // 显示家人弹框
      showFamily: false,
      // 显示确认时间弹框
      showConfirmTime: false,
      // 附件列表
      attachment: [],

      // 医生信息
      doctor: {
        doctorInfo: {}
      },

      model: {
        // 医生 (医生 ID)
        doctorId: '',
        // 就诊人 (家人 ID)
        familyName: '',
        familyId: '',
        // 问诊类型
        consultingType: 'image',
        // 问诊类型
        consultingTypeId: '',
        // 病情描述
        illnessDescribe: '',
        // 附件
        attachment: [],
        // 是否复诊
        isAgain: false,
        // 确认疾病(既往史)
        confirmIllness: '',
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
    if (this.$route.params.confirmIllness) {
      this.model.confirmIllness = this.$route.params.confirmIllness.map(item => item.value).toString()
    }

    if (this.$route.params.allergicHistory) {
      this.model.allergicHistory = this.$route.params.allergicHistory.map(item => item.value).toString()
    }
  },

  created() {
    const params = JSON.parse(window.atob(this.$route.params.json))
    this.model.doctorId = params.doctorId
    this.model.consultingType = params.consultingType
    this.model.consultingTypeId = params.consultingTypeId

    peace.service.doctor.getDoctorInfo(params).then(res => {
      this.doctor = res.data
    })

    peace.service.patient.getMyFamilyList().then(res => {
      this.source.familyList = res.data
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

    selectFamily(familyObject) {
      this.showFamily = false
      this.model.familyName = familyObject.name
      this.model.familyId = familyObject.id
    },

    selectConfirmTime(value) {
      this.showConfirmTime = false
      this.model.confirmTime = value.formatDate()
    },

    showIllnessHistory() {
      this.showAddIllnessHistory = true
    },

    showAllergicHistory() {
      this.showAddAllergicHistory = true
    },

    apply() {
      this.uploadHandler().then(() => {
        this.applyHandler()
      })
    },

    uploadHandler() {
      if (this.attachment.length > 0) {
        const params = new FormData()

        for (var i = 0; i < this.attachment.length; i++) {
          params.append('file[]', this.attachment[i].file)
        }
        params.append('source', 'inquiryApply')

        return peace.service.inquiry.images(params).then(res => {
          this.model.attachment = res.data
        })
      } else {
        return new Promise(resolve => {
          resolve()
        })
      }
    },

    applyHandler() {
      const params = this.model

      // 验证必填
      if (!this.model.familyName) {
        return peace.util.alert('请选择就诊人')
      }
      if (!(this.model.illnessDescribe && this.model.illnessDescribe.length >= 5)) {
        return peace.util.alert('请输入不少于5个字的病情描述')
      }

      peace.service.inquiry.apply(params).then(res => {
        if (res.data.errorState !== 0) {
          peace.util.alert(res.msg)
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
