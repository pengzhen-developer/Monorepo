<template>
  <div class="presc">
    <div>
      <span class="label">
        <span>诊断</span>
      </span>
      <span>{{ data.diagnosis }}</span>
    </div>
    <div class="info-row">
      <div class="info-row-label">
        <span>性别</span>
      </div>
      <div class="info-row-content">
        <span>{{ data.sex }}</span>
      </div>
      <div class="info-row-label">
        <span>年龄</span>
      </div>
      <div class="info-row-content">
        <span>{{ data.age }}</span>
      </div>
    </div>
    <span class="label">
      <span>RP</span>
    </span>
    <div class="drug-list">
      <div
        :key="drug.id"
        class="drug-item"
        v-for="(drug) in drugList"
      >
        <div class="row-one">
          <span>{{ drug.drug_name }}</span>
          <span>{{ drug.drug_spec }}</span>
          <span>{{ drug.drug_factory }}</span>
          <span>&nbsp;x{{ drug.number }}</span>
        </div>
        <div class="row-two">
          <span>用法用量：</span>
          <span>{{ drug.dic_usage }}</span>。
          <span>每次{{ drug.consump }}{{ drug.drug_unit }}</span>，
          <span>{{ drug.dic_frequency }}</span>
          <span
            v-if="drug.medication_days"
          >，{{ drug.medication_days }}天</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PrescDetails',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    drugList() {
      return JSON.parse(this.data.drugjson)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-button {
  &--primary.is-plain {
    color: $--color-primary;
    background: transparent;
  }
}
.presc {
  padding: 10px 20px;
  .label {
    & > span {
      display: inline-block;
      min-width: 3em;
      text-align: justify;
      text-align-last: justify;
    }
  }
  .info-row-label:after,
  .label:after {
    content: '：';
  }
  .info-row {
    margin: 10px 0;
    &-label,
    &-content {
      display: inline-block;
    }
    &-label {
      & > span {
        width: 3em;
        text-align: justify;
        text-align-last: justify;
        display: inline-block;
      }
    }
    &-content {
      width: calc(50% - 4em);
    }
  }
}
.drug-list {
  height: 210px;
  overflow-y: auto;
  .drug-item {
    border-bottom: 1px solid #ebeef5;
    .row-one,
    .row-two {
      margin: 10px;
    }
    .row-one {
      font-weight: bold;
      font-weight: 600;
      & > span {
        &:nth-child(1) {
          margin-right: 20px;
        }
        &:nth-child(2) {
          margin-right: 25px;
        }
      }
    }
    .row-two {
      font-size: 12px;
      color: #333;
    }
  }
}
.footer {
  text-align: center;
}
</style>
