<template>
  <div>
    <el-form v-bind:model="model"
             ref="ruleForm"
             label-width="auto"
             label-suffix="："
             class="q-mx-48">

      <el-form-item label="ICD版本">
        <peace-select v-model="icdVersionSelected"
                      style="width: 100%;"
                      placeholder="请选择"
                      value-key="icdVersion">
          <el-option v-for="item in icdVersionList"
                     v-bind:key="item.icdVersion"
                     v-bind:label="item.icdVersionName"
                     v-bind:value="item"></el-option>
        </peace-select>
      </el-form-item>
      <el-form-item label="主要编码">
        <peace-input v-model.trim="model.icdCode"
                     placeholder="请输入"></peace-input>
      </el-form-item>
      <el-form-item label="附加编码">
        <peace-input v-model.trim="model.icdSecondCode"
                     placeholder="请输入"></peace-input>
      </el-form-item>
      <el-form-item label="诊断名称"
                    prop="wordName"
                    v-bind:rules="[{ required: true, message: '请输入诊断名称', trigger: 'blur' }]">
        <peace-input v-model.trim="model.wordName"
                     placeholder="请输入"></peace-input>
      </el-form-item>
      <el-form-item label="建议词">
        <peace-select v-model="suggestWordSelected"
                      style="width:100%"
                      remote
                      :remote-method="getSuggestWord"
                      filterable
                      value-key="diseaseCode"
                      placeholder="请输入">
          <el-option v-for="item in suggestWordList"
                     v-bind:key="item.diseaseCode"
                     v-bind:label="item.diseaseName"
                     v-bind:value="item">
          </el-option>
        </peace-select>
      </el-form-item>
      <el-form-item label="所属机构">
        <peace-select v-model="organSelected"
                      style="width: 100%;"
                      value-key="code"
                      placeholder="请选择">
          <el-option v-for="item in organList"
                     v-bind:key="item.code"
                     v-bind:label="item.name"
                     v-bind:value="item"></el-option>
        </peace-select>
      </el-form-item>
      <el-form-item label="补充说明">
        <peace-input show-word-limit
                     placeholder="请输入"
                     type="textarea"
                     maxlength="50"
                     v-model="model.remark"
                     resize="none"
                     v-bind:autosize="{
                           minRows: 3, maxRows: 6
                        }"></peace-input>
      </el-form-item>
    </el-form>
    <div class="flex justify-end full-width q-pt-12">
      <el-button v-on:click="cancel">取消</el-button>
      <el-button type="primary"
                 v-on:click="submit"
                 v-bind:disabled="saveing">确认提交</el-button>
    </div>

  </div>
</template>

<script>
import Service from '../service/index'
export default {
  props: {
    type: String,
    info: Object
  },
  components: {},
  data() {
    return {
      saveing: false,
      model: {
        icdCode: '',
        icdSecondCode: '',
        wordName: '',
        remark: '',
        channelCode: '002',
        dictionaryType: 'D0308005'
      },
      icdVersionSelected: undefined,
      suggestWordSelected: undefined,
      organSelected: undefined,
      icdVersionList: [],
      suggestWordList: [],
      organList: []
    }
  },

  created() {
    this.getIcdVersion()
    this.getOrganList()

    if (this.type === 'edit') {
      this.icdVersionSelected = {}
      this.suggestWordSelected = {}
      this.organSelected = {}
      this.getDetail()
    }
  },
  methods: {
    getDetail() {
      Service.getWordDetail({ id: this.info.id }).then((res) => {
        this.icdVersionSelected.icdVersionName = res.data.icdVersionName
        this.icdVersionSelected.icdVersion = res.data.icdVersionCode
        this.suggestWordSelected.diseaseCode = res.data.rangeCode
        this.suggestWordSelected.diseaseName = res.data.rangeName
        this.organSelected.code = res.data.organCode
        this.organSelected.name = res.data.organName
        this.model.icdCode = res.data.icdCode
        this.model.icdSecondCode = res.data.icdSecondCode
        this.model.wordName = res.data.wordName
        this.model.remark = res.data.remark
        if (this.suggestWordSelected.diseaseName) {
          this.getSuggestWord(this.suggestWordSelected.diseaseName)
        }
      })
    },
    getIcdVersion() {
      Service.getIcdVersion({ channelCode: '002' }).then((res) => {
        this.icdVersionList = res.data
      })
    },
    getOrganList() {
      Service.getOrganList({}).then((res) => {
        this.organList = res.data
      })
    },
    getSuggestWord(query = '') {
      Service.getSuggestWord({ keyWord: query, page: 1, size: 500 }).then((res) => {
        this.suggestWordList = res.data.pageData
      })
    },
    submit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.save()
        } else {
          return false
        }
      })
    },
    save() {
      this.saveing = true
      const params = Peace.util.deepClone(this.model)
      params.icdVersionName = this.icdVersionSelected?.icdVersionName ?? ''
      params.icdVersionCode = this.icdVersionSelected?.icdVersion ?? ''
      params.rangeCode = this.suggestWordSelected?.diseaseCode ?? ''
      params.rangeName = this.suggestWordSelected?.diseaseName ?? ''
      params.organCode = this.organSelected?.code ?? ''
      params.organName = this.organSelected?.name ?? ''
      if (this.type === 'add') {
        Service.save(params)
          .then((res) => {
            Peace.util.success(res.message)
            this.$emit('complete')
          })
          .finally(() => {
            this.saveing = false
          })
      } else {
        params.id = this.info.id
        Service.update(params)
          .then((res) => {
            Peace.util.success(res.message)
            this.$emit('complete')
          })
          .finally(() => {
            this.saveing = false
          })
      }
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>