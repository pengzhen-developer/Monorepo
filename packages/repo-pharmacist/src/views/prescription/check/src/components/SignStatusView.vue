<template>
  <div>
    <div class="text-color q-mb-lg">您暂未设置数字签名，不可审方。设置签名指引如下：</div>
    <el-timeline>
      <div class="el-timeline-item"
           v-for="(activity, index) in activities"
           :key="index.toString()">
        <div class="el-timeline-item__tail"></div>
        <div class="el-timeline-item__node el-timeline-item__node--normal el-timeline-item__node--">{{index+1}}</div>
        <div class="el-timeline-item__wrapper">
          <div class="el-timeline-item__content">{{activity.content}}</div>
        </div>
      </div>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activities: [
        {
          content: '下载【医网信】APP'
        },
        {
          content: '使用账号登录【医网信】APP'
        },
        {
          content: '下载证书并设置签名'
        },
        {
          content: '医网信签名审核通过'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.el-timeline {
  padding-left: 0;
}
.el-timeline-item__node-- {
  top: -2px;
  width: 16px;
  line-height: 16px;
  height: 16px;
  border-radius: 8px;
  border: 1px solid var(--q-color-primary);
  color: var(--q-color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
.el-timeline-item__tail {
  left: 6px;
  height: 46%;
  top: 16px;
  width: 1px;
  border: none;
  background: var(--q-color-primary-light-2);
}
.el-timeline-item {
  padding-bottom: 16px;
}
.el-timeline-item:last-child {
  padding-bottom: 4px;
}
.text-color {
  color: rgba(0, 0, 0, 0.85);
}
</style>