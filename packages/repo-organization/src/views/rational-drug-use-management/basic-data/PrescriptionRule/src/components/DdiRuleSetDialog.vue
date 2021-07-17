<template>
  <div class="q-ma-md  flex column justify-center">

    <el-radio-group v-model="radio"
                    class="flex column">

      <div class="flex items-center">
        <el-radio :label="0"
                  style="width:100px">
          <span>
            药品成分
          </span>

        </el-radio>
        <el-select v-model="multipleSelection"
                   multiple
                   filterable
                   class="col"
                   placeholder="请选择">
          <el-option v-for="item in options"
                     :key="item.code"
                     :label="item.cnName"
                     :value="item.code">
          </el-option>
        </el-select>

      </div>

      <div class="q-mt-32 flex items-center">
        <el-radio :label="1"
                  style="width:100px">
          <span>
            药品成分类别
          </span>

        </el-radio>
        <el-select v-model="multipleSelectionOther"
                   multiple
                   filterable
                   class="col"
                   placeholder="请选择">
          <el-option v-for="item in optionsOther"
                     :key="item.atcCode"
                     :label="item.classifyName"
                     :value="item.atcCode">
          </el-option>
        </el-select>

      </div>

    </el-radio-group>

    <div class="q-mt-xl flex justify-end">
      <el-button v-on:click="cancel">取消</el-button>
      <el-button type="primary"
                 v-on:click="save">保存</el-button>
    </div>

  </div>
</template>

<script>
import Service from '../service/index'

export default {
  name: 'DdiRuleSetDialog', //设置相互作用的弹框
  props: {
    data: Array,
    id: String
  },

  created() {
    if (this.data?.length > 0) {
      const type = this.data[0]?.type
      if (Number(type) === 1) {
        this.radio = 0
        this.multipleSelection = this.data.map((item) => {
          return item.code
        })
      } else if (Number(type) === 2) {
        this.radio = 1
        this.multipleSelectionOther = this.data.map((item) => {
          return item.atcCode
        })
      }
    }
  },

  data() {
    return {
      radio: 0,
      multipleSelection: [],
      multipleSelectionOther: [],
      props: { multiple: true, value: 'code' },
      options: [],
      optionsOther: []
    }
  },

  mounted() {
    this.getListDrugIngredients()
    this.getListAtcByDrugStandardCode()
  },

  methods: {
    getListDrugIngredients() {
      Service.getListDrugIngredients({ drugStandardCode: this.id }).then((res) => {
        this.options = res.data
      })
    },
    getListAtcByDrugStandardCode() {
      Service.getListAtcByDrugStandardCode({ drugStandardCode: this.id }).then((res) => {
        this.optionsOther = res.data
      })
    },
    cancel() {
      this.$emit('onClose', {})
    },
    save() {
      if (this.radio === 0) {
        if (this.multipleSelection.length > 0) {
          const ddiItemList = this.multipleSelection.map((res) => {
            return {
              type: 1,
              code: this.options.find((item) => item.code == res).code,
              name: this.options.find((item) => item.code == res).cnName
            }
          })
          this.$emit('onSuccess', ddiItemList)
        } else {
          Peace.util.warning('请选择药品成分')
        }
      } else {
        if (this.multipleSelectionOther.length > 0) {
          const ddiContraryItemList = this.multipleSelectionOther.map((res) => {
            return {
              type: 2,
              atcCode: this.optionsOther.find((item) => item.atcCode == res).atcCode,
              name: this.optionsOther.find((item) => item.atcCode == res).classifyName
            }
          })
          this.$emit('onSuccess', ddiContraryItemList)
        } else {
          Peace.util.warning('请选择药品成分类别')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>