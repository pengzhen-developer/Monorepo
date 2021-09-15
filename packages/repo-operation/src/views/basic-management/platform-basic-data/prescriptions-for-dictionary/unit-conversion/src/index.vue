<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline="inline"
               label-suffix="："
               size="mini"
               v-bind:model="model"
               v-on:keyup.enter.native="search"
               v-on:submit.native.prevent>

        <el-form-item label="单位组名称">
          <el-input v-model="model.ucfName"
                    clearable
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="单位名称">
          <el-input v-model="model.formula"
                    clearable
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     v-on:click="search">查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <div class="q-mb-lg">
        <el-button type="primary" v-on:click="add">新增</el-button>
      </div>
      <PeaceTable ref="table"
                  pagination
                  size="mini">

        <PeaceTableColumn label="单位组编码"
                          min-width="220px"
                          prop="ucfNo"></PeaceTableColumn>

        <PeaceTableColumn label="单位组名称"
                          min-width="150px"
                          prop="ucfName"></PeaceTableColumn>

        <PeaceTableColumn label="单位转换关系"
                          min-width="220px"
                          prop="formula">
          <template slot-scope="scope">
            <span>{{ mapTransInfo(scope.row.formula || []) }}</span>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn label="更新时间"
                          min-width="160px"
                          prop="updateTime"></PeaceTableColumn>

        <PeaceTableColumn label="更新用户"
                          min-width="100px"
                          prop="createUser"></PeaceTableColumn>

        <PeaceTableColumn fixed="right"
                          label="操作"
                          width="120px">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="modify(scope.row)">编辑
            </el-button>
          </template>

        </PeaceTableColumn>

      </PeaceTable>
    </div>

    <edit-unit-conversion v-if="dialog.visible"
                          v-model="dialog.visible"
                          v-bind:data="dialog.data"
                          v-on:refresh="search"></edit-unit-conversion>

  </div>
</template>

<script>
import Service from './service/index'
import EditUnitConversion from "./components/EditUnitConversion";

export default {
  name: 'platform_icd_encode',
  components: {
    EditUnitConversion,
  },
  data() {
    return {
      dialog: {
        visible: false,
        data: undefined,
      },

      model: {
        ucfName: undefined,
        formula: undefined
      },

      source: {
        unitList: [],
      },
    }
  },
  async mounted() {
    this.$nextTick().then(() => {
      this.search()
    })
  },
  methods: {
    mapTransInfo(data) {
      if (Peace.util.isArray(data)) {
        return data.reduce(function (acc, item) {
          return `${acc}${item.factor}${item.unit}=`
        }, "").slice(0, -1)
      } else {
        return "--"
      }

    },
    search() {
      const fetch = Service.getList
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({fetch, params}).then((res) => {
        return res
      })
    },
    add() {
      this.dialog.data = undefined
      this.dialog.visible = true
    },
    modify(item) {
      this.dialog.data = item
      this.dialog.visible = true
    }
  }
}
</script>

<style>
</style>
