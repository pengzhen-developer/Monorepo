// 添加处方药品

<template>
  <div class="q-px-xl q-py-md"
       style="min-height: 400px">

    <el-form class="durg-select-form q-px-xl flex column q-mb-md"
             label-width="auto"
             label-position="left"
             v-bind:model="model">
      <el-form-item label="药品名称：">
        <div class="col full-width text-weight-bold">{{ data.drugName }}</div>
      </el-form-item>
      <el-form-item label="药品剂量：">
        <div class="col full-width text-weight-bold">{{ data.specification }}</div>
      </el-form-item>
      <el-form-item label="生产厂商：">
        <div class="col full-width text-weight-bold">{{ data.companyName }}</div>
      </el-form-item>

      <el-form-item label="给药途径："
                    required>
        <el-select class="col inline-block full-width"
                   placeholder="请选择"
                   v-model="model.drugRouteId"
                   v-on:change="drugRouteChange">
          <el-option v-bind:key="item.id"
                     v-bind:label="item.drugway_name"
                     v-bind:value="item.id"
                     v-for="item in drugRouteList"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用药频次："
                    required>
        <el-select class="col inline-block full-width"
                   placeholder="请选择"
                   v-model="model.drugFrequencyId"
                   v-on:change="drugFrequencyChange">
          <el-option v-bind:key="item.id"
                     v-bind:label="item.drugtimes_name"
                     v-bind:value="item.id"
                     v-for="item in drugFrequencyList">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="单次剂量："
                    required>
        <div class="flex">
          <el-input-number class="col inline-block"
                           controls-position="right"
                           v-bind:min="0"
                           v-bind:precision="2"
                           v-model="model.singleDose">
          </el-input-number>
          <div class="flex items-center bg-grey-2 q-px-sm"
               style="border-radius: 5px">
            {{ data.drugUnit }}
          </div>
        </div>
      </el-form-item>

      <el-form-item label="药品数量："
                    required>
        <el-input-number class="full-width inline-block"
                         controls-position="right"
                         v-bind:min="0"
                         v-bind:precision="0"
                         v-model="model.drugNum">
        </el-input-number>
      </el-form-item>

      <el-form-item label="用药天数：">
        <el-input-number class="full-width inline-block"
                         controls-position="right"
                         v-bind:min="1"
                         v-bind:max="60"
                         v-bind:precision="0"
                         v-model="model.useDrugDays">
        </el-input-number>
      </el-form-item>
    </el-form>

    <div class="text-center">
      <el-button style="width: 80px;"
                 v-on:click="prev">上一步</el-button>
      <el-button style="width: 80px;"
                 type="primary"
                 v-bind:disabled="nextButtonDisabled"
                 v-on:click="next">完成</el-button>
    </div>
  </div>
</template>

<script>
import Peace from '@src/library'

export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  inject: ['provideDrugFrequencyList', 'provideDrugRouteList'],

  data() {
    return {
      model: {
        drugId: undefined,
        drugName: undefined,
        drugRoute: undefined,
        drugRouteId: undefined,
        drugFrequency: undefined,
        drugFrequencyId: undefined,
        drugNum: undefined,
        singleDose: undefined,
        useDrugDays: undefined
      }
    }
  },

  computed: {
    drugFrequencyList() {
      return this.provideDrugFrequencyList()
    },

    drugRouteList() {
      return this.provideDrugRouteList()
    },

    nextButtonDisabled() {
      return !(this.model.drugNum && this.model.singleDose && this.model.drugFrequencyId && this.model.drugRouteId)
    }
  },

  created() {
    this.setPropsToModel()
  },

  methods: {
    setPropsToModel() {
      this.model.drugId = this.data.drugId ?? undefined
      this.model.drugName = this.data.drugName ?? undefined
      this.model.drugRoute = this.data.drugRoute ?? undefined
      this.model.drugRouteId = this.data.drugRouteId ?? undefined
      this.model.drugFrequency = this.data.drugFrequency ?? undefined
      this.model.drugFrequencyId = this.data.drugFrequencyId ?? undefined
      this.model.drugNum = this.data.drugNum ?? undefined
      this.model.singleDose = this.data.singleDose ?? undefined
      this.model.useDrugDays = this.data.useDrugDays ?? undefined
    },

    drugRouteChange(id) {
      const drugRoute = this.drugRouteList.find((drugRoute) => drugRoute.id === id)

      this.model.drugRoute = drugRoute.drugway_name
      this.model.drugRouteId = drugRoute.id
    },

    drugFrequencyChange(id) {
      const drugFrequency = this.drugFrequencyList.find((drugFrequency) => drugFrequency.id === id)

      this.model.drugFrequency = drugFrequency.drugtimes_name
      this.model.drugFrequencyId = drugFrequency.id
    },

    prev() {
      this.$emit('cancel')
    },

    next() {
      const data = Peace.util.deepClone(this.model)

      this.$emit('success', data)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .durg-select-form {
  .el-form-item--mini.el-form-item {
    margin-bottom: 8px;
  }
}

::v-deep .el-autocomplete {
  .el-input--mini .el-input__inner {
    border: 0;
    height: 56px;
    padding: 16px 8px;
  }
}

::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>