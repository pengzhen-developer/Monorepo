<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form v-bind:model="model"
               inline="inline"
               label-width="auto"
               label-suffix="："
               size="mini">

        <el-form-item label="调用来源">
          <el-select v-model="model.source"
                     placeholder="全部"
                     clearable>
            <el-option v-for="(value, label) in source.ENUM_DATA_SOURCE"
                       v-bind:key="value"
                       v-bind:label="label"
                       v-bind:value="value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="调用环境">
          <el-select v-model="model.ambient"
                     placeholder="全部"
                     clearable>
            <el-option v-for="(value, label) in source.ENUM_DATA_BACKGROUND"
                       v-bind:key="value"
                       v-bind:label="label"
                       v-bind:value="value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="签名人">
          <el-input v-model="model.signer"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="处方编号">
          <el-input v-model="model.prescriptionNo"
                    placeholder="请输入"></el-input>
        </el-form-item>

        <!-- <el-form-item label="业务主键值">
        <el-input v-model="model.primaryKey"
                  placeholder="请输入"></el-input>
      </el-form-item> -->

        <el-form-item label="操作日期">
          <peace-date-picker type="daterange"
                             value-format="yyyy-MM-dd"
                             v-model="model.timeRange"></peace-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     v-on:click="get">查询</el-button>

        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <PeaceTable ref="table"
                  size="mini"
                  pagination>
        <PeaceTableColumn label="序号"
                          type="index"
                          width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn min-width="150px"
                          label="调用来源"
                          prop="source"></PeaceTableColumn>
        <PeaceTableColumn min-width="150px"
                          label="调用环境"
                          prop="ambient"></PeaceTableColumn>
        <PeaceTableColumn min-width="150px"
                          label="签名人"
                          prop="signer"></PeaceTableColumn>
        <PeaceTableColumn min-width="150px"
                          label="处方编号"
                          prop="prescriptionNo"></PeaceTableColumn>
        <PeaceTableColumn min-width="180px"
                          label="调用时间"
                          prop="callTime"></PeaceTableColumn>

      </PeaceTable>
    </div>

  </div>
</template>

<script>
import Service from './service'
import CONSTANT from './constant'

export default {
  name: 'MedicalOnlineSignatureCall',
  data() {
    return {
      model: {
        source: '',
        ambient: '',
        signer: '',
        prescriptionNo: '',
        timeRange: [],
        startTime: '',
        endTime: ''
      },

      source: {
        ENUM_DATA_SOURCE: CONSTANT.ENUM_DATA_SOURCE,
        ENUM_DATA_BACKGROUND: CONSTANT.ENUM_DATA_BACKGROUND
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  watch: {
    'model.timeRange'(timeRange) {
      this.model.startTime = timeRange?.[0] ?? ''
      this.model.endTime = timeRange?.[1] ?? ''
    }
  },

  methods: {
    get() {
      const fetch = Service.getLogListByYwq
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params }).then((res) => {
        return res
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mid-line {
  width: 20px;
  height: 1px;
  background-color: #dddddd;
}
::v-deep .dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 10px 0 0;

  &.primary {
    background: #e4e4e4;
  }
  &.info {
    background: var(--q-color-warning);
  }
  &.success {
    background: var(--q-color-primary);
  }
  &.danger {
    background: var(--q-color-negative);
  }
}
::v-deep .el-form-item__label {
  padding: 0;
}
</style>
