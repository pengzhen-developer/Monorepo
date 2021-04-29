<template>
  <PeaceDialog v-bind="$attrs"
               v-bind:visible.sync="internalVisible">
    <div class="q-px-md">
      <div class="flex items-center q-mb-md">
        <div class="title q-mr-sm"></div>

        <span class="text-weight-medium text-grey-333"
              style="font-size: 16px;">待审核平台药品</span>
      </div>

      <div class="q-mb-lg">
        <PeaceTable ref="table"
                    v-bind:data="list1">
          <PeaceTableColumn label="平台药品编码"
                            prop="DrugStandardCode"
                            min-width="160px"></PeaceTableColumn>
          <PeaceTableColumn label="药品名称"
                            prop="ProductName"
                            min-width="140px"></PeaceTableColumn>
          <PeaceTableColumn label="批准文号"
                            prop="ApprovalNo"
                            min-width="170px"></PeaceTableColumn>
          <PeaceTableColumn label="规格"
                            prop="DrugSpecifications"
                            min-width="100px"></PeaceTableColumn>
          <PeaceTableColumn label="剂型"
                            prop="DrugDosageForm"
                            min-width="120px"></PeaceTableColumn>
          <PeaceTableColumn label="生产厂家"
                            prop="EnterpriseChineseName"
                            min-width="180px"></PeaceTableColumn>
          <PeaceTableColumn label="包装规格"
                            prop="packaging_specifications"
                            min-width="120px">
            <template slot-scope="scope">
              <template v-if="scope.row.SpecificationsStatus === '0'">
                <el-input maxlength="20"
                          v-model.trim="scope.row.packaging_specifications"></el-input>
              </template>
              <template v-else>
                <span>{{ scope.row.packaging_specifications }}</span>
              </template>
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn label="包装数量"
                            prop="Package_Num"
                            min-width="120px">
            <template slot-scope="scope">
              <template v-if="scope.row.SpecificationsStatus === '0'">
                <el-input v-model.trim.number="scope.row.Package_Num"></el-input>
              </template>
              <template v-else>
                <span>{{ scope.row.Package_Num }}</span>
              </template>
            </template>
          </PeaceTableColumn>
          <PeaceTableColumn label="最小单位"
                            prop="Min_Unit"
                            min-width="120px">
            <template slot-scope="scope">
              <template v-if="scope.row.SpecificationsStatus === '0'">
                <el-input v-model="scope.row.Min_Unit"></el-input>
              </template>
              <template v-else>
                <span>{{ scope.row.Min_Unit }}</span>
              </template>
            </template>
          </PeaceTableColumn>
        </PeaceTable>
      </div>

      <div class="flex items-center q-mb-md">
        <div class="title q-mr-sm"></div>

        <span class="text-weight-medium text-grey-333"
              style="font-size: 16px;">平台已有药品包装规格信息（本位码相同）</span>
      </div>

      <div class="q-mb-lg">
        <PeaceTable ref="table"
                    v-bind:data="list2">
          <PeaceTableColumn label="平台药品编码"
                            prop="DrugStandardCode"
                            min-width="160px"></PeaceTableColumn>
          <PeaceTableColumn label="药品名称"
                            prop="ProductName"
                            min-width="140px"></PeaceTableColumn>
          <PeaceTableColumn label="批准文号"
                            prop="ApprovalNo"
                            min-width="170px"></PeaceTableColumn>
          <PeaceTableColumn label="规格"
                            prop="DrugSpecifications"
                            min-width="100px"></PeaceTableColumn>
          <PeaceTableColumn label="剂型"
                            prop="DrugDosageForm"
                            min-width="120px"></PeaceTableColumn>
          <PeaceTableColumn label="生产厂家"
                            prop="EnterpriseChineseName"
                            min-width="180px"></PeaceTableColumn>
          <PeaceTableColumn label="包装规格"
                            prop="packaging_specifications"
                            min-width="120px"></PeaceTableColumn>
          <PeaceTableColumn label="包装数量"
                            prop="Package_Num"
                            min-width="120px"></PeaceTableColumn>
          <PeaceTableColumn label="最小单位"
                            prop="Min_Unit"
                            min-width="120px"></PeaceTableColumn>
        </PeaceTable>
      </div>

      <div class="flex items-center q-mb-md">
        <div class="title q-mr-sm"></div>

        <span class="text-weight-medium text-grey-333"
              style="font-size: 16px;">药师审核结果</span>
      </div>

      <div v-if="isAuditView">

        <div class="q-mb-sm">
          <el-radio-group v-model="model.SpecificationsStatus">
            <el-radio label="20">审核通过</el-radio>
            <el-radio label="10">驳回</el-radio>
          </el-radio-group>
        </div>

        <div v-if="model.SpecificationsStatus === '20'">
          <el-alert type="warning"
                    style="border: 0; padding: 6px 8px;"
                    v-bind:closable="false">
            <span>*审核通过，与该药品的配码关系可正常审核通过</span>
            <span v-if="model.SpecificationsStatus === '2'">*审核驳回后，机构药品与该药品的配码关系将自动解除</span>
          </el-alert>
        </div>

        <div v-if="model.SpecificationsStatus === '10'">
          <div class="q-mb-md">
            <el-alert type="warning"
                      style="border: 0; padding: 6px 8px;"
                      v-bind:closable="false">
              <span>*审核驳回后，机构药品与该药品的配码关系将自动解除</span>
            </el-alert>
          </div>

          <el-form ref="form"
                   label-suffix="："
                   label-width="auto"
                   v-bind:model="model">
            <el-form-item label="原因"
                          prop="ExamineReason"
                          v-bind:rules="[{ required: true, message: '请输入原因', trigger: 'blur' }]">
              <el-input show-word-limit
                        placeholder="请填写驳回原因"
                        type="textarea"
                        maxlength="50"
                        v-model="model.ExamineReason"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <div v-if="isDetailView">
        <el-form space-view
                 label-suffix="：">
          <el-form-item label="审核结果"
                        prop="reason">
            <span class="q-mr-md">{{ list.ExamineDate }}</span>
            <span>{{ list.SpecificationsStatus | filterDictionary(source.SpecificationsStatus) }}</span>
          </el-form-item>
          <el-form-item label="审核账号"
                        prop="reason">
            <span class="q-mr-md">{{ list.ExamineUserName }}</span>
            <span>{{ list.ExamineUser }}</span>
          </el-form-item>
          <el-form-item v-if="list.SpecificationsStatus === '10'"
                        label="不通过理由"
                        prop="reason">
            {{ list.ExamineReason }}
          </el-form-item>
        </el-form>
      </div>
    </div>

    <template v-if="isAuditView">
      <div slot="footer">
        <el-button v-on:click="cancel">取消</el-button>
        <el-button v-on:click="submit"
                   type="primary">提交</el-button>
      </div>
    </template>
  </PeaceDialog>
</template>

<script>
import Service from './../service'

export default {
  props: {
    visible: Boolean,

    view: String,

    DrugStandardCode: String
  },

  data() {
    return {
      list: {},
      list1: [],
      list2: [],
      model: {
        SpecificationsStatus: '20'
      },

      source: {
        SpecificationsStatus: []
      }
    }
  },

  computed: {
    internalVisible: {
      get() {
        return this.visible
      },
      set(value) {
        this.$emit('update:visible', value)
      }
    },

    isAuditView() {
      return this.view === 'audit'
    },

    isDetailView() {
      return this.view === 'detail'
    }
  },

  created() {
    this.getDictionary()
  },

  mounted() {
    this.$nextTick().then(() => {
      this.fetch()
    })
  },

  methods: {
    async getDictionary() {
      this.source.SpecificationsStatus = await Peace.identity.dictionary.getList('SpecificationsStatus')
    },

    fetch() {
      Service.GetJntDrugsInfoById({ DrugStandardCode: this.DrugStandardCode }).then((res) => {
        this.list = res.data
        this.list1 = [res.data]
        this.list2 = res.data.List
      })
    },

    save() {
      const params = Peace.util.deepClone(this.model)
      params.packaging_specifications = this.list.packaging_specifications
      params.DrugStandardCode = this.list.DrugStandardCode
      params.SpecificationsStatus = params.SpecificationsStatus === '20'
      params.PackageNum = this.list.Package_Num
      params.MinUnit = this.list.Min_Unit

      Service.SaveJntDrugsInfo(params).then(() => {
        Peace.util.success('提交成功')

        this.$emit('update:visible', false)
        this.$emit('success')
      })
    },

    submit() {
      if (Peace.validate.isEmpty(this.list.packaging_specifications)) {
        return Peace.util.warning('请输入包装规格')
      }
      if (Peace.validate.isEmpty(this.list.Package_Num)) {
        return Peace.util.warning('请输入包装数量')
      }
      if (!Peace.validate.isPInterger(this.list.Package_Num)) {
        return Peace.util.warning('包装数量的类型为正数字')
      }
      if (Peace.validate.isEmpty(this.list.Min_Unit)) {
        return Peace.util.warning('请输入最小单位')
      }
      if (this.$refs.form) {
        this.$refs.form.validate().then(() => {
          this.save()
        })
      } else {
        this.save()
      }
    },

    cancel() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  content: '';
  display: inline-block;
  background: var(--q-color-primary);
  width: 4px;
  height: 16px;
  border-radius: 2px;
}
</style>