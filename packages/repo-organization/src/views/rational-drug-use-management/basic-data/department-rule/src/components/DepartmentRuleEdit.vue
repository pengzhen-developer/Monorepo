<template>
  <div class="layout-route">
    <el-alert type="warning"
              title="本机构所有本位码相同的药品在同一科室将共用此科室药品规则，多人同时编辑将会出现新版本覆盖旧版本的情况。"
              show-icon=""
              v-bind:closable="false"></el-alert>

    <div class="card q-mb-md">
      <div class="q-mb-md">
        <el-button icon="el-icon-arrow-left"
                   v-on:click="back">返回上一页</el-button>
      </div>

      <div class="text-subtitle1 text-weight-bold q-mb-sm">
        <span class="text-grey-333">科室药品规则编辑 - {{ department.label }}</span>
      </div>

      <div class="flex text-grey-333 ">
        <div class="q-mr-md text-weight-bold">{{ data.drugName }}</div>
        <div class="q-mr-md">{{ data.drugCscCode }}</div>
        <div class="q-mr-md">{{ data.specifications }}</div>
        <div class="q-mr-md">{{ data.productName }}</div>
      </div>
    </div>

    <div class="card"
         style="margin-bottom: 72px">
      <DrugRule ref="ruleView"
                style="padding: 0;"
                v-bind:id="data.drugCscCode"
                v-bind:drugType="'department'"></DrugRule>
    </div>

    <div class="fixed-bottom card text-right">
      <el-button v-on:click="back">退出编辑</el-button>
      <el-button type="primary"
                 v-bind:loading="loading"
                 v-on:click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
import Service from '../service'

export default {
  props: {
    data: Object,
    department: Object,
    visible: Boolean
  },

  components: {
    DrugRule: () => import('@src/views/rational-drug-use-management/basic-data/PrescriptionRule')
  },

  data() {
    return {
      loading: false
    }
  },

  computed: {
    internalVisible: {
      get() {
        return this.visible
      },

      set(value) {
        this.$emit('update:visible', value)
      }
    }
  },

  methods: {
    back() {
      this.internalVisible = false

      this.$emit('fetch')
    },

    save() {
      this.$refs.ruleView.validate().then((data) => {
        this.loading = true

        Service.saveRules({
          drugCscCode: this.data.drugCscCode,
          departmentCode: this.department.value,
          departmentName: this.department.label,
          custDrugsCode: this.data.drugCoding,
          drugType: 'department',
          submitReview: 0,
          rules: data
        })
          .then(() => {
            Peace.util.success('保存成功')
          })
          .finally(() => {
            this.loading = false
            this.$refs.ruleView.loading = false

            this.back()
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-route {
  padding: 0 !important;
}
</style>