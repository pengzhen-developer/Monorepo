<template>
  <div>
    <div class="card card-search q-mb-md">
      <el-form inline=""
               label-width="auto"
               label-position="left">

        <el-form-item>
          <span slot="label">
            <span>给药频次</span>
            <span>：</span>
          </span>
          <el-input v-model=" model.AttrName"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <span slot="label">
            <span>创建时间</span>
            <span>：</span>
          </span>
          <div class="date-wrap">
            <el-date-picker v-model="model.BeginTime"
                            type="date"
                            placeholder="开始日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            :pickerOptions="startPickerOptions"
                            style="width: 130px;"></el-date-picker>
            <div class="date-separator"></div>
            <el-date-picker v-model="model.EndTime"
                            type="date"
                            placeholder="至今"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            :pickerOptions="endPickerOptions"
                            style="width: 130px;"></el-date-picker>
          </div>
        </el-form-item>

        <el-form-item prop="source">
          <span slot="label">
            <span>配码状态</span>
            <span>：</span>
          </span>
          <el-select v-model="model.MappingStatus"
                     clearable
                     placeholder="请选择">
            <el-option :key="item.label"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.ENUM_MATCH_CODE"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="source">
          <span slot="label">
            <span>审核状态</span>
            <span>：</span>
          </span>
          <el-select v-model="model.MappingExamineStatus"
                     clearable
                     placeholder="请选择">
            <el-option :key="item.label"
                       :label="item.label"
                       :value="item.value"
                       v-for="item in source.ENUM_REVIEW_STATUS"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label=" ">
          <el-button type="primary"
                     @click="get()">查询</el-button>
        </el-form-item>

      </el-form>
    </div>

    <div class="card">

      <div class="top-menu">
        <el-button type="primary"
                   @click="addItem()">新增</el-button>

      </div>

      <PeaceTable ref="table"
                  style="width: 100%"
                  pagination
                  max-height="600">
        <el-table-column prop="AttrCode"
                         align="center"
                         label="给药频次编码">
        </el-table-column>
        <el-table-column prop="AttrName"
                         align="center"
                         label="给药频次">
        </el-table-column>
        <el-table-column prop="LastModifyTime"
                         align="center"
                         label="创建时间">
        </el-table-column>

        <el-table-column label="配码状态"
                         align="center">
          <template slot-scope="scope">
            <span>
              {{ getMappingStatus(scope.row.MappingStatus) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="审核状态"
                         align="center">
          <template slot-scope="scope">
            <span>
              {{ getMappingExamineStatus(scope.row.MappingExamineStatus) }}
            </span>
          </template>
        </el-table-column>

      </PeaceTable>
    </div>

    <PeaceDialog :visible.sync="detailDialog.visible"
                 v-if="detailDialog.visible"
                 width="554px"
                 title="新增给药频次">
      <AddDrugFrequency v-on:onSucess="addChannelSuccess"
                        v-on:onCancel="detailDialog.visible = false" />
    </PeaceDialog>

  </div>
</template>
<script>
import CONSTANT from '../constant'
import Service from '../service'
import AddDrugFrequency from './AddDrugFrequency'

export default {
  components: {
    AddDrugFrequency
  },

  data() {
    return {
      source: {
        ENUM_MATCH_CODE: CONSTANT.ENUM_MATCH_CODE,
        ENUM_REVIEW_STATUS: CONSTANT.ENUM_REVIEW_STATUS
      },
      model: {
        AttrName: '',
        BeginTime: '',
        EndTime: '',
        MappingStatus: '',
        MappingExamineStatus: ''
      },
      tableData: [],
      detailDialog: {
        visible: false
      },
      startPickerOptions: {
        disabledDate: (time) => {
          if (this.model.EndTime) {
            return time.getTime() > new Date(this.model.EndTime) || time.getTime() < new Date('2019-02-28').getTime()
          } else {
            return time.getTime() > Date.now() || time.getTime() < new Date('2019-02-28').getTime()
          }
        }
      },
      endPickerOptions: {
        disabledDate: (time) => {
          if (this.model.BeginTime) {
            return time.getTime() < new Date(this.model.BeginTime).setDate(new Date(this.model.BeginTime).getDate() - 1) || time.getTime() > Date.now()
          } else {
            return time.getTime() > Date.now() || time.getTime() < new Date('2019-02-28').getTime()
          }
        }
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {
      const fetch = Service.DrugFrequencyPaging
      const params = this.model
      this.$refs.table.reloadData({ fetch, params })
    },
    addItem() {
      this.detailDialog.visible = true
    },
    addChannelSuccess() {
      this.detailDialog.visible = false
      this.get()
    },
    getMappingStatus(code) {
      return this.source.ENUM_MATCH_CODE.find((item) => item.value == code).label
    },

    getMappingExamineStatus(code) {
      return this.source.ENUM_REVIEW_STATUS.find((item) => item.value == code).label
    }
  }
}
</script>
<style lang="scss" scoped>
.status-item {
  display: flex;
  align-items: center;
}

.statusColor1 {
  width: 6px;
  height: 6px;
  border-radius: 8px;
  margin-right: 8px;
  background: #faad14;
}
.statusColor2 {
  width: 6px;
  width: 6px;
  margin-right: 8px;
  height: 6px;
  border-radius: 8px;
  background: #dddddd;
}
.statusColor3 {
  width: 6px;
  margin-right: 8px;
  height: 6px;
  border-radius: 8px;
  background: var(--q-color-primary);
}

.text-justify {
  text-align: justify;
  text-align-last: justify;
}

.em-4 {
  width: 4em;
}

.top-menu {
  margin-bottom: 20px;
}
.date-wrap {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
  .date-separator {
    width: 14px;
    margin: 0 9px;
    border-top: 1px solid #e7e7e1;
  }
}
</style>