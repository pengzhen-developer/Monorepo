<template>
  <div class="q-ma-md  flex column justify-center">

    <el-radio-group v-model="radio"
                    class="flex column">

      <div class="flex items-center">
        <el-radio :label="0"
                  style="width:100px">
          <span>
            成分
          </span>

        </el-radio>
        <el-select v-model="multipleSelection"
                   multiple
                   class="col"
                   value-key="code"
                   remote
                   :remote-method="getPlatformDrugChemicalCompositionSearch"
                   filterable
                   placeholder="请选择">
          <el-option v-for="item in options"
                     :key="item.code"
                     :label="item.cnName"
                     :value="item">
          </el-option>
        </el-select>

      </div>

      <div class="q-mt-32 flex items-center">
        <el-radio :label="1"
                  style="width:100px">
          <span>
            成分类别
          </span>

        </el-radio>
        <el-select v-model="multipleSelectionOther"
                   multiple
                   class="col"
                   remote
                   value-key="atcCode"
                   :remote-method="getPlatformDrugAtcSearch"
                   filterable
                   placeholder="请选择">
          <el-option v-for="item in optionsOther"
                     :key="item.atcCode"
                     :label="item.classifyName"
                     :value="item">
          </el-option>
        </el-select>

      </div>

      <div class="q-mt-32 flex items-center">
        <el-radio :label="2"
                  style="width:100px">
          <span>
            溶媒
          </span>

        </el-radio>
        <el-select v-model="multipleSelectionSolvent"
                   multiple
                   class="col"
                   remote
                   value-key="code"
                   :remote-method="getPlatformDrugMenstruumDicSearch"
                   filterable
                   placeholder="请选择">
          <el-option v-for="item in optionsSolvent"
                     :key="item.code"
                     :label="item.drugName"
                     :value="item">
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
  name: 'DuplicatetherapyRuleChoiceDialog',

  props: {
    data: Array
  },

  created() {
    if (this.data?.length > 0) {
      const type = this.data[0]?.type
      if (Number(type) === 1) {
        this.radio = 0
        this.multipleSelection = this.data
      } else if (Number(type) === 2) {
        this.radio = 1
        this.multipleSelectionOther = this.data
      } else if (Number(type) === 3) {
        this.radio = 2
        this.multipleSelectionSolvent = this.data
      }
    }
  },

  data() {
    return {
      radio: 0,
      multipleSelection: [],
      multipleSelectionOther: [],
      multipleSelectionSolvent: [],
      props: { multiple: true, value: 'code' },
      options: [],
      optionsOther: [],
      optionsSolvent: []
    }
  },

  mounted() {
    this.getPlatformDrugChemicalComposition()
    this.getPlatformDrugAtc()
    this.getPlatformDrugMenstruumDic()
  },

  methods: {
    getPlatformDrugChemicalComposition() {
      const params = { size: 500 }
      Service.getPlatformDrugChemicalComposition(params).then((res) => {
        const completeResult = [...this.multipleSelection, ...res.data.records].map((item) => {
          return { code: item.code, cnName: item.cnName }
        })
        const tmp = Array.from(new Set(completeResult.map(JSON.stringify))).map(JSON.parse)
        this.options = tmp
      })
    },
    getPlatformDrugChemicalCompositionSearch(query) {
      const params = { cnName: query ?? '', size: 500 }
      Service.getPlatformDrugChemicalComposition(params).then((res) => {
        this.options = res.data.records.map((item) => {
          return { code: item.code, cnName: item.cnName }
        })
      })
    },

    getPlatformDrugAtc() {
      const params = { size: 500 }
      Service.getPlatformDrugAtc(params).then((res) => {
        const completeResult = [...this.multipleSelectionOther, ...res.data.records].map((item) => {
          return { atcCode: item.atcCode, classifyName: item.classifyName }
        })
        const tmp = Array.from(new Set(completeResult.map(JSON.stringify))).map(JSON.parse)
        this.optionsOther = tmp
      })
    },
    getPlatformDrugAtcSearch(query) {
      const params = { classifyName: query ?? '', size: 500 }
      Service.getPlatformDrugAtc(params).then((res) => {
        this.optionsOther = res.data.records.map((item) => {
          return { atcCode: item.atcCode, classifyName: item.classifyName }
        })
      })
    },
    getPlatformDrugMenstruumDic() {
      const params = { size: 500 }
      Service.getPlatformDrugMenstruumDic(params).then((res) => {
        const completeResult = [...this.multipleSelectionSolvent, ...res.data.records].map((item) => {
          return { code: item.code, drugName: item.drugName }
        })
        const tmp = Array.from(new Set(completeResult.map(JSON.stringify))).map(JSON.parse)
        this.optionsSolvent = tmp
      })
    },
    getPlatformDrugMenstruumDicSearch(query) {
      const params = { drugName: query ?? '', size: 500 }
      Service.getPlatformDrugMenstruumDic(params).then((res) => {
        this.optionsSolvent = res.data.records.map((item) => {
          return { code: item.code, drugName: item.drugName }
        })
      })
    },

    cancel() {
      this.$emit('onClose', {})
    },
    save() {
      if (this.radio === 0) {
        if (this.multipleSelection.length > 0) {
          this.multipleSelection.map((res) => {
            res.type = 1
          })
          this.$emit('onSuccess', this.multipleSelection)
        } else {
          Peace.util.warning('请选择成分')
        }
      } else if (this.radio === 1) {
        if (this.multipleSelectionOther.length > 0) {
          this.multipleSelectionOther.map((res) => {
            res.type = 2
          })
          this.$emit('onSuccess', this.multipleSelectionOther)
        } else {
          Peace.util.warning('请选择成分类别')
        }
      } else {
        if (this.multipleSelectionSolvent.length > 0) {
          this.multipleSelectionSolvent.map((res) => {
            res.type = 3
          })
          this.$emit('onSuccess', this.multipleSelectionSolvent)
        } else {
          Peace.util.warning('请选择溶媒')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>