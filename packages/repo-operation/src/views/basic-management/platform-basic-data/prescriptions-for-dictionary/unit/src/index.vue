<template>
  <div class="layout-route">

    <div  class="card card-search q-mb-md">
      <el-form v-bind:model="model"
               inline="inline"
               label-suffix="："
               size="mini"
               v-on:keyup.enter.native="search"
               v-on:submit.native.prevent>

        <el-form-item label="单位名称">
          <el-input v-model="model.name"
                    placeholder="请输入名称"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="单位类别">
          <el-select v-model="model.type"
                     placeholder="请选择单位类别"
                     clearable>
            <el-option v-for="item in source.unitList"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     v-on:click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">
      <div class="q-mb-lg">
        <el-button type="primary" v-on:click="add">新增</el-button>
      </div>
      <PeaceTable ref="table"
                  size="mini"
                  pagination>

        <PeaceTableColumn min-width="200px"
                          label="单位编码"
                          prop="code"></PeaceTableColumn>

        <PeaceTableColumn min-width="150px"
                          label="单位名称"
                          prop="name"></PeaceTableColumn>

        <PeaceTableColumn min-width="120px"
                          label="单位类别"
                          prop="typeName"></PeaceTableColumn>

        <PeaceTableColumn min-width="160px"
                          label="更新时间"
                          prop="updateTime"></PeaceTableColumn>

        <PeaceTableColumn min-width="100px"
                          label="更新用户"
                          prop="createUser"></PeaceTableColumn>

        <PeaceTableColumn width="120px"
                          label="操作"
                          fixed="right">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="modify(scope.row)">修改</el-button>
          </template>

        </PeaceTableColumn>

      </PeaceTable>
    </div>

    <edit-unit v-model="dialog.visible"
               v-if="dialog.visible"
               v-bind:title = "dialog.title"
               v-bind:data="dialog.data"
               v-on:refresh="search"></edit-unit>


  </div>
</template>

<script>
import Service from './service/index'
import EditUnit from "./components/EditUnit";
import CONSTANT from "./constant"

export default {
  name: 'platform_icd_encode',
  components: {
    EditUnit,
  },
  data() {
    return {
      dialog:  {
        visible: false,
        title: undefined,
        data: undefined,
      },

      showRule: true,

      model: {
        name: undefined,
        type: undefined
      },

      source: {
        unitList: CONSTANT.UNIT_TYPE,
      },
    }
  },
  async mounted() {
    this.source.drugCodingStatus = await Peace.identity.dictionary.getList('unitList')
    this.$nextTick().then(() => {
      this.search()
    })
  },

  methods: {
    search() {
      const fetch = Service.getList
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({ fetch, params }).then((res) => {
        return res
      })
    },
    add() {
      this.dialog.title = "新增单位"
      this.dialog.data = undefined
      this.dialog.visible = true
    },
    modify(item) {
      this.dialog.title = "编辑单位"
      this.dialog.data = item
      this.dialog.visible = true
    }
  }
}
</script>

<style>
</style>
