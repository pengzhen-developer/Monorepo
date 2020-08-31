<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form v-bind:model="model"
               inline="inline"
               label-width="85px"
               label-position="right"
               label-suffix
               size="mini">
        <el-form-item label="药房名称：">
          <el-input v-model.trim="model.Name"
                    placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="药房类型：">
          <el-select v-model="model.StoreType"
                     placeholder="全部"
                     clearable>
            <el-option v-for="(value, label) in source.PHARMACY_TYPE"
                       v-bind:key="value"
                       v-bind:label="label"
                       v-bind:value="value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机构类型：">
          <el-select v-model="model.CustType"
                     placeholder="全部"
                     clearable>
            <el-option v-for="(value, label) in source.ORGANIZATION_TYPE"
                       v-bind:key="value"
                       v-bind:label="label"
                       v-bind:value="value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="认证状态：">
          <el-select v-model="model.Status"
                     placeholder="全部"
                     clearable>
            <el-option v-for="(value, label) in source.CERTIFICATION_STATUS"
                       v-bind:key="value"
                       v-bind:label="label"
                       v-bind:value="value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请时间：">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
                          v-bind:default-time="['00:00:00', '23:59:59']"
                          format="yyyy-MM-dd"
                          type="daterange"
                          v-model.trim="DateValue"></el-date-picker>
        </el-form-item>
        <el-form-item label="审核时间：">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
                          v-bind:default-time="['00:00:00', '23:59:59']"
                          format="yyyy-MM-dd"
                          type="daterange"
                          v-model.trim="DateValue2"></el-date-picker>
        </el-form-item>
        <el-form-item label-width="0">
          <el-button type="primary"
                     v-on:click="fetch">查 询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card">
      <peace-table ref="table"
                   pagination
                   size="mini">
        <el-table-column label="序号"
                         type="index"
                         align="center"
                         width="80px">
        </el-table-column>
        <el-table-column label="药房名称"
                         prop="StoreName"
                         min-width="180px"></el-table-column>
        <el-table-column label="药房类型"
                         prop="CustomerType"
                         min-width="80px">
          <template slot-scope="scope">
            {{ scope.row.CustomerType == 0 ? '院内药房' : '门店' }}
          </template>
        </el-table-column>
        <el-table-column label="所属机构"
                         prop="CustName"
                         min-width="80px"></el-table-column>
        <el-table-column label="机构类型"
                         prop="CustomerType"
                         min-width="80px">
          <template slot-scope="scope">
            {{ scope.row.CustomerType == 0 ? '医疗机构' : '店配机构' }}
          </template>
        </el-table-column>
        <el-table-column label="申请时间"
                         prop="CreateTime"
                         min-width="160px"></el-table-column>
        <el-table-column label="认证状态"
                         prop="ExamineStatus"
                         min-width="100px">
          <template slot-scope="scope">
            <span class="dot"
                  v-bind:class="getColorType(scope.row)"></span>
            <span>{{scope.row.ExamineStatus | getEnumLabel(source.CERTIFICATION_STATUS)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核时间"
                         prop="CommitExamineDateTime"
                         min-width="160px"></el-table-column>
        <el-table-column label="操作"
                         align="center"
                         width="100px"
                         fixed="right">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="auditPharmacy(scope.row)">{{scope.row.ExamineStatus == 10 ? '审核' : '基本详情'}}</el-button>
          </template>
        </el-table-column>
      </peace-table>
    </div>
    <el-dialog v-if="detailDialog.visible"
               width="618px"
               v-bind:visible.sync="detailDialog.visible"
               title="药店审核">
      <ReviewPharmacy v-bind:data="detailDialog.data"
                      v-on:onClose="onClose"></ReviewPharmacy>
    </el-dialog>
  </div>
</template>

<script>
import CONSTANT from './constant'
import Service from './service/index'
import Peace from '@src/library'
import ReviewPharmacy from './components/ReviewPharmacy'

export default {
  name: 'Pharmacyaudit',
  components: {
    ReviewPharmacy
  },
  filters: {
    getEnumLabel: function (value, ENUM) {
      return Object.keys(ENUM).find((key) => ENUM[key] === value)
    }
  },
  data() {
    return {
      DateValue: [],
      DateValue2: [],
      detailDialog: {
        visible: false,
        data: {
          id: 0,
          statu: 10
        }
      },
      model: {
        Name: '',
        Status: '',
        StoreType: '',
        CustType: '',
        StarCreateTime: '',
        EndCreateTime: '',
        StarExamineDateTime: '',
        EndExamineDateTime: ''
      },
      source: {
        PHARMACY_TYPE: CONSTANT.PHARMACY_TYPE,
        ORGANIZATION_TYPE: CONSTANT.ORGANIZATION_TYPE,
        CERTIFICATION_STATUS: CONSTANT.CERTIFICATION_STATUS
      }
    }
  },
  watch: {
    DateValue(value) {
      this.model.StarCreateTime = value?.[0] ?? ''
      this.model.EndCreateTime = value?.[1] ?? ''
    },
    DateValue2(value) {
      this.model.StarExamineDateTime = value?.[0] ?? ''
      this.model.EndExamineDateTime = value?.[1] ?? ''
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  computed: {},

  methods: {
    fetch() {
      const fetch = Service.listForReview
      const params = Object.assign({}, this.model)
      this.$refs.table.reloadData({ fetch, params }).then((res) => {
        res?.data?.list?.forEach((row) => {
          row.CustName = Peace.validate.isEmpty(row.CustName) ? '——' : row.CustName
          row.CommitExamineDateTime = Peace.validate.isEmpty(row.CommitExamineDateTime) ? '——' : row.CommitExamineDateTime
        })
        return res
      })
    },
    getColorType(row) {
      const dict = {
        10: 'reviewed',
        15: 'success',
        20: 'failed'
      }
      return dict[row.ExamineStatus]
    },
    auditPharmacy(row) {
      this.detailDialog.visible = true
      this.detailDialog.data.statu = row.ExamineStatus
      this.detailDialog.data.id = row.Id
    },
    onClose() {
      this.fetch()
      this.detailDialog.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 8px 0 0;

  &.failed {
    background: rgba(0, 0, 0, 0.25);
  }
  &.reviewed {
    background: #faad14;
  }
  &.success {
    background: var(--q-color-primary);
  }
}
</style>