<template>

  <div class="el-dialog__body">
    <el-form label-position="right"
             label-width="95px"
             label-suffix="："
             v-bind:model="detail">

      <el-form-item label="医院编码">
        <PeaceInput v-model.trim="detail.code"
                    :disabled="true"></PeaceInput>
      </el-form-item>

      <el-form-item label="医院名称"
                    prop="name">
        <PeaceInput v-model.trim="detail.name"
                    @blur="update"></PeaceInput>
      </el-form-item>

      <el-form-item label="简介">
        <PeaceInput :autosize="{ minRows: 3 }"
                    @blur="update"
                    type="textarea"
                    resize="none"
                    v-model.trim="detail.content"></PeaceInput>
      </el-form-item>

      <el-form-item label="地址">
        <PeaceInput v-model.trim="detail.address"
                    @blur="update"></PeaceInput>
      </el-form-item>

      <el-form-item label="联系电话">
        <PeaceInput v-model.trim="detail.phone"
                    @blur="update"></PeaceInput>
      </el-form-item>

      <el-form-item label="网站地址">
        <PeaceInput v-model.trim="detail.web_site"
                    @blur="update"></PeaceInput>
      </el-form-item>

      <el-form-item label="所属区域">
        <PeaceInput v-model.trim="detail.area"
                    @blur="update"></PeaceInput>
      </el-form-item>

      <el-form-item>
        <el-radio-group v-model="detail.is_show">
          <el-radio :label="1">展示</el-radio>
          <el-radio :label="2">不展示</el-radio>
        </el-radio-group>
      </el-form-item>

    </el-form>

  </div>

</template>
<script>
import Service from '../service/index'

export default {
  name: 'infoInfo',
  props: {
    info: Object
  },
  watch: {
    'detail.is_show'() {
      this.update()
    }
  },
  data() {
    return {
      id: this.info.id,
      detail: Object.assign({}, this.info)
    }
  },
  methods: {
    // 更新数据
    update() {
      const isChange = !this.compared(this.detail, this._info)
      if (isChange) {
        // 发生了改变
        const info = this.detail
        this._info = Object.assign({}, info)
        const { content, address, phone, area, is_show } = info

        const params = {
          hospitalId: this.id,
          hospitalName: info.name,
          content,
          address,
          phone,
          webSite: info.web_site,
          area,
          show: is_show
        }

        Service.editHospital(params)
          .then(() => {
            Peace.util.success('信息已自动保存成功！')
            this.$emit('onSuccess')
          })
          .catch(() => {
            this.$emit('close')
          })
      }
    },
    compared(target, _target) {
      let flag = true

      Object.keys(target).forEach((key) => {
        if (target[key] !== _target[key]) flag = false
      })

      return flag
    }
  },
  created() {
    this._info = Object.assign(this.info)
  }
}
</script>
<style lang="scss" scoped>
</style>
