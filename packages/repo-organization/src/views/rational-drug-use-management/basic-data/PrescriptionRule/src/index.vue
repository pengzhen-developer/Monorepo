<template>
  <div v-loading="loading"
       class="q-pa-md bg-white row relative-position"
       style="min-height: 100px;">

    <!--    <q-scroll-observer horizontal @scroll="onscroll"></q-scroll-observer>-->
    <div ref="scrollArea"
         class="col">
      <Rule v-for="(rule, patientIndex) in rules"
            :ref="`ruleItem_ref_${patientIndex}`"
            v-bind:key="rule.key"
            class="flex full-width">

        <rule-items v-bind:key="`${rule.key}_RuleItems_${patientIndex}`"
                    class="flex q-mb-sm q-ml-lg relative-position"
                    v-bind:name="rule.name"
                    v-on:addRule="onAddRule(rule)"
                    v-on:checkInteractionRules="onCheckInteractionRules"
                    v-on:checkSpecialRules="onCheckSpecialRules">

          <RuleItem v-for="(item, index) in rule.models"
                    v-bind:key="`${rule.key}_RuleItems_${patientIndex}_${index}`"
                    class="flex column"
                    v-bind:index="index"
                    v-on:ruleAction="(type) => ruleAction(type, rule, index)">

            <precodition-info v-if="item.conditionExpressionString.hasPrecondition"
                              class="preconditions-style"
                              v-bind:info="item.conditionExpressionString.ceList"></precodition-info>

            <div class="flex row items-center q-my-md">

              <i class="el-icon-plus preconditions-btn-style"
                 v-on:click="addPreconditions(patientIndex, index)"></i>
              <!-- 规则实例 -->
              <Component v-bind:is="rule.instance"
                         v-bind:id="id"
                         v-bind:ref="`Component_${rule.key}_${index}`"
                         class="q-mr-md col"
                         v-bind:drug-type="drugType"
                         v-bind:model="item"></Component>

              <!-- 规则提示级别 -->
              <PromptLevel v-bind:ref="`PromptLevel_${rule.key}_${index}`"
                           class="q-mr-xl"
                           style="width: 168px"
                           v-bind:model="item"></PromptLevel>

              <!-- 规则提示信息 -->
              <PromptMessage v-bind:ref="`PromptMessage_${rule.key}_${index}`"
                             class="q-mr-md"
                             style="width: 310px"
                             v-bind:model="item"></PromptMessage>

            </div>

          </RuleItem>

        </rule-items>

      </Rule>
    </div>

    <div class="q-pl-lg sticky">
      <q-tabs v-model="tabSelectedIndex"
              active-color="primary"
              class="text-grey-333"
              style="border-left: 1px solid #EAEAEA; width: 112px;"
              switch-indicator
              vertical>
        <q-tab v-for="(item, index) in rules"
               v-bind:key="item.key"
               :label="item.name"
               :name="index" />
      </q-tabs>
    </div>

    <precondition-view v-if="dialog.visible"
                       v-model="dialog.visible"
                       v-bind:ignore-type="dialog.type"
                       v-bind:index-params="dialog.indexParams"
                       v-bind:model="dialog.data"
                       v-bind:drug-type="drugType"
                       v-on:preconditionInfo="addPreconditionInfo"></precondition-view>

    <PeaceDialog :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :visible.sync="ddiRuleModelDialog.visible"
                 title="平台通用相互作用规则"
                 v-if="ddiRuleModelDialog.visible"
                 append-to-body
                 width="926px">
      <GlobalDdiRuleModel />
    </PeaceDialog>
    <PeaceDialog :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :visible.sync="dupRuleModelDialog.visible"
                 title="特殊重复用药规则"
                 v-if="dupRuleModelDialog.visible"
                 append-to-body
                 width="926px">
      <GlobalDupRuleModel />
    </PeaceDialog>
  </div>
</template>

<script>
import rules from './config'
import CONSTANT from './constant'
import PrecoditionInfo from './components/PrecoditionInfo'
import PreconditionView from './components/PreconditionView'
import GlobalDdiRuleModel from './components/GlobalDdiRuleModel'
import GlobalDupRuleModel from './components/GlobalDupRuleModel'
import Service from './service/index'

import obPreconditionDic from './observable/ob-precondition-dic'

export default {
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
    PreconditionView,
    PrecoditionInfo,
    GlobalDdiRuleModel,
    GlobalDupRuleModel
  },

  data() {
    return {
      // 17个规则数组
      rules: [],
      loading: false,
      // 导航栏当前Index
      tabSelectedIndex: 0,
      // 前置条件Dialog
      dialog: {
        visible: false,
        data: {},
        type: undefined,
        // 标识当前编辑前置条件的位置
        indexParams: {
          patientIndex: undefined,
          Index: undefined
        }
      },
      ddiRuleModelDialog: {
        visible: false
      },
      dupRuleModelDialog: {
        visible: false
      },
      // q-scroll-area scrollBar 样式
      thumbStyle: {
        right: '0px',
        borderRadius: '5px',
        backgroundColor: '#ccc',
        width: '5px',
        opacity: 0.75
      }
    }
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
          if (Peace.util.isNull(res.data) || !res.data.rules) {
            this.rules = Peace.util.deepClone(rules)
            return
          }

          const orginRules = res.data.rules
          const transformRules = {}
          for (let key in orginRules) {
            if (orginRules[`${key}`] && orginRules[`${key}`].length > 0) {
              transformRules[`${key}`] = orginRules[`${key}`]
            }
          }

          const rulesModel = transformRules

          const tmpRules = Peace.util.deepClone(rules)

          tmpRules.forEach((item) => {
            let key = item.key
            // 获取对应规则的数据
            let models = rulesModel[key]
            // 如果服务端返回的对象有对应的Key，做数据转换操作
            // 其中前置条件需要做转换
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
          this.rules = tmpRules
        })
        .finally(() => {
          this.loading = false
        })
    },
    /**
     * 校验规则
     */
    validate() {
      // 存放`未完成`规则的数组 （`未完成` 👉 规则未填写完整， ⚠️：存放时需要校验是否重复，供提示消息时直接使用）
      const verificationResult = new Set()

      // 存放`已完成`规则的数组 （⚠️： 规则有复制功能所以最终该数组上传前需要去重）
      const completeResult = []

      /**
       * 规则的数据模型为： [ {key: '规则名', models:[ { 子规则：Object,  规则提示信息: String, 前置规则: Object } ] } ]
       * 其中【 `子规则`  `规则提示信息` 】为必填项； `前置规则` 为非必填 （⚠️ 前置规则校验在外部，所以前置条件只需判断是否填写）
       */

      this.rules.forEach((rules) => {
        // 遍历17个规则数组
        for (let i = 0; i < rules.models.length; i++) {
          // 获取规则的ref，子规则校验在各自子组件对外暴露的 verificationResults 方法
          const ComponentRef = this.$refs[`Component_${rules.key}_${i}`][0]

          // 获取规则提示信息的ref
          const PromptMessageRef = this.$refs[`PromptMessage_${rules.key}_${i}`][0]

          // 获取规则校验结果
          const ComponentResult = ComponentRef.verificationResults()

          // 获取规则提示信息的校验结果
          const MessageResult = PromptMessageRef.verificationResults()

          // 是否填了前置信息
          const PreconditionResult = rules.models[i].conditionExpressionString.hasPrecondition

          /**
           *  校验从 `子规则` 的完成情况 开始处理
           *  ---- 1、未开始  判断 （`规则提示信息` || `前置规则`）是否有完成项 ？ 有 （加入到 verificationResult 数组中
           *  ---- 2、未完成 （直接加入到 verificationResult 数组中）不做后续 2项的校验
           *  ---- 3、已完成  直接判断必填项 `规则提示信息`  通过 （当前这条规则 加入到 completeResult 数据）
           *  ---- 4、🚨忽略 （处理特殊规则不需要校验的情况，目前只有 `注射速度` 不排除以后有这类型所以添加此校验状态）
           */
          switch (ComponentResult) {
            case CONSTANT.RULE_VALIDATION_RESULTS.未开始:
              if (MessageResult || PreconditionResult) {
                // 加入未完成的规则项名称
                verificationResult.add(rules.name)
              }
              break
            case CONSTANT.RULE_VALIDATION_RESULTS.未完成:
              // 加入未完成的规则项名称
              verificationResult.add(rules.name)
              break
            case CONSTANT.RULE_VALIDATION_RESULTS.已完成:
              if (MessageResult) {
                // 添加规则上传数据的 key 到model
                const tmp = rules.models[i]
                tmp.key = rules.key
                // 加入已完成的规则项名称
                completeResult.push(tmp)
              } else {
                // 加入未完成的规则项名称
                verificationResult.add(rules.name)
              }
              break
            case CONSTANT.RULE_VALIDATION_RESULTS.忽略:
              if (!MessageResult) {
                //未填写消息 但 填写了前置条件，所以未完成
                if (PreconditionResult) {
                  // 加入未完成的规则项名称
                  verificationResult.add(rules.name)
                }
              } else {
                // 添加规则上传数据的 key 到model
                const tmp = rules.models[i]
                tmp.key = rules.key
                // 加入已完成的规则项名称
                completeResult.push(tmp)
              }
              break
          }
        }
      })

      // 提示未完成的规则
      if (verificationResult.size > 0) {
        let message = `${Array.from(verificationResult).join(',  ')}`
        this.$alert(message, '以下规则项存在未完成规则，无法保存', {
          type: 'warning',
          confirmButtonText: '知道了'
        })
        return Promise.reject('以下规则项存在未完成规则，无法保存' + message)
      }

      // 校验是否有完成项
      if (completeResult.length === 0) {
        this.$alert('规则内容不能为空', '提示', {
          type: 'warning',
          confirmButtonText: '知道了'
        })
        return Promise.reject('规则内容不能为空')
      }

      // 去除重复数据
      const tmp = Array.from(new Set(completeResult.map(JSON.stringify))).map(JSON.parse)

      const params = {}
      for (let item of tmp) {
        /// 格式转换前置条件
        if (!item.conditionExpressionString.hasPrecondition) {
          item.conditionExpressionString.ceList = []
        } else {
          item.conditionExpressionString.ceList = Object.values(item.conditionExpressionString.ceList)
        }

        /// 格式化上传数据
        if (params[item.key]) {
          params[item.key].push(item)
        } else {
          params[item.key] = [item]
        }
      }
      return Promise.resolve(params)
    },

    onAddRule(rule) {
      const tmp = this.rules.find((item) => item.name === rule.name)
      return rule.models.push(Peace.util.deepClone(tmp.model))
    },
    // 查看相互作用规则
    onCheckInteractionRules() {
      this.ddiRuleModelDialog.visible = true
    },
    // 查看特殊规则
    onCheckSpecialRules() {
      this.dupRuleModelDialog.visible = true
    },

    /**
     * 规则操作
     * @param type 操作类型
     * @param rule 操作的目标规则数据
     * @param index 操作的Index
     */
    ruleAction(type, rule, index) {
      switch (type) {
        case CONSTANT.RULE_ACTION_TYPE.复制规则:
          rule.models.splice(index + 1, 0, Peace.util.deepClone(rule.models[index]))
          break
        case CONSTANT.RULE_ACTION_TYPE.删除规则:
          this.$confirm('确定删除该规则, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              rule.models.splice(index, 1)
            })
            .catch(() => {})
          break
      }
    },

    /**
     * 打开编辑前置界面
     */
    addPreconditions(patientIndex, index) {
      this.dialog.indexParams = {
        patientIndex: patientIndex,
        Index: index
      }
      this.dialog.type = this.rules[patientIndex].key
      this.dialog.visible = true
      this.dialog.data = { ...this.rules[patientIndex].models[index].conditionExpressionString.ceList }
    },

    /**
     * 编辑前置条件回调
     * @param params
     */
    addPreconditionInfo(params) {
      const { IndexParams, data } = params
      this.rules[IndexParams.patientIndex].models[IndexParams.Index].conditionExpressionString.ceList = data
      this.rules[IndexParams.patientIndex].models[IndexParams.Index].conditionExpressionString.hasPrecondition = JSON.stringify(data) !== '{}'
      this.dialog.visible = false
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

  // .absolute-left {
  //   top: 9px;
  //   bottom: 9px;
  // }

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

.preconditions-btn-style {
  width: 23px !important;
  height: 23px !important;
  background: rgba(48, 153, 166, 0.2);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
  margin-right: 16px;
  color: var(--q-color-primary);
}
</style>
