<template>
  <div>
    <q-item clickable
            v-ripple
            @click="selectScheme"
            class="list-item">
      <div class="row q-mr-lg">
        <span class="item-title ellipsis">{{ item.schemeTitle }}</span>
        <div class="custom-tag"
             v-show="item.schemeType === 1">自定义</div>
      </div>
      <div style="display: flex; align-items: center">
        <span class="accessory-view ellipsis">未选用</span>
        <i class="el-icon-arrow-right"></i>
      </div>
    </q-item>
    <q-separator />
  </div>
</template>

<script>
export default {
  name: 'FollowUpSchemeCell',
  props: {
    item: {
      id: {
        type: String
      },
      schemeType: {
        type: Number,
        default: 2
      },
      schemeTitle: {
        type: String,
        default: ''
      }
    }
  },
  methods: {
    selectScheme() {
      Peace.util.alert('暂未开通')
    }
  }
}
</script>

<style lang="scss" scoped>
.list-item {
  display: flex;
  height: 50px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0;

  .item-title {
    font-size: 14px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 20px;
    flex: 1;
    flex-shrink: 1;
    margin-right: 10px;
  }

  .custom-tag {
    width: 58px;
    height: 20px;
    background: rgba(235, 251, 249, 1);
    border-radius: 3px;
    font-size: 14px;
    font-weight: 400;
    color: $--color-primary;
    line-height: 20px;
    text-align: center;
  }

  .accessory-view {
    font-size: 12px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
}
</style>
