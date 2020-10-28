<template>
  <div class="flex full-width">
    <div class="layout-route full-width">

      <div v-if="detailVisible || operateVisible"
           class="bg-white full-height q-pa-lg">
        <el-button type="primary"
                   plain
                   class="q-mb-24"
                   v-on:click="back"
                   style="padding:1px 4px">
          <div class="q-px-md q-py-sm">
            <i class="el-icon-arrow-left"></i>
            <span>返回上一页</span>
          </div>
        </el-button>
        <!-- 药房详情 -->
        <PharmacyDetail v-if="detailVisible"
                        v-bind:data="id"></PharmacyDetail>
        <!-- 运营详情 -->
        <PharmacyOperate v-if="operateVisible"
                         v-bind:data="id"></PharmacyOperate>
      </div>

      <template v-else>
        <!-- 药房列表 -->
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
              <el-select v-model="model.CustType"
                         placeholder="全部"
                         clearable>
                <el-option v-for="(value, label) in source.PHARMACY_TYPE"
                           v-bind:key="value"
                           v-bind:label="label"
                           v-bind:value="value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属机构：">
              <el-input v-model.trim="model.CustName"
                        placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="启用状态：">
              <el-select v-model="model.EnableStatus"
                         placeholder="全部"
                         clearable>
                <el-option v-for="(value, label) in source.ENABLE_STATUS"
                           v-bind:key="value"
                           v-bind:label="label"
                           v-bind:value="value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间：">
              <peace-date-picker value-format="yyyy-MM-dd HH:mm:ss"
                                 v-bind:default-time="['00:00:00', '23:59:59']"
                                 format="yyyy-MM-dd"
                                 type="daterange"
                                 v-model.trim="DateValue"></peace-date-picker>
            </el-form-item>
            <el-form-item label="对接系统：">
              <el-select v-model="model.DockingSystem"
                         placeholder="全部"
                         clearable>
                <el-option v-for="(value, label) in source.PHARMACY_TYPE"
                           v-bind:key="value"
                           v-bind:label="label"
                           v-bind:value="value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="系统属性：">
              <el-select v-model="model.SystemAttribute"
                         placeholder="全部"
                         clearable>
                <el-option v-for="(value, label) in source.PHARMACY_TYPE"
                           v-bind:key="value"
                           v-bind:label="label"
                           v-bind:value="value"></el-option>
              </el-select>
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
                             prop="Name"
                             min-width="180px"></el-table-column>
            <el-table-column label="药房性质"
                             prop="CustNature"
                             min-width="100px"></el-table-column>
            <el-table-column label="药房类型"
                             prop="CustType"
                             min-width="100px"></el-table-column>
            <el-table-column label="所属机构"
                             prop="CustName"
                             min-width="140px"></el-table-column>
            <el-table-column label="对接系统"
                             prop="DockingSystem"
                             min-width="100px"></el-table-column>
            <el-table-column label="系统属性"
                             prop="SystemAttribute"
                             min-width="100px"></el-table-column>
            <el-table-column label="已上架商品数量"
                             prop="GoodNums"
                             align="center"
                             min-width="140px"></el-table-column>
            <el-table-column label="创建时间"
                             prop="CreateTime"
                             min-width="160px"></el-table-column>
            <el-table-column label="启用状态"
                             prop="EnableStatus"
                             min-width="140px">
              <template slot-scope="scope">
                <div class="table-status">
                  <div class="table-status-text">{{scope.row.EnableStatus | getEnumLabel(source.ENABLE_STATUS)}}</div>
                  <el-switch v-model="scope.row.EnableStatus"
                             :active-value="0"
                             :inactive-value="10"
                             @change="changeStatus(scope.row)"></el-switch>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作"
                             align="center"
                             width="180px"
                             fixed="right">
              <template slot-scope="scope">
                <el-button type="text"
                           v-on:click="pharmacyDetails(scope.row)">药房详情</el-button>
                <el-button type="text"
                           v-on:click="pharmacyOperate(scope.row)">运营信息</el-button>
              </template>
            </el-table-column>
          </peace-table>
        </div>
      </template>

    </div>
  </div>
</template>

<script>
import CONSTANT from './constant'
import Service from './service/index'
import PharmacyDetail from './components/PharmacyDetail'
import PharmacyOperate from './components/PharmacyOperate'

export default {
  name: 'Pharmacy',
  components: {
    PharmacyDetail,
    PharmacyOperate
  },

  data() {
    return {
      detailVisible: false,
      operateVisible: false,
      DateValue: [],
      id: '',
      model: {
        Name: '',
        EnableStatus: '',
        CustType: '',
        CustName: '',
        DockingSystem: '',
        SystemAttribute: '',
        StarTime: '',
        EndTime: ''
      },
      source: {
        PHARMACY_TYPE: CONSTANT.PHARMACY_TYPE,
        ENABLE_STATUS: CONSTANT.ENABLE_STATUS
      }
    }
  },
  watch: {
    DateValue(value) {
      this.model.StarTime = value?.[0] ?? ''
      this.model.EndTime = value?.[1] ?? ''
    }
  },
  filters: {
    getEnumLabel: function (value, ENUM) {
      return Object.keys(ENUM).find((key) => ENUM[key] === value)
    }
  },
  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  methods: {
    fetch() {
      const fetch = Service.AllBranchStore
      const params = Object.assign({}, this.model)
      this.$refs.table.reloadData({ fetch, params }).then((res) => {
        res?.data?.list?.forEach((row) => {
          row.CustName = Peace.validate.isEmpty(row.CustName) ? '——' : row.CustName
          row.CreateTime = Peace.validate.isEmpty(row.CreateTime) ? '——' : row.CreateTime
        })
        return res
      })
    },
    changeStatus(row) {
      const message = row.EnableStatus == 0 ? '确定启用该药房？' : '确定禁用该药房？'

      this.$confirm(message, '提示', { closeOnClickModal: false })
        .then(() => {
          const params = row
          Service.changeStatus(params).then((res) => {
            Peace.util.success(res.msg)
            this.fetch()
          })
        })
        .catch(() => {
          row.EnableStatus = row.EnableStatus == 10 ? 0 : 10
        })
    },
    pharmacyDetails(row) {
      this.detailVisible = true
      this.id = row.UserID
    },
    pharmacyOperate(row) {
      this.operateVisible = true
      this.id = row.UserID
    },
    back() {
      this.detailVisible = false
      this.operateVisible = false
      this.$nextTick().then(() => {
        this.fetch()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-status {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.table-status-text {
  margin-right: 10px;
}
</style>