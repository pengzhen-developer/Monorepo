<template>
  <div class="q-ma-md  flex column justify-center">

    <el-radio-group v-model="radio"
                    class="flex column">

      <div class="flex items-center">
        <el-radio :label="0"
                  style="width:100px">
          <span>
            剂量单位
          </span>

        </el-radio>
        <el-select v-model="multipleSelection.code"
                   filterable
                   class="col"
                   placeholder="请选择">
          <el-option v-for="item in optionsForDose"
                     :key="item.code"
                     :label="item.name"
                     :value="item.code">
          </el-option>
        </el-select>

      </div>

      <div class="q-mt-32 flex items-center">
        <el-radio :label="1"
                  style="width:100px">
          <span>
            包装单位
          </span>

        </el-radio>
        <el-select v-model="multipleSelectionOther.code"
                   filterable
                   class="col"
                   placeholder="请选择">
          <el-option v-for="item in optionsForPack"
                     :key="item.code"
                     :label="item.name"
                     :value="item.code">
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
  name: 'ChoiceUnitDialog', //选择单位
  props: {
    data: Object
  },

  data() {
    return {
      radio: 0,
      multipleSelection: {},
      multipleSelectionOther: {},
      props: { multiple: true, value: 'code' },
      optionsForDose: [],
      optionsForPack: []
    }
  },

  created() {
    if (this.data?.code && this.data?.name) {
      if (Number(this.data.unitType) === 1) {
        this.radio = 0
      } else if (Number(this.data.unitType) === 2) {
        this.radio = 1
      }
    }
  },

  mounted() {
    this.getPlatformUnitDicPageForDose()
    this.getPlatformUnitDicPageForPack()
  },

  methods: {
    getPlatformUnitDicPageForDose() {
      Service.getPlatformUnitDicPage({ type: 'dose', size: 500 }).then((res) => {
        this.optionsForDose = res.data.records
        if (Number(this.data.unitType) === 1) {
          this.multipleSelection = this.data
        }
      })
    },
    getPlatformUnitDicPageForPack() {
      Service.getPlatformUnitDicPage({ type: 'package', size: 500 }).then((res) => {
        this.optionsForPack = res.data.records
        if (Number(this.data.unitType) === 2) {
          this.multipleSelectionOther = this.data
        }
      })
    },
    cancel() {
      this.$emit('onClose', {})
    },
    save() {
      if (this.radio === 0) {
        if (this.multipleSelection.code) {
          this.multipleSelection.unitType = 1
          this.multipleSelection.name = this.optionsForDose.find(
            (item) => item.code === this.multipleSelection.code
          ).name
          this.$emit('onSuccess', this.multipleSelection)
        } else {
          Peace.util.warning('请选择剂量单位')
        }
      } else {
        if (this.multipleSelectionOther.code) {
          this.multipleSelectionOther.unitType = 2
          this.multipleSelectionOther.name = this.optionsForPack.find(
            (item) => item.code === this.multipleSelectionOther.code
          ).name
          this.$emit('onSuccess', this.multipleSelectionOther)
        } else {
          Peace.util.warning('请选择包装单位')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>