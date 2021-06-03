<template>
  <div class="layout-route">
    <div class="card card-search q-mb-md">
      <el-form inline="inline"
               label-suffix="："
               size="mini"
               v-bind:model="model"
               v-on:keyup.enter.native="search"
               v-on:submit.native.prevent>

        <el-form-item label="成分类别">
          <el-input v-model="model.classifyName"
                    clearable
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="ATC编码">
          <el-input v-model="model.atcCode"
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
                  pagination
                  size="mini">

        <PeaceTableColumn align="center"
                          label="ATC级别"
                          prop="atcGrade"
                          width="88px"></PeaceTableColumn>

        <PeaceTableColumn label="父节点"
                          min-width="120px">
          <template slot-scope="scope">
            <span>{{ scope.row.parentNode || "--" }}</span>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn label="ATC编码"
                          min-width="150px">
          <template slot-scope="scope">
            <el-button type="text"
                       v-on:click="action(scope.row, ActionType.ATCCode)">{{ scope.row.atcCode }}
            </el-button>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn label="成分类别（英文）"
                          min-width="280px">

          <template slot-scope="scope">
            <span class="cursor-pointer ellipsis text-primary text-weight-medium"
                  v-on:click="action(scope.row, ActionType.ComponentCategoryEnglish)">
              {{ scope.row.classifyNameEn }}
            </span>
          </template>

        </PeaceTableColumn>

        <PeaceTableColumn label="成分类别"
                          min-width="200px">
          <template slot-scope="scope">
            <span class="cursor-pointer ellipsis text-primary text-weight-medium"
                  v-on:click="action(scope.row, ActionType.ComponentCategory)">
              {{ scope.row.classifyName }}
            </span>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn label="更新时间"
                          min-width="180px"
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

    <edit-a-t-c-drug-classification v-if="dialog.visible"
                                    v-model="dialog.visible"
                                    v-bind:data="dialog.data"
                                    v-bind:title="dialog.title"
                                    v-on:refresh="search"></edit-a-t-c-drug-classification>

  </div>
</template>

<script>
import Service from './service/index'
import EditATCDrugClassification from "./components/EditATCDrugClassification";

export default {
  name: 'platform_icd_encode',
  components: {
    EditATCDrugClassification,
  },
  data() {
    return {
      dialog: {
        visible: false,
        title: undefined,
        data: undefined,
      },

      model: {
        classifyName: undefined,
        atcCode: undefined,
        atcCodeByClick: undefined,
        timeRange: []
      },

      source: {
        unitList: [],
      },

      ActionType: Object.freeze({
        ATCCode: 1,
        ComponentCategory: 2,
        ComponentCategoryEnglish: 3
      }),
    }
  },
  async mounted() {
    this.$nextTick().then(() => {
      this.search()
    })
  },

  watch: {
    'model.timeRange'(timeRange) {
      this.model.beginTime = timeRange?.[0]
      this.model.endTime = timeRange?.[1]
    }
  },

  methods: {
    search() {
      const fetch = Service.getList
      const params = Peace.util.deepClone(this.model)
      this.$refs.table.reloadData({fetch, params}).then((res) => {
        return res
      }).finally(() => this.model.atcCodeByClick = undefined)
    },
    add() {
      this.dialog.title = "新增ATC药物分类"
      this.dialog.data = undefined
      this.dialog.visible = true
    },
    modify(item) {
      this.dialog.title = "修改ATC药物分类"
      this.dialog.data = item
      this.dialog.visible = true
    },
    action(item) {
      this.model.atcCodeByClick = item.atcCode
      this.search()
      // switch (type) {
      //   case this.ActionType.ATCCode:
      //     // ATC 编码
      //     break
      //   case this.ActionType.ComponentCategory:
      //     // 成分类别
      //     break
      //   case this.ActionType.ComponentCategoryEnglish:
      //     // 成分类别 英文
      //     break
      // }
    }
  }
}
</script>

<style>
</style>
