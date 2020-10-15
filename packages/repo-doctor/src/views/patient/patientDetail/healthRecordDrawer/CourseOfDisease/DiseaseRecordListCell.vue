<template>
  <div v-on:click="editItem">
    <div class="time-line q-mb-sm">
      <span class="title q-mr-sm">{{ item.courseType }}</span>
      <span>{{ item.courseTime }}</span>
    </div>
    <div class="q-pa-sm q-mb-md rounded-borders"
         style="background: #F9F9F9">
      <div class="text-justify"
           style="color: #333333">
        {{ item.courseRecord }}
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
      default: function () {
        return {
          id: '',
          courseType: '',
          courseRecord: '',
          courseTime: ''
        }
      }
    }
  },
  methods: {
    editItem() {
      $peace.$emit('showDrawer', { index: peace.type.HEALTH_RECORD.ACTION_TYPE.添加病程, item: peace.util.deepClone(this.item) })
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
