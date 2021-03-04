<template>
  <div>
    <RecipeDetail class="q-pa-32"
                  v-bind:data="data"></RecipeDetail>

    <div v-if="showReply"
         class="text-center q-mb-lg">
      <el-button v-on:click="reject">不接受，再次署名</el-button>
      <el-button type="primary"
                 v-on:click="accept">作废，重新开处方</el-button>
    </div>

    <PeaceDialog absolute-center
                 width="400px"
                 v-if="visible"
                 v-bind:show-close="false"
                 v-bind:visible="visible">
      <div class="text-center q-px-xl q-pt-none q-pb-lg">
        <div class="text-center q-mb-lg">确认坚持开具该处方？</div>
        <el-form ref="form"
                 label-width="auto"
                 v-bind:model="model"
                 v-bind:rules="rules">
          <el-form-item label="原因"
                        prop="refuseReason">
            <el-input v-model="model.refuseReason"
                      maxlength="300"
                      placeholder="请输入..."></el-input>
          </el-form-item>
        </el-form>

        <div class="text-center">
          <el-button plain
                     v-on:click="rejectCancel">取消</el-button>
          <el-button type="primary"
                     v-on:click="rejectConfirm">
            确定
          </el-button>
        </div>
      </div>
    </PeaceDialog>
  </div>
</template>

<script>
import Service from './../service'
import RecipeDetail from '@src/views/components/recipe/RecipeDetail'

export default {
  props: {
    prescriptionId: {
      type: String
    }
  },

  components: {
    RecipeDetail
  },

  data() {
    return {
      data: {},

      showReply: false,

      visible: false,

      model: {
        prescriptionId: this.prescriptionId,
        refuseReason: ''
      },

      rules: {
        refuseReason: [{ required: true, message: '请输入原因' }]
      }
    }
  },

  created() {
    this.fetch()
  },

  methods: {
    fetch() {
      Service.getPrescripInfo({ prescriptionId: this.prescriptionId }).then((res) => {
        this.data = res.data

        this.showReply = this.data.Prescription === '2'
      })
    },

    /**
     * 不接受，再次署名
     */
    reject() {
      this.visible = true
      this.refuseReason = ''
    },

    rejectCancel() {
      this.visible = false
      this.refuseReason = ''
    },

    rejectConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          Service.usePrescription(this.model).then((res) => {
            Peace.util.success(res.msg)

            this.rejectCancel()
            this.fetch()
          })
        }
      })
    },

    /**
     * 作废，重新开处方
     */
    accept() {
      this.$confirm('重新开具处方后原处方将自动作废，确定是否重新开具？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        // 1，作废处方
        // 2，跳转开处方页面

        this.voidPrescription().then((res) => {
          Peace.util.success(res.msg)

          this.fetch()

          this.redirectToOriginal()
        })
      })
    },

    voidPrescription() {
      return Service.voidPrescription(this.model)
    },

    redirectToOriginal() {
      // 获取处方来源，根据处方来源跳转
      Service.getBackInfo(this.model).then((res) => {
        if (res.data.backInfo.prescriptionSource === 0) {
          // 复诊处方被质疑，跳转复诊，根据 patientId 选中患者
          this.$router.push({ name: 'ClinicReturnVisit', params: { patientId: res.data.backInfo.patientId } })
        } else if (res.data.backInfo.prescriptionSource === 1) {
          // 面诊处方被质疑，跳转面诊，根据 patientNo 选中患者
          this.$router.push({ name: 'ClinicfaceToFace', params: { patientNo: res.data.backInfo.patientNo } })
        }
      })
    }
  }
}
</script>

<style>
</style>