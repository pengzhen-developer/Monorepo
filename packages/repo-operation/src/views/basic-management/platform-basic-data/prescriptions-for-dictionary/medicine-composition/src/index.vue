<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline="inline"
               label-suffix="："
               size="mini"
               v-bind:model="model"
               v-on:keyup.enter.native="search"
               v-on:submit.native.prevent>

        <el-form-item label="药品成分">
          <el-input v-model="model.cnName"
                    clearable
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="成分类别">
          <el-input v-model="model.compositionTypeName"
                    clearable
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="更新日期">
          <peace-date-picker v-model.trim="model.timeRange"
                             type="daterange"
                             value-format="yyyy-MM-dd"></peace-date-picker>
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
                  :tableProps="{
                            pageIndex: 'current',
                            pageSize: 'size'
                          }"
                  pagination
                  size="mini">

        <PeaceTableColumn label="系统编码"
                          min-width="220px"
                          prop="code"></PeaceTableColumn>

        <PeaceTableColumn label="药品成分"
                          min-width="150px"
                          prop="cnName"></PeaceTableColumn>

        <PeaceTableColumn label="成分类别"
                          min-width="150px"
                          prop="compositionTypeName"></PeaceTableColumn>

        <PeaceTableColumn label="成分类别（英文）"
                          min-width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.enName || "--"}}</span>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn label="更新时间"
                          min-width="160px"
                          prop="updateTime"></PeaceTableColumn>

        <PeaceTableColumn fixed="right"
                          label="操作"
                          width="120px">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="modify(scope.row)">修改
            </el-button>
          </template>

        </PeaceTableColumn>

      </PeaceTable>
    </div>

    <edit-medicine-composition v-model="dialog.visible"
                               v-if="dialog.visible"
                               v-bind:data="dialog.data"
                               v-bind:title="dialog.title"
                               v-bind:sourceList="dialog.sourceList"
                               v-on:refresh="search"></edit-medicine-composition>

  </div>
</template>

<script>
import Service from './service/index'
import EditMedicineComposition from "./components/EditMedicineComposition";

export default {
  name: 'platform_icd_encode',
  components: {
    EditMedicineComposition,
  },
  data() {
    return {
      dialog: {
        visible: false,
        title: '',
        data: undefined,
        sourceList: []
      },

      model: {
        cnName: undefined,
        compositionTypeName: undefined,
        beginTime: undefined,
        endTime: undefined,
        timeRange: []
      },

      source: {
        unitList: [],
      },
    }
  },
  async mounted() {
    this.$nextTick().then(() => {
      this.search()
      this.remoteList()
    })
  },

  watch: {
    'model.timeRange'(timeRange) {
      this.model.beginTime = timeRange?.[0]
      this.model.endTime = timeRange?.[1]
    }
  },

  methods: {
    remoteList() {
      Service.getCategoryList({classifyName: ''}).then((res) => {
        this.dialog.sourceList = res.data
      })
    },
    search() {
      const fetch = Service.getList
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({fetch, params}).then((res) => {
        let tmp = res
        tmp.data.list = res.data.records
        return tmp
      })
    },
    add() {
      this.dialog.title = "新增药品成分"
      this.dialog.data = undefined
      this.dialog.visible = true
    },

    modify(item) {
      this.dialog.title = "修改药品成分"
      this.dialog.data = item
      this.dialog.visible = true
    }
  }
}
</script>

<style>
</style>
