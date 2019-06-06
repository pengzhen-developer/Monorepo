<template>
  <div class="drug-info">
    <div class="info-item">
      <div class="info-item-title">
        <span>药品名称</span>
      </div>
      <div class="info-item-content">
        <div class="info-row-label">
          <span>通用名称</span>
        </div>
        <div class="info-row-content">
          <span>{{ data.tym }}</span>
        </div>
        <br>
        <div class="info-row-label">
          <span>英文名称</span>
        </div>
        <div class="info-row-content">
          <span>{{ data.ywm }}</span>
        </div>
      </div>
    </div>
    <div class="info-item">
      <div class="info-item-title">
        <span>成份</span>
      </div>
      <div class="info-row-content">
        <span>{{ data.zycf }}</span>
      </div>
    </div>
    <div class="info-item">
      <div class="info-item-title">
        <span>适应症</span>
      </div>
      <div class="info-item-content">
        <span>{{ data.syz }}</span>
      </div>
    </div>
    <div class="info-item">
      <div class="info-item-title">
        <span>用法用量</span>
      </div>
      <div class="info-row-content">
        <span>{{ data.yfyl }}</span>
      </div>
    </div>
    <div class="info-item">
      <div class="info-item-title">
        <span>禁忌</span>
      </div>
      <div class="info-item-content">
        <span>{{ data.jj }}</span>
      </div>
    </div>
    <div class="info-item">
      <div class="info-item-title">
        <span>注意事项</span>
      </div>
      <div class="info-item-content">
        <pre>{{ data.zysx }}</pre>
      </div>
    </div>
    <div class="info-item">
      <div class="info-item-title">
        <span>毒理研究</span>
      </div>
      <div class="info-row-content">
        <span>{{ data.yldx }}</span>
      </div>
    </div>
    <div class="info-item">
      <div class="info-item-title">
        <span>批准文号</span>
      </div>
      <div class="info-row-content">
        <span>{{ data.pzwh }}</span>
      </div>
    </div>
    <div class="info-item">
      <div class="info-item-title">
        <span>生产企业</span>
      </div>
      <div class="info-row-content">
        <span>{{ data.scqy }}</span>
      </div>
    </div>
    <div class="info-item">
      <div class="info-item-title">
        <span>药品分类</span>
      </div>
      <div class="info-row-content">
        <span>{{ data.ypfl }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DrugSynopsis',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
<style lang="scss" scoped>
span {
  font-size: 12px;
  line-height: 20px;
}
pre {
  margin: 0;
  white-space: normal;
}
.drug-info {
  padding: 0px 20px;
}
.info-item {
  padding: 7px;
  border-bottom: 1px solid #f3f3f3;
  &:last-of-type {
    // padding-bottom: 0;
    border-bottom: 0;
  }
  &-title {
    & > span {
      color: #333;
      font-size: 14px;
      vertical-align: middle;
    }
    &:before {
      content: '';
      margin-right: 7px;
      width: 5px;
      height: 14px;
      vertical-align: middle;
      background-color: $--color-primary;
      display: inline-block;
    }
  }
}

.info-row-label,
.info-row-content {
  display: inline-block;
}
.info-row-label {
  &:after {
    content: '：';
  }
}
</style>
