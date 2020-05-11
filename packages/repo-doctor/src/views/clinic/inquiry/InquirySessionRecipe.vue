<template>
  <div>
    <el-alert :closable="false"
              title="开处方"
              type="success">
      <div slot="title">
        <span>开处方</span>
        <i @click="close"
           class="el-alert__closebtn el-icon-close"></i>
      </div>
    </el-alert>

    <div class="perscription">
      <h4>疾病诊断</h4>
      <div>
        <span>{{ drug.diagnose }}</span>
      </div>

      <h4>过敏史</h4>
      <div>
        <span>{{ drug.allergy_history || '无' }}</span>
      </div>
      <hr />

      <h4>
        <span>处方药品</span>
        <span style="color: #9B9B9B">（最多可添加 5 种药品）</span>
      </h4>

      <DrugSelect ref="drugSelect"
                  v-bind:max-count="5"></DrugSelect>

      <div style="text-align: center; margin: 30px 0 0 0;">
        <el-button @click="close">取消</el-button>
        <el-button @click="sendPrescription"
                   type="primary">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import DrugSelect from './DrugSelect'
import peace from '@src/library'

export default {
  components: {
    DrugSelect
  },

  data() {
    return {
      drug: {
        diagnose: '',
        allergy_history: ''
      }
    }
  },

  created() {
    const paramsForCase = {
      inquiry_no: this.$store.getters['inquiry/inquiryInfo'].inquiryNo
    }
    peace.service.inquiry.getCase(paramsForCase).then(res => {
      this.drug.diagnose = res.data.diagnose
      this.drug.allergy_history = res.data.allergy_history
    })
  },

  methods: {
    sendPrescription() {
      const validObject = this.$refs.drugSelect.valid()

      if (validObject.isValid === false) {
        peace.util.warning(validObject.message)
      } else {
        const drugsJson = this.$refs.drugSelect.getModel()

        if (drugsJson.length < 1) {
          peace.util.warning('请添加处方药品')

          return
        }

        const params = {
          openId: this.$store.state.user.userInfo.list.docInfo.openid,
          inquiry_no: this.$store.getters['inquiry/inquiryInfo'].inquiryNo,
          family_id: this.$store.getters['inquiry/patientInfo'].familyId,
          diagnose: this.drug.diagnose,
          allergy_history: this.drug.allergy_history,
          drugsJson: JSON.stringify(drugsJson)
        }

        peace.service.prescribePrescrip.subPrescrip(params).then(res => {
          peace.util.alert(res.msg)

          $peace.inquiryComponent.$emit(peace.type.INQUIRY.INQUIRY_ACTION.重置操作)
        })
      }
    },

    close() {
      peace.util.confirm('确定要退出处方吗？当前所有数据将会被清除!', undefined, undefined, () => {
        $peace.inquiryComponent.$emit(peace.type.INQUIRY.INQUIRY_ACTION.重置操作)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.perscription {
  margin: 10px 10px 0 10px;
}

.drug-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}

.el-alert__title {
  /deep/ .el-alert__closebtn {
    font-size: 16px;
  }
}

h4 {
  margin: 10px 0 10px 0;
}
</style>
