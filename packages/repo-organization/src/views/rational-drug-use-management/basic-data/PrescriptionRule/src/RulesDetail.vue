<template>
  <div v-loading="loading"
       class="q-pa-md bg-white full-height">
    <div class="row full-height"
         v-if="rules.length > 0">

      <div ref="scrollArea"
           class="col">

        <Rule v-for="(rule, patientIndex) in rules"
              :ref="`ruleItem_ref_${patientIndex}`"
              v-bind:key="rule.key"
              class="flex full-width">

          <rule-items v-bind:key="`${rule.key}_RuleItems_${patientIndex}`"
                      class="flex q-mb-sm q-ml-lg relative-position"
                      v-bind:is-editing="false"
                      v-bind:name="rule.name">

            <RuleItem v-for="(item, index) in rule.models"
                      class="flex column"
                      v-bind:index="index"
                      v-bind:is-editing="false"
                      v-bind:key="`${rule.key}_RuleItems_${patientIndex}_${index}`">

              <precodition-info v-if="item.conditionExpressionString.hasPrecondition"
                                class="preconditions-style"
                                v-bind:info="item.conditionExpressionString.ceList"></precodition-info>

              <div class="flex row items-center q-my-md q-ml-10">

                <!-- 规则实例 -->
                <Component v-bind:is="rule.instance"
                           v-bind:ref="`Component_${rule.key}_${index}`"
                           class="q-mr-md col"
                           v-bind:drug-type="drugType"
                           v-bind:is-editing="false"
                           v-bind:model="item"></Component>

                <!-- 规则提示级别 -->
                <PromptLevel v-bind:ref="`PromptLevel_${rule.key}_${index}`"
                             class="q-mr-xl"
                             v-bind:is-editing="false"
                             style="width: 120px"
                             v-bind:model="item"></PromptLevel>

                <!-- 规则提示信息 -->
                <PromptMessage v-bind:ref="`PromptMessage_${rule.key}_${index}`"
                               class="q-mr-md"
                               style="width: 360px"
                               v-bind:is-editing="false"
                               v-bind:model="item"></PromptMessage>

              </div>

            </RuleItem>

          </rule-items>

        </Rule>

      </div>

      <div class="col-1 q-pl-lg sticky">
        <q-tabs v-model="tabSelectedIndex"
                class="text-primary"
                style="border-left: 1px solid #EAEAEA"
                switch-indicator
                vertical>
          <q-tab v-for="(item, index) in rules"
                 v-bind:key="item.key"
                 :label="item.name"
                 :name="index" />
        </q-tabs>
      </div>

    </div>

    <div v-else>
      <div style="text-align: center; padding: 40px 0px 60px;"><img src="data:image/png;base64,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"
             style="width: 151px; height: 151px;">
        <div style="line-height: 24px; color: rgba(51,51,51,.4);">暂无规则内容</div>
      </div>
    </div>

  </div>
</template>

<script>
import rules from './config'
import Service from './service/index'
import PrecoditionInfo from './components/PrecoditionInfo'
import obPreconditionDic from './observable/ob-precondition-dic'

export default {
  name: 'RulesDetail',
  props: {
    id: {
      required: true,
      type: String
    },
    drugType: {
      required: true,
      type: String,
      validator(value) {
        return ['platform', 'department', 'org'].includes(value)
      }
    },
    departmentCode: {
      required: false,
      type: String
    }
  },

  components: {
    // 包装组件，便于调试，无实际意义
    Rule: () => import('./packages/Rule'),
    RuleItem: () => import('./packages/RuleItem'),
    RuleItems: () => import('./packages/RuleItems'),
    ContextMenu: () => import('./packages/ContextMenu'),
    PromptLevel: () => import('./packages/PromptLevel'),
    PromptMessage: () => import('./packages/PromptMessage'),
    ValidateMessage: () => import('./packages/ValidateMessage'),
    PrecoditionInfo
  },

  data() {
    return {
      // 17个规则数组
      rules: [],
      loading: false,
      // 导航栏当前Index
      tabSelectedIndex: 0,
      source: {
        utilList: [],
        weightList: [],
        containList: [],
        sexList: []
      }
    }
  },

  created() {
    this.$nextTick(() => {
      this.fetch()
    })
  },

  async mounted() {
    const utilList = await Peace.identity.dictionary.getList('age_type')
    const weightList = await Peace.identity.dictionary.getList('compare')
    const containList = await Peace.identity.dictionary.getList('belonged_type')
    const sexList = await Peace.identity.dictionary.getList('rule_gender')
    const warningLevelList = await Peace.identity.dictionary.getList('warning_level')

    await obPreconditionDic.mutations.set('utilList', utilList)
    await obPreconditionDic.mutations.set('weightList', weightList)
    await obPreconditionDic.mutations.set('containList', containList)
    await obPreconditionDic.mutations.set('sexList', sexList)
    await obPreconditionDic.mutations.set('warningLevelList', warningLevelList)

    this.$nextTick(() => {
      this.fetch()
    })
  },

  watch: {
    // 描点
    tabSelectedIndex(value) {
      let offsetPre = 0
      if (value > 0) {
        offsetPre = this.$refs[`ruleItem_ref_1`][0].$el.offsetTop
      }
      const offsetTop = this.$refs[`ruleItem_ref_${value}`][0].$el.offsetTop
      const scrollView = document.body.querySelector('.q-page-container .scroll')
      scrollView.scrollTo({ top: offsetTop + offsetPre, left: 0, behavior: 'smooth' })
    }
  },

  methods: {
    fetch() {
      this.loading = true
      Service.getRulesDetail({
        drugCscCode: this.id,
        drugType: this.drugType,
        departmentCode: this.departmentCode
      })
        .then((res) => {
          const orginRules = res.data?.rules ?? []
          const transformRules = {}
          for (let key in orginRules) {
            if (orginRules[`${key}`] && orginRules[`${key}`].length > 0) {
              transformRules[`${key}`] = orginRules[`${key}`]
            }
          }

          const rulesModel = transformRules
          // 1、从config的通用 `数据模型数组` 中筛选出 `编辑过` 的数据
          const tmp = Peace.util.deepClone(rules).filter((item) => item.key in rulesModel)

          // 2、对已编辑的数据类型组装
          tmp.forEach((item) => {
            let key = item.key
            // 获取对应规则的数据
            let models = rulesModel[key]
            // 如果服务端返回的对象有对应的Key，需要对 `前置条件` 数据进行转换
            if (models) {
              models.map((temp) => {
                if (temp.conditionExpression && temp.conditionExpression.ceList && temp.conditionExpression.ceList.length > 0) {
                  let tmp = temp.conditionExpression.ceList ?? []
                  let ceListDic = {}
                  for (let condition of tmp) {
                    ceListDic[`${condition.ceType}`] = condition
                    ceListDic[`${condition.ceType}`].checked = true
                  }
                  temp.conditionExpressionString = { ceList: ceListDic, hasPrecondition: true }
                } else {
                  temp.conditionExpressionString = { ceList: undefined, hasPrecondition: false }
                }
              })
              item.models = models
            }
          })
          this.rules = tmp
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.sticky {
  position: -webkit-sticky !important; // for safari
  position: sticky !important;
  top: 0;
  align-self: flex-start;
  height: auto;
  width: 120px;
}

::v-deep .q-tab {
  min-height: 40px !important;

  .absolute-left {
    top: 9px;
    bottom: 9px;
  }

  .q-tab__label {
    font-weight: 400;
  }
}

.preconditions-style {
  font-size: 14px;
  font-weight: 400;
  color: var(--q-color-grey-333);
  background: #fbfbfb;
  line-height: 16px;
  padding: 10px 16px;
}
</style>
