<template>
  <div>
    <div class="card">
      <h2 class="cust-Name ">{{hospitalName}}</h2>
      <PeaceTable ref="table"
                  pagination>
        <PeaceTableColumn label="序号"
                          type="index"
                          align="center"
                          width="80px">
          <template slot-scope="{ $index, _self }">
            {{ (_self.Pagination.internalCurrentPage - 1) * (_self.Pagination.internalPageSize) + $index + 1 }}
          </template>
        </PeaceTableColumn>
        <PeaceTableColumn label="云仓名称"
                          prop="Name"
                          min-width="180px"></PeaceTableColumn>
        <PeaceTableColumn label="云仓系统"
                          prop="SysName"
                          min-width="180px"></PeaceTableColumn>

        <PeaceTableColumn label="创建时间"
                          prop="CreateTime"
                          min-width="180px"></PeaceTableColumn>
      </PeaceTable>
    </div>

  </div>
</template>

<script>
import Service from '../service'
export default {
  name: 'CloudWarehouseList',
  data() {
    return {
      custcode: Peace.cache.sessionStorage.get('10534-custcode'),
      hospitalName: Peace.cache.sessionStorage.get('10534-hospitalName'),
      model: {}
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.fetch()
    })
  },
  methods: {
    fetch() {
      const fetch = Service.getWarehouseList
      const params = Object.assign({}, this.model)
      params.CustCode = this.custcode
      this.$refs.table.reloadData({ fetch, params })
    }
  }
}
</script>

<style lang="scss" scoped>
.cust-Name {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: 600;
  line-height: 30px;
  color: #333333;
  text-align: center;
}
</style>