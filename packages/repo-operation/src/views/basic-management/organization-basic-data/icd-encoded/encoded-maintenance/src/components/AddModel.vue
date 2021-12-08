<template>
  <div class="q-mx-16">
    <el-form v-bind:model="model"
             ref="ruleForm"
             label-suffix="："
             label-width="auto">
      <el-form-item label="ICD版本">
        <peace-select v-model="model.icdVersionSelected"
                      style="width: 100%;"
                      placeholder="请选择"
                      value-key="icdVersion">
          <el-option v-for="item in icdVersionList"
                     v-bind:key="item.icdVersion"
                     v-bind:label="item.icdVersionName"
                     v-bind:value="item"></el-option>
        </peace-select>
      </el-form-item>
      <div class="flex justify-end full-width q-pt-24">
        <el-button v-on:click="cancel">取消</el-button>
        <el-button type="primary"
                   v-on:click="save"
                   v-bind:loading="loading">保存</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import Service from '../service/index'
export default {
  props: {
    info: Object
  },
  data() {
    return {
      model: {
        icdVersionSelected: undefined
      },
      icdVersionList: [],
      loading: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getIcdVersion()
    })
  },
  methods: {
    getIcdVersion() {
      Service.getIcdVersion({ channelCode: '002' }).then((res) => {
        this.icdVersionList = res.data
        if (this.info.icdInfo.icdVersion) {
          this.model.icdVersionSelected = {}
          const flag = this.icdVersionList.some((item) => {
            return item.icdVersion === this.info.icdInfo.icdVersion
          })
          if (flag) {
            this.model.icdVersionSelected.icdVersion = this.info.icdInfo.icdVersion
            this.model.icdVersionSelected.icdVersionName = this.info.icdInfo.icdVersionName
          } else {
            this.model.icdVersionSelected.icdVersion = ''
            this.model.icdVersionSelected.icdVersionName = ''
          }
        }
      })
    },
    cancel() {
      this.$emit('close')
    },
    save() {
      this.loading = true
      const params = {
        code: this.info.orgCode,
        icdVersion: this.model.icdVersionSelected?.icdVersion ?? '',
        icdVersionName: this.model.icdVersionSelected?.icdVersionName ?? ''
      }
      Service.updateIcdVersion(params)
        .then((res) => {
          Peace.util.success(res.message)
          this.$emit('finish')
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input:not(.element-ui-default).el-input--mini .el-input__inner {
  padding: 0 24px 0 12px;
}
</style>