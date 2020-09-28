// 添加处方药品

<template>

  <div class="drug-select">
    <!-- 未选择药品 -->
    <el-card v-if="!data.drugName"
             style="min-height: 270px"
             shadow="never">
      <el-autocomplete class="full-width"
                       style="height: 40px;"
                       placeholder="请输入药品名称..."
                       popper-class="auto-width"
                       v-model="drugQueryString"
                       v-bind:fetch-suggestions="getDrugList"
                       v-on:select="drugSelect">
        <template slot-scope="{ item }">
          <div class="q-py-xs"
               v-bind:class="{ disabled : item.drugStatus === 'disable'}">
            <div>
              <el-tag class="q-mr-sm"
                      effect="dark"
                      type="warning"
                      v-if="item.drugStatus === 'disable'">停用</el-tag>{{ item.drugName }}
            </div>
            <div class="text-caption text-grey-6">
              <span class="q-mr-sm">{{ item.specification }}</span>
              <span>{{ item.companyName }}</span>
            </div>
          </div>
        </template>
      </el-autocomplete>
    </el-card>

    <!-- 已选择药品 -->
    <el-card v-else
             shadow="never">
      <div slot="header"
           class="flex justify-between items-center">

        <div class="flex justify-between items-center full-width">
          <el-tag class="q-mr-sm"
                  effect="dark"
                  type="warning"
                  v-if="data.drugStatus === 'disable'">停用</el-tag>
          <span class="q-mr-md col text-weight-medium ellipsis text-subtitle1"
                v-bind:title="data.drugName">{{ data.drugName }}</span>
          <el-button icon="el-icon-delete"
                     type="text"
                     class="text-red"
                     v-on:click="remove"></el-button>
        </div>
        <div class="flex justify-between items-center full-width">
          <span class="text-caption">{{ data.specification }}</span>
        </div>
      </div>

      <div slot="default">

        <el-form class="durg-select-form"
                 label-width="auto"
                 label-position="left"
                 v-bind:model="data">

          <el-form-item label="给药途径："
                        required>
            <el-select class="col inline-block full-width"
                       placeholder="请选择"
                       v-model="data.drugRouteId"
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
                       v-model="data.drugFrequencyId"
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
                               v-bind:min="1"
                               v-bind:precision="2"
                               v-model="data.singleDose">
              </el-input-number>
              <div class="flex items-center bg-grey-2 q-px-xs"
                   style="border-radius: 5px">
                {{ data.drugUnit }}
              </div>
            </div>
          </el-form-item>

          <el-form-item label="药品数量："
                        required>
            <el-input-number class="full-width inline-block"
                             controls-position="right"
                             v-bind:min="1"
                             v-bind:precision="0"
                             v-model="data.drugNum">
            </el-input-number>
          </el-form-item>

          <el-form-item label="用药天数：">
            <el-input-number class="full-width inline-block"
                             controls-position="right"
                             v-bind:min="1"
                             v-bind:max="60"
                             v-bind:precision="0"
                             v-model="data.useDrugDays">
            </el-input-number>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import Peace from '@src/library'
import Service from './service'

export default {
  props: {
    data: {
      type: Object,
      default() {
        return {
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
    }
  },

  inject: ['provideDrugFrequencyList', 'provideDrugRouteList'],

  data() {
    return {
      drugQueryString: ''
    }
  },

  computed: {
    drugFrequencyList() {
      return this.provideDrugFrequencyList()
    },

    drugRouteList() {
      return this.provideDrugRouteList()
    }
  },

  watch: {
    data: {
      handler() {
        this.$emit('update:data', this.data)
      },
      deep: true
    }
  },

  methods: {
    getDrugList(queryString, cb) {
      const params = {
        drugName: queryString
      }

      if (params.drugName) {
        Service.getDrugList(params).then((res) => {
          cb(res.data.list)
        })
      } else {
        Service.getCommonlyDrugList(params).then((res) => {
          cb(res.data.list)
        })
      }
    },

    drugRouteChange(id) {
      const drugRoute = this.drugRouteList.find((drugRoute) => drugRoute.id === id)

      this.data.drugRoute = drugRoute.drugway_name
      this.data.drugRouteId = drugRoute.id
    },

    drugFrequencyChange(id) {
      const drugFrequency = this.drugFrequencyList.find((drugFrequency) => drugFrequency.id === id)

      this.data.drugFrequency = drugFrequency.drugtimes_name
      this.data.drugFrequencyId = drugFrequency.id
    },

    drugSelect(drug) {
      const drugObject = Peace.util.deepClone(drug)

      if (drugObject.drugStatus !== 'disable') {
        this.$emit('add', drugObject)
      } else {
        Peace.util.warning('药品已停用')
      }
    },

    remove() {
      Peace.util.confirm('确定删除此药品吗？', '提示', {}, () => {
        const drugObject = Peace.util.deepClone(this.data)

        this.$emit('remove', drugObject)
      })
    }
  }
}
</script>

<style lang="scss">
.auto-width {
  width: auto !important;
  min-width: 200px !important;
  max-width: 800px !important;
}
</style>

<style lang="scss" scoped>
/deep/ .el-card__header,
/deep/ .el-card__body {
  padding: 8px;
}

/deep/ .durg-select-form {
  .el-form-item--mini.el-form-item {
    margin-bottom: 8px;
  }
}

/deep/ .el-autocomplete {
  .el-input--mini .el-input__inner {
    border: 0;
    padding: 16px 8px;
  }
}

/deep/ .el-input-number .el-input__inner,
/deep/ .el-select .el-input__inner {
  text-align: left;
  padding: 0 8px !important;
}

/deep/ .el-form-item__label {
  padding: 0 4px 0 0;
}

/deep/ .el-input-number--mini .el-input-number__decrease,
/deep/ .el-input-number--mini .el-input-number__increase {
  width: 24px;
}
</style>