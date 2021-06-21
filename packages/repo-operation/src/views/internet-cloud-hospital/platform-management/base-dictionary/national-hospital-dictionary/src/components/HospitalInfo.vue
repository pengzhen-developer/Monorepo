<template>
  <div class="info">
    <div class="info-row">
      <div class="info-row-label">
        <span>医院编码</span>
      </div>
      <div class="info-row-content">
        <el-input disabled
                  readonly
                  v-model="detail.code"></el-input>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>医院名称</span>
      </div>
      <div class="info-row-content">
        <el-input @blur="update"
                  v-model="detail.name"></el-input>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>简介</span>
      </div>
      <div class="info-row-content">
        <el-input :autosize="{ minRows: 3 }"
                  @blur="update"
                  resize="none"
                  type="textarea"
                  v-model="detail.content"></el-input>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>地址</span>
      </div>
      <div class="info-row-content">
        <el-input @blur="update"
                  v-model="detail.address"></el-input>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>联系电话</span>
      </div>
      <div class="info-row-content">
        <el-input @blur="update"
                  v-model="detail.phone"></el-input>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>网站地址</span>
      </div>
      <div class="info-row-content">
        <el-input @blur="update"
                  v-model="detail.web_site"></el-input>
      </div>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>所属区域</span>
      </div>
      <div class="info-row-content">
        <el-input @blur="update"
                  v-model="detail.area"></el-input>
      </div>
    </div>
    <div class="inline-center mb-sm mt-lg">
      <el-radio-group v-model="detail.is_show">
        <el-radio :label="1">展示</el-radio>
        <el-radio :label="2">不展示</el-radio>
      </el-radio-group>
    </div>
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
::v-deep .info-row {
  margin-bottom: 10px;
  &-label {
    &:after {
      display: none;
    }
  }
  &-content {
    padding-left: 20px;
  }
}
</style>
