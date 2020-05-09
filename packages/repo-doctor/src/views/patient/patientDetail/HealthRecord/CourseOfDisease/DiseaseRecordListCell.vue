<template>
  <div>
    <div class="time-line q-mb-sm">
      <span class="title q-mr-sm">{{ '首诊' }}</span>
      <span>{{ '2018-09-19' }}</span>
    </div>
    <div class="q-pa-sm q-mb-md rounded-borders" style="background: #F9F9F9">
      <div class="text-justify" style="color: #333333">
        {{
          '病程记录：早期多无症状，偶尔体检时发高血压现血压增高，或在精神紧张、情绪激动或劳累后感头晕、头痛、眼花、耳鸣、失眠、乏力、注意力不集中等症状，可能系高级精神功能失调所致。早期血压仅暂时升高，脏器受损。'
        }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiseaseRecordListCell',
  props: {
    item: {
      type: Object,
      require: true,
      default: function() {
        return {
          id: '',
          title: '首诊',
          content: '',
          time: '2018-12-23'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.time-line {
  color: rgba(153, 153, 153, 1);

  .title {
    color: $--color-text-primary;
    font-weight: 500;
  }

  &:before {
    display: inline-block;
    content: '';
    width: 5px;
    height: 5px;
    background: $--color-primary;
    border-radius: 50%;
    margin: 0 8px 0 0;
    vertical-align: middle;
  }
}
</style>
