<template>
  <div class="layout-route">

    <PeaceTable ref="table"
                size="mini"
                pagination>
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

    </PeaceTable>
  </div>
</template>

<script>
import Service from '../service/index'

export default {
  name: 'AssociatedICDCodeDetails',
  props: {
    data: Object
  },

  watch: {
    data: {
      handler() {
        if (this.data != null) {
          this.model.code = this.data.code
        }
      },
      immediate: true
    }
  },

  data() {
    return {
      model: {
        code: ''
      }
    }
  },

  async mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {
      const fetch = Service.getPlatformDiseaseDiagnosisList
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params })
    }
  }
}
</script>


<style lang="scss" scoped>
</style>