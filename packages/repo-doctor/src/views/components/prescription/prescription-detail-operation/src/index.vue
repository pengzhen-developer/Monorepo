<!--
 * @Description: 处方详情（互联网医院） - 处方操作
-->

<template>
  <div class="peace-prescription-operation">
    <!-- 【质疑中】：可进行【不接受，再次署名】 -->
    <el-button v-if="['2'].includes(data?.prescriptionStatus)"
               v-on:click="reject"
               v-bind:disabled="loading">不接受，再次署名</el-button>
    <!-- 【质疑中】、【待审核】、【已通过】且【未划价】：可进行【作废，重新开处方】 -->
    <el-button type="primary"
               v-if="['1', '2', '5'].includes(data?.prescriptionStatus) && data?.voidPrescriptionTag === 1"
               v-on:click="accept"
               v-bind:disabled="loading">作废，重新开处方</el-button>

    <!-- 坚持开处方 -->
    <PeaceDialog absolute-center
                 append-to-body
                 width="400px"
                 height="300px"
                 title="再次提交"
                 v-if="confirmVisible"
                 v-bind:show-close="false"
                 v-bind:visible="confirmVisible">
      <div class="el-dialog__body">
        <div class="text-center q-px-xl">
          <div class="text-center q-mb-md">确认坚持开具该处方？</div>
          <el-form ref="form"
                   space-none
                   label-width="auto"
                   v-bind:model="model"
                   v-bind:rules="rules"
                   style="height: 40px;">
            <el-form-item label="原因："
                          prop="refuseReason">
              <el-input v-model="model.refuseReason"
                        maxlength="120"
                        placeholder="请输入..."></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="el-dialog__footer">
        <el-button plain
                   v-on:click="rejectCancel">取消</el-button>
        <el-button type="primary"
                   v-bind:disabled="loading"
                   v-on:click="rejectConfirm">
          确定
        </el-button>
      </div>
    </PeaceDialog>
  </div>
</template>

<script>
import Service from './service'

export default {
  name: 'PeacePrescriptionOperation',

  props: {
    data: Object
  },

  data() {
    return {
      auditVisible: false,
      originVisible: false,
      confirmVisible: false,

      model: {
        prescriptionId: '',
        refuseReason: ''
      },

      rules: {
        refuseReason: [{ required: true, message: '请输入原因' }]
      },

      source: {
        prescriptionStatus: []
      },

      loading: false
    }
  },

  methods: {
    close() {
      this.auditVisible = false
      this.originVisible = false
      this.confirmVisible = false
    },

    /**
     * @description: 不接受，再次署名
     * @param {*}
     * @return {*}
     */
    reject() {
      this.confirmVisible = true
      this.model.refuseReason = ''
    },

    /**
     * @description: 不接受，再次署名 => 取消操作
     * @param {*}
     * @return {*}
     */
    rejectCancel() {
      this.confirmVisible = false
      this.model.refuseReason = ''
    },

    /**
     * @description: 不接受，再次署名 => 确认操作
     * @param {*}
     * @return {*}
     */
    rejectConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true

          this.usePrescription()
            .then((res) => {
              Peace.util.success(res.msg)

              this.close()

              this.$listeners.reject && this.$listeners.reject.call(this)
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },

    /**
     * @description: 作废，重新开处方
     * @param {*}
     * @return {*}
     */
    accept() {
      this.$confirm('重新开具处方后原处方将自动作废，确定是否重新开具？', '重新开方', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        // 1，作废处方
        // 2，跳转开处方页面

        this.loading = true

        this.voidPrescription()
          .then((res) => {
            if (res.data.voidStatus == 2) {
              this.$alert('当前处方患者已划价/缴费，无法作废，若需作废，请联系患者退费后重开处方', '提示')
            } else {
              Peace.util.success(res.msg)

              // 【待审核】、【已通过】 -> 确认作废 -> 关闭弹框，通知父级组件
              // 【质疑中】 -> 确认作废 -> 跳转处方来源页
              this.close()

              this.$listeners.accept && this.$listeners.accept.call(this)

              if (this.data.prescriptionStatus === '2') {
                this.redirectToOriginal()
              }
            }
          })
          .finally(() => {
            this.loading = false
          })
      })
    },

    voidPrescription() {
      this.model.prescriptionId = this?.data?.prescriptionId

      return Service.voidPrescription(this.model)
    },

    usePrescription() {
      this.model.prescriptionId = this?.data?.prescriptionId

      return Service.usePrescription(this.model)
    },

    redirectToOriginal() {
      // 获取处方来源，根据处方来源跳转
      Service.getBackInfo(this.model).then((res) => {
        if (res.data.backInfo.prescriptionSource === 0) {
          // 复诊处方被质疑，跳转复诊，根据 patientId 选中患者
          this.$router.push({ name: 'ClinicReturnVisit', params: { patientId: res.data.backInfo.familyId } })
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