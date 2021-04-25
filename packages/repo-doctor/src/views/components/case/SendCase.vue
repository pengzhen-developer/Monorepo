<template>
  <div>
    <el-form space-sm
             label-position="right"
             label-width="auto"
             ref="form"
             v-bind:model="model">
      <el-row>
        <el-form-item label="写病历：">
          <el-select v-on:change="changeTemplate"
                     v-model="template.aliverId">
            <el-option key="base"
                       label="通用模板"
                       value=""></el-option>
            <el-option v-bind:key="type.templateName"
                       v-bind:label="type.templateName"
                       v-bind:value="type.templateId"
                       v-for="type in template.list"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="就诊时间：">
          <span>{{ new Date().formatDate() }}</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="科别："
                      prop="dep_id">
          <span>{{ $store.state.user.userInfo.list.docInfo.netdept_child }}</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item required=""
                      label="主诉："
                      prop="baseIllness"
                      v-bind:show-message="false">
          <el-input placeholder
                    type="textarea"
                    v-bind:rows="3"
                    v-model="model.baseIllness"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="现病史："
                      prop="presentHistoryList">
          <QuickSelectDiagnose allow-create
                               class="full-width"
                               v-model="model.presentHistoryList"></QuickSelectDiagnose>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="过敏史："
                      prop="allergyHistoryList">
          <QuickSelectAllergyHistory allow-create
                                     class="full-width"
                                     v-model="model.allergyHistoryList"></QuickSelectAllergyHistory>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="既往史："
                      prop="pastHistoryList">
          <QuickSelectDiagnoseHistory allow-create
                                      class="full-width"
                                      v-model="model.pastHistoryList"></QuickSelectDiagnoseHistory>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="检查指标：">
          <div class="inspect">
            <div class="item">
              <span>体温</span>
              <el-input placeholder
                        v-model="model.inspectionIndex.temperature"></el-input>
              <span>度</span>
            </div>
            <div class="item">
              <span>体重</span>
              <el-input placeholder
                        v-model="model.inspectionIndex.weight"></el-input>
              <span>kg</span>
            </div>
            <div class="item">
              <span>心率</span>
              <el-input placeholder
                        v-model="model.inspectionIndex.heart_rate"></el-input>
              <span>bpm</span>
            </div>
            <div class="item">
              <span>血压</span>
              <el-input placeholder
                        v-model="blood_pressure_begin"></el-input>/
              <el-input placeholder
                        v-model="blood_pressure_end"></el-input>
              <span>mmHg</span>
            </div>
          </div>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="辅助检查：">
          <el-input :rows="3"
                    placeholder="请输入辅助检查"
                    type="textarea"
                    v-model="model.inspectionIndex.More"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item required=""
                      label="诊断："
                      prop="diagnoseList"
                      v-bind:show-message="false"
                      v-bind:rules="[ { type: 'array' }]">
          <QuickSelectDiagnose class="full-width"
                               v-model="model.diagnoseList"></QuickSelectDiagnose>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="医嘱小结："
                      prop="summary">
          <el-input placeholder
                    v-model="model.summary"></el-input>
        </el-form-item>
      </el-row>

      <el-row v-if="template.aliverId === 'ldqonaubvy'">
        <el-form-item prop="summary">
          <span class="primary"
                slot="label">其他检查：</span>
          <div class="inspect small-text">
            <div class="item">
              <span>谷丙转氨酶(ALT)</span>
              <el-input placeholder
                        v-model="model.ALT"></el-input>
              <span>IU/ml</span>
            </div>
            <div class="item">
              <span>谷草转氨酶(AST)</span>
              <el-input placeholder
                        v-model="model.AST"></el-input>
              <span>IU/ml</span>
            </div>
            <div class="item">
              <span>HBV-DNA</span>
              <el-input placeholder
                        v-model="model.HBV"></el-input>
              <span>IU/ml</span>
            </div>
          </div>
        </el-form-item>
      </el-row>
      <el-row class="q-mt-md"
              style="text-align: center;">
        <el-form-item label=" ">
          <el-button v-on:click="close">取消</el-button>
          <el-button v-on:click="send"
                     type="primary">发送</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { QuickSelectAllergyHistory, QuickSelectDiagnoseHistory, QuickSelectDiagnose } from '@src/views/components/quick-select/index'

export default {
  components: {
    QuickSelectAllergyHistory,
    QuickSelectDiagnoseHistory,
    QuickSelectDiagnose
  },

  data() {
    return {
      blood_pressure_begin: '',
      blood_pressure_end: '',

      model: {
        // 主诉
        baseIllness: '',
        // 现病史
        presentHistoryList: [],
        // 过敏史
        allergyHistoryList: [{ code: 'empty', name: '无' }],
        // 既往史
        pastHistoryList: [{ code: 'empty', name: '无' }],
        // 诊断
        diagnoseList: [],
        // 医嘱小结
        summary: '',
        // 检查指标
        inspectionIndex: {
          blood_pressure: '',
          temperature: '',
          weight: '',
          heart_rate: '',
          More: ''
        },
        ALT: '',
        AST: '',
        HBV: ''
      },

      template: {
        key: 'templateChangeTips',

        aliverId: '',
        list: []
      }
    }
  },

  props: {
    session: Object
  },

  watch: {
    blood_pressure_begin() {
      this.model.inspectionIndex.blood_pressure = this.blood_pressure_begin + '/' + this.blood_pressure_end
    },
    blood_pressure_end() {
      this.model.inspectionIndex.blood_pressure = this.blood_pressure_begin + '/' + this.blood_pressure_end
    }
  },

  created() {
    this.getTemplate()

    this.initialData = Peace.util.deepClone(this.$data)
  },

  methods: {
    getTemplate() {
      Peace.service.inquiry.getRecordTemplate().then((res) => {
        const data = res.data.info

        this.template.aliverId = data.choseTemplateId
        this.template.list = data.templateList

        this.changeTemplate(this.template.aliverId)
      })
    },

    changeTemplate(key) {
      if (key) {
        const templateKey = Peace.cache.localStorage.get(this.template.key)

        if (templateKey !== key) {
          const template = this.template.list.find((item) => item.templateId === key)

          this.$alert(`${template.templateName}${template.templateTxt}`, '提示', {
            confirmButtonText: '知道了'
          })

          Peace.cache.localStorage.set(this.template.key, key)
        }
      }
    },

    /**
     * 校验病历
     */
    valid() {
      // 验证必填
      const isRequired = () => {
        if (Peace.validate.isEmpty(this.model.baseIllness)) {
          Peace.util.warning('请输入主诉')

          return false
        }

        if (this.model.diagnoseList.length === 0) {
          Peace.util.warning('请选择诊断')

          return false
        }

        return true
      }

      const isValid = () => {
        if (this.model.inspectionIndex.temperature && !/^\d+(\.\d{1,1})?$/.test(this.model.inspectionIndex.temperature)) {
          Peace.util.warning('请输入正确的体温，最多保留一位小数')
          return false
        }

        if (this.model.inspectionIndex.weight && !/^\d+(\.\d{1,1})?$/.test(this.model.inspectionIndex.weight)) {
          Peace.util.warning('请输入正确的体重，最多保留一位小数')
          return false
        }

        if (this.model.inspectionIndex.heart_rate && !/^\d+(\.\d{1,1})?$/.test(this.model.inspectionIndex.heart_rate)) {
          Peace.util.warning('请输入正确的心率，最多保留一位小数')
          return false
        }

        if (this.blood_pressure_begin && !/^\d+(\.\d{1,1})?$/.test(this.blood_pressure_begin)) {
          Peace.util.warning('请输入正确的血压，最多保留一位小数')
          return false
        }

        if (this.blood_pressure_end && !/^\d+(\.\d{1,1})?$/.test(this.blood_pressure_end)) {
          Peace.util.warning('请输入正确的血压，最多保留一位小数')
          return false
        }

        const alt = this.model.ALT
        if ((alt && !/^\d+(\.\d{1,1})?$/.test(alt)) || parseInt(alt) < 0 || parseInt(alt) > 1000) {
          Peace.util.warning('请输入正确的谷丙转氨酶(ALT)，最多保留一位小数 (数值范围 0-1000)')
          return false
        }

        const ast = this.model.AST
        if ((ast && !/^\d+(\.\d{1,1})?$/.test(ast)) || parseInt(ast) < 0 || parseInt(ast) > 1000) {
          Peace.util.warning('请输入正确的谷草转氨酶(AST)，最多保留一位小数 (数值范围 0-1000)')
          return false
        }

        return true
      }

      return isRequired() && isValid()
    },

    /**
     * 发送病历
     */
    send() {
      if (this.valid()) {
        const params = Peace.util.deepClone(this.model)

        params.inquiryNo = this.session.content.inquiryInfo.inquiryNo
        params.aliverId = this.template.aliverId
        params.inspectionIndex = JSON.stringify(this.model.inspectionIndex)

        Peace.service.inquiry.addCase(params).then((res) => {
          Peace.util.success(res.msg)

          this.$emit('close')
        })
      }
    },

    close() {
      if (Peace.util.deepCompare(this.initialData.model, this.model)) {
        this.$emit('close')
      } else {
        Peace.util.confirm('确定要退出病历吗？当前所有数据将会被清除!', undefined, undefined, () => {
          this.$emit('close')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  padding: 24px;
}

.inspect {
  display: flex;
  justify-content: space-between;

  margin: 0 0 5px 0;

  &.small-text {
    white-space: nowrap;
    font-size: 12px;
  }

  .item {
    margin: 0 5px 0 0;

    /deep/ .el-input__inner:focus {
      box-shadow: none;
    }

    .el-input {
      width: 56px;
      padding: 0;

      border-top: none;
      border-right: none;
      border-bottom: 1px solid #d6d6d6;
      border-left: none;

      /deep/ .el-input__inner {
        border: none;
        padding: 0 10px;
      }
    }

    & :first-child {
      color: rgba(51, 51, 51, 1);
    }

    & :last-child {
      color: rgba(51, 51, 51, 1);
    }
  }
}
.primary {
  color: $--color-primary;
}
</style>
