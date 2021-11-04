<template>
  <div>
    <div class="card card-search q-mb-md">
      <el-form inline="inline"
               label-suffix="："
               label-width="auto"
               size="mini"
               v-bind:model="model"
               v-on:keyup.enter.native="fetchData"
               v-on:submit.native.prevent>

        <el-form-item label="规则名称">
          <el-input v-model.trim="model.ruleName"
                    clearable
                    placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label="规则状态">
          <el-select v-model="model.state"
                     clearable
                     placeholder="全部">
            <el-option v-for="item in remoteSource.ruleStateList"
                       v-bind:key="item.label"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     v-on:click="fetchData">查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="card">

      <div class="q-mb-lg">
        <el-button type="primary"
                   v-on:click="addRule">新增规则</el-button>
      </div>

      <PeaceTable ref="table"
                  pagination
                  size="mini">

        <PeaceTableColumn label="规则编号"
                          min-width="180px"
                          prop="id">
        </PeaceTableColumn>
        <PeaceTableColumn label="规则名称"
                          min-width="180px"
                          prop="ruleName">
        </PeaceTableColumn>

        <PeaceTableColumn label="规则数量"
                          min-width="140px"
                          prop="count">
        </PeaceTableColumn>

        <PeaceTableColumn label="规则状态"
                          min-width="120px">
          <template slot-scope="scope">
            <span>{{ Number(scope.row.state) | filterDictionary(remoteSource.ruleStateList,'--') }}</span>
          </template>
        </PeaceTableColumn>

        <PeaceTableColumn fixed="right"
                          label="操作"
                          align="center"
                          width="220px">
          <template slot-scope="scope">

            <el-button type="text"
                       v-on:click="modify(scope.row)">修改
            </el-button>

            <el-button type="text"
                       v-on:click="edit(scope.row)">编辑规则
            </el-button>
            <el-button type="text"
                       v-on:click="toDetail(scope.row)">查看规则
            </el-button>

          </template>
        </PeaceTableColumn>

      </PeaceTable>
    </div>

    <modify-management-rule v-if="dialog.visible"
                            v-model="dialog.visible"
                            v-bind:data="dialog.data"
                            v-bind:title="dialog.title"
                            v-on:refresh="fetchData"></modify-management-rule>

  </div>

</template>

<script>
import Service from '../service/index'
import Util from '@src/util'
import CONSTANT from '../constant'
import ModifyManagementRule from './ModifyManagementRule'

export default {
  components: { ModifyManagementRule },
  name: 'ManagementRulesList',
  comments: {
    ModifyManagementRule
  },
  data() {
    return {
      model: {
        organCode: undefined,
        ruleName: undefined,
        state: undefined
      },
      dialog: {
        visible: false,
        title: undefined,
        data: undefined
      },
      remoteSource: {
        ruleStateList: CONSTANT.RULE_STATE
      }
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.fetchData()
    })
  },

  created() {
    this.getDictionary()
  },

  methods: {
    async getDictionary() {
      this.remoteSource.drugStateList = await Peace.identity.dictionary.getList('commonRuleState')
    },

    addRule() {
      this.dialog.title = '新增管理规则'
      this.dialog.data = undefined
      this.dialog.visible = true
    },

    modify(data) {
      this.dialog.title = '修改管理规则'
      this.dialog.data = data
      this.dialog.visible = true
    },

    edit(data) {
      this.$emit('edit', data)
    },

    toDetail(data) {
      this.$emit('onShowManagementRule', data)
    },

    fetchData() {
      this.model.organCode = Util.user.getUserInfo().custCode
      const fetch = Service.getManageRuleList
      const params = Object.assign(this.model)
      this.$refs.table.reloadData({ fetch, params })
    }
  }
}
</script>

<style>
</style>
