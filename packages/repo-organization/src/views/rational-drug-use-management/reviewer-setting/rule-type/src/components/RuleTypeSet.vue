<template>
  <div class="row q-pa-lg">
    <div class="card-style q-mr-md q-mb-md"
         v-for="item in list"
         v-bind:key="item.cfgType">
      <div class="card-title">
        <p class="title-left">{{item.cfgName}}</p>
        <p class="title-right"
           v-on:click="ruleSet(item.cfgType)">设置</p>
      </div>
      <div class="q-mb-md content-style">{{item.settingDesc}}</div>
      <div class="switch-style">
        <el-switch v-model="item.settingStatus"
                   active-value="ON"
                   inactive-value="OFF"
                   v-on:change="changeStatus(item)"></el-switch>
      </div>
    </div>
    <!-- <div class="card-style">
      <div class="card-title">
        <p class="title-left">管理规则</p>
        <p class="title-right"
           v-on:click="manageRuleSet">设置</p>
      </div>
      <div class="q-mb-md content-style">针对科室、医生、处方类型的用药总量、用药金额、用药种类、不同处方类型的用药时长进行约束审查</div>
      <div class="switch-style">
        <el-switch v-model="EnableStatus2"
                   :active-value="true"
                   :inactive-value="false"
                   v-on:change="changeStatus()"></el-switch>
      </div>
    </div> -->

    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="drugRuleSetModel.visible"
                  title="药品规则审查项"
                  v-if="drugRuleSetModel.visible"
                  append-to-body
                  width="576px">
      <DrugRuleSet v-on:close="drugRuleClose" />
    </peace-dialog>

    <peace-dialog :close-on-click-modal="false"
                  :close-on-press-escape="false"
                  :visible.sync="manageRuleSetModel.visible"
                  title="管理规则审查项"
                  v-if="manageRuleSetModel.visible"
                  append-to-body
                  width="576px">
      <ManageRuleSet v-on:close="manageRuleClose" />
    </peace-dialog>

  </div>
</template>

<script>
import Service from '../service'
import ManageRuleSet from './ManageRuleSet'
import DrugRuleSet from './DrugRuleSet'
export default {
  components: {
    ManageRuleSet,
    DrugRuleSet
  },
  data() {
    return {
      list: [],
      drugRuleSetModel: {
        visible: false
      },
      manageRuleSetModel: {
        visible: false
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.fetch()
    })
  },
  methods: {
    fetch() {
      Service.getBaseConfig().then((res) => {
        this.list = res.data
      })
    },
    changeStatus(item) {
      const ruleName = item.cfgType === 'drug_rule' ? '药品规则' : '管理规则'
      const title = item.settingStatus === 'ON' ? '是否确认开启' + ruleName + '审查？' : '是否确认关闭' + ruleName + '审查？'
      const message =
        item.settingStatus === 'ON' ? '开启后规则即时生效，请注意检查规则设置与规则内容是否完整' : '关闭后规则即时生效，请注意检查规则设置与规则内容是否完整'
      const btnContent = item.settingStatus === 'ON' ? '确认开启' : '确认关闭'

      this.$confirm(message, title, { confirmButtonText: btnContent }, { closeOnClickModal: false })
        .then(() => {
          const params = { cfgType: item.cfgType, settingStatus: item.settingStatus }
          Service.setRuleBaseConfig(params).then(() => {
            Peace.util.success('操作成功')
            this.fetch()
          })
        })
        .catch(() => {
          item.settingStatus = item.settingStatus === 'ON' ? 'OFF' : 'ON'
        })
    },
    ruleSet(type) {
      if (type === 'drug_rule') {
        this.drugRuleSetModel.visible = true
      } else if (type === 'manage_rule') {
        this.manageRuleSetModel.visible = true
      }
    },
    drugRuleClose() {
      this.drugRuleSetModel.visible = false
    },
    manageRuleClose() {
      this.manageRuleSetModel.visible = false
    }
  }
}
</script>

<style  lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
.card-style {
  width: 362px;
  height: 220px;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  border: 1px solid #d6d6d6;
  padding: 24px;
}
.card-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}
.title-left {
  line-height: 24px;
  font-size: 18px;
  font-weight: 500;
  color: #333333;
}
.title-right {
  line-height: 20px;
  color: #3099a6;
  font-weight: 400;
  font-size: 14px;
  cursor: pointer;
}
.content-style {
  height: 80px;
  color: rgba(51, 51, 51, 0.6);
  line-height: 20px;
}
.switch-style {
  display: flex;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
</style>