<template>
  <div v-loading="loading"
       style="min-height: 200px">
    <el-form v-show="!loading"
             label-position="right"
             label-suffix="："
             label-width="110px"
             size="mini">

      <el-form-item label="调用渠道">
        <span>{{ model.channel }}</span>
      </el-form-item>

      <el-form-item label="处方编号">
        <span>{{ model.jztClaimNo }}</span>
      </el-form-item>

      <el-form-item label="原始处方编号">
        <span>{{ model.prescriptionNo }}</span>
      </el-form-item>

      <el-form-item label="调用时间">
        <span>{{ model.updateTime }}</span>
      </el-form-item>

      <el-form-item label="异常类型">
        <span>{{ model.errorType | filterDictionary(source.errorTypeList,'--')  }}</span>
      </el-form-item>

      <el-form-item label="异常原因">
        <span>{{ model.errorMsg }}</span>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import Service from '../service/index'
export default {
  name: 'ExceptionLogDetail',
  props: {
    id: {
      type: String,
      default: ''
    }
  },

  async mounted() {
    this.source.errorTypeList = await Peace.identity.dictionary.getList('prescription_operation_log')

    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  data() {
    return {
      model: {
        jztClaimNo: undefined,
        errorMsg: undefined,
        prescriptionNo: undefined,
        errorType: undefined,
        channel: undefined,
        updateTime: undefined
      },
      loading: true,
      source: {
        errorTypeList: []
      }
    }
  },

  methods: {
    fetch() {
      this.loading = true
      Service.getLogDetail({ id: this.id })
        .then((res) => {
          this.model = res.data
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item__label {
  color: var(--q-color-grey-666) !important;
}

::v-deep .el-form-item {
  margin-bottom: 8px !important;
}

::v-deep .el-form:not(.element-ui-default) .el-form-item__content {
  line-height: 20px !important;
  color: var(--q-color-grey-333) !important;
}

::v-deep .el-form:not(.element-ui-default) .el-form-item__label {
  line-height: 20px !important;
}
</style>