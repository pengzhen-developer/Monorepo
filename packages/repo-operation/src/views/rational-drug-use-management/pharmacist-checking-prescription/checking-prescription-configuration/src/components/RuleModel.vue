<template>
  <div>
    <div class="el-dialog__body">
      <el-form class="q-px-xl"
               label-width="auto"
               label-suffix="："
               ref="form"
               v-bind:rules="rules"
               v-bind:model="model">
        <el-form-item label="方案名称"
                      v-bind:prop="data.SchemeType === 2 ? 'SchemeName' : undefined">
          <template v-if="model.SchemeType === 1">
            <span>{{ model.SchemeName }}</span>
          </template>
          <template v-if="model.SchemeType === 2">
            <PeaceInput placeholder="请输入"
                        v-model.trim="model.SchemeName"></PeaceInput>
          </template>
        </el-form-item>
        <el-form-item label="药品"
                      v-bind:prop="data.SchemeType === 2 ? 'DrugInfo' : undefined">
          <template v-if="model.SchemeType === 1">
            <span>全品类</span>
          </template>
          <template v-if="model.SchemeType === 2">
            <div v-on:click="handleDialogShow">
              <el-input placeholder="请选择"
                        type="textarea"
                        v-bind:autosize="{ minRows: 1, maxRows: 4}"
                        v-bind:value="model?.DrugInfo?.map(item => item?.Code + '  ' + item?.Name).join('，')"></el-input>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="审方团队"
                      prop="AuditorTeamInfo">
          <el-select filterable
                     multiple
                     class="full-width"
                     v-model="model.AuditorTeamInfo"
                     placeholder="请选择审方团队">
            <el-option v-for="item in source.AuditorTeamInfo"
                       v-bind:key="item.Code"
                       v-bind:label="item.Name"
                       v-bind:value="item.Code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="超时设置"
                      prop="IsTimeoutPasses">
          <el-switch v-model="model.IsTimeoutPasses"></el-switch>
        </el-form-item>
        <el-form-item required
                      label="响应时间"
                      v-if="model.IsTimeoutPasses">
          <div class="flex">
            <el-form-item prop="OvertimeTime">
              <el-input-number style="width: 120px; "
                               placeholder="请输入"
                               v-model="model.OvertimeTime"
                               v-bind:min="1"
                               v-bind:max="60 * 60 * 24"
                               v-bind:precision="0"
                               v-bind:controls="false"></el-input-number>
            </el-form-item>
            <div class="q-mx-sm">秒，设置药师签名</div>
            <el-form-item prop="SignaturePharmacistCode">
              <peace-select style="width: 120px;"
                            v-bind:loading="loadingSelect"
                            v-model="model.SignaturePharmacistCode">
                <el-option v-for="item in source.SignaturePharmacist"
                           v-bind:key="item.Code"
                           v-bind:label="item.Name"
                           v-bind:value="item.Code"></el-option>
              </peace-select>
            </el-form-item>
          </div>
        </el-form-item>
      </el-form>
    </div>

    <div class="el-dialog__footer">
      <el-button v-on:click="handleCancel">取消</el-button>
      <el-button type="primary"
                 v-bind:loading="loading"
                 v-on:click="handleSave">保存</el-button>
    </div>

    <PeaceDialog append-to-body
                 title="请选择药品"
                 width="1000px"
                 v-if="dialog.visible"
                 v-bind:visible.sync="dialog.visible">
      <DrugSelect v-bind:custCode="data.ClientID"
                  v-bind:data="dialog.data"
                  v-on:cancel="handleDrugDialogCancel"
                  v-on:save="handleDrugDialogSave"></DrugSelect>
    </PeaceDialog>
  </div>
</template>

<script>
import Service from './../service'
import DrugSelect from './DrugSelect'

export default {
  components: {
    DrugSelect
  },

  props: {
    data: Object,
    dataList: Array
  },

  data() {
    return {
      loading: false,
      loadingSelect: false,

      model: {
        SchemeType: '',
        SchemeName: '',
        DrugInfo: [],
        AuditorTeamType: '',
        AuditorTeamInfo: [],
        IsTimeoutPasses: false,
        OvertimeTime: undefined,
        SignaturePharmacistCode: undefined
      },

      rules: {
        SchemeName: [
          { required: true, message: '请输入方案名称', trigger: 'blur' },
          {
            validator: (rule, value, cb) => {
              // 从不包含自身的方案中，校验名称重复性
              if (this.dataList.filter((item) => item?.ID !== this.model?.ID).filter((item) => item.SchemeName === value).length > 0) {
                cb(new Error('方案名称重复，请重新输入'))
              } else {
                cb()
              }
            },
            trigger: 'blur'
          }
        ],
        DrugInfo: [{ required: true, message: '请选择至少一种药品', trigger: 'blur' }],
        AuditorTeamInfo: [{ required: true, message: '请至少选择一个审方团队', trigger: 'change' }],
        OvertimeTime: [{ required: true, message: '请输入响应时间', trigger: 'blur' }],
        SignaturePharmacistCode: [{ required: true, message: '请选择药师签名', trigger: 'change' }]
      },

      source: {
        AuditorTeamInfo: [],
        SignaturePharmacist: []
      },

      dialog: {
        visible: false,
        data: []
      }
    }
  },

  watch: {
    data: {
      handler() {
        this.$nextTick().then(() => {
          this.model = Object.assign({}, this.model, this.data)

          // 格式化
          this.model.OvertimeTime = this.model.OvertimeTime ?? undefined
          this.model.AuditorTeamInfo = this.model.AuditorTeamInfo.map((item) => item.Code)
        })
      },
      immediate: true
    },

    'model.AuditorTeamInfo': {
      handler() {
        this.source.SignaturePharmacist = []

        if (this.model.AuditorTeamInfo.length === 0) {
          return
        }

        this.cancel && this.cancel()
        const cancelToken = new Peace.http.CancelToken((c) => {
          // executor 函数接收一个 cancel 函数作为参数
          this.cancel = c
        })

        this.loadingSelect = true
        Service.GetPharmacistByCusts({ Codes: this.model.AuditorTeamInfo.join(',') }, cancelToken)
          .then((res) => {
            this.source.SignaturePharmacist = res.data.list
          })
          .finally(() => {
            this.loadingSelect = false
          })
      }
    }
  },

  async created() {
    this.source.AuditorTeamInfo = (await Service.CheckHospitalList())?.data?.list
  },

  methods: {
    async handleSave() {
      this.loading = true

      try {
        // 格式化药品
        const params = Peace.util.deepClone(this.model)
        params.DrugInfo = params?.DrugInfo?.map((item) => item.Code) ?? []

        // 校验
        await this.$refs.form.validate()
        await Service.Saverescriptionsteam(params)

        this.handleCancel()
        this.$emit('success')
      } finally {
        this.loading = false
      }
    },

    handleCancel() {
      this.$emit('cancel')
    },

    handleDialogShow() {
      this.dialog.visible = true
      this.dialog.data = Peace.util.deepClone(this.model.DrugInfo).map((item) => {
        return {
          drugNumber: item.Code,
          drugName: item.Name
        }
      })
    },

    handleDrugDialogCancel() {
      this.dialog.visible = false
    },

    handleDrugDialogSave(selections) {
      // 格式化
      selections.map((item) => {
        item.Code = item.drugNumber
        item.Name = item.drugName
      })

      this.model.DrugInfo = selections
      this.handleDrugDialogCancel()

      // 触发校验
      this.$refs.form.validateField('DrugInfo')
    }
  }
}
</script>

<style>
</style>