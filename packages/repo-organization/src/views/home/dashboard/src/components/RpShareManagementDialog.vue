<template>
  <div>
    <div class="name">
      <div class="title">服务名称：</div>
      <div>{{ service.serviceName }}</div>
    </div>

    <div class="name"
         v-if="showDockingWay()">
      <div class="title">对接方式：</div>

      <el-radio-group v-model="checkData">
        <el-radio v-for="(item,index) in service.accessModeArr"
                  :label="item"
                  style="display:block;"
                  :key="index">{{ item.name }}</el-radio>
      </el-radio-group>

    </div>

    <div class="bottom">
      <el-button type="primary"
                 v-on:click="onInput">确定</el-button>
      <el-button v-on:click="onCancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import Service from '../service'
import util from '@src/util'

export default {
  data() {
    return {
      checkData: {}
    }
  },

  props: {
    service: Object
  },

  methods: {
    onCancel() {
      this.$emit('onCancel')
    },

    onInput() {
      if (this.showDockingWay()) {
        // 仓配机构默认对接方式
        this.checkData.id = 3
      }

      if (this.checkData.id == undefined) {
        Peace.util.warning('请先选择一种对接方式')
        return
      }
      this.doApply()
    },

    doApply() {
      const params = { serviceId: this.service.id, accessMode: this.checkData.id }
      Service.doApply(params).then((res) => {
        Peace.util.success(res.msg)
        this.$emit('onSuccess')
      })
    },

    showDockingWay() {
      // 1医疗机构 2店配机构 3仓配机构
      const { role } = util.user.getUserInfo()
      return role != 3
    }
  }
}
</script>

<style scoped>
.name {
  display: flex;
  margin-bottom: 20px;
  color: black;
  font-weight: 500;
}
.title {
  margin-right: 20px;
}
.bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 37px;
}
.el-radio {
  margin-bottom: 10px;
}
button {
  width: 120px;
  height: 32px;
}
</style>
