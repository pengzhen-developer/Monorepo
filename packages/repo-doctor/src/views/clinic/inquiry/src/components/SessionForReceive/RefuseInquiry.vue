<template>
  <div>
    <p class="q-mb-md text-subtitle1">
      请选择您的退诊原因
    </p>

    <div class="q-ml-md">
      <el-radio-group v-model="description">
        <el-radio label="不对症"
                  class="block q-mb-md">不对症</el-radio>
        <el-radio label="需面诊"
                  class="block q-mb-md">需面诊</el-radio>
        <el-radio label="其他"
                  class="block q-mb-sm">其他</el-radio>
      </el-radio-group>

      <el-input placeholder="请填写15字内原因"
                type="textarea"
                maxlength="15"
                ref="quitInput"
                v-model.trim="otherDescription"
                v-bind:disabled="canInput"
                v-bind:rows="3"></el-input>
    </div>

    <div style="text-align: center; margin: 10px 0 0 0;">
      <el-button v-on:click="cancel">取消</el-button>

      <el-button type="primary"
                 v-bind:disabled="submitDisable"
                 v-on:click="confirm">确认</el-button>
    </div>
  </div>
</template>

<script>
import Peace from '@src/library'
import Serivce from './../../service'

export default {
  data() {
    return {
      description: '',

      otherDescription: ''
    }
  },

  computed: {
    inquiryInfo() {
      return this.$store.state.inquiry?.session?.content?.inquiryInfo
    },

    canInput() {
      return this.description !== '其他'
    },

    submitDisable() {
      if (this.description === '其他') {
        return Peace.validate.isEmpty(this.otherDescription)
      } else {
        return Peace.validate.isEmpty(this.description)
      }
    }
  },

  watch: {
    description(value) {
      this.otherDescription = ''

      if (value === '其他') {
        this.$refs.quitInput.focus()
      }
    }
  },

  methods: {
    cancel() {
      this.$emit('close')
    },
    confirm() {
      const params = {
        inquiryNo: this.inquiryInfo.inquiryNo,
        overCause: this.description === '其他' ? this.otherDescription : this.description
      }

      Serivce.quitInquiry(params).then((res) => {
        Peace.util.alert(res.msg)

        this.cancel()
      })
    }
  }
}
</script>

<style>
</style>