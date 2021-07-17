<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline="inline"
               label-suffix="："
               size="mini"
               v-bind:model="model"
               v-on:keyup.enter.native="search"
               v-on:submit.native.prevent>

        <el-form-item label="人群名称">
          <el-input v-model="model.name"
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
        <el-button type="primary"
                   v-on:click="add">新增</el-button>
      </div>
      <PeaceTable ref="table"
                  pagination
                  size="mini">

        <PeaceTableColumn label="系统编码"
                          prop="code"
                          min-width="200px"></PeaceTableColumn>

        <PeaceTableColumn label="人群名称"
                          min-width="150px"
                          prop="name"></PeaceTableColumn>

        <PeaceTableColumn label="人群年龄单位"
                          min-width="100px"
                          prop="ageUnit">

          <template slot-scope="scope">
            {{scope.row.ageUnit | filterDictionary(source.unitList,'--')}}
          </template>

        </PeaceTableColumn>

        <PeaceTableColumn label="人群年龄最小值"
                          min-width="100px"
                          prop="ageMin"></PeaceTableColumn>

        <PeaceTableColumn label="人群年龄最大值"
                          min-width="100px"
                          prop="ageMax"></PeaceTableColumn>

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

    <edit-age-classification v-if="dialog.visible"
                             v-model="dialog.visible"
                             v-bind:data="dialog.data"
                             v-bind:title="dialog.title"
                             v-on:refresh="search"></edit-age-classification>

  </div>
</template>

<script>
import Service from './service/index'
import EditAgeClassification from './components/EditAgeClassification'

export default {
  name: 'platform_icd_encode',
  components: {
    EditAgeClassification
  },
  data() {
    return {
      dialog: {
        visible: false,
        title: undefined,
        data: undefined
      },

      model: {
        name: undefined,
        beginTime: '',
        endTime: '',
        timeRange: []
      },

      source: {
        unitList: []
      }
    }
  },
  async mounted() {
    this.source.unitList = await Peace.identity.dictionary.getList('age_type')
    this.$nextTick().then(() => {
      this.search()
    })
  },

  watch: {
    'model.timeRange'(timeRange) {
      this.model.beginTime = timeRange?.[0] ?? ''
      this.model.endTime = timeRange?.[1] ?? ''
    }
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
      this.dialog.title = '新增年龄分类'
      this.dialog.data = undefined
      this.dialog.visible = true
    },
    modify(item) {
      this.dialog.title = '修改年龄分类'
      this.dialog.data = item
      this.dialog.visible = true
    }
  }
}
</script>

<style>
</style>

