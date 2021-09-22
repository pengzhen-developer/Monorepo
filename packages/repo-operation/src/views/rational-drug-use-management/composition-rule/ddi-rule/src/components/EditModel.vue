<template>
  <div>
    <el-form v-bind:model="model"
             v-bind:rules="rules"
             ref="ruleForm"
             label-width="auto"
             label-suffix="："
             class="q-mx-lg">
      <el-form-item label="成分/成分类别"
                    prop="ddiItemList">
        <div class="item-container"
             v-on:click="addTag">
          <div v-if="model.ddiItemList.length === 0"
               class="text-color">请选择</div>
          <template v-else>
            <el-tag v-for="item in model.ddiItemList"
                    v-bind:key="item.code"
                    class="q-mr-8 q-mb-8"
                    type="info">
              {{ item.name }}
            </el-tag>
          </template>

        </div>
      </el-form-item>
      <el-form-item label="相互作用的成分/成分类别"
                    prop="ddiContraryItemList">
        <div class="item-container"
             v-on:click="addTagOther">
          <div v-if="model.ddiContraryItemList.length === 0"
               class="text-color">请选择</div>
          <template v-else>
            <el-tag v-for="item in model.ddiContraryItemList"
                    v-bind:key="item.code"
                    class="q-mr-8 q-mb-8"
                    type="info">
              {{ item.name }}
            </el-tag>
          </template>

        </div>
      </el-form-item>
      <el-form-item label="提示级别"
                    prop="warningLevel">
        <peace-select v-model="model.warningLevel"
                      style="width: 100px;">
          <el-option v-for="item in warningLevelList"
                     v-bind:key="item.label"
                     v-bind:label="item.label"
                     v-bind:value="item.value"></el-option>
        </peace-select>
      </el-form-item>
      <el-form-item label="提示信息"
                    prop="description">
        <peace-input show-word-limit
                     placeholder="请输入"
                     type="textarea"
                     maxlength="500"
                     v-model="model.description"
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
                 v-bind:disabled="saveing">{{type==='add'?'确定':'保存'}}</el-button>
    </div>

    <!-- 平台成分/成分类别 -->
    <PeaceDialog append-to-body
                 :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :visible.sync="dialog.visible"
                 title="请选择成分/成分类别"
                 v-if="dialog.visible"
                 width="600px">
      <DdiRuleChoiceDialog v-on:onSuccess="editIndication"
                           v-bind:data="dialog.data"
                           v-on:onClose="dialog.visible = false" />
    </PeaceDialog>

    <PeaceDialog append-to-body
                 :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :visible.sync="dialogOther.visible"
                 title="请选择相互作用的成分/成分类别"
                 v-if="dialogOther.visible"
                 width="600px">
      <DdiRuleChoiceDialog v-on:onSuccess="editIndicationOther"
                           v-bind:data="dialogOther.data"
                           v-on:onClose="dialogOther.visible = false" />
    </PeaceDialog>

  </div>
</template>

<script>
import Service from '../service'
import DdiRuleChoiceDialog from './DdiRuleChoiceDialog'
export default {
  props: {
    type: String,
    info: Object
  },
  components: {
    DdiRuleChoiceDialog
  },
  data() {
    // 校验药师所属部门
    let validateDdiItem = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('请选择成分/成分类别'))
      }
      callback()
    }
    // 校验药师所属部门
    let validateDdiContraryItem = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error('请选择相互作用的成分/成分类别'))
      }
      callback()
    }
    return {
      saveing: false,
      model: {
        ddiItemList: [],
        ddiContraryItemList: [],
        warningLevel: '',
        description: ''
      },
      rules: {
        warningLevel: [{ required: true, message: '请选择提示级别', trigger: 'change' }],
        description: [{ required: true, message: '请输入提示信息', trigger: 'blur' }],
        ddiItemList: [{ required: true, trigger: 'click', validator: validateDdiItem }],
        ddiContraryItemList: [{ required: true, trigger: 'blur', validator: validateDdiContraryItem }]
      },
      warningLevelList: [],
      dialog: {
        visible: false,
        data: []
      },
      dialogOther: {
        visible: false,
        data: []
      }
    }
  },
  watch: {
    'model.ddiItemList'() {
      this.$refs['ruleForm'].validateField('ddiItemList')
    },
    'model.ddiContraryItemList'() {
      this.$refs['ruleForm'].validateField('ddiContraryItemList')
    }
  },
  async created() {
    this.warningLevelList = await Peace.identity.dictionary.getList('warning_level')
    if (this.type === 'edit') {
      this.getRuleDetail()
    }
  },
  methods: {
    getRuleDetail() {
      Service.getDdiRuleInfoById({ ruleId: this.info.ruleId }).then((res) => {
        this.model.ddiItemList = res.data.ddiItemList
        this.model.ddiContraryItemList = res.data.ddiContraryItemList
        this.model.warningLevel = res.data.warningLevel
        this.model.description = res.data.description
      })
    },
    addTag() {
      this.dialog.data = []
      if (this.model.ddiItemList.length > 0) {
        const type = this.model.ddiItemList[0]?.type
        if (Number(type) === 1) {
          this.dialog.data = this.model.ddiItemList.map((item) => {
            return { type: item.type, code: item.code, cnName: item.name }
          })
        } else if (Number(type) === 2) {
          this.dialog.data = this.model.ddiItemList.map((item) => {
            return { type: item.type, atcCode: item.atcCode, classifyName: item.name }
          })
        }
      }
      this.dialog.visible = true
    },
    addTagOther() {
      this.dialogOther.data = []
      if (this.model.ddiContraryItemList.length > 0) {
        const type = this.model.ddiContraryItemList[0]?.type
        if (Number(type) === 1) {
          this.dialogOther.data = this.model.ddiContraryItemList.map((item) => {
            return { type: item.type, code: item.code, cnName: item.name }
          })
        } else if (Number(type) === 2) {
          this.dialogOther.data = this.model.ddiContraryItemList.map((item) => {
            return { type: item.type, atcCode: item.atcCode, classifyName: item.name }
          })
        }
      }
      this.dialogOther.visible = true
    },
    editIndication(data) {
      if (data && data.length > 0) {
        const type = data[0]?.type
        if (Number(type) === 1) {
          this.model.ddiItemList = data.map((item) => {
            return { type: item.type, code: item.code, name: item.cnName }
          })
        } else if (Number(type) === 2) {
          this.model.ddiItemList = data.map((item) => {
            return { type: item.type, atcCode: item.atcCode, name: item.classifyName }
          })
        }
      } else {
        this.model.ddiItemList = []
      }
      this.dialog.visible = false
    },
    editIndicationOther(data) {
      if (data && data.length > 0) {
        const type = data[0]?.type
        if (Number(type) === 1) {
          this.model.ddiContraryItemList = data.map((item) => {
            return { type: item.type, code: item.code, name: item.cnName }
          })
        } else if (Number(type) === 2) {
          this.model.ddiContraryItemList = data.map((item) => {
            return { type: item.type, atcCode: item.atcCode, name: item.classifyName }
          })
        }
      } else {
        this.model.ddiContraryItemList = []
      }
      this.dialogOther.visible = false
    },
    cancel() {
      this.$emit('cancel')
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
      let obj = {}
      const params = Peace.util.deepClone(this.model)
      obj.unionPrescriptionRulesItems = params
      if (this.type === 'add') {
        Service.addDdiRule(obj)
          .then((res) => {
            Peace.util.success(res.message)
            this.$emit('complete')
          })
          .finally(() => {
            this.saveing = false
          })
      } else {
        obj.unionPrescriptionRulesItems.ruleId = this.info.ruleId
        Service.updateDdiRule(obj)
          .then((res) => {
            Peace.util.success(res.message)
            this.$emit('complete')
          })
          .finally(() => {
            this.saveing = false
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.text-color {
  color: rgba(51, 51, 51, 0.6);
  line-height: 30px;
}
.item-container {
  border: 1px solid rgba(51, 51, 51, 0.2);
  border-radius: 4px;
  padding: 0 12px;
  cursor: pointer;
}
</style>