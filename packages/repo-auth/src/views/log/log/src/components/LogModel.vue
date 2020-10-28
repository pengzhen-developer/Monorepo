<template>
  <div>
    <div class="row q-py-sm">
      <div class="col-6 row ">
        <div class="col-4">日志标题</div>
        <div class="col  q-pr-md">{{info.title}}</div>
      </div>
      <div class="col-6 row">
        <div class="col-4">日志类型</div>
        <div class="col  q-pr-md">{{getTypeText(info.type)}}</div>
      </div>
    </div>

    <div class="row q-py-sm">
      <div class="col-6 row">
        <div class="col-4">创建人</div>
        <div class="col  q-pr-md">{{info.createBy}}</div>
      </div>
      <div class="col-6 row">
        <div class="col-4">应用标识</div>
        <div class="col  q-pr-md">{{info.serviceId}}</div>
      </div>

    </div>
    <div class="row q-py-sm">
      <div class="col-6 row">
        <div class="col-4">日志编号</div>
        <div class="col  q-pr-md">{{info.id}}</div>
      </div>
      <div class="col-6 row">
        <div class="col-4">提交数据</div>
        <div class="col  q-pr-md">{{info.params}}</div>
      </div>
    </div>
    <div class="row q-py-sm">
      <div class="col-6 row">
        <div class="col-4">ip地址</div>
        <div class="col  q-pr-md">{{info.remoteAddr}}</div>
      </div>
      <div class="col-6 row">
        <div class="col-4">请求uri</div>
        <div class="col  q-pr-md">{{info.requestUri}}</div>
      </div>
    </div>
    <div class="row q-py-sm">
      <div class="col-6 row">
        <div class="col-4">方法执行时间</div>
        <div class="col  q-pr-md">{{info.time}}</div>
      </div>
      <div class="col-6 row">
        <div class="col-4">操作方式</div>
        <div class="col  q-pr-md">{{info.method}}</div>
      </div>
    </div>
    <div class="row q-py-sm">
      <div class="col-6 row">
        <div class="col-4">创建时间</div>
        <div class="col  q-pr-md">{{info.createTime}}</div>
      </div>
      <div class="col-6 row">
        <div class="col-4">更新时间</div>
        <div class="col  q-pr-md">{{info.updateTime||'--'}}</div>
      </div>
    </div>
    <div class="row q-py-sm">
      <div class="col-6 row">
        <div class="col-4 ">用户代理</div>
        <div class="col  q-pr-md">{{info.userAgent}}</div>
      </div>
      <div class="col-6 row">
        <div class="col-4">异常信息</div>
        <div class="col  q-pr-md">{{info.exception}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Constant from '../constant'
export default {
  name: 'LogModel',
  props: {
    info: Object
  },
  data() {
    return {}
  },

  methods: {
    getTypeText(type) {
      return Constant.typeStatus[type]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>