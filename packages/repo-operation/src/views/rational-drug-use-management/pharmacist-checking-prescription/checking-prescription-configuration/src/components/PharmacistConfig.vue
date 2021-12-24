<template>
  <div v-loading="loading">

    <div class="flex row justify-between q-gutter-x-md">
      <div class="bg-white q-py-lg q-px-md col">
        <div class="q-mb-md">
          <el-button v-on:click="$emit('back')">返回上一页</el-button>
        </div>

        <div class="q-mb-md">
          <span style="height: 22px;
                   font-size: 18px;
                   color: #333333;
                   line-height: 22px;">{{ data?.SourceHospitalName }}药师审方设置</span>
        </div>

        <div class="q-mb-md">
          <el-button plain
                     class="full-width text-primary"
                     style="border: 1px dashed rgba(0,0,0,0.10);"
                     icon="el-icon-plus"
                     v-on:click="handleAdd">添加优先方案</el-button>
        </div>

        <div class="solution-list">
          <!-- 通用方案 -->
          <RuleDetail class="solution-detail q-mb-md"
                      v-for="solution in generalSolutionList"
                      v-on:edit="handleEdit"
                      v-bind:data="solution"
                      v-bind:key="solution.ID"></RuleDetail>

          <!-- 优先方案 -->
          <!-- 按药品品种配置，设置完通用方案后，才有优先方案 -->
          <RuleDetail class="solution-detail q-mb-md"
                      v-for="solution in prioritySolutionList"
                      v-on:edit="handleEdit"
                      v-on:delete="handleDelete"
                      v-bind:data="solution"
                      v-bind:key="solution.ID"></RuleDetail>
        </div>
      </div>
      <div class="bg-white q-py-lg q-px-md"
           style="width: 240px">
        <div class="q-mb-md"
             style="font-weight: Medium
                    font-size: 14px;
                    color: #333333;
                    line-height: 22px;">
          方案优先级设置
        </div>

        <draggable animation="300"
                   ghost-class="ghost"
                   v-model="prioritySolutionList"
                   v-on:sort="sort">
          <div class="row items-center q-py-6"
               style="cursor: move;"
               v-for="solution in prioritySolutionList"
               v-bind:key="solution.id">
            <i class="el-icon-s-operation q-mr-sm"
               style="color: rgba(0,0,0,0.70);"></i>
            <div class="col ellipsis"
                 style="color: rgba(0,0,0,0.80);">{{ solution.SchemeName }}</div>
          </div>
        </draggable>
      </div>
    </div>

    <PeaceDialog v-if="dialog.visible"
                 v-bind:title="dialog.title"
                 v-bind:visible.sync="dialog.visible">
      <RuleModel v-on:cancel="dialog.visible = false"
                 v-on:success="fetch"
                 v-bind:data="dialog.data"
                 v-bind:dataList="prioritySolutionList"></RuleModel>
    </PeaceDialog>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import RuleModel from './RuleModel.vue'
import RuleDetail from './RuleDetail.vue'
import Service from './../service'

export default {
  components: {
    draggable,
    RuleModel,
    RuleDetail
  },

  props: {
    data: Object
  },

  data() {
    return {
      loading: false,

      internalData: [],
      generalSolutionList: [],
      prioritySolutionList: [],

      dialog: {
        visible: false,
        title: '',
        data: undefined
      },

      emptyRuleModel: {
        SchemeName: '',
        SchemeType: '',
        DrugInfo: [],
        AuditorTeamType: '',
        AuditorTeamInfo: [],
        IsTimeoutPasses: false,
        OvertimeTime: undefined,
        SignaturePharmacistName: '',
        SignaturePharmacistCode: '',
        ClientID: this.data.SourceHospitalCode
      }
    }
  },

  watch: {
    internalData: {
      handler() {
        this.generalSolutionList = this.internalData?.filter((item) => item.SchemeType === 1)
        this.prioritySolutionList = this.internalData?.filter((item) => item.SchemeType === 2)
      },
      immediate: true
    },

    generalSolutionList: {
      handler() {
        if (this.generalSolutionList.length === 0) {
          // 机构规则初始化时
          // 默认显示空的通用方案，引导用户编辑
          // 方案名称： 通用方案
          // 方案类型： 1
          // 审方团队： 1
          const generalSolutionModel = Object.assign({}, this.emptyRuleModel, { SchemeName: '通用方案', SchemeType: 1, AuditorTeamType: 1 })

          this.generalSolutionList = [generalSolutionModel]
        }
      }
    }
  },

  created() {
    this.fetch()
  },

  methods: {
    fetch() {
      this.loading = true
      const params = { Code: this?.data?.SourceHospitalCode }

      return Service.GetByClientIDAndType10(params)
        .then((res) => {
          this.internalData = res.data.list
        })
        .finally(() => {
          this.loading = false
        })
    },

    sort() {
      if(this.prioritySolutionList.length > 0){
        this.loading = true

        const params = this.prioritySolutionList.map((item) => item.ID)

        return Service.Sortscriptionsteam(params)
          .then(this.fetch)
          .finally(() => {
            this.loading = false
          })
      }
    },

    handleAdd() {
      if (!this.generalSolutionList?.[0]?.ID) {
        this.$alert('请先添加通用方案', '提示')

        return
      }

      // 新增优先方案时
      // 方案类型： 2
      // 审方团队： 1
      const emptyPrioritySolutionModel = Object.assign({}, this.emptyRuleModel, { SchemeType: 2, AuditorTeamType: 1 })

      this.dialog.visible = true
      this.dialog.title = '添加优先方案'
      this.dialog.data = Peace.util.deepClone(emptyPrioritySolutionModel)
    },

    handleEdit(row) {
      this.dialog.visible = true
      this.dialog.title = '修改方案'
      this.dialog.data = Peace.util.deepClone(row)
    },

    handleDelete(row) {
      this.$confirm('确定删除吗？', '提示').then(() => {
        Service.Deletescriptionsteam({ ID: row.ID })
          .then(this.fetch)
          .then(this.sort)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.solution-detail {
  &:last-child {
    margin-bottom: 0;
  }
}

.ghost {
  opacity: 0.05;
  background: var(--q-color-primary);
}
</style>