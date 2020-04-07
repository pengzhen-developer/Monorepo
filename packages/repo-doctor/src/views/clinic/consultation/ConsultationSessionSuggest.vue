<template>
  <div>
    <el-form :model="model"
             label-width="80px">
      <el-form-item label="会诊所见"
                    required>
        <el-input :maxlength="500"
                  :rows="4"
                  placeholder="请填写会诊所见情况"
                  resize="none"
                  type="textarea"
                  show-word-limit
                  v-model="model.consultFind"></el-input>
      </el-form-item>
      <el-form-item label="疾病诊断"
                    prop="diagnose"
                    required>
        <span slot="label">疾病诊断</span>
        <template v-if="model.consultDiagnose && model.consultDiagnose.length > 0">
          <el-tag :key="item.id"
                  style="margin: 2px 10px 2px 0; min-width: 62px; text-align: center; border: none; border-radius: 2px; height: 28px; line-height: 28px;"
                  type="info"
                  v-for="item in model.consultDiagnose">{{ item.name }}</el-tag>
          <el-button @click="showDiagnoseDialog(model.consultDiagnose)"
                     type="text">修改</el-button>
        </template>

        <template v-else>
          <el-button @click="showDiagnoseDialog()"
                     type="text">请选择</el-button>
        </template>
      </el-form-item>
      <el-form-item label="建议"
                    required>
        <el-input :maxlength="500"
                  :rows="4"
                  placeholder="请填写会诊意见，包括治疗方案、患者与家属关注问题等内容的分析等，提交成功后本次会诊将结束。"
                  resize="none"
                  type="textarea"
                  show-word-limit
                  v-model="model.consultSuggest"></el-input>
      </el-form-item>
      <div style="text-align: center;">
        <el-button @click="saveConsultSuggest"
                   type="primary">确认并签名</el-button>
      </div>
    </el-form>

    <peace-dialog :visible.sync="diagnoseDialog.visible"
                  append-to-body
                  title="疾病诊断">
      <div style="margin-bottom: 10px">
        <el-select :remote-method="getPresent"
                   @change="chooseItem"
                   allow-create
                   filterable
                   placeholder="请输入疾病诊断"
                   remote
                   style="width: 100%;"
                   v-model="diagnoseDialog.chooseItem">
          <el-option :key="item.id"
                     :label="item.name"
                     :value="item.name"
                     v-for="item in diagnoseDialog.source.present_history"></el-option>
        </el-select>
      </div>

      <div style="margin: 10px 0;"
           v-if="diagnoseDialog.chooseData.length > 0">
        <p>疾病诊断</p>

        <div style="margin: 10px 0;">
          <el-tag :key="item.id"
                  @close="closeItem(item)"
                  closable
                  style="margin: 2px 10px 2px 0; min-width: 62px; text-align: center; border: none; border-radius: 2px; height: 28px; line-height: 28px;"
                  v-for="item in diagnoseDialog.chooseData">{{ item.name }}</el-tag>
        </div>
      </div>

      <div style="margin: 10px 0;">
        <p>疾病诊断</p>

        <div style="margin: 10px 0;">
          <el-tag :key="item.id"
                  :type="diagnoseDialog.chooseData.findIndex(existItem => existItem.id === item.id) === -1 ? 'info' : 'primary'"
                  @click="chooseItem(item)"
                  style="cursor: pointer; margin: 2px 10px 2px 0; min-width: 62px; text-align: center; border: none; border-radius: 2px; height: 28px; line-height: 28px;"
                  v-for="item in diagnoseDialog.source.IllnessList">{{ item.name }}</el-tag>
        </div>
      </div>

      <div style="margin-bottom: 10px; text-align: center;">
        <el-button @click="diagnoseDialog.visible = false">取消</el-button>
        <el-button @click="saveItem"
                   type="primary">保存</el-button>
      </div>
    </peace-dialog>
  </div>
</template>

<script>
import peace from '@src/library'

export default {
  props: {
    consultNo: String
  },

  data() {
    return {
      model: {
        consultSuggest: ''
      },

      diagnoseDialog: {
        visible: false,

        chooseData: [],
        chooseItem: [],
        source: {
          // 疾病诊断
          present_history: [],
          IllnessList: []
        }
      }
    }
  },
  created() {
    peace.service.patient.IllnessList().then(res => {
      this.diagnoseDialog.source.IllnessList = res.data.list
    })
  },
  methods: {
    showDiagnoseDialog(data) {
      if (data && data.length) {
        this.diagnoseDialog.chooseData = [...data]
      }

      this.diagnoseDialog.visible = true
    },

    getPresent(query) {
      if (query !== '' && query.length > 0) {
        const params = { name: query }

        peace.service.patient.getDiseaseInfo(params).then(res => {
          this.diagnoseDialog.source.present_history = res.data.list
        })
      } else {
        this.diagnoseDialog.source.present_history = []
      }
    },

    chooseItem(item) {
      if (!item.id) {
        item = {
          name: item
        }
      }

      const index = this.diagnoseDialog.chooseData.findIndex(
        existItem => existItem.id === item.id && existItem.name === item.name
      )

      if (index === -1) {
        this.diagnoseDialog.chooseData.push(item)

        // 选中后， 清空状态
        this.diagnoseDialog.chooseItem = ''
        this.diagnoseDialog.present_history = []
      }
    },

    closeItem(item) {
      const index = this.diagnoseDialog.chooseData.findIndex(existItem => existItem === item)

      if (index !== -1) {
        this.diagnoseDialog.chooseData.splice(index, 1)
      }
    },

    saveItem() {
      this.model.consultDiagnose = [...this.diagnoseDialog.chooseData]

      this.diagnoseDialog.visible = false
    },

    saveConsultSuggest() {
      if (this.model.consultSuggest && this.model.consultDiagnose && this.model.consultFind) {
        const diagnose = this.model.consultDiagnose

        const params = {
          consultNo: this.consultNo || this.$store.getters['consultation/consultInfo'].consultNo,
          consultDiagnose: diagnose.map(v => v.name),
          consultFind: this.model.consultFind,
          consultSuggest: this.model.consultSuggest
        }

        peace.service.consult.submitSuggest(params).then(() => {
          // $peace.util.alert('提交成功，会诊已完成，感谢您的辛苦付出')

          this.$emit('close')
          this.visible = false
        })
      } else {
        $peace.util.alert('请完整填写会诊所见、目前疾病诊断、建议')
      }
    }
  }
}
</script>

<style>
</style>