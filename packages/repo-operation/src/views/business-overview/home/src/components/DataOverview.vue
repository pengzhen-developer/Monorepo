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
      <div class="data-item">
        <el-image class="image q-mr-md"
                  v-bind:src="require('../assets/img/prescriptionCount.png')"> </el-image>
        <div>
          <p class="title-label">处方量</p>
          <p class="count-label">{{ overView.prescription }}</p>
        </div>
      </div>

      <div class="data-item">
        <el-image class="image q-mr-md"
                  v-bind:src="require('../assets/img/orderCount.png')"> </el-image>
        <div>
          <p class="title-label">订单量</p>
          <p class="count-label">{{ overView.order }}</p>
        </div>
      </div>

      <div class="data-item">
        <el-image class="image q-mr-md"
                  v-bind:src="require('../assets/img/hosptailCount.png')"> </el-image>
        <div>
          <p class="title-label">医疗机构</p>
          <p class="count-label">{{ overView.medical }}</p>
        </div>
      </div>

      <div class="data-item">
        <el-image class="image q-mr-md"
                  v-bind:src="require('../assets/img/drugRoomCount.png')"> </el-image>
        <div>
          <p class="title-label">药品供应机构</p>
          <p class="count-label">{{ drugSupplyOrg }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'data-overview',

  props: {
    data: {
      type: Object
    }
  },

  watch: {
    data: {
      handler(val) {
        this.overView.prescription = val.prescription
        this.overView.order = val.order
        this.overView.medical = val.medical
        this.overView.drugSupply = val.drugSupply
        this.overView.store = val.store
        this.overView.warehouse = val.warehouse
      },
      immediate: true,
      deep: true
    }
  },

  data() {
    return {
      overView: {
        prescription: 0, // 处方量
        order: 0, // 订单量
        medical: 0, // 医疗机构
        drugSupply: 0, // 药品供应机构
        store: 0, // 店配机构
        warehouse: 0 //仓配机构
      }
    }
  },
  computed: {
    drugSupplyOrg() {
      return this.overView.store + this.overView.warehouse
    }
  },
  methods: {
    showDataScreen() {
      const url = process.env.VUE_APP_RELEASE_FLODER_PATH + 'dataScreen'
      window.open(url)
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
