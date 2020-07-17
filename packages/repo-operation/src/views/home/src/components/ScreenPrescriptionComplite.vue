<template>
  <div class="column full-width full-height"
       style="border:2px solid rgba(26, 63, 129, 1);">
    <div class="card-title text-grey col-2 q-px-md q-my-sm">
      近7日订单完成率
    </div>
    <div class="col row">
      <div class="col text-right circle-left">
        <el-progress type="circle"
                     :percentage="30"
                     color="rgba(187,66,239,1)"></el-progress>
        <span>已完成</span>
      </div>
      <div class="col circle-right">
        <el-progress type="circle"
                     :percentage="70"
                     color="rgba(67,102,243,1)"></el-progress>
        <span>未完成</span>
      </div>
    </div>
  </div>
</template>

<script>
const colors = {
  default: '#193F80',
  // done: 'linear-gradient(0deg,rgba(187,66,239,1),rgba(226,58,245,1))',
  // undone: 'linear-gradient(267deg,rgba(67,102,243,1),rgba(29,67,243,1))'
  done: 'rgba(187,66,239,1)',
  undone: 'rgba(67,102,243,1)'
}
export default {
  data() {
    return {
      colors: colors,
      doneValue: 30,
      undoneValue: 70,
      data: [{ color: 'rgba(187,66,239,1)' }]
    }
  }
}
</script>

<style lang="scss" scoped>
.el-progress {
  ::v-deep.el-progress__text {
    color: #fff;
  }
}

.circle-left {
  padding-right: 5%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  span {
    color: rgba(255, 255, 255, 0.2);
    padding-right: 15%;
    margin-top: 5px;
  }
}
.circle-right {
  padding-left: 5%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  span {
    margin-top: 5px;
    color: rgba(255, 255, 255, 0.2);
    padding-left: 15%;
  }
}
</style>