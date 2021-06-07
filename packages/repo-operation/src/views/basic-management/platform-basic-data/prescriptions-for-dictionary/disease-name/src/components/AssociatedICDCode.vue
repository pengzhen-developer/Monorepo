<template>
  <div class="layout-route">
    <el-form v-bind:model="model"
             inline="inline"
             label-suffix="："
             size="mini">

      <el-form-item label="主要编码">
        <el-input v-model.trim="model.icd10Code"
                  placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="ICD疾病名称">
        <el-input v-model.trim="model.name"
                  placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="级别">
        <el-select v-model="model.leavel"
                   placeholder="全部"
                   clearable>
          <el-option v-for="item in source.Icd10LeavelList"
                     v-bind:key="item.value"
                     v-bind:label="item.label"
                     v-bind:value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"
                   v-on:click="get">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="q-mb-lg">
      <el-button type="primary"
                 v-on:click="associated">关联</el-button>
      <el-button type="primary"
                 v-on:click="enAssociated">取消关联</el-button>
    </div>

    <PeaceTable ref="table"
                @selection-change="handleSelectionChange"
                style="width: 100%"
                pagination>
      <PeaceTableColumn type="selection"
                        width="55">
      </PeaceTableColumn>
      <PeaceTableColumn label="主要编码"
                        width="120px"
                        prop="icd10Code">
      </PeaceTableColumn>
      <PeaceTableColumn label="附加编码"
                        width="120px"
                        prop="extCode">
        <template slot-scope="scope">
          {{scope.row.extCode||"——"}}
        </template>
      </PeaceTableColumn>
      <PeaceTableColumn label="ICD疾病名称"
                        min-width="200px"
                        show-overflow-tooltip
                        prop="name">
      </PeaceTableColumn>
      <PeaceTableColumn label="级别"
                        width="100px"
                        prop="leavel">
      </PeaceTableColumn>
      <PeaceTableColumn label="父节点编码"
                        width="120px"
                        prop="parentNode">
        <template slot-scope="scope">
          {{scope.row.parentNode||"——"}}
        </template>
      </PeaceTableColumn>
      <PeaceTableColumn label="关联状态"
                        width="120px"
                        prop="status">
        <template slot-scope="scope">
          <span>{{scope.row.status=="yes" ? "已关联" : "未关联"}}</span>
        </template>
      </PeaceTableColumn>

    </PeaceTable>
  </div>
</template>

<script>
import Service from '../service/index'

export default {
  name: 'AssociatedICDCode',
  props: {
    data: Object
  },

  watch: {
    data: {
      handler() {
        if (this.data != null) {
          this.model.deaseCode = this.data.code
        }
      },
      immediate: true
    }
  },

  data() {
    return {
      model: {
        name: '',
        icd10Code: '',
        leavel: '',
        deaseCode: ''
      },
      source: {
        Icd10LeavelList: []
      },
      multipleSelection: []
    }
  },
  async created() {
    this.source.Icd10LeavelList = await Peace.identity.dictionary.getList('icd10_leavel')
  },

  async mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {
      const fetch = Service.platformDiagnosisRelationPage
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params })
    },

    associated() {
      if (this.multipleSelection.length > 0) {
        const params = { ids: this.multipleSelection.map((item) => item.id), code: this.model.deaseCode }
        Service.getRelationCount(params).then((res) => {
          if (res.data.total === 0) {
            //选中的诊断没有关联过其它疾病 不需要弹框直接关联
            this.associatedConfirm()
          } else {
            //选中的诊断联过其它疾病 弹框二次确认
            this.$confirm(
              `当前选中数据有${res.data.total}条已与其他疾病关联，确定取消原有关联状态，关联现有疾病？`,
              '关联确认',
              {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                left: true,
                closeOnClickModal: false,
                closeOnPressEscape: false
              }
            ).then(() => {
              this.associatedConfirm()
            })
          }
        })
      } else {
        Peace.util.warning('请选择ICD编码')
      }
    },

    associatedConfirm() {
      const params = { ids: this.multipleSelection.map((item) => item.id), code: this.model.deaseCode }
      Service.checkRelation(params).then((res) => {
        Peace.util.success(res.message)
        this.$emit('onSuccess')
      })
    },

    enAssociated() {
      if (this.multipleSelection.length > 0) {
        const params = { ids: this.multipleSelection.map((item) => item.id), code: this.model.deaseCode }
        Service.cancelRelation(params).then((res) => {
          Peace.util.success(res.message)
          this.$emit('onSuccess')
        })
      } else {
        Peace.util.warning('请选择ICD编码')
      }
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>


<style lang="scss" scoped>
</style>