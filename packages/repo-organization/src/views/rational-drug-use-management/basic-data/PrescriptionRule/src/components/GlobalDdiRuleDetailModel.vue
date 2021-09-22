<template>
  <div>
    <el-form ref="ruleForm"
             label-width="auto"
             label-suffix="："
             class="q-mx-40">
      <el-form-item label="成分/成分类别">
        <div class="content-style">{{ruleInfo.ddiItemInfos}}</div>
      </el-form-item>
      <el-form-item label="相互作用的成分/成分类别">
        <div class="content-style">{{ruleInfo.ddiContraryInfos}}</div>
      </el-form-item>
      <el-form-item label="提示级别">
        <div class="content-style">
          {{ ruleInfo.warningLevel| filterDictionary(warningLevelList,'') }}
        </div>
      </el-form-item>
      <el-form-item label="提示信息">
        <div class="content-style">
          {{ruleInfo.description}}
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Service from '../service'
export default {
  props: {
    info: Object
  },
  data() {
    return {
      ruleInfo: {},
      warningLevelList: []
    }
  },
  async created() {
    this.warningLevelList = await Peace.identity.dictionary.getList('warning_level')
  },
  mounted() {
    this.$nextTick().then(() => {
      this.getDdiRuleInfoById()
    })
  },
  methods: {
    getDdiRuleInfoById() {
      const params = {
        ruleId: this.info.ruleId
      }
      Service.getDdiRuleInfoById(params).then((res) => {
        this.ruleInfo = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content-style {
  line-height: 21px;
}
::v-deep .el-form:not(.element-ui-default) .el-form-item__label {
  line-height: 21px;
}
::v-deep .el-form:not(.element-ui-default) .el-form-item {
  margin-bottom: 16px;
}
</style>