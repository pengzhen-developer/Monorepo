<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form v-bind:model="model"
               inline="inline"
               label-suffix="："
               size="mini"
               v-on:keyup.enter.native="search"
               v-on:submit.native.prevent>

        <el-form-item label="过敏信息">
          <el-input v-model="model.name"
                    placeholder="请输入"
                    clearable></el-input>
        </el-form-item>

        <el-form-item label="更新日期">
          <peace-date-picker value-format="yyyy-MM-dd"
                             type="daterange"
                             v-model.trim="model.timeRange"></peace-date-picker>
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

        <PeaceTableColumn min-width="150px"
                          label="系统编码"
                          prop="code"></PeaceTableColumn>

        <PeaceTableColumn min-width="150px"
                          label="过敏信息"
                          prop="name"></PeaceTableColumn>

        <PeaceTableColumn min-width="150px"
                          label="更新时间"
                          prop="updateTime"></PeaceTableColumn>

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

    <add-allergy-info v-model="addDialog.visible"
                      v-if="addDialog.visible"
                      v-on:refresh="search"></add-allergy-info>

    <modify-allergy-info v-model="modifyDialog.visible"
                         v-if="modifyDialog.visible"
                         v-bind:data="modifyDialog.data"
                         v-on:refresh="search"></modify-allergy-info>

  </div>
</template>

<script>
import Service from './service/index'
import AddAllergyInfo from "./components/AddAllergyInfo";
import ModifyAllergyInfo from "./components/ModifyAllergyInfo";
export default {
  name: 'platform_icd_encode',
  components: {
    AddAllergyInfo,
    ModifyAllergyInfo
  },
  data() {
    return {
      addDialog: {
        visible: false,
      },

      modifyDialog:  {
        visible: false,
        data: undefined,
      },

      model: {
        allergyInfo: undefined,
        timeRange: [],
        beginTime: '',
        endTime: ''
      },

      source: {
        drugCodingStatus: [],
        organizationList: []
      },

      importDialog: {
        visible: false
      }
    }
  },

  watch: {
    'model.timeRange'(timeRange) {
      this.model.beginTime = timeRange?.[0] ?? ''
      this.model.endTime = timeRange?.[1] ?? ''
    }
  },
  async mounted() {
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
      this.addDialog.visible = true
    },
    modify(item) {
      this.modifyDialog.data = item
      this.modifyDialog.visible = true
    }
  }
}
</script>

<style>
</style>

