<template>
  <div>
    <div class="name">
      <div class="title">服务名称：</div>
      <div>{{ service.serviceName }}</div>
    </div>

    <div class="name">
      <div class="title">服务内容：</div>

      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="(item,index) in service.serviceContentArr"
                     :label="item"
                     style="display:block;"
                     :key="index">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
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

export default {
  data() {
    return {
      checkList: []
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
      if (this.checkList.length === 0) {
        Peace.util.warning('请至少选择一种服务')
        return
      }
      this.doApply()
    },

    doApply() {
      var ids = ''
      this.checkList.map((item) => {
        ids += item.id
        ids += ','
      })
      ids = ids.substring(0, ids.length - 1)
      const params = { serviceId: this.service.id, serviceContent: ids }
      Service.doApply(params).then((res) => {
        Peace.util.success(res.msg)
        this.$emit('onSuccess')
      })
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
.el-checkbox {
  margin-bottom: 10px;
}
button {
  width: 120px;
  height: 32px;
}
</style>
