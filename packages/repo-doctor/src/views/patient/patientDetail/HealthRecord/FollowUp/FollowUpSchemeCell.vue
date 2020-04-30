<template>
    <div class="list-item">
        <div>
            <span class="item-title">{{item.schemeTitle}}}</span>
            <div class="custom-tag" v-show="item.schemeType === 1">自定义</div>
        </div>
        <div>
            <span class="accessory-view">未选用</span>
            <i class="el-icon-arrow-right"></i>
        </div>
    </div>
</template>

<script>
  export default {
    name: "FollowUpSchemeCell",
    props: {
      item: {
        id: {
          type: String,
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
    }
  }
</script>

<style lang="scss" scoped>
    .list-item {
        display: flex;
        height: 50px;
        width: 100%;
        justify-content: space-between;

        .item-title {
            font-size: 14px;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            line-height: 20px;
            flex: 1;
            flex-shrink: 1;
        }

        .custom-tag {
            width: 58px;
            height: 20px;
            background: rgba(235, 251, 249, 1);
            border-radius: 3px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(0, 198, 174, 1);
            line-height: 20px;
            margin: 0 auto;
        }

        .accessory-view {
            font-size: 12px;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 17px;
        }
    }
</style>
