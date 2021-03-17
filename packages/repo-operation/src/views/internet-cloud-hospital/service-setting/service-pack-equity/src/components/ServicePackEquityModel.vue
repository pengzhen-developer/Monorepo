<template>
  <div>
    <el-form ref="form"
             label-position="right"
             label-width="95px"
             label-suffix="："
             v-bind:model="addModel"
             v-bind:rules="rules">
      <div class="info-list">
        <el-form-item label="权益名称"
                      prop="name">
          <el-input v-model.trim="addModel.name"
                    placeholder="请输入"
                    clearable
                    show-word-limit></el-input>
        </el-form-item>

        <el-form-item label="权益类型"
                      prop="type">
          <el-select clearable
                     v-model="addModel.type"
                     placeholder="请选择"
                     style="width: 100%;">
            <el-option v-for="item in remoteSource.interestsType"
                       v-bind:key="item.value"
                       v-bind:label="item.label"
                       v-bind:value="item.value"></el-option>
          </el-select>

        </el-form-item>

      </div>

      <el-form-item align="right">
        <el-button v-on:click="close">取消</el-button>
        <el-button type="primary"
                   v-bind:loading="isLoading"
                   v-on:click="submit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Service from '../service'

export default {
  name: 'service-pack-equitiey-model',
  props: {
    info: Object
  },

  data() {
    return {
      isLoading: false,
      addModel: {
        equitiesDictionaryId: undefined,
        name: '',
        type: undefined
      },

      rules: {
        name: [
          {
            required: true,
            message: '请填写权益名称',
            trigger: 'change'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择机构类型',
            trigger: 'change'
          }
        ]
      },

      remoteSource: {
        //权益类型
        interestsType: []
      }
    }
  },

  async mounted() {
    this.remoteSource.interestsType = await peace.identity.dictionary.getList('equities_type')
    this.$nextTick().then(() => (this.addModel = { ...this.info }))
  },

  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitData()
        }
      })
    },

    submitData() {
      const params = { ...this.addModel }
      this.isLoading = true
      if (Peace.validate.isEmpty(params.equitiesDictionaryId)) {
        Service.addServices(params)
          .then(() => {
            this.$emit('close', { type: 'add' })
            this.$emit('refresh')
          })
          .finally(() => {
            this.isLoading = false
          })
      } else {
        Service.editServices(params)
          .then(() => {
            this.$emit('close', { type: 'edit' })
            this.$emit('refresh')
          })
          .finally(() => {
            this.isLoading = false
          })
      }
    },

    close() {
      this.$emit('close', {})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
