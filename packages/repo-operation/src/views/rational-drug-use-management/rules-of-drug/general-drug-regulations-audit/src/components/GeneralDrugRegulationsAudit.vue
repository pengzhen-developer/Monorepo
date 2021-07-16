<template>
  <div class="layout-route">

    <div class="flex justify-between items-center card q-mb-sm">
      <div class="flex text-grey-333 ">
        <div class="q-mr-md text-weight-bold">{{ data.drugName }}</div>
        <div class="q-mr-md">{{ data.drugCscCode }}</div>
        <div class="q-mr-md">{{ data.specifications }}</div>
        <div class="q-mr-md">{{ data.manufacturer }}</div>
      </div>
    </div>

    <div class="card q-mb-md">
      <RulesDetail v-bind:id="data.drugCscCode"
                   v-bind:drugType="'platform'"></RulesDetail>
    </div>

    <div class="card">
      <el-form label-width="auto"
               label-suffix="：">
        <el-form-item label="审核结果">
          <div class="q-mb-md">
            <el-radio name="audit"
                      v-model.trim="approvalStatus"
                      v-bind:label="'pass'">审核通过</el-radio>
            <el-radio name="audit"
                      v-model.trim="approvalStatus"
                      v-bind:label="'reject'">驳回</el-radio>
          </div>

          <div>
            <el-input type="textarea"
                      maxlength="50"
                      placeholder="请输入驳回原因，1-50字"
                      v-bind:disabled="approvalStatus === 'pass'"
                      v-model.trim="reason"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="">
        </el-form-item>
      </el-form>

      <div class="flex justify-end">
        <el-button v-on:click="back">退出审核</el-button>
        <el-button type="primary"
                   v-on:click="audit"
                   v-bind:loading="loading">提交</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import Service from './../service'

export default {
  props: {
    data: Object,
    visible: Boolean
  },

  components: {
    RulesDetail: () => import('@src/views/rational-drug-use-management/rules-of-drug/Prescription_Rule/src/RulesDetail')
  },

  data() {
    return {
      approvalStatus: 'pass',
      reason: '',
      loading: false
    }
  },

  computed: {
    internalVisible: {
      get() {
        return this.visible
      },

      set(value) {
        this.$emit('update:visible', value)
      }
    }
  },

  watch: {
    approvalStatus() {
      this.reason = ''
    }
  },

  methods: {
    audit() {
      this.validate().then(() => {
        this.loading = true

        Service.audit({ code: this.data.code, approvalStatus: this.approvalStatus, reason: this.reason })
          .then(() => {
            Peace.util.success('操作成功')

            this.back()
          })
          .finally(() => {
            this.loading = false
          })
      })
    },

    back() {
      this.internalVisible = false

      this.$emit('fecth')
    },

    validate() {
      return new Promise((resolve, reject) => {
        if (!this.approvalStatus && !this.reason) {
          Peace.util.warning('请输入驳回原因。')

          reject()
        }

        resolve()
      })
    }
  }
}
</script>

<style>
</style>