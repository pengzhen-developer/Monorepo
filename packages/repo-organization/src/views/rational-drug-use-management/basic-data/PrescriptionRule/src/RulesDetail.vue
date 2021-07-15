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

    <span v-else
          class="text-grey-999 block text-center">暂无规则内容</span>

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
        drugType: this.drugType
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
                // TransForm (Array --> Object)
                let tmp = temp.conditionExpression?.ceList ?? []
                let ceListDic = {}
                for (let condition of tmp) {
                  ceListDic[`${condition.ceType}`] = condition
                  ceListDic[`${condition.ceType}`].checked = true
                }
                temp.conditionExpressionString = { ceList: ceListDic, hasPrecondition: true }
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
