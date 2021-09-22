<template>
  <div class="layout-route full-width">
    <div class="card card-search q-mb-md">
      <el-form inline
               label-suffix="："
               v-on:keyup.enter.native="fetch"
               v-on:submit.native.prevent
               v-bind:model="model">
        <el-form-item label="名称">
          <peace-input placeholder="请输入"
                       v-model.trim="model.wordName"></peace-input>
        </el-form-item>
        <el-form-item label="异常场景">
          <peace-select v-model="model.exceptionWay"
                        placeholder="全部">
            <el-option v-for="item in source.exceptionWay"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </peace-select>
        </el-form-item>
        <el-form-item label="异常类型">
          <peace-select v-model="model.exceptionType"
                        placeholder="全部">
            <el-option v-for="item in source.exceptionType"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </peace-select>
        </el-form-item>
        <el-form-item label="日期">
          <peace-date-picker type="daterange"
                             value-format="yyyy-MM-dd"
                             v-model="timeRange"></peace-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button v-on:click="fetch"
                     type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="card">
      <PeaceTable ref="table"
                  pagination>
        <PeaceTableColumn label="序号"
                          type="index"
                          width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="名称"
                          prop="wordName"
                          min-width="220px"></PeaceTableColumn>
        <PeaceTableColumn label="异常场景"
                          prop="exceptionWay"
                          min-width="160px">
          <template slot-scope="scope">
            {{ scope.row.exceptionWay| filterDictionary(source.exceptionWay,'--') }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="所属机构"
                          min-width="180px">
          <template slot-scope="scope">
            {{ scope.row.organName || '--' }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="异常类型"
                          min-width="140px"
                          prop="exceptionType">
          <template slot-scope="scope">
            {{ scope.row.exceptionType| filterDictionary(source.exceptionType,'--') }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="时间"
                          prop="createTime"
                          min-width="180px">
        </PeaceTableColumn>

      </PeaceTable>

    </div>

  </div>
</template>

<script>
import Service from './service'
export default {
  name: 'ExceptionLog',
  components: {},
  data() {
    return {
      model: {
        wordName: '',
        exceptionWay: '',
        exceptionType: '',
        startDate: '',
        endDate: ''
      },
      source: {
        exceptionWay: [],
        exceptionType: []
      },
      timeRange: []
    }
  },
  async created() {
    this.source.exceptionWay = await Peace.identity.dictionary.getList('cdss_word_exception_way')
    this.source.exceptionType = await Peace.identity.dictionary.getList('cdss_word_exception_type')
  },
  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },
  watch: {
    timeRange(value) {
      this.model.startDate = value?.[0] ?? ''
      this.model.endDate = value?.[1] ?? ''
    }
  },
  methods: {
    fetch() {
      const fetch = Service.getExceptionList
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>