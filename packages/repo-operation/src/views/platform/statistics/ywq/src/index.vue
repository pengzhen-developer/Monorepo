<template>
  <div>
    <el-form v-bind:model="model"
             inline="inline"
             label-width="auto"
             label-position="right"
             label-suffix=""
             size="mini">

      <el-form-item label="调用来源：">
        <el-select v-model="model.source"
                   placeholder="全部"
                   clearable>
          <el-option v-for="(value, label) in source.ENUM_DATA_SOURCE"
                     v-bind:key="value"
                     v-bind:label="label"
                     v-bind:value="value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="调用环境：">
        <el-select v-model="model.ambient"
                   placeholder="全部"
                   clearable>
          <el-option v-for="(value, label) in source.ENUM_DATA_BACKGROUND"
                     v-bind:key="value"
                     v-bind:label="label"
                     v-bind:value="value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="签名人：">
        <el-input v-model="model.signer"
                  placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="处方编号：">
        <el-input v-model="model.prescriptionNo"
                  placeholder="请输入"></el-input>
      </el-form-item>

      <!-- <el-form-item label="业务主键值：">
        <el-input v-model="model.primaryKey"
                  placeholder="请输入"></el-input>
      </el-form-item> -->

      <el-form-item label="操作日期：">
        <div class="row items-center">
          <el-date-picker type="date"
                          placeholder="开始时间"
                          v-model="model.startTime"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          :pickerOptions="startPickerOptions"
                          style="width: 180px;"></el-date-picker>
          <div class="q-mx-md mid-line"></div>
          <el-date-picker placeholder="结束时间"
                          v-model="model.endTime"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          :pickerOptions="endPickerOptions"
                          style="width: 180px;"></el-date-picker>
        </div>
      </el-form-item>

      <el-form-item class="q-ml-md">
        <el-button type="primary"
                   v-on:click="get">搜索</el-button>

      </el-form-item>
    </el-form>

    <PeaceTable ref="table"
                size="mini"
                pagination>
      <el-table-column min-width="100px"
                       width="100px"
                       label="序号"
                       align="center"
                       type="index"></el-table-column>
      <el-table-column min-width="150px"
                       align="center"
                       label="调用来源"
                       prop="source"></el-table-column>
      <el-table-column min-width="150px"
                       align="center"
                       label="调用环境"
                       prop="ambient"></el-table-column>
      <el-table-column min-width="150px"
                       align="center"
                       label="签名人"
                       prop="signer"></el-table-column>
      <el-table-column min-width="150px"
                       align="center"
                       label="处方编号"
                       prop="prescriptionNo"></el-table-column>
      <el-table-column min-width="150px"
                       align="center"
                       label="调用时间"
                       prop="callTime"></el-table-column>

    </PeaceTable>

  </div>
</template>

<script>
import Peace from '@src/library'
import Service from './service'
import CONSTANT from './constant'

export default {
  data() {
    return {
      model: {
        source: '',
        ambient: '',
        signer: '',
        prescriptionNo: '',
        startTime: '',
        endTime: ''
      },

      startPickerOptions: {
        disabledDate: (time) => {
          if (this.model.endTime) {
            return time.getTime() > new Date(this.model.endTime).getTime()
          } else {
            return time.getTime() > Date.now()
          }
        }
      },
      endPickerOptions: {
        disabledDate: (time) => {
          if (this.model.startTime) {
            return (
              time.getTime() < new Date(this.model.startTime).setDate(new Date(this.model.startTime).getDate() - 1) ||
              time.getTime() > Date.now()
            )
          } else {
            return time.getTime() > Date.now()
          }
        }
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
