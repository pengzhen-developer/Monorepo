<template>
  <div class="card-style q-pa-md">
    <div class="row items-center">
      <div class="card-title q-mr-lg">数据总览</div>
      <el-button size="small"
                 type="primary"
                 @click="showDataScreen"
                 plain>查看数据大屏</el-button>
    </div>
    <div class="container">
      <div class="data-item"
           v-for="item in list"
           v-bind:key="item.id">
        <el-image class="image q-mr-md"
                  v-bind:src="item.icon"> </el-image>
        <div>
          <p class="title-label">{{ item.title }}</p>
          <p class="count-label">{{ item.count }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Service from '../service'

export default {
  name: 'data-overview',

  data() {
    return {
      list: [
        {
          id: 1,
          icon: require('../assets/img/prescriptionCount.png'),
          title: '处方量',
          count: '1,378,938'
        },
        {
          id: 2,
          icon: require('../assets/img/orderCount.png'),
          title: '订单量',
          count: '900,0000'
        },
        {
          id: 3,
          icon: require('../assets/img/hosptailCount.png'),
          title: '医疗机构',
          count: '658'
        },
        {
          id: 4,
          icon: require('../assets/img/drugRoomCount.png'),
          title: '药品供应机构',
          count: '658'
        }
      ]
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      this.get()
    })
  },

  methods: {
    get() {
      Service.getOverview()
        .then((res) => {
          console.log(res)
        })
        .finally(() => {})
    },

    showDataScreen() {
      this.$parent.toggleDataScreen()
    }
  }
}
</script>

<style lang="scss" scoped>
.card-style {
  height: 196px;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 4px 0px rgba(224, 224, 224, 1);
  border-radius: 4px;

  .card-title:before {
    content: '';
    display: inline-block;
    position: relative;
    top: 3px;
    margin-right: 10px;
    width: 4px;
    height: 16px;
    background: rgba(48, 153, 166, 1);
    border-radius: 2px;
  }

  ::v-deep .el-button {
    width: 130px;
    height: 32px;
  }

  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 47px 10px;

    .data-item {
      display: flex;
      flex-direction: row;

      .image {
        width: 56px;
        height: 56px;
      }

      p {
        margin: 0;
        padding: 0;
      }

      .title-label {
        font-size: 14px;
        font-weight: 400;
        color: var(--q-color-grey-333);
      }

      .count-label {
        font-size: 24px;
        font-weight: 600;
        color: var(--q-color-grey-333);
      }
    }
  }
}
</style>
