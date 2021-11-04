<template>
  <div class="layout-route prescription">

    <div class="card card-search q-mb-md">
      <el-form inline
               label-width="auto"
               v-on:keyup.enter.native="get"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="患者姓名：">
          <el-input v-model="model.familyName"></el-input>
        </el-form-item>

        <el-form-item label="开具时间：">
          <PeaceDatePicker type="daterange"
                           v-model="model.date"></PeaceDatePicker>
        </el-form-item>

        <el-form-item label="处方状态：">
          <el-select clearable
                     placeholder="全部"
                     v-model="model.prescriptionStatus">
            <el-option v-for="item in source.prescriptionStatus"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="">
          <el-button @click="get"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card q-mb-md">
      <PeaceTable pagination
                  ref="table">
        <PeaceTableColumn label="处方编号"
                          prop="prescriptionNo"
                          min-width="180"></PeaceTableColumn>
        <PeaceTableColumn label="患者姓名"
                          prop="patient_name"
                          min-width="120"></PeaceTableColumn>
        <PeaceTableColumn label="性别"
                          prop="patient_sex"
                          min-width="120"></PeaceTableColumn>
        <PeaceTableColumn label="年龄"
                          prop="patient_age"
                          min-width="120"></PeaceTableColumn>
        <PeaceTableColumn label="身份证号"
                          prop="idcard"
                          min-width="180"></PeaceTableColumn>
        <PeaceTableColumn label="处方状态"
                          prop="prescription_status"
                          min-width="120"></PeaceTableColumn>
        <PeaceTableColumn label="开具时间"
                          prop="created_time"
                          min-width="180"></PeaceTableColumn>
        <PeaceTableColumn fixed="right"
                          label="操作"
                          width="120">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="showDetail(scope.row)">查看详情</el-button>
          </template>
        </PeaceTableColumn>
      </PeaceTable>
    </div>

    <PeaceDialog v-drag
                 append-to-body
                 title="处方详情"
                 v-if="dialog.visible"
                 v-bind:visible.sync="dialog.visible">
      <PeacePrescriptionDetail v-bind:data="dialog.data">
        <template v-slot:footer="{ data }">
          <PrescriptionDetailOperation v-on:accept="() => { dialog.visible = false; get() }"
                                       v-on:reject="() => { dialog.visible = false; get() }"
                                       v-bind:data="data"></PrescriptionDetailOperation>
        </template>
      </PeacePrescriptionDetail>
    </PeaceDialog>

  </div>
</template>

<script>
import Service from './service'
import PrescriptionDetailOperation from '@src/views/components/prescription/prescription-detail-operation/src/index.vue'
import { PeacePrescriptionDetail } from 'peace-components'

export default {
  components: {
    PeacePrescriptionDetail,
    PrescriptionDetailOperation
  },

  inject: ['provideGetTab', 'provideAddTab'],

  data() {
    return {
      loading: true,

      model: {
        familyName: '',
        date: [],
        prescriptionStatus: '',

        s_Date: '',
        e_Date: ''
      },

      source: {
        prescriptionStatus: []
      },

      rules: {
        pickerOptionsStart: {
          disabledDate: (time) => {
            if (this.model.e_Date) {
              return time.getTime() > this.model.e_Date.toDate().getTime() || time.getTime() > Date.now()
            } else {
              return time.getTime() > Date.now()
            }
          }
        },

        pickerOptionsEnd: {
          disabledDate: (time) => {
            if (this.model.s_Date) {
              return time.getTime() < this.model.s_Date.toDate().getTime() || time.getTime() > Date.now()
            } else {
              return time.getTime() > Date.now()
            }
          }
        }
      },

      dialog: {
        visible: false,
        data: {}
      }
    }
  },

  watch: {
    'model.date'(value) {
      if (Peace.util.isArray(value) && value.length === 2) {
        this.model.s_Date = Peace.dayjs(value[0]).format('YYYY-MM-DD')
        this.model.e_Date = Peace.dayjs(value[1]).format('YYYY-MM-DD')
      } else {
        this.model.s_Date = ''
        this.model.e_Date = ''
      }
    }
  },

  created() {
    // 其它页面带入的初始条件，合并为查询条件
    this.model = Object.assign({}, this.model, this.$route.params)
  },

  mounted() {
    this.$nextTick().then(() => {
      this.getDictionary()
      this.get()
    })
  },

  methods: {
    async getDictionary() {
      this.source.prescriptionStatus = await Peace.identity.dictionary.getList('prescription_state')
    },

    get() {
      const fetch = Service.getPrescripList
      const params = this.model

      this.$refs.table.loadData({ fetch, params })
    },

    async fetchPrescription(prescriptionNo) {
      const params = { prescriptionNo: prescriptionNo }
      const res = await Service.getPrescriptionDetail(params)

      return res.data
    },

    showDetail({ id }) {
      this.dialog.visible = true
      this.dialog.data = () => this.fetchPrescription(id)
    }
  }
}
</script>

<style lang="scss" scoped>
.character {
  display: inline-flex;

  &:before {
    content: '';
    background: #e7e7e1;
    width: 15px;
    height: 1px;
    position: relative;
    top: -4px;
    margin: 0 10px;
  }
}
</style>
