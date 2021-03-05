<template>

  <van-popup v-model="show"
             @click-overlay="cancel"
             round
             position="bottom">

    <div class="header">请选择您的医保类型</div>
    <div class="content">
      <div class="title">医保类型</div>
      <div class="tag-yibao-list">
        <span class="tag-yibao"
              :class="{'active':model.medicalTreatmentType==type.label?true:false}"
              @click="selectType(type)"
              v-for="type in source.medicalTreatmentType"
              :key="type.lable">{{type.name}}</span>
      </div>
      <div class="diseases"
           v-show="model.medicalTreatmentType==='2'">
        <div>疾病类型</div>
        <div @click="showDiseasesPop">{{model.diseases||'请选择'}}
          <van-icon name="arrow"
                    color="#00C6AE" />
        </div>
      </div>
    </div>
    <div class="footer">
      <van-button round
                  @click="cancel">取消</van-button>
      <van-button round
                  @click="submit"
                  :disabled="loading"
                  :loading="loading">保存</van-button>
    </div>
    <!-- 疾病类型 -->
    <van-popup position="bottom"
               v-model="diseasesDialog.visible">
      <van-picker :columns="source.diseases"
                  value-key="name"
                  @cancel="closeDiseasesPop"
                  @confirm="selectDiseases"
                  show-toolbar />
    </van-popup>
  </van-popup>
</template>

<script>
import peace from '@src/library'
export default {
  name: 'YiBaoTypeSelect',
  model: {
    prop: 'showModel',
    event: 'changeSelectYiBaoTypeDialog'
  },
  props: {
    showModel: {
      type: Boolean,
      required: true
    },
    medCardId: {
      type: String,
      required: true
    }
  },
  watch: {
    showModel: {
      handler(val) {
        if (val) {
          this.show = val
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      show: false,
      medCardNo: '',
      loading: false,
      model: {
        medicalTreatmentType: '',
        medicalTreatmentTypeText: '',
        diseases: '',
        diseaseCode: ''
      },
      diseasesDialog: {
        visible: false
      },
      source: {
        medicalTreatmentType: [],
        diseases: []
      }
    }
  },

  created() {
    this.getDicList()
  },
  methods: {
    showDiseasesPop() {
      this.diseasesDialog.visible = true
    },
    closeDiseasesPop() {
      this.model.diseases = ''
      this.model.diseaseCode = ''
      this.diseasesDialog.visible = false
    },
    selectDiseases(data) {
      this.model.diseases = data.name
      this.model.diseaseCode = data.label
      this.diseasesDialog.visible = false
    },
    selectType(type) {
      this.model.medicalTreatmentType = type.label
      this.model.medicalTreatmentTypeText = type.name
    },
    cancel() {
      this.show = false
      this.$emit('changeSelectYiBaoTypeDialog', false)

      this.$emit('onCancel', { checked: false })
    },
    canSubmit() {
      if (this.model.medicalTreatmentType === '1') {
        return true
      } else if (this.model.medicalTreatmentType === '') {
        peace.util.alert('请选择医保类型')
        return false
      } else {
        if (this.model.diseases == '') {
          peace.util.alert('请选择疾病类型')
          return false
        } else {
          return true
        }
      }
    },
    getDicList() {
      const params = {}
      peace.service.yibao.GetMedicareCardType(params).then((res) => {
        this.source.medicalTreatmentType = res.data.medicalTreatmentType
        this.source.diseases = res.data.diseases
      })
    },

    submit() {
      const result = this.canSubmit()
      if (!result) {
        return false
      }
      this.loading = true
      const params = peace.util.deepClone(this.model)
      params.id = this.medCardId
      peace.service.yibao
        .UpdateMedicareCardType(params)
        .then(() => {
          const yibaoInfo = {
            yibaoTypeText: this.model.diseases ? `${this.model.medicalTreatmentTypeText}-${this.model.diseases}` : `${this.model.medicalTreatmentTypeText}`,
            ...params
          }
          this.show = false
          this.$emit('changeSelectYiBaoTypeDialog', false)
          this.$emit('onSuccess', { checked: true, yibaoInfo: yibaoInfo })
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.van-popup {
  width: 100%;
  padding: 20px 16px 24px 16px;
  background: #fff;
  border-radius: 16px 16px 0px 0px;
  .header {
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 24px;
    margin-bottom: 20px;
    text-align: center;
  }
  .content {
    height: 299px;
    .tag-yibao-list {
      padding: 14px 0;
      .tag-yibao {
        width: 114px;
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        line-height: 20px;
        text-align: center;
        font-family: PingFangSC-Regular, PingFang SC;
        padding: 6px 15px;
        display: inline-block;
        background: rgba(51, 51, 51, 0.05);
        border-radius: 16px;
        border: 1px solid rgba(51, 51, 51, 0.05);
        &.active {
          background: rgba(0, 198, 174, 0.1);
          border: 1px solid #00c6ae;
          color: #00c6ae;
        }
        &:not(:last-child) {
          margin-right: 16px;
        }
        &:not(:first-child) {
          width: 86px;
        }
      }
    }
    .diseases {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(0, 198, 174, 0.1);
      padding: 13px 16px;
      border-radius: 10px;
      margin-top: 14px;
      color: #00c6ae;
      font-size: 16px;
      line-height: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      opacity: 0.4;
      position: relative;
      > div {
        display: flex;
        align-items: center;
        .van-icon {
          margin-left: 5px;
        }
      }
      &::before {
        content: '';
        left: 50%;
        top: -12px;
        transform: translateX(-50%);
        position: absolute;
        width: 0;
        height: 0;
        border-left: 12px solid transparent;
        border-right: 12px solid transparent;
        border-bottom: 12px solid rgba(0, 198, 174, 0.1);
      }
    }
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .van-button {
      width: 155px;
      height: 48px;
      background: rgba(51, 51, 51, 0.05);
      border-radius: 26px;
      &:first-child {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 24px;
      }
      &:last-child {
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #00c6ae;
        line-height: 24px;
      }
    }
  }
}
</style>