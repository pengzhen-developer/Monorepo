<template>
  <div>
    <el-tabs v-model="activeName"
             class="element-ui-default">
      <el-tab-pane label="基础信息"
                   name="first">
        <div class="table-info">
          <div class="flex ">
            <div>平台药品编码</div>
            <div>{{BasicInformation.DrugStandardCode}}</div>
            <div>主数据ID</div>
            <div>{{BasicInformation.MainDataID}}</div>
          </div>
          <div class="flex ">
            <div>通用名称</div>
            <div>{{BasicInformation.ProductName}}</div>
            <div>商品名称</div>
            <div>{{BasicInformation.GoodsName}}</div>
          </div>
          <div class="flex ">
            <div>本位码</div>
            <div>{{BasicInformation.DrugScsCode}}</div>
            <div>批准文号</div>
            <div>{{BasicInformation.ApprovalNo}}</div>
          </div>
          <div class="flex ">
            <div>剂型</div>
            <div>{{BasicInformation.DrugDosageForm}}</div>
            <div>规格</div>
            <div>{{BasicInformation.DrugSpecifications}}</div>
          </div>
          <div class="flex ">
            <div>包装规格</div>
            <div>{{BasicInformation.packaging_specifications}}</div>
            <div>包装单位</div>
            <div>{{BasicInformation.Package_unit}}</div>
          </div>
          <div class="flex ">
            <div>基本剂量</div>
            <div>{{BasicInformation.DrugStrengthValue_Jnt}}</div>
            <div>剂量单位</div>
            <div>{{BasicInformation.DrugStrengthValueUnit_Jnt}}</div>
          </div>
          <div class="flex ">
            <div>包装数量</div>
            <div>{{BasicInformation.Package_num}}</div>
            <div>最小单位</div>
            <div>{{BasicInformation.Min_unit}}</div>
          </div>
          <div class="flex ">
            <div>容量数值</div>
            <div>{{BasicInformation.DrugStrengthVolume_Jnt}}</div>
            <div>容量单位</div>
            <div>{{BasicInformation.DrugStrengthVolumeUnit_Jnt}}</div>
          </div>
          <div class="flex ">
            <div>给药频次</div>
            <div>{{BasicInformation.DosingFrequency}}</div>
            <div>给药途径</div>
            <div>{{BasicInformation.DosingRoute}}</div>
          </div>
          <div class="flex ">
            <div>单次用量</div>
            <div>{{BasicInformation.SingleDose}}</div>
            <div>商品类型</div>
            <div>{{BasicInformation.ProductTypes| formatDictionary(source.ProductTypes,'')}}</div>
          </div>
          <div class="flex ">
            <div>药品类型</div>
            <div>{{BasicInformation.MedicineType| formatDictionary(source.MedicineType,'')}}</div>
            <div>处方药属性</div>
            <div>{{BasicInformation.PreDrugProperties| formatDictionary(source.PreDrugProperties,'')}}</div>
          </div>
          <div class="flex ">
            <div>中文生产厂家</div>
            <div>{{BasicInformation.EnterpriseChineseName}}</div>
            <div>英文生产厂家</div>
            <div>{{BasicInformation.EnterpriseEnglishName}}</div>
          </div>
          <div class="flex ">
            <div>NMPA状态</div>
            <div>
              <el-radio-group v-model="BasicInformation.CatalogStatus"
                              disabled>
                <el-radio v-for="(item) in  source.CatalogStatus"
                          :label="item.value"
                          :key="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>

      </el-tab-pane>
      <el-tab-pane label="属性信息"
                   name="second">
        <div>
          <div class="item-title q-mb-md">
            <div class="title-left"></div>
            <p class="title">成分</p>
          </div>
          <div class="q-mb-md q-ml-14">
            <template v-if="Ingredient.length > 0">
              <el-tag v-for="item in Ingredient"
                      v-bind:key="item"
                      class="q-mr-8"
                      type="info"
                      effect="plain">{{item}}</el-tag>
            </template>
            <template v-else>——</template>
          </div>

          <div class="item-title q-mb-md">
            <div class="title-left"></div>
            <p class="title">基药药品属性</p>
          </div>
          <div class="item-row q-mb-md">
            <template v-if="BasicDrugProperties.IsBasic">
              <p>是否基药:</p>
              <p>{{getValue(BasicDrugProperties.IsBasic)}}</p>
            </template>
            <template v-else>——</template>
          </div>

          <div class="item-title q-mb-md">
            <div class="title-left"></div>
            <p class="title">注射剂/抗菌药药品属性</p>
          </div>
          <div>
            <div class="item-content q-mb-md">
              <template v-if="Injection.AntiLevel||Injection.IsInjection">
                <div class="item-row">
                  <p>抗菌药物属性:</p>
                  <p>{{Injection.AntiLevel | filterDictionary(source.AntiLevel,'')}}</p>
                </div>
                <div class="item-row">
                  <p>注射剂:</p>
                  <p>{{getValue(Injection.IsInjection)}}</p>
                </div>
              </template>
              <template v-else>
                <div class="q-ml-14">——</div>
              </template>
            </div>
          </div>

          <div class="item-title q-mb-md">
            <div class="title-left"></div>
            <p class="title">麻醉/精神药品属性</p>
          </div>
          <div class="item-row q-mb-md">
            <p v-if="IsAnesthetic">{{ formatDrugAttr(IsAnesthetic)}}</p>
            <p v-else>——</p>
          </div>

          <div class="item-title q-mb-md">
            <div class="title-left"></div>
            <p class="title">溶媒属性</p>
          </div>
          <div>
            <template v-if="getSolventAttributes()">
              <div class="item-content q-mb-10">
                <div class="item-row">
                  <p>溶媒编码:</p>
                  <p>{{SolventAttributes.code}}</p>
                </div>
                <div class="item-row">
                  <p>药品名称:</p>
                  <p>{{SolventAttributes.drugName}}</p>
                </div>
              </div>
              <div class="item-content">
                <div class="item-row">
                  <p>规格:</p>
                  <p>{{SolventAttributes.specifications}}</p>
                </div>
                <div class="item-row">
                  <p>溶媒规格:</p>
                  <p>{{SolventAttributes.menstruumSpecifications}}</p>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="q-ml-14">——</div>
            </template>
          </div>

        </div>

      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import Service from './../service'
export default {
  props: {
    info: Number
  },

  data() {
    return {
      activeName: 'first',
      BasicInformation: {},
      Ingredient: [],
      BasicDrugProperties: {},
      Injection: {},
      IsAnesthetic: '',
      SolventAttributes: {},
      source: {
        CatalogStatus: [
          {
            label: '可查询',
            value: false
          },
          {
            label: '不可查询',
            value: true
          }
        ],
        AntiLevel: [],
        listDrugAttrEnum: [],
        MedicineType: [],
        ProductTypes: [],
        PreDrugProperties: []
      }
    }
  },
  filters: {
    formatDictionary(value, source, format = '') {
      if (!Peace.validate.isEmpty(value)) {
        return source.find((item) => item.value.toString() === value.toString())?.label
      }

      return format
    }
  },
  async created() {
    this.getDictionary()
    this.source.AntiLevel = await Peace.identity.dictionary.getList('antiLevel')
    this.source.MedicineType = await Peace.identity.dictionary.getList('medicine_type')
    this.source.ProductTypes = await Peace.identity.dictionary.getList('product_type')
    this.source.PreDrugProperties = await Peace.identity.dictionary.getList('prescription_drug_properties')
  },

  mounted() {
    this.$nextTick().then(() => {
      this.getDrugDetail()
    })
  },

  methods: {
    async getDictionary() {
      this.source.listDrugAttrEnum = (await Service.listDrugAttrEnum()).data
    },
    getDrugDetail() {
      Service.GetJntDrugInfoDetailsByID({ ID: this.info }).then((res) => {
        this.BasicInformation = res.data?.BasicInformation ?? {}
        this.Ingredient = res.data?.AttributeInformation?.Ingredient ?? []
        this.BasicDrugProperties = res.data?.AttributeInformation?.BasicDrugProperties ?? {}
        this.Injection = res.data?.AttributeInformation?.Injection ?? {}
        this.IsAnesthetic = res.data?.AttributeInformation?.IsAnesthetic ?? ''
        this.SolventAttributes = res.data?.AttributeInformation?.SolventAttributes ?? {}
      })
    },
    formatDrugAttr(code) {
      return this.source.listDrugAttrEnum.find((item) => item.code === code)?.msg
    },
    getSolventAttributes() {
      if (
        this.SolventAttributes.code ||
        this.SolventAttributes.drugName ||
        this.SolventAttributes.menstruumSpecifications ||
        this.SolventAttributes.specifications
      ) {
        return true
      } else {
        return false
      }
    },
    getValue(value) {
      if (value === 'yes') {
        return '是'
      } else if (value === 'no') {
        return '否'
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
.table-info {
  border-left: 1px solid #eaeaea;
  border-top: 1px solid #eaeaea;

  .flex {
    > div {
      display: flex;
      padding: 8px 10px;
      border-right: 1px solid #eaeaea;
      border-bottom: 1px solid #eaeaea;
      &:nth-child(4n-3),
      &:nth-child(4n-1) {
        width: 15%;
        background: #fafafa;
        font-weight: bold;
        color: #333;
      }
      &:nth-child(4n-2),
      &:nth-child(4n) {
        flex: 1;
      }
    }
  }
}
.item-title {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.title-left {
  width: 4px;
  height: 16px;
  background: #3099a6;
  border-radius: 2px;
}
.title {
  color: var(--q-color-grey-333);
  margin-left: 10px;
  font-weight: 600;
  font-size: 16px;
}
.item-content {
  display: flex;
  flex-direction: row;
  > div {
    flex: 1;
  }
}
.item-row {
  display: flex;
  margin-left: 14px;
  > p {
    font-size: 14px;
    color: #333;
    &:nth-child(2n) {
      color: #666;
      margin-left: 8px;
      flex: 1;
    }
  }
}
.el-radio-group {
  display: flex;
  align-items: center;
}
::v-deep .el-radio__input.is-disabled.is-checked .el-radio__inner {
  background-color: #3099a6;
  border-color: #3099a6;
}
::v-deep .el-radio__input.is-disabled.is-checked .el-radio__inner:after {
  background-color: #fbfbfb;
}
</style>