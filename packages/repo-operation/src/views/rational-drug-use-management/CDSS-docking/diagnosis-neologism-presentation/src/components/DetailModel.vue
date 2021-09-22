<template>
  <div>
    <el-form ref="ruleForm"
             label-width="auto"
             label-suffix="："
             class="q-mx-40">
      <div class="row items-center justify-center q-mb-30">
        <el-image :src="showIcon"></el-image>
        <div class="info-style"
             v-bind:style="{'color':showBackgroundColor}"> {{ dataInfo.wordStatus| getEnumLabel(source.wordStatus,'') }}</div>
      </div>
      <el-form-item label="驳回原因"
                    v-if="dataInfo.wordStatus=='1'">
        <div class="content-style"> {{dataInfo.reason}}</div>
      </el-form-item>
      <template v-if="dataInfo.wordStatus=='2'||dataInfo.wordStatus=='3'">
        <el-form-item label="主词ID">
          <div class="content-style"> {{dataInfo.subjectId}}</div>
        </el-form-item>
        <el-form-item label="主词名称">
          <div class="content-style">{{dataInfo.subjectName}}</div>
        </el-form-item>
      </template>
      <el-divider v-if="dataInfo.wordStatus=='1'||dataInfo.wordStatus=='2'||dataInfo.wordStatus=='3'"></el-divider>
      <el-form-item label="ICD版本">
        <div class="content-style">
          {{dataInfo.icdVersionName}}
        </div>
      </el-form-item>
      <el-form-item label="主要编码">
        <div class="content-style">
          {{dataInfo.icdCode}}
        </div>
      </el-form-item>
      <el-form-item label="附加编码">
        <div class="content-style">
          {{dataInfo.icdSecondCode}}
        </div>
      </el-form-item>
      <el-form-item label="诊断名称">
        <div class="content-style">
          {{dataInfo.wordName}}
        </div>
      </el-form-item>
      <el-form-item label="建议词">
        <div class="content-style">
          {{dataInfo.rangeName}}
        </div>
      </el-form-item>
      <el-form-item label="所属机构">
        <div class="content-style">
          {{dataInfo.organName}}
        </div>
      </el-form-item>
      <el-form-item label="补充说明">
        <div class="content-style">
          {{dataInfo.remark}}
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import CONSTANT from '../constant'
import Service from '../service'
export default {
  props: {
    info: Object
  },
  data() {
    return {
      showIcon: '',
      showBackgroundColor: '',
      dataInfo: {},
      source: {
        wordStatus: [],
        STATUS: CONSTANT.STATUS
      }
    }
  },
  filters: {
    getEnumLabel: (value, ENUM) => {
      return ENUM.find((item) => item.value == value)?.label
    }
  },
  async created() {
    this.source.wordStatus = await Peace.identity.dictionary.getList('cdss_word_status')
  },
  mounted() {
    this.$nextTick().then(() => {
      this.getDetail()
    })
  },
  methods: {
    getDetail() {
      const params = {
        id: this.info.id
      }
      Service.getWordDetail(params).then((res) => {
        this.dataInfo = res.data
        this.getIcon()
        this.tagBackgroundColor()
      })
    },
    getIcon() {
      const status = this.dataInfo.wordStatus
      this.showIcon = require(`../assets/images/icon${status}.png`)
    },
    tagBackgroundColor() {
      const status = this.dataInfo.wordStatus
      this.showBackgroundColor = this.source.STATUS[`status${status}`].color
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
::v-deep .el-divider {
  background-color: #e9e9e9;
}
.info-style {
  font-size: 24px;
  line-height: 28px;
  margin-left: 8px;
}
</style>